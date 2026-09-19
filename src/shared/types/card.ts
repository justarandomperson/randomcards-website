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
    BOARD = 'board'
}

export type CardLocation = {
    insideOf: CardZone
    index: number
};

export type DraggedCard = {
    cardData: UnitData | SpellData
    location: CardLocation
};