import { ArtifactData } from '../../types/artifact'
import { NULL_ARTIFACT } from '../../constants/game';


type Shop = {
    artifacts: [ArtifactData, ArtifactData, ArtifactData, ArtifactData, ArtifactData] // 5 artifacts in shop
};

type ShopContextType = {
    shop: Shop
    dispatch: React.Dispatch<ShopAction>
};

export type { ShopContextType };


enum ShopActionType {
    BUY_ARTIFACT = 'BUY_ARTIFACT',
    REFILL_SHOP = 'REFILL_SHOP'
}

type ShopAction =
    | { type: ShopActionType.BUY_ARTIFACT; index: number; money_amount: number } 
    | { type: ShopActionType.REFILL_SHOP }

const buyArtifact = (state: Shop, index: number, money_amount: number): Shop => {
   const artifactToBuy = state.artifacts[index];

    if (artifactToBuy.id === 0) {
        return state; // id0 is an empty slot 
    }
    if (money_amount < artifactToBuy.cost) {
        return state; // cant afford
    }

    const newArtifacts = [...state.artifacts] as Shop['artifacts'];
    newArtifacts[index] = NULL_ARTIFACT

    return {
        ...state,
        artifacts: newArtifacts
    }; 
}

const refillShop = (state: Shop): Shop => {
    const newArtifacts = state.artifacts.map(artifact =>
        artifact.id === 0 ? getRandomArtifact() : artifact
    ) as Shop['artifacts']; 

    return {
        ...state,
        artifacts: newArtifacts
    }
}

export {ShopActionType }


const shopReducer = (state: Shop, action: ShopAction): Shop => {
    switch (action.type) {
        case ShopActionType.BUY_ARTIFACT:
            return buyArtifact(state, action.index, action.money_amount);

        case ShopActionType.REFILL_SHOP:
            return refillShop(state);

        default:
            throw new Error('shopReducer does not have this type. ');
    }
}

export { shopReducer };


const getRandomArtifact = (): ArtifactData => {
    // not random rn
    return { id: 9, name: "Lucas ball", effect: "...", cost: 9 };
}