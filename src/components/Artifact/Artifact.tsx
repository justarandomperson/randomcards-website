import { useState } from 'react'
import { useGameContext } from '../../contexts/GameContext/GameContext'
import { ArtifactData, ShopActionType } from '../../contexts/GameContext/Shop'
import { PlayersActionType, PlayersActionTarget } from '../../contexts/GameContext/Players'
import Styles from './Artifact.module.css'


type Props = {
    artifactData: ArtifactData
    index: number
}


const Artifact: React.FC<Props> = ({ artifactData, index }) => {
    const { playersContext, shopContext } = useGameContext();
    const isBought = artifactData.id === 0;

    function buyArtifact() {
        if (isBought) {
            return; 
        }

        const buyer = PlayersActionTarget.PLAYER; // TODO: not always player, could be opponent too
        const currentMoney = playersContext.players[buyer].money;

        if (currentMoney < artifactData.cost) {
            return;
        }

        shopContext.dispatch({
            type: ShopActionType.BUY_ARTIFACT,
            index: index,
            money_amount: currentMoney
        });

        playersContext.dispatch({
            type: PlayersActionType.REMOVE_MONEY,
            target: buyer,
            amount: artifactData.cost
        });

        playersContext.dispatch({
            type: PlayersActionType.ADD_ARTIFACT,
            target: buyer,
            artifact: artifactData
        })
    }

    return (
        <button onClick={buyArtifact} className={isBought ? Styles.artifact_bought : Styles.artifact}></button>
    );
}


export default Artifact