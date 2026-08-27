import { useDeckContext, DeckActionType } from '../../../contexts/DeckContext/DeckContext'
import { isUnitsDeckFull, isSpellsDeckFull } from '../../../contexts/DeckContext/DeckContext'
import { UnitData, SpellData } from '../../../types/card'
import { CardLocation } from '../../../types/decks'
import Card from '../../game/Card/Card'


type Props = {
    cardData: UnitData | SpellData,
    location: CardLocation
}


const DecksCard: React.FC<Props> = ({ cardData, location }) => {
    const { deckContext, dispatch } = useDeckContext()
    
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

    return (
        <button onClick={handleChangeLocation} disabled={location === 'storage' && isDeckTypeFull(cardData.type)}>
            <Card cardData={cardData}/>
        </button>
    );
}


export default DecksCard