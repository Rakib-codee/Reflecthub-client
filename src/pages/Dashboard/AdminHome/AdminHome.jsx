import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaBook, FaDollarSign, FaUsers, FaCrown } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';

const AdminHome = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch Stats
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/admin-stats');
            return res.data;
        }
    });

    const { data: users = [], isPending: usersLoading } = useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    const { data: lessons = [], isPending: lessonsLoading } = useQuery({
        queryKey: ['admin-lessons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/lessons');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    const todayKey = new Date().toDateString();

    const publicLessonsCount = lessons.filter(l => (l?.privacy || '').toLowerCase() === 'public').length;

    const isFlagged = (lesson) => {
        return Boolean(
            lesson?.flagged ||
            lesson?.isFlagged ||
            lesson?.reported ||
            lesson?.isReported ||
            (Array.isArray(lesson?.reports) && lesson.reports.length > 0) ||
            (Array.isArray(lesson?.flags) && lesson.flags.length > 0) ||
            (typeof lesson?.reportsCount === 'number' && lesson.reportsCount > 0) ||
            (typeof lesson?.flagsCount === 'number' && lesson.flagsCount > 0)
        );
    };

    const flaggedLessons = lessons.filter(isFlagged);
    const flaggedLessonsCount = flaggedLessons.length;

    const todaysNewLessonsCount = lessons.filter(l => {
        const dt = l?.createdAt ? new Date(l.createdAt) : null;
        if (!dt || Number.isNaN(dt.getTime())) return false;
        return dt.toDateString() === todayKey;
    }).length;

    const contributorMap = lessons.reduce((acc, l) => {
        const email = l?.author?.email || l?.email || l?.userEmail;
        if (!email) return acc;
        acc[email] = acc[email] || { email, name: l?.author?.name || l?.author?.displayName || email, count: 0 };
        acc[email].count += 1;
        return acc;
    }, {});

    const mostActiveContributors = Object.values(contributorMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const days = Array.from({ length: 7 }).map((_, idx) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - idx));
        d.setHours(0, 0, 0, 0);
        return d;
    });

    const growthData = days.map(d => {
        const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

        const lessonsCount = lessons.filter(l => {
            const dt = l?.createdAt ? new Date(l.createdAt) : null;
            if (!dt || Number.isNaN(dt.getTime())) return false;
            return dt.toDateString() === d.toDateString();
        }).length;

        const usersCount = users.filter(u => {
            const dt = u?.createdAt ? new Date(u.createdAt) : null;
            if (!dt || Number.isNaN(dt.getTime())) return false;
            return dt.toDateString() === d.toDateString();
        }).length;

        return { name: label, lessons: lessonsCount, users: usersCount };
    });

    // Data for Bar Chart
    const chartData = [
        { name: 'Users', count: stats.users || 0 },
        { name: 'Lessons', count: stats.lessons || 0 },
        { name: 'Premium', count: stats.premiumUsers || 0 },
    ];

    // Custom colors for the chart
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="w-full p-8">
            <h2 className="text-3xl font-bold mb-8">Hi, Welcome Back!</h2>

            {/* 1. Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaDollarSign className="text-4xl" />
                        </div>
                        <div className="stat-title">Total Revenue</div>
                        <div className="stat-value text-secondary">৳{stats.revenue}</div>
                        <div className="stat-desc">From Premium subscriptions</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value">{usersLoading ? '...' : users.length}</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaBook className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Lessons</div>
                        <div className="stat-value">{lessonsLoading ? '...' : lessons.length}</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaCrown className="text-3xl text-yellow-500" />
                        </div>
                        <div className="stat-title">Premium Users</div>
                        <div className="stat-value">{stats.premiumUsers}</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-title">Public Lessons</div>
                        <div className="stat-value">{lessonsLoading ? '...' : publicLessonsCount}</div>
                        <div className="stat-desc">Visible to everyone</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-title">Today’s New Lessons</div>
                        <div className="stat-value">{lessonsLoading ? '...' : todaysNewLessonsCount}</div>
                        <div className="stat-desc">Created today</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-title">Flagged Lessons</div>
                        <div className="stat-value">{lessonsLoading ? '...' : flaggedLessonsCount}</div>
                        <div className="stat-desc">Needs review</div>
                    </div>
                </div>
            </div>

            {/* 2. Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-lg">
                
                {/* Bar Chart */}
                <div className="w-full">
                    <h3 className="text-xl font-bold mb-4 text-center">Platform Activity</h3>
                    <div className="w-full h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart (User Distribution) */}
                <div className="w-full">
                    <h3 className="text-xl font-bold mb-4 text-center">User Distribution</h3>
                    <div className="w-full h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: "Free Users", value: ((usersLoading ? 0 : users.length) - (stats.premiumUsers || 0)) || 1 },
                                        { name: "Premium Users", value: stats.premiumUsers || 1 }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    <Cell fill="#0088FE" />
                                    <Cell fill="#FFBB28" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="w-full lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4 text-center">7-Day Growth</h3>
                    <div className="w-full h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="lessons" stroke="#7c3aed" strokeWidth={2} />
                                <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Most Active Contributors</h3>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Lessons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mostActiveContributors.map((c, idx) => (
                                    <tr key={c.email}>
                                        <th>{idx + 1}</th>
                                        <td>{c.name}</td>
                                        <td>{c.email}</td>
                                        <td>{c.count}</td>
                                    </tr>
                                ))}
                                {!lessonsLoading && mostActiveContributors.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-500">No contributor data yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Flagged / Reported Lessons</h3>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Visibility</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flaggedLessons.slice(0, 6).map((l, idx) => (
                                    <tr key={l._id || idx}>
                                        <th>{idx + 1}</th>
                                        <td>{l?.title || 'Untitled'}</td>
                                        <td>{l?.author?.email || l?.email || l?.userEmail || '—'}</td>
                                        <td>{l?.privacy || '—'}</td>
                                    </tr>
                                ))}
                                {!lessonsLoading && flaggedLessonsCount === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-500">No flagged lessons found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Custom shape for Bar Chart (Optional styling)
const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default AdminHome;