import { useState } from 'react'
import Styles from './PlayerBar.module.css'


const STARTING_HEALTH = 20;
const TURN_NUMBER_MULTIPIER = 2;


type Props = {
    name: string,
    isOpponent: boolean
}


const PlayerBar: React.FC<Props> = ({ name, isOpponent }) => {
    const [health, _] = useState<number>(STARTING_HEALTH);
    const [turnNumber, setTurnNumber] = useState(0);
    const [money, setMoney] = useState(0);

    function endTurn () {
        setTurnNumber(turnNumber + 1);
        setMoney(money + TURN_NUMBER_MULTIPIER * turnNumber);
    }

    return (
        <div className={Styles.player_bar}>
            <p>{name}</p>

            <div className={Styles.player_data_container}>
                <p className={Styles.health}>{health}</p>
                <p className={Styles.money}>{`${money}$`}</p>
            </div>

            <div className={Styles.turn_container}>
                <p>Turn {turnNumber}</p>
                {!isOpponent &&
                    <div className={Styles.end_turn_btn_container}>
                        <button onClick={endTurn}>End Turn</button>
                    </div>    
                }
            </div>
        </div>
    );
}


export default PlayerBar