import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Community = () => {
    const axiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get('/users')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
    }, [axiosPublic]);

    if (loading) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="max-w-screen-2xl mx-auto px-4 py-10">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800">Our Community</h2>
                <p className="text-gray-500 mt-2">Meet the {users.length}+ learners growing together on Digital Life Lessons.</p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map(user => (
                    <div key={user._id} className="card bg-base-100 shadow-xl border border-gray-100 items-center py-6 text-center hover:-translate-y-2 transition-all">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL || "https://i.ibb.co/de/avatar.png"} alt={user.name} />
                            </div>
                        </div>
                        <div className="card-body p-4">
                            <h2 className="card-title justify-center text-gray-700">{user.name}</h2>
                            <p className="text-xs text-gray-400">Joined our journey</p>
                            
                            {/* Badges */}
                            <div className="flex justify-center gap-2 mt-2">
                                {user.role === 'admin' && <span className="badge badge-error text-white text-xs">Admin</span>}
                                {user.isPremium && <span className="badge badge-warning text-white text-xs">Premium</span>}
                                {!user.role && !user.isPremium && <span className="badge badge-ghost text-xs">Learner</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;