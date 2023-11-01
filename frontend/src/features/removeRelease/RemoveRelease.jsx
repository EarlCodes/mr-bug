import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import './RemoveRelease.css'
import { updateRelease } from '../../services/stateUpdate/UpdateRelease'
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil'
import { axiosDelete } from '../../utils/axiosRequestUtil/AxiosRequestUtil'
import { useDispatch, useSelector } from 'react-redux'
import { serverPath } from '../../api/service/ServerPath'
import { updateSelectedProject } from '../../services/UpdateSelectedProject'
import { useContext, useEffect } from 'react'
import { NetworkError } from '../../services/networkErrors/NetworkErrors'
import { CheckTokenExpired } from '../../services/CheckTokenExpired'
import { SnackContext } from '../../pages/board/Services'
import { useNavigate } from 'react-router-dom'

const RemoveRelease = (props) => {
    const navigator = useNavigate()
    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const openSnackBar = useContext(SnackContext)
    const dispatch = useDispatch()
    const { removeRelease } = updateRelease()


    const deleteRelease = (release, projects, selectedProject, dispatch) => {
        const valid_token = JSON.parse(retrieveValueSessionStorage("token"))
        const token = `Token ${valid_token.token} `

        if (!CheckTokenExpired(valid_token.expiry)) {
            axiosDelete(`${serverPath}/mrbug/release/${release.id}/`, token).then((value) => {
                if (value.status === 204) {
                    removeRelease(projects, selectedProject.id, release, dispatch)
                    openSnackBar('success', `${release.tittle} release has been deleted.`)
                }
            }).catch((error) => {
                openSnackBar('error', NetworkError(error))
            })
        } else {
            navigator('/login')
        }
    }

    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
    }, [projects])

    return (
        <Dialog
            open={props.isRemoveReleaseOpen}
            onClose={() => {
                props.setIsRemoveReleaseOpen(false)
            }}>
            <DialogTitle id="alert-dialog-title">
                {"Delete Member?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`You are about to delete ${props.release.tittle} release.Note that this action can not be undone .Do you want to continue?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { props.setIsRemoveReleaseOpen(false) }}>Disagree</Button>
                <Button
                    color='black'
                    onClick={() => {
                        deleteRelease(props.release, projects, selectedProject, dispatch)
                        props.setIsRemoveReleaseOpen(false)
                    }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>)
}

export default RemoveRelease;