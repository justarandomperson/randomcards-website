import CardList from '../../components/decks/CardList/CardList'
import { CardType } from '../../components/game/Card/shared/types';
import { useDeckContext } from '../../contexts/DeckContext/DeckContext';
import { SPELLS_IN_DECK, UNITS_IN_DECK } from '../../contexts/DeckContext/shared/constants';
import { isDeckTypeFull } from '../../contexts/DeckContext/shared/helpers';
import styles from './DecksPage.module.css'


const DecksPage: React.FC = ({ }) => {
    const { state, getSpellDeckLength } = useDeckContext();


    // TODO: classNames for this 


    return (
        <div>

            <div>
                <h1>Deck</h1>

                <div>
                    <div className={styles.deck_row_header}>
                        <h3>Units</h3>
                        <p className={isDeckTypeFull(CardType.UNIT, state.deck) ? styles.full : undefined}>
                            {`${state.deck.units.length}/${UNITS_IN_DECK}`}
                        </p>
                    </div>
                    <CardList location='deck' type={CardType.UNIT}/>
                </div>

                <div>
                    <div className={styles.deck_row_header}>
                        <h3>Spells</h3>
                        <p className={isDeckTypeFull(CardType.SPELL, state.deck) ? styles.full : undefined}>
                            {`${getSpellDeckLength()}/${SPELLS_IN_DECK}`}
                        </p>
                    </div>
                    <CardList location='deck' type={CardType.SPELL}/>
                </div>
            </div>

            <div>
                <h1>Storage</h1>

                <div>
                    <h3>Units</h3>
                    <CardList location='storage' type={CardType.UNIT}/>         
                </div>

                <div>
                    <h3>Spells</h3>
                    <CardList location='storage' type={CardType.SPELL}/>
                </div>
            </div>

        </div>
    );
}


export default DecksPage