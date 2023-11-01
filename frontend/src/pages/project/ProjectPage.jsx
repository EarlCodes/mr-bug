import ProjectSelector from '../../features/projectSelector/ProjectSelector';
import RecentProject from '../../features/recentProject/RecentProject';
import './ProjectPage.css'
import ProjectsTable from '../../components/projectsTable/ProjectsTable';
import { Alert, Button, Snackbar } from '@mui/material';
import CreateProject from '../../features/createProject/CreateProject';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from './Service';
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil';
import { useEffect } from 'react';
import { setSelectedProject } from '../../api/store/Slices/SelectedProjectSlice';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../hooks/UseSnackBar';
import { LoadingContext } from '../../services/LoadingContext';

const ProjectPage = () => {
    const setIsLoading = useContext(LoadingContext)

    const [isCreateProject, setIsCreateProject] = useState(false)
    const dispatch = useDispatch()
    const { snackBar, openSnackBar, closeSnackBar } = useSnackbar()

    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const navigate = useNavigate()

    useEffect(() => {
        const token = JSON.parse(retrieveValueSessionStorage('token'))
        getProjects(token, dispatch, navigate)
    }, [])

    useEffect(() => {
        setIsLoading(true)
        if (projects.count > 0) {
            if (selectedProject.id === 0) {
                dispatch(setSelectedProject(projects.results.slice(0, 1)[0]))
            }
        }
        setIsLoading(false)
    }, [projects])


    return (
        <section className='project-page'>
            {
                projects.count !== 0 ? <>
                    <header>
                        <h1 className='project-page-header-label'>Projects</h1>
                    </header>
                    <section className='selected-recent-project-container'>
                        <RecentProject projects={projects} />
                        <ProjectSelector projects={projects} />
                    </section>
                    <section className='projects-section'>
                        <h2 className='projects-section-label'>All Projects</h2>
                        <Button variant='contained' sx={{ marginLeft: 'auto' }} onClick={() => {
                            setIsCreateProject(true)
                        }}>Create project</Button>
                        <ProjectsTable projects={projects} openSnackBar={openSnackBar} />
                        <p className='projects-section-total-lbl' >{`${projects.results.length} projects`}</p>
                    </section>
                </> : <section className='no-project-wrapper'>
                    <section className='no-project-label-wrapper'>
                        <p className='no-project-label-tag'>Your all-in-one solution for effective project oversight and task monitoring.</p>
                        <p className='no-project-label-tag-slogan'>SAY GOODBYE TO COMPLEX SPREEDSHEETS AND SCATTERED COMMUNICATION.</p>
                        <p className='no-project-label-tag-des'>Mr.Bug offers seamless project creation ,task assignment and progress tracking .it empowers
                            users to efficiently manage projects by providing clear task durations ,time tracking for accurate
                            work hours ,team members .With built-in chat functionality ,users can easily collaborate and
                            communicate ,fostering efficient teamwork throughout the project life cycle.</p>
                        <Button
                            sx={{ borderRadius: '18px', width: '50%' }}
                            size='large'
                            variant='contained'
                            onClick={() => {
                                setIsCreateProject(true)
                            }}>Create project</Button>
                    </section>
                    <img src={'/assests/ColorsShape.png'} alt='animation' className='no-project-wrapper-shapes-icon' />
                    <img src={'/assests/animations/GroupOfPeople.png'} alt='animation' className='no-project-wrapper-icon' />
                </section>
            }
            <CreateProject
                openSnackBar={openSnackBar}
                setIsCreateProject={setIsCreateProject}
                isCreateProject={isCreateProject} />

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

export default ProjectPage;