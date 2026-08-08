import './Card.css'
import cardImg from './Card.png';


function Card ({ cardData }) {
    // cardData holds name, cost, effect, atk and hp
    return (
        <div className="card">
            <div className="header">
                <span className="name">{cardData.name}</span>
                <span className="cost">{cardData.cost}</span>
            </div>
            <div>
                <img src={cardImg} alt="dog"/> {/* this is a placeholder pic for all cards */}
            </div>
            <div>
                <p className="effect">{cardData.effect}</p>
            </div>
            <div className="footer">
                { cardData.type.toLowerCase() === "unit" && <>
                    <span className="atk">{cardData.atk}</span>
                    <span className="hp">{cardData.hp}</span>
                </>
                }

            </div>
        </div>
    );
}


export default Card