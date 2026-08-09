import CardSlot from '../CardSlot/CardSlot.js'
import './Board.css'


const SLOTS_PER_ROW = 4;


function Board () {
    return (
        <div className="board">
            <div className="opponent-row">
                {Array.from({ length: SLOTS_PER_ROW }).map((_, i) => (
                    <CardSlot key={i} />
                ))}
            </div>
            <div className="user-row">
                {Array.from({ length: SLOTS_PER_ROW }).map((_, i) => (
                    <CardSlot key={i} />
                ))}
            </div>
        </div>
    );
}


export default Board