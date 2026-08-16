import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext";

const ProtectedRoute = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/signup" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;