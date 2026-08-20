const MAX_BENCH_SIZE = 8


type UnitData = {
    instanceId: string;
    name: string;
    hp: string;
    atk: string;
    cost: string;
    effect: string;
    type: 'unit';
}

type Bench = {
    cards: (UnitData | null)[] // max 8
};

type BenchContextType = {
    bench: Bench;
    dispatch: React.Dispatch<BenchAction>;
};


enum BenchActionType {
    MOVE_CARD = 'MOVE_CARD',
    REMOVE_CARD = 'REMOVE_CARD'
}

type BenchAction = 
    | { type: BenchActionType.MOVE_CARD; from: number, to: number }
    | { type: BenchActionType.REMOVE_CARD; index: number }


const benchReducer = (state: Bench, action: BenchAction ) => {
    switch (action.type) {
        case BenchActionType.MOVE_CARD: {
            const newCards = [...state.cards];
            [newCards[action.from], newCards[action.to]] = [newCards[action.to], newCards[action.from]];

            return {
                ...state,
                cards: newCards
            };
        }

        case BenchActionType.REMOVE_CARD: {
            const newCards = [...state.cards];
            newCards[action.index] = null;

            return {
                ...state,
                cards: newCards
            };
        }

        default:
            throw new Error('benchReducer does not have this type. ');
    }
}


export type { UnitData, BenchContextType }
export { BenchActionType, benchReducer }
export { MAX_BENCH_SIZE }