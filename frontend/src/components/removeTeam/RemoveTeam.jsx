import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import './RemoveTeam.css'
import { axiosDelete } from '../../utils/axiosRequestUtil/AxiosRequestUtil'
import { serverPath } from '../../api/service/ServerPath'
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil'
import { useDispatch, useSelector } from 'react-redux'
import { updateTeam } from '../../services/stateUpdate/UpdateTeam'
import { CheckTokenExpired } from '../../services/CheckTokenExpired'
import { NetworkError } from '../../services/networkErrors/NetworkErrors'
import { logout } from '../../api/store/Slices/LoginSlice'
import { useNavigate } from 'react-router-dom'

const RemoveTeam = (props) => {
    const navigate = useNavigate()
    const selectedProject = useSelector((state) => state.selectedProject)
    const projects = useSelector((state) => state.projects)
    const { removeTeam } = updateTeam()
    const dispatch = useDispatch()
    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    const token = `Token ${session_token.token}`


    const handleRemoveTeam = (teamId,setSelectedTeam) => {
        if (!CheckTokenExpired(session_token.expiry)) {
            axiosDelete(`${serverPath}/mrbug/team/${teamId}/`, token).then((value) => {
                if (value.status === 204) {
                    removeTeam(projects, selectedProject.id, props.selectedRelease.id, props.team, dispatch)
                    setSelectedTeam({
                        id: 0,
                        members_team: []
                    })
                }
            }).catch((error) => {
                props.openSnackBar('error', NetworkError(error))
            })
        } else {
            navigate('./login')
            dispatch(logout())
        }
    }

    return (
        <Dialog
            open={props.isRemoveTeamOpen}
            onClose={() => {
                props.setIsRemoveTeamOpen(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete Team?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`You are about to delete ${props.team.name} team.Note that this action can not be undone .Do you want to continue?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { props.setIsRemoveTeamOpen(false) }}>Disagree</Button>
                <Button
                    color='black'
                    onClick={() => {
                        handleRemoveTeam(props.team.id,props.setSelectedTeam)
                        props.setIsRemoveTeamOpen(false)
                    }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default RemoveTeam;