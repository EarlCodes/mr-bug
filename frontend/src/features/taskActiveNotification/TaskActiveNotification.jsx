import { Badge, List } from '@mui/material';
import './TaskActiveNotification.css'
import ActiveTaskCard from '../../components/activeTaskCard/ActiveTaskCard';
import { useEffect, useState } from 'react';

const TaskActiveNotification = (props) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        let task_list = []

        props.tasks.map((task) => {
            if (task.status === "PLAY" & task.progress === "IN_PROGRESS") {
                task_list.push(task)
            }
        })
        setTasks(task_list)

    }, [props.tasks])

    return (

        tasks.length != 0 ?
            <article className='active-task-wrapper'>
                <h3 className='active-task-header-label'>Active tasks</h3>
                <List className='active-tasks-list'>
                    {
                        tasks.map((task) => {
                            return <li key={task.id}>
                                <ActiveTaskCard task={task} />
                            </li>
                        })
                    }
                </List>
            </article> : <></>

    )
}

export default TaskActiveNotification;