import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosPublic from "./useAxiosPublic"; // Switch to Secure later
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;