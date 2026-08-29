import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { useGameLogic } from '../../../contexts/GameContext/GameLogic'
import { PlayersActionType, PlayersActionTarget } from '../../../contexts/GameContext/Players'
import { ShopActionType } from '../../../contexts/GameContext/Shop'
import { TURN_NUMBER_MONEY_MULT } from '../../../constants/game'
import Health from '../../Health/Health'
import Styles from './PlayerBar.module.css'

type Props = {
    isOpponent: boolean
}


const PlayerBar: React.FC<Props> = ({ isOpponent }) => {
    const players = useGameContext().playersContext.players;
    const player = isOpponent ? players.opponent : players.player;
    const { endTurn } = useGameLogic();

    return (
        <div className={Styles.player_bar}>
            <div>
                <span className={Styles.player_name}>{player.name}</span>
                <span>{`Artifacts: ${player.artifacts.length}`}</span>
            </div>

            <div className={Styles.player_data_container}>
                <Health health={player.health}/>
                <p className={Styles.money}>{`${player.money}$`}</p>
            </div>

            <div className={Styles.turn_container}>
                <p>Turn {player.turn}</p>

                {!isOpponent &&
                    <div className={Styles.end_turn_btn_container}>
                        <button onClick={() => endTurn(isOpponent)}>
                            End Turn
                        </button>
                    </div>    
                }

            </div>
        </div>
    );
}


export default PlayerBar