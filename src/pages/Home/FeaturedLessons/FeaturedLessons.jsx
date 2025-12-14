import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const FeaturedLessons = () => {
    const axiosPublic = useAxiosPublic();

    const { data: lessons = [], isPending } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/lessons');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    const publicLessons = lessons.filter(l => (l?.privacy || '').toLowerCase() === 'public');

    const featuredLessons = publicLessons.filter(l => Boolean(l?.featured)).slice(0, 6);
    const latestLessons = publicLessons.slice(0, 6);
    const displayLessons = featuredLessons.length > 0 ? featuredLessons : latestLessons;
    const isShowingFeatured = featuredLessons.length > 0;

    return (
        <div className="py-20 max-w-screen-2xl mx-auto px-4">
            <div className="text-center mb-12">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Community Wisdom</span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2">{isShowingFeatured ? 'Featured Life Lessons' : 'Latest Life Lessons'}</h2>
                <p className="text-gray-500 mt-2">{isShowingFeatured ? 'Handpicked lessons curated by our admins.' : 'Discover the most recent insights shared by our community.'}</p>
            </div>

            {isPending ? (
                <div className="text-center mt-10"><span className="loading loading-bars loading-lg text-primary"></span></div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayLessons.map(lesson => (
                    <div key={lesson._id} className="card bg-base-100 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        
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
                                {String(lesson.title || '').length > 40 ? `${String(lesson.title).slice(0, 40)}...` : (lesson.title || 'Untitled')}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                {String(lesson.description || '').length > 80 ? `${String(lesson.description).slice(0, 80)}...` : (lesson.description || '')}
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
            )}

            {!isPending && displayLessons.length === 0 && (
                <p className="text-center text-gray-400 mt-10">No lessons found.</p>
            )}

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