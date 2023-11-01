import './ProjectsSummary.css'
import ProjectsIcon from '@mui/icons-material/AssignmentIndOutlined'
import DoneIcon from '@mui/icons-material/Verified'
import ProgressIcon from '@mui/icons-material/Handyman'
import AssesmentIcon from '@mui/icons-material/AssignmentLate'
import { completedProjects, dueProjects, getCompletedProjects, inProgressProjects, usersProjects } from './Services'
import { useSelector } from 'react-redux'

const ProjectsSummary = (props) => {
    const user = useSelector((state) => state.user)
    return (
        <article className='projects-summary'>
            <article className='projects-container'>
                <p className='projects-container-label'>All</p>
                <article className='projects-value-container'>
                    <p className='projects-value-label'>{props.projects.results.length}</p>
                </article>
            </article>
            <article className='projects-container'>
                <p className='projects-container-label'>Projects</p>
                <article className='projects-value-container'>
                    <p className='projects-value-label'>{usersProjects(props.projects,user)}</p>
                    <ProjectsIcon sx={{width:'21px',height:'21px'}} color='tertiary' />
                </article>
            </article>
            <article className='projects-container'>
                <p className='projects-container-label'>Completed</p>
                <article className='projects-value-container'>
                    <p className='projects-value-label'>{getCompletedProjects((props.projects))}</p>
                    <DoneIcon sx={{width:'21px',height:'21px',color:'#198754'}}/>
                </article>
            </article>
            <article className='projects-container'>
                <p className='projects-container-label'>In progress</p>
                <article className='projects-value-container'>
                    <p className='projects-value-label'>{inProgressProjects(props.projects)}</p>
                    <ProgressIcon sx={{width:'21px',height:'21px'}} color='tertiary' />
                </article>
            </article>
            <article className='projects-container'>
                <p className='projects-container-label'>Due</p>
                <article className='projects-value-container'>
                    <p className='projects-value-label'>{dueProjects(props.projects)}</p>
                    <AssesmentIcon sx={{width:'21px',height:'21px',color:'#ff3333'}}/>
                </article>
            </article>
        </article>
    )
}

export default ProjectsSummary;