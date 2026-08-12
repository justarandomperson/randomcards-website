import { useState } from 'react'
import Styles from './Artifact.module.css'


function Artifact ({ name, effect, cost }) {
    const [isBought, setIsBought] = useState(false); // wouldnt be sold at first

    function buyArtifact() {
        setIsBought(true);
    }

    return (
        <button onClick={buyArtifact} className={isBought ? Styles.artifact_bought : Styles.artifact}></button>
    );
}


export default Artifact