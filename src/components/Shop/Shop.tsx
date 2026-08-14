import Artifact from '../Artifact/Artifact.js'
import { ArtifactData } from '../Artifact/Artifact.js'
import Styles from './Shop.module.css'


type Props = {
    artifacts: ArtifactData[]
}


const Shop: React.FC<Props> = ({ artifacts }) => {
    return (
        <div className={Styles.shop}>

            {artifacts.map((artifact) => (

                <div className={Styles.shop_item}>
                    <Artifact artifactData={artifact} />
                    <p className={Styles.artifact_cost}>{`${artifact.cost}$`}</p>
                </div>
                
            ))}

        </div>
    );
}


export default Shop