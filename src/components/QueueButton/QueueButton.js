import styles from "./QueueButton.module.css"

export default function QueueButton({ queueUp })
{
    return (
        <div className={styles.QueueButtonContainer}>
            <button onClick={queueUp}>Queue</button>
        </div>
    )
}