import axios from "axios";

export const authInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
})


// https://job-application-mern-nu.vercel.app/

// http://localhost:3000/api/v1/user