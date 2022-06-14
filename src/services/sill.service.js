import axios from "axios";
const API_URL = 'http://184.73.40.134:8080/api';

class SillService{
    getAllSills(){
        return axios.get(API_URL + '/chilies');
    }
    create(data){
        return axios.post(API_URL +'/chilies', data)
    }
    update(id,data){
        return axios.put(API_URL+ `/chilies/${id}`,data)
    }
    delete(id){
        return axios.delete(API_URL + `/chilies/${id}`)
    }
}

export default new SillService();
