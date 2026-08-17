import { UnitData } from '../../contexts/GameContext/Bench'
import { SpellData } from '../../contexts/GameContext/Hand'
import Card from '../Card/Card'
import Styles from './CardSlot.module.css'


type Props = {
    cardData?: UnitData | SpellData | null
}


const CardSlot: React.FC<Props> = ({ cardData }) => {
    return (
        <div className={Styles.card_slot}>
            {cardData && <Card cardData={cardData} />}
        </div>
    );
}


export default CardSlot