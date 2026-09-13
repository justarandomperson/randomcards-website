import { useDeckContext } from "../../../contexts/DeckContext/DeckContext"
import { useGameContext } from "../../../contexts/GameContext/GameContext"
import styles from "./QueueButton.module.css"


const QueueButton: React.FC = () => {
    const { emitters, isInQueue } = useGameContext()
    const { queue, dequeue } = emitters
    const { deck } = useDeckContext().state

    return (
        <div className={styles.queue}>
            <button onClick={() => (!isInQueue ? queue(deck) : dequeue())}>
                {!isInQueue ? "Queue" : "Dequeue"}
            </button>
        </div>
    )
}


export default QueueButton