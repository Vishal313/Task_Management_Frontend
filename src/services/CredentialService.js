import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/Task_Management/credential";

class CredentialService {
    checkCreds(creds){
        return axios.post(EMPLOYEE_API_BASE_URL, creds);
    }

    updateCreds(cred){
        return axios.put(EMPLOYEE_API_BASE_URL, cred);
    }
}

export default new CredentialService()