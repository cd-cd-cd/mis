import axios from "axios";
import message from "element-ui/packages/message";

const api = axios.create({
  baseURL: '/api'
})
//请求拦截器
api.interceptors.request.use((config)=>{
  let token = localStorage.getItem('token');
  token && (config.headers.Authorization = 'Bearer '+ token);
  return config;
},error=>{
  return Promise.reject(error);
});
//响应拦截器
api.interceptors.response.use(response=>{
  if(response.status>200 && response.status<=300){
  }
  return response
},error=>{
  if (error.response && error.response.status === 401) {
    console.log(error.response.data)
    message.error(error.response.data)
    window.localStorage.clear()
  }
return Promise.reject(error)
})

export default api;