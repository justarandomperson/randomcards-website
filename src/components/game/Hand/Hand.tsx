import { useGameContext } from '../../../contexts/GameContext/GameContext'
import GameCard from '../GameCard/GameCard.js'
import Styles from './Hand.module.css' 


const Hand: React.FC = ({ }) => {
    const hand = useGameContext().handContext.hand;

    return (
        <>
            <div className={Styles.hand}>
                {hand.cardsInHand.map((card, i) => (
                    <GameCard cardData={card} location={{ insideOf: 'hand', index: i }} />
                ))}
            </div>
        </>
    );
}


export default Hand