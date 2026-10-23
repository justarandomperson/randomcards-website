import { useDeckContext } from '../../../contexts/DeckContext/DeckContext'
import { CardType, SpellData } from '../../../shared/types/card'
import { CardLocation } from '../../../shared/types/decks'
import DecksCard from '../DecksCard/DecksCard'
import Styles from './CardList.module.css'


type Props = {
    location: CardLocation,
    type: CardType
}

const compileSpellsMap = (spellsMap: Map<string, { data: SpellData, amount: number }>): SpellData[] => {
    return [...spellsMap.values()].map((spell) => spell.data );
}


const CardList: React.FC<Props> = ({ location, type }) => {
    const { state } = useDeckContext();
    const list = (location === 'deck') ? state.deck : state.storage;
    
    const items = (type === CardType.UNIT) ? 
        list.units : compileSpellsMap(list.spells);
    

    return (
        <ul className={Styles.card_list}>
            {items.map((item, i) => {
                return (<DecksCard cardData={item} location={location} key={i}></DecksCard>);
            })}
        </ul>
    );
}


export default CardList