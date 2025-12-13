import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="text-center">
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
                
                {/* Slide 1 */}
                <div className="relative h-[600px]">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" className="h-full object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#7C3AED] to-transparent opacity-80 flex items-center pl-20">
                        <div className="text-left text-white max-w-2xl space-y-5">
                            <h2 className="text-6xl font-bold">Capture & Share Your Life Wisdom</h2>
                            <p className="text-xl">A platform to create, organize, and share meaningful life lessons. Track your personal growth journey.</p>
                            <Link to="/register" className="btn bg-white text-primary border-none rounded-full px-8 text-lg hover:bg-gray-200">Start Your Journey</Link>
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative h-[600px]">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" className="h-full object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#7C3AED] to-transparent opacity-80 flex items-center pl-20">
                        <div className="text-left text-white max-w-2xl space-y-5">
                            <h2 className="text-6xl font-bold">Learn from the Community</h2>
                            <p className="text-xl">Discover insights from people around the world. Filter by category, emotion, and popularity.</p>
                            <Link to="/lessons" className="btn btn-outline border-white text-white rounded-full px-8 text-lg hover:bg-white hover:text-primary">Explore Lessons</Link>
                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="relative h-[600px]">
                    <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" className="h-full object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#7C3AED] to-transparent opacity-80 flex items-center pl-20">
                        <div className="text-left text-white max-w-2xl space-y-5">
                            <h2 className="text-6xl font-bold">Organize Your Thoughts</h2>
                            <p className="text-xl">Keep your lessons organized in collections. Mark favorites and track your learning progress.</p>
                            <Link to="/register" className="btn bg-white text-primary border-none rounded-full px-8 text-lg hover:bg-gray-200">Join Now</Link>
                        </div>
                    </div>
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;