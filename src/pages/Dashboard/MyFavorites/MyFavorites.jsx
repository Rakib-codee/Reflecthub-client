import { useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaBookmark, FaUser } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../contexts/AuthContext";
import { getStorageKeys, readIdSet } from "../../../utils/lessonReactions";

const MyFavorites = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { savedKey } = useMemo(() => getStorageKeys(user?.email), [user?.email]);

    const { data: lessons = [], isPending } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/lessons');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    const savedIds = useMemo(() => readIdSet(savedKey), [savedKey]);

    const savedLessons = useMemo(() => {
        if (!lessons.length) return [];
        return lessons.filter(l => savedIds.has(String(l?._id)));
    }, [lessons, savedIds]);

    if (isPending) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
                <h2 className="text-3xl font-bold text-primary">My Favorites</h2>
                <h2 className="text-xl font-bold">Total: {savedLessons.length}</h2>
            </div>

            {savedLessons.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                    <p>You have not saved any lessons yet.</p>
                    <Link to="/lessons" className="btn btn-primary text-white rounded-full px-8 mt-6">Explore Lessons</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedLessons.map((lesson) => (
                        <div key={lesson._id} className="card bg-base-100 shadow-lg border border-gray-100">
                            <figure className="h-44 overflow-hidden bg-gray-100">
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
                                    <span className="badge badge-ghost text-xs flex items-center gap-1">
                                        <FaBookmark size={10} /> Saved
                                    </span>
                                </div>

                                <h3 className="card-title text-xl font-bold text-gray-700 mt-2">
                                    {String(lesson.title || '').length > 42 ? `${String(lesson.title).slice(0, 42)}...` : (lesson.title || 'Untitled')}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {String(lesson.description || '').length > 90 ? `${String(lesson.description).slice(0, 90)}...` : (lesson.description || '')}
                                </p>

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
        </div>
    );
};

export default MyFavorites;
