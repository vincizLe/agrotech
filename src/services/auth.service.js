import axios from 'axios';
const API_URL = 'http://184.73.40.134:8080/api';
class AuthService {
    login(user) {
        return axios
            .get(API_URL + `/users/${user.username}/${user.password}`)
            .then(response => {
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
}
export default new AuthService();
