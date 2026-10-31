import { UnitData, SpellData, CardType } from '../../../shared/types/card'
import cardImg from './Card.png';
import Styles from './Card.module.css'
import { useImagesContext } from '../../../contexts/ImagesContext/ImagesContext';


type Props = {
    cardData: UnitData | SpellData,
}


const Card: React.FC<Props> = ({ cardData }) => {
    const { state: imagesState } = useImagesContext();

    return (
        <div className={Styles.card}>

            <div className={Styles.header}>
                <span className={Styles.name}  
                style={{
                    fontSize: `${Math.max(11, 18 - (cardData.name.length - 3) * 0.6)}px`,
                }}>{cardData.name}</span>
                <span className={Styles.cost}>{cardData.cost}</span>
            </div>

            <div>
                <img src={`data:image/png;base64,${imagesState.get(cardData.id)}`} alt="dog"/>
            </div>

            <div>
                <p className={Styles.effect}>{cardData.effectDesc}</p>
            </div>

            <div className={Styles.footer}>
                {cardData.type === CardType.UNIT && 
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