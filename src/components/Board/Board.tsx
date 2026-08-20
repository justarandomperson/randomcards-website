import { useGameContext } from '../../contexts/GameContext/GameContext'
import { MAX_CARDS_PER_ROW } from '../../contexts/GameContext/Board'
import CardSlot from '../CardSlot/CardSlot.js'
import Styles from './Board.module.css'




const Board: React.FC = ({ }) => {
    const board = useGameContext().boardContext.board;
    
    return (
        <div className={Styles.board}>
            <div className={Styles.opponent_row}>
                {Array.from({ length: MAX_CARDS_PER_ROW }).map((_, i) => (
                    <CardSlot cardData={board.opponentCards[i]} location={{ insideOf: 'board', index: i }} key={i}/>
                ))}
            </div>
            <div className={Styles.user_row}>
                {Array.from({ length: MAX_CARDS_PER_ROW }).map((_, i) => (
                    <CardSlot cardData={board.playerCards[i]} location={{ insideOf: 'board', index: i }} key={i}/>
                ))}
            </div>
        </div>
    );
}


export default Board