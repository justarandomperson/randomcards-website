import cardImg from './Card.png';
import Styles from './Card.module.css'


function Card ({ cardData }) {
    // cardData holds name, cost, effect, atk and hp
    return (
        <div className={Styles.card}>
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
                { cardData.type.toLowerCase() === "unit" && 
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