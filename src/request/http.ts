/*
 * @Author: Rantele
 * @Date: 2022-10-12 18:59:33
 * @LastEditors: Rantele
 * @LastEditTime: 2022-10-19 13:03:58
 * @Description:封装axios
 *
 */

//引入axios
import axios from "axios";
//引入js-cookie
import Cookies from "js-cookie";
//引入加载进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
//自定义axios实例
const instance = axios.create({
  baseURL: "/path",
  timeout: 15000,
});

//请求拦截器
// 设置header携带Cookie中的token
instance.interceptors.request.use(
  (config) => {
    NProgress.start();
    let token = Cookies.get("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  (res) => {
    NProgress.done();
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
