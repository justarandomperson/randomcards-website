import { useGameContext } from "../../../contexts/GameContext/GameContext"
import styles from "./QueueButton.module.css"


const QueueButton: React.FC = () => {
    const { queue } = useGameContext();

    return (
        <div className={styles.QueueButtonContainer}>
            <button onClick={queue}>Queue</button>
        </div>
    )
}


export default QueueButton