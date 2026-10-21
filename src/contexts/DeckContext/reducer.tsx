import { DeckState } from './types'
import { CardType, UnitData, SpellData } from '../../shared/types/card'
import { isUnitsDeckFull, isSpellsDeckFull } from '../../shared/functions/decks';

export enum DeckActionType {
    ADD_CARD = 'ADD_CARD',
    REMOVE_CARD = 'REMOVE_CARD',
    SET_DECK_STATE = 'SET_DECK_STATE'
}


export type DeckAction = 
    | { type: DeckActionType.ADD_CARD; card: UnitData | SpellData }
    | { type: DeckActionType.REMOVE_CARD; card: UnitData | SpellData }
    | { type: DeckActionType.SET_DECK_STATE; deckState: DeckState }


const addCardToDeck = (state: DeckState, cardData: UnitData | SpellData): DeckState => {
    if (cardData.type === CardType.UNIT) {
        if (isUnitsDeckFull(state.deck)) return state;

        return {
            ...state,
            storage: {
                ...state.storage,
                units: state.storage.units.filter(u => u.instanceId !== cardData.instanceId)
            },
            deck: {
                ...state.deck,
                units: [...state.deck.units, cardData]
            }
        };
    } else {
        if (isSpellsDeckFull(state.deck)) return state;

        const cardStorage =  state.storage.spells.get(cardData.id)
        const cardDeck = state.deck.spells.get(cardData.id) 

        if (!cardStorage) return state
        
        cardStorage.amount -= 1
        if (cardDeck) cardDeck.amount += 1
        else state.deck.spells.set(cardData.id, { data: cardData, amount: 1 })

        if (cardStorage.amount > 0) state.storage.spells.set(cardStorage.data.id, cardStorage)
        else state.storage.spells.delete(cardStorage.data.id)

        return {
            ...state,
            storage: {
                ...state.storage,
                spells: state.storage.spells
            },
            deck: {
                ...state.deck,
                spells: state.deck.spells
            }
        };
    }
}


const removeCardFromDeck = (state: DeckState, cardData: UnitData | SpellData): DeckState => {
    if (cardData.type === CardType.UNIT) {
        return {
            ...state,
            deck: {
                ...state.deck,
                units: state.deck.units.filter(u => u.instanceId !== cardData.instanceId)
            },
            storage: {
                ...state.storage,
                units: [...state.storage.units, cardData]
            }
        };
    } else {
        const cardStorage =  state.storage.spells.get(cardData.id)
        const cardDeck = state.deck.spells.get(cardData.id) 

        if (!cardDeck) return state
        
        cardDeck.amount -= 1
        if (cardStorage) cardStorage.amount += 1
        else state.storage.spells.set(cardData.id, { data: cardData, amount: 1 })

        if (cardDeck.amount > 0) state.storage.spells.set(cardDeck.data.id, cardDeck)
        else state.storage.spells.delete(cardDeck.data.id)
    
        return {
            ...state,
            deck: {
                ...state.deck,
                spells: state.deck.spells
            },
            storage: {
                ...state.storage,
                spells: state.storage.spells
            }
        };
    }
}

const setDeckState = (state: DeckState, deckState: DeckState) =>
{
    return deckState
}


export const DeckReducer = (state: DeckState, action: DeckAction): DeckState => {
    switch (action.type) {
        case DeckActionType.ADD_CARD:
            return addCardToDeck(state, action.card);

        case DeckActionType.REMOVE_CARD:
            return removeCardFromDeck(state, action.card);
        case DeckActionType.SET_DECK_STATE:
            return setDeckState(state, action.deckState)

        default:
            throw new Error('DeckReducer does not have this type. ');
    }
}