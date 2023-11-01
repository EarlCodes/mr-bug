import axios from "axios";
const UserProjectsService = async (token)=>{
    const response = await axios.get('http://127.0.0.1:8000/mrbug/projects/',{
        headers:{
            "Authorization" :token,
        },
    }).catch(err =>{
        console.log(err)
    })
    return response;
}

export default UserProjectsService;