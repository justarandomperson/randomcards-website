import { useGameActions, useGameContext } from '../../../contexts/GameContext/GameContext'
import Health from '../Health/Health'
import Styles from './PlayerBar.module.css'

type Props = {
    isOpponent: boolean
}


const PlayerBar: React.FC<Props> = ({ isOpponent }) => {
    const players = useGameContext().state.players;
    const player = isOpponent ? players.opponent : players.player;
    const { endTurn } = useGameActions();

    return (
        <div className={Styles.player_bar}>
            <div>
                <span className={Styles.player_name}>{player.data.name}</span>
                <span>{`Artifacts: ${player.data.artifacts.length}`}</span>
            </div>

            <div className={Styles.player_data_container}>
                <Health health={player.data.health}/>
                <p className={Styles.money}>{`${player.data.money}$`}</p>
            </div>

            <div className={Styles.turn_container}>
                <p>Turn {player.data.turn}</p>

                {!isOpponent &&
                    <div className={Styles.end_turn_btn_container}>
                        <button onClick={endTurn}>
                            End Turn
                        </button>
                    </div>    
                }

            </div>
        </div>
    );
}


export default PlayerBar