import { UnitData, SpellData } from './card'


export type Storage = {
    units: UnitData[],
    spells: SpellData[]
}

export type Deck = {
    units: UnitData[],
    spells: SpellData[]
}

export type CardLocation = 'deck' | 'storage'