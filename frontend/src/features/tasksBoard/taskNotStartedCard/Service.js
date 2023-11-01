import dayjs from "dayjs"
import { axiosGet, axiosUpdate } from "../../../utils/axiosRequestUtil/AxiosRequestUtil"
import { retrieveValueSessionStorage } from "../../../utils/sessionStorage/SessionStorageUtil"
import { setProjects } from "../../../api/store/Slices/ProjectsSlice"
import { serverPath } from "../../../api/service/ServerPath"
import { NetworkError } from "../../../services/networkErrors/NetworkErrors"
import { CheckTokenExpired } from "../../../services/CheckTokenExpired"
import { logout } from "../../../api/store/Slices/LoginSlice"


export const playTask = (taskId, dispatch, navigate, openSnackBar) => {
    const updateTaskValues = {
        status: "PLAY",
        time_start: dayjs().format('YYYY-MM-DD'),
        task_play: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        progress: "IN_PROGRESS"
    }

    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    const token = `token ${session_token.token}`

    if (!CheckTokenExpired(session_token.expiry)) {
        axiosUpdate(`${serverPath}/mrbug/taskDetails/${taskId}/`, token, updateTaskValues).then((value) => {
            if (value.status === 200) {
                axiosGet(`${serverPath}/mrbug/projects/`, token).then((response) => {
                    console.log(response)
                    if (value.status === 200) {
                        dispatch(setProjects(response.data))
                    }
                }).catch((error) => {
                    openSnackBar('error', NetworkError(error))
                })
            }

        }).catch((error) => {
            openSnackBar('error', NetworkError(error))
        })
    } else {
        navigate('/login')
        dispatch(logout())
    }

} 