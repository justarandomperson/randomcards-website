import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { GamePhase } from '../../../shared/types/game';
import Artifact from '../Artifact/Artifact.js'
import Styles from './Shop.module.css'


const Shop: React.FC = () => {
    const { shop, phase } = useGameContext().state;
    const isPlayPhase = (phase === GamePhase.PLAY)

    return (
        <div className={isPlayPhase ? Styles.shop_closed : Styles.shop_open}>

            {shop.map((artifact, index) => (
                <div className={Styles.shop_item} key={index}>
                    <Artifact artifactData={artifact}/>

                    {artifact && 
                        <span>
                            <p className={Styles.artifact_cost}>{`${artifact.cost}$`}</p>
                        </span>
                    }
                </div>  
            ))}

        </div>
    );
}


export default Shop