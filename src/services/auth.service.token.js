import axios from 'axios';
const API_URL = 'https://teapprendo.herokuapp.com';
class AuthServiceToken {
    login(user) {
        return axios
            .post(API_URL + '/specialists/login', {
                username: user.username,
                password: user.password,
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
}
export default new AuthServiceToken();
