import axios from 'axios'

const CreateBugService = async (token,bug)=>{
    const response = await axios.post("http://127.0.0.1:8000/mrbug/bug/",bug,{
        headers:{
            "authorization":token
        }
    }).catch(e=>console.log(e))
    return response;
}
export default CreateBugService;