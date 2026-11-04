import { ReactNode, createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Socket } from 'socket.io-client'
import { produce } from 'immer'
import { AttackPlayerPayload, AttackUnitPayload, BuyArtifactPayload, ClientGameState, GameSocketEvents, MatchStartData, PlaySpellPayload, PlayUnitPayload, SOCKET_EVENTS, UpdateArtifactData, UpdateCardData, UpdateDrawpileCountData, UpdateHealthData, UpdateMoneyData } from './types'
import { getPlaceholderGameState } from "../../shared/functions/game"
import { createGameSocket, useGameSocketEmit } from "./socket"
import { CardType, CardZone, SpellData, UnitData } from "../../shared/types/card"
import { ArtifactData, ArtifactZone, GamePhase, selectTargetFilter } from "../../shared/types/game"
import { useAuth } from "../AuthContext/AuthContext"
import { isDeckFull } from "../../shared/functions/decks"
import { useNavigate } from "react-router-dom"
import { Deck } from "../../shared/types/decks"
import { getDeckIds, matchPlayerIds, removeArtifactInstance, removeCardInstance } from "./helpers"


type GameContextType = {
    state: ClientGameState,
    isConnected: boolean,
    isInQueue: boolean,
    selectedCard: string | undefined,
    setSelectedCard: (
        instanceId: string | undefined
    ) => void,
    emitters: {
        queue: (deck: Deck) => void,
        dequeue: () => void,
        playUnit: (payload: PlayUnitPayload, card: UnitData, benchIndex: number) => void,
        playSpell: (payload: PlaySpellPayload, card: SpellData, handIndex: number) => void,
        buyArtifact: (payload: BuyArtifactPayload, artifact: ArtifactData, shopIndex: number) => void,
        endTurn: () => void,
        attackUnit: (payload: AttackUnitPayload) => void,
        attackPlayer: (payload: AttackPlayerPayload) => void,
        selectTarget: (targetId: string, isPlayer: boolean) => void
    }
}

const GameContext = createContext<GameContextType>({
    state: getPlaceholderGameState(),
    isConnected: false,
    isInQueue: false,
    selectedCard: undefined,
    setSelectedCard: () => {},
    emitters: {
        queue: () => {},
        dequeue: () => {},
        playUnit: () => {},
        playSpell: () => {},
        buyArtifact: () => {},
        endTurn: () => {},
        attackUnit: () => {},
        attackPlayer: () => {},
        selectTarget: () => {}
    }
});


type GameProviderProps = {
    children: ReactNode
}


export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, setState] = useState<ClientGameState>(getPlaceholderGameState());
    const [isConnected, setIsConnected] = useState(false);
    const [isInQueue, setIsInQueue] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string | undefined>(undefined)

    const socketRef = useRef<Socket | null>(null);
    const navigate = useNavigate();
    const token = useAuth().user?.token;
    const emit = useGameSocketEmit(socketRef);


    useEffect(() => {
        if (!token) return;

        const gameEvents: GameSocketEvents = {
            onConnect: () => { 
                setIsConnected(true);
            },
            onDisconnect: (reason: any) => {
                setIsConnected(false); 
                setIsInQueue(false);
                console.log('disconnected: ', reason);
            },

            onMatchStart: (data: MatchStartData) => {
                setIsInQueue(false);

                setState(produce(draft => {
                    draft.players.player.data = data.playerData;
                    draft.players.opponent.data = data.opponentData;
                    draft.isPlayerTurn = data.isFirstTurn;
                }));

                navigate('/game');
            },
            onStartTurn: () => {
                setState(produce(draft => {
                    draft.players.player.data.turn += 1;
                    draft.isPlayerTurn = true;
                }));
            },
            onSelectTarget: (filter: selectTargetFilter) => {
                setState(produce(draft => {
                    draft.selectingTarget = filter;
                }));
            },
            onUpdateGamePhase: () => {
                setState(produce(draft => {
                    draft.phase = (draft.phase === GamePhase.PLAY) ? GamePhase.SHOP : GamePhase.PLAY;
                }));
            },
            onUpdateMoney: (data: UpdateMoneyData) => {
                setState(produce(draft => {
                    const player = matchPlayerIds(draft, data.playerId, socket.id);
                    player.data.money = data.newMoney;
                }));
            },
            onUpdateHealth: (data: UpdateHealthData) => {
                setState(produce(draft => {
                    const player = matchPlayerIds(draft, data.playerId, socket.id);
                    player.data.hp = data.newHealth;
                }));
            },
            onUpdateDrawpileCount: (data: UpdateDrawpileCountData) => {
                setState(produce(draft => {
                    const player = matchPlayerIds(draft, data.playerId, socket.id);
                    player.data.drawpileCount = data.newDrawpileCount;
                }));
            },
            onUpdateCard: (data: UpdateCardData) => {
                const { instanceId } = data.card;
                if (!instanceId) {
                    throw new Error(`card ${data.card.name} in ${data.location.insideOf} has no instanceId`);
                }

                setState(produce(draft => {
                    removeCardInstance(draft, instanceId);

                    switch (data.location.insideOf) {
                        case CardZone.BENCH:
                            if (data.card.type === CardType.SPELL) {
                                throw new Error(`card ${data.card.name} cannot exist in ${data.location.insideOf}`);
                            }

                            draft.players.player.cards.bench[data.location.index] = data.card;
                            break;

                        case CardZone.BOARD:
                            if (data.card.type === CardType.SPELL) {
                                throw new Error(`card ${data.card.name} cannot exist in ${data.location.insideOf}`);
                            }
                            draft.board[data.location.index] = data.card;
                            break;

                        case CardZone.HAND: {
                            //! wait does it always remove stuuff no it shouldnt be like that
                            if (data.card.type === CardType.UNIT) {
                                throw new Error(`card ${data.card.name} cannot exist in ${data.location.insideOf}`);
                            }
                            const hand = draft.players.player.cards.hand;
                            hand.splice(data.location.index, 0, data.card);
                            break;
                        }                            
                    }
                }));
            },
            onUpdateArtifact: (data: UpdateArtifactData) => {
                setState(produce(draft => {
                    removeArtifactInstance(draft, data.artifact.instanceId!);

                    switch (data.location.insideOf) {
                        case ArtifactZone.SHOP:
                            draft.shop[data.location.index] = data.artifact;
                            break;
                        case ArtifactZone.PLAYER: {
                            if (!data.playerId) {
                                throw new Error('no playerId provided.');
                            }
                            const player = matchPlayerIds(draft, data.playerId, socket.id)
                            player.data.artifacts.splice(data.location.index, 0, data.artifact);
                            break;
                        }
                    }
                }));
            },
            onUpdateHand: (newHand: SpellData[]) => {
                setState(produce(draft => {
                    draft.players.player.cards.hand = newHand;
                }));
            },
            onUpdateBench: (newBench: UnitData[]) => {
                setState(produce(draft => {
                    draft.players.player.cards.bench = newBench;
                }));
            },
            onUpdateBoard: (newBoard: UnitData[]) => {
                setState(produce(draft => {
                    draft.board = newBoard;
                }));
            },
            onUpdateShop: (newShop: ArtifactData[]) => {
                setState(produce(draft => {
                    draft.shop = newShop;
                }));
            },
            onOpponentPlayedSpell: (spell: SpellData) => {
                setState(produce(draft => {
                    draft.spellShowing = spell;
                }))

                setTimeout(() => {
                    setState(produce(draft => {
                        draft.spellShowing = null;
                    }))
                }, 3000) // show spell for 3 seconds
            },
            onGameEnd: (winnerId: string) => {
                navigate('/')
            }

        };

        const socket = createGameSocket(gameEvents, token);
        socketRef.current = socket;

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [token]);


    const queue = useCallback((deck: Deck) => {
        if (!isDeckFull(deck)) {
            console.log('get a full deck nub')
            return;
        }

        const payload = getDeckIds(deck);
        
        setIsInQueue(true);
        emit(SOCKET_EVENTS.QUEUE, payload);
    }, [emit]);

    const dequeue = useCallback(() => {
        setIsInQueue(false);
        emit(SOCKET_EVENTS.DEQUEUE);
    }, [emit]);


    const playUnit = useCallback((payload: PlayUnitPayload, card: UnitData, benchIndex: number) => {
        emit(SOCKET_EVENTS.PLAY_UNIT, payload);
    }, [emit]);

    const playSpell = useCallback((payload: PlaySpellPayload, card: SpellData, handIndex: number) => {
        emit(SOCKET_EVENTS.PLAY_SPELL, payload);
    }, [emit]);

    const attackUnit = useCallback((payload: AttackUnitPayload) => {
        emit(SOCKET_EVENTS.ATTACK_UNIT, payload)
    }, [emit])

    const attackPlayer = useCallback((payload: AttackPlayerPayload) => {
        emit(SOCKET_EVENTS.ATTACK_PLAYER, payload)
    }, [emit]) 

    const buyArtifact = useCallback((payload: BuyArtifactPayload, artifact: ArtifactData, shopIndex: number) => {
        emit(SOCKET_EVENTS.BUY_ARTIFACT, payload);
    }, [emit]);

    const endTurn = useCallback(() => {
        setState(produce(draft => {
            draft.isPlayerTurn = false;
        }));
        emit(SOCKET_EVENTS.END_TURN);
    }, [emit]);

    const selectTarget = useCallback((targetId: string) => {
        setState(produce(draft => {
            draft.selectingTarget = undefined;
        }));

        emit(SOCKET_EVENTS.SELECTED_TARGET, {instanceId: targetId})
    }, [emit])


    const emitters = useMemo(() => ({
        queue, dequeue, playUnit, playSpell, buyArtifact, endTurn, attackUnit, attackPlayer, selectTarget
    }), [queue, dequeue, playUnit, playSpell, buyArtifact, endTurn, attackUnit, attackPlayer,selectTarget

    ]);


    const value = useMemo(() => ({
        state, isConnected, selectedCard, setSelectedCard, isInQueue, emitters
    }), [state, isConnected, isInQueue, selectedCard, setSelectedCard, emitters]);

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );

}


export const useGameContext = () => {
return useContext(GameContext);
}