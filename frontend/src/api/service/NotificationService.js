import axios from "axios";

const NotificationService = async(token)=>{
    const response = await axios.get("http://127.0.0.1:8000/mrbug/notifications/",{
        headers:{
            "Authorization":token
        }
    }).catch(e=> console.log(e))

    return response;
}

export default NotificationService;