import { ClientGameState } from "../../contexts/GameContext/types";
import { NULL_ARTIFACT } from "../constants/game";
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
                    drawPileCount: 0
                },
                data: {
                    name: "Player",
                    health: 20,
                    money: 0,
                    turn: 0,
                    artifacts: []
                }
            },

            opponent: {
                data: {
                    name: "Opponent",
                    health: 20,
                    money: 0,
                    turn: 0,
                    artifacts: []
                }
            }
        },

        board: {
            player: [null, null, null, null],
            opponent: [null, null, null, null]
        },

        shop: {
            artifacts: [NULL_ARTIFACT, NULL_ARTIFACT, NULL_ARTIFACT, NULL_ARTIFACT, NULL_ARTIFACT]
        },

        phase: GamePhase.PLAY,

        isPlayerTurn: true
    };
};