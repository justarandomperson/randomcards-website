import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import styles from "./Topbar.module.css";


const Topbar: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <div className={styles.Topbar}>
            <nav className={styles.nav}>

                {isLoggedIn && (
                    <> 
                        <NavLink to="/">home</NavLink>
                        <NavLink to="/decks">decks</NavLink>
                        <NavLink to="/gacha">gacha</NavLink>
                        <button onClick={logout}>logout</button>
                    </>
                )}

                {!isLoggedIn && (
                    <>
                        <NavLink to="/signup">signup</NavLink>
                        <NavLink to="/login">login</NavLink>
                    </>
                )}
            </nav>
        </div>
    );
};


export default Topbar;