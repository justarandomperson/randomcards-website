import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";


const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/signup" replace />;
    }

    return <Outlet />;
};


export default ProtectedRoute;