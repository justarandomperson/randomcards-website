export type UnitData = {
    instanceId?: string
    id: string
    name: string
    type: CardType.UNIT
    effectDesc: string
    statuses: { 
        haste: boolean
        taunt: boolean
        paralyzed: boolean
        silenced: boolean
        dodge: number
    }
    cost: number
    hp: number
    atk: number
}

export type SpellData = {
    instanceId?: string
    id: string
    name: string
    type: CardType.SPELL
    effectDesc: string
    cost: number
}


export enum CardType {
    UNIT = 'unit',
    SPELL = 'spell'
}
