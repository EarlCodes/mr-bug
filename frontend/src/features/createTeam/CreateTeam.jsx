import './CreateTeam.css'
import { AppBar, Button, IconButton, Modal, TextField, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { useContext, useEffect, useState } from 'react';
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil';
import { axiosPost } from '../../utils/axiosRequestUtil/AxiosRequestUtil';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeam } from '../../services/stateUpdate/UpdateTeam';
import { updateSelectedProject } from '../../services/UpdateSelectedProject';
import { serverPath } from '../../api/service/ServerPath';
import { CheckTokenExpired } from '../../services/CheckTokenExpired';
import { useNavigate } from 'react-router-dom';
import { NetworkError } from '../../services/networkErrors/NetworkErrors';
import { SnackContext } from '../../pages/board/Services';
import { logout } from '../../api/store/Slices/LoginSlice';


const CreateTeam = (props) => {
    const navigator = useNavigate()
    const openSnackbar = useContext(SnackContext)

    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const dispatch = useDispatch()
    const [team, setTeam] = useState(({
        release_id: 0,
        project_id: selectedProject.id,
        name: '',
        description: ''
    }))
    const [teamErrors, setTeamErrors] = useState({
        name: {
            isError: false,
            label: ''
        },
        description: {
            isError: false,
            label: ''
        }
    })
    const { insertTeam, removeTeam } = updateTeam()
    const session_token = JSON.parse(retrieveValueSessionStorage('token'))


    const handleCreateTeam = () => {
        if (!CheckTokenExpired(session_token.expiry)) {
            const valid_token = `Token ${session_token.token}`

            axiosPost(`${serverPath}/mrbug/team/`, valid_token, team).then((value) => {
                if (value.status === 201) {
                    insertTeam(projects, selectedProject.id, props.release, value.data, dispatch)
                    openSnackbar('success', 'team has been added.')
                }
            }).catch((error) => {
                openSnackbar('error', NetworkError(error))
            })
        } else {
            navigator('/login')
            dispatch(logout)
        }

    }

    const handleValidateFields = (value, field) => {
        if (value == '') {
            setTeamErrors((prevState) => ({
                ...prevState,
                [field]: {
                    isError: true,
                    label: 'Field required'
                }
            }))
        } else {
            setTeamErrors((prevState) => ({
                ...prevState,
                [field]: {
                    isError: false,
                    label: ''
                }
            }))
        }
    }
    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
    }, [projects])

    return (

        <Modal
            onClose={() => {
                props.setIsTeamOpen(false)
            }}
            open={props.isTeamOpen}
            disablePortal
            style={{ position: 'absolute', width: '350px' }}>
            <section className='add-release-modal-container'>
                <AppBar sx={{ position: 'relative', borderRadius: '8px' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="section">
                            Create team
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                            onClick={() => {
                                props.setIsTeamOpen(false)
                            }}>
                            <CloseIcon />

                        </IconButton>
                    </Toolbar>
                </AppBar>
                <form className='add-release-modal-form'>
                    <TextField
                        label="Name"
                        variant='filled'
                        error={teamErrors.name.isError}
                        helperText={teamErrors.name.label}

                        onChange={(event) => {
                            handleValidateFields(event.target.value, "name")
                            setTeam((preState) => ({
                                ...preState,
                                name: event.target.value,
                                release_id: props.release
                            }))
                        }}
                        value={team.name}

                        sx={{ width: '100%' }} />
                    <TextField
                        label="Description"
                        variant='filled'
                        error={teamErrors.description.isError}
                        helperText={teamErrors.description.label}
                        onChange={(event) => {
                            handleValidateFields(event.target.value, "description")
                            setTeam((preState) => ({
                                ...preState,
                                description: event.target.value
                            }))
                        }}
                        value={team.description}

                        multiline
                        rows={2}
                        sx={{ width: '100%' }}
                    />
                    <Button
                        disabled={team.name !== '' & team.description !== '' ? false : true}
                        variant='contained'
                        onClick={() => {
                            handleCreateTeam()
                            props.setIsTeamOpen(false)
                            setTeam({
                                release_id: 0,
                                project_id: selectedProject.id,
                                name: '',
                                description: ''
                            })
                        }}
                    >CREATE Team</Button>
                </form>
            </section>
        </Modal>
    )
}

export default CreateTeam