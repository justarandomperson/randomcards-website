import { NavLink } from 'react-router-dom'
import styles from './Topbar.module.css'

 
const Topbar: React.FC = ({ }) => {
    return (
        <div className={styles.Topbar}>
            <nav className={styles.nav}>
                <NavLink to={"/"}>home</NavLink>
                <NavLink to={"/gacha"}>gacha</NavLink>
            </nav>
        </div>
    )
}


export default Topbar