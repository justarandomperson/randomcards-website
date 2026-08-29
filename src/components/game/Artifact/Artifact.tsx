import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { useGameLogic } from '../../../contexts/GameContext/GameLogic';
import { ShopActionType } from '../../../contexts/GameContext/Shop'
import { PlayersActionType, PlayersActionTarget } from '../../../contexts/GameContext/Players'
import { ArtifactData } from "../../../types/artifact";
import Styles from './Artifact.module.css'


type Props = {
    artifactData: ArtifactData
    index: number
}


const Artifact: React.FC<Props> = ({ artifactData, index }) => {
    const { playersContext, shopContext } = useGameContext();
    const isBought = artifactData.id === 0;
    const { buyArtifact } = useGameLogic();
 
    const handleBuyArtifact = () => {
        if (isBought) {
            return; 
        }

        const buyer = PlayersActionTarget.PLAYER; // TODO: not always player, could be opponent too

        buyArtifact(buyer, artifactData, index);
    }

    return (
        <button onClick={handleBuyArtifact} className={isBought ? Styles.artifact_bought : Styles.artifact}></button>
    );
}


export default Artifact