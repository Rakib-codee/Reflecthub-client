import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-primary mb-6">Profile</h2>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/2M7rtLk/default-avatar.png"}
                            alt="User avatar"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-gray-700"><span className="font-semibold">Name:</span> {user?.displayName || "Anonymous"}</p>
                    <p className="text-gray-700"><span className="font-semibold">Email:</span> {user?.email || "Not available"}</p>
                    <p className="text-gray-500 text-sm">Your premium access status is managed after successful payment.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
