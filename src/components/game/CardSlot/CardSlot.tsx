import { useDroppable } from '@dnd-kit/core'
import { UnitData, SpellData, CardType, CardZone } from '../../../shared/types/card'
import { CardLocation, DraggedCard } from '../../../shared/types/card'
import GameCard from '../GameCard/GameCard'
import styles from './CardSlot.module.css'
import classNames from 'classnames'


type Props = {
    cardData: UnitData | SpellData | null,
    location: CardLocation,
    activeCardDrag: DraggedCard | null,
}


const CardSlot: React.FC<Props> = ({ cardData, location, activeCardDrag }) => {
    if (location.insideOf == CardZone.NONE) throw new Error(`Card ${cardData?.instanceId} has no location`) //so typescript won't complain about location maybe not having index
    const isDroppable = location.insideOf === CardZone.BOARD; // only board slots are droppable

    const { setNodeRef, isOver } = useDroppable({
            id: `${location.insideOf}-${location.index}`,
            data: location,
            disabled: !isDroppable
        }
    );

      const cardClass = classNames({
        [styles.card_slot]: location.insideOf == CardZone.BOARD,
        [styles.bench_slot]: location.insideOf == CardZone.BENCH
    })

    const showCardOver = !cardData && isOver && activeCardDrag?.cardData.type === CardType.UNIT;

    return (
        <div ref={isDroppable ? setNodeRef : undefined} className={cardClass}>
            {/* if the slot is taken... */}
            {cardData && (
                <GameCard cardData={cardData} location={location}/>
            )}

            {/* if a card is hovered over this slot and can be placed */}
            {showCardOver && (
                <div style={{ opacity: 0.4 }}>
                    <GameCard cardData={activeCardDrag.cardData} location={location} />
                </div>
            )} 
        </div>
    );
}


export default CardSlot