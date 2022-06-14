import axios from "axios";
const API_URL = 'http://184.73.40.134:8080/api';

class PlotService{
    getAllPlots(){
        return axios.get(API_URL + '/plots');
    }
    create(id,data){
        return axios.post(API_URL +`/users/${id}/plots`, data)
    }
    update(id,data){
        return axios.put(API_URL+ `/plots/${id}`,data)
    }
    delete(id){
        return axios.delete(API_URL + `/plots/${id}`)
    }
}

export default new PlotService()
