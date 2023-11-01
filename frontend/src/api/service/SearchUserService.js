import axios from 'axios';

const SearchUserService = async (token,username) =>{
    const response  = await axios.get(`http://127.0.0.1:8000/mrbug/users/?search=${username}`,{
        headers:{
            "Authorization":token
        }
    }).catch(e=>console.log(e))

    return response;
}

export default SearchUserService;

