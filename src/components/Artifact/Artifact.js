import { useState } from 'react'
import './Artifact.css'


function Artifact ({ name, effect }) {
    const [isBought, setIsBought] = useState(false); // wouldnt be sold at first

    function buyArtifact() {
        setIsBought(true);
    }

    return (
        <button onClick={buyArtifact} className={isBought ? "artifact-bought" : "artifact"}></button>
    );
}


export default Artifact