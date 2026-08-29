import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { MAX_CARDS_PER_BOARD_ROW } from '../../../shared/constants/game'
import { CardZone, DraggedCard } from '../../../shared/types/card'
import Card from '../Card/Card'
import CardSlot from '../CardSlot/CardSlot.js'
import Styles from './Board.module.css'


type Props = {
    activeCardDrag: DraggedCard | null
}


const Board: React.FC<Props> = ({ activeCardDrag }) => {
    const board = useGameContext().state.board;

    return (
        <div className={activeCardDrag ? Styles.board_opacitated : Styles.board}>

            <div className={Styles.opponent_row}>
                {Array.from({ length: MAX_CARDS_PER_BOARD_ROW }).map((_, i) => (
                    <CardSlot cardData={board.opponent[i]} location={{ insideOf: CardZone.BOARD, index: i }}
                    activeCardDrag={null} key={i}/>
                ))}
            </div>

            <div className={Styles.user_row}>
                {Array.from({ length: MAX_CARDS_PER_BOARD_ROW }).map((_, i) => (
                    <CardSlot cardData={board.player[i]} location={{ insideOf: CardZone.BOARD, index: i }}
                    activeCardDrag={activeCardDrag} key={i}/>
                ))}
            </div>

        </div>
    );
}


export default Board