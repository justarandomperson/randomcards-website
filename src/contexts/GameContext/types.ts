import { Board, Shop, GamePhase, ArtifactData } from "../../shared/types/game";
import { UnitData, SpellData } from "../../shared/types/card";


// context and state 
export type ClientGameState = {
    players: {player: PlayerState, opponent: OpponentState},
    board: Board,
    shop: Shop,
    phase: GamePhase,
    isPlayerTurn: boolean
};

export type PlayerState = {
    cards: {
        deck: {
            units: UnitData[],
            spells: SpellData[]
        },
        bench: (UnitData | null)[],
        hand: SpellData[],
        drawPileCount: number
    },
    data: {
        name: string,
        health: number,
        money: number,
        turn: number,
        artifacts: ArtifactData[]
    }
}

export type OpponentState = {
      data: {
        name: string,
        health: number,
        money: number,
        turn: number,
        artifacts: ArtifactData[]
    }  
}


// actions and events
export const SOCKET_EVENT_NAMES = { // this is used both on 'emit' and on 'on'
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',

    QUEUE: 'queue',
    PLAY_UNIT: 'play_unit',
    PLAY_SPELL: 'play_spell',
    BUY_ARTIFACT: 'buy_artifact',
    END_TURN: 'end_turn',

    MATCH_START: 'match_start',
    START_TURN: 'start_turn',
    REFILL_SHOP: 'refill_shop',
    UPDATE_GAME_PHASE: 'update_game_phase',
    UPDATE_HAND: 'update_hand',
    UPDATE_BENCH: 'update_bench',
    UPDATE_BOARD: 'update_board',
    UPDATE_MONEY: 'update_money'
};


// from client to server
export type QueuePayload = 
    {  }

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
    onRefillShop: (newShop: ArtifactData[]) => void;
    onUpdateGamePhase: () => void;
    onUpdateHand: (newHand: SpellData[]) => void;
    onUpdateBench: (newBench: UnitData[]) => void;
    onUpdateBoard: (newBoard: UnitData[]) => void;
    onUpdateMoney: (newMoney: number, playerId: string) => void;
};