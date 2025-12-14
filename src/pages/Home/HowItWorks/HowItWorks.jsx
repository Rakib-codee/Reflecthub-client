const HowItWorks = () => {
    return (
        <div className="py-24 bg-gradient-to-b from-white to-[#FFF5FA] font-sans relative overflow-hidden">
            
            <div className="max-w-screen-xl mx-auto px-6 relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-20">
                    <span className="inline-block bg-[#EDE9FE] text-[#7C3AED] px-6 py-2 rounded-full text-sm font-bold tracking-wide mb-6">
                        How It Works
                    </span>
                    
                    {/* Serif Font matches the image */}
                    <h2 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-4 font-serif">
                        Start Your Journey in 3 Steps
                    </h2>
                    
                    <p className="text-gray-500 text-lg">
                        Simple, intuitive, and powerful
                    </p>
                </div>

                {/* Steps Container */}
                <div className="relative grid md:grid-cols-3 gap-10 text-center">
                    
                    {/* The Gradient Connecting Line (Hidden on Mobile) */}
                    <div className="hidden md:block absolute top-10 left-16 right-16 h-1 bg-gradient-to-r from-[#6D5AED] via-[#A855F7] to-[#D946EF] -z-10 opacity-50"></div>

                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-[#6D5AED] shadow-[0_10px_30px_rgba(109,90,237,0.4)] flex items-center justify-center text-white text-3xl font-bold mb-8 relative z-10">
                            1
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Sign Up & Setup</h3>
                        <p className="text-gray-600 leading-relaxed max-w-xs">
                            Create your account in seconds. Customize your profile and set your learning goals.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9F54D4] to-[#C2489F] shadow-[0_10px_30px_rgba(192,75,160,0.4)] flex items-center justify-center text-white text-3xl font-bold mb-8 relative z-10">
                            2
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Create & Organize</h3>
                        <p className="text-gray-600 leading-relaxed max-w-xs">
                            Start documenting your life lessons. Organize them into meaningful collections and categories.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-[#D64374] shadow-[0_10px_30px_rgba(214,67,116,0.4)] flex items-center justify-center text-white text-3xl font-bold mb-8 relative z-10">
                            3
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Share & Grow</h3>
                        <p className="text-gray-600 leading-relaxed max-w-xs">
                            Share your wisdom with the community. Learn from others and track your personal growth journey.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HowItWorks;