import axios from "axios";

export const authInstance = axios.create({
    baseURL: 'https://job-application-mern-nu.vercel.app',
    withCredentials: true,
})


// https://job-application-mern-nu.vercel.app/

// http://localhost:3000/api/v1/user