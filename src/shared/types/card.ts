// card data
export enum CardType {
    UNIT = 'UNIT',
    SPELL = 'SPELL'
}

export type UnitData = {
    instanceId: string,
    name: string,
    type: CardType.UNIT
    effect: string,
    cost: number,
    hp: number,
    atk: number
}

export type SpellData = {
    instanceId: string,
    name: string,
    type: CardType.SPELL,
    effect: string,
    cost: number
}


// drag and drop
export enum CardZone {
    HAND = 'hand',
    BENCH = 'bench',
    BOARD = 'board'
}

export type CardLocation = {
    insideOf: CardZone;
    index: number;
};

export type DraggedCard = {
    cardData: UnitData | SpellData;
    location: CardLocation;
};