import { UnitData } from '../../types/card'


type Bench = {
    cards: (UnitData | null)[] // max 8
};

type BenchContextType = {
    bench: Bench;
    dispatch: React.Dispatch<BenchAction>;
};

export type { BenchContextType }


enum BenchActionType {
    MOVE_CARD = 'MOVE_CARD',
    REMOVE_CARD = 'REMOVE_CARD'
}

type BenchAction = 
    | { type: BenchActionType.MOVE_CARD; from: number, to: number }
    | { type: BenchActionType.REMOVE_CARD; index: number }


const moveCard = (state: Bench, from: number, to: number): Bench => {
    const newCards = [...state.cards];
    [newCards[from], newCards[to]] = [newCards[to], newCards[from]];

    return {
        ...state,
        cards: newCards
    };
}

const removeCard = (state: Bench, index: number): Bench => {
    const newCards = [...state.cards];
    newCards[index] = null;

    return {
        ...state,
        cards: newCards
    };
}

export { BenchActionType }


const benchReducer = (state: Bench, action: BenchAction): Bench => {
    switch (action.type) {
        case BenchActionType.MOVE_CARD: 
            return moveCard(state, action.from, action.to);

        case BenchActionType.REMOVE_CARD:
            return removeCard(state, action.index);

        default:
            throw new Error('benchReducer does not have this type. ');
    }
}

export { benchReducer }