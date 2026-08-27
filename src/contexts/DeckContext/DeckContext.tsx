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

export { DeckContext, DeckProvider, useDeckContext}


enum DeckActionType {
    ADD_CARD = 'ADD_CARD',
    REMOVE_CARD = 'REMOVE_CARD'
}

type DeckAction = 
    | { type: DeckActionType.ADD_CARD; card: UnitData | SpellData }
    | { type: DeckActionType.REMOVE_CARD; card: UnitData | SpellData }

const addCard = (state: DeckState, card: UnitData | SpellData): DeckState => {
    if (card.type === 'unit') {
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
    if (card.type === 'unit') {
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

export { DeckActionType }


const DeckReducer = (state: DeckState, action: DeckAction): DeckState => {
    switch (action.type) {
        case DeckActionType.ADD_CARD:
            return addCard(state, action.card);

        case DeckActionType.REMOVE_CARD:
            return removeCard(state, action.card);

        default:
            throw new Error('DeckReducer does not have this type. ');
    }
}


const isUnitsDeckFull = (deck: Deck): boolean => {
    return deck.units.length >= UNITS_IN_DECK;
}

const isSpellsDeckFull = (deck: Deck): boolean => {
    return deck.spells.length >= SPELLS_IN_DECK;
}

export { isUnitsDeckFull, isSpellsDeckFull }