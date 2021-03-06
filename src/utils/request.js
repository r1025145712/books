import axios from "axios";

import { showLoading, hideLoading } from "@lib/loading/index.js";
//创建一个新的axios
const server = axios.create({
    //baseURL: "http://www.baidu.com",
    withCredentials:true,
    timeout:5000,
})

//请求的拦截
server.interceptors.request.use((config)=>{
   if(config.method == "get"){
       config.params = {...config.data};
   }
    // loading.loadingMount();
    showLoading()
   
//    config.headers["content-type"]="applicetion/json";
   //拦截token
   config.headers.AuthToken = "this.$cookies.get('token')";

   return config;
},(err)=>{
    return  Promise.reject(err);
})



//响应的拦击
server.interceptors.response.use((res)=>{
    if(res.status == 200){
        // loading.loadingDestroy();
        hideLoading();
        return res.data;
    }
},(err)=>{
    return  Promise.reject(err);
})



export default server;