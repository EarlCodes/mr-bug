import { serverPath } from "../../api/service/ServerPath"
import { logout } from "../../api/store/Slices/LoginSlice"
import { setProjects } from "../../api/store/Slices/ProjectsSlice"
import { CheckTokenExpired } from "../../services/CheckTokenExpired"
import { axiosPost } from "../../utils/axiosRequestUtil/AxiosRequestUtil"
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil"

export const onFieldChange = (field, label, checkFieldNull, setProjectField) => {
    setProjectField(field, label)
    checkFieldNull(field, label)
}

export const onReleaseFieldChange = (field, label, checkReleaseFieldErrors, addProjectRelease) => {
    checkReleaseFieldErrors(field, label)
    addProjectRelease(field, label)
}

export const createProject = (project, isProjectFieldErrors, openSnackBar, usersProject, dispatch,navigate) => {

    const isFieldsValid = (project, isProjectFieldErrors) => {
        let isValid = false
        if (project.tittle === '' | project.description === '' | project.project_releases[0].tittle === '' | project.project_releases[0].purpose === '') {
            isValid = false
            console.log("false")
        } else {
            isValid = true
            console.log(isProjectFieldErrors())
            if (isProjectFieldErrors()) {
                isValid = false

            }
        }
        return isValid
    }

    const addProjectToStore = (usersProject, project, dispatch) => {
        const newUserProjects = {
            ...usersProject,
            count:usersProject.count + 1,
            results: [...usersProject.results, project]
        }
        dispatch(setProjects(newUserProjects))
    }

    if (isFieldsValid(project, isProjectFieldErrors)) {
        const token = JSON.parse(retrieveValueSessionStorage("token"))
        if (!CheckTokenExpired(token.expiry)) {
            axiosPost(`${serverPath}/mrbug/projects/`, `token ${token.token}`, project).then((value) => {
                if (value.status === 201) {
                    addProjectToStore(usersProject, value.data, dispatch)
                    openSnackBar('success', 'project created and has been added to project dashboard')
                }
            }).catch((error) => {
                //when the request to a server has been made and server responeded.
                if (error.response) {
                    if (error.response.status === 401) {
                        openSnackBar("error", "Could not authenticate your profile .Please login and try again")
                    }
                } else if (error.request) {
                    //when the request to a server has been made but no response from the server
                    openSnackBar("error", "Could not create project.The server did not respond.please try again and if the error persist please contact support.")
                } else {
                    openSnackBar("error", "Could not connect to server at the moment .if the error persist please contact support.")
                }
            })
        }else{
            navigate('/login')
            dispatch(logout)
        }

    } else {
        openSnackBar('error', 'project was not created , please check if required fields are filled')
    }
}
