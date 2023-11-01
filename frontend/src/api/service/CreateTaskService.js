import axios from "axios"

const CreateTaskService = async (token,task) =>{
    const response = await axios.post("http://127.0.0.1:8000/mrbug/task/",task,{
        headers:{
            "Authorization":token
        }
    }).catch(e => console.log(e))
    
    return response
}

export default CreateTaskService;