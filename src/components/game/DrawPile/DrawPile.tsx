import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { HandActionType } from '../../../contexts/GameContext/Hand'
import Styles from './DrawPile.module.css'


const DrawPile: React.FC = () => {
    const { hand, dispatch } = useGameContext().handContext;

    return (
        <div className={Styles.draw_pile}>
            <p>{`${hand.cardsInDrawPile.length} Cards`}</p>
        </div>
    );
}


export default DrawPile