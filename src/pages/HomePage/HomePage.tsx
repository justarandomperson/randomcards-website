import QueueButton from "../../components/app/QueueButton/QueueButton"
import styles from "./HomePage.module.css"


const HomePage: React.FC = () => {
    return (
        <div className={styles.HomePageContainer}>
            <QueueButton/>
        </div>
    );
}


export default HomePage