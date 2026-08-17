import { Outlet, useLocation } from "react-router-dom"
import Topbar from "../Topbar/Topbar"
import styles from "./AppLayout.module.css"


const GAMEPAGE_PATH = "/game";


const AppLayout: React.FC = ({ }) => {
    const currentPage = useLocation()

    return (
        <div className={styles.AppLayoutContainer}>
            { currentPage.pathname !== GAMEPAGE_PATH && <Topbar/> }
            <Outlet/>
        </div>
    )
}


export default AppLayout