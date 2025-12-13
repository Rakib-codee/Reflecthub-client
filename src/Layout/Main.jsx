import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer"; // We will build footer later

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen pt-20"> {/* pt-20 to avoid navbar overlap */}
                <Outlet />
            </div>
            <Footer /> 
        </div>
    );
};

export default Main;