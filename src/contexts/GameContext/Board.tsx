import { UnitData } from '../../types/card'


type Board = {
    playerCards: (UnitData | null)[] // max 4
    opponentCards: (UnitData | null)[] // max 4
};

type BoardContextType = {
    board: Board;
    dispatch: React.Dispatch<BoardAction>;
};


enum BoardActionType {
    PLACE_CARD = 'PLACE_CARD'
}

type BoardAction = 
    | {type: BoardActionType.PLACE_CARD; card: UnitData; index: number}


const boardReducer = (state: Board, action: BoardAction ) => {
    switch (action.type) {
        case BoardActionType.PLACE_CARD: {
            const newPlayerCards = [...state.playerCards];
            newPlayerCards[action.index] = action.card;

            return {
                ...state,
                playerCards: newPlayerCards
            };
        }
            
        default:
            throw new Error('boardReducer does not have this type. ');
    }
}


export type { BoardContextType }
export { BoardActionType, boardReducer }