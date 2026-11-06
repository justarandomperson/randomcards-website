import classNames from 'classnames';
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { GamePhase } from '../../../contexts/GameContext/shared/types';
import Artifact from '../Artifact/Artifact.js'
import styles from './Shop.module.css'


const Shop: React.FC = () => {
    const { shop, phase } = useGameContext().state;


    const isPlayPhase = (phase === GamePhase.PLAY);

    const className = classNames({
        [styles.shop_open]: !isPlayPhase,
        [styles.shop_closed]: isPlayPhase,
        [styles.shop]: true
    })


    return (
        <div className={className}>

            {shop.map((artifact, index) => (
                <div className={styles.shop_item} key={index}>
                    <Artifact artifactData={artifact}/>

                    {artifact && 
                        <span>
                            <p className={styles.artifact_cost}>{`${artifact.cost}$`}</p>
                        </span>
                    }
                </div>  
            ))}

        </div>
    );
}


export default Shop