import classNames from "classnames";
import styles from './Health.module.css'
import { useGameContext } from "../../../contexts/GameContext/GameContext";
import { ClientGameState, SelectTargetFilter, TargetType } from "../../../contexts/GameContext/shared/types";
import { STARTING_HEALTH } from "../../../contexts/GameContext/shared/constants";
import { getOpponentRow, TauntInRow } from "../../../contexts/GameContext/shared/helpers";


const isPlayerSelectable = (state: ClientGameState, isOpponent: boolean): boolean => {
    if (!isOpponent) return false
    // selecting for an effect
    if (state.targetFilter) {
        const targetType = (isOpponent) ? TargetType.OPPONENT : TargetType.SELF;
        if (!state.targetFilter.has(targetType)) {
            return false;
        }

        return true;
    }

    // selecting for attacking
    if (!state.attackerSelected) {
        return false;
    }

    if (!state.attackerSelected.canAttack) {
        return false;
    }

    const opponentRow = getOpponentRow(state.board);
    if (TauntInRow(opponentRow)) {
        return false;
    }

    return true;
}


type Props = {
    health: number,
    isOpponent: boolean,
    id: string
}


const Health: React.FC<Props> = ({ health, isOpponent, id }) => {
    const { state, emitters, setAttackerSelected } = useGameContext();

    
    const isSelectable = isPlayerSelectable(state, isOpponent);


    const onSelectedHandler = () => {
        if (!isSelectable) {
            return;
        }

        // for an effect
        if (state.targetFilter) {
            emitters.selectTarget({ id: id, isPlayer: true });
        }

        // for attacking
        else if (state.attackerSelected) {
            const instanceId = state.attackerSelected.instanceId;
            if (!instanceId) {
                throw new Error ("card has no instanceId"); // TODO: can refactor to helper function
            }

            emitters.attackPlayer({ attackerId: instanceId, isOpponent: isOpponent });
            setAttackerSelected(undefined)
        }
    }


    const healthPercentage = health / STARTING_HEALTH;
    const containerClassName = classNames({
        [styles.health]: true,
        [styles.low]: healthPercentage <= .25,
        [styles.normal]: healthPercentage > .25 && healthPercentage < .75,
        [styles.high]: healthPercentage >= .75,
    });

    const healthMeterClassName = classNames({
        [styles.selectable]: isSelectable
    });


    return (
        <div className={containerClassName} onClick={onSelectedHandler}>

            <meter className={healthMeterClassName}  min='0' max={STARTING_HEALTH} value={health} 
                low={STARTING_HEALTH/4} high={3*STARTING_HEALTH/4} optimum={STARTING_HEALTH}/>
            <p>{`${health}/${STARTING_HEALTH}`}</p>

        </div>
    );
}


export default Health