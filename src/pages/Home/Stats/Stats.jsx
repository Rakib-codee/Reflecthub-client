const Stats = () => {
    
    const statsData = [
        {
            id: 1,
            number: "2,500+",
            label: "Active Users"
        },
        {
            id: 2,
            number: "15,000+",
            label: "Life Lessons"
        },
        {
            id: 3,
            number: "50+",
            label: "Categories"
        },
        {
            id: 4,
            number: "98%",
            label: "Satisfaction Rate"
        }
    ];

    return (
        // Background color matches the exact purple from your image (#7064E9)
        <div className="bg-[#7064E9] py-20">
            <div className="max-w-screen-xl mx-auto px-6">
                
                {/* Grid Layout: 2 cols on Mobile, 4 cols on Desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-white/10">
                    
                    {statsData.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center">
                            {/* Number Style: Bold, Big, Pure White */}
                            <h2 className="text-5xl md:text-6xl font-bold text-white mb-2 font-sans tracking-tight">
                                {stat.number}
                            </h2>
                            
                            {/* Label Style: Slightly transparent white, Medium weight */}
                            <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide">
                                {stat.label}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Stats;