import axios from "axios";

const CreateConversationService = (token , participant) => {
    const response = axios.post('http://127.0.0.1:8000/mrbug/conversations/', participant,{
        headers:{
            Authorization : token,
        }
    }).catch(e => console.log(e))
    return response;
}

export default CreateConversationService;