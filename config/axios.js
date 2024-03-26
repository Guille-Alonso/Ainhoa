import axiosOriginal from "axios";

const axios = axiosOriginal.create({
   baseURL: process.env.NEXT_PUBLIC_URL_BACK
});


export default axios;