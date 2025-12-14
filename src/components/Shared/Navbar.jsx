import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/lessons">Lessons</NavLink></li>
        {/* Only show these if user is logged in */}
        {user && <li><NavLink to="/dashboard/my-lessons">My Lessons</NavLink></li>} 
        <li><NavLink to="/community">Community</NavLink></li>
        <li><NavLink to="/payment">Membership</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm fixed z-10 bg-opacity-90 container max-w-screen-2xl mx-auto px-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl text-primary font-bold gap-2">
                    {/* You can replace this SVG with an <img> tag for your logo */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 bg-primary text-white p-1 rounded-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    Digital Life Lessons
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
                            <div className="w-10 rounded-full">
                                <img alt="User" src={user?.photoURL || "https://i.ibb.co/de/avatar.png"} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    {user?.displayName || 'User'}
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogOut}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost text-primary">Sign In</Link>
                        <Link to="/register" className="btn btn-primary text-white rounded-full px-6">Get Started</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;