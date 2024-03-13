import axiosOriginal from "axios";

const axios = axiosOriginal.create({
   baseURL: "https://ainhoa-desa.developia.com.ar",
});


export default axios;