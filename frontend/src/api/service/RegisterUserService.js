import axios from "axios";
import { serverPath } from "./ServerPath";

//Method to create user account 
const RegisterUserService = async (user) => {
    const valid_user = {
            "username": user.username,
            "first_name": user.firstName,
            "last_name": user.LastName,
            "email": user.email,
            'password':user.password,
            "is_active": true
    }
    const response = (await axios.post(`${serverPath}/mrbug/users/create-account/`,valid_user).catch(err => {
        return err.response.data
    }))
    return response
}
export default RegisterUserService;