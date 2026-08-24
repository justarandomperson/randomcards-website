import QueueButton from "../../components/app/QueueButton/QueueButton"
import styles from "./HomePage.module.css"
import { useNavigate } from "react-router-dom"


const HomePage: React.FC = ({ }) => {
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


export default HomePage