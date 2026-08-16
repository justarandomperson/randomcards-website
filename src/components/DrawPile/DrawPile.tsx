import { useGameContext } from '../../contexts/GameContext/GameContext'
import { HandActionType } from '../../contexts/GameContext/Hand'
import Styles from './DrawPile.module.css'


const DrawPile: React.FC = () => {
    const { hand, dispatch } = useGameContext().handContext;

    const DrawCard = () => {
        dispatch({
            type: HandActionType.DRAW_CARD
        })
    }

    return (
        <div className={Styles.draw_pile}>
            <button onClick={DrawCard}>Draw Card</button>
            <p>{`${hand.cardsInDrawPile.length} Cards`}</p>
        </div>
    );
}


export default DrawPile