import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = ({ redirectTo = "/" }) => {
  const { googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const email = result?.user?.email;
        if (!email) {
          throw new Error("Google sign-in failed: missing user email");
        }

        const userInfo = {
          email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL,
          role: "user",
          isPremium: false,
          createdAt: new Date(),
        };
        axiosPublic.post(`/users/${encodeURIComponent(email)}`, userInfo).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Logged in with Google",
            showConfirmButton: false,
            timer: 1200,
          });
          navigate(redirectTo, { replace: true });
        });
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Google sign-in failed",
          text: err.message,
        });
      });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn btn-outline btn-primary w-full flex items-center gap-2 rounded-full"
    >
      <FaGoogle /> Continue with Google
    </button>
  );
};

export default SocialLogin;