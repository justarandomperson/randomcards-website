import { CardType, SpellData, UnitData } from "../../../components/game/Card/shared/types";
import { CardLocation, CardZone } from "../../../components/game/GameCard/shared/types";
import { MAX_CARDS_PER_BOARD_ROW, STARTING_HEALTH, STARTING_MONEY, STARTING_TURN } from "./constants";
import { ClientGameState, GamePhase, TargetType } from "./types";


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
                    id: "",
                    hp: STARTING_HEALTH,
                    money: STARTING_MONEY,
                    turn: STARTING_TURN,
                    drawpileCount: 0,
                    artifacts: [],
                    artifactsBoughtThisTurn: 0
                }
            },

            opponent: {
                data: {
                    name: "Opponent",
                    id: "",
                    hp: STARTING_HEALTH,
                    money: STARTING_MONEY,
                    turn: STARTING_TURN,
                    drawpileCount: 0,
                    artifacts: [],
                    artifactsBoughtThisTurn: 0
                }
            }
        },

        board: [null, null, null, null, null, null, null, null],
        shop: [null, null, null, null, null],
        phase: GamePhase.PLAY,
        isPlayerTurn: false,
        isGameOver: false,
        targetFilter: undefined,
        spellShowing: undefined,
        attackerSelected: undefined
    };
};


export const getPlayerRow = (board: (UnitData | null)[]) => {
    return board.slice(0, 4);
}

export const getOpponentRow = (board: (UnitData | null)[]) => {
    return board.slice(4, 8)
}

export const TauntInRow = (boardRow: (UnitData | null)[]): boolean => {
    for (const unit of boardRow) {
        if (unit && unit.statuses.taunt) {
            return true;
        }
    }

    return false;
}


export const getCardTargetType = (cardData: UnitData | SpellData, location: CardLocation): TargetType => {
    if (location.insideOf === CardZone.NONE) {
        throw new Error("Card doesn't exist");
    }

    if (location.insideOf === CardZone.BENCH) {
        return TargetType.BENCHED_UNIT;
    }

    if (cardData.type === CardType.UNIT) {
        if (location.index < MAX_CARDS_PER_BOARD_ROW) {
            return TargetType.ALLY_UNIT;
        }

        return TargetType.ENEMY_UNIT;
    }

    if (cardData.type === CardType.SPELL) {
        return TargetType.SPELL_IN_HAND
    }

    throw new Error("Card doesn't exist");
};