import { CardType, UnitData, SpellData, CardLocation, CardZone } from '../types/card'


export const getPlaceholderUnit = (): UnitData => {
    return {
        id: "U_1",
        name: "dog",
        type: CardType.UNIT,
        effectDesc: "im dog",
        cost: 3,
        hp: 1,
        atk: 2,
    };
}


export const getPlaceholderSpell = (): SpellData => {
    return {
        id: "S_1",
        name: "cat",
        type: CardType.SPELL,
        effectDesc: "although i may look like it, im not dog. have a wonderful rest of your day!",
        cost: 3,
    }
}


export const isCardLocationCorrect = (cardType: CardType, location: CardLocation): boolean => {
    if (cardType === CardType.UNIT && location.insideOf === CardZone.HAND) {
        return false;
    }
    if (cardType === CardType.SPELL && location.insideOf !== CardZone.HAND) {
        return false;
    }

    return true;
} 