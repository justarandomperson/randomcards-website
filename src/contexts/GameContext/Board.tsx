const MAX_CARDS_PER_ROW = 4;


type UnitData = {
    instanceId: string;
    name: string;
    hp: string;
    atk: string;
    cost: string;
    effect: string;
    type: 'unit';
}

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


export type { UnitData, BoardContextType }
export { BoardActionType, boardReducer }
export { MAX_CARDS_PER_ROW }