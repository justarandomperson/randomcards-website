import { useDraggable } from '@dnd-kit/core'
import { UnitData, SpellData } from '../../../shared/types/card'
import { CardLocation } from '../../../shared/types/card'
import Card from '../Card/Card'
import { useGameContext } from '../../../contexts/GameContext/GameContext'


type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const GameCard: React.FC<Props> = ({ cardData, location }) => {
    const { isPlayerTurn } = useGameContext().state;
    const isDraggable = location.insideOf !== 'board'; // board cards arent draggable

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ 
            id: `${location.insideOf}-${location.index}`, 
            data: {cardData, location},
            disabled: !isDraggable || !isPlayerTurn
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