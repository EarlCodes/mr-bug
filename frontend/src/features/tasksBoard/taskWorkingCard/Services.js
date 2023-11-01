import dayjs from "dayjs"
import { retrieveValueSessionStorage } from "../../../utils/sessionStorage/SessionStorageUtil"
import { axiosGet, axiosUpdate } from "../../../utils/axiosRequestUtil/AxiosRequestUtil"
import { setProjects } from "../../../api/store/Slices/ProjectsSlice"
import { convertDurationStringToDayJs } from "../../../services/DateConversions"
import { serverPath } from "../../../api/service/ServerPath"
import { CheckTokenExpired } from "../../../services/CheckTokenExpired"
import { logout } from "../../../api/store/Slices/LoginSlice"
import { NetworkError } from "../../../services/networkErrors/NetworkErrors"

var duration = require('dayjs/plugin/duration')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(duration)

export const playTask = (taskId, dispatch, openSnackBar, navigate, setTime, actualDuration) => {
    var user_timezone = dayjs.tz.guess()
    const updateTaskValues = {
        status: "PLAY",
        task_play: dayjs().utc(true),
    }

    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    const token = `token ${session_token.token}`

    if (!CheckTokenExpired(session_token.expiry)) {
        axiosUpdate(`${serverPath}/mrbug/taskDetails/${taskId}/`, token, updateTaskValues).then((value) => {
            if (value.status === 200) {
                setTime(actualDuration(value.data.task_play, value.data.time_worked).format('DD HH:mm:ss'))
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

export const actualDuration = (timePlay, timeWorked) => {
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
        time_worked: time,
    }

    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    if (!CheckTokenExpired(session_token.expiry)) {
        const token = `token ${session_token.token}`

        axiosUpdate(`${serverPath}/mrbug/taskDetails/${taskId}/`, token, updateTaskValues).then((value) => {
            if (value.status === 200) {
                if (!CheckTokenExpired(session_token.expiry)) {
                    axiosGet(`${serverPath}/mrbug/projects/`, token).then((response) => {
                        if (value.status === 200) {
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

export const markTaskDone = (time, taskId, dispatch, navigate, openSnackBar) => {
    const updateTaskValues = {
        status: "PAUSE",
        time_worked: time,
        time_completed: dayjs().format('YYYY-MM-DD'),
        progress: "DONE"
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