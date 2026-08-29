import { useDeckContext } from '../../../contexts/DeckContext/DeckContext'
import { DeckActionType } from '../../../contexts/DeckContext/reducer'
import { isDeckTypeFull } from '../../../shared/functions/decks'
import { UnitData, SpellData } from '../../../shared/types/card'
import { CardLocation } from '../../../shared/types/decks'
import Card from '../../game/Card/Card'
import Styles from './DecksCard.module.css'


type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const DecksCard: React.FC<Props> = ({ cardData, location }) => {
    const { state, dispatch } = useDeckContext();

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

    const isDisabled = (location === 'storage' && isDeckTypeFull(cardData.type, state.deck));

    return (
        <button onClick={handleChangeLocation} disabled={isDisabled} className={!isDisabled ? Styles.decks_card : undefined}>
            <Card cardData={cardData}/>
        </button>
    );
}


export default DecksCard