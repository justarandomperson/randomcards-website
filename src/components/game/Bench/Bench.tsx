import { UNITS_IN_DECK } from '../../../contexts/DeckContext/shared/constants'
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import CardSlot from '../CardSlot/CardSlot.js'
import { CardZone } from '../GameCard/shared/types'
import Styles from './Bench.module.css'


const Bench: React.FC = ({ }) => {
    const bench = useGameContext().state.players.player.cards.bench

    return (        
        <div className={Styles.bench}>
            {Array.from({ length: UNITS_IN_DECK }, (_, i) => (
                <CardSlot 
                    cardData={bench[i]} 
                    location={{ insideOf: CardZone.BENCH, index: i }} 
                    activeCardDrag={null} key={i}/>
            ))}
        </div>
    );
}


export default Bench