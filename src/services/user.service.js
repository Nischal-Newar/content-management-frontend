import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BASE_URL;

const getPublicContent = () => {
  return axios.get(API_URL + "allpost");
};

const getUserPost = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL + `posts/${user.user.email}`, { headers: authHeader() });
};

const submitUserPost = (title,description) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.post(API_URL + "posts", {
      "email": user.user.email,
      "post":{
          "name": user.user.name,
          "title": title,
          "description": description
      }},{
        headers: authHeader()
      }).then((response) => {
        return response.data;
    });
};

export default {
    getPublicContent,
    getUserPost,
    submitUserPost
};