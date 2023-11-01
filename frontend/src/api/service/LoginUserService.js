import React, { useState } from 'react';
import axios from 'axios';
import { serverPath } from './ServerPath';

/**
 * Function used to login a specified user to the system.returns axios response  
 * @param {object} user - a user to login .object contains username and password 
 * @returns {axios.response}- an axios response
 */
const LoginUserService = async (user) => {
    const response = await axios.post(`${serverPath}/mrbug/login/`, user, {
        auth: {
            username: user.username,
            password: user.password
        }
    })
    return response
}

export default LoginUserService;