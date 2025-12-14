import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { FaBookmark, FaHeart, FaUser } from "react-icons/fa";
import { getCountKeys, getLessonCount } from "../../../utils/lessonReactions";

const MostSavedLessons = () => {
    const axiosPublic = useAxiosPublic();
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const handler = () => setTick((t) => t + 1);
        window.addEventListener('reflecthub:reactions-changed', handler);
        return () => window.removeEventListener('reflecthub:reactions-changed', handler);
    }, []);

    const { likeCountKey, saveCountKey } = useMemo(() => getCountKeys(), []);

    const { data: lessons = [], isPending } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/lessons');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    const getSavedScore = (lesson) => {
        const fromCounts =
            lesson?.savedCount ??
            lesson?.savesCount ??
            lesson?.bookmarksCount ??
            lesson?.favoriteCount ??
            lesson?.favouritesCount;

        if (typeof fromCounts === 'number') return fromCounts;

        const fromArrays =
            (Array.isArray(lesson?.savedBy) ? lesson.savedBy.length : undefined) ??
            (Array.isArray(lesson?.bookmarks) ? lesson.bookmarks.length : undefined) ??
            (Array.isArray(lesson?.favorites) ? lesson.favorites.length : undefined);

        if (typeof fromArrays === 'number') return fromArrays;

        const likeCount =
            (typeof lesson?.likesCount === 'number' ? lesson.likesCount : undefined) ??
            (Array.isArray(lesson?.likes) ? lesson.likes.length : 0);

        return typeof likeCount === 'number' ? likeCount : 0;
    };

    const publicLessons = lessons.filter(l => (l?.privacy || '').toLowerCase() === 'public');

    const topSaved = useMemo(() => {
        return publicLessons
            .map(l => ({
                ...l,
                _localSave: l?._id ? getLessonCount(saveCountKey, l._id) : 0,
                _localLike: l?._id ? getLessonCount(likeCountKey, l._id) : 0,
                _savedScore: getSavedScore(l) + (l?._id ? getLessonCount(saveCountKey, l._id) : 0) + (tick * 0)
            }))
            .sort((a, b) => (b._savedScore || 0) - (a._savedScore || 0))
            .slice(0, 6);
    }, [publicLessons, tick, likeCountKey, saveCountKey]);

    return (
        <div className="py-24 max-w-screen-2xl mx-auto px-6 font-sans">
            <div className="text-center mb-14">
                <span className="inline-block bg-purple-100 text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                    Community Favorites
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-6 mb-4 font-serif">
                    Most Saved Lessons
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    The lessons people keep coming back to.
                </p>
            </div>

            {isPending ? (
                <div className="text-center mt-10"><span className="loading loading-bars loading-lg text-primary"></span></div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topSaved.map(lesson => (
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
                                    <span className="badge badge-ghost text-xs flex items-center gap-1">
                                        <FaBookmark size={10} /> {lesson._savedScore || 0}
                                    </span>
                                </div>

                                <h3 className="card-title text-xl font-bold text-gray-700 mt-2">
                                    {String(lesson.title || '').length > 42 ? `${String(lesson.title).slice(0, 42)}...` : (lesson.title || 'Untitled')}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {String(lesson.description || '').length > 90 ? `${String(lesson.description).slice(0, 90)}...` : (lesson.description || '')}
                                </p>

                                <div className="flex items-center justify-between mt-5 text-xs text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <FaUser /> <span>{lesson.author?.name || "Anonymous"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaHeart size={10} />
                                        <span>{(Array.isArray(lesson?.likes) ? lesson.likes.length : (lesson?.likesCount || 0)) + (lesson._localLike || 0)}</span>
                                    </div>
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

            {!isPending && topSaved.length === 0 && (
                <p className="text-center text-gray-400 mt-10">No popular lessons found yet.</p>
            )}
        </div>
    );
};

export default MostSavedLessons;
