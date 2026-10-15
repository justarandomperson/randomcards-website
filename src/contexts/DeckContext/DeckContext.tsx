import { useReducer, createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DeckAction, DeckReducer } from './reducer'
import { DeckState } from './types'
import axios from 'axios'
import { Storage } from '../../shared/types/decks'


type DeckContextType = {
    state: DeckState,
    dispatch: React.Dispatch<DeckAction>
}


const DeckContext = createContext<DeckContextType | null>(null);


export const DeckProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const axiosApi = axios.create({ /* put url here */ });
    const [storage, setStorage ] = useState<Storage>({ units: [], spells: [] })

    useEffect(() => {
        const fetchStorage = async () => {
            try {
                const { data } = await axiosApi.get(/* put url here */ 'placeholder');
                setStorage(data);

            } catch (error) {
                console.error('Could not load users');
            }
        }

        fetchStorage();
    });


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