import { useState } from 'react'
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import Health from '../Health/Health'
import styles from './PlayerBar.module.css'
import Artifacts from '../Artifacts/Artifacts'


type Props = {
    isOpponent: boolean
}


const PlayerBar: React.FC<Props> = ({ isOpponent }) => {
    const { state, emitters } = useGameContext();
    const [artifactsShown, setArtifactsShown] = useState(false)
    const { endTurn } = emitters;

    const player = isOpponent ? state.players.opponent : state.players.player;
    if (!player.data.id) {
        throw new Error("player has to have a socketId");
    }

    return (
        <div className={styles.player_bar}>
            {artifactsShown && <Artifacts isOpponent={isOpponent}/>}
            <div>
                <span className={styles.player_name}>{player.data.name}</span>
               <button className={styles.artifacts_button} onClick={() => setArtifactsShown(!artifactsShown)}>
                    <span>{`Artifacts: ${player.data.artifacts.length}`}</span>
               </button>
            </div>

            <div className={styles.player_data_container}>
                <Health health={player.data.hp} id={player.data.id} isOpponent={isOpponent}/>
                <p className={styles.money}>{`${player.data.money}$`}</p>
            </div>

            <div className={styles.turn_container}>

                <p>{player.data.drawpileCount} cards in drawpile</p>

                {!isOpponent &&
                    <>
                        <p>Turn {player.data.turn}</p>

                        <div className={styles.end_turn_btn_container}>
                            {state.isPlayerTurn &&
                                <button 
                                    onClick={endTurn} 
                                    disabled={state.targetFilter !== undefined || state.attackerSelected !== undefined}>
                                        End Turn
                                </button>
                            }
                        </div>    
                    </>
                }

            </div>
        </div>
    );
}


export default PlayerBar