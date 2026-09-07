import { CardType } from "../types/card";
import { Deck } from "../types/decks";
import { UNITS_IN_DECK, SPELLS_IN_DECK } from '../constants/game';


export const isUnitsDeckFull = (deck: Deck): boolean => {
    return deck.units.length >= UNITS_IN_DECK;
}

export const isSpellsDeckFull = (deck: Deck): boolean => {
    return deck.spells.length >= SPELLS_IN_DECK;
}

export const isDeckTypeFull = (cardType: CardType, deck: Deck): boolean => {
    if (cardType === CardType.UNIT) {
        return isUnitsDeckFull(deck);
    }

    return isSpellsDeckFull(deck);
}

export const isDeckFull = (deck: Deck): boolean => {
    return isUnitsDeckFull(deck) && isSpellsDeckFull(deck);
}