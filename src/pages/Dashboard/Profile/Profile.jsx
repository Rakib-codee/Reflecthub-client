import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useAdmin from "../../../hooks/useAdmin";
import usePremium from "../../../hooks/usePremium";
import { FaCrown, FaShieldAlt, FaUser, FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext); // Firebase function
    const [isAdmin] = useAdmin();
    const [isPremium] = usePremium();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    // Handle Update Profile
    const onSubmit = async (data) => {
        setLoading(true);
        const newName = data.name;
        const newPhoto = data.photoURL;

        try {
            // 1. Update in Firebase
            await updateUserProfile(newName, newPhoto);

            // 2. Update in MongoDB
            const res = await axiosPublic.patch(`/user-update/${user.email}`, {
                name: newName,
                photoURL: newPhoto
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                // Close Modal
                document.getElementById('edit_profile_modal').close();
                // Optional: Reload to reflect changes immediately
                window.location.reload(); 
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
            
            {/* Cover Banner */}
            <div className="h-32 bg-gradient-to-r from-primary to-purple-400"></div>

            <div className="px-8 pb-8">
                {/* Avatar & Badges */}
                <div className="relative -mt-16 mb-6">
                    <div className="avatar online">
                        <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/de/avatar.png"}
                                alt="Profile"
                                className="object-cover"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.currentTarget.src = "https://i.ibb.co/de/avatar.png";
                                }}
                            />
                        </div>
                    </div>
                    
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

                    {/* Stats Section */}
                    <div className="stats shadow w-full">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <FaUser className="text-3xl" />
                            </div>
                            <div className="stat-title">Role</div>
                            <div className="stat-value text-primary text-2xl">
                                {isAdmin ? "Administrator" : "Learner"}
                            </div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaCrown className="text-3xl" />
                            </div>
                            <div className="stat-title">Plan</div>
                            <div className="stat-value text-secondary text-2xl">
                                {isPremium ? "Premium" : "Free"}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-6">
                        {/* Open Modal Button */}
                        <button 
                            className="btn btn-outline btn-primary gap-2"
                            onClick={()=>document.getElementById('edit_profile_modal').showModal()}
                        >
                            <FaEdit /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* 👇 EDIT PROFILE MODAL (DaisyUI) */}
            <dialog id="edit_profile_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    
                    <h3 className="font-bold text-lg mb-4 text-primary">Edit Profile</h3>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input 
                                type="text" 
                                defaultValue={user?.displayName} 
                                {...register("name", { required: true })} 
                                className="input input-bordered w-full" 
                            />
                        </div>

                        {/* Photo URL Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Photo URL</span>
                            </label>
                            <input 
                                type="text" 
                                defaultValue={user?.photoURL} 
                                {...register("photoURL", { required: true })} 
                                className="input input-bordered w-full" 
                            />
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-primary text-white" disabled={loading}>
                                {loading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default Profile;