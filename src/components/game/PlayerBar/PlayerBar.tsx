import { useEffect, useState } from 'react'
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import Health from '../Health/Health'
import Styles from './PlayerBar.module.css'
import ArtifactList from '../ArtifactList/ArtifactList'


type Props = {
    isOpponent: boolean
}


const PlayerBar: React.FC<Props> = ({ isOpponent }) => {
    const { state, emitters } = useGameContext()
    const { endTurn } = emitters
    const player = isOpponent ? state.players.opponent : state.players.player


    const [ artifactListShown, setArtifactListShown ] = useState<boolean>(false);

    const handleClickArtifacts = () => {
        artifactListShown ? setArtifactListShown(false) : setArtifactListShown(true);
    }


    return (
        <div className={Styles.player_bar}>
            <div>
                <span className={Styles.player_name}>{player.data.name}</span>
                <span onClick={handleClickArtifacts}>{`Artifacts: ${player.data.artifacts.length}`}</span>
                { artifactListShown &&
                    <ArtifactList artifacts={player.data.artifacts}/>
                }
            </div>

            <div className={Styles.player_data_container}>
                <Health health={player.data.health}/>
                <p className={Styles.money}>{`${player.data.money}$`}</p>
            </div>

            <div className={Styles.turn_container}>

                <p>{player.data.drawpileCount} cards in drawpile</p>

                {!isOpponent &&
                    <>
                        <p>Turn {player.data.turn}</p>

                        <div className={Styles.end_turn_btn_container}>
                            {state.isPlayerTurn &&
                                <button onClick={endTurn}>
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