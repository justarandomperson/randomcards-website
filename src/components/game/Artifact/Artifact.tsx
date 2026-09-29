import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { NULL_ARTIFACT_ID } from '../../../shared/constants/game';
import { ArtifactData, GamePhase } from "../../../shared/types/game";
import Styles from './Artifact.module.css'


type Props = {
    artifactData: ArtifactData | null
    shopIndex: number
}


const Artifact: React.FC<Props> = ({ artifactData, shopIndex }) => {
    const { emitters, state } = useGameContext();
    const { buyArtifact } = emitters;
    const isPlayPhase = (state.phase === GamePhase.PLAY);
 
    const handleBuyArtifact = () => {
        if (!artifactData) {
            return; 
        }

        const payload = { instanceId: artifactData.instanceId };
        buyArtifact(payload, artifactData, shopIndex);
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