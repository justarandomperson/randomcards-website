import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { HOMEPAGE_PATH } from "../../../shared/constants/app";


const PublicRoute = () => {
    const { isLoggedIn } = useAuth();

    if ( isLoggedIn ) {
        return <Navigate to={HOMEPAGE_PATH} replace />;
    }

    return <Outlet />;
};


export default PublicRoute;