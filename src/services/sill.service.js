import axios from "axios";
const API_URL = 'http://localhost:3000';

class SillService{
    getAllSills(){
        return axios.get(API_URL + '/sills');
    }
    create(data){
        return axios.post(API_URL +'/sills', data)
    }
    update(id,data){
        return axios.put(API_URL+ `/sills/${id}`,data)
    }
    delete(id){
        return axios.delete(API_URL + `/sills/${id}`)
    }
}

export default new SillService();