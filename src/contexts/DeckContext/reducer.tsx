import { DeckState } from './types'
import { CardType, UnitData, SpellData } from '../../shared/types/card'
import { isUnitsDeckFull, isSpellsDeckFull } from '../../shared/functions/decks';
import { produce } from 'immer';
import { Deck } from '../../shared/types/decks';

export enum DeckActionType {
    ADD_CARD = 'ADD_CARD',
    REMOVE_CARD = 'REMOVE_CARD',
    SET_FULL_STATE = 'SET_FULL_STATE'
}


export type DeckAction = 
    | { type: DeckActionType.ADD_CARD; card: UnitData | SpellData }
    | { type: DeckActionType.REMOVE_CARD; card: UnitData | SpellData }
    | { type: DeckActionType.SET_FULL_STATE; newState: DeckState }

    
const saveDeckToLocalStorage = (deck: Deck) => {
    localStorage.setItem(
        "deck",
        JSON.stringify({
            units: deck.units.map(unit => unit.id),
            spells: Array.from(
                deck.spells,
                ([spellId, spell]) => [spellId, spell.amount]
            )
        })
    );
};


const addCardToDeck = (state: DeckState, card: UnitData | SpellData): DeckState => {
    const nextState = produce(state, draft => {
        switch(card.type) {
            case CardType.UNIT:
                if (isUnitsDeckFull(draft.deck)) {
                    return draft;
                }
                
                draft.storage.units.splice(draft.storage.units.indexOf(card), 1);
                draft.deck.units.push(card);

                break;

            case CardType.SPELL: {
                const cardInStorage = draft.storage.spells.get(card.id);
                if (isSpellsDeckFull(draft.deck) || !cardInStorage) {
                    return draft;
                }

                cardInStorage.amount -= 1;
                if (cardInStorage.amount == 0) {
                    draft.storage.spells.delete(cardInStorage.data.id);
                }

                const cardInDeck = draft.deck.spells.get(card.id) ;
                if (cardInDeck) {
                    cardInDeck.amount += 1;
                }
                else {
                    draft.deck.spells.set(card.id, { data: card, amount: 1 });
                }
                
                break;
            }
        }
    });

    saveDeckToLocalStorage(nextState.deck)
    return nextState
}


const removeCardFromDeck = (state: DeckState, card: UnitData | SpellData): DeckState => {
    const nextState = produce(state, draft => {
        switch (card.type) {
            case CardType.UNIT:
                draft.deck.units.splice(draft.deck.units.indexOf(card), 1);
                draft.storage.units.push(card);

                break;

            case CardType.SPELL: {
                const cardInDeck = draft.storage.spells.get(card.id);
                if (!cardInDeck) {
                    return draft;
                }

                cardInDeck.amount -= 1;
                if (cardInDeck.amount == 0) {
                    draft.deck.spells.delete(cardInDeck.data.id);;
                }

                const cardInStorage = draft.deck.spells.get(card.id) ;
                if (cardInStorage) {
                    cardInStorage.amount += 1;
                }
                else {
                    draft.storage.spells.set(card.id, { data: card, amount: 1 });
                }
                
                break;
            }
        }
    });

    saveDeckToLocalStorage(nextState.deck)
    return nextState
}

export const DeckReducer = (state: DeckState, action: DeckAction): DeckState => {
    switch (action.type) {
        case DeckActionType.ADD_CARD:
            return addCardToDeck(state, action.card);

        case DeckActionType.REMOVE_CARD:
            return removeCardFromDeck(state, action.card);

        case DeckActionType.SET_FULL_STATE:
            return action.newState;

        default:
            throw new Error('DeckReducer does not have this type. ');
    }
}