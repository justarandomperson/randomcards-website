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

    PLAY_UNIT: 'play_unit',
    PLAY_SPELL: 'play_spell',
    BUY_ARTIFACT: 'buy_artifact',
    END_TURN: 'end_turn'
};


// from client to server
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

    onPlayUnit: () => void;
    onPlaySpell: () => void;
    onBuyArtifact: () => void;
    onEndTurn: () => void;

    onStartTurn: () => void;
    onRefillShop: () => void;
    onUpdateGamePhase: () => void;
    onUpdateHand: () => void;
    onUpdateBench: () => void;
    onUpdateBoard: () => void;
    onUpdatePlayerMoney: () => void;
};