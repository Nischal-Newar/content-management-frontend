import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BASE_URL;

const register = (name, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password
  }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    }).then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
 localStorage.removeItem("user")
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};