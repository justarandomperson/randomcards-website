import { useDraggable } from '@dnd-kit/core'
import { UnitData, SpellData } from '../../../types/card'
import { CardLocation } from '../../../types/card'
import Card from '../Card/Card'


type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const GameCard: React.FC<Props> = ({ cardData, location }) => {
    const isDraggable = location.insideOf !== 'board'; // board cards arent draggable

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ 
            id: `${location.insideOf}-${location.index}`, 
            data: {cardData, location},
            disabled: !isDraggable
        }
    );

    const style = {
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...(isDraggable ? attributes : {})} {...(isDraggable ? listeners : {})}>
            <Card cardData={cardData}/>
        </div>
    );
}


export default GameCard