import { useReducer, createContext, type PropsWithChildren, useContext } from 'react'
import { useDeckContext } from '../DeckContext/DeckContext';
import { STARTING_HEALTH, STARTING_MONEY, STARTING_TURN } from '../../constants/game';
import { PlayersContextType, playersReducer } from './Players'
import { ShopContextType, shopReducer } from './Shop'
import { HandContextType, handReducer } from './Hand'
import { BenchContextType, benchReducer } from './Bench'
import { BoardContextType, boardReducer } from './Board'


type GameContextType = {
    playersContext: PlayersContextType
    shopContext: ShopContextType
    handContext: HandContextType
    benchContext: BenchContextType
    boardContext: BoardContextType
}

const GameContext = createContext<GameContextType | null>(null);


const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const deck = useDeckContext().deckContext.deck;

    // players
    const [players, playersDispatch] = useReducer(playersReducer, {
        player: {
            name: "TinG",
            health: STARTING_HEALTH,
            money: STARTING_MONEY,
            turn: STARTING_TURN,
            artifacts: []
        },
        opponent: {
            name: "TinG hater",
            health: STARTING_HEALTH,
            money: STARTING_MONEY,
            turn: STARTING_TURN,
            artifacts: []
        }
    });

    // shop
    const [shop, shopDispatch] = useReducer(shopReducer, {
        artifacts: [
            { id: 1, name: "Ember Core", effect: "...", cost: 1 },
            { id: 9, name: "Lucas ball", effect: "...", cost: 9 },
            { id: 2, name: "Frost Sigil", effect: "...",  cost: 12 },
            { id: 3, name: "Iron Bulwark", effect: "...", cost: 0 },
            { id: 6, name: "the win", effect: "...", cost: 7 }
        ]
    })

    // hand
    const drawPile = deck.spells
    const [hand, handDispatch] = useReducer(handReducer, {
        cardsInHand: [],
        cardsInDrawPile: drawPile
    })

    // bench
    const cardsInBench = deck.units
    const [bench, benchDispatch] = useReducer(benchReducer, {
        cards: cardsInBench
    })

    // board
    const [board, boardDispatch] = useReducer(boardReducer, {
        playerCards: [null, null, null, null],
        opponentCards: [null, null, null, null]
    })

    // value
    const value = {
        playersContext: {players, dispatch: playersDispatch},
        shopContext: {shop, dispatch: shopDispatch},
        handContext: {hand, dispatch: handDispatch},
        benchContext: {bench, dispatch: benchDispatch},
        boardContext: {board, dispatch: boardDispatch}
    }

    return <GameContext.Provider value={value}> {children} </GameContext.Provider>
}


const useGameContext = () => {
    const context = useContext(GameContext);
        
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
        
    return context;
}


export { GameContext, GameProvider, useGameContext}