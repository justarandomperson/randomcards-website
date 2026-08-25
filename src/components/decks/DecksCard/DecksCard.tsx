import { useDeckContext, DeckActionType } from '../../../contexts/DeckContext/DeckContext';
import { UnitData, SpellData } from '../../../types/card'
import { CardLocation } from '../../../types/decks'
import Card from '../../game/Card/Card';


type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const DecksCard: React.FC<Props> = ({ cardData, location }) => {
    const dispatch = useDeckContext().dispatch
    
    const handleChangeLocation = () => {
        if (location === 'deck') {
            dispatch({ 
                type: DeckActionType.REMOVE_CARD,
                card: cardData
            })
        }
        else if (location === 'storage') {
            dispatch({ 
                type: DeckActionType.ADD_CARD,
                card: cardData
            })
        }
    }

    return (
        <button onClick={handleChangeLocation}>
            <Card cardData={cardData}/>
        </button>
    );
}



export default DecksCard