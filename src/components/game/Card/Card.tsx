import { UnitData, SpellData, CardType } from '../../../shared/types/card'
import styles from './Card.module.css'
import { useImagesContext } from '../../../contexts/ImagesContext/ImagesContext';


type Props = {
    cardData: UnitData | SpellData,
}


const Card: React.FC<Props> = ({ cardData }) => {
    const { state: imagesState } = useImagesContext();

    return (
        <div className={styles.card}>

            <div className={styles.header}>
                <span className={styles.name}  
                style={{
                    fontSize: `${Math.max(11, 18 - (cardData.name.length - 3) * 0.6)}px`,
                }}>{cardData.name}</span>
                <span className={styles.cost}>{cardData.cost}</span>
            </div>

            <div>
                <img src={`data:image/png;base64,${imagesState.get(cardData.id)}`} alt="placeholder (imagine dog)"/>
            </div>

            <p className={styles.effect}>{cardData.effectDesc}</p>

            <div className={styles.footer}>
                {cardData.type === CardType.UNIT && 
                    <>
                        <span className={styles.atk}>{cardData.atk}</span>
                        <span className={styles.hp}>{cardData.hp}</span>
                    </>
                }
            </div>

        </div>
    );
}


export default Card