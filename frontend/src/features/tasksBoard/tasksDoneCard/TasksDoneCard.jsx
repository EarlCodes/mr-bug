import './TasksDoneCard.css'
import { Badge, Button, IconButton } from '@mui/material';
import ProjectIcon from '@mui/icons-material/BusinessCenterOutlined'
import PlayIcon from '@mui/icons-material/NotStarted'
import CommentIcon from '@mui/icons-material/Comment'
import TimerIcon from '@mui/icons-material/Timer'
import PriorityIcon from '@mui/icons-material/PriorityHigh'
import DoneIcon from '@mui/icons-material/Verified'
import { reworkTask } from './Service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TaskSnackBarContext } from '../../../pages/task/Services';

const TasksDoneCard = (props) => {
    const navigate = useNavigate()
    const openSnackBar = useContext(TaskSnackBarContext)

    const task = props.task
    const dispatch = useDispatch()

    return (
        <article className='tasks-done-card'>
            <header className='tasks-done-card-header'>
                <div className='tasks-done-card-tittle-wrapper'>
                    <h3 className='tasks-done-card-tittle'>{task.tittle}</h3>
                    <div className='tasks-done-card-icon-wrapper'>
                        <ProjectIcon sx={{width:'18px',height:'18px',color:"#36413E"}} />
                        <p className='tasks-done-card-icon-lbl'>{task.project.tittle}</p>
                    </div>
                </div>
                <article className='tasks-done-card-timer-wrapper'>
                    <TimerIcon sx={{width:'18px',height:'18px',color:"#36413E"}} />
                    <p className='tasks-done-card-timer-lbl'>{task.time_worked}</p>
                    <p className='tasks-done-card-timer-lbl'><strong className='tasks-done-card-timer-est-lbl'>Est</strong>{task.estimations}</p>
                    <DoneIcon sx={{color:'#056203'}} />
                </article>
            </header>
            <p className='tasks-done-card-des-lbl'>{task.description}</p>
            <div className='tasks-done-card-bottom-wrapper'>
                <p className='tasks-done-card-date-lbl'> <strong>ASSIGNED</strong>-{new Date(task.time_assigned).toUTCString().slice(4,16)}</p>
                <p className='tasks-done-card-date-lbl'> <strong className='tasks-done-card-date-st-lbl'>STARTED</strong>-{new Date(task.time_start).toUTCString().slice(4,16)}</p>
                <p className='tasks-done-card-date-lbl'> <strong className='tasks-done-card-date-cp-lbl'>COMPLETED</strong>-{new Date(task.time_completed).toUTCString().slice(4,16)}</p>
                <Button 
                onClick={()=>{
                    reworkTask(task.id,dispatch,navigate,openSnackBar)
                }}
                variant='contained' size='small'>Rework</Button> 
            </div>
        </article>
    )
}

export default TasksDoneCard;