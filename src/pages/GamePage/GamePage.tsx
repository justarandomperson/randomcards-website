import { useState } from 'react'
import { PlayersProvider } from '../../contexts/PlayersContext/PlayersContext'
import Bench from '../../components/Bench/Bench.js'
import Board from '../../components/Board/Board.js'
import PlayerBar from '../../components/PlayerBar/PlayerBar.js'
import Shop from '../../components/Shop/Shop.js'
import Hand from '../../components/Hand/Hand.js'
import DrawPile from '../../components/DrawPile/DrawPile.js'
import Styles from './GamePage.module.css'


const GamePage: React.FC = ({ }) => {

    const [artifacts] = useState([
        { id: 1, name: "Ember Core", effect: "...", cost: 1 },
        { id: 2, name: "Frost Sigil", effect: "...",  cost: 12 },
        { id: 3, name: "Iron Bulwark", effect: "...", cost: 0 }
    ]);

    return (
        <div className={Styles.game_page}>
            <div className={Styles.play_area}>

                <PlayersProvider>            

                    <div className={Styles.main_components_container}>
                        <div className={Styles.bench_container}>
                            <Bench/>
                        </div>

                        <div>
                            <PlayerBar name="TinG hater" isOpponent={true}/>
                            <Board/>
                            <PlayerBar name="TinG" isOpponent={false}/>
                        </div>

                            <div className={Styles.shop_container}>
                                <Shop artifacts={artifacts}/>
                            </div>
                    </div>

                    <div className={Styles.hand_container}>
                        <Hand/>
                        <DrawPile cardsInPileAmount={6}/>
                    </div>

                </PlayersProvider>

            </div>
        </div>
    );
}


export default GamePage