import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const FeaturedLessons = () => {
    const [lessons, setLessons] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/lessons')
            .then(res => {
                // আমরা শুধুমাত্র প্রথম ৬টি লেসন দেখাবো
                const latestLessons = res.data.slice(0, 6);
                setLessons(latestLessons);
            })
    }, [axiosPublic]);

    return (
        <div className="py-20 max-w-screen-2xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Community Wisdom</span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2">Latest Life Lessons</h2>
                <p className="text-gray-500 mt-2">Discover the most recent insights shared by our community.</p>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {lessons.map(lesson => (
                    <div key={lesson._id} className="card bg-base-100 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        
                        {/* Image */}
                        <figure className="h-48 overflow-hidden bg-gray-100">
                            {lesson.photoURL ? (
                                <img src={lesson.photoURL} alt={lesson.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full bg-purple-100 text-primary text-4xl">
                                    <FaUser />
                                </div>
                            )}
                        </figure>

                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <span className="badge badge-primary badge-outline text-xs">{lesson.category}</span>
                                {lesson.access === 'Premium' && <span className="badge badge-warning text-white text-xs">Premium</span>}
                            </div>
                            
                            <h2 className="card-title text-xl font-bold text-gray-700 mt-2">
                                {lesson.title.slice(0, 40)}...
                            </h2>
                            <p className="text-gray-500 text-sm">
                                {lesson.description.slice(0, 80)}...
                            </p>

                            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                                <FaUser /> <span>{lesson.author?.name || "Anonymous"}</span>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <Link to={`/lessons/${lesson._id}`} className="btn btn-sm btn-primary btn-outline rounded-full px-6">
                                    Read Full Story
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <Link to="/lessons" className="btn btn-primary text-white rounded-full px-8 text-lg shadow-lg">
                    View All Lessons
                </Link>
            </div>

        </div>
    );
};

export default FeaturedLessons;