import Styles from './DrawPile.module.css'


function DrawPile ({ cardsInPileAmount }) {
    return (
        <div className={Styles.draw_pile}>
            <button>Draw Card</button>
            <p>{`${cardsInPileAmount} Cards`}</p>
        </div>
    );
}


export default DrawPile