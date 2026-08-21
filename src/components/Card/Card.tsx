import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { UnitData } from '../../contexts/GameContext/Bench'
import { SpellData } from '../../contexts/GameContext/Hand'
import { CardLocation } from '../../types/dnd/Card'
import cardImg from './Card.png';
import Styles from './Card.module.css'


type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


export const Card: React.FC<Props> = ({ cardData, location }) => {
    const isDraggable = location.insideOf !== 'board'; // board cards arent draggable

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable(
        { 
            id: `${location.insideOf}-${location.index}`, 
            data: {cardData, location},
            disabled: !isDraggable
        }
    );

    const style = {
        opacity: isDragging ? 0.4 : 1,
    };

    // how do i integrate isDraggable here nicely?
    return (
        <div className={Styles.card} ref={setNodeRef} style={style} {...(isDraggable ? attributes : {})} 
        {...(isDraggable ? listeners : {})}>

            <div className={Styles.header}>
                <span className={Styles.name}>{cardData.name}</span>
                <span className={Styles.cost}>{cardData.cost}</span>
            </div>

            <div>
                <img src={cardImg} alt="dog"/> {/* this is a placeholder pic for all cards */}
            </div>

            <div>
                <p className={Styles.effect}>{cardData.effect}</p>
            </div>

            <div className={Styles.footer}>
                {cardData.type === 'unit' && 
                    <>
                        <span className={Styles.atk}>{cardData.atk}</span>
                        <span className={Styles.hp}>{cardData.hp}</span>
                    </>
                }
            </div>

        </div>
    );
}


export default Card