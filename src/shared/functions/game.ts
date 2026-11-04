import { ClientGameState } from "../../contexts/GameContext/types";
import { STARTING_HEALTH, STARTING_MONEY, STARTING_TURN } from "../constants/game";
import { GamePhase } from "../types/game";


export const getPlaceholderGameState = (): ClientGameState => {
    return {
        players: {
            player: {
                cards: {
                    deck: {
                        units: [],
                        spells: []
                    },
                    bench: [],
                    hand: [],
                },
                data: {
                    name: "Player",
                    hp: STARTING_HEALTH,
                    money: STARTING_MONEY,
                    turn: STARTING_TURN,
                    drawpileCount: 0,
                    artifacts: []
                }
            },

            opponent: {
                data: {
                    name: "Opponent",
                    hp: STARTING_HEALTH,
                    money: STARTING_MONEY,
                    turn: STARTING_TURN,
                    drawpileCount: 0,
                    artifacts: []
                }
            }
        },

        board: [null, null, null, null, null, null, null, null],
        shop: [null, null, null, null, null],
        phase: GamePhase.PLAY,
        isPlayerTurn: true,
    };
};