import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

const config = {headers: { 'content-type': 'multipart/form-data',"Authorization" : authHeader() }}

class PostService {
    uploadfile(file) {
        let data = new FormData();
        console.log(file + ' ' + 'this is file pathname')
        data.append('file', file);
        console.log("auth" + ' ' + authHeader())
        return axios
          .post(API_URL + "api/media_objects",data,config)
          .then(response => {
            if (response.data.token) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data["@id"];
          });
    }

    savePost(description,image,user_id,cartetype) {
      return axios
      .post(API_URL + "posts/create", {
        description,
        image,
        user_id,
        cartetype
      },{headers: {"Authorization" : authHeader()} })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
    }

    async getPost(){
      return axios.get(API_URL + "api/posts",{headers: {"Authorization" : authHeader()} }).then(response => {
        console.log(response.data["hydra:member"])
        return Array.from(response.data["hydra:member"]);
      });
    }

    async getMessages(){
      return axios.get(API_URL + "api/messages",{headers: {"Authorization" : authHeader()} }).then(response => {
        console.log(response.data["hydra:member"])
        return Array.from(response.data["hydra:member"]);
      });
    }

    async getReservation(){
      return axios.get(API_URL + "api/reservations",{headers: {"Authorization" : authHeader()} }).then(response => {
        console.log(response.data["hydra:member"])
        return Array.from(response.data["hydra:member"]);
      });
    }

    async getCarteBoisson(){
      return axios.get(API_URL + "carte/boissons",{headers: {"Authorization" : authHeader()} }).then(response => {
        return response.data.filename;
      });
    }

    async getCarteRestaurant(){
      return axios.get(API_URL + "carte/restaurant",{headers: {"Authorization" : authHeader()} }).then(response => {
        return response.data.filename;
      });
    }

    async getUserPosts(id){
      return axios.get(API_URL + "post/user/" + id,{headers: {"Authorization" : authHeader()} }).then(response => {
        console.log(response.data)
        return Array.from(response.data);
      });
    }
    
}

export default new PostService();
