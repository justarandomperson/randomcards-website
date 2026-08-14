import { Outlet } from "react-router-dom"
import Topbar from "../Topbar/Topbar"
import styles from "./AppLayout.module.css"


const AppLayout: React.FC = ({ }) => {
    return (
        <div className={styles.AppLayoutContainer}>
            <Topbar/>
            <Outlet/>
        </div>
    )
}


export default AppLayout