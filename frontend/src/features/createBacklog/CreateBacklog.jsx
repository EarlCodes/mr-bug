import { AppBar, Button, Dialog, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, Toolbar, Typography } from '@mui/material';
import PaletteColorIcon from '@mui/icons-material/Palette'
import CloseIcon from '@mui/icons-material/CloseRounded'
import CardMembership from '@mui/icons-material/CardMembershipRounded'
import './CreateBacklog.css'
import { useBacklogFieldErrors, useBacklogFields } from './Hooks';
import { axiosPost } from '../../utils/axiosRequestUtil/AxiosRequestUtil';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil';
import { updateBacklog } from '../../services/stateUpdate/UpdateBacklog';
import { useContext, useEffect } from 'react';
import { updateSelectedProject } from '../../services/UpdateSelectedProject';
import { serverPath } from '../../api/service/ServerPath';
import { CheckTokenExpired } from '../../services/CheckTokenExpired';
import { useNavigate } from 'react-router-dom';
import { NetworkError } from '../../services/networkErrors/NetworkErrors';
import { SnackContext } from '../../pages/board/Services';
import { logout } from '../../api/store/Slices/LoginSlice';

const CreateBacklog = (props) => {
    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const openSnackBar = useContext(SnackContext)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { backlog, setBacklogField, clearFields } = useBacklogFields()
    const { backlogFieldErrors, checkBacklogFieldErrorValid, isAllFieldsValid } = useBacklogFieldErrors()
    const { insertBacklog } = updateBacklog()
    const session_token = JSON.parse(retrieveValueSessionStorage("token"))

    const handleCreateBacklog = () => {
        if (!CheckTokenExpired(session_token.expiry)) {
            const token = `Token ${session_token.token}`
            axiosPost(`${serverPath}/mrbug/backlog/`, token, { ...backlog, release: props.release }).then((value) => {
                if (value.status === 201) {
                    insertBacklog(projects, selectedProject.id, value.data, dispatch)
                    props.setIsCreateBacklogOpen(false)
                    clearFields()
                    openSnackBar('success', `${value.data.tittle} backlog has been added`)
                }
            }).catch((error) => {
                props.setIsCreateBacklogOpen(false)
                openSnackBar('error', NetworkError(error))
            })
        } else {
            navigate('/login')
            dispatch(logout())
        }
    }

    const isFieldsBlank = () => {
        var isBlank = false
        if (backlog.tittle === '' | backlog.acceptence_criteria === '' | backlog.description === '' | backlog.story_points === '') {
            isBlank = true
        }
        return isBlank
    }


    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
    }, [projects])

    return (
        <Dialog
            fullScreen
            disablePortal
            open={props.isCreateBacklogOpen}
        >
            <section className='create-backlog-modal'>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Create backlog
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="close"
                            onClick={() => {
                                props.setIsCreateBacklogOpen(false)
                            }}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <form className='create-backlogs-container'>
                    <p className='create-project-backlog-des-lbl'>Backlog is a prioritized list of tasks needed to complete a certain milestone.Backlog has tasks that can be assigned to users.</p>

                    <TextField
                        required
                        label="Tittle"
                        value={backlog.tittle}
                        helperText={backlogFieldErrors.tittle.label}
                        error={backlogFieldErrors.tittle.isError}
                        onChange={(e) => {
                            setBacklogField('tittle', e.target.value)
                            checkBacklogFieldErrorValid('tittle', e.target.value)
                        }}
                        sx={{ width: 'fit-content' }}
                        variant="filled"
                        color='black' />

                    <TextField
                        required
                        multiline
                        rows={8}
                        sx={{ width: 'fit-content' }}
                        label="Description"
                        variant="filled"
                        color='black'
                        value={backlog.description}
                        helperText={backlogFieldErrors.description.label}
                        error={backlogFieldErrors.description.isError}
                        onChange={(e) => {
                            setBacklogField('description', e.target.value)
                            checkBacklogFieldErrorValid('description', e.target.value)
                        }}

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CardMembership color='black' />
                                </InputAdornment>
                            ),
                        }} />
                    <TextField
                        required
                        multiline
                        rows={8}
                        sx={{ width: 'fit-content' }}
                        label="Acceptance criteria"
                        variant="filled"
                        color='black'
                        value={backlog.acceptence_criteria}
                        helperText={backlogFieldErrors.acceptence_criteria.label}
                        error={backlogFieldErrors.acceptence_criteria.isError}
                        onChange={(e) => {
                            setBacklogField('acceptence_criteria', e.target.value)
                            checkBacklogFieldErrorValid('acceptence_criteria', e.target.value)
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CardMembership color='black' />
                                </InputAdornment>
                            ),
                        }} />
                    <TextField
                        required
                        label="Story Points"
                        variant="filled"
                        sx={{ width: 'fit-content' }}
                        color='black'
                        value={backlog.story_points}
                        helperText={backlogFieldErrors.story_points.label}
                        error={backlogFieldErrors.story_points.isError}
                        onChange={(e) => {
                            setBacklogField('story_points', e.target.value)
                            checkBacklogFieldErrorValid('story_points', e.target.value)
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CardMembership color='black' />
                                </InputAdornment>
                            ),
                        }}
                        type='number' />
                    <section className='create-project-backlog-color-name'>
                        <FormControl
                            variant="filled"
                            color='black'
                        >
                            <InputLabel id="demo-simple-select-filled-label">priority</InputLabel>
                            <Select
                                value={backlog.priority}
                                onChange={(e) => {
                                    setBacklogField('priority', e.target.value)
                                    checkBacklogFieldErrorValid('priority', e.target.value)
                                }}
                                labelId="demo-simple-select-filled-label"
                                defaultValue={'LOW'}>
                                <MenuItem value={'LOW'}>Low</MenuItem>
                                <MenuItem value={'MED'}>Medium</MenuItem>
                                <MenuItem value={'HIGH'}>High</MenuItem>
                            </Select>

                        </FormControl>


                    </section>
                    <FormControl variant="filled" color='black' sx={{ width: 'fit-content' }}>
                        <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                        <Select
                            value={backlog.status}
                            onChange={(e) => {
                                setBacklogField('status', e.target.value)
                                checkBacklogFieldErrorValid('status', e.target.value)
                            }}
                            labelId="demo-simple-select-filled-label"
                            defaultValue={'NOT_STARTED'}>
                            <MenuItem value={'NOT_STARTED'}>Not Started</MenuItem>
                            <MenuItem value={'WORKING_ON'}>Working On</MenuItem>
                            <MenuItem value={'DONE'}>Done</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        sx={{ width: '5%' }}
                        label="Color"
                        type='color'
                        variant="filled"
                        color='black'
                        value={backlog.color}
                        onChange={(e) => {
                            setBacklogField('color', e.target.value)
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PaletteColorIcon />
                                </InputAdornment>
                            ),
                        }} />

                    <Button
                        disabled={isFieldsBlank() ? true : false}
                        variant='contained'
                        onClick={() => {
                            if (!isFieldsBlank()) {
                                handleCreateBacklog()
                                props.setIsCreateBacklogOpen(false)
                            }
                        }}>Add Backlog</Button>
                </form>
            </section>

        </Dialog>
    )
}

export default CreateBacklog;