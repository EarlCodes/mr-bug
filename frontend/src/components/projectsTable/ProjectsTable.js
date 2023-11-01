import './ProjectsTable.css'
import AndroidIcon from '@mui/icons-material/Android'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import DueIcon from '@mui/icons-material/AssignmentLate'
import { Avatar, Badge, IconButton, LinearProgress } from '@mui/material';
import { deleteProject, isProjectDue, projectProgress, updateSelectedProject } from './Services'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { LoadingContext } from '../../services/LoadingContext';


const ProjectsTable = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const setIsLoading = useContext(LoadingContext)
    const selectedProject = useSelector((state) => state.selectedProject)
    const user = useSelector((state) => state.user)

    return (
        <table className='projects-table'>
            <tbody>
                <tr className='projects-table-header-row'>
                    <th></th>
                    <th></th>
                    <th><p>Tittle</p></th>
                    <th><p>description</p></th>
                    <th><p>Owner</p></th>
                    <th><p>Created</p></th>
                    <th><p>Due</p></th>
                    <th><p>Progress</p></th>
                    <th><p>Requirments</p></th>
                    <th><p>Release</p></th>
                    <th></th>
                </tr>
                {
                    props.projects.results.map((project) => {
                        const progress = projectProgress(project)
                        return <tr className='projects-table-row'
                            key={project.id}
                            style={{ backgroundColor: selectedProject.id === project.id ? '#DADADA' : '#e5e5e5e5' }}
                            onClick={() => {
                                updateSelectedProject(dispatch, project)
                            }}>

                            <td>
                                {
                                    selectedProject.id === project.id ? <AndroidIcon sx={{ color: '#05EF00' }} /> : <></>
                                }
                            </td>
                            <td>{isProjectDue(project.due_date) ? <DueIcon sx={{ width: '18px', height: '18px', color: 'red' }} /> : <></>}</td>
                            <td><p className='projects-table-name-lbl' >{project.tittle}</p></td>
                            <td><p className='projects-table-des-lbl' >{project.description}</p></td>
                            <td className='projects-table-owner-data'>
                                <Avatar alt='ew' sx={{ width: '24px', height: '24px', bgcolor: `${project.project_owner.user_profile.bgcolor}` }}
                                    src={`../assests/UserIcons/${project.project_owner.user_profile.avatar}.png`} />
                                <article className='projects-table-owner-container'>
                                    <p className='projects-table-owner-name-lbl'>{`${project.project_owner.first_name} ${project.project_owner.last_name}`}</p>
                                    <p className='projects-table-owner-email-lbl'>{project.project_owner.email}</p>
                                </article>
                            </td>
                            <td><p className='projects-table-date'>{project.date_created.slice(0, 10)}</p></td>
                            <td><p className='projects-table-date'>{project.due_date.slice(0, 10)}</p></td>
                            <td>
                                <article className='projects-table-percent-container' >
                                    <p className='projects-table-percentage'>{isNaN(progress) ? 0 : progress.toFixed()}%</p>
                                    <LinearProgress value={ isNaN(progress) ? 0 : progress} variant='determinate' />
                                </article>
                            </td>
                            <td>
                                <article className='projects-table-container'>
                                    <Badge showZero badgeContent={project.project_requirements.length} color='primary' />
                                </article>
                            </td>
                            <td>
                                <article className='projects-table-container'>
                                    <Badge showZero badgeContent={project.project_releases.length} color='primary' />

                                    <p className='projects-table-backlog-lbl'></p>
                                </article>
                            </td>
                            <td>
                                {project.project_owner.id === user.id ?
                                    <IconButton onClick={() => { deleteProject(project.id, dispatch, navigate, props.openSnackBar,setIsLoading) }}>
                                        <DeleteIcon />
                                    </IconButton> : <></>
                                }
                            </td>
                        </tr>
                    })


                }
            </tbody>
        </table>
    )
}

export default ProjectsTable