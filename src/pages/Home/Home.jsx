import Banner from "../Home/Banner/Banner";
import About from "../Home/About/About";
import Stats from "../Home/Stats/Stats";
import FeaturedLessons from "../Home/FeaturedLessons/FeaturedLessons"; // 👈 Import This
const Home = () => {
    return (
        <div className="bg-white"> {/* Ensure background is white/clean */}
            <Banner />
            <About />
            <Stats />
            {/* We will add "Featured Lessons" here later once we have data */}
            <FeaturedLessons />
        </div>
    );
};

export default Home;