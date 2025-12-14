import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer"; // We will build footer later

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen pt-32 bg-gray-50">  
                <Outlet />
            </div>
            <Footer /> 
        </div>
    );
};

export default Main;