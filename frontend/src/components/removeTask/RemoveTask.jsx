import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import './RemoveTask.css'
import { axiosDelete, axiosPost } from '../../utils/axiosRequestUtil/AxiosRequestUtil'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateTask } from '../../services/stateUpdate/UpdateTask'
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil'
import { useContext, useEffect } from 'react'
import { updateSelectedProject } from '../../services/UpdateSelectedProject'
import { serverPath } from '../../api/service/ServerPath'
import { CheckTokenExpired } from '../../services/CheckTokenExpired'
import { SnackContext } from '../../pages/board/Services'
import { NetworkError } from '../../services/networkErrors/NetworkErrors'

const RemoveTask = (props) => {
    const { removeTask } = UpdateTask()
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    const openSnackBar = useContext(SnackContext)

    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
    }, [projects])

    const handleRemoveTask = () => {

        if (!CheckTokenExpired(session_token.expiry)) {
            const token = `Token ${session_token.token}`
            axiosDelete(`${serverPath}/mrbug/taskDetails/${props.task.id}/`, token).then((value) => {
                if (value.status === 204) {
                    removeTask(projects, selectedProject.id, props.backlog, props.task, dispatch)
                    alertAssignedUser(props.task.assigned_details.user, props.task.tittle, selectedProject.tittle,token)
                }
            }).catch((error) => {
                openSnackBar('error', NetworkError(error))
            })
        }

        const alertAssignedUser = (user, taskTittle, projectTittle, token) => {
            axiosPost(`${serverPath}/mrbug/notifications/`, token, {
                receiver: user.id,
                description: `The following task you have been assigned to work on ${taskTittle} task of project ${projectTittle} has been removed.`
            }).catch((error) => {
                console.log(NetworkError(error))
            })
        }
    }

    return (
        <Dialog
            open={props.isRemoveTaskOpen}
            onClose={() => {
                props.setIsRemoveTaskOpen(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete Task?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`You are about to delete ${props.task.tittle} task.Note that this action can not be undone .Do you want to continue?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { props.setIsRemoveTaskOpen(false) }}>Disagree</Button>
                <Button
                    color='black'
                    onClick={() => {
                        handleRemoveTask()
                        props.setIsRemoveTaskOpen(false)
                    }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RemoveTask;