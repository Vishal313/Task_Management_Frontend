import axios from "axios";

class ProjectService {
    getAllManagerRelatedDetails(manager_id){
        return axios.get("http://localhost:8080/Task_Management/manager/" + manager_id + "/");
    }
}

export default new ProjectService()