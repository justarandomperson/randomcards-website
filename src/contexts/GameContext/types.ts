import { GamePhase, ArtifactData, ArtifactZone } from "../../shared/types/game";
import { UnitData, SpellData, CardZone } from "../../shared/types/card";


// context and state 
export type ClientGameState = {
    players: {player: PlayerState, opponent: OpponentState}
    board: (UnitData | null)[]
    shop: (ArtifactData | null)[]
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
    data: PlayerData
}

export type OpponentState = {
    data: PlayerData
}

export type PlayerData = {
    name: string
    health: number
    money: number
    turn: number
    drawpileCount: number
    artifacts: ArtifactData[]
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
    UPDATE_HEALTH: 'update_health',
    UPDATE_DRAWPILE_COUNT: 'update_drawpile_count',
    UPDATE_CARD: 'update_card',
    UPDATE_ARTIFACT: 'update_artifact',
    UPDATE_HAND: 'update_hand',
    UPDATE_BENCH: 'update_bench',
    UPDATE_BOARD: 'update_board',
    UPDATE_SHOP: 'update_shop',
} as const;


// from client to server
export type PlayUnitPayload = { instanceId: string, boardIndex: number }    

export type PlaySpellPayload = { instanceId: string }

export type BuyArtifactPayload = { instanceId: string }


// from server to client
export type GameSocketEvents = {
    onConnect: () => void;
    onDisconnect: () => void;

    onMatchStart: (data: MatchStartData) => void;
    onStartTurn: () => void;
    onUpdateGamePhase: () => void;
    onUpdateMoney: (data: UpdateMoneyData) => void;
    onUpdateHealth: (data: UpdateHealthData) => void;
    onUpdateDrawpileCount: (data: UpdateDrawpileCountData) => void;
    onUpdateCard: (data: UpdateCardData) => void;
    onUpdateArtifact: (data: UpdateArtifactData) => void;
    onUpdateHand: (newHand: SpellData[]) => void;
    onUpdateBench: (newBench: UnitData[]) => void;
    onUpdateBoard: (newBoard: UnitData[]) => void;
    onUpdateShop: (newShop: ArtifactData[]) => void;
};


export type MatchStartData = {
    playerData: PlayerData, 
    opponentData: PlayerData, 
    isFirstTurn: boolean 
}

export type UpdateMoneyData = {
    playerId: string,
    newMoney: number
}

export type UpdateHealthData = {
    playerId: string,
    newHealth: number
}

export type UpdateDrawpileCountData = {
    playerId: string,
    newDrawpileCount: number
}

export type UpdateCardData =
    | { card: UnitData;  insideOf: CardZone.BENCH | CardZone.BOARD; index: number }
    | { card: SpellData; insideOf: CardZone.HAND;                   index: number };


export type UpdateArtifactData = 
    | { artifact: ArtifactData; insideOf: ArtifactZone.SHOP; index: number }
    | { artifact: ArtifactData; insideOf: ArtifactZone.PLAYER; index: number, playerId: string }


// other
export type DeckIds = {
    unitIds: string[],
    spellIds: string[]
}