import Banner from "../Home/Banner/Banner";
import About from "../Home/About/About";
import Stats from "../Home/Stats/Stats";
import FeaturedLessons from "../Home/FeaturedLessons/FeaturedLessons"; // 👈 Import This
import HowItWorks from "./HowItWorks/HowItWorks";
import Testimonials from "./Testimonials/Testimonials";
import CTASection from "./CTASection/CTASection";
const Home = () => {
    return (
        <div className="bg-white"> {/* Ensure background is white/clean */}
            <Banner />
            <About />
             <HowItWorks></HowItWorks>
            <Stats />
            <Testimonials></Testimonials>
            <CTASection></CTASection>
            {/* We will add "Featured Lessons" here later once we have data */}
            <FeaturedLessons />
        </div>
    );
};

export default Home;