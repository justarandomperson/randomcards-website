import { ClientGameState } from "../../contexts/GameContext/types";
import { NULL_ARTIFACT, STARTING_HEALTH, STARTING_MONEY, STARTING_TURN } from "../constants/game";
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
                    health: STARTING_HEALTH,
                    money: STARTING_MONEY,
                    turn: STARTING_TURN,
                    drawPileCount: 0,
                    artifacts: []
                }
            },

            opponent: {
                data: {
                    name: "Opponent",
                    health: STARTING_HEALTH,
                    money: STARTING_MONEY,
                    turn: STARTING_TURN,
                    drawPileCount: 0,
                    artifacts: []
                }
            }
        },

        board: [null, null, null, null, null, null, null, null],

        shop: {
            artifacts: [NULL_ARTIFACT, NULL_ARTIFACT, NULL_ARTIFACT, NULL_ARTIFACT, NULL_ARTIFACT]
        },

        phase: GamePhase.PLAY,

        isPlayerTurn: true
    };
};