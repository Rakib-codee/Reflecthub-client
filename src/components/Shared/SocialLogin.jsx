import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = ({ redirectTo = "/" }) => {
  const { googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    if (signingIn) return;
    setSigningIn(true);

    try {
      const result = await googleSignIn();
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

      await axiosPublic.post(`/users/${encodeURIComponent(email)}`, userInfo);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged in with Google",
        showConfirmButton: false,
        timer: 1200,
      });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const code = err?.code;
      const message = String(err?.message || "");

      // Non-fatal: user closed popup / cancelled request
      if (code === "auth/cancelled-popup-request" || code === "auth/popup-closed-by-user") {
        Swal.fire({
          icon: "info",
          title: "Sign-in cancelled",
          text: "Google sign-in was cancelled. Please try again.",
        });
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Google sign-in failed",
        text: message || "Unable to sign in with Google.",
      });
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={signingIn}
      className="btn btn-outline btn-primary w-full flex items-center gap-2 rounded-full"
    >
      <FaGoogle /> {signingIn ? "Opening Google..." : "Continue with Google"}
    </button>
  );
};

export default SocialLogin;