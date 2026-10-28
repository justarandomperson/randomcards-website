import { Deck, Storage } from '../../shared/types/decks'


export type DeckState = {
    deck: Deck,
    storage: Storage
}

export type localDeck = {
    units: string[],
    spells: [string, number][]
}
