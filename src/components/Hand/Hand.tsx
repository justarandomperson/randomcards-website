import { useGameContext } from '../../contexts/GameContext/GameContext'
import { SpellData } from '../../contexts/GameContext/Hand';
import Card from '../Card/Card.js'
import Styles from './Hand.module.css' 


function getCardList(cardsList: SpellData[]) {
    return cardsList.map((card) => (
        <Card cardData={card}/>
    ));
}


const Hand: React.FC = ({ }) => {
    const hand = useGameContext().handContext.hand;

    return (
        <>
            <div className={Styles.hand}>
                {getCardList(hand.cardsInHand)}
            </div>
        </>
    );
}


export default Hand