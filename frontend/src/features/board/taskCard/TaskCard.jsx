import { Avatar, Badge, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import TimerIcon from '@mui/icons-material/TimerOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import CommentIcon from '@mui/icons-material/Comment'
import CautionsIcon from '@mui/icons-material/PriorityHigh'
import ExpandIcon from '@mui/icons-material/ExpandMore'
import './TaskCard.css'
import { useState } from 'react';
import RemoveTask from '../../../components/removeTask/RemoveTask';
import CreateTask from '../../createTask/createTask';
import dayjs from 'dayjs';
import { convertDurationStringToDayJs } from '../../../services/DateConversions';
import { actualDuration } from './Services';


const TaskCard = (props) => {
    const [isTaskOpen, setisTaskOpen] = useState(false)
    const [isRemoveTaskOpen, setIsRemoveTaskOpen] = useState(false)
    var duration = require('dayjs/plugin/duration')
    dayjs.extend(duration)

    const task = props.task

    return (
        <article
            className='task-card'
            style={{ backgroundColor: `${props.color}` }}
            onClick={() => {
                setisTaskOpen(!isTaskOpen)
            }}>
            <RemoveTask isRemoveTaskOpen={isRemoveTaskOpen} setIsRemoveTaskOpen={setIsRemoveTaskOpen} task={task} backlog={props.backlog} />
            <header className='task-card-header'>
                <div className='task-card-header-container'>
                    <p className='task-card-header-lbl'>{task.tittle}</p>
                    <article className='task-card-timer-container'>
                        <TimerIcon sx={{ width: '18px', height: '18px', color: '#313937' }} />
                        <p className='task-card-timer-lbl'>{task.time_worked}</p>
                        <p className='task-card-timer-lbl'><strong className='task-card-timer-es-lbl'> Est </strong>{task.estimations }</p>
                        {
                            convertDurationStringToDayJs(task.time_worked).asMilliseconds() > convertDurationStringToDayJs(task.estimations).asMilliseconds() ? <CautionsIcon sx={{ width: '18px', height: '18px', color: 'red' }} /> : <></>
                        }
                    </article>
                </div>
                <div className='task-card-assigned-container'>
                    <Avatar src={`assests/UserIcons/${task.assigned_details.user.user_profile.avatar}.png`} alt='alt' sx={{ width: '24px', height: '24px' }} />
                    <p className='task-card-assigned-label'>{`${task.assigned_details.user.first_name} ${task.assigned_details.user.last_name}`}</p>
                    <IconButton size='small'>
                        <ExpandIcon />
                    </IconButton>
                </div>

                <IconButton size='small' onClick={() => {
                    setIsRemoveTaskOpen(true)
                }}>
                    <DeleteIcon sx={{ width: '18px', height: '18px' }} />
                </IconButton>
            </header>
            {
                isTaskOpen ? <section className='task-card-bottom-container' >
                    <p className='task-card-bottom-label'>{task.description}</p>
                    <article className='task-card-bottom-comment-container'>
                        <p className='task-card-bottom-lbl'><strong>Assigned</strong>-{new Date(task.time_assigned).toUTCString().slice(4, 16)}</p>
                        {
                            task.progress === 'TODO' ? <></> : <p className='task-card-bottom-lbl'><strong>Start</strong>-{new Date(task.time_start).toUTCString().slice(4, 16)}</p>
                        }
                        {
                            task.progress === 'DONE' ? <p className='task-card-bottom-lbl'><strong>Completed</strong>-{new Date(task.time_completed).toUTCString().slice(4, 16)}</p> : <></>
                        }
                    </article>

                </section> : <></>
            }
        </article>
    )
}
export default TaskCard;