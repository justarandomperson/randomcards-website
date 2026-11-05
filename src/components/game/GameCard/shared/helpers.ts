import { CardType } from "../../Card/shared/types";
import { CardLocation, CardZone } from "./types";


export const isCardLocationCorrect = (cardType: CardType, location: CardLocation): boolean => {
    if (cardType === CardType.UNIT && location.insideOf === CardZone.HAND) {
        return false;
    }
    if (cardType === CardType.SPELL && location.insideOf !== CardZone.HAND) {
        return false;
    }

    return true;
} 