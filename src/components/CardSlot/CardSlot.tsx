import { useDroppable } from '@dnd-kit/core'
import { UnitData } from '../../contexts/GameContext/Bench'
import { SpellData } from '../../contexts/GameContext/Hand'
import { CardLocation } from '../../types/dnd/Card'
import Card from '../Card/Card'
import Styles from './CardSlot.module.css'


type Props = {
    cardData?: UnitData | SpellData | null,
    location: CardLocation
}


const CardSlot: React.FC<Props> = ({ cardData, location }) => {
    const isDroppable = location.insideOf === 'board'; // only board slots are droppable

    const { setNodeRef } = useDroppable(
        {
            id: `${location.insideOf}-${location.index}`,
            data: location,
            disabled: !isDroppable
        }
    );

    return (
        <div ref={isDroppable ? setNodeRef : undefined} className={Styles.card_slot}>
            {cardData && (
                <Card cardData={cardData} location={location}/>
            )} 
        </div>
    );
}


export default CardSlot