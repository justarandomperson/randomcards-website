import { UnitData, SpellData } from './card'


export type Storage = {
    units: Map<string, { data: UnitData, amount: number }>,
    spells: Map<string, { data: SpellData, amount: number }>
};

export type Deck = {
    units: UnitData[],
    spells: SpellData[]
};

export type CardLocation = 'deck' | 'storage';