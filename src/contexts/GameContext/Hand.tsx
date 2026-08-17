const MAX_HAND_SIZE = 6;
const MAX_DRAW_PILE_SIZE = 12;


type SpellData = {
    instanceId: string;
    name: string;
    cost: string;
    effect: string;
    type: 'spell';
}

type Hand = {
    cardsInHand: SpellData[], // max 6
    cardsInDrawPile: SpellData[] // max 12
};

type HandContextType = {
    hand: Hand;
    dispatch: React.Dispatch<HandAction>;
};


enum HandActionType {
    DRAW_CARD = 'DRAW_CARD'
}

type HandAction = 
    { type: HandActionType.DRAW_CARD }


const handReducer = (state: Hand, action: HandAction ) => {
    switch (action.type) {
        case HandActionType.DRAW_CARD: {
            if (state.cardsInDrawPile.length === 0) {
                return state;
            }
            if (state.cardsInHand.length === MAX_HAND_SIZE) {
                return state;
            }

            const [drawnCard, ...remainingDrawPile] = state.cardsInDrawPile;

            return {
                ...state,
                cardsInHand: [...state.cardsInHand, drawnCard],
                cardsInDrawPile: remainingDrawPile
            };
        }
            
        default:
            throw new Error('handReducer does not have this type. ');
    }
}


export type { SpellData, HandContextType }
export { HandActionType, handReducer }
export { MAX_DRAW_PILE_SIZE }