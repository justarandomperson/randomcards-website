import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { UNITS_IN_DECK } from '../../../shared/constants/game'
import { CardZone } from '../../../shared/types/card'
import CardSlot from '../CardSlot/CardSlot.js'
import Styles from './Bench.module.css'


const Bench: React.FC = ({ }) => {
    const bench = useGameContext().state.players.player.cards.bench;

    return (        
        <div className={Styles.bench}>
            {Array.from({ length: UNITS_IN_DECK }, (_, i) => (
                <CardSlot cardData={bench[i]} location={{ insideOf: CardZone.BENCH, index: i }} activeCardDrag={null} key={i}/>
            ))}
        </div>
    );
}


export default Bench