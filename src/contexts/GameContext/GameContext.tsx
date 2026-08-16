import { v4 as uuidv4 } from 'uuid';
import { useReducer, createContext, type PropsWithChildren, useContext } from 'react'
import { PlayersContextType, playersReducer, STARTING_HEALTH, STARTING_MONEY, STARTING_TURN } from './Players'
import { ShopContextType, shopReducer } from './Shop'
import { HandContextType, handReducer, MAX_DRAW_PILE_SIZE } from './Hand'


type GameContextType = {
    playersContext: PlayersContextType
    shopContext: ShopContextType
    handContext: HandContextType
}

const GameContext = createContext<GameContextType | null>(null);


const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [players, playersDispatch] = useReducer(playersReducer, {
        player: {
            name: "TinG",
            health: STARTING_HEALTH,
             money: STARTING_MONEY,
            turn: STARTING_TURN
        },
        opponent: {
            name: "TinG hater",
            health: STARTING_HEALTH,
            money: STARTING_MONEY,
            turn: STARTING_TURN
        }
    });

    const [shop, shopDispatch] = useReducer(shopReducer, {
        artifacts: [
            { id: 1, name: "Ember Core", effect: "...", cost: 1 },
            { id: 9, name: "Lucas ball", effect: "...", cost: 9 },
            { id: 2, name: "Frost Sigil", effect: "...",  cost: 12 },
            { id: 3, name: "Iron Bulwark", effect: "...", cost: 0 },
            { id: 6, name: "the win", effect: "...", cost: 7 }
        ]
    })

    const [hand, handDispatch] = useReducer(handReducer, {
        cardsInHand: [
            {
                instanceId: uuidv4(),
                name: `dog`,
                type: "unit",
                hp: "1",
                atk: "2",
                cost: "3",
                effect: "im dog"
            }
        ],
        cardsInDrawPile: [
            ...Array.from({ length: MAX_DRAW_PILE_SIZE }, () => ({
                instanceId: uuidv4(),
                name: `cat`,
                type: "spell",
                cost: "3",
                effect: "although i may look like it, im not dog. have a wonderful rest of your day!"
            }))
        ]
    })

    const value = {
        playersContext: {players, dispatch: playersDispatch},
        shopContext: {shop, dispatch: shopDispatch},
        handContext: {hand, dispatch: handDispatch}
    }

    return <GameContext.Provider value={value}> {children} </GameContext.Provider>
    
}


const useGameContext = () => {
    const context = useContext(GameContext);
        
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
        
    return context; // { playersContext, shopContext }
}


export { GameContext, GameProvider, useGameContext}