import { useContext } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaCalendarAlt, FaUserCircle, FaHeart, FaBookmark, FaLock, FaCrown } from "react-icons/fa";
import usePremium from "../../hooks/usePremium"; 
import useAdmin from "../../hooks/useAdmin"; // 👈 IMPORT ADMIN HOOK
import { AuthContext } from "../../providers/AuthProvider"; 

const LessonDetails = () => {
    const lesson = useLoaderData(); 
    const { user } = useContext(AuthContext); 
    const [isPremium, isPremiumLoading] = usePremium(); 
    
    // 👇 GET ADMIN STATUS
    const [isAdmin, isAdminLoading] = useAdmin(); 

    const { title, description, author, category, tone, photoURL, createdAt, access } = lesson;

    if (isPremiumLoading || isAdminLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    // 🔒 LOCK LOGIC UPDATE
    // Lock IF: 
    // 1. Lesson is Premium
    // 2. AND User is NOT Premium
    // 3. AND User is NOT Admin (New Add) 👈
    // 4. AND User is NOT the Author 
    
    if (access === 'Premium' && !isPremium && !isAdmin && user?.email !== author?.email) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 mt-10">
                <div className="bg-gray-100 p-10 rounded-3xl border border-gray-200 shadow-sm max-w-2xl w-full">
                    <FaLock className="text-6xl text-gray-400 mb-6 mx-auto" />
                    <h2 className="text-4xl font-bold text-gray-800">Premium Content</h2>
                    <p className="text-lg text-gray-600 mt-4 mb-8">
                        This lesson is locked. <br/>
                        <span className="text-sm">Only Premium Members and the Author can view this.</span>
                    </p>
                    <Link to="/payment" className="btn btn-primary btn-lg text-white gap-2 rounded-full px-10 shadow-lg hover:shadow-xl transition-all">
                        <FaCrown className="text-yellow-300" /> Upgrade Now - ৳1500
                    </Link>
                </div>
            </div>
        );
    }

    // 🔓 STANDARD UI ...
    const date = new Date(createdAt).toLocaleDateString();

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Header Section */}
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center gap-2 mb-4">
                    <span className="badge badge-primary badge-outline">{category}</span>
                    <span className="badge badge-secondary badge-outline">{tone}</span>
                    {access === 'Premium' && <span className="badge badge-warning text-white gap-1"><FaCrown size={10}/> Premium</span>}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">{title}</h1>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <FaUserCircle /> <span>{author?.name || "Anonymous"}</span>
                    <span>•</span>
                    <FaCalendarAlt /> <span>{date}</span>
                </div>
            </div>

            {/* Featured Image */}
            {photoURL && (
                <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg bg-gray-100">
                    <img src={photoURL} alt={title} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Content Section */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-8">
                <p className="whitespace-pre-wrap">{description}</p>
            </div>

            {/* Interaction Buttons */}
            <div className="divider my-10"></div>
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <button className="btn btn-outline btn-error gap-2 rounded-full">
                        <FaHeart /> Like
                    </button>
                    <button className="btn btn-outline btn-primary gap-2 rounded-full">
                        <FaBookmark /> Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonDetails;