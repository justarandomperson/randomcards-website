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
        drawPile: SpellData[]
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


// actions
export enum GameActionType {
    PLACE_UNIT = "PLACE_UNIT",
    PLAY_SPELL = "PLAY_SPELL",
    BUY_ARTIFACT = "BUY_ARTIFACT",
    END_TURN = "END_TURN"
}

export type GameAction =
    | { type: GameActionType.PLACE_UNIT, instanceId: string, boardIndex: number }
    | { type: GameActionType.PLAY_SPELL, instanceId: string  }
    | { type: GameActionType.BUY_ARTIFACT, instanceId: number }
    | { type: GameActionType.END_TURN }