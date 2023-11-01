import { Badge, Button, IconButton } from '@mui/material';
import './TaskNotStartedCard.css'
import ProjectIcon from '@mui/icons-material/BusinessCenterOutlined'
import PlayIcon from '@mui/icons-material/NotStarted'
import CommentIcon from '@mui/icons-material/Comment'
import TimerIcon from '@mui/icons-material/Timer'
import { playTask } from './Service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TaskSnackBarContext } from '../../../pages/task/Services';


const TaskNotStartedCard = (props) => {
    const task = props.task
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const openSnackBar = useContext(TaskSnackBarContext)

    return (
        <article className='task-not-started-card'>
            <header className='task-not-started-header-card'>
                <div className='task-not-started-label-wrapper'>
                    <h3 className='task-not-started-label'>{task.tittle}</h3>
                    <div className='task-not-started-icon-wrapper' >
                        <ProjectIcon sx={{ marginLeft: '5px', width: '18px', height: '18px', color: 'black' }} />
                        <p className='task-not-started-project-lbl' >{task.project.tittle}</p>
                    </div>
                </div>
                <Button
                    variant='text'
                    onClick={() => { playTask(task.id, dispatch,navigate,openSnackBar) }}
                    endIcon={<PlayIcon />} color='black'>START</Button>
            </header>
            <p className='task-not-started-des-lbl'>{task.description}</p>
            <section className='task-not-started-bottom-wrapper' >
                <p className='task-not-started-es-lbl'> <strong className='task-not-started-es-d-lbl'>ASSIGNED</strong>{new Date(task.time_assigned).toUTCString().slice(0, 16)}</p>
                <div className='task-not-started-timer-wrapper'>
                    <TimerIcon sx={{ width: '18px', height: '18px', color: 'black' }} />
                    <p className='task-not-started-timer-lbl'>{task.time_worked}</p>
                </div>
                <p className='task-not-started-es-lbl'> <strong className='task-not-started-es-r-lbl'>Est</strong>{task.estimations}</p>
            </section>
        </article>
    )
}

export default TaskNotStartedCard;