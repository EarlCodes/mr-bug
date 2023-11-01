import {List} from '@mui/material';
import './TasksBoard.css'
import TaskNotStartedCard from './taskNotStartedCard/TaskNotStartedCard';
import TaskWorkingCard from './taskWorkingCard/TaskWorkingCard';
import TasksDoneCard from './tasksDoneCard/TasksDoneCard';
import { useTasks } from './Hooks';
import { useEffect } from 'react';


const TasksBoard = (props) => {
    const { tasks, sortTasks, clearTasks } = useTasks()

    useEffect(() => {
        sortTasks(props.tasks)

        return () => {
            clearTasks()
        }

    }, [props.tasks])

    const noTaskContainer = (label) => {
        return (
            <section className='no-list-item-task-board-container' >
                <img src='./assests/animations/PinNote.png' alt='No Task' className='no-list-item-task-board-img' />
                <p className='no-list-item-task-board-lbl'>You have no tasks {label}</p>
            </section>
        )
    }

    return (

        props.tasks.length != 0 ? <section className='tasks-board-wrapper'>
            <section className='tasks-boards-wrapper'>
                <section className='tasks-boards-not-section'>
                    <div className='tasks-boards-header-wrapper'>
                        <h3 className='tasks-boards-header-lbl'>Not started</h3>
                        <p className='tasks-boards-header-label'>{tasks.not_started.length}</p>
                    </div>
                    {
                        tasks.not_started.length != 0 ? <List className='tasks-not-boards-list'>
                            {
                                tasks.not_started.map((task) => {
                                    return <li key={task.id} className='list-item-task-board'>
                                        <TaskNotStartedCard task={task} />
                                    </li>
                                })
                            }
                        </List> : noTaskContainer('not started')
                    }
                </section>
                <section className='tasks-boards-section'>
                    <div className='tasks-boards-header-wrapper'>
                        <h3 className='tasks-boards-header-lbl'>Working On</h3>
                        <p className='tasks-boards-header-label'>{tasks.working_on.length}</p>
                    </div>
                    {
                        tasks.working_on.length != 0 ?
                            <List className='tasks-not-boards-list'>
                                {
                                    tasks.working_on.map((task) => {
                                        return <li key={task.id} className='list-item-task-board' >
                                            <TaskWorkingCard task={task} />
                                        </li>
                                    })
                                }
                            </List> : noTaskContainer('working on')
                    }
                </section>
                <section className='tasks-boards-section'>
                    <div className='tasks-boards-header-wrapper'>
                        <h3 className='tasks-boards-header-lbl'>Done</h3>
                        <p className='tasks-boards-header-label'>{tasks.done.length}</p>
                    </div>
                    {
                        tasks.done.length != 0 ?
                            <List className='tasks-not-boards-list'>
                                {
                                    tasks.done.map((task) => {
                                        return <li key={task.id} className='list-item-task-board'>
                                            <TasksDoneCard task={task} />
                                        </li>
                                    })
                                }

                            </List> : noTaskContainer('done')}
                </section>
                
            </section>
        </section > : <section className='task-board-notes-container'>
            <img src='./assests/animations/Note.png' alt='Note' className='task-board-notes-img' />
            <p className='task-board-notes-lbl'>You have no task assigned.</p>
        </section>
    )
}
export default TasksBoard;