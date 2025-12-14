import Banner from "../Home/Banner/Banner";
import About from "../Home/About/About";
import Stats from "../Home/Stats/Stats";
import HowItWorks from "./HowItWorks/HowItWorks";
import Testimonials from "./Testimonials/Testimonials";
import CTASection from "./CTASection/CTASection";
import WhyLifeMatters from "./WhyLifeMatters/WhyLifeMatters";
import TopContributors from "./TopContributors/TopContributors";
import MostSavedLessons from "./MostSavedLessons/MostSavedLessons";
const Home = () => {
    return (
        <div className="bg-white"> {/* Ensure background is white/clean */}
            <Banner />
            <About />
             <HowItWorks></HowItWorks>
             <WhyLifeMatters />
            <Stats />
             <TopContributors />
             <MostSavedLessons />
            <Testimonials></Testimonials>
            <CTASection></CTASection>
            
           
        </div>
    );
};

export default Home;