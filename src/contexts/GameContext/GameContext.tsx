import { ReactNode, createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Socket } from 'socket.io-client'
import { produce } from 'immer'
import { BuyArtifactPayload, ClientGameState, GameSocketEvents, PlaySpellPayload, PlayUnitPayload, QueuePayload, SOCKET_EVENT_NAMES } from './types'
import { getPlaceholderGameState } from "../../shared/functions/game"
import { createGameSocket, useGameSocketEmit } from "./socket"
import { CardLocation, CardType, CardZone, SpellData, UnitData } from "../../shared/types/card"
import { ArtifactData, GamePhase } from "../../shared/types/game"
import { useAuth } from "../AuthContext/AuthContext"
import { isDeckFull } from "../../shared/functions/decks"
import { useNavigate } from "react-router-dom"


type GameContextType = {
    state: ClientGameState,
    isConnected: boolean,
    isInQueue: boolean,
    emitters: {
        queue: (payload: QueuePayload) => void,
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
            onConnect: () => setIsConnected(true),
            onDisconnect: () => setIsConnected(false),

            onMatchStart: () => {
                navigate('/game');
            },
            onStartTurn: () => {
                setState(produce(draft => {
                    draft.players.player.data.turn += 1;
                }));
            },
            onRefillShop: (newShop: ArtifactData[]) => {
                setState(produce(draft => {
                    draft.shop.artifacts = newShop;
                }));
            },
            onUpdateGamePhase: () => {
                setState(produce(draft => {
                    draft.phase = draft.phase === GamePhase.PLAY ? GamePhase.SHOP : GamePhase.PLAY;
                }));
            },
            onUpdateCard: (newCard: UnitData | SpellData, location: CardLocation) => {
                setState(produce(draft => {
                    switch(location.insideOf) {
                        case CardZone.BENCH:
                            if (newCard.type !== CardType.UNIT) return;
                            draft.players.player.cards.bench[location.index] = newCard;
                            break;
                            
                        case CardZone.BOARD:
                            if (newCard.type !== CardType.UNIT) return;
                            draft.board[location.index] = newCard;
                            break;

                        case CardZone.HAND:
                            if (newCard.type !== CardType.SPELL) return;
                            draft.players.player.cards.hand[location.index] = newCard;
                            break;
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
            onUpdateMoney: (newMoney: number, playerId: string) => {
                setState(produce(draft => {
                    if (socket.id === playerId) {
                        draft.players.player.data.money = newMoney;
                    } else {
                        draft.players.opponent.data.money = newMoney;
                    }
                }));
            }
        };

        const socket = createGameSocket(gameEvents, token);
        socketRef.current = socket;

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [token]);


    const queue = useCallback((payload: QueuePayload) => {
        if (!isDeckFull(payload)) return;
        
        // TODO: server only receives units rn. u will have to change it later as server grows
        const unit_ids = payload.units.map((unit) => unit.id)

        setIsInQueue(true);
        emit(SOCKET_EVENT_NAMES.QUEUE, unit_ids);
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
        state,
        isConnected,
        isInQueue,
        emitters
    }), [state, isConnected, emitters]);

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );

}


export const useGameContext = () => {
   return useContext(GameContext);
}