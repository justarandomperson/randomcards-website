import { useReducer, createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DeckAction, DeckActionType, DeckReducer } from './reducer'
import { DeckState } from './types'
import { Storage } from '../../shared/types/decks'
import { fetchStorage } from '../../api/axiosInstance'
import { SpellData, UnitData } from '../../shared/types/card'


type DeckContextType = {
    state: DeckState,
    dispatch: React.Dispatch<DeckAction>
}


const DeckContext = createContext<DeckContextType | null>(null);


export const DeckProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [storage, setStorage ] = useState<Storage>(
        { 
            units: new Map<string, { data: UnitData, amount: number }>,
            spells: new Map<string, { data: SpellData, amount: number }> 
        }
    )
    
    useEffect(() => {
        const getStorage = async () => {
            const storage = await fetchStorage()
            setStorage(storage);
               dispatch({ 
                    type: DeckActionType.SET_DECK_STATE,
                    deckState: 
                    {
                        deck: {
                            units: [],           
                            spells: []
                        },
                        storage: storage
                    }
            })
        }

        getStorage();
    }, []);

    const [deckContext, dispatch] = useReducer(DeckReducer, 
        {
            deck: {
                units: [],           
                spells: []
            },

            storage: {
                units: storage.units,          
                spells: storage.spells
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