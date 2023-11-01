import { Badge } from '@mui/material'
import './ProjectItemStats.css'

const ProjectItemStats = (props) => {
    return (
        <article className='project-item-stats'>
            <header>
                <p className='project-item-stats-label'>{props.label}</p>
            </header>
            <section className='project-item-stats-value-container'>
                <Badge showZero  badgeContent={props.completed} color='primary' />
                <Badge showZero  badgeContent={props.total} color='tertiary' />
            </section>
        </article>
    )
}
export default ProjectItemStats