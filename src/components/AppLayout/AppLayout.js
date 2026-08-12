import { Outlet } from "react-router-dom"
import Topbar from "../Topbar/Topbar"
import styles from "./AppLayout.module.css"

export default function AppLayout()
{
    return (
        <div className={styles.AppLayoutContainer}>
            <Topbar/>
            <Outlet/>
        </div>
    )
}