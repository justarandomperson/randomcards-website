import { useDraggable } from '@dnd-kit/core'
import Card from '../Card/Card'
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import styles from "./GameCard.module.css"
import classNames from "classnames"
import { CardType, SpellData, UnitData } from '../Card/shared/types'
import { CardLocation, CardZone } from './shared/types'
import { ClientGameState, SelectTargetFilter, TargetType } from '../../../contexts/GameContext/shared/types'
import { getCardTargetType, getOpponentRow, TauntInRow } from '../../../contexts/GameContext/shared/helpers'


const isCardSelectable = (state: ClientGameState, cardData: UnitData | SpellData, location: CardLocation) => {
    const targetType = getCardTargetType(cardData, location);
    //for deselecting an attacker
    if (state.attackerSelected && state.attackerSelected.instanceId == cardData.instanceId) return true
    // selecting for an effect
    if (state.targetFilter) {
        if (!state.targetFilter.has(targetType)) {
            return false;
        }

        return true;
    }
    // selecting for attack
    if (cardData.type !== CardType.UNIT) {
        return false;
    }


    // choose attacker
    if (!state.attackerSelected) {
        if (targetType !== TargetType.ALLY_UNIT) {
            return false;
        }

        if (cardData.statuses.paralyzed) {
            return false;
        }


        if (!cardData.canAttack && !cardData.statuses.haste){
            return false;
        }

        return true;
    }
    // choose unit to attack
    else {
        if (targetType !== TargetType.ENEMY_UNIT) {
            return false;
        }

        const opponentRow = getOpponentRow(state.board);
        if (TauntInRow(opponentRow) && !cardData.statuses.taunt) {
            return false;
        }

        return true;
    }
}



type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const GameCard: React.FC<Props> = ({ cardData, location }) => {
    if (location.insideOf === CardZone.NONE) {
        throw new Error('card doesnt exist');
    }


    const { state, emitters, setAttackerSelected } = useGameContext();

    const isSelectable = isCardSelectable(state, cardData, location);


    const onSelectedHandler = () => {
        if (!isSelectable) {
            return;
        }



        // for an effect

        const instanceId = cardData.instanceId;
        if (!instanceId) {
            throw new Error ("target has no instanceId"); // TODO: can refactor to helper function
        }

        if (state.targetFilter) {
            emitters.selectTarget({ id: instanceId, isPlayer: false });
        }

        // for attacking
        else if (state.attackerSelected) {
            if (state.attackerSelected.instanceId !== cardData.instanceId)
            {
                const attackerId = state.attackerSelected.instanceId;
                if (!attackerId) {
                    throw new Error ("attacker has no instanceId"); // TODO: can refactor to helper function
                }

                emitters.attackUnit({ attackerId, targetId: instanceId });
            }
            setAttackerSelected(undefined)
        }
        //no attacker selected
        else 
        {
            setAttackerSelected(cardData as UnitData)
        }
    }


    const isDraggable = location.insideOf !== CardZone.BOARD; // board cards arent draggables
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ 
            id: `${location.insideOf}-${location.index}`, 
            data: {cardData, location},
            disabled: !isDraggable || !state.isPlayerTurn
        }
    );

    const isAllyUnit = (getCardTargetType(cardData, location) === TargetType.ALLY_UNIT);
    const hasAttackerSelected = state.attackerSelected ? true : false;

    const cardClass = classNames({
        [styles.draggedCard]: isDragging,
        [styles.cardPlayerTurn]: state.isPlayerTurn && (hasAttackerSelected !== isAllyUnit),
        [styles.selectedCard]: state.attackerSelected?.instanceId == cardData.instanceId,
        [styles.selectableCard]: isSelectable,
        [styles.container]: true
    });
    

    return (
        <div 
            className={cardClass} {...(isDraggable ? attributes : {})} {...(isDraggable ? listeners : {})} 
            ref={setNodeRef} onClick={onSelectedHandler}>
                <Card cardData={cardData}/>
        </div>
    );
}


export default GameCard