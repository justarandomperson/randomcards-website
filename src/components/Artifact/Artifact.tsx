import { useState } from 'react'
import Styles from './Artifact.module.css'


export type ArtifactData = {
    id: number;
    name: string;
    effect: string;
    cost: number;
}


type Props = {
    artifactData: ArtifactData;
}


const Artifact: React.FC<Props> = ({ artifactData }) => {
    const [isBought, setIsBought] = useState(false); // wouldnt be sold at first

    function buyArtifact() {
        setIsBought(true);
    }

    return (
        <button onClick={buyArtifact} className={isBought ? Styles.artifact_bought : Styles.artifact}></button>
    );
}


export default Artifact