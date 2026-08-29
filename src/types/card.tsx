type UnitData = {
    instanceId: string;
    name: string;
    hp: number;
    atk: number;
    cost: number;
    effect: string;
    type: 'unit';
}

type SpellData = {
    instanceId: string;
    name: string;
    cost: number;
    effect: string;
    type: 'spell';
}


type CardZone = 'hand' | 'bench' | 'board';

type CardLocation = {
    insideOf: CardZone;
    index: number;
};

type DraggedCard = {
    cardData: UnitData | SpellData;
    location: CardLocation;
};


export type { UnitData, SpellData }
export type { CardZone, CardLocation, DraggedCard };