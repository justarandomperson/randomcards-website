import { NavLink } from 'react-router-dom'
import styles from './Topbar.module.css'

export default function Topbar()
{
    return (
        <div className={styles.Topbar}>
            <nav className={styles.nav}>
                <NavLink to={"/"}>home</NavLink>
                <NavLink to={"/gacha"}>gacha</NavLink>
            </nav>
        </div>
    )
}