import { useDroppable } from '@dnd-kit/core'
import { UnitData, SpellData } from '../../../types/card'
import { CardLocation, DraggedCard } from '../../../types/card'
import GameCard from '../GameCard/GameCard'
import Styles from './CardSlot.module.css'


type Props = {
    cardData: UnitData | SpellData | null,
    location: CardLocation,
    activeCardDrag: DraggedCard | null,
}


const CardSlot: React.FC<Props> = ({ cardData, location, activeCardDrag }) => {
    const isDroppable = location.insideOf === 'board'; // only board slots are droppable

    const { setNodeRef, isOver } = useDroppable({
            id: `${location.insideOf}-${location.index}`,
            data: location,
            disabled: !isDroppable
        }
    );

    const showCardOver = !cardData && isOver && activeCardDrag?.cardData.type === 'unit';

    return (
        <div ref={isDroppable ? setNodeRef : undefined} className={Styles.card_slot}>
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