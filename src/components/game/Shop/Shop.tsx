import { useGameContext } from '../../../contexts/GameContext/GameContext'
import Artifact from '../Artifact/Artifact.js'
import Styles from './Shop.module.css'


const Shop: React.FC = () => {
    const shop = useGameContext().shopContext.shop;

    return (
        <div className={Styles.shop}>

            {shop.artifacts.map((artifact, index) => (

                <div className={Styles.shop_item} key={index}>
                    <Artifact artifactData={artifact} index={index} />
                    <p className={Styles.artifact_cost}>{`${artifact.cost}$`}</p>
                </div>
                
            ))}

        </div>
    );
}


export default Shop