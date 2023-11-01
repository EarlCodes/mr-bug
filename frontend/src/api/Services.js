import React, { useState } from 'react';
import axios from 'axios';
import { serverPath } from './service/ServerPath';

export const LoginUserService = async (user) => {
    const token = (await axios.post(`${serverPath}/mrbug/login/`, user, {
        auth: {
            username: user.username,
            password: user.password
        }
    }).catch(err => {
        console.log(err)
        console.log("something went wrong asap", err.response.data)
        return err.response.data
    }))

    return token
}

//Method to create user account 
export const RegisterUserService = async (user) => {
    const response = await axios.post(`${serverPath}/mrbug/users/create-account/`, user)
    return response
}
export default RegisterUserService;