import { Button, IconButton } from '@mui/material';
import './BacklogCard.css'
import VerifiedIcon from '@mui/icons-material/Verified'
import AddIcon from '@mui/icons-material/AddCircle'
import CalendarIcon from '@mui/icons-material/CalendarMonth'
import ColorPickerIcon from '@mui/icons-material/Palette'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateTask from '../../createTask/createTask';
import { useContext, useEffect, useState } from 'react';
import RemoveBacklog from '../../removeBacklog/RemoveBacklog';
import { axiosUpdate } from '../../../utils/axiosRequestUtil/AxiosRequestUtil';
import { retrieveValueSessionStorage } from '../../../utils/sessionStorage/SessionStorageUtil';
import { useDispatch, useSelector } from 'react-redux';
import { updateBacklog } from '../../../services/stateUpdate/UpdateBacklog';
import { updateSelectedProject } from '../../../services/UpdateSelectedProject';
import { SnackContext } from '../../../pages/board/Services';
import { serverPath } from '../../../api/service/ServerPath';
import { NetworkError } from '../../../services/networkErrors/NetworkErrors';
import { CheckTokenExpired } from '../../../services/CheckTokenExpired';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../api/store/Slices/LoginSlice';

const BacklogCard = (props) => {
    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const { modifyBacklog } = updateBacklog()
    const dispatch = useDispatch()
    const [isTaskOpen, setisTaskOpen] = useState(false)
    const [isRemoveBacklogOpen, setIsRemoveBacklogOpen] = useState(false)
    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    const [color, setColor] = useState(props.backlog.color)
    const OpenSnackBar = useContext(SnackContext)
    const navigate = useNavigate()

    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
    }, projects)

    const handleColorChange = () => {
        const token = `Token ${session_token.token}`
        if (!CheckTokenExpired(session_token.expiry)) {
            axiosUpdate(`${serverPath}/mrbug/backlog/${props.backlog.id}/`, token, { color: color }).then((value) => {
                if(value.status === 200){
                    modifyBacklog(projects, selectedProject.id, value.data, dispatch)
                    OpenSnackBar('success', `${props.backlog.tittle} backlog color has been changed`)
                }
            }).catch((error) => {
                OpenSnackBar('error', NetworkError(error))
            })
        }else{
            navigate("/login")
            dispatch(logout())
        }
    }
    return (
        <section className='backlog-card'>
            <article className='backlog-card-container'>
                <header className='backlog-card-header'>
                    <VerifiedIcon sx={{ width: '21px', height: '21px', color: '#056203' }} />
                    <h2 className='backlog-card-header-lbl'>{props.backlog.tittle}</h2>
                    <Button
                        endIcon={<AddIcon />}
                        sx={{ marginLeft: 'auto' }}
                        variant='contained'
                        onClick={() => {
                            setisTaskOpen(true)
                        }}
                        size='small'>task</Button>
                </header>
                <article className='backlog-card-requirement-container' >
                    <p className='backlog-card-des-lbl'>{props.backlog.description}</p>
                    <p className='backlog-card-ap-creteria-lbl'>Acceptance criteria</p>
                    <p className='backlog-card-des-lbl'>{props.backlog.acceptence_criteria}</p>
                </article>
            </article>
            <article className='backlog-card-bottom-container'>
                <div className='backlog-card-calander'>
                    <CalendarIcon sx={{ width: '21px', height: '21px', color: '#313937' }} />
                    <p className='backlog-card-calander-lbl'>{new Date(props.backlog.date_created).toUTCString().slice(4, 16)}</p>
                </div>
                <div className='backlog-card-status' >
                    <div className='backlog-card-status-indicator' />
                    <p className='backlog-card-status-lbl'>{props.backlog.priority}</p>
                </div>
                <div className='backlog-card-color-container'>
                    <ColorPickerIcon sx={{ width: '21px', height: '21px', color: '#313937' }} />
                    <input
                        value={color}
                        type='color'
                        onBlur={() => {
                            handleColorChange()
                        }}
                        onChange={(e) => {
                            setColor(e.target.value)
                        }} />
                </div>
                <IconButton size='small' onClick={() => {
                    setIsRemoveBacklogOpen(true)
                }}>
                    <DeleteIcon sx={{ width: '21px', height: '21px' }} />
                </IconButton>
            </article>
            <CreateTask
                isTaskOpen={isTaskOpen}
                setisTaskOpen={setisTaskOpen}
                backlog={props.backlog}
                teams={props.teams}
                releaseId={props.release}
            />
            <RemoveBacklog backlog={props.backlog} isRemoveBacklogOpen={isRemoveBacklogOpen} setIsRemoveBacklogOpen={setIsRemoveBacklogOpen} />
        </section>
    )
}

export default BacklogCard;