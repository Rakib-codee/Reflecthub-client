import { useContext } from "react";
import { FaGoogle } from "react-icons/fa"; // npm install react-icons
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    role: 'user', // Default role
                    isPremium: false // Default plan
                }
                // Save user to database
                axiosPublic.post(`/users/${encodeURIComponent(result.user.email)}`, userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }

    return (
        <div className="p-8 pt-0">
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary w-full flex items-center gap-2">
                <FaGoogle />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;