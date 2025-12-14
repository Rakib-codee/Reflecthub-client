import { FaBookOpen, FaBrain, FaChartLine, FaUsers } from "react-icons/fa";

const WhyLifeMatters = () => {
    const benefits = [
        {
            id: 1,
            title: "Real-World Insight",
            description: "Lessons from lived experience help you make better decisions when the textbook answers fail.",
            icon: <FaBookOpen />,
            bg: "bg-[#F9F5FF]",
            iconBg: "bg-[#7C3AED]"
        },
        {
            id: 2,
            title: "Stronger Mindset",
            description: "Learning from wins and failures builds resilience, clarity, and confidence over time.",
            icon: <FaBrain />,
            bg: "bg-[#F0FDF4]",
            iconBg: "bg-[#16A34A]"
        },
        {
            id: 3,
            title: "Faster Growth",
            description: "You can borrow wisdom from others and avoid repeating the same mistakes.",
            icon: <FaChartLine />,
            bg: "bg-[#F0F9FF]",
            iconBg: "bg-[#0284C7]"
        },
        {
            id: 4,
            title: "Better Relationships",
            description: "Understanding diverse perspectives helps you communicate with empathy and purpose.",
            icon: <FaUsers />,
            bg: "bg-[#FFFBEB]",
            iconBg: "bg-[#D97706]"
        }
    ];

    return (
        <div className="py-24 max-w-screen-2xl mx-auto px-6 font-sans">
            <div className="text-center mb-16">
                <span className="inline-block bg-purple-100 text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                    Why It Matters
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-6 mb-4 font-serif">
                    Why Learning From Life Matters
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    Life teaches in moments. We help you capture those moments and turn them into wisdom.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((b) => (
                    <div key={b.id} className={`${b.bg} p-10 rounded-[32px] hover:-translate-y-2 transition duration-300`}>
                        <div className={`${b.iconBg} text-white w-14 h-14 flex items-center justify-center rounded-2xl text-2xl mb-6 shadow-sm`}>
                            {b.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{b.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-[16px]">{b.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyLifeMatters;
