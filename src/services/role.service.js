import axios from "axios";
const API_URL = 'http://184.73.40.134:8080/api';

class RoleService {
    create(userId){
        return axios.post(API_URL + `/users/${userId}/roles/1`,{})
    }

    getUserRolByUserId(userId){
        return axios.get(API_URL + `/userRoles/${userId}/userId`)
    }
}
export default new RoleService();
