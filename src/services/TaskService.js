import axios from "axios";

class TaskService {
    
    getAllTasks(empId){
        return axios.get("http://localhost:8080/Task_Management/user/" + empId + "/task/");
    }

    getTaskStatusByTaskId(tskId){
        return axios.get("http://localhost:8080/Task_Management/taskstatus/" + tskId + "/");
    }

    createNewTaskStatus(taskStatus){
        return axios.post("http://localhost:8080/Task_Management/taskstatus", taskStatus);
    }
}

export default new TaskService()