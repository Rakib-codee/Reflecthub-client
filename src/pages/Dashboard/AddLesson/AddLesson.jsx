import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic"; 
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import usePremium from "../../../hooks/usePremium"; // Import the hook

const AddLesson = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    
    // 👇 GET REAL PREMIUM STATUS HERE
    const [isPremium] = usePremium(); 

    const onSubmit = async (data) => {
        
        const lessonData = {
            title: data.title,
            description: data.description,
            category: data.category,
            tone: data.tone,
            photoURL: data.photoURL,
            privacy: data.privacy,
            access: data.access, // Free or Premium
            author: {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL
            },
            createdAt: new Date(), // We store date to sort later
            likes: [],
            likesCount: 0
        }

        const res = await axiosPublic.post('/lessons', lessonData);
        if(res.data.insertedId){
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Lesson Added Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-lessons');
        }
    };

    return (
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Add New Lesson</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Title */}
                <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Lesson Title</span></label>
                    <input type="text" {...register("title", {required: true})} placeholder="e.g. Failure is the stepping stone to success" className="input input-bordered w-full" />
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Description / Story</span></label>
                    <textarea {...register("description", {required: true})} className="textarea textarea-bordered h-32" placeholder="Share your insight..."></textarea>
                </div>

                <div className="flex gap-6">
                    {/* Category */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text font-semibold">Category</span></label>
                        <select {...register("category", {required: true})} className="select select-bordered w-full">
                            <option disabled selected>Pick one</option>
                            <option>Personal Growth</option>
                            <option>Career</option>
                            <option>Relationships</option>
                            <option>Mindset</option>
                            <option>Health</option>
                        </select>
                    </div>

                    {/* Emotional Tone */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text font-semibold">Emotional Tone</span></label>
                        <select {...register("tone", {required: true})} className="select select-bordered w-full">
                            <option disabled selected>Pick one</option>
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
                        <select {...register("privacy", {required: true})} className="select select-bordered w-full">
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>

                    {/* Access Level (Premium Check) */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text font-semibold">Access Level</span></label>
                        <select 
                            {...register("access", {required: true})} 
                            className="select select-bordered w-full"
                            defaultValue="Free"
                        >
                            <option value="Free">Free</option>
                            
                            {/* 👇 DYNAMICALLY DISABLE BASED ON DB STATUS */}
                            <option value="Premium" disabled={!isPremium}>
                                Premium {isPremium ? "" : "(Upgrade Required)"}
                            </option>
                        </select>
                        {!isPremium && <span className="text-xs text-red-500 mt-1">Upgrade to Premium to create paid content.</span>}
                    </div>
                </div>

                {/* Image URL */}
                <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Image URL (Optional)</span></label>
                    <input type="text" {...register("photoURL")} placeholder="https://..." className="input input-bordered w-full" />
                </div>

                <button className="btn btn-primary w-full text-white mt-4">Publish Lesson</button>
            </form>
        </div>
    );
};

export default AddLesson;