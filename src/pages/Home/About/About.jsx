import { FaPen, FaFolderOpen, FaShareAlt, FaCompass, FaHeart, FaUsers } from "react-icons/fa";

const About = () => {
    
    // Data Array for Clean Code
    const features = [
        {
            id: 1,
            title: "Create Lessons",
            description: "Document your insights, experiences, and wisdom with our intuitive lesson creator. Add categories, tags, and rich content.",
            icon: <FaPen />,
            bg: "bg-[#F9F5FF]", // Light Purple
            iconBg: "bg-[#7C3AED]", // Purple
            iconColor: "text-white"
        },
        {
            id: 2,
            title: "Organize & Track",
            description: "Keep your lessons organized in collections. Mark favorites and track your learning progress with detailed analytics.",
            icon: <FaFolderOpen />,
            bg: "bg-[#F0F9FF]", // Light Blue
            iconBg: "bg-[#0284C7]", // Blue
            iconColor: "text-white"
        },
        {
            id: 3,
            title: "Share Wisdom",
            description: "Make your lessons public to inspire others. Build your profile as a thought leader and help others grow.",
            icon: <FaShareAlt />,
            bg: "bg-[#F0FDF4]", // Light Green
            iconBg: "bg-[#16A34A]", // Green
            iconColor: "text-white"
        },
        {
            id: 4,
            title: "Explore & Learn",
            description: "Browse thousands of public lessons from diverse perspectives. Filter by category, popularity, and relevance.",
            icon: <FaCompass />,
            bg: "bg-[#FFFBEB]", // Light Orange/Amber
            iconBg: "bg-[#D97706]", // Amber
            iconColor: "text-white"
        },
        {
            id: 5,
            title: "Favorites System",
            description: "Save and bookmark lessons that resonate with you. Build your personal library of wisdom for easy access.",
            icon: <FaHeart />,
            bg: "bg-[#FEF2F2]", // Light Pink/Rose
            iconBg: "bg-[#E11D48]", // Rose
            iconColor: "text-white"
        },
        {
            id: 6,
            title: "Community",
            description: "Connect with like-minded individuals. Comment, discuss, and grow together in a supportive environment.",
            icon: <FaUsers />,
            bg: "bg-[#EEF2FF]", // Light Indigo
            iconBg: "bg-[#4F46E5]", // Indigo
            iconColor: "text-white"
        }
    ];

    return (
        <div className="py-24 max-w-screen-2xl mx-auto px-6 font-sans">
            
            {/* Header Section */}
            <div className="text-center mb-16">
                <span className="inline-block bg-purple-100 text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                    Key Features
                </span>
                
                {/* Serif Font used for the Heading to match the image style */}
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-6 mb-4 font-serif">
                    Everything You Need to Grow
                </h2>
                
                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    Powerful tools to capture, organize, and share your life wisdom with a growing community
                </p>
            </div>

            {/* Grid Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {features.map((item) => (
                    <div 
                        key={item.id} 
                        className={`${item.bg} p-10 rounded-[32px] hover:-translate-y-2 transition duration-300`}
                    >
                        {/* Icon Box */}
                        <div className={`${item.iconBg} ${item.iconColor} w-14 h-14 flex items-center justify-center rounded-2xl text-2xl mb-6 shadow-sm`}>
                            {item.icon}
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-[16px]">
                            {item.description}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default About;