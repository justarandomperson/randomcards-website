import styles from "./QueueButton.module.css"

type Props = {
    queueUp: () => void;
}


const QueueButton: React.FC<Props> = ({ queueUp }) => {
    return (
        <div className={styles.QueueButtonContainer}>
            <button onClick={queueUp}>Queue</button>
        </div>
    )
}

export default QueueButton