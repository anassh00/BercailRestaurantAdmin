import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "api/login_check", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register = async (username, email, password) => {
    return axios.post(API_URL + "user/create", {
      username,
      email,
      password
    });
  }

  update = async (email, description) => {
    return axios.put(API_URL + "api/users/"+ JSON.parse(localStorage.getItem('user')).data.id, {
      email,
      description
    }, { headers: {"Authorization" : authHeader()} });
  }

  uploadfile(file) {
    let data = new FormData();
    console.log(file + ' ' + 'this is file pathname')
    data.append('file', file);

    return axios
      .post(API_URL + "api/media_objects",data, { headers: {"Authorization" : authHeader()} })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data["contentUrl"].split("/")[2];
      });
  }

  updateWithImage = async (email, description ,filename) => {
    return axios.put(API_URL + "api/users/"+ JSON.parse(localStorage.getItem('user')).data.id, {
      email,
      description,
      filename
    }, { headers: {"Authorization" : authHeader()} });
  }

  getUserById = async (id) => {
    return axios.get(API_URL + "userInfo/" + id,{ headers: {"Authorization" : authHeader()} }).then(response => {
      console.log(response.data)
      return response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
