import { ArtifactData } from "../../types/artifact";


type Player = {
    name: string;
    health: number;
    money: number;
    turn: number;
    artifacts: ArtifactData[];
};

type Players = {
    player: Player;
    opponent: Player;
};

type PlayersContextType = {
    players: Players;
    dispatch: React.Dispatch<PlayersAction>;
};

export type { PlayersContextType }


enum PlayersActionType {
    END_TURN = 'END_TURN',
    ADD_MONEY = 'ADD_MONEY',
    REMOVE_MONEY = 'REMOVE_MONEY',
    ADD_ARTIFACT = 'ADD_ARTIFACT'
}

enum PlayersActionTarget {
    PLAYER = 'player',
    OPPONENT = 'opponent'
}

type PlayersAction =
    | { type: PlayersActionType.END_TURN; target: PlayersActionTarget.PLAYER | PlayersActionTarget.OPPONENT }
    | { type: PlayersActionType.ADD_MONEY; target: PlayersActionTarget.PLAYER | PlayersActionTarget.OPPONENT; amount: number }
    | { type: PlayersActionType.REMOVE_MONEY; target: PlayersActionTarget.PLAYER | PlayersActionTarget.OPPONENT; amount: number }
    | { type: PlayersActionType.ADD_ARTIFACT; target: PlayersActionTarget.PLAYER | PlayersActionTarget.OPPONENT; artifact: ArtifactData}

const endTurn = (state: Players, target: PlayersActionTarget, player: Player): Players => {
    return {
        ...state,
        [target]: {
            ...player,
            turn: player.turn + 1
        }
    };
}

const addMoney = (state: Players, target: PlayersActionTarget, amount: number, player: Player): Players => {
    return {
        ...state,
        [target]: {
            ...player,
            money: player.money + amount
        }
    }
}

const removeMoney = (state: Players, target: PlayersActionTarget, amount: number, player: Player): Players => {
    return {
        ...state,
        [target]: {
            ...player,
            money: player.money - amount
        }
    }
}

const addArtifact = (state: Players, target: PlayersActionTarget, artifact: ArtifactData, player: Player): Players => {
    return {
        ...state,
        [target]: {
            ...player,
            artifacts: [...player.artifacts, artifact]
        }
    }
}

export { PlayersActionType, PlayersActionTarget }


const playersReducer = (state: Players, action: PlayersAction): Players => {
    const player = state[action.target];

    switch (action.type) {
        case PlayersActionType.END_TURN: 
            return endTurn(state, action.target, player);

        case PlayersActionType.ADD_MONEY:
            return addMoney(state, action.target, action.amount, player);

        case PlayersActionType.REMOVE_MONEY: 
            return removeMoney(state, action.target, action.amount, player);

        case PlayersActionType.ADD_ARTIFACT:
            return addArtifact(state, action.target, action.artifact, player);
            
        default:
            throw new Error('playersReducer does not have this type. ');
    }
}

export { playersReducer }


const isMoneySufficient = (moneyAvailable: number, cost: number): boolean => {
    return moneyAvailable >= cost;
}

export { isMoneySufficient }

