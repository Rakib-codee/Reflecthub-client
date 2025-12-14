import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";

const ManageLessons = () => {
    const axiosPublic = useAxiosPublic();
    const [isAdmin, isAdminLoading] = useAdmin();

    const { data: lessons = [], isPending, refetch } = useQuery({
        queryKey: ['admin-lessons-manage'],
        queryFn: async () => {
            const res = await axiosPublic.get('/lessons');
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    const handleToggleFeatured = async (lesson) => {
        try {
            const nextFeatured = !lesson?.featured;
            const { _id, ...rest } = lesson || {};
            const payload = { ...rest, featured: nextFeatured };

            const res = await axiosPublic.put(`/lessons/${lesson._id}`, payload);

            if (res?.data?.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: nextFeatured ? "Marked as Featured" : "Removed from Featured",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            Swal.fire({
                icon: "info",
                title: "No change",
                text: "The lesson could not be updated. Please check your server supports updating 'featured'."
            });
        } catch {
            Swal.fire({
                icon: "error",
                title: "Update failed",
                text: "Could not update lesson."
            });
        }
    };

    if (isAdminLoading) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    if (!isAdmin) {
        return (
            <div className="w-full p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-primary">Manage Lessons</h2>
                <p className="text-gray-500 mt-2">You do not have permission to view this page.</p>
            </div>
        );
    }

    if (isPending) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="w-full p-8 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between my-4 gap-4 flex-wrap">
                <h2 className="text-3xl font-bold text-primary">Manage Lessons</h2>
                <h2 className="text-xl font-bold">Total Lessons: {lessons.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Visibility</th>
                            <th>Access</th>
                            <th>Featured</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((lesson, idx) => (
                            <tr key={lesson._id || idx}>
                                <th>{idx + 1}</th>
                                <td className="font-semibold">{lesson?.title || 'Untitled'}</td>
                                <td>{lesson?.author?.name || lesson?.author?.email || lesson?.email || '—'}</td>
                                <td>{lesson?.category || '—'}</td>
                                <td>
                                    {(lesson?.privacy || '').toLowerCase() === 'public' ? (
                                        <span className="badge badge-success text-white">Public</span>
                                    ) : (
                                        <span className="badge badge-ghost">Private</span>
                                    )}
                                </td>
                                <td>
                                    {lesson?.access === 'Premium' ? (
                                        <span className="badge badge-warning text-white">Premium</span>
                                    ) : (
                                        <span className="badge badge-info text-white">Free</span>
                                    )}
                                </td>
                                <td>
                                    {lesson?.featured ? (
                                        <span className="badge badge-primary text-white">Yes</span>
                                    ) : (
                                        <span className="badge badge-outline">No</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleFeatured(lesson)}
                                        className={`btn btn-sm rounded-full ${lesson?.featured ? 'btn-outline btn-primary' : 'btn-primary text-white'}`}
                                    >
                                        {lesson?.featured ? 'Unfeature' : 'Feature'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {lessons.length === 0 && (
                    <p className="text-center text-gray-400 mt-10">No lessons found.</p>
                )}
            </div>
        </div>
    );
};

export default ManageLessons;
