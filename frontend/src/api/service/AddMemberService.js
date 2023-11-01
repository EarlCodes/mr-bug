import axios from "axios";

const AddMemberService = async (token,member)=>{
    const response = await axios.post("http://127.0.0.1:8000/mrbug/member/",member,{
        headers:{
            "Authorization":token
        }
    }).catch(e=>console.log(e))
    return response;
}

export default AddMemberService;