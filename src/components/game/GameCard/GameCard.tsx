import { useDraggable } from '@dnd-kit/core'
import Card from '../Card/Card'
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import styles from "./GameCard.module.css"
import classNames from "classnames"
import { CardType, SpellData, UnitData } from '../Card/shared/types'
import { CardLocation, CardZone } from './shared/types'
import { SelectTargetFilter, TargetType } from '../../../contexts/GameContext/shared/types'
import { getOpponentRow, getTargetType } from '../../../contexts/GameContext/shared/helpers'


//! not sure this works cuz it had to use hasCardSelected before im sure no idea why this doesnt now
const isCardSelectable = (
    hasCardSelected: boolean, cardData: UnitData | SpellData, location: CardLocation,
    opponentRow: (UnitData | null)[], targetFilter: SelectTargetFilter | undefined
): { isAllyUnit: boolean, isSelectable: boolean } => {
    const isAllyUnit = (
        cardData.type == CardType.UNIT && 
        !opponentRow.find((unit) => unit?.instanceId === cardData.instanceId)
    );

    const targetType = getTargetType(cardData, location)

    const hasTaunt = (cardData.type === CardType.UNIT && cardData.statuses.silenced);
    const canSelectAfterCheckingTaunt = (isAllyUnit || (hasTaunt || opponentRow));

    const isSelectable = (targetFilter && canSelectAfterCheckingTaunt) ? targetFilter.has(targetType) : false;
    return { isAllyUnit, isSelectable };
}



type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const GameCard: React.FC<Props> = ({ cardData, location }) => {
    const instanceId = cardData.instanceId
    if (location.insideOf === CardZone.NONE || !instanceId) {
        throw new Error('card doesnt exist');
    }

    const { state, selectedInstanceId, setSelectedInstanceId, emitters } = useGameContext();
    const { isPlayerTurn } = state;


    const hasSelectedInstanceId = selectedInstanceId != undefined;
    const { isAllyUnit, isSelectable } = isCardSelectable(
        hasSelectedInstanceId, cardData, location, getOpponentRow(state.board), state.targetFilter
    );


    const onSelectedHandler = () => {
        if (selectedInstanceId == cardData.instanceId) {
            setSelectedInstanceId(undefined);
            return;
        }

        if (state.targetFilter && isSelectable) {
            emitters.selectTarget({ id: instanceId, isPlayer: false });
            return
        }

        if (isAllyUnit && selectedInstanceId) { 
            return
        }
        else if (isAllyUnit) {
            setSelectedInstanceId(cardData.instanceId)
            return
        }
        else if (!selectedInstanceId || !cardData.instanceId) {
            return
        }

        // if not selectingTarget and everything else then it meant to attack
        emitters.attackUnit({ attackerId: selectedInstanceId, targetId: cardData.instanceId });
        setSelectedInstanceId(undefined);
    }


    const isDraggable = location.insideOf !== CardZone.BOARD; // board cards arent draggables
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ 
            id: `${location.insideOf}-${location.index}`, 
            data: {cardData, location},
            disabled: !isDraggable || !isPlayerTurn
        }
    );

    const cardClass = classNames({
        [styles.draggedCard]: isDragging,
        [styles.cardPlayerTurn]: isPlayerTurn && (hasSelectedInstanceId !== isAllyUnit),
        [styles.selectedCard]: selectedInstanceId == cardData.instanceId,
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