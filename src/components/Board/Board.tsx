import CardSlot from '../CardSlot/CardSlot.js'
import Styles from './Board.module.css'


const SLOTS_PER_ROW = 4;


const Board: React.FC = ({ }) => {
    return (
        <div className={Styles.board}>
            <div className={Styles.opponent_row}>
                {Array.from({ length: SLOTS_PER_ROW }).map((_, i) => (
                    <CardSlot key={i} />
                ))}
            </div>
            <div className={Styles.user_row}>
                {Array.from({ length: SLOTS_PER_ROW }).map((_, i) => (
                    <CardSlot key={i} />
                ))}
            </div>
        </div>
    );
}


export default Board