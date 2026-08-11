import Artifact from '../Artifact/Artifact.js'
import './Shop.css'


function Shop ({ artifacts }) {
    return (
        <div className="shop">
            {artifacts.map((artifact) => (
                <Artifact key={artifact.id} {...artifact} />
            ))}
        </div>
    );
}


export default Shop