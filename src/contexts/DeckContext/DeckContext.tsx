import { useReducer, createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DeckAction, DeckActionType, DeckReducer } from './reducer'
import { DeckState } from './types'
import { Storage } from '../../shared/types/decks'
import { fetchStorage } from '../../api/axiosInstance'


type DeckContextType = {
    state: DeckState,
    dispatch: React.Dispatch<DeckAction>,
    getSpellDeckLength: () => {},
}


const DeckContext = createContext<DeckContextType | null>(null);


export const DeckProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [storage, setStorage ] = useState<Storage>({ units: [], spells: new Map });

    useEffect(() => {
        const getStorage = async () => {
            const storage = await fetchStorage();
            setStorage(storage);

            console.log("this is stora")
            console.log(storage);

            dispatch({ 
                type: DeckActionType.SET_FULL_STATE,
                newState: 
                {
                    deck: {
                        units: [],           
                        spells: new Map
                    },
                    storage: storage
                }
            });
        }

        getStorage();
    }, []);

    const [deckContext, dispatch] = useReducer(DeckReducer, 
        {
            deck: {
                units: [],           
                spells: new Map
            },

            storage: {
                units: storage.units,          
                spells: storage.spells
            }
        }
    );

    const getSpellDeckLength = () => {
        let length = 0;
        deckContext.deck.spells.forEach((spell) => {
            length += spell.amount;
        });

        return length;
    }

    const value = {
        state: deckContext,
        dispatch: dispatch,
        getSpellDeckLength,
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