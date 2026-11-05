import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { SIGNUPPAGE_PATH } from "../Topbar/shared/pagePaths";


const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to={SIGNUPPAGE_PATH} replace />;
    }

    return <Outlet />;
};


export default ProtectedRoute;