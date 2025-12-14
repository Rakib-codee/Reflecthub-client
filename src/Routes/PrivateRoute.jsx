import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/Shared/LoadingScreen";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingScreen title="Checking access" subtitle="Verifying your account and loading the dashboard..." />;
    }

    if (user) {
        return children;
    }
    
    // Redirect to login, but remember where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;