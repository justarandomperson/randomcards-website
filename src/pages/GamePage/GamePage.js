import { useState } from 'react'
import Bench from '../../components/Bench/Bench.js'
import Board from '../../components/Board/Board.js'
import PlayerBar from '../../components/PlayerBar/PlayerBar.js'
import Shop from '../../components/Shop/Shop.js'
import Hand from '../../components/Hand/Hand.js'
import DrawPile from '../../components/DrawPile/DrawPile.js'
import Styles from './GamePage.module.css'


function GamePage () {
    const [artifacts] = useState([
        { id: 1, name: "Ember Core", effect: "...", isBought: false, cost: 1 },
        { id: 2, name: "Frost Sigil", effect: "...", isBought: false, cost: 12 },
        { id: 3, name: "Iron Bulwark", effect: "...", isBought: false, cost: 0 }
    ]);

    return (
        <div className={Styles.game_page}>
            <div className={Styles.play_area}>
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
            </div>
        </div>
    );
}


export default GamePage