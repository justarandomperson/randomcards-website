import { v4 as uuidv4 } from 'uuid';
import { useReducer, createContext, type PropsWithChildren, useContext } from 'react'
import { UnitData } from '../GameContext/Bench'
import { SpellData } from '../GameContext/Hand'


const UNITS_IN_DECK = 8;
const SPELLS_IN_DECK = 12;


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
            storage: {
                units: [],
                spells: []
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

        default:
            throw new Error('DeckReducer does not have this type. ');
    }
}


export { DeckContext, DeckProvider, useDeckContext}