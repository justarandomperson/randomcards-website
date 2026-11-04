// card data
export enum CardType {
    UNIT = 'unit',
    SPELL = 'spell'
}

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


// drag and drop
export enum CardZone {
    HAND = 'hand',
    BENCH = 'bench',
    BOARD = 'board',
    NONE = 'none'
}

export type CardLocation = 
    | { insideOf: CardZone.BENCH | CardZone.BOARD | CardZone.HAND, index: number }
    | { insideOf: CardZone.NONE }

export type DraggedCard = {
    cardData: UnitData | SpellData
    location: CardLocation
};