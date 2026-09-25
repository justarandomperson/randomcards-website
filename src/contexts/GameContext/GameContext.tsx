import { ReactNode, createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Socket } from 'socket.io-client'
import { produce } from 'immer'
import { BuyArtifactPayload, ClientGameState, GameSocketEvents, MatchStartData, PlayerData, PlaySpellPayload, PlayUnitPayload, SOCKET_EVENT_NAMES, UpdateArtifactData, UpdateCardData, UpdateDrawpileCountData, UpdateHealthData, UpdateMoneyData } from './types'
import { getPlaceholderGameState } from "../../shared/functions/game"
import { createGameSocket, useGameSocketEmit } from "./socket"
import { CardZone, SpellData, UnitData } from "../../shared/types/card"
import { ArtifactData, ArtifactZone, GamePhase } from "../../shared/types/game"
import { useAuth } from "../AuthContext/AuthContext"
import { isDeckFull } from "../../shared/functions/decks"
import { useNavigate } from "react-router-dom"
import { Deck } from "../../shared/types/decks"
import { getDeckIds, matchPlayerIds, removeArtifactInstance, removeCardInstance } from "./helpers"


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
                // TODO: implement isFirstTurn doing stuff
                setIsInQueue(false);

                setState(produce(draft => {
                    draft.players.player.data = data.playerData;
                    draft.players.opponent.data = data.opponentData;
                }));

                navigate('/game');
            },
            onStartTurn: () => {
                setState(produce(draft => {
                    draft.players.player.data.turn += 1;
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
                    throw new Error(`card ${data.card.name} in ${data.insideOf} has no instanceId`);
                }

                setState(produce(draft => {
                    removeCardInstance(draft, instanceId);

                    switch (data.insideOf) {
                        case CardZone.BENCH:
                            draft.players.player.cards.bench[data.index] = data.card;
                            break;
                        case CardZone.BOARD:
                            draft.board[data.index] = data.card;
                            break;
                        case CardZone.HAND: {
                            const hand = draft.players.player.cards.hand;
                            hand.splice(data.index, 0, data.card);
                            break;
                        }
                    }
                }));
            },
            onUpdateArtifact: (data: UpdateArtifactData) => {
                setState(produce(draft => {
                    removeArtifactInstance(draft, data.artifact.instanceId);

                    switch (data.insideOf) {
                        case ArtifactZone.SHOP:
                            draft.shop[data.index] = data.artifact;
                            break;
                        case ArtifactZone.PLAYER: {
                            const player = matchPlayerIds(draft, data.playerId, socket.id)
                            player.data.artifacts.splice(data.index, 0, data.artifact);
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