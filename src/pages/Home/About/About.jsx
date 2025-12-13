import { FaPenFancy, FaFolderOpen, FaShareAlt, FaUsers } from "react-icons/fa";

const About = () => {
    return (
        <div className="py-20 px-4 max-w-screen-2xl mx-auto">
            <div className="text-center mb-12">
                <span className="bg-purple-100 text-primary px-4 py-1 rounded-full text-sm font-bold">Key Features</span>
                <h2 className="text-4xl font-bold text-gray-800 mt-4">Everything You Need to Grow</h2>
                <p className="text-gray-500 mt-2">Powerful tools to capture, organize, and share your life wisdom.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1 */}
                <div className="p-8 bg-purple-50 rounded-2xl hover:-translate-y-2 transition duration-300">
                    <div className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-xl text-2xl mb-4">
                        <FaPenFancy />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Create Lessons</h3>
                    <p className="text-gray-600 text-sm">Document your insights, experiences, and wisdom with our intuitive lesson creator.</p>
                </div>

                {/* Card 2 */}
                <div className="p-8 bg-blue-50 rounded-2xl hover:-translate-y-2 transition duration-300">
                    <div className="w-14 h-14 bg-blue-500 text-white flex items-center justify-center rounded-xl text-2xl mb-4">
                        <FaFolderOpen />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Organize & Track</h3>
                    <p className="text-gray-600 text-sm">Keep your lessons organized in collections. Mark favorites and track progress.</p>
                </div>

                {/* Card 3 */}
                <div className="p-8 bg-green-50 rounded-2xl hover:-translate-y-2 transition duration-300">
                    <div className="w-14 h-14 bg-green-500 text-white flex items-center justify-center rounded-xl text-2xl mb-4">
                        <FaShareAlt />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Share Wisdom</h3>
                    <p className="text-gray-600 text-sm">Make your lessons public to inspire others. Build your profile as a thought leader.</p>
                </div>

                {/* Card 4 */}
                <div className="p-8 bg-pink-50 rounded-2xl hover:-translate-y-2 transition duration-300">
                    <div className="w-14 h-14 bg-pink-500 text-white flex items-center justify-center rounded-xl text-2xl mb-4">
                        <FaUsers />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Community</h3>
                    <p className="text-gray-600 text-sm">Connect with like-minded individuals. Comment, discuss, and grow together.</p>
                </div>

            </div>
        </div>
    );
};

export default About;