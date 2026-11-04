import { NavLink } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext/AuthContext"
import styles from "./Topbar.module.css"
import { DECKSPAGE_PATH, GACHAPAGE_PATH, HOMEPAGE_PATH, LOGINPAGE_PATH, SIGNUPPAGE_PATH } from "../../../shared/constants/app";


const Topbar: React.FC = () => {
    const { isLoggedIn, logout } = useAuth()

    return (
        <div className={styles.Topbar}>
            <nav className={styles.nav}>

                {isLoggedIn && (
                    <> 
                        <NavLink to={HOMEPAGE_PATH}>home</NavLink>
                        <NavLink to={DECKSPAGE_PATH}>decks</NavLink>
                        <NavLink to={GACHAPAGE_PATH}>gacha</NavLink>
                        <button onClick={logout}>logout</button>
                    </>
                )}

                {!isLoggedIn && (
                    <>
                        <NavLink to={SIGNUPPAGE_PATH}>signup</NavLink>
                        <NavLink to={LOGINPAGE_PATH}>login</NavLink>
                    </>
                )}
            </nav>
        </div>
    );
};


export default Topbar;