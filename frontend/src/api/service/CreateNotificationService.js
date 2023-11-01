import axios from "axios";

const CreateNotificationService = async (token,notification)=>{
    const response = await axios.post('http://127.0.0.1:8000/mrbug/notifications/',notification,{
        headers:{
            "Authorization":token
        }
    }).catch(e => console.log(e))
    return response;
}

export default CreateNotificationService;