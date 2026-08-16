type ArtifactData = {
    id: number;
    name: string;
    effect: string;
    cost: number;
};

const noArtifact: ArtifactData = {id: 0, name: "", effect: "", cost: 0}; // empty shop slot

type Shop = {
    artifacts: [ArtifactData, ArtifactData, ArtifactData, ArtifactData, ArtifactData] // 5 artifacts in shop
};

type ShopContextType = {
    shop: Shop
    dispatch: React.Dispatch<ShopAction>
};


enum ShopActionType {
    BUY_ARTIFACT = 'BUY_ARTIFACT',
    REFILL_SHOP = 'REFILL_SHOP'
}

type ShopAction =
    | { type: ShopActionType.BUY_ARTIFACT; index: number; money_amount: number } 
    | { type: ShopActionType.REFILL_SHOP }


const shopReducer = (state: Shop, action: ShopAction ) => {
    switch (action.type) {
        case ShopActionType.BUY_ARTIFACT: {                          
            const artifactToBuy = state.artifacts[action.index];

            if (artifactToBuy.id === 0) {
                return state; // id0 is an empty slot 
            }
            if (action.money_amount < artifactToBuy.cost) {
                return state; // cant afford
            }

            const newArtifacts = [...state.artifacts] as Shop['artifacts'];
            newArtifacts[action.index] = noArtifact; // set to id0

            return {
                ...state,
                artifacts: newArtifacts
            };
        }

        case ShopActionType.REFILL_SHOP: {
            const newArtifacts = state.artifacts.map(artifact =>
                artifact.id === 0 ? getRandomArtifact() : artifact
            ) as Shop['artifacts']; 

            return {
                ...state,
                artifacts: newArtifacts
            }
        }

        default:
            throw new Error('shopReducer does not have this type. ');
    }
}


const getRandomArtifact = () => {
    // not random rn
    return { id: 9, name: "Lucas ball", effect: "...", cost: 9 };
}


export type { ArtifactData, ShopContextType };
export { ShopActionType, shopReducer };