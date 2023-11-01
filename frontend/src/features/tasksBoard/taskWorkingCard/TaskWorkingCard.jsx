import './TaskWorkingCard.css'
import { Badge, Button, IconButton } from '@mui/material';
import ProjectIcon from '@mui/icons-material/BusinessCenterOutlined'
import PlayIcon from '@mui/icons-material/PlayCircleFilled'
import PauseIcon from '@mui/icons-material/PauseCircleFilled'

import CommentIcon from '@mui/icons-material/Comment'
import TimerIcon from '@mui/icons-material/Timer'
import PriorityIcon from '@mui/icons-material/PriorityHigh'
import { convertDurationStringToDayJs } from '../../../services/DateConversions';
import { actualDuration, markTaskDone, pauseTask, playTask } from './Services';
import { useTimer } from '../../../hooks/useTimer';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TaskSnackBarContext } from '../../../pages/task/Services';


const TaskWorkingCard = (props) => {
    const { time, setTime, handlePlayTask, handleTaskPause } = useTimer()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const openSnackBar = useContext(TaskSnackBarContext)

    const task = props.task

    useEffect(() => {
        setTime(actualDuration(task.task_play, task.time_worked).format('DD HH:mm:ss'))
        if (task.status === "PLAY") {
            handlePlayTask();
        }
    }, [])

    const isTaskDue = (timeWorked, dueTime) => {
        const time = convertDurationStringToDayJs(timeWorked).asMilliseconds()
        const due = convertDurationStringToDayJs(dueTime).asMilliseconds()

        let isTaskDue = false
        if (time > due) {
            isTaskDue = true
        }

        return isTaskDue;
    }

    return (
        <article className='task-working-on-card'>
            <header className='task-working-on-header'>
                <div className='task-working-on-label-wrapper'>
                    <h3 className='task-working-on-header-label'>{task.tittle}</h3>
                    <div className='task-working-on-icon-wrapper' >
                        <ProjectIcon sx={{ width: '18px', height: '18px', color: '#36413E' }} />
                        <p className='task-working-on-icon-lbl'>{task.project.tittle}</p>
                    </div>
                </div>
                <Button
                    variant='text'
                    size='small'
                    onClick={() => {
                        if (task.status === "PLAY") {
                            handleTaskPause()
                            pauseTask(time, task.id, dispatch, navigate, openSnackBar)

                        } else {
                            handlePlayTask()
                            playTask(task.id, dispatch, openSnackBar, navigate, setTime, actualDuration)
                        }
                    }}
                    endIcon={task.status === "PLAY" ? <PauseIcon sx={{ color: '#EF000E' }} /> : <PlayIcon sx={{ color: '#056203' }} />} color='black'>{task.status === "PLAY" ? 'PAUSE' : 'PLAY'}</Button>
            </header>
            <p className='task-working-on-des-lbl'>{task.description}</p>
            <section className='task-working-on-bottom-wrapper'>
                <p className='task-working-on-timer-lbl'> <strong className='task-working-on-timer-es-lbl'>ASSIGNED</strong>-{new Date(task.time_assigned).toUTCString().slice(0, 16)}</p>
                <p className='task-working-on-timer-lbl'> <strong className='task-working-on-timer-st-lbl' >STARTED</strong>-{new Date(task.time_start).toUTCString().slice(0, 16)}</p>
                <div className='task-working-on-timer-wrapper'>
                    <TimerIcon sx={{ width: '18px', height: '18px', color: '#36413E' }} />
                    <p className='task-working-on-timer-lbl'>{task.status === "PLAY" ? time : task.time_worked}</p>
                </div>
                <p className='task-working-on-timer-lbl'> <strong className='task-working-on-timer-es-r-lbl'>Est</strong>{task.estimations}</p>
                {isTaskDue(task.time_worked, task.estimations) ? <PriorityIcon sx={{ width: '18px', height: '18px', color: '#EB1717' }} /> : <></>}
            </section>
            <div className='task-working-on-timer-lbl-wrapper'>
                <Button
                    onClick={() => {
                        task.status === 'PLAY' ? markTaskDone(time, task.id, dispatch, 
                            navigate, openSnackBar) : markTaskDone(task.time_worked, task.id, dispatch, navigate, openSnackBar)
                    }}
                    variant='contained'
                    size='small'>DONE</Button>
            </div>
        </article>
    )
}

export default TaskWorkingCard;