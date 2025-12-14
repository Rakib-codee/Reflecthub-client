import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch Users using TanStack Query
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    // Make Admin Handler
    const handleMakeAdmin = user => {
        axiosPublic.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch(); // Refresh the table
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="w-full p-8 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between my-4">
                <h2 className="text-3xl font-bold text-primary">All Users</h2>
                <h2 className="text-3xl font-bold">Total Users: {users.length}</h2>
            </div>
            
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : (
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm btn-ghost bg-orange-500 text-white">
                                            <FaUsers className="text-lg" /> Make Admin
                                        </button>
                                    )}
                                </td>
                                {/* 
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg text-red-600"><FaTrashAlt /></button>
                                </td> 
                                */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;