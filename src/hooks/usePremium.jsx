import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query"; // We need react-query for this

const usePremium = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    // Fetch user data from MongoDB to check 'isPremium' field
    const email = user?.email;

    const { data: isPremium, isPending: isPremiumLoading } = useQuery({
        queryKey: ['isPremium', email],
        enabled: !loading && !!user?.email, // Only run if user is logged in
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${encodeURIComponent(email)}`);
            return Boolean(res.data?.isPremium);
        }
    });

    return [Boolean(isPremium), isPremiumLoading];
};

export default usePremium;