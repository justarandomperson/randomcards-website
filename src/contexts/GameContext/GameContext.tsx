import { ReactNode, createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Socket } from 'socket.io-client'
import { produce } from 'immer'
import { BuyArtifactPayload, ClientGameState, GameSocketEvents, PlaySpellPayload, PlayUnitPayload, SOCKET_EVENT_NAMES } from './types'
import { getPlaceholderGameState } from "../../shared/functions/game"
import { createGameSocket } from "./socket"
import { SpellData, UnitData } from "../../shared/types/card"
import { ArtifactData, GamePhase } from "../../shared/types/game"
import { useAuth } from "../AuthContext/AuthContext"


type GameContextType = {
    state: ClientGameState,
    isConnected: boolean,
    playUnit: (payload: PlayUnitPayload) => void,
    playSpell: (payload: PlaySpellPayload) => void,
    buyArtifact: (payload: BuyArtifactPayload) => void,
    endTurn: () => void
}

const GameContext = createContext<GameContextType>({
    state: getPlaceholderGameState(),
    isConnected: false,
    playUnit: () => {},
    playSpell: () => {},
    buyArtifact: () => {},
    endTurn: () => {}
});


type GameProviderProps = {
    gameId: number,
    children: ReactNode
}


export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, setState] = useState<ClientGameState>(getPlaceholderGameState());
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const token = useAuth().user?.token as string;


    useEffect(() => {
        const gameEvents: GameSocketEvents = {
            onConnect: () => setIsConnected(true),
            onDisconnect: () => setIsConnected(false),

            onStartTurn: () => {
                setState(produce(draft => {
                    // TODO: maybe change this to UpdateTurn and make it that it can change the opponent's turn too
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
            onUpdateMoney: (newMoney: number) => {
                setState(produce(draft => {
                    // TODO: add it so that this event works for changing the opponent's money too
                    draft.players.player.data.money = newMoney;
                }));
            }
        };

        const socket = createGameSocket(gameEvents, token);
        socketRef.current = socket;

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
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
        playUnit,
        playSpell,
        buyArtifact,
        endTurn
    }), [state, isConnected, playUnit, playSpell, buyArtifact, endTurn]);

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );

}


export const useGameContext = () => {
   return useContext(GameContext);
}