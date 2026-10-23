import { UnitData, SpellData } from './card'


export type Storage = {
    units: UnitData[],
    spells: Map<string, { data: SpellData, amount: number }>
};

export type Deck = {
    units: UnitData[],
    spells: Map<string, { data: SpellData, amount: number }>
};

export type CardLocation = 'deck' | 'storage';