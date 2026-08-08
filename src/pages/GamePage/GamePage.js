import Bench from '../../components/BenchBench.js'
import Board from '../../components/Board/Board.js'
import Shop from '../../components/Shop/Shop.js'
import Hand from '../../components/Hand/Hand.js'
import './GamePage.css'


function GamePage () {
    return (
        <div className="game-page">
            <Bench/>
            <div className="board-shop-area">
                <Board/>
                <Shop/>
            </div>
            <Hand/>
        </div>
    );
}


export default GamePage