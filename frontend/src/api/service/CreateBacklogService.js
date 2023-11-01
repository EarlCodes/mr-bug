import axios from 'axios'

const CreateBacklogService = async (token,backlog)=>{
    const response = await axios.post("http://127.0.0.1:8000/mrbug/backlog/",backlog,{
        headers:{
            'authorization': token
        }
    }).catch(e => console.log(e))
    return response
}

export default CreateBacklogService;