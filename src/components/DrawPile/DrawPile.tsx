import Styles from './DrawPile.module.css'


type Props = {
    cardsInPileAmount: number 
}


const DrawPile: React.FC<Props> = ({ cardsInPileAmount }) => {
    return (
        <div className={Styles.draw_pile}>
            <button>Draw Card</button>
            <p>{`${cardsInPileAmount} Cards`}</p>
        </div>
    );
}


export default DrawPile