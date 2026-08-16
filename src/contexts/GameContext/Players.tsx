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


enum PlayersActionType {
    END_TURN = 'END_TURN',
    ADD_MONEY = 'ADD_MONEY',
    REMOVE_MONEY = 'REMOVE_MONEY'
}

enum PlayersActionTarget {
    PLAYER = 'player',
    OPPONENT = 'opponent'
}

type PlayersAction =
    | { type: PlayersActionType.END_TURN; target: PlayersActionTarget.PLAYER | PlayersActionTarget.OPPONENT }
    | { type: PlayersActionType.ADD_MONEY; target: PlayersActionTarget.PLAYER | PlayersActionTarget.OPPONENT; amount: number }
    | { type: PlayersActionType.REMOVE_MONEY; target: PlayersActionTarget.PLAYER | PlayersActionTarget.OPPONENT; amount: number }



const playersReducer = (state: Players, action: PlayersAction ) => {
    const player = state[action.target];

    switch (action.type) {
        case PlayersActionType.END_TURN: {
            return {
                ...state,
                [action.target]: {
                    ...player,
                    turn: player.turn + 1
                }
            };
        }

        case PlayersActionType.ADD_MONEY: {
            return {
                ...state,
                [action.target]: {
                    ...player,
                    money: player.money + action.amount
                }
            }
        }

        case PlayersActionType.REMOVE_MONEY: {
            return {
                ...state,
                [action.target]: {
                    ...player,
                    money: player.money - action.amount
                }
            }
        }
            
        default:
            throw new Error('playersReducer does not have this type. ');
    }
}


export type { PlayersContextType }
export { PlayersActionType, PlayersActionTarget, playersReducer };
export { STARTING_HEALTH, STARTING_MONEY, STARTING_TURN }