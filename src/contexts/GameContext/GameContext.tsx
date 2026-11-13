import { ReactNode, createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Socket } from 'socket.io-client'
import { produce } from 'immer'
import { AttackPlayerPayload, AttackUnitPayload, BuyArtifactPayload, ClientGameState, GamePhase, GameSocketEvents, MatchStartData, PlayedSpellData, PlaySpellPayload, PlayUnitPayload, SelectTargetData, SelectTargetFilter, SelectTargetPayload, SOCKET_EVENTS, UpdateArtifactData, UpdateCardData, UpdateDrawpileCountData, UpdateHealthData, UpdateMoneyData } from './shared/types'
import { useAuth } from "../AuthContext/AuthContext"
import { useNavigate } from "react-router-dom"
import { Deck } from '../DeckContext/shared/types'
import { getPlaceholderGameState, getPlayerRow } from './shared/helpers'
import { createGameSocket, useGameSocketEmit } from './socket'
import { GAMEPAGE_PATH, HOMEPAGE_PATH } from '../../components/app/Topbar/shared/pagePaths'
import { matchPlayerIds, removeArtifactInstance, removeCardInstance } from './shared/draftHelpers'
import { CardType, SpellData, UnitData } from '../../components/game/Card/shared/types'
import { CardZone } from '../../components/game/GameCard/shared/types'
import { ArtifactData, ArtifactZone } from '../../components/game/Artifact/shared/types'
import { getDeckIds, isDeckFull } from '../DeckContext/shared/helpers'



type GameContextType = {
    state: ClientGameState,
    isConnected: boolean,
    isInQueue: boolean,
    setAttackerSelected: (instance: UnitData | undefined) => void,
    emitters: {
        queue: (deck: Deck) => void,
        dequeue: () => void,
        playUnit: (payload: PlayUnitPayload) => void,
        playSpell: (payload: PlaySpellPayload) => void,
        buyArtifact: (payload: BuyArtifactPayload) => void,
        endTurn: () => void,
        attackUnit: (payload: AttackUnitPayload) => void,
        attackPlayer: (payload: AttackPlayerPayload) => void,
        selectTarget: (payload: SelectTargetPayload) => void
    }
}

const GameContext = createContext<GameContextType>({
    state: getPlaceholderGameState(),
    isConnected: false,
    isInQueue: false,
    setAttackerSelected: () => {},
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

    const socketRef = useRef<Socket | null>(null);
    const navigate = useNavigate();
    const token = useAuth().user?.token;
    const emit = useGameSocketEmit(socketRef);


    useEffect(() => {
        if (!token) {
            return;
        }

        
        // listeners
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
                }));

                navigate(GAMEPAGE_PATH);
            },
            onStartTurn: () => {
                setState(produce(draft => {
                    draft.isPlayerTurn = true;

                    const playerBoard = getPlayerRow(draft.board);

                    for (const unit of playerBoard) {
                        if (unit) {
                            unit.canAttack = true;
                        }
                    }
                }));
            },
            onSelectTarget: (data: SelectTargetData) => {
                setState(produce(draft => {
                    draft.targetFilter = new Set(data.filter);
                    draft.targetSourceId = data.sourceId
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
                    removeArtifactInstance(draft, data.artifact.instanceId);

                    switch (data.location.insideOf) {
                        case ArtifactZone.SHOP:
                            draft.shop[data.location.index] = data.artifact;
                            break;

                        case ArtifactZone.PLAYER: {
                            if (!data.playerId) {
                                throw new Error('no playerId provided.');
                            }

                            const player = matchPlayerIds(draft, data.playerId, socket.id);
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
            onAttacked: () => {
                const attacker = state.attackerSelected;
                if (!attacker) {
                    throw new Error("How did you attack if no attacker was selected");
                }

                setAttackerSelected(undefined);
                attacker.canAttack = false;
            },
            onPlayedSpell: (data: PlayedSpellData) => {
                setState(produce(draft => {
                    draft.spellShowing = {
                        spell: data.spell,
                        self: data.ownerId === socket.id
                    };
                }));

                setTimeout(() => {
                    setState(produce(draft => {
                        draft.spellShowing = undefined;
                    }));
                }, 3000); // show spell for 3 seconds
            },
            onGameEnd: (winnerId: string) => {
                setState(produce(draft => {
                    draft.isGameOver = true;
                }));

                setTimeout(() => {
                    setState(produce(draft => {
                        draft.playerWonName = (draft.players.player.data.id === winnerId) ?
                            draft.players.player.data.name : draft.players.opponent.data.name;
                    }));
                }, 1000);

                setTimeout(() => {
                    setState(getPlaceholderGameState());
                    navigate(HOMEPAGE_PATH);
                }, 4000);
            }

        };

        const socket = createGameSocket(gameEvents, token);
        socketRef.current = socket;

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [token]);



    // emitters
    const queue = useCallback((deck: Deck) => {
        if (!isDeckFull(deck)) {
            alert("Get a full deck nub");
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

    const playUnit = useCallback((payload: PlayUnitPayload) => {
        emit(SOCKET_EVENTS.PLAY_UNIT, payload);
    }, [emit]);

    const playSpell = useCallback((payload: PlaySpellPayload) => {
        emit(SOCKET_EVENTS.PLAY_SPELL, payload);
    }, [emit]);

    const attackUnit = useCallback((payload: AttackUnitPayload) => {
        emit(SOCKET_EVENTS.ATTACK_UNIT, payload);
    }, [emit])

    const attackPlayer = useCallback((payload: AttackPlayerPayload) => {
        emit(SOCKET_EVENTS.ATTACK_PLAYER, payload)
    }, [emit]) 

    const buyArtifact = useCallback((payload: BuyArtifactPayload) => {
        setState(produce(draft => {
            draft.players.player.data.artifactsBoughtThisTurn += 1;
        }));

        emit(SOCKET_EVENTS.BUY_ARTIFACT, payload);
    }, [emit]);

    const endTurn = useCallback(() => {
        setState(produce(draft => {
            draft.isPlayerTurn = false;
            draft.players.player.data.turn += 1;

            if (draft.phase === GamePhase.SHOP) {
                draft.players.player.data.artifactsBoughtThisTurn = 0;
            }
        }));

        emit(SOCKET_EVENTS.END_TURN);
    }, [emit]);

    const selectTarget = useCallback((payload: SelectTargetPayload) => {
        setState(produce(draft => {
            draft.targetFilter = undefined;
        }));

        emit(SOCKET_EVENTS.SELECTED_TARGET, payload)
    }, [emit])


    const setAttackerSelected = (instance: UnitData | undefined) => {
        setState(produce(draft => {
            draft.attackerSelected = instance;
        }));
    }

    const emitters = useMemo(() => ({
        queue, dequeue, playUnit, playSpell, buyArtifact, endTurn, attackUnit, attackPlayer, selectTarget
    }), [queue, dequeue, playUnit, playSpell, buyArtifact, endTurn, attackUnit, attackPlayer, selectTarget]);

    const value = useMemo(() => ({
        state, isConnected, isInQueue, setAttackerSelected, emitters
    }), [state, isConnected, isInQueue, setAttackerSelected, emitters]);

    return (
        <GameContext.Provider value={value}> {children} </GameContext.Provider>
    );

}


export const useGameContext = () => {
    return useContext(GameContext);
}