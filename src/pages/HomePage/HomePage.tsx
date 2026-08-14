import QueueButton from "../../components/QueueButton/QueueButton"
import styles from "./HomePage.module.css"
import { useNavigate } from "react-router-dom"

export default function HomePage()
{
    const navigate = useNavigate()

    const queueUp = () => {
        navigate("/game")
    }

    return (
        <div className={styles.HomePageContainer}>
            <QueueButton queueUp={queueUp}/>
        </div>
    )
}