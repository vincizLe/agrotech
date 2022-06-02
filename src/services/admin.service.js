import http from './http-common';
import authHeader from "@/services/auth-header";

class AdminService {
    getAdmin(id){
        return http.get(`/specialists/listByIdSpecialist?idSpecialist=${id}`,{ headers: authHeader() })
    }
}
export default new AdminService();
