import { SpellData, UnitData } from "../../Card/shared/types";


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