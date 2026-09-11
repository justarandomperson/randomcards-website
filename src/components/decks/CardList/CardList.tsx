import { useDeckContext } from '../../../contexts/DeckContext/DeckContext'
import { CardType } from '../../../shared/types/card'
import { CardLocation } from '../../../shared/types/decks'
import DecksCard from '../DecksCard/DecksCard'
import Styles from './CardList.module.css'


type Props = {
    location: CardLocation,
    type: CardType
}


const CardList: React.FC<Props> = ({ location, type }) => {
    const deckStateLocation = useDeckContext().state[location];
    const items = type === CardType.UNIT ? deckStateLocation.units : deckStateLocation.spells;

    return (
        <ul className={Styles.card_list}>
            {items.map((item) => {
                return (<DecksCard cardData={item} location={location} key={item.instanceId}></DecksCard>);
            })}
        </ul>
    );
}


export default CardList