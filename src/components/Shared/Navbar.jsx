import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import usePremium from "../../hooks/usePremium";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isPremium, isPremiumLoading] = usePremium();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

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

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/lessons">Lessons</NavLink></li>
        <li><NavLink to="/community">Community</NavLink></li>
        {!isAdminLoading && !isAdmin && (
            <li>
                <button type="button" onClick={handleMembershipClick}>Membership</button>
            </li>
        )}
        {/* Only show 'My Lessons' for normal users */}
        {user && !isAdminLoading && !isAdmin && <li><NavLink to="/dashboard/my-lessons">My Lessons</NavLink></li>}
        {/* Admin quick links */}
        {user && !isAdminLoading && isAdmin && (
            <>
                <li><NavLink to="/dashboard/users">Manage Users</NavLink></li>
                <li><NavLink to="/dashboard/add-lesson">Add Lesson</NavLink></li>
            </>
        )}
    </>

    return (
        // 1. Outer Wrapper: Centers the navbar and makes it fixed
        <div className="fixed z-50 top-5 left-0 right-0 flex justify-center px-4">
            
            {/* 2. The Actual Navbar: Rounded, Glassmorphism, Floating Shadow */}
            <div className="navbar bg-white/80 backdrop-blur-md shadow-2xl rounded-full max-w-5xl w-full border border-white/40">
                
                <div className="navbar-start pl-4">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
                         {/* Logo Icon */}
                        <div className="bg-primary text-white p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                            </svg>
                        </div>
                        ReflectHub
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-medium text-gray-600">
                        {navOptions}
                    </ul>
                </div>

                <div className="navbar-end pr-2">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
                                <div className="w-10 rounded-full">
                                    <img alt="User" src={user?.photoURL || "https://i.ibb.co/de/avatar.png"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li className="px-4 py-2 font-bold text-primary text-center border-b mb-2">{user?.displayName}</li>
                                <li><Link to="/dashboard/profile">Profile</Link></li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button onClick={handleLogOut} className="text-red-500">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="btn btn-sm btn-ghost text-primary rounded-full">Sign In</Link>
                            <Link to="/register" className="btn btn-sm btn-primary text-white rounded-full px-4">Join</Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;