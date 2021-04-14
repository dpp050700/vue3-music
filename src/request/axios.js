import axios from "axios";

export const baseUrl = "http://cijianshaonian.com:8880/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    const { data, status } = res;
    if (status === 200 && data.code === 200) {
      return data;
    }
    return res.data;
  },
  (error) => {
    const {
      response: { data },
    } = error;
    const { code, msg } = data;
    if (code === 301) {
      console.log("需要登陆");
      return error;
    }
    console.log(msg);
    return error;
  }
);

export default axiosInstance;

export const get = (url, params, extendData = {}) => {
  const { isCache } = extendData;
  if (isCache) params.timestamp = new Date().getTime();
  return axiosInstance({
    method: "get",
    url,
    params,
  });
};
