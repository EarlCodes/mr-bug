import axios from "axios";

const CreateReleaseService = async (token,release) => {
    const response = await axios.post("http://127.0.0.1:8000/mrbug/release/",release,{
        headers: {
            'authorization': token,
        }
    }).catch(e => {
        console.log(e)
    })
    return response;
}

export default CreateReleaseService

