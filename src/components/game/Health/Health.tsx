import classNames from "classnames";
import { STARTING_HEALTH } from "../../../shared/constants/game";
import styles from './Health.module.css'
import { useGameContext } from "../../../contexts/GameContext/GameContext";
import { targetOption } from "../../../shared/types/game";


type Props = {
    health: number,
    isOpponent: boolean,
    id: string
}


const Health: React.FC<Props> = ({ health, isOpponent, id }) => {
    const healthPercentage = health / STARTING_HEALTH;
    const { state, selectedCard, emitters } = useGameContext()

    const type = isOpponent ? targetOption.OPPONENT : targetOption.SELF
    const selectableTarget = selectedCard && isOpponent || (state.selectingTarget ? state.selectingTarget.has(type) : false)

    const containerClassName = classNames({
        [styles.health]: true,
        [styles.low]: healthPercentage <= .25,
        [styles.normal]: healthPercentage > .25 && healthPercentage < .75,
        [styles.high]: healthPercentage >= .75,
    })

    const healthMeterClassName = classNames({
        [styles.selectable]: selectableTarget
    })

     const onSelectedHandler = () => {
        if (state.selectingTarget && selectableTarget)
        {
            emitters.selectTarget(id, true)
        }
        else if (selectedCard) //should check if unit is selected or smth
        {
            emitters.attackPlayer({attackerId:selectedCard, isOpponent: true})
        }
    }

    return (
        <div className={containerClassName}>

            <meter className={healthMeterClassName}  min='0' max={STARTING_HEALTH} value={health} 
            low={STARTING_HEALTH/4} high={3*STARTING_HEALTH/4} optimum={STARTING_HEALTH}/>

            <p>{`${health}/${STARTING_HEALTH}`}</p>

        </div>
    );
}


export default Health