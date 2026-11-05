import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { MAX_CARDS_PER_BOARD_ROW } from '../../../contexts/GameContext/shared/constants'
import { getOpponentRow, getPlayerRow } from '../../../contexts/GameContext/shared/helpers'
import { GamePhase } from '../../../contexts/GameContext/shared/types'
import CardSlot from '../CardSlot/CardSlot.js'
import { CardZone, DraggedCard } from '../GameCard/shared/types'
import Styles from './Board.module.css'


type Props = {
    activeCardDrag: DraggedCard | null
}


const Board: React.FC<Props> = ({ activeCardDrag }) => {
    const { state } = useGameContext();
    const { board, phase } = state;


    const isPlayPhase = (phase === GamePhase.PLAY)
    const playerBoardRow = getPlayerRow(board);
    const opponentBoardRow = getOpponentRow(board);


    return (
        <div className={activeCardDrag || !isPlayPhase ? Styles.board_opacitated : Styles.board}>

            <div className={Styles.opponent_row}>

                {Array.from({ length: MAX_CARDS_PER_BOARD_ROW }).map((_, i) => (
                    <CardSlot 
                        cardData={opponentBoardRow[i]} 
                        location={{ insideOf: CardZone.BOARD, index: i + MAX_CARDS_PER_BOARD_ROW }}
                        activeCardDrag={null} key={i}/>
                ))}

            </div>

            <div className={Styles.user_row}>

                {Array.from({ length: MAX_CARDS_PER_BOARD_ROW }).map((_, i) => (
                    <CardSlot 
                        cardData={playerBoardRow[i]} 
                        location={{ insideOf: CardZone.BOARD, index: i }}
                        activeCardDrag={activeCardDrag} key={i}/>
                ))}
                
            </div>

        </div>
    );
}


export default Board