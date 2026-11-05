import classNames from 'classnames';
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import { useImagesContext } from '../../../contexts/ImagesContext/ImagesContext';
import styles from './Artifact.module.css'
import { ArtifactData } from './shared/types';
import { GamePhase } from '../../../contexts/GameContext/shared/types';
import { MAX_ARTIFACTS_BOUGHT_PER_TURN } from '../../../contexts/GameContext/shared/constants';
import React from 'react';


type Props = {
    artifactData: ArtifactData
}


const Artifact: React.FC<Props> = ({ artifactData }) => {
    const { emitters, state } = useGameContext();
    const { buyArtifact } = emitters;
    const { state: imagesState } = useImagesContext();


    const isPlayPhase = (state.phase === GamePhase.PLAY);
 

    const handleBuyArtifact = () => {
        if (!artifactData) {
            return; 
        }

        const payload = { instanceId: artifactData.instanceId };
        buyArtifact(payload);
    }


    const artifactClass = classNames({
        [styles.artifact]: artifactData,
        [styles.artifact_bought]: !artifactData,
    })

    const desc = `${artifactData?.name} - ${artifactData?.effectDesc}`
    const descFontSize = `${Math.max(12, 18 - (artifactData?.effectDesc.length - 3) * 0.6)}px`

    return (
        <span className={isPlayPhase ? undefined : styles.artifact_container_open}>
            <button 
                disabled={
                    isPlayPhase || 
                    !state.isPlayerTurn ||
                    state.players.player.data.artifactsBoughtThisTurn >= MAX_ARTIFACTS_BOUGHT_PER_TURN
                } 
                onClick={handleBuyArtifact} 
                style={{ '--desc-font-size': descFontSize } as React.CSSProperties} //weird thing to make font size dynamic
                className={artifactClass}
                data-artifact-desc={desc}  
                data-artifact-desc-fontsize={descFontSize}
                >
                    { artifactData &&
                        <img src={`data:image/png;base64,${imagesState.get(artifactData.id)}`} alt="placeholder"/>
                    }
            </button>
        </span>
    );
}


export default Artifact