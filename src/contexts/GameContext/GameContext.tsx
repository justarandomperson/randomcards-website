import { ReactNode, createContext, useContext, useState, useEffect, useRef } from "react"
import { Socket } from 'socket.io-client'
import { ClientGameState, GameSocketEvents } from './types'
import { getPlaceholderGameState } from "../../shared/functions/game"
import { createGameSocket } from "./socket"


type GameContextType = {
    state: ClientGameState,
    isConnected: boolean
}

const GameContext = createContext<GameContextType>({
    state: getPlaceholderGameState(),
    isConnected: false
});


type GameProviderProps = {
    gameId: number,
    children: ReactNode
}


export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, setState] = useState<ClientGameState>(getPlaceholderGameState());
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const gameEvents: GameSocketEvents = {
            onConnect: () => setIsConnected(true),
            onDisconnect: () => setIsConnected(false),
           // TODO: add all other inline functions that call the receivers
        };

        const socket = createGameSocket(gameEvents);
        socketRef.current = socket;

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, []);


    // TODO: add listeners i think it must be done

    return (
        <GameContext.Provider value={{ state, isConnected }}>
            {children}
        </GameContext.Provider>
    );

}


export const useGameContext = () => {
   return useContext(GameContext);
}