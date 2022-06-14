import axios from "axios";
const API_URL = 'http://184.73.40.134:8080/api';

class UserService {
    getAllUsers(){
        return axios.get(API_URL + '/users');
    }
    getUserById(id){
        return axios.get(API_URL + `/users/${id}`)
    }
    create(data){
        return axios.post(API_URL + '/users',data)
    }
    update(id,data){
        return axios.put(API_URL+ `/users/${id}`,data)
    }
    delete(id){
        return axios.delete(API_URL + `/users/${id}`)
    }
}
export default new UserService();
