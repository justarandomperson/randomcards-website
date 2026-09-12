import { ReactNode, createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Socket } from 'socket.io-client'
import { produce } from 'immer'
import { BuyArtifactPayload, ClientGameState, GameSocketEvents, PlaySpellPayload, PlayUnitPayload, QueuePayload, SOCKET_EVENT_NAMES } from './types'
import { getPlaceholderGameState } from "../../shared/functions/game"
import { createGameSocket } from "./socket"
import { SpellData, UnitData } from "../../shared/types/card"
import { ArtifactData, GamePhase } from "../../shared/types/game"
import { useAuth } from "../AuthContext/AuthContext"
import { isDeckFull } from "../../shared/functions/decks"
import { useNavigate } from "react-router-dom"


type GameContextType = {
    state: ClientGameState,
    isConnected: boolean,
    queue: (payload: QueuePayload) => void,
    playUnit: (payload: PlayUnitPayload) => void,
    playSpell: (payload: PlaySpellPayload) => void,
    buyArtifact: (payload: BuyArtifactPayload) => void,
    endTurn: () => void
}

const GameContext = createContext<GameContextType>({
    state: getPlaceholderGameState(),
    isConnected: false,
    queue: () => {},
    playUnit: () => {},
    playSpell: () => {},
    buyArtifact: () => {},
    endTurn: () => {}
});


type GameProviderProps = {
    children: ReactNode
}


export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, setState] = useState<ClientGameState>(getPlaceholderGameState());
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const navigate = useNavigate();
    const token = useAuth().user?.token as string;


    useEffect(() => {
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
                    draft.board.player = newBoard.slice(0, 4);
                    draft.board.opponent = newBoard.slice(4, 8);
                }));
            },
            onUpdateMoney: (newMoney: number, playerId: string) => {
                setState(produce(draft => {
                    socket.id === playerId ? 
                        draft.players.player.data.money = newMoney : draft.players.opponent.data.money = newMoney;
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
        if (!socketRef.current) return;
        if (!isDeckFull(payload)) return;
        
        // TODO: server only receives units rn u will have to change it later
        const unit_ids = payload.units.map((unit) => unit.id)

        socketRef.current.emit(SOCKET_EVENT_NAMES.QUEUE, unit_ids);

        alert("meow");
    }, []);

    const playUnit = useCallback((payload: PlayUnitPayload) => {
        if (!socketRef.current) return;
        socketRef.current.emit(SOCKET_EVENT_NAMES.PLAY_UNIT, payload);
    }, []);

    const playSpell = useCallback((payload: PlaySpellPayload) => {
        if (!socketRef.current) return;
        socketRef.current.emit(SOCKET_EVENT_NAMES.PLAY_SPELL, payload);
    }, []);

    const buyArtifact = useCallback((payload: BuyArtifactPayload) => {
        if (!socketRef.current) return;
        socketRef.current.emit(SOCKET_EVENT_NAMES.BUY_ARTIFACT, payload);
    }, []);

    const endTurn = useCallback(() => {
        if (!socketRef.current) return;
        socketRef.current.emit(SOCKET_EVENT_NAMES.END_TURN);
    }, []);


    const value = useMemo(() => ({
        state,
        isConnected,
        queue,
        playUnit,
        playSpell,
        buyArtifact,
        endTurn
    }), [state, isConnected, 
        queue, playUnit, playSpell, buyArtifact, endTurn]);

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );

}


export const useGameContext = () => {
   return useContext(GameContext);
}