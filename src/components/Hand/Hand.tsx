import { useGameContext } from '../../contexts/GameContext/GameContext'
import { SpellData } from '../../contexts/GameContext/Hand';
import Card from '../Card/Card.js'
import Styles from './Hand.module.css' 


const Hand: React.FC = ({ }) => {
    const hand = useGameContext().handContext.hand;

    return (
        <>
            <div className={Styles.hand}>
                {hand.cardsInHand.map((card, i) => (
                    <Card cardData={card} location={{ insideOf: 'hand', index: i }} />
                ))}
            </div>
        </>
    );
}


export default Hand