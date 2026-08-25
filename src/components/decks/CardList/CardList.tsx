import { useDeckContext } from '../../../contexts/DeckContext/DeckContext'
import { CardLocation } from '../../../types/decks'
import DecksCard from '../DecksCard/DecksCard'
import Styles from './CardList.module.css'


type Props = {
    location: CardLocation,
    type: 'units' | 'spells'
}


const CardList: React.FC<Props> = ({ location, type }) => {
    const items = useDeckContext().deckContext[location][type]

    return (
        <ul className={Styles.card_list}>
            {items.map((item) => {
                return (<DecksCard cardData={item} location={location}></DecksCard>);
            })}
        </ul>
    );
}


export default CardList