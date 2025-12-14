import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-20">
            <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-4">Digital Life Lessons</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        A community-driven platform to share wisdom, learn from others' experiences, and grow together.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/" className="hover:text-primary transition">Home</a></li>
                        <li><a href="/lessons" className="hover:text-primary transition">Lessons</a></li>
                        <li><a href="/login" className="hover:text-primary transition">Login</a></li>
                        <li><a href="/register" className="hover:text-primary transition">Register</a></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="text-2xl hover:text-blue-500"><FaFacebook /></a>
                        <a href="#" className="text-2xl hover:text-sky-400"><FaTwitter /></a>
                        <a href="#" className="text-2xl hover:text-blue-700"><FaLinkedin /></a>
                        <a href="#" className="text-2xl hover:text-pink-500"><FaInstagram /></a>
                    </div>
                </div>

            </div>
            
            <div className="text-center text-gray-600 text-sm mt-10 pt-6 border-t border-gray-800">
                &copy; 2024 Digital Life Lessons. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;