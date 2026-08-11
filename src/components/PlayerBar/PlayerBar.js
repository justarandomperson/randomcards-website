import { useState } from 'react'
import './PlayerBar.css'


const STARTING_HEALTH = 20;


function PlayerBar ({ name }) {
    const [health] = useState(STARTING_HEALTH);

    return (
        <div className="player-bar">
            <p>{name}</p>
            <p className="health">{health}</p>
            <button>Settings</button>
        </div>
    );
}


export default PlayerBar