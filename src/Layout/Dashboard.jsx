import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBook, FaHome, FaList, FaPlus, FaUser, FaUsers, FaCrown, FaStar } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAdmin from "../hooks/useAdmin"; // Import the Admin Hook
import usePremium from "../hooks/usePremium";
import Swal from "sweetalert2";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    // 👇 GET REAL ADMIN STATUS FROM DB
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isPremium, isPremiumLoading] = usePremium();
    const navigate = useNavigate();

    const handleMembershipClick = () => {
        if (isPremiumLoading) return;

        if (user && isPremium) {
            Swal.fire({
                icon: "success",
                title: "You’re already Premium",
                text: "Thank you for supporting ReflectHub. Enjoy unlimited access!",
                confirmButtonColor: "#7c3aed",
            });
            return;
        }

        navigate("/payment");
    };

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
                        <h2 className="text-2xl font-bold text-primary">ReflectHub</h2>
                        <p className="text-xs text-gray-500">Dashboard Panel</p>
                    </div>

                    {/* 👇 CONDITIONAL MENU RENDERING */}

                    {isAdminLoading ? (
                        <li className="menu-title text-gray-400 mt-2">Loading...</li>
                    ) : isAdmin ? (
                        <>
                            {/* === ADMIN MENU === */}
                            <li className="menu-title text-gray-400 mt-2">Admin Area</li>
                            <li><NavLink to="/dashboard/admin"><FaHome /> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/users"><FaUsers /> Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/manage-lessons"><FaStar /> Manage Lessons</NavLink></li>
                            <li><NavLink to="/dashboard/my-lessons"><FaList /> My Lessons</NavLink></li>
                            <li><NavLink to="/dashboard/profile"><FaUser /> Admin Profile</NavLink></li>
                        </>
                    ) : (
                        <>
                            {/* === USER MENU === */}
                            <li className="menu-title text-gray-400 mt-2">User Area</li>
                            <li><NavLink to="/dashboard/home"><FaHome /> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/add-lesson"><FaPlus /> Add Lesson</NavLink></li>
                            <li><NavLink to="/dashboard/my-lessons"><FaList /> My Lessons</NavLink></li>
                            <li><NavLink to="/dashboard/my-favorites"><FaBook /> My Favorites</NavLink></li>
                            <li><NavLink to="/dashboard/profile"><FaUser /> Profile</NavLink></li>
                        </>
                    )}

                    <div className="divider"></div>

                    {/* === SHARED MENU === */}
                    <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li><NavLink to="/lessons"><FaBook /> Public Lessons</NavLink></li>
                    {!isAdmin && (
                        <li>
                            <button type="button" onClick={handleMembershipClick} className="flex items-center gap-2">
                                <FaCrown /> Membership
                            </button>
                        </li>
                    )}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;