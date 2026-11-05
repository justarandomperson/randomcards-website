import classNames from 'classnames'
import { useDeckContext } from '../../../contexts/DeckContext/DeckContext'
import { DeckActionType } from '../../../contexts/DeckContext/reducer'
import Card from '../../game/Card/Card'
import styles from './DecksCard.module.css'
import { SpellData, UnitData } from '../../game/Card/shared/types'
import { CardDeckZone } from '../../../contexts/DeckContext/shared/types'
import { isDeckTypeFull } from '../../../contexts/DeckContext/shared/helpers'


type Props = {
    cardData: UnitData | SpellData,
    location: CardDeckZone
}


const DecksCard: React.FC<Props> = ({ cardData, location }) => {
    const { state, dispatch } = useDeckContext();


    const handleChangeLocation = () => {
        if (location === 'deck') {
            dispatch({ 
                type: DeckActionType.REMOVE_CARD,
                card: cardData
            });
        }
        else if (location === 'storage') {
            dispatch({ 
                type: DeckActionType.ADD_CARD,
                card: cardData
            });
        }
    }


    const isDisabled = (location === 'storage' && isDeckTypeFull(cardData.type, state.deck));
    const className = classNames({
        [styles.decks_card]: true,
        [styles.selectable]: !isDisabled
    })

    
    return (
        <button onClick={handleChangeLocation} disabled={isDisabled} className={className}>
            <Card cardData={cardData}/>
        </button>
    );
}


export default DecksCard