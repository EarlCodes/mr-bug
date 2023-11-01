import axios from "axios";

const CreateTeamService = async (token ,team)=>{
    const response = await  axios.post("http://127.0.0.1:8000/mrbug/team/",team,{
        headers:{
            "Authorization":token
        }
    }).catch(e=>console.log(e))
    return response;
}

export default CreateTeamService;