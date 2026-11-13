import { useGameContext } from '../../../contexts/GameContext/GameContext'
import Artifact from '../Artifact/Artifact';
import styles from "./Artifacts.module.css"

type Props = {
    isOpponent: boolean
}

const Artifacts: React.FC<Props> = ({isOpponent}) => {
    const { state } = useGameContext();
    const playerData = isOpponent ? state.players.opponent.data : state.players.player.data

    return (
        <div className={styles.artifacts_container}>
            {playerData.artifacts.map((artifact) => <Artifact artifactData={artifact} inInventory/>)}
        </div>
    );
}


export default Artifacts