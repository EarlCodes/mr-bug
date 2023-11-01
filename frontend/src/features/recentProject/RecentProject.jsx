import RecentProjectContainer from '../../components/recentProjectContainer/RecentProjectContainer';
import ProjectsSummary from '../projectsSummary/ProjectsSummary';
import './RecentProject.css'
import { List } from '@mui/material';

const RecentProject = (props) => {
    let project = 0

    return (
        <section className='recent-project-container'>
            <h2 className='recent-project-container-lbl'>Summary</h2>
            <ProjectsSummary projects = {props.projects} />
            <h2 className='recent-project-container-lbl'>Recent</h2>
            <List className='recent-project-list'>
                {
                    props.projects.results.slice(0,2).map((project) => {
                        return <li className='recent-project-item-list' key={project.id}>
                            <RecentProjectContainer project={project}  />
                        </li>
                    })
                }
            </List>
        </section>
    )
}

export default RecentProject;