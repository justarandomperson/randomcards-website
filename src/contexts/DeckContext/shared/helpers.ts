import { CardType, SpellData, UnitData } from "../../../components/game/Card/shared/types";
import { MAX_EACH_SPELL_IN_DECK, SPELLS_IN_DECK, UNITS_IN_DECK } from "./constants";
import { Deck, DeckIds, LocalDeck, Storage } from "./types";


export const saveDeckToLocalStorage = (deck: Deck) => {
    localStorage.setItem("deck",
        JSON.stringify({
            units: deck.units.map(unit => unit.id),
            spells: Array.from(deck.spells, ([spellId, spell]) => [spellId, spell.amount])
        })
    );
}


export const populateDeckFromStorage = (parsedLocalDeck: LocalDeck, storage: Storage): {deck: Deck, storage: Storage} => {
    const populatedDeck = getPopulatedDeck(parsedLocalDeck, storage);
    const updatedStorage = getUpdatedStorage(populatedDeck, storage);

    return { deck: populatedDeck, storage: updatedStorage }
}

const getPopulatedDeck = (parsedLocalDeck: LocalDeck, storage: Storage): Deck => {
    const units: UnitData[] = [];
    for (const unitId of parsedLocalDeck.units) {
        const unit = storage.units.find((unit) => unit.id === unitId);
        if (unit) { 
            units.push(unit);
        }
    }

    const spells = new Map<string, { data: SpellData; amount: number }>();
    for (const [spellId, amount] of parsedLocalDeck.spells) {
        const spell = storage.spells.get(spellId);
        if (spell) {
            spells.set(spellId, { data: spell.data, amount });
        }
    }

    const populatedDeck = { units, spells };
    return populatedDeck;
}

const getUpdatedStorage = (populatedDeck: Deck, storage: Storage) => {
    const units: UnitData[] = storage.units.filter(
        (unit) => {
            !populatedDeck.units.some(deckUnit => deckUnit.id === unit.id)
        }
    );

    const spells = new Map<string, { data: SpellData; amount: number }>();
    for (const [spellId, spell] of storage.spells) {
        const amountInDeck = populatedDeck.spells.get(spellId)?.amount ?? 0;
        const remainingSpells = MAX_EACH_SPELL_IN_DECK - amountInDeck;

        if (remainingSpells > 0) {
            spells.set(spellId, { ...spell, amount: remainingSpells });
        };
    }

    const updatedStorage = { units, spells };
    return updatedStorage
}


export const getDeckIds = (deck: Deck): DeckIds => {
    const unitIds = deck.units.map((unit) => unit.id);
    const spellIds = [];

    for (const spell of deck.spells.values()) {
        for (let i = 0; i < spell.amount; i++) {
            spellIds.push(spell.data.id);
        }
    };

    return { unitIds, spellIds };
}


export const isUnitsDeckFull = (deck: Deck): boolean => {
    return deck.units.length >= UNITS_IN_DECK;
}

export const isSpellsDeckFull = (deck: Deck): boolean => {

    let length = 0;

    for (const spell of deck.spells.values()) {
        for (let i = 0; i < spell.amount; i++) {
            length += 1;
        }
    };

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


export const getPlaceholderStorage = (): Storage => {
    return { units: [], spells: new Map };
}