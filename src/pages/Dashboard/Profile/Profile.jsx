import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import usePremium from "../../../hooks/usePremium";
import { FaCrown, FaShieldAlt, FaUser } from "react-icons/fa";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isPremium] = usePremium();

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Cover Banner (Decorative) */}
            <div className="h-32 bg-gradient-to-r from-primary to-purple-400"></div>

            <div className="px-8 pb-8">
                {/* Avatar & Badges */}
                <div className="relative -mt-16 mb-6">
                    <div className="avatar online">
                        <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || "https://i.ibb.co/de/avatar.png"} alt="Profile" />
                        </div>
                    </div>
                    
                    {/* Role Badges */}
                    <div className="absolute top-20 left-36 flex gap-2">
                        {isAdmin && <span className="badge badge-error text-white gap-1 p-3"><FaShieldAlt /> Admin</span>}
                        {isPremium && <span className="badge badge-warning text-white gap-1 p-3"><FaCrown /> Premium</span>}
                    </div>
                </div>

                {/* User Info */}
                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{user?.displayName}</h1>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>

                    <div className="divider"></div>

                    {/* Stats Section (Static for now) */}
                    <div className="stats shadow w-full">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <FaUser className="text-3xl" />
                            </div>
                            <div className="stat-title">Role</div>
                            <div className="stat-value text-primary text-2xl">
                                {isAdmin ? "Administrator" : "Learner"}
                            </div>
                            <div className="stat-desc">Current Access Level</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaCrown className="text-3xl" />
                            </div>
                            <div className="stat-title">Plan</div>
                            <div className="stat-value text-secondary text-2xl">
                                {isPremium ? "Premium" : "Free"}
                            </div>
                            <div className="stat-desc">{isPremium ? "Lifetime Access" : "Upgrade to unlock"}</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-6">
                        <button className="btn btn-outline btn-primary">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;