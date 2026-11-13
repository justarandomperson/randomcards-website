export type Statuses = { 
    haste: boolean
    taunt: boolean
    paralyzed: boolean
    silenced: boolean
    dodge: number
    cooldown: number
}

export type AnyInstance = UnitData | SpellData

export type UnitData = {
    instanceId?: string
    id: string
    name: string
    type: CardType.UNIT
    effectDesc: string
    statuses: Statuses
    cost: number
    hp: number
    atk: number
    canAttack?: boolean
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
