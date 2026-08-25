import { v4 as uuidv4 } from 'uuid';
import { useReducer, createContext, type PropsWithChildren, useContext } from 'react'
import { UnitData, SpellData } from '../../types/card'
import { UNITS_IN_DECK, SPELLS_IN_DECK } from '../../constants/game';


type Storage = {
    units: UnitData[],
    spells: SpellData[]
}

type Deck = {
    units: UnitData[],
    spells: SpellData[]
} 

type DeckState = {
    deck: Deck,
    storage: Storage
}

type DeckContextType = {
    deckContext: DeckState,
    dispatch: React.Dispatch<DeckAction>
}

const DeckContext = createContext<DeckContextType | null>(null);


const DeckProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [deckContext, dispatch] = useReducer(DeckReducer, 
        {
            deck: {
                units: Array.from({ length: UNITS_IN_DECK }, (): UnitData => ({
                    instanceId: uuidv4(),
                    name: `dog`,
                    type: "unit",
                    hp: "1",
                    atk: "2",
                    cost: "3",
                    effect: "im dog"
                })),            
                spells: Array.from({ length: SPELLS_IN_DECK }, (): SpellData => ({
                    instanceId: uuidv4(),
                    name: `cat`,
                    cost: "3",
                    effect: "although i may look like it, im not dog. have a wonderful rest of your day!",
                    type: "spell"
                }))
            },

            // TODO: obviously we dont generate the players storage like that. its temporary
            storage: {
                units: Array.from({ length: UNITS_IN_DECK }, (): UnitData => ({
                    instanceId: uuidv4(),
                    name: `dog`,
                    type: "unit",
                    hp: "1",
                    atk: "2",
                    cost: "3",
                    effect: "im dog"
                })),            
                spells: Array.from({ length: SPELLS_IN_DECK }, (): SpellData => ({
                    instanceId: uuidv4(),
                    name: `cat`,
                    cost: "3",
                    effect: "although i may look like it, im not dog. have a wonderful rest of your day!",
                    type: "spell"
                }))
            }
        }
    )

    const value = {
        deckContext: deckContext,
        dispatch: dispatch
    }

    return <DeckContext.Provider value={value}> {children} </DeckContext.Provider>
}


const useDeckContext = () => {
    const context = useContext(DeckContext);
        
    if (!context) {
        throw new Error('useDeckContext must be used within a DeckProvider');
    }
        
    return context;
}


enum DeckActionType {
    ADD_CARD = 'ADD_CARD',
    REMOVE_CARD = 'REMOVE_CARD'
}

type DeckAction = 
    | { type: DeckActionType.ADD_CARD; card: UnitData | SpellData }
    | { type: DeckActionType.REMOVE_CARD; card: UnitData | SpellData }


const DeckReducer = (state: DeckState, action: DeckAction) => {
    switch (action.type) {
        case DeckActionType.ADD_CARD: {
            if (action.card.type === 'unit') {
                return {
                    ...state,
                    storage: {
                        ...state.storage,
                        units: state.storage.units.filter(u => u.instanceId !== action.card.instanceId)
                    },
                    deck: {
                        ...state.deck,
                        units: [...state.deck.units, action.card]
                    }
                };
            } else {
                return {
                    ...state,
                    storage: {
                        ...state.storage,
                        spells: state.storage.spells.filter(s => s.instanceId !== action.card.instanceId)
                    },
                    deck: {
                        ...state.deck,
                        spells: [...state.deck.spells, action.card]
                    }
                };
            }
        }

        case DeckActionType.REMOVE_CARD: {
            if (action.card.type === 'unit') {
                return {
                    ...state,
                    deck: {
                        ...state.deck,
                        units: state.deck.units.filter(u => u.instanceId !== action.card.instanceId)
                    },
                    storage: {
                        ...state.storage,
                        units: [...state.storage.units, action.card]
                    }
                };
            } else {
                return {
                    ...state,
                    deck: {
                        ...state.deck,
                        spells: state.deck.spells.filter(s => s.instanceId !== action.card.instanceId)
                    },
                    storage: {
                        ...state.storage,
                        spells: [...state.storage.spells, action.card]
                    }
                };
            }
        }

        default:
            throw new Error('DeckReducer does not have this type. ');
    }
}


export { DeckActionType }
export { DeckContext, DeckProvider, useDeckContext}