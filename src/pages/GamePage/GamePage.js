import Bench from '../../components/Bench/Bench.js'
import Board from '../../components/Board/Board.js'
import Shop from '../../components/Shop/Shop.js'
import Hand from '../../components/Hand/Hand.js'
import './GamePage.css'


function GamePage () {
    return (
        <div className="game-page">
            <div className="play-area">
                <div className="main-components-container">
                    <div className="bench-container">
                        <Bench/>
                    </div>

                    <Board/>

                    <div className="shop-container">
                        <Shop/>
                    </div>
                </div>

                <Hand/>
            </div>
        </div>
    );
}


export default GamePage