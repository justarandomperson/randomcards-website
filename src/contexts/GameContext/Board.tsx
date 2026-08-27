import { UnitData } from '../../types/card'


type Board = {
    playerCards: (UnitData | null)[] // max 4
    opponentCards: (UnitData | null)[] // max 4
};

type BoardContextType = {
    board: Board;
    dispatch: React.Dispatch<BoardAction>;
};

export type { BoardContextType }


enum BoardActionType {
    PLACE_CARD = 'PLACE_CARD'
}

type BoardAction = 
    | {type: BoardActionType.PLACE_CARD; card: UnitData; index: number}

const placeCard = (state: Board, card: UnitData, index: number): Board => {
    const newPlayerCards = [...state.playerCards];
    newPlayerCards[index] = card;

    return {
        ...state,
        playerCards: newPlayerCards
    };
}

export { BoardActionType }


const boardReducer = (state: Board, action: BoardAction ) => {
    switch (action.type) {
        case BoardActionType.PLACE_CARD:
            return placeCard(state, action.card, action.index);
            
        default:
            throw new Error('boardReducer does not have this type. ');
    }
}

export { boardReducer }