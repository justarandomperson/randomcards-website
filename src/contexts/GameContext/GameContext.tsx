import { ReactNode, createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Socket } from 'socket.io-client'
import { produce } from 'immer'
import { BuyArtifactPayload, ClientGameState, GameSocketEvents, MatchStartData, PlayerData, PlaySpellPayload, PlayUnitPayload, SOCKET_EVENT_NAMES, UpdateArtifactData, UpdateCardData, UpdateDrawpileCountData, UpdateHealthData, UpdateMoneyData } from './types'
import { getPlaceholderGameState } from "../../shared/functions/game"
import { createGameSocket, useGameSocketEmit } from "./socket"
import { CardType, CardZone, SpellData, UnitData } from "../../shared/types/card"
import { ArtifactData, ArtifactZone, GamePhase } from "../../shared/types/game"
import { useAuth } from "../AuthContext/AuthContext"
import { isDeckFull } from "../../shared/functions/decks"
import { useNavigate } from "react-router-dom"
import { Deck } from "../../shared/types/decks"
import { getDeckIds, matchPlayerIds, removeArtifactInstance, removeCardInstance } from "./helpers"
import Card from "../../components/game/Card/Card"


type GameContextType = {
    state: ClientGameState,
    isConnected: boolean,
    isInQueue: boolean,
    emitters: {
        queue: (deck: Deck) => void,
        dequeue: () => void,
        playUnit: (payload: PlayUnitPayload) => void,
        playSpell: (payload: PlaySpellPayload) => void,
        buyArtifact: (payload: BuyArtifactPayload) => void,
        endTurn: () => void
    }
}

const GameContext = createContext<GameContextType>({
    state: getPlaceholderGameState(),
    isConnected: false,
    isInQueue: false,
    emitters: {
        queue: () => {},
        dequeue: () => {},
        playUnit: () => {},
        playSpell: () => {},
        buyArtifact: () => {},
        endTurn: () => {}
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
        if (!token) return;

        const gameEvents: GameSocketEvents = {
            onConnect: () => { 
                setIsConnected(true);
            },
            onDisconnect: () => {
                setIsConnected(false); 
                setIsInQueue(false);
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
                    player.data.health = data.newHealth;
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
                            draft.board[data.index] = data.card;
                            break;

                        case CardZone.HAND: {
                            if (data.card.type === CardType.UNIT) {
                                throw new Error(`card ${data.card.name} cannot exist in ${data.location.insideOf}`);
                            }
                            const hand = draft.players.player.cards.hand;
                            hand.splice(data.index, 0, data.card);
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
            return;
        }

        const payload = getDeckIds(deck);

        setIsInQueue(true);
        emit(SOCKET_EVENT_NAMES.QUEUE, payload);
    }, [emit]);

    const dequeue = useCallback(() => {
        setIsInQueue(false);
        emit(SOCKET_EVENT_NAMES.DEQUEUE);
    }, [emit]);


    const playUnit = useCallback((payload: PlayUnitPayload) => {
        emit(SOCKET_EVENT_NAMES.PLAY_UNIT, payload);
    }, [emit]);

    const playSpell = useCallback((payload: PlaySpellPayload) => {
        emit(SOCKET_EVENT_NAMES.PLAY_SPELL, payload);
    }, [emit]);

    const buyArtifact = useCallback((payload: BuyArtifactPayload) => {
        emit(SOCKET_EVENT_NAMES.BUY_ARTIFACT, payload);
    }, [emit]);

    const endTurn = useCallback(() => {
        setState(produce(draft => {
            draft.isPlayerTurn = false;
        }));
        emit(SOCKET_EVENT_NAMES.END_TURN);
    }, [emit]);


    const emitters = useMemo(() => ({
        queue, dequeue, playUnit, playSpell, buyArtifact, endTurn
    }), [queue, dequeue, playUnit, playSpell, buyArtifact, endTurn]);


    const value = useMemo(() => ({
        state, isConnected, isInQueue, emitters
    }), [state, isConnected, isInQueue, emitters]);

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );

}


export const useGameContext = () => {
return useContext(GameContext);
}