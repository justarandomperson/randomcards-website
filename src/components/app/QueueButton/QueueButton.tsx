import { useDeckContext } from "../../../contexts/DeckContext/DeckContext";
import { useGameContext } from "../../../contexts/GameContext/GameContext"
import styles from "./QueueButton.module.css"


const QueueButton: React.FC = () => {
    const { queue } = useGameContext();
    const { deck } = useDeckContext().state

    return (
        <div className={styles.QueueButtonContainer}>
            <button onClick={() => queue(deck)}>Queue</button>
        </div>
    )
}


export default QueueButton