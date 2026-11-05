import { useReducer, createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DeckAction, DeckActionType, DeckReducer } from './reducer'
import { fetchStorage } from '../../api/axiosInstance'
import { DeckState, LocalDeck, Storage } from './shared/types';
import { getPlaceholderStorage, populateDeckFromStorage } from './shared/helpers';


type DeckContextType = {
    state: DeckState,
    dispatch: React.Dispatch<DeckAction>,
    getSpellDeckLength: () => {},
}


const DeckContext = createContext<DeckContextType | null>(null);


export const DeckProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [storage, setStorage ] = useState<Storage>(getPlaceholderStorage());


    useEffect(() => {
        const getStorage = async () => {
            const storageObject: Storage = await fetchStorage();
            const storage: Storage = { 
                units: storageObject.units, 
                spells: new Map(storageObject.spells)
            }

            setStorage(storage);

            const localDeck = localStorage.getItem("deck") || "";
            let parsedLocalDeck: LocalDeck = { units: [], spells: [] }
            if (localDeck) {  
                parsedLocalDeck = JSON.parse(localDeck);
            }

            const { deck: populatedDeck, storage: updatedStorage } = populateDeckFromStorage(parsedLocalDeck, storage);

            dispatch({ 
                type: DeckActionType.SET_FULL_STATE,
                newState: {
                    deck: populatedDeck,
                    storage: updatedStorage
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