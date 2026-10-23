import { useDeckContext } from '../../../contexts/DeckContext/DeckContext'
import { CardType, SpellData } from '../../../shared/types/card'
import { CardLocation } from '../../../shared/types/decks'
import DecksCard from '../DecksCard/DecksCard'
import Styles from './CardList.module.css'


type Props = {
    location: CardLocation,
    type: CardType
}


const CardList: React.FC<Props> = ({ location, type }) => {
    const { state } = useDeckContext();
    const list = (location === 'deck') ? state.deck : state.storage;
    
    const items = (type === CardType.UNIT) ? 
        list.units : [...list.spells.values()].map((spell) => spell.data );
    

    return (
        <ul className={Styles.card_list}>
            {items.map((item, i) => {
                return (<DecksCard cardData={item} location={location} key={i}></DecksCard>);
            })}
        </ul>
    );
}


export default CardList