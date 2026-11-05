import styles from './Card.module.css'
import { useImagesContext } from '../../../contexts/ImagesContext/ImagesContext';
import { CardType, SpellData, UnitData } from './shared/types';


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
                   fontSize: `${Math.max(9, 18 - Math.max(0, cardData.name.length - 10) * 0.55)}px`,
                }}>
                    {cardData.name}
                </span>
                <span className={styles.cost}>{cardData.cost}</span>
            </div>

            <div>
                <img src={`data:image/png;base64,${imagesState.get(cardData.id)}`} alt="placeholder (imagine dog)"/>
            </div>

            <p style={{
                    fontSize: `${Math.max(11, 18 - (cardData.effectDesc.length - 3) * 0.6)}px`,
                }} 
                className={styles.effect}>
                    {cardData.effectDesc}
            </p>

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