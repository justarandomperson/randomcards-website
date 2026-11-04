import { useReducer, createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DeckAction, DeckActionType, DeckReducer } from './reducer'
import { DeckState, localDeck } from './types'
import { Storage } from '../../shared/types/decks'
import { fetchStorage } from '../../api/axiosInstance'
import { SpellData, UnitData } from '../../shared/types/card'


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
            const storageObject = await fetchStorage();
            const storage: Storage = {
                units: storageObject.units,
                spells: new Map(storageObject.spells)
            }

            setStorage(storage);

            const localDeck = localStorage.getItem("deck") || "";
            let parsedLocalDeck: localDeck = {
                units: [],
                spells: []
            }

            if (localDeck) {  
                parsedLocalDeck = JSON.parse(localDeck)
            }

            const populatedDeck = {
                units: parsedLocalDeck.units.map((unitId: string) =>
                    storage.units.find((unit) => unit.id == unitId)
                ).filter((unit): unit is UnitData => unit !== undefined),
                spells: new Map<string, { data: SpellData; amount: number }>(
                    parsedLocalDeck.spells.flatMap(([spellId, amount]: [string, number]) => {
                        const spell = storage.spells.get(spellId);
                        return spell ? [[spellId, { data: spell.data, amount }] as const] : [];
                    })
                )
            }

           const updatedStorage = {
                units: storage.units.filter(
                    unit => !populatedDeck.units.some(deckUnit => deckUnit.id === unit.id)
                ),

                spells: new Map(
                    Array.from(storage.spells).map(([spellId, spell]) => {
                        const deckSpell = populatedDeck.spells.get(spellId);
                        const amountInDeck = deckSpell?.amount ?? 0;
                        const remainingAmount = 2 - amountInDeck;

                        return [
                            spellId,
                            { ...spell, amount: remainingAmount }
                        ] as const;
                    }).filter(([, spell]) => spell.amount > 0)
                )
            };

            dispatch({ 
                type: DeckActionType.SET_FULL_STATE,
                newState: 
                {
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