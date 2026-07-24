import axios from "axios";
import {tokenStorage} from "../auth/tokenStorage";


const apiClient = axios.create({

    baseURL:
    "http://localhost:8080/api",

    headers:{
        "Content-Type":"application/json"
    }

});



apiClient.interceptors.request.use(

(config)=>{


    const token =
        tokenStorage.getAccessToken();


    if(token){

        config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

});


export default apiClient;