import { Statuses } from '../Card/shared/types';
import Status from '../Status/Status';
import styles from './StatusesContainer.module.css'

type Props = {
    statuses: Statuses
}

const StatusesContainer: React.FC<Props> = ({statuses}) => {
    return <div className={styles.statuses_container}>
            {Object.entries(statuses).map(([key, value]) => value ? 
                <Status status={key}  {...(typeof value === "number" ? { amount: value } : {})}/> 
                : null)
            }
    </div>
}


export default StatusesContainer