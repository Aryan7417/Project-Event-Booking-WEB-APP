import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:5173/',
    headers:{
        'Content-Type:':'application/json',
    },
});

api.interceptors.request.user((condfig)=>{
    const token = localStorage.getItem('token');
    if(token){
        condfig.headers.Authorization = `Bearer ${token}`;
    }
    return condfig;
})

export default api;