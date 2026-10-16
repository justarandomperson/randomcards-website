import { useDraggable } from '@dnd-kit/core'
import { UnitData, SpellData, CardType, CardZone } from '../../../shared/types/card'
import { CardLocation } from '../../../shared/types/card'
import Card from '../Card/Card'
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import styles from "./GameCard.module.css"
import classNames from "classnames"


type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const GameCard: React.FC<Props> = ({ cardData, location }) => {
    if (location.insideOf === CardZone.NONE) {
        throw new Error('card doesnt exist');
    }

    const { state, selectedCard, setSelectedCard, emitters } = useGameContext()
    const { isPlayerTurn } = state

    const isDraggable = location.insideOf !== CardZone.BOARD; // board cards arent draggable

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ 
            id: `${location.insideOf}-${location.index}`, 
            data: {cardData, location},
            disabled: !isDraggable || !isPlayerTurn
        }
    );

    const allyUnit = (cardData.type == CardType.UNIT && location.index < 4) || location.insideOf == "bench"
    const hasCardSelected = selectedCard != undefined

    if (location.insideOf == "board") console.log(hasCardSelected, allyUnit, location.index, state.board)

    const cardClass = classNames({
        [styles.draggedCard]: isDragging,
        [styles.cardPlayerTurn]: isPlayerTurn && (hasCardSelected !== allyUnit),
        [styles.selectedCard]: selectedCard == cardData.instanceId,
        [styles.selectableCard]: state.selectingTarget
    })

    const onSelectedHandler = () => {
        if (state.selectingTarget)
        {
            emitters.selectTarget(cardData.id)
        }
        if (allyUnit && selectedCard) return
        if (allyUnit)
        {
            setSelectedCard(cardData.instanceId)
            return
        }
        if (!selectedCard || !cardData.instanceId) return
        emitters.attackUnit({instanceId: selectedCard, targetId: cardData.instanceId})
    }
    
    return (
        <div ref={setNodeRef} className={cardClass} {...(isDraggable ? attributes : {})} {...(isDraggable ? listeners : {})} onClick={onSelectedHandler}>
            <Card cardData={cardData}/>
        </div>
    );
}


export default GameCard