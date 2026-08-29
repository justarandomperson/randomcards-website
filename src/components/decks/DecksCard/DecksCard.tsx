import { useDeckContext, DeckActionType } from '../../../contexts/DeckContext/DeckContext'
import { isUnitsDeckFull, isSpellsDeckFull } from '../../../contexts/DeckContext/DeckContext'
import { UnitData, SpellData } from '../../../types/card'
import { CardLocation } from '../../../types/decks'
import Card from '../../game/Card/Card'
import Styles from './DecksCard.module.css'


type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const DecksCard: React.FC<Props> = ({ cardData, location }) => {
    const { deckContext, dispatch } = useDeckContext();

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

    const isDeckTypeFull = (cardType: 'unit' | 'spell' ): boolean => {
        if (cardType === 'unit') {
            return isUnitsDeckFull(deckContext.deck);
        }

        return isSpellsDeckFull(deckContext.deck);
    }

    const isDisabled = (location === 'storage' && isDeckTypeFull(cardData.type));


    return (
        <button onClick={handleChangeLocation} disabled={isDisabled} className={!isDisabled ? Styles.decks_card : undefined}>
            <Card cardData={cardData}/>
        </button>
    );
}


export default DecksCard