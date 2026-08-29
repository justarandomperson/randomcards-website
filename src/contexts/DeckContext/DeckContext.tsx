import { useReducer, createContext, type PropsWithChildren, useContext } from 'react'
import { UNITS_IN_DECK, SPELLS_IN_DECK } from '../../shared/constants/game'
import { getPlaceholderUnit, getPlaceholderSpell } from '../../shared/functions/card'
import { DeckAction, DeckReducer } from './reducer'
import { DeckState } from './types'


type DeckContextType = {
    state: DeckState,
    dispatch: React.Dispatch<DeckAction>
}


const DeckContext = createContext<DeckContextType | null>(null);


export const DeckProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [deckContext, dispatch] = useReducer(DeckReducer, 
        {
            // TODO: obviously we dont generate the players storage or deck like that. its temporary
            deck: {
                units: Array.from({ length: UNITS_IN_DECK }, getPlaceholderUnit),            
                spells: Array.from({ length: SPELLS_IN_DECK }, getPlaceholderSpell)
            },

            storage: {
                units: Array.from({ length: UNITS_IN_DECK }, getPlaceholderUnit),            
                spells: Array.from({ length: SPELLS_IN_DECK }, getPlaceholderSpell)
            }
        }
    );

    const value = {
        state: deckContext,
        dispatch: dispatch
    }

    return <DeckContext.Provider value={value}> {children} </DeckContext.Provider>
}


export const useDeckContext = () => {
    const context = useContext(DeckContext);
        
    if (!context) {
        throw new Error('useDeckContext must be used within a DeckProvider');
    }
        
    return context;
}