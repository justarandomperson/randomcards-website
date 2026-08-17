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
}

type BenchAction = 
    {type: ""}

const benchReducer = (state: Bench, action: BenchAction ) => {
    switch (action.type) {
            
        default:
            throw new Error('benchReducer does not have this type. ');
    }
}


export type { UnitData, BenchContextType }
export { BenchActionType, benchReducer }
export { MAX_BENCH_SIZE }