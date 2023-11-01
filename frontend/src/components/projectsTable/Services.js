import dayjs from "dayjs"
import { serverPath } from "../../api/service/ServerPath"
import { logout } from "../../api/store/Slices/LoginSlice"
import { setProjects } from "../../api/store/Slices/ProjectsSlice"
import { setSelectedProject } from "../../api/store/Slices/SelectedProjectSlice"
import { CheckTokenExpired } from "../../services/CheckTokenExpired"
import { NetworkError } from "../../services/networkErrors/NetworkErrors"
import { axiosDelete, axiosGet } from "../../utils/axiosRequestUtil/AxiosRequestUtil"
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil"

export const deleteProject = (projectId, dispatch, navigate, openSnackBar,setIsLoading) => {
    setIsLoading(true)
    const token = JSON.parse(retrieveValueSessionStorage('token'))
    if (!CheckTokenExpired(token.expiry)) {
        const valid_token = `token ${token.token}`
        axiosDelete(`${serverPath}/mrbug/project/${projectId}/`, valid_token).then((response) => {
            if (response.status === 204) {
                getProjects(token, dispatch, navigate, openSnackBar)
                setIsLoading(false)
            }
        }).catch((error) => {
            openSnackBar('error', NetworkError(error))
            setIsLoading(false)
        })
    } else {
        navigate('/login')
        dispatch(logout())
    }

    const getProjects = (token, dispatch, navigate, openSnackBar) => {
        if (!CheckTokenExpired(token.expiry)) {
            const valid_token = `token ${token.token}`
            axiosGet(`${serverPath}/mrbug/projects/`, valid_token).then((response) => {
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
}

export const updateSelectedProject = (dispatch, project) => {
    dispatch(setSelectedProject(project))
}

export const isProjectDue = (dueDate) => {
    let isDue = false
    const date = dayjs(new Date(dueDate))
    if (dayjs().isAfter(date)) {
        isDue = true
    }
    return isDue
}

export const projectProgress = (project) => {
    var project_progress = 0

    var projects_tasks = []

    project.project_releases.map((release) => {
        release.release_backlogs.map((backlog) => {
            backlog.backlog_tasks.map((task) => {
                projects_tasks.push(task)
            })
        })
    })

    var completed_tasks = 0

    projects_tasks.map((task) => {
        if (task.progress === "DONE") {
            completed_tasks++
        }
    })

    return project_progress = (completed_tasks / projects_tasks.length) * 100
}