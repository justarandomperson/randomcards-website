import { Shop, GamePhase, ArtifactData, ArtifactLocation } from "../../shared/types/game";
import { UnitData, SpellData, CardLocation } from "../../shared/types/card";
import { Deck } from "../../shared/types/decks";


// context and state 
export type ClientGameState = {
    players: {player: PlayerState, opponent: OpponentState}
    board: (UnitData | null)[]
    shop: Shop
    phase: GamePhase
    isPlayerTurn: boolean
};

export type PlayerState = {
    cards: {
        deck: {
            units: UnitData[]
            spells: SpellData[]
        },
        bench: (UnitData | null)[]
        hand: SpellData[]
    },
    data: {
        name: string
        health: number
        money: number
        turn: number
        drawPileCount: number
        artifacts: ArtifactData[]
    }
}

export type OpponentState = {
      data: {
        name: string
        health: number
        money: number
        turn: number
        drawPileCount: number
        artifacts: ArtifactData[]
    }  
}


// actions and events
export const SOCKET_EVENT_NAMES = { // this is used both on 'emit' and on 'on'
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',

    QUEUE: 'queue',
    DEQUEUE: 'dequeue',
    PLAY_UNIT: 'play_unit',
    PLAY_SPELL: 'play_spell',
    BUY_ARTIFACT: 'buy_artifact',
    END_TURN: 'end_turn',

    MATCH_START: 'match_start',
    START_TURN: 'start_turn',
    UPDATE_GAME_PHASE: 'update_game_phase',
    UPDATE_MONEY: 'update_money',
    UPDATE_CARD: 'update_card',
    UPDATE_HAND: 'update_hand',
    UPDATE_BENCH: 'update_bench',
    UPDATE_BOARD: 'update_board',
    UPDATE_ARTIFACT: 'update_artifact',
    UPDATE_SHOP: 'update_shop'
} as const;


// from client to server
export type QueuePayload = Deck

export type PlayUnitPayload =
    { instanceId: string, boardIndex: number }    

export type PlaySpellPayload =
    { instanceId: string }

export type BuyArtifactPayload = 
    { instanceId: string }


// from server to client
export type GameSocketEvents = {
    onConnect: () => void;
    onDisconnect: () => void;

    onMatchStart: () => void;
    onStartTurn: () => void;
    onUpdateGamePhase: () => void;
    onUpdateMoney: (newMoney: number, playerId: string) => void;
    onUpdateCard: (newCard: UnitData | SpellData, location: CardLocation) => void;
    onUpdateHand: (newHand: SpellData[]) => void;
    onUpdateBench: (newBench: UnitData[]) => void;
    onUpdateBoard: (newBoard: UnitData[]) => void;
    onUpdateArtifact: (newArtifact: ArtifactData, location: ArtifactLocation, playerId?: string) => void;
    onUpdateShop: (newShop: ArtifactData[]) => void;

};