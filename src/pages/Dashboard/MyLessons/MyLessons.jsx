import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic"; // We will switch to Secure later
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const MyLessons = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const {
        data: lessons = [],
        isPending: loading,
        refetch
    } = useQuery({
        queryKey: ['my-lessons', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/lessons?email=${encodeURIComponent(user.email)}`);
            const data = Array.isArray(res.data) ? res.data : [];
            return data.filter(item => {
                const authorEmail = item?.author?.email || item?.email || item?.userEmail;
                return authorEmail === user.email;
            });
        }
    });

    // 2. Handle Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/lessons/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your lesson has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    if(loading) return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;

    return (
        <div className="w-full bg-white p-8 rounded-xl shadow-lg">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-primary">My Lessons</h2>
                <h2 className="text-xl font-bold">Total: {lessons.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* Head */}
                    <thead className="bg-gray-100 text-primary">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Access</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="font-bold">{item.title}</div>
                                    <div className="text-xs opacity-50">{item.tone}</div>
                                </td>
                                <td>{item.category}</td>
                                <td>
                                    {item.privacy === 'Public' ? 
                                        <span className="badge badge-success text-white">Public</span> : 
                                        <span className="badge badge-ghost">Private</span>
                                    }
                                </td>
                                <td>
                                    {item.access === 'Premium' ? 
                                        <span className="badge badge-warning text-white">Premium</span> : 
                                        <span className="badge badge-info text-white">Free</span>
                                    }
                                </td>
                                <td className="flex gap-2">
                                    <Link to={`/dashboard/update-lesson/${item._id}`}>
                                        <button className="btn btn-ghost btn-xs bg-orange-100 text-orange-600"><FaEdit /></button>
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs bg-red-100 text-red-600"><FaTrashAlt /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {lessons.length === 0 && <p className="text-center py-10 text-gray-400">You haven't added any lessons yet.</p>}
            </div>
        </div>
    );
};

export default MyLessons;