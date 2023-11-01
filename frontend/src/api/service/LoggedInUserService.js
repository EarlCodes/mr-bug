import React from "react";
import axios from "axios";

const LoggedInUser = async (token)=>{
    const response = await axios.get('http://127.0.0.1:8000/mrbug/users/account/',{
        headers:{
            "Authorization" : token,
        },
    }).catch(err =>{
        console.log(err)
    })
    return response.data;
}

export default LoggedInUser;