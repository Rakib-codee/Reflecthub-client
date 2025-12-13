import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaHome, FaList, FaPlus, FaUser, FaUsers } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    // TODO: Later we will fetch from DB to see if user is Admin
    const isAdmin = false; 

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            {/* Page Content */}
            <div className="drawer-content flex flex-col items-center justify-start p-10 bg-gray-50 min-h-screen">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">Open Menu</label>
                <Outlet></Outlet>
            </div> 
            
            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-64 min-h-full bg-white text-base-content border-r border-gray-200">
                    
                    {/* Sidebar Header */}
                    <div className="mb-6 px-4">
                        <h2 className="text-2xl font-bold text-primary">Digital Life</h2>
                        <p className="text-xs text-gray-500">Dashboard Panel</p>
                    </div>

                    {/* User Links */}
                    {!isAdmin && <>
                        <li><NavLink to="/dashboard/home"><FaHome /> User Home</NavLink></li>
                        <li><NavLink to="/dashboard/add-lesson"><FaPlus /> Add Lesson</NavLink></li>
                        <li><NavLink to="/dashboard/my-lessons"><FaList /> My Lessons</NavLink></li>
                        <li><NavLink to="/dashboard/my-favorites"><FaBook /> My Favorites</NavLink></li>
                        <li><NavLink to="/dashboard/profile"><FaUser /> Profile</NavLink></li>
                    </>}

                    {/* Admin Links (We will enable these later) */}
                    {isAdmin && <>
                        <li><NavLink to="/dashboard/admin"><FaHome /> Admin Home</NavLink></li>
                        <li><NavLink to="/dashboard/users"><FaUsers /> Manage Users</NavLink></li>
                    </>}

                    <div className="divider"></div> 
                    
                    {/* Shared Links */}
                    <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li><NavLink to="/lessons"><FaBook /> Public Lessons</NavLink></li>
                </ul>
            
            </div>
        </div>
    );
};

export default Dashboard;