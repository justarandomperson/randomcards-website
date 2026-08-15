import { usePlayersContext, PlayersActionType, PlayersActionTarget } from '../../contexts/PlayersContext/PlayersContext'
import Styles from './PlayerBar.module.css'


const TURN_NUMBER_MULTIPIER = 2;


type Props = {
    isOpponent: boolean
}


const PlayerBar: React.FC<Props> = ({ isOpponent }) => {
    const { players, dispatch } = usePlayersContext();
    const player = isOpponent ? players.opponent : players.player;


    const endTurn = () => {
        dispatch({
            type: PlayersActionType.END_TURN,
            target: isOpponent ? PlayersActionTarget.OPPONENT : PlayersActionTarget.PLAYER
        })

        dispatch({
            type: PlayersActionType.ADD_MONEY,
            target: isOpponent ? PlayersActionTarget.OPPONENT : PlayersActionTarget.PLAYER,
            amount: TURN_NUMBER_MULTIPIER * (player.turn + 1) // increment player.turn to match new turn
        })
    }


    return (
        <div className={Styles.player_bar}>
            <p>{player.name}</p>

            <div className={Styles.player_data_container}>
                <p className={Styles.health}>{player.health}</p>
                <p className={Styles.money}>{`${player.money}$`}</p>
            </div>

            <div className={Styles.turn_container}>
                <p>Turn {player.turn}</p>

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