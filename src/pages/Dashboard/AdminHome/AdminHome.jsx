import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaBook, FaDollarSign, FaUsers, FaCrown } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Tooltip } from 'recharts';

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
            <div className="stats shadow w-full mb-12">
                
                {/* Revenue */}
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-4xl" />
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value text-secondary">৳{stats.revenue}</div>
                    <div className="stat-desc">From Premium subscriptions</div>
                </div>

                {/* Users */}
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{stats.users}</div>
                    <div className="stat-desc">↗︎ 12% more than last month</div>
                </div>

                {/* Lessons */}
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Lessons</div>
                    <div className="stat-value">{stats.lessons}</div>
                    <div className="stat-desc">Community Contributions</div>
                </div>

                 {/* Premium Users */}
                 <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaCrown className="text-3xl text-yellow-500" />
                    </div>
                    <div className="stat-title">Premium Users</div>
                    <div className="stat-value">{stats.premiumUsers}</div>
                </div>
                
            </div>

            {/* 2. Graphs Section */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white p-8 rounded-xl shadow-lg">
                
                {/* Bar Chart */}
                <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold mb-4 text-center">Platform Activity</h3>
                    <BarChart width={400} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                {/* Pie Chart (User Distribution) */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-4 text-center">User Distribution</h3>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={[
                                { name: "Free Users", value: (stats.users - stats.premiumUsers) || 1 },
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