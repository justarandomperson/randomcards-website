import { useGameContext } from '../../../contexts/GameContext/GameContext'
import GameCard from '../GameCard/GameCard.js'
import Styles from './Hand.module.css' 


const Hand: React.FC = ({ }) => {
    const { hand } = useGameContext().state.players.player.cards;

    return (
        <>
            <div className={Styles.hand}>
                {hand.map((card, i) => (
                    <GameCard cardData={card} location={{ insideOf: 'hand', index: i }} key={i} />
                ))}
            </div>
        </>
    );
}


export default Hand