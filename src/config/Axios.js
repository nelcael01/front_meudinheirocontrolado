import api from "axios";

const Axios = api.create({
  // baseURL: process.env.REACT_APP_API_URL,
});

Axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  () => {}
);

export default Axios;