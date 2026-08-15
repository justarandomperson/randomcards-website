import { useReducer, createContext, type PropsWithChildren, useContext } from 'react'


const STARTING_HEALTH = 20;
const STARTING_MONEY = 0;
const STARTING_TURN = 0;


type Player = {
    name: string;
    health: number;
    money: number;
    turn: number
};

type Players = {
    player: Player;
    opponent: Player;
};

type PlayersContextType = {
    players: Players;
    dispatch: React.Dispatch<PlayersAction>;
};


const PlayersContext = createContext<PlayersContextType | null>(null);


const PlayersProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [players, dispatch] = useReducer(playersReducer, {
        player: {
            name: "TinG",
            health: STARTING_HEALTH,
            money: STARTING_MONEY,
            turn: STARTING_TURN
        },
        opponent: {
            name: "TinG hater",
            health: STARTING_HEALTH,
            money: STARTING_MONEY,
            turn: STARTING_TURN
        }
    });

    const value = {
        players,
        dispatch
    }

    return <PlayersContext.Provider value={value}> {children} </PlayersContext.Provider>
}


const usePlayersContext = () => {
    const context = useContext(PlayersContext);
    
    if (!context) {
        throw new Error('usePlayersContext must be used within a PlayersProvider');
    }
    
    return context; // { players, setPlayers }
}


enum PlayersActionType {
    END_TURN = 'END_TURN',
    ADD_MONEY = 'ADD_MONEY'
}

enum PlayersActionTarget {
    PLAYER = 'player',
    OPPONENT = 'opponent'
}

type PlayersAction =
    | { type: PlayersActionType.END_TURN; target: PlayersActionTarget.PLAYER | PlayersActionTarget.OPPONENT }
    | { type: PlayersActionType.ADD_MONEY; target: PlayersActionTarget.PLAYER | PlayersActionTarget.OPPONENT; amount: number };


const playersReducer = (state: Players, action: PlayersAction ) => {
    const player = state[action.target];

    switch (action.type) {
        case PlayersActionType.END_TURN:
            // now what do i type here?
            return {
                ...state,
                [action.target]: {
                    ...player,
                    turn: player.turn + 1
                }
            };

        case PlayersActionType.ADD_MONEY:
            return {
                ...state,
                [action.target]: {
                    ...player,
                    money: player.money + action.amount
                }
            }
            
        default:
            throw new Error('playersReducer does not have this type. ');
    }
}


export { PlayersContext, PlayersProvider, usePlayersContext, PlayersActionType, PlayersActionTarget }