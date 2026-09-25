import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { NULL_ARTIFACT_ID } from '../../../shared/constants/game';
import { ArtifactData, GamePhase } from "../../../shared/types/game";
import Styles from './Artifact.module.css'


type Props = {
    artifactData: ArtifactData | null
}


const Artifact: React.FC<Props> = ({ artifactData }) => {
    const { emitters, state } = useGameContext();
    const { buyArtifact } = emitters;
    const isPlayPhase = (state.phase === GamePhase.PLAY);
 
    const handleBuyArtifact = () => {
        if (!artifactData) {
            return; 
        }

        buyArtifact({instanceId: artifactData.instanceId});
    }

    return (
        <span className={isPlayPhase ? undefined : Styles.artifact_container_open}>
            <button 
                disabled={isPlayPhase || !state.isPlayerTurn} 
                onClick={handleBuyArtifact} 
                className={!artifactData ? Styles.artifact_bought : Styles.artifact}>
            </button>
        </span>
    );
}


export default Artifact