import axios from "axios";

 const resolvedBaseUrl = (() => {
     const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
     if (envBaseUrl) return envBaseUrl;

     if (import.meta.env.DEV) return "http://localhost:3000";

     console.error(
         "Missing VITE_API_BASE_URL. API requests will likely fail in production. Set it in your deploy environment variables."
     );
     return "";
 })();

const axiosPublic = axios.create({
    baseURL: resolvedBaseUrl
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;