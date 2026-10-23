import { CardType, SpellData } from "../types/card";
import { Deck } from "../types/decks";
import { UNITS_IN_DECK, SPELLS_IN_DECK } from '../constants/game';


export const isUnitsDeckFull = (deck: Deck): boolean => {
    return deck.units.length >= UNITS_IN_DECK;
}

export const isSpellsDeckFull = (deck: Deck): boolean => {
    console.log("deck.spells map")
    console.log(deck.spells);

    let length = 0;

    for (const spell of deck.spells.values()) {
        for (let i = 0; i < spell.amount; i++) {
            console.log(`amount ${spell.amount}`);
            length += 1;
        }
    };

    console.log(length);
    return length >= SPELLS_IN_DECK;
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