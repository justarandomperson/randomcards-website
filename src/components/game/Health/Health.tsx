import classNames from "classnames";
import styles from './Health.module.css'
import { useGameContext } from "../../../contexts/GameContext/GameContext";
import { SelectTargetFilter, TargetType } from "../../../contexts/GameContext/shared/types";
import { STARTING_HEALTH } from "../../../contexts/GameContext/shared/constants";


const isPlayerSelectable = (
    hasSelected: boolean, isOpponent: boolean, targetFilter: SelectTargetFilter | undefined
) : boolean => {
    const targetType = isOpponent ? TargetType.OPPONENT : TargetType.SELF;
    const filter = targetFilter?.has(targetType) ?? false;

    const isSelectable = (hasSelected && isOpponent) || filter;
    return isSelectable;
}


type Props = {
    health: number,
    isOpponent: boolean,
    id: string
}


const Health: React.FC<Props> = ({ health, isOpponent, id }) => {
    const { state, selectedInstanceId, setSelectedInstanceId, emitters } = useGameContext();

    const isSelectable = isPlayerSelectable(selectedInstanceId != undefined, isOpponent, state.targetFilter);


    const onSelectedHandler = () => {
        if (state.targetFilter && isSelectable) {
            emitters.selectTarget({ id: id, isPlayer: true });
        }

        else if (selectedInstanceId) {
            //? should check if unit is selected or smth
            emitters.attackPlayer({ attackerId: selectedInstanceId, isOpponent: isOpponent });
            setSelectedInstanceId(undefined);
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