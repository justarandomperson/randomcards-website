import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { useImagesContext } from '../../../contexts/ImagesContext/ImagesContext';
import { MAX_ARTIFACTS_BOUGHT_PER_TURN, MAX_CARDS_PER_BOARD_ROW } from '../../../shared/constants/game';
import { ArtifactData, GamePhase } from "../../../shared/types/game";
import Styles from './Artifact.module.css'


type Props = {
    artifactData: ArtifactData | null
}


const Artifact: React.FC<Props> = ({ artifactData }) => {
    const { emitters, state } = useGameContext();
    const { buyArtifact } = emitters;
    const { state: imagesState } = useImagesContext();
    const isPlayPhase = (state.phase === GamePhase.PLAY);
 
    const handleBuyArtifact = () => {
        if (!artifactData) {
            return; 
        }

        const payload = { instanceId: artifactData.instanceId };
        buyArtifact(payload);
    }

    return (
        <span className={isPlayPhase ? undefined : Styles.artifact_container_open}>
            <button 
                disabled={isPlayPhase || !state.isPlayerTurn || 
                    state.players.player.data.artifactsBoughtThisTurn >= MAX_ARTIFACTS_BOUGHT_PER_TURN} 
                onClick={handleBuyArtifact} 
                className={!artifactData ? Styles.artifact_bought : Styles.artifact}>
                    { artifactData &&
                        <img src={`data:image/png;base64,${imagesState.get(artifactData.id)}`} alt="placeholder"/>
                    }
            </button>
        </span>
    );
}


export default Artifact