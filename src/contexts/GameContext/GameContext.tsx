import { ReactNode, createContext, useContext, useState } from "react";
import { ClientGameState, GameAction, GameActionType } from './types'
import { getPlaceholderGameState } from "../../shared/functions/game";


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
    // matchId: number ,
    children: ReactNode
}


export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, setState] = useState<ClientGameState>(getPlaceholderGameState());
    const [isConnected, setIsConnected] = useState(false);

    // TODO: connect to socket, set up state and match id

    const sendAction = (action: GameAction) => {
        // TODO: call server to run the intended action and use it

        console.log("sendAction:", action);
    }

    return (
        <GameContext.Provider value={{ state, isConnected, sendAction }}>
            {children}
        </GameContext.Provider>
    );

}


export const useGameContext = () => {
    const context = useContext(GameContext);
        
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
        
    return context;
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