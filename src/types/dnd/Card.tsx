import { UnitData } from '../../contexts/GameContext/Bench'
import { SpellData } from '../../contexts/GameContext/Hand'

type CardZone = 'hand' | 'bench' | 'board';

type CardLocation = {
    insideOf: CardZone;
    index: number;
};

type DraggedCard = {
    cardData: UnitData | SpellData;
    location: CardLocation;
};

export type { CardZone, CardLocation, DraggedCard };