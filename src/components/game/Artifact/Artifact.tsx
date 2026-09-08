import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { NULL_ARTIFACT_ID } from '../../../shared/constants/game';
import { ArtifactData, GamePhase } from "../../../shared/types/game";
import Styles from './Artifact.module.css'


type Props = {
    artifactData: ArtifactData
}


const Artifact: React.FC<Props> = ({ artifactData }) => {
    const { buyArtifact, state } = useGameContext()
    const isBought = artifactData.instanceId === NULL_ARTIFACT_ID
    const isPlayPhase = (state.phase === GamePhase.PLAY)
 
    const handleBuyArtifact = () => {
        if (isBought) {
            return; 
        }

        buyArtifact({instanceId: artifactData.instanceId});
    }

    return (
        <span className={isPlayPhase ? undefined : Styles.artifact_container_open}>
            <button 
                disabled={isPlayPhase} 
                onClick={handleBuyArtifact} 
                className={isBought ? Styles.artifact_bought : Styles.artifact}>
            </button>
        </span>
    );
}


export default Artifact