import './Card.css'
import cardImg from './Card.png';


function Card ({ name, hp, atk, cost, effect}) {
    return (
        <div className="card">
            <div className="name">{name}</div>
            <div>
                <img src={cardImg} alt="dog"/> {/* this is a placeholder pic for all cards */}
            </div>
            <div>
                <p className="effect">{effect}</p>
            </div>
            <div className="footer">
                <span className="atk">{atk}</span>
                <span className="cost">{cost}</span>
                <span className="hp">{hp}</span>
            </div>
        </div>
    );
}


export default Card