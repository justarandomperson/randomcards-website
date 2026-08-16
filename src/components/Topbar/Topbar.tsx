import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import styles from "./Topbar.module.css";

const Topbar: React.FC = () => {
    const { user, logout } = useAuth();


    return (
        <div className={styles.Topbar}>
            <nav className={styles.nav}>

                {user && (
               <> 
                    <NavLink to="/">home</NavLink>
                    <NavLink to="/gacha">
                        gacha
                    </NavLink>
                    <button onClick={logout}>logout</button>
                    </>
                )}

                {!user && (
                    <>
                    <NavLink to="/signup">
                        signup
                    </NavLink>
                       <NavLink to="/login">
                        login
                    </NavLink>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Topbar;