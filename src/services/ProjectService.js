import axios from "axios";

class ProjectService {
    getAllManagerRelatedDetails(manager_id){
        return axios.get("http://localhost:8080/Task_Management/manager/" + manager_id + "/");
    }

    createNewProject(project){
        return axios.post("http://localhost:8080/Task_Management/project", project);
    }

    createNewUser(user){
        return axios.post("http://localhost:8080/Task_Management/user", user);
    }

    getAllProjects(){
        return axios.get("http://localhost:8080/Task_Management/project");
    }

    getEmployeeByID(empId){
        return axios.get("http://localhost:8080/Task_Management/user/" + empId + "/");
    }
}

export default new ProjectService()