import axios from "axios";

const CreateMessageService = async (token, message) => {
    const response = await axios.post("http://127.0.0.1:8000/mrbug/messages/", message, {
        headers: {
            Authorization: token
        }
    }).catch(e => console.log(e))

    return response
}

export default CreateMessageService;