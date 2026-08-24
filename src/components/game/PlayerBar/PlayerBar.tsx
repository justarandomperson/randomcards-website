import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { PlayersActionType, PlayersActionTarget } from '../../../contexts/GameContext/Players'
import { ShopActionType } from '../../../contexts/GameContext/Shop'
import { TURN_NUMBER_MONEY_MULT } from '../../../constants/game'
import Styles from './PlayerBar.module.css'


type Props = {
    isOpponent: boolean
}


const PlayerBar: React.FC<Props> = ({ isOpponent }) => {
    const { playersContext, shopContext } = useGameContext();
    const player = isOpponent ? playersContext.players.opponent : playersContext.players.player;

    const endTurn = () => {
        playersContext.dispatch({
            type: PlayersActionType.END_TURN,
            target: isOpponent ? PlayersActionTarget.OPPONENT : PlayersActionTarget.PLAYER
        })

        playersContext.dispatch({
            type: PlayersActionType.ADD_MONEY,
            target: isOpponent ? PlayersActionTarget.OPPONENT : PlayersActionTarget.PLAYER,
            amount: TURN_NUMBER_MONEY_MULT * (player.turn + 1) // increment player.turn to match new turn
        })

        shopContext.dispatch({
            type: ShopActionType.REFILL_SHOP
        })
    }

    return (
        <div className={Styles.player_bar}>
            <div>
                <span className={Styles.player_name}>{player.name}</span>
                <span>{`Artifacts: ${player.artifacts.length}`}</span>
            </div>

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