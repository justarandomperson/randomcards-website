import { SpellData, UnitData } from "../../../components/game/Card/shared/types";


export type DeckState = {
    deck: Deck,
    storage: Storage
}

export type Deck = {
    units: UnitData[],
    spells: Map<string, { data: SpellData, amount: number }>
};

export type Storage = Deck


export type CardDeckZone = 'deck' | 'storage';


export type LocalDeck = {
    units: string[],
    spells: [string, number][]
}


export type DeckIds = {
    unitIds: string[],
    spellIds: string[]
}