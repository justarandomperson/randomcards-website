import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { CardZone } from '../../../shared/types/card';
import GameCard from '../GameCard/GameCard.js'
import styles from './Hand.module.css' 


const Hand: React.FC = ({ }) => {
    const { hand } = useGameContext().state.players.player.cards;

    return (
        <>
            <div className={styles.hand}>
                {hand.map((card, i) => (
                   <div className={styles.hand_slot}>
                     <GameCard cardData={card} location={{ insideOf: CardZone.HAND, index: i }} key={i} />
                    </div>
                ))}
            </div>
        </>
    );
}


export default Hand