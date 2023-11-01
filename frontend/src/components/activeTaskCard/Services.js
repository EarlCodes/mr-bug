import dayjs from "dayjs";
import { convertDurationStringToDayJs } from "../../services/DateConversions";
import { axiosGet, axiosUpdate } from "../../utils/axiosRequestUtil/AxiosRequestUtil";
import { setProjects } from "../../api/store/Slices/ProjectsSlice";
import { serverPath } from "../../api/service/ServerPath";
import { CheckTokenExpired } from "../../services/CheckTokenExpired";
import { logout } from "../../api/store/Slices/LoginSlice";
import { NetworkError } from "../../services/networkErrors/NetworkErrors";

export const actualDuration = (timePlay, timeWorked) => {
    var duration = require('dayjs/plugin/duration')
    var utc = require('dayjs/plugin/utc')
    var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
    dayjs.extend(timezone)
    dayjs.extend(utc)
    dayjs.extend(duration)

    var user_timezone = dayjs.tz.guess()
    const currentTime = dayjs().tz(user_timezone)
    const timePlayed = dayjs.tz(timePlay, user_timezone)

    var duration_elispesed = dayjs.duration(currentTime.diff(timePlayed), 'milliseconds')
    const actualDuration = duration_elispesed.add(convertDurationStringToDayJs(timeWorked));
    return actualDuration;
}

export const pauseTask = (time, taskId, dispatch, navigate, openSnackBar) => {
    const updateTaskValues = {
        status: "PAUSE",
        time_worked: time
    }

    const session_token = JSON.parse(sessionStorage.getItem('token'))
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
                    dispatch(logout())
                }
            }

        }).catch((error) => {
            openSnackBar('error', NetworkError(error))
        })
    } else {
        navigate('/login')
        dispatch(logout())
    }
} 