import { useGameContext } from '../../contexts/GameContext/GameContext'
import { MAX_BENCH_SIZE } from '../../contexts/GameContext/Bench'
import CardSlot from '../CardSlot/CardSlot.js'
import Styles from './Bench.module.css'


const Bench: React.FC = ({ }) => {
    const bench = useGameContext().benchContext.bench

    return (
        <div className={Styles.bench}>
            {Array.from({ length: MAX_BENCH_SIZE }, (_, i) => ( // always iterate over the whole bench
                <CardSlot cardData={bench.cards[i]} key={i} />
            ))}
        </div>
    );
}


export default Bench