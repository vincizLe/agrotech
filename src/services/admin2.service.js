import axios from "axios";
const API_URL = 'http://localhost:3000';

class Admin2Service{
    getById(id){
        return axios.get(API_URL + `/admins/${id}`);
    }
    update(id,data){
        return axios.put(API_URL+ `/admins/${id}`,data)
    }

}

export default new Admin2Service()
