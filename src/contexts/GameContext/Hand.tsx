import { SpellData } from '../../types/card'
import { MAX_HAND_SIZE } from '../../constants/game';


type Hand = {
    cardsInHand: SpellData[], // max 6
    cardsInDrawPile: SpellData[] // max 12
};

type HandContextType = {
    hand: Hand;
    dispatch: React.Dispatch<HandAction>;
};

export type { HandContextType }


enum HandActionType {
    DRAW_CARD = 'DRAW_CARD',
    REMOVE_CARD = 'REMOVE_CARD'
}

type HandAction = 
    | { type: HandActionType.DRAW_CARD }
    | { type: HandActionType.REMOVE_CARD; index: number }

const drawCard = (state: Hand): Hand => {
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

const removeCard = (state: Hand, indexToRemove: number): Hand => {
    return {
        ...state,
        cardsInHand: state.cardsInHand.filter((_, i) => i !== indexToRemove)
    }
}

export { HandActionType }


const handReducer = (state: Hand, action: HandAction): Hand => {
    switch (action.type) {
        case HandActionType.DRAW_CARD: 
            return drawCard(state);

        case HandActionType.REMOVE_CARD: 
            return removeCard(state, action.index)
            
        default:
            throw new Error('handReducer does not have this type. ');
    }
}

export { handReducer }