import { useGameContext } from '../../../contexts/GameContext/GameContext'
import Styles from './DrawPile.module.css'


const DrawPile: React.FC = () => {
    const { drawPile } = useGameContext().state.players.player.cards;

    return (
        <div className={Styles.draw_pile}>
            <p>{`${drawPile.length} Cards`}</p>
        </div>
    );
}


export default DrawPile