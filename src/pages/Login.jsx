import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import SocialLogin from "../components/Shared/SocialLogin";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

const LAST_EMAIL_KEY = "reflecthub-last-email";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const lastEmail = useMemo(() => localStorage.getItem(LAST_EMAIL_KEY) || "", []);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { email: lastEmail, password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(!!lastEmail);
  const [submitting, setSubmitting] = useState(false);
  const [capsOn, setCapsOn] = useState(false);

  useEffect(() => {
    // Ensure email field is pre-filled if lastEmail exists
    setValue("email", lastEmail);
    setRememberEmail(!!lastEmail);
  }, [lastEmail, setValue]);

  const friendlyError = (err) => {
    const msg = String(err?.message || "");
    if (msg.includes("auth/invalid-email")) return "Invalid email format.";
    if (msg.includes("auth/user-not-found")) return "No account found with this email.";
    if (msg.includes("auth/wrong-password")) return "Incorrect password. Try again.";
    if (msg.includes("auth/too-many-requests"))
      return "Too many attempts. Please wait a moment and try again.";
    if (msg.includes("auth/invalid-credential"))
      return "Invalid credentials. Please check your email/password.";
    return "Login failed. Please check your email and password.";
  };

  const onSubmit = async ({ email, password }) => {
    setSubmitting(true);
    try {
      await signIn(email, password);

      if (rememberEmail) localStorage.setItem(LAST_EMAIL_KEY, email);
      else localStorage.removeItem(LAST_EMAIL_KEY);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome back!",
        showConfirmButton: false,
        timer: 1200,
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login error",
        text: friendlyError(err),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F6F3FF] py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left copy */}
        <div className="hidden lg:block pl-4">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold">
            Welcome back
          </span>
          <h1 className="text-5xl font-serif font-bold text-gray-900 mt-6 leading-tight">
            Log in to ReflectHub
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Access your lessons, manage your dashboard, and continue your growth journey.
          </p>

          <ul className="mt-8 space-y-3 text-gray-700">
            <li>• Secure login with Email or Google</li>
            <li>• Remember last email for faster sign-in</li>
            <li>• Smooth redirect to your previous page</li>
          </ul>
        </div>

        {/* Right card */}
        <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-50 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
          <p className="text-center text-gray-500 mb-6">We’re happy to see you again</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-10"
                  placeholder="Your password"
                  {...register("password", { required: "Password is required" })}
                  onKeyUp={(e) => setCapsOn(e.getModifierState && e.getModifierState("CapsLock"))}
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
              {capsOn && (
                <p className="text-xs text-amber-600 mt-1">Caps Lock is ON</p>
              )}
              {errors.password && (
                <span className="text-red-600 text-sm">{errors.password.message}</span>
              )}
            </div>

            {/* Remember email */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  checked={rememberEmail}
                  onChange={(e) => setRememberEmail(e.target.checked)}
                />
                <span className="text-sm text-gray-600">Remember email</span>
              </label>

              {/* Note: No real forget password per assignment */}
              <span className="text-xs text-gray-400">Forgot password? (disabled)</span>
            </div>

            {/* Submit */}
            <button
              className="btn btn-primary w-full text-white rounded-full"
              disabled={!isValid || submitting}
            >
              {submitting ? <span className="loading loading-spinner"></span> : "Sign In"}
            </button>
          </form>

          <div className="divider my-6">or</div>

          {/* Social login with redirect to 'from' */}
          <SocialLogin redirectTo={from} />

          <p className="text-center text-sm mt-4">
            New to ReflectHub?{" "}
            <Link to="/register" className="text-primary font-semibold">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;