import { useState } from 'react'
import Artifact from '../../components/Artifact/Artifact.js'
import Bench from '../../components/Bench/Bench.js'
import Board from '../../components/Board/Board.js'
import PlayerBar from '../../components/PlayerBar/PlayerBar.js'
import Shop from '../../components/Shop/Shop.js'
import Hand from '../../components/Hand/Hand.js'
import './GamePage.css'


function GamePage () {
    const [artifacts] = useState([
        { id: 1, name: "Ember Core", effect: "...", isBought: false },
        { id: 2, name: "Frost Sigil", effect: "...", isBought: false },
        { id: 3, name: "Iron Bulwark", effect: "...", isBought: false }
    ]);

    return (
        <div className="game-page">
            <div className="play-area">
                <div className="main-components-container">
                    <div className="bench-container">
                        <Bench/>
                    </div>

                    <div>
                        <Board/>
                        <PlayerBar name="TinG"/>
                    </div>

                    <div className="shop-container">
                        <Shop artifacts={artifacts}/>
                    </div>
                </div>

                <Hand/>
            </div>
        </div>
    );
}


export default GamePage