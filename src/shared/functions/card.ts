import { v4 as uuidv4 } from 'uuid';
import { CardType, UnitData, SpellData } from '../types/card'


export const getPlaceholderUnit = (): UnitData => {
    return {
        instanceId: uuidv4(),
        name: `dog`,
        type: CardType.UNIT,
        effect: "im dog",
        cost: 3,
        hp: 1,
        atk: 2,
    };
}


export const getPlaceholderSpell = (): SpellData => {
    return {
        instanceId: uuidv4(),
        name: `cat`,
        type: CardType.SPELL,
        effect: "although i may look like it, im not dog. have a wonderful rest of your day!",
        cost: 3,
    }
}