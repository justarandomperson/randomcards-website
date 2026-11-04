import { ClientGameState } from "../../contexts/GameContext/types";
import { STARTING_HEALTH, STARTING_MONEY, STARTING_TURN } from "../constants/game";
import { CardLocation, CardType, CardZone, SpellData, UnitData } from "../types/card";
import { GamePhase, TargetType } from "../types/game";


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
        isGameOver: false,
        targetFilter: undefined,
        spellShowing: undefined
    };
};

export const getTargetType = (cardData: UnitData | SpellData, location: CardLocation): TargetType => {
    if (location.insideOf === CardZone.NONE) throw new Error("Card doesn't exist")
    if (location.insideOf === CardZone.BENCH) {
        return TargetType.BENCH;
    }

    if (cardData.type === CardType.UNIT) {
        if (location.index < 4) {
            return TargetType.ALLY;
        }

        return TargetType.ENEMY;
    }

    if (cardData.type === CardType.SPELL)
    {
        return TargetType.HAND
    }

    return TargetType.ENEMY;
};