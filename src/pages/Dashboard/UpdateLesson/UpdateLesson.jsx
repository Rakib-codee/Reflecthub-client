import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";
import usePremium from "../../../hooks/usePremium";

const UpdateLesson = () => {
    const lesson = useLoaderData(); // Get existing data
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    
    // Check Status for Access Level Dropdown
    const [isAdmin] = useAdmin();
    const [isPremium] = usePremium();

    const { _id, title, description, category, tone, photoURL, privacy, access } = lesson;

    const onSubmit = async (data) => {
        const updatedData = {
            title: data.title,
            description: data.description,
            category: data.category,
            tone: data.tone,
            photoURL: data.photoURL,
            privacy: data.privacy,
            access: data.access
        }

        const res = await axiosPublic.put(`/lessons/${_id}`, updatedData);
        if(res.data.modifiedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Lesson Updated Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-lessons');
        }
    };

    return (
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Update Lesson</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Title */}
                <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Lesson Title</span></label>
                    <input type="text" defaultValue={title} {...register("title", {required: true})} className="input input-bordered w-full" />
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Description</span></label>
                    <textarea defaultValue={description} {...register("description", {required: true})} className="textarea textarea-bordered h-32"></textarea>
                </div>

                <div className="flex gap-6">
                    {/* Category */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text font-semibold">Category</span></label>
                        <select defaultValue={category} {...register("category", {required: true})} className="select select-bordered w-full">
                            <option>Personal Growth</option>
                            <option>Career</option>
                            <option>Relationships</option>
                            <option>Mindset</option>
                            <option>Health</option>
                        </select>
                    </div>

                    {/* Tone */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text font-semibold">Emotional Tone</span></label>
                        <select defaultValue={tone} {...register("tone", {required: true})} className="select select-bordered w-full">
                            <option>Motivational</option>
                            <option>Sad/Regret</option>
                            <option>Gratitude</option>
                            <option>Humorous</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Privacy */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text font-semibold">Visibility</span></label>
                        <select defaultValue={privacy} {...register("privacy", {required: true})} className="select select-bordered w-full">
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>

                    {/* Access Level */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text font-semibold">Access Level</span></label>
                        <select 
                            defaultValue={access} 
                            {...register("access", {required: true})} 
                            className="select select-bordered w-full"
                        >
                            <option value="Free">Free</option>
                            <option value="Premium" disabled={!isPremium && !isAdmin}>
                                Premium {(isPremium || isAdmin) ? "" : "(Upgrade Required)"}
                            </option>
                        </select>
                    </div>
                </div>

                {/* Image URL */}
                <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Image URL</span></label>
                    <input type="text" defaultValue={photoURL} {...register("photoURL")} className="input input-bordered w-full" />
                </div>

                <button className="btn btn-primary w-full text-white mt-4">Update Lesson</button>
            </form>
        </div>
    );
};

export default UpdateLesson;