import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000' // Make sure this matches your Server Port
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;