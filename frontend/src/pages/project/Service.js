import { serverPath } from "../../api/service/ServerPath"
import { logout } from "../../api/store/Slices/LoginSlice"
import { setProjects } from "../../api/store/Slices/ProjectsSlice"
import { CheckTokenExpired } from "../../services/CheckTokenExpired"
import { axiosGet } from "../../utils/axiosRequestUtil/AxiosRequestUtil"

export const getProjects = (token, dispatch,navigate) => {
    const valid_token = `token ${token.token}`

    if(!CheckTokenExpired(token.expiry)){
        axiosGet(`${serverPath}/mrbug/projects/`, valid_token).then((value) => {
            dispatch(setProjects(value.data))
        }).catch((err) => {
            console.log(err)
        })
    }else{
        navigate('/login')
        dispatch(logout())
    }
    


}