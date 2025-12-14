import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaCrown, FaUserCircle } from "react-icons/fa";

const TopContributors = () => {
    const axiosPublic = useAxiosPublic();

    const { data: lessons = [], isPending } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/lessons');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyLessons = lessons.filter(l => {
        const isPublic = (l?.privacy || '').toLowerCase() === 'public';
        if (!isPublic) return false;
        const dt = l?.createdAt ? new Date(l.createdAt) : null;
        if (!dt || Number.isNaN(dt.getTime())) return false;
        return dt >= weekAgo;
    });

    const contributorMap = weeklyLessons.reduce((acc, l) => {
        const email = l?.author?.email || l?.email || l?.userEmail;
        if (!email) return acc;
        const name = l?.author?.name || l?.author?.displayName || email;
        const photo = l?.author?.photo || l?.author?.photoURL;
        if (!acc[email]) acc[email] = { email, name, photo, count: 0 };
        acc[email].count += 1;
        return acc;
    }, {});

    const top = Object.values(contributorMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);

    return (
        <div className="py-24 bg-gradient-to-b from-white to-[#FFF5FA] font-sans">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="text-center mb-14">
                    <span className="inline-block bg-[#EDE9FE] text-[#7C3AED] px-6 py-2 rounded-full text-sm font-bold tracking-wide mb-6">
                        Community Spotlight
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 font-serif">
                        Top Contributors of the Week
                    </h2>
                    <p className="text-gray-500 text-lg">Celebrating the members who shared the most lessons this week.</p>
                </div>

                {isPending ? (
                    <div className="text-center mt-10"><span className="loading loading-bars loading-lg text-primary"></span></div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {top.map((c, idx) => (
                            <div key={c.email} className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        {c.photo ? (
                                            <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-purple-100 text-primary flex items-center justify-center text-xl">
                                                <FaUserCircle />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-bold text-gray-900">{c.name}</p>
                                            <p className="text-xs text-gray-400">{c.email}</p>
                                        </div>
                                    </div>

                                    {idx === 0 && (
                                        <div className="badge badge-warning text-white gap-1">
                                            <FaCrown size={12} /> #1
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <p className="text-gray-600">Lessons shared</p>
                                    <p className="text-3xl font-bold text-primary mt-1">{c.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isPending && top.length === 0 && (
                    <p className="text-center text-gray-400 mt-10">No contributor activity yet this week.</p>
                )}
            </div>
        </div>
    );
};

export default TopContributors;
