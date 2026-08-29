import { STARTING_HEALTH } from "../../../shared/constants/game";
import Styles from './Health.module.css'


type Props = {
    health: number
}


const Health: React.FC<Props> = ({ health }) => {
    const healthPercentage = health / STARTING_HEALTH;
    const healthCSS = healthPercentage <= 0.25 ? Styles.low : (healthPercentage >= 0.75 ? Styles.high: Styles.normal);

    return (
        <div className={`${Styles.health} ${healthCSS}`}>

            <meter min='0' max={STARTING_HEALTH} value={health} 
            low={STARTING_HEALTH/4} high={3*STARTING_HEALTH/4} optimum={STARTING_HEALTH}/>

            <p>{`${health}/${STARTING_HEALTH}`}</p>

        </div>
    );
}


export default Health