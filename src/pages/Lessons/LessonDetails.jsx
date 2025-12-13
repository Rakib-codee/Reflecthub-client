import { useLoaderData } from "react-router-dom";
import { FaCalendarAlt, FaUserCircle, FaHeart, FaBookmark } from "react-icons/fa";

const LessonDetails = () => {
    // We will use "loader" in the Router to fetch data before rendering
    const lesson = useLoaderData(); 
    
    const { title, description, author, category, tone, photoURL, createdAt } = lesson;

    // Format Date
    const date = new Date(createdAt).toLocaleDateString();

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            
            {/* Header Section */}
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center gap-2 mb-4">
                    <span className="badge badge-primary badge-outline">{category}</span>
                    <span className="badge badge-secondary badge-outline">{tone}</span>
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
                <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg">
                    <img src={photoURL} alt={title} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Content Section */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-8">
                <p className="whitespace-pre-wrap">{description}</p>
                {/* whitespace-pre-wrap preserves paragraphs/line breaks from the textarea */}
            </div>

            {/* Interaction Buttons (Placeholder for Phase 3) */}
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
                <div className="text-gray-400 italic text-sm">
                    Keep learning, keep growing.
                </div>
            </div>

        </div>
    );
};

export default LessonDetails;