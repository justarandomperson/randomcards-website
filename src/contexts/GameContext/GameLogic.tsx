import { useGameContext } from "./GameContext"
import { PlayersActionType, PlayersActionTarget, isMoneySufficient } from "./Players"
import { ShopActionType } from "./Shop"
import { HandActionType } from "./Hand"
import { BenchActionType } from "./Bench"
import { BoardActionType } from "./Board"
import { ArtifactData } from "../../types/artifact"
import { TURN_NUMBER_MONEY_MULT } from "../../constants/game"
import { UnitData, SpellData, CardLocation, DraggedCard } from "../../types/card"

export const useGameLogic = () => {
    const { playersContext, shopContext, benchContext, boardContext, handContext} = useGameContext();


    const removeMoney = (target: PlayersActionTarget, moneyAvailable: number, cost: number): boolean => {
        if (!isMoneySufficient(moneyAvailable, cost)){
            return false;
        }

        playersContext.dispatch({
            type: PlayersActionType.REMOVE_MONEY,
            target: target,
            amount: cost
        });

        return true;
    }


    const drawCard = (): void => {
        handContext.dispatch({
            type: HandActionType.DRAW_CARD
        });
    }


    const endTurn = (isOpponent: boolean): void => {
        playersContext.dispatch({
            type: PlayersActionType.END_TURN,
            target: isOpponent ? PlayersActionTarget.OPPONENT : PlayersActionTarget.PLAYER
        });

        // TODO: this is just becaose ttheres no multiplayer rn
        const playerTurn = isOpponent ? playersContext.players.opponent.turn : playersContext.players.player.turn;
        startTurn(isOpponent, playerTurn);
    }

    const startTurn = (isOpponent: boolean, currentTurn: number): void => {
        playersContext.dispatch({
            type: PlayersActionType.ADD_MONEY,
            target: isOpponent ? PlayersActionTarget.OPPONENT : PlayersActionTarget.PLAYER,
            amount: TURN_NUMBER_MONEY_MULT * currentTurn 
        });

        drawCard();   
    }

    const buyArtifact = (target: PlayersActionTarget, artifact: ArtifactData, artifactIndex: number): void => {
        const moneyAvailable = playersContext.players[target].money;
        if (!removeMoney(target, moneyAvailable, artifact.cost)){
            return;
        }

        shopContext.dispatch({
            type: ShopActionType.GET_ARTIFACT,
            index: artifactIndex
        });

        playersContext.dispatch({
            type: PlayersActionType.REMOVE_MONEY,
            target: target,
            amount: artifact.cost
        });

        playersContext.dispatch({
            type: PlayersActionType.ADD_ARTIFACT,
            target: target,
            artifact: artifact
        });
    }

    const placeUnit = (target: PlayersActionTarget, card: DraggedCard, to: CardLocation): void => {
        if (!removeMoney(target, playersContext.players[target].money, card.cardData.cost)){
            return;
        }
        
        if (boardContext.board.playerCards[to.index] !== null) { // board slot is taken
            return;
        }
        
        benchContext.dispatch({ 
            type: BenchActionType.REMOVE_CARD,
            index: card.location.index
        });

        boardContext.dispatch({
            type: BoardActionType.PLACE_CARD,
            card: card.cardData as UnitData,
            index: to.index
        });
    }

    const playSpell = (target: PlayersActionTarget, card: DraggedCard): void => {
        if (!removeMoney(target, playersContext.players[target].money, card.cardData.cost)){
            return;
        }

        handContext.dispatch({ 
            type: HandActionType.REMOVE_CARD,
            index: card.location.index
        });
    }


    return { endTurn, startTurn, buyArtifact, placeUnit, playSpell };
}