import { ReactNode, createContext, useContext, useState, useEffect, useRef } from "react"
import io, { Socket } from 'socket.io-client'
import { ClientGameState, GameAction, GameActionType } from './types'
import { getPlaceholderGameState } from "../../shared/functions/game"


type GameContextType = {
    state: ClientGameState,
    isConnected: boolean,
    sendAction: (action: GameAction) => void
}

const GameContext = createContext<GameContextType>({
    state: getPlaceholderGameState(),
    isConnected: false,
    sendAction: () => {}
});


type GameProviderProps = {
    // TODO: add matchId and stuff
    // matchId: number,
    children: ReactNode
}


export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, setState] = useState<ClientGameState>(getPlaceholderGameState());
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = io(""); // TODO: listen to the real server
        socketRef.current = socket;

        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        // TODO: listen for game state updates

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, []);

    const sendAction = (action: GameAction) => {
        socketRef.current?.emit('action', action);
        console.log("sendAction:", action); //* debug
    }

    return (
        <GameContext.Provider value={{ state, isConnected, sendAction }}>
            {children}
        </GameContext.Provider>
    );

}


export const useGameContext = () => {
   return useContext(GameContext);
}


export const useGameActions = () => {
    const { sendAction } = useGameContext();

    return {
        placeUnit: (instanceId: string, boardIndex: number) => sendAction(
            { type: GameActionType.PLACE_UNIT, instanceId, boardIndex }
        ),

        playSpell: (instanceId: string) => sendAction(
            { type: GameActionType.PLAY_SPELL, instanceId }
        ),

        buyArtifact: (instanceId: number) => sendAction(
            { type: GameActionType.BUY_ARTIFACT, instanceId }
        ),

        endTurn: () => sendAction(
            { type: GameActionType.END_TURN }
        )
    };
};