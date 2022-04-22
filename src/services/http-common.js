import axios from 'axios'

export default axios.create({
    baseURL: 'https://teapprendo.herokuapp.com',
    headers: {
        'Content-type': 'application/json'
    }
});
