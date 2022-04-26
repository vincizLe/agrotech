import axios from "axios";
const API_URL = 'http://localhost:3000';

class PlotService{
    getAllPlots(){
        return axios.get(API_URL + '/plots');
    }
    create(data){
        return axios.post(API_URL +'/plots', data)
    }
    update(id,data){
        return axios.put(API_URL+ `/plots/${id}`,data)
    }
    delete(id){
        return axios.delete(API_URL + `/plots/${id}`)
    }
}

export default new PlotService()
