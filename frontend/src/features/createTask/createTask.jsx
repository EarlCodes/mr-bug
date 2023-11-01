import { AppBar, Avatar, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, Toolbar, Typography } from '@mui/material'
import './CreateTask.css'
import { useTask, useTaskErrors } from './Hooks'
import CloseIcon from '@mui/icons-material/CloseRounded'
import CardMembership from '@mui/icons-material/CardMembership'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';
import { DateTimeField } from '@mui/x-date-pickers'
import { useContext, useEffect, useState } from 'react'
import { axiosPost } from '../../utils/axiosRequestUtil/AxiosRequestUtil'
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil'
import { UpdateTask } from '../../services/stateUpdate/UpdateTask'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedProject } from '../../services/UpdateSelectedProject'
import { NetworkError } from '../../services/networkErrors/NetworkErrors'
import { SnackContext } from '../../pages/board/Services'
import { serverPath } from '../../api/service/ServerPath'
import { setNotifications } from '../../api/store/Slices/NotificationSlice'
import { useNavigate } from 'react-router-dom'
import { CheckTokenExpired } from '../../services/CheckTokenExpired'
import { logout } from '../../api/store/Slices/LoginSlice'

const CreateTask = (props) => {
    const teams = props.teams
    const backlog = props.backlog
    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const notifications = useSelector((state) => state.notifications)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const openSnackbar = useContext(SnackContext)

    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    const { insertTask } = UpdateTask()
    const [date, setDate] = useState({
        days: 0,
        time: dayjs('2022-04-17T01:00:00')
    })
    const { task, setTaskField, clearTaskField } = useTask()
    const { taskErrors, checkIsTaskFieldValid, isTaskValid, isAllFieldsValid } = useTaskErrors()

    const [selectedTeam, setSelectedTeam] = useState({
        name: '',
        members_team: []
    })

    const token = `Token ${session_token.token}`


    const sendAssigneeNote = (assigned, taskTittle, projectTittle) => {
        axiosPost(`${serverPath}/mrbug/notifications/`, token, {
            receiver: assigned,
            description: `You have been assigned to work on ${taskTittle} task of project ${projectTittle} .`
        }).catch((error) => {
            console.log(NetworkError(error))
        })
    }
    const handleCreateTask = () => {
        if (!CheckTokenExpired(session_token.expiry)) {

            axiosPost(`${serverPath}/mrbug/task/`, token, { ...task, estimations: `${date.days} ${date.time.format('HH:mm:ss')}` }).then((value) => {
                if (value.status === 201) {
                    insertTask(projects, selectedProject.id, props.releaseId, backlog.id, value.data, dispatch)
                    sendAssigneeNote(value.data.assigned_details.user.id, value.data.tittle, selectedProject.tittle)
                    openSnackbar('success', `${value.data.tittle} has been added to backlog ${backlog.tittle}`)
                }

            }).catch((error) => {
                openSnackbar(NetworkError(error))
            })
        } else {
            navigate('/login')
            dispatch(logout())
        }

    }

    const isCreateButtonEnabled = () => {
        var isEnabled = false
        if (task.tittle === '' | task.description === '' | task.assigned === 0) {
            isEnabled = true
        }
        return isEnabled
    }

    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
    }, [projects])

    return (
        <Modal
            fullScreen
            open={props.isTaskOpen}
            onClose={() => {
                props.setisTaskOpen(false)
                clearTaskField()
            }}
            disablePortal>
            <section className='create-task-modal'>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Create task
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                props.setisTaskOpen(false)
                                clearTaskField()
                            }}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <form className='create-task-form'>
                    <p className='create-project-backlog-des-lbl'> A task is a piece of work that needs to be worked on</p>
                    <TextField
                        required
                        label="Tittle"
                        variant="filled"
                        value={task.tittle}
                        error={taskErrors.tittle.isError}
                        helperText={taskErrors.tittle.label}
                        onChange={(event) => {
                            setTaskField('tittle', event.target.value)
                            checkIsTaskFieldValid('tittle', event.target.value)

                        }}
                        sx={{ width: 'fit-content' }}
                        color='black' />
                    <TextField
                        required
                        multiline
                        rows={8}
                        sx={{ width: 'fit-content' }}
                        label="Description"
                        variant="filled"
                        value={task.description}
                        error={taskErrors.description.isError}
                        helperText={taskErrors.description.label}
                        onChange={(event) => {
                            checkIsTaskFieldValid('description', event.target.value)
                            setTaskField('description', event.target.value)
                        }}
                        color='black'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CardMembership color='black' />
                                </InputAdornment>
                            ),
                        }} />

                    <article className='create-task-estimation-container'>
                        <p className='create-task-estimation-lbl'>Estimation</p>
                        <article className='create-task-estimation-time'>
                            <TextField
                                variant='filled'
                                sx={{ width: '80px' }}
                                label="Days"
                                type='number'
                                value={date.days}
                                onChange={(event) => {
                                    var days = event.target.value == '' ? 0 : parseInt(event.target.value)

                                    setDate((prevState) => ({
                                        ...prevState,
                                        days: days
                                    }))
                                }}
                                color='black' />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimeField
                                    variant='filled'
                                    sx={{ width: '140px' }}
                                    value={date.time}
                                    onChange={(event) => {
                                        setDate((prevState) => ({
                                            ...prevState,
                                            time: event

                                        }))
                                    }}
                                    label="estimation"
                                    defaultValue={"00:00:00"}
                                    format="hh:mm:ss" />
                            </LocalizationProvider>
                        </article>
                    </article>

                    <article className='create-task-assigned-container'>
                        <header>
                            <h3 className='create-task-estimation-lbl'>Assigned</h3>
                        </header>
                        <FormControl
                            variant="standard"
                            color='black'
                            sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-filled-label">Team</InputLabel>
                            <Select
                                value={selectedTeam}
                                onChange={(event) => {

                                    setSelectedTeam(event.target.value)
                                }}
                                labelId="demo-simple-select-filled-label">
                                {
                                    teams.map((team) => {
                                        return <MenuItem key={team.id} value={team}>
                                            <p className='create-task-profile-lbl'>{team.name}</p>
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl
                            variant="standard"
                            color='black'
                            sx={{ width: 'fit-content' }}>
                            <InputLabel id="demo-simple-select-filled-label">Member</InputLabel>
                            <Select
                                onChange={(event) => {
                                    setTaskField('assigned', event.target.value.id)
                                    setTaskField('backlog_id', backlog.id)
                                }}
                                labelId="demo-simple-select-filled-label">
                                {
                                    selectedTeam.members_team.map((member) => {
                                        return <MenuItem key={member.id} value={member}>
                                            <article className='create-task-profile-container'>
                                                <Avatar src={`assests/UserIcons/${member.user.user_profile.avatar}.png`}
                                                    sx={{ width: '24px', height: '24px' }} />
                                                <p className='create-task-profile-lbl'>{`${member.user.first_name} ${member.user.last_name}`}</p>
                                            </article>
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </article>
                    <Button
                        disabled={isCreateButtonEnabled()}
                        onClick={() => {
                            handleCreateTask()
                            props.setisTaskOpen(false)
                            clearTaskField()
                        }}
                        variant='contained'>Create task</Button>
                </form>
            </section>

        </Modal>
    )
}

export default CreateTask;