import { useGameContext } from '../../../contexts/GameContext/GameContext'
import Styles from './DrawPile.module.css'


const DrawPile: React.FC = () => {
    const { drawPileCount } = useGameContext().state.players.player.cards;

    return (
        <div className={Styles.draw_pile}>
            <p>{`${drawPileCount} Cards In Drawpile`}</p>
        </div>
    );
}


export default DrawPile