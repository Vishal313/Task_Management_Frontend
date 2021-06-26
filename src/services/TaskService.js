import axios from "axios";

class TaskService {
    
    getAllTasks(empId){
        return axios.get("http://localhost:8080/Task_Management/user/" + empId + "/task/");
    }

    getTaskStatusByTaskId(tskId){
        return axios.get("http://localhost:8080/Task_Management/taskstatus/" + tskId + "/");
    }

    getAllEmployee(){
        return axios.get("http://localhost:8080/Task_Management/user");
    }

    createNewTaskStatus(taskStatus){
        return axios.post("http://localhost:8080/Task_Management/taskstatus", taskStatus);
    }

    createNewTask(task){
        return axios.post("http://localhost:8080/Task_Management/project/0/task/", task);
    }
}

export default new TaskService()