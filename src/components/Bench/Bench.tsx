import CardSlot from '../CardSlot/CardSlot.js'
import Styles from './Bench.module.css'


const BENCH_SLOTS = 8;


const Bench: React.FC = ({ }) => {
    return (
        <div className={Styles.bench}>
            {Array.from({ length: BENCH_SLOTS }).map((_, i) => (
                <CardSlot key={i} />
            ))}
        </div>
    );
}


export default Bench