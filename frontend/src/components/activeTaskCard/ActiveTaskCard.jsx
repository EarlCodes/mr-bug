import { Button } from '@mui/material';
import './ActiveTaskCard.css'
import ProjectIcon from '@mui/icons-material/BusinessCenterOutlined'
import PauseIcon from '@mui/icons-material/PauseCircle'
import TimerIcon from '@mui/icons-material/Timer'
import { useContext, useEffect} from 'react';
import { useTimer } from '../../hooks/useTimer';
import { actualDuration, pauseTask } from './Services';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TaskSnackBarContext } from '../../pages/task/Services';

const ActiveTaskCard = (props) => {
    const task = props.task
    const { time, setTime,handleTaskPause,handlePlayTask} = useTimer()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const openSnackBar = useContext(TaskSnackBarContext)

    useEffect(() => {
        setTime(actualDuration(task.task_play,task.time_worked).format('DD HH:mm:ss'));
        handlePlayTask();

        return(()=>{
            handleTaskPause();
        })
    }, [])



    return (
        <article className='active-task-card'>
            <header className='active-task-card-header'>
                <article className='active-task-label-wrapper'>
                    <h3 className='active-task-label'>{task.tittle}</h3>
                    <article className='active-task-icon-label-wrapper'><ProjectIcon sx={{ width: '18px', height: '18px', color: '#36413E', marginLeft: '5px' }} /><p className='active-task-icon-label'>{task.project.tittle}</p></article>
                </article>
                <Button onClick={() => {
                    pauseTask(time, task.id, dispatch,navigate,openSnackBar)
                    handleTaskPause()
                }}
                    endIcon={<PauseIcon sx={{ color: '#EB1717' }} />}
                    color='black'
                    variant='text'>Pause</Button>
            </header>
            <section className='active-task-timer-assign-wrapper'>
                <p className='active-task-assign-lbl'><strong className='active-task-assign-st-lbl'>STARTED</strong> -{task.time_start}</p>
                <p className='active-task-assign-lbl'><strong className='active-task-assign-tm-lbl'>Est</strong> -{task.estimations}</p>
                <div className='active-task-timer-wrapper'>
                    <TimerIcon sx={{ width: '18px', height: '18px', color: '#C7EF00' }} />
                    <p className='active-task-timer-lbl'>{time}</p>
                </div>
            </section>
        </article>
    )
}

export default ActiveTaskCard;