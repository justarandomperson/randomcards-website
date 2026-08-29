import { DeckState } from './types'
import { CardType, UnitData, SpellData } from '../../shared/types/card'
import { isUnitsDeckFull, isSpellsDeckFull } from '../../shared/functions/decks';


export enum DeckActionType {
    ADD_CARD = 'ADD_CARD',
    REMOVE_CARD = 'REMOVE_CARD'
}


export type DeckAction = 
    | { type: DeckActionType.ADD_CARD; card: UnitData | SpellData }
    | { type: DeckActionType.REMOVE_CARD; card: UnitData | SpellData }


const addCard = (state: DeckState, card: UnitData | SpellData): DeckState => {
    if (card.type === CardType.UNIT) {
        if (isUnitsDeckFull(state.deck)) return state;

        return {
            ...state,
            storage: {
                ...state.storage,
                units: state.storage.units.filter(u => u.instanceId !== card.instanceId)
            },
            deck: {
                ...state.deck,
                units: [...state.deck.units, card]
            }
        };
    } else {
        if (isSpellsDeckFull(state.deck)) return state;

        return {
            ...state,
            storage: {
                ...state.storage,
                spells: state.storage.spells.filter(s => s.instanceId !== card.instanceId)
            },
            deck: {
                ...state.deck,
                spells: [...state.deck.spells, card]
            }
        };
    }
}


const removeCard = (state: DeckState, card: UnitData | SpellData): DeckState => {
    if (card.type === CardType.UNIT) {
        return {
            ...state,
            deck: {
                ...state.deck,
                units: state.deck.units.filter(u => u.instanceId !== card.instanceId)
            },
            storage: {
                ...state.storage,
                units: [...state.storage.units, card]
            }
        };
    } else {
        return {
            ...state,
            deck: {
                ...state.deck,
                spells: state.deck.spells.filter(s => s.instanceId !== card.instanceId)
            },
            storage: {
                ...state.storage,
                spells: [...state.storage.spells, card]
            }
        };
    }
}


export const DeckReducer = (state: DeckState, action: DeckAction): DeckState => {
    switch (action.type) {
        case DeckActionType.ADD_CARD:
            return addCard(state, action.card);

        case DeckActionType.REMOVE_CARD:
            return removeCard(state, action.card);

        default:
            throw new Error('DeckReducer does not have this type. ');
    }
}