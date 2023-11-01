import './TasksPage.css'

import TasksBoard from '../../features/tasksBoard/TasksBoard';
import TaskActiveNotification from '../../features/taskActiveNotification/TaskActiveNotification';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { TaskSnackBarContext, getTasks } from './Services';
import { updateSelectedProject } from '../../services/UpdateSelectedProject';
import { Alert, Snackbar } from '@mui/material';
import { useSnackbar } from '../../hooks/UseSnackBar';

const TasksPage = () => {

    const user = useSelector(state => state.user)
    const projects = useSelector(state => state.projects)
    const selectedProject = useSelector(state => state.selectedProject)
    const {snackBar,openSnackBar,closeSnackBar} = useSnackbar()

    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([])


    useEffect(() => {
        setTasks(getTasks(projects.results, user))
        updateSelectedProject(projects, selectedProject, dispatch)
    }, [projects])

    return (
        <section className='task-page'>
            <header>
                <h1 className='task-page-header-label'>Tasks</h1>
            </header>
            <TaskSnackBarContext.Provider value={openSnackBar}>
                <TaskActiveNotification tasks={tasks} />
                <TasksBoard tasks={tasks} />
            </TaskSnackBarContext.Provider>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackBar.isOpen}
                onClose={closeSnackBar}
                autoHideDuration={5000} >
                <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
            </Snackbar>
        </section >
    )
}

export default TasksPage;