import { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../components/Shared/SocialLogin";
import { FiEye, FiEyeOff, FiCheckCircle, FiXCircle, FiMail, FiUser, FiImage } from "react-icons/fi";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        reset,
    } = useForm({ mode: "onChange" });

    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const password = watch("password", "");
    const accepted = watch("accepted", false);

    // Password checks (follow assignment rules)
    const checks = useMemo(
        () => ({
            length: password.length >= 6,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
        }),
        [password]
    );

    const score = (checks.length ? 1 : 0) + (checks.upper ? 1 : 0) + (checks.lower ? 1 : 0);
    const strength = {
        label: ["Very Weak", "Weak", "Good", "Strong"][score],
        width: `${(score / 3) * 100}%`,
        color: ["bg-gray-300", "bg-red-500", "bg-yellow-400", "bg-green-500"][score],
    };

    const uploadImageToImgBB = async (file) => {
        const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
        if (!imgbbKey) {
            throw new Error("ImgBB API key missing. Set VITE_IMGBB_API_KEY in .env.local");
        }

        if (!file) {
            throw new Error("Please select a photo");
        }

        if (!file.type?.startsWith("image/")) {
            throw new Error("Please select a valid image file");
        }

        const formData = new FormData();
        formData.append("image", file);

        const url = `https://api.imgbb.com/1/upload?key=${encodeURIComponent(imgbbKey)}`;
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const json = await response.json();
        if (!response.ok || !json?.success) {
            throw new Error(json?.error?.message || "Image upload failed");
        }

        return json?.data?.display_url || json?.data?.url;
    };

    const onSubmit = async (data) => {
        if (!accepted) {
            Swal.fire({ icon: "warning", title: "Please accept terms & conditions" });
            return;
        }

        setSubmitting(true);
        try {
            // 1) Create Firebase user
            await createUser(data.email, data.password);

            // Upload image to ImgBB
            const photoFile = data.photo?.[0];
            const uploadedPhotoURL = await uploadImageToImgBB(photoFile);

            // 2) Update profile
            await updateUserProfile(data.name, uploadedPhotoURL);

            // 3) Save to MongoDB
            const userInfo = {
                name: data.name,
                email: data.email,
                photoURL: uploadedPhotoURL,
                role: "user",
                isPremium: false,
                createdAt: new Date(),
            };

            const dbRes = await axiosPublic.post(`/users/${encodeURIComponent(data.email)}`, userInfo);

            // Accept either insert or already-exists as success
            if (dbRes.data?.insertedId || dbRes.data?.upsertedId || dbRes.data?.modifiedCount >= 0 || dbRes.data?.message) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Welcome to ReflectHub!",
                    text: "Account created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
                navigate("/");
            } else {
                throw new Error("Failed to save user in database");
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Registration failed",
                text: err.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#F6F3FF] py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left - Brand/Copy */}
                <div className="hidden lg:block pl-4">
                    <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold">Join ReflectHub</span>
                    <h1 className="text-5xl font-serif font-bold text-gray-900 mt-6 leading-tight">
                        Create your account
                        <br />and start sharing wisdom
                    </h1>
                    <p className="text-gray-500 mt-4 text-lg">
                        Capture insights, organize lessons, and grow with a supportive community.
                    </p>

                    <ul className="mt-8 space-y-3 text-gray-700">
                        <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-500" /> Email & Google sign in
                        </li>
                        <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-500" /> Clean UI with real-time validation
                        </li>
                        <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-500" /> Free → Upgrade to Premium anytime
                        </li>
                    </ul>
                </div>

                {/* Right - Form Card */}
                <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-50 p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900">Create your ReflectHub account</h2>
                    <p className="text-center text-gray-500 mb-6">It only takes a minute</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Full Name</span></label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="e.g. Sarah Mitchell"
                                    {...register("name", { required: "Name is required" })}
                                />
                            </div>
                            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
                        </div>

                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Photo</span></label>
                            <div className="relative">
                                <FiImage className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full pl-10"
                                    {...register("photo", { required: "Photo is required" })}
                                />
                            </div>
                            {errors.photo && <span className="text-red-600 text-sm">{errors.photo.message}</span>}
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="email"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="you@example.com"
                                    {...register("email", { required: "Email is required" })}
                                />
                            </div>
                            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full pr-10"
                                    placeholder="Create a password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "At least 6 characters" },
                                        pattern: {
                                            value: /(?=.*[A-Z])(?=.*[a-z])/,
                                            message: "Must include uppercase and lowercase",
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-500"
                                    onClick={() => setShowPassword((p) => !p)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}

                            {/* Strength Meter */}
                            <div className="mt-3">
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`h-2 ${strength.color}`} style={{ width: strength.width }} />
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span>Strength:</span>
                                    <span className="font-semibold">{strength.label}</span>
                                </div>

                                {/* Rule checklist */}
                                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        {checks.upper ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-gray-400" />}
                                        Uppercase
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {checks.lower ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-gray-400" />}
                                        Lowercase
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {checks.length ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-gray-400" />}
                                        6+ chars
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Confirm Password</span></label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Re-enter password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (val) => val === password || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input type="checkbox" className="checkbox checkbox-primary" {...register("accepted")} />
                                <span className="label-text text-sm">
                                    I agree to the <Link to="/terms" className="text-primary font-semibold">Terms</Link> and{" "}
                                    <Link to="/privacy" className="text-primary font-semibold">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            className="btn btn-primary w-full text-white rounded-full"
                            disabled={!isValid || !accepted || submitting}
                        >
                            {submitting ? <span className="loading loading-spinner"></span> : "Create Account"}
                        </button>
                    </form>

                    {/* Divider + Social */}
                    <div className="divider my-6">or</div>
                    <SocialLogin />

                    {/* Login link */}
                    <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-semibold">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;