import dayjs from "dayjs"
import { retrieveValueSessionStorage } from "../../../utils/sessionStorage/SessionStorageUtil"
import { axiosGet, axiosUpdate } from "../../../utils/axiosRequestUtil/AxiosRequestUtil"
import { setProjects } from "../../../api/store/Slices/ProjectsSlice"
import { serverPath } from "../../../api/service/ServerPath"
import { CheckTokenExpired } from "../../../services/CheckTokenExpired"
import { NetworkError } from "../../../services/networkErrors/NetworkErrors"
import { logout } from "../../../api/store/Slices/LoginSlice"

export const reworkTask = (taskId, dispatch, navigate, openSnackBar) => {
    const updateTaskValues = {
        status: "PAUSE",
        time_completed: null,
        time_worked: "00:00:00",
        time_start: null,
        progress: "TODO",
    }

    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    if (!CheckTokenExpired(session_token.expiry)) {
        const token = `token ${session_token.token}`
        axiosUpdate(`${serverPath}/mrbug/taskDetails/${taskId}/`, token, updateTaskValues).then((value) => {
            if (value.status === 200) {
                if (!CheckTokenExpired(session_token.expiry)) {
                    axiosGet(`${serverPath}/mrbug/projects/`, token).then((response) => {
                        if (response.status === 200) {
                            dispatch(setProjects(response.data))
                        }
                    }).catch((error) => {
                        openSnackBar('error', NetworkError(error))
                    })
                } else {
                    navigate('/login')
                    dispatch(logout)
                }
            }

        }).catch((error) => {
            openSnackBar('error', NetworkError(error))
        })
    } else {
        navigate('/login')
        dispatch(logout)
    }
} 