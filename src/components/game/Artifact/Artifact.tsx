import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { NULL_ARTIFACT_ID } from '../../../shared/constants/game';
import { ArtifactData } from "../../../shared/types/game";
import Styles from './Artifact.module.css'


type Props = {
    artifactData: ArtifactData
}


const Artifact: React.FC<Props> = ({ artifactData }) => {
    const { state, buyArtifact } = useGameContext();
    const isBought = artifactData.instanceId === NULL_ARTIFACT_ID;
 
    const handleBuyArtifact = () => {
        if (isBought) {
            return; 
        }

        buyArtifact({instanceId: artifactData.instanceId});
    }

    return (
        <button onClick={handleBuyArtifact} className={isBought ? Styles.artifact_bought : Styles.artifact}></button>
    );
}


export default Artifact