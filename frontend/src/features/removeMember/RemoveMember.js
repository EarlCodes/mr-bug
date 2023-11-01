import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import './RemoveMember.css'
import { UpdateMember } from '../../services/stateUpdate/UpdateMember'
import { axiosDelete, axiosPost } from '../../utils/axiosRequestUtil/AxiosRequestUtil'
import { serverPath } from '../../api/service/ServerPath'
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil'
import { useDispatch, useSelector } from 'react-redux'
import { CheckTokenExpired } from '../../services/CheckTokenExpired'
import { logout } from '../../api/store/Slices/LoginSlice'
import { NetworkError } from '../../services/networkErrors/NetworkErrors'
import { useNavigate } from 'react-router-dom'

const RemoveMember = (props) => {
    const { removeMember } = UpdateMember()
    const navigate = useNavigate()
    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const dispatch = useDispatch()

    const handleRemoveMember = (member) => {
        const session_token = JSON.parse(retrieveValueSessionStorage("token"))
        if (!CheckTokenExpired(session_token.expiry)) {
            const token = `Token ${session_token.token}`
            axiosDelete(`${serverPath}/mrbug/member/${member.id}/`, token).then((value) => {
                if (value.status === 204) {
                    removeMember(projects, selectedProject.id, props.release.id, props.team.id, member, dispatch)
                    alertRemovedUser(member.user,selectedProject.tittle,token)
                }
            }).catch((error) => {
                props.openSnackBar('error', NetworkError(error))
            })
        } else {
            navigate('/login')
            dispatch(logout())
        }
        
        const alertRemovedUser = (user, projectTittle, token) => {
            axiosPost(`${serverPath}/mrbug/notifications/`, token, {
                receiver: user.id,
                description: `You have been removed as a member from the following project ${projectTittle} .`
            }).catch((error) => {
                console.log(NetworkError(error))
            })
        }
    }

    return (
        <Dialog
            open={props.isRemoveMemberOpen}
            onClose={() => {
                props.setIsRemoveMemberOpen(false)
            }}>
            <DialogTitle id="alert-dialog-title">
                {"Delete Member?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`You are about to delete ${props.member.user.last_name} ${props.member.user.first_name} as a member.Note that each task assigned to the user will also be deleted.Do you want to continue?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { props.setIsRemoveMemberOpen(false) }}>Disagree</Button>
                <Button
                    color='black'
                    onClick={() => {
                        handleRemoveMember(props.member)
                        props.setIsRemoveMemberOpen(false)
                    }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RemoveMember;