import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../components/Shared/SocialLogin";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = data => {
        // 1. Create User in Firebase
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                // 2. Update Profile (Name & Photo)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // 3. Save User Data to MongoDB
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL,
                            role: 'user',      // Default Role
                            isPremium: false   // Default Plan
                        }
                        axiosPublic.post(`/users/${encodeURIComponent(data.email)}`, userInfo)
                            .then(res => {
                                if (res.data.modifiedCount > 0 || res.data.upsertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                 Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-full lg:w-1/2 ml-10">
                    <h1 className="text-5xl font-bold text-primary">Join the Community!</h1>
                    <p className="py-6">Start your journey of capturing wisdom and sharing life lessons today.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600 text-sm">Name is required</span>}
                        </div>

                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Photo URL</span></label>
                            <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-600 text-sm">Photo URL is required</span>}
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
                        </div>

                        {/* Password with Validation */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[a-z])/
                            })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <span className="text-red-600 text-sm">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-600 text-sm">Password must be 6 characters</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-600 text-sm">Must have 1 uppercase and 1 lowercase letter</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary text-white">Sign Up</button>
                        </div>
                    </form>
                    
                    <p className="px-8 text-center"><small>Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link></small></p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;