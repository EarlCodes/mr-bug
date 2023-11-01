import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import './RemoveBacklog.css'
import { axiosDelete } from '../../utils/axiosRequestUtil/AxiosRequestUtil'
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil'
import { updateBacklog } from '../../services/stateUpdate/UpdateBacklog'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { updateSelectedProject } from '../../services/UpdateSelectedProject'
import { serverPath } from '../../api/service/ServerPath'
import { CheckTokenExpired } from '../../services/CheckTokenExpired'
import { NetworkError } from '../../services/networkErrors/NetworkErrors'
import { SnackContext } from '../../pages/board/Services'

const RemoveBacklog = (props) => {
    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const session_token = JSON.parse(retrieveValueSessionStorage("token"))
    const dispatch = useDispatch()
    const openSnackBar = useContext(SnackContext)

    const { removeBacklog } = updateBacklog()

    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
    }, [projects])

    const handleRemoveBacklog = () => {
        if (!CheckTokenExpired(session_token.expiry)) {
            const token = `Token ${session_token.token}`
            axiosDelete(`${serverPath}/mrbug/backlog/${props.backlog.id}/`, token).then((value) => {
                if (value.status === 204) {
                    removeBacklog(projects, selectedProject.id, props.backlog, dispatch)
                }

            }).catch((error) => {
                openSnackBar('error', NetworkError(error))
            })
        }
    }
    return (
        <Dialog
            open={props.isRemoveBacklogOpen}
            onClose={() => {
                props.setIsRemoveBacklogOpen(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete backlog?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`You are about to delete ${props.backlog.tittle} backlog.Note that this action can not be undone .Do you want to continue?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { props.setIsRemoveBacklogOpen(false) }}>Disagree</Button>
                <Button
                    color='black'
                    onClick={() => {
                        handleRemoveBacklog()
                        props.setIsRemoveBacklogOpen(false)
                    }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RemoveBacklog