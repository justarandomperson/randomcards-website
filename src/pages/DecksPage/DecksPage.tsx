import CardList from '../../components/decks/CardList/CardList'


const DecksPage: React.FC = ({ }) => {
    return (
        <div>
        
            <div>
                <h1>Deck</h1>

                <div>
                    <h3>Units</h3>
                    <CardList location='deck' type='units'/>
                </div>

                <div>
                    <h3>Spells</h3>
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