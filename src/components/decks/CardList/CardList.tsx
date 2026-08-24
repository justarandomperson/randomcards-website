import { useDeckContext } from '../../../contexts/DeckContext/DeckContext'
import DecksCard from '../DecksCard/DecksCard'
import Styles from './CardList.module.css'


type Props = {
    location: 'deck' | 'storage',
    type: 'units' | 'spells'
}


const CardList: React.FC<Props> = ({ location, type }) => {
    const items = useDeckContext().deckContext[location][type]

    return (
        <ul className={Styles.card_list}>
            {items.map((item) => {
                return (<DecksCard cardData={item}></DecksCard>);
            })}
        </ul>
    );
}


export default CardList