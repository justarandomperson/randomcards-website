import { useDraggable } from '@dnd-kit/core'
import { UnitData, SpellData, CardType, CardZone } from '../../../shared/types/card'
import { CardLocation } from '../../../shared/types/card'
import Card from '../Card/Card'
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import styles from "./GameCard.module.css"
import classNames from "classnames"
import { TargetType } from '../../../shared/types/game'
import { getTargetType } from '../../../shared/functions/game'


type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const GameCard: React.FC<Props> = ({ cardData, location }) => {
    const instanceId = cardData.instanceId;
    if (location.insideOf === CardZone.NONE || !instanceId) {
        throw new Error('card doesnt exist');
    }

    const { state, selectedCard, setSelectedCard, emitters } = useGameContext()
    const { isPlayerTurn } = state

    const isAllyUnit = (cardData.type == CardType.UNIT && location.index < 4) || location.insideOf == CardZone.BENCH
    const hasCardSelected = selectedCard != undefined
    const targetType = getTargetType(cardData, location)
    const isTargetSelectable = state.targetFilter ? state.targetFilter.has(targetType) : false


    const isDraggable = location.insideOf !== CardZone.BOARD 
    && !state.targetFilter; // board cards arent draggables
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ 
            id: `${location.insideOf}-${location.index}`, 
            data: {cardData, location},
            disabled: !isDraggable || !isPlayerTurn
        }
    );

    const cardClass = classNames({
        [styles.draggedCard]: isDragging,
        [styles.cardPlayerTurn]: isPlayerTurn && (hasCardSelected !== isAllyUnit),
        [styles.selectedCard]: selectedCard == cardData.instanceId,
        [styles.selectableCard]: isTargetSelectable,
        [styles.container]: true
    })


    const onSelectedHandler = () => {
        if (selectedCard == cardData.instanceId)
        {
            setSelectedCard(undefined)
            return
        }
        if (state.targetFilter && isTargetSelectable){
            emitters.selectTarget(instanceId, false)
            return
        }

        if (isAllyUnit && selectedCard) { 
            return
        }
        else if (isAllyUnit) {
            setSelectedCard(cardData.instanceId)
            return
        }
        else if (!selectedCard || !cardData.instanceId) {
            return
        }

        // if not selectingTarget and everything else then it meant to attack
        emitters.attackUnit({ attackerId: selectedCard, targetId: cardData.instanceId })
        setSelectedCard(undefined)
    }
    

    return (
        <div 
            className={cardClass} {...(isDraggable ? attributes : {})} {...(isDraggable ? listeners : {})} 
            ref={setNodeRef} onClick={onSelectedHandler}>
                <Card cardData={cardData}/>
        </div>
    );
}


export default GameCard