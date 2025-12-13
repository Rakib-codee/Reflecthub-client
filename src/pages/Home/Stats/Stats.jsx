const Stats = () => {
    return (
        <div className="bg-primary py-16 text-white mt-10">
            <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
                
                <div>
                    <h2 className="text-5xl font-bold">2,500+</h2>
                    <p className="text-lg mt-2 opacity-90">Active Users</p>
                </div>
                <div>
                    <h2 className="text-5xl font-bold">15,000+</h2>
                    <p className="text-lg mt-2 opacity-90">Life Lessons</p>
                </div>
                <div>
                    <h2 className="text-5xl font-bold">50+</h2>
                    <p className="text-lg mt-2 opacity-90">Categories</p>
                </div>
                <div>
                    <h2 className="text-5xl font-bold">98%</h2>
                    <p className="text-lg mt-2 opacity-90">Satisfaction Rate</p>
                </div>

            </div>
        </div>
    );
};

export default Stats;