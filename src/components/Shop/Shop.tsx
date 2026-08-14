import Artifact from '../Artifact/Artifact.js'
import Styles from './Shop.module.css'


function Shop({ artifacts }) {
    return (
        <div className={Styles.shop}>
            {artifacts.map((artifact) => (
                <div className={Styles.shop_item} key={artifact.id}>
                    <Artifact {...artifact} />
                    <p className={Styles.artifact_cost}>{`${artifact.cost}$`}</p>
                </div>
            ))}
        </div>
    );
}


export default Shop