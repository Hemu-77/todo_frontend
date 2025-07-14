import axios from "axios";

const API = axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://todo-backend-pfrw.onrender.com",
    withCredentials: true
  });
  

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(token)

  const publicRoutes = ["/api/users/signup"];
  const isPublic = publicRoutes.some(route => config.url.includes(route));

   if (!isPublic) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
  }

  return config;
});

export default API;
