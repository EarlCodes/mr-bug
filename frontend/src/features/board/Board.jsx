import { Badge, Button, List } from '@mui/material';
import './Board.css'
import AddIcon from '@mui/icons-material/AddCircle'
import BacklogCard from './backlogCard/BacklogCard';
import TaskCard from './taskCard/TaskCard';
import { useEffect, useState } from 'react';
import CreateBacklog from '../createBacklog/CreateBacklog';
import CreateTask from '../createTask/createTask';
import { useBacklogTasks } from './Hooks';

const Board = (props) => {
    const [isCreateBacklogOpen, setIsCreateBacklogOpen] = useState(false)
    const { backlogs, setDefaultBacklogs, sortTasks } = useBacklogTasks()

    useEffect(() => {
        setDefaultBacklogs(props.selectedRelease)
    }, [props.selectedRelease])

    const noTasksContainer = () => {
        return (
            <section className='no-board-task-lists-wrapper' >
                <img src='./assests/animations/NoteBoard.png' alt='No tasks' className='no-board-task-lists-img' />
                <p className='no-board-task-lists-txt'>No tasks</p>
            </section>
        )
    }
    return (

        <table className='board-table'>
            <tbody>
                <tr>
                    <th style={{ width: '25%' }}>
                        <article className='board-table-header-backlog'>
                            <p className='board-table-header-label'>Backlog</p>
                            <Badge badgeContent={props.selectedRelease.release_backlogs.length} color='primary' sx={{ marginLeft: '30px' }} />
                            <Button
                                endIcon={<AddIcon />}
                                size='small'
                                variant='contained'
                                onClick={() => {
                                    setIsCreateBacklogOpen(true)
                                }}
                                sx={{ marginLeft: 'auto', marginRight: '15px' }}>add backlog</Button>
                            <CreateBacklog isCreateBacklogOpen={isCreateBacklogOpen} setIsCreateBacklogOpen={setIsCreateBacklogOpen} release={props.selectedRelease.id} />
                        </article>
                    </th>
                    <th>
                        <article className='board-table-header'>
                            <p className='board-table-header-label'>Todo</p>
                        </article>
                    </th>
                    <th>
                        <article className='board-table-header'>
                            <p className='board-table-header-label'>Working on</p>
                        </article>
                    </th>
                    <th>
                        <article className='board-table-header'>
                            <p className='board-table-header-label'>Done</p>
                        </article>
                    </th>
                </tr>
                {
                    props.selectedRelease.release_backlogs.length != 0 ?
                        props.selectedRelease.release_backlogs.map((backlog) => {
                            let progressList = {
                                todo: [],
                                working_on: [],
                                done: []
                            }

                            const addProgressItem = (item) => {

                                const addItem = (list, item) => {
                                    const temp_list = [...progressList[list], item]
                                    progressList = {
                                        ...progressList,
                                        [list]: temp_list
                                    }
                                }

                                switch (item.progress) {
                                    case "TODO": addItem('todo', item)
                                        break;
                                    case "IN_PROGRESS": addItem('working_on', item)
                                        break;
                                    case "DONE": addItem('done', item)
                                }
                            }

                            backlog.backlog_tasks.map((task) => {
                                addProgressItem(task)
                            })

                            return <tr style={{ borderBottom: `5px dotted ${backlog.color}` }} key={backlog.id}>
                                <td className='board-task-data'>
                                    <BacklogCard backlog={backlog} teams={props.selectedRelease.teams_working_on} release={props.selectedRelease.id} />
                                </td>
                                <td className='board-task-data'>
                                    {
                                        progressList.todo.length != 0 ? <List className='board-task-lists'>
                                            {
                                                progressList.todo.map((task) => {
                                                    return <li key={task.id}>
                                                        <TaskCard task={task} color={backlog.color} backlog={backlog} />
                                                    </li>
                                                })
                                            }
                                        </List> : noTasksContainer()
                                    }

                                </td>
                                <td className='board-task-data'>
                                    {
                                        progressList.working_on.length != 0 ? <List className='board-task-lists'>
                                            {
                                                progressList.working_on.map((task) => {
                                                    return <li key={task.id}>
                                                        <TaskCard task={task} color={backlog.color} backlog={backlog} />
                                                    </li>
                                                })
                                            }
                                        </List> : noTasksContainer()
                                    }

                                </td>
                                <td className='board-task-data'>
                                    {
                                        progressList.done.length != 0 ?
                                            <List className='board-task-lists'>
                                                {
                                                    progressList.done.map((task) => {
                                                        return <li key={task.id}>
                                                            <TaskCard task={task} color={backlog.color} backlog={backlog} />
                                                        </li>
                                                    })
                                                }
                                            </List> : noTasksContainer()
                                    }
                                </td>
                            </tr>
                        }) : <tr>
                            <td colSpan="4" className='no-backlog-board-table-data'>
                                <section className='no-backlog-board-table-img-wrapper'>
                                    <img src='./assests/animations/TaskManagement.png' alt='No backlogs and tasks' className='no-backlog-board-table-img' />
                                    <p className='no-backlog-board-table-img-lbl'>Project has no backlog or tasks</p>
                                </section>
                            </td>
                        </tr>
                }

            </tbody>

        </table>
    )
}

export default Board;