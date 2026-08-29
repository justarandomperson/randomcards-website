import CardList from '../../components/decks/CardList/CardList'
import { useDeckContext } from '../../contexts/DeckContext/DeckContext';
import { UNITS_IN_DECK, SPELLS_IN_DECK } from '../../constants/game';
import Styles from './DecksPage.module.css'


const DecksPage: React.FC = ({ }) => {
    const deck = useDeckContext().deckContext.deck

    return (
        <div>
        
            <div>
                <h1>Deck</h1>

                <div>
                    <div className={Styles.deck_row_header}>
                        <h3>Units</h3>
                        <p>{`${deck.units.length}/${UNITS_IN_DECK}`}</p>
                    </div>
                    <CardList location='deck' type='units'/>
                </div>

                <div>
                    <div className={Styles.deck_row_header}>
                        <h3>Spells</h3>
                        <p>{`${deck.spells.length}/${SPELLS_IN_DECK}`}</p>
                    </div>
                    <CardList location='deck' type='spells'/>
                </div>
            </div>

            <div>
                <h1>Storage</h1>

                <div>
                    <h3>Units</h3>
                    <CardList location='storage' type='units'/>         
                </div>

                <div>
                    <h3>Spells</h3>
                    <CardList location='storage' type='spells'/>
                </div>
            </div>

        </div>
    );
}


export default DecksPage