import { Avatar, AvatarGroup, Badge, LinearProgress } from '@mui/material';
import './RecentProjectContainer.css'
import ProjectItemStats from '../projectItemStats/ProjectItemStats';
import { getBackLog, getBugs, getProjectTeamMembers, getTasks, projectProgress } from './Services';

const RecentProjectContainer = (props) => {
    const progress = projectProgress(props.project)
    return (
        <article className='recent-project-wrapper'>
            <header className='recent-project-header'>
                <p className='recent-project-label'>{props.project.tittle}</p>
                <article className='recent-project-email-container'>
                    <Avatar
                        alt='ser'
                        src={`../assests/UserIcons/${props.project.project_owner.user_profile.avatar}.png`}
                        sx={{ width: '24px', height: '24px', bgcolor: `${props.project.project_owner.user_profile.bgcolor}` }} />
                    <article className='recent-project-name-email-container'>
                        <p className='recent-project-name-label'>{`${props.project.project_owner.last_name} ${props.project.project_owner.first_name}`}</p>
                        <p className='recent-project-email-label'>{props.project.project_owner.email}</p>
                    </article>
                </article>
            </header>
            <section className='recent-project-progress-container'>
                <p className='recent-project-progress-label'>{isNaN(progress) ? 0 : progress.toFixed(0)}%</p>
                <LinearProgress variant="determinate" value={progress} sx={{ width: '90%', height: '10px', borderRadius: '5px' }} />
            </section>
            <section className='project-item-stats-container'>
                <ProjectItemStats label='Backlog' completed={getBackLog(props.project).completed} total={getBackLog(props.project).total} />
                <ProjectItemStats label='Tasks' completed={getTasks(props.project).completed} total={getTasks(props.project).total} />
                <ProjectItemStats label='Bugs' completed={getBugs(props.project).completed} total={getBugs(props.project).total} />
                <AvatarGroup max={5}>
                    {
                        getProjectTeamMembers(props.project).map((member) => {
                            return <Avatar
                            key={member.id}
                                alt="Remy Sharp"
                                src={`../assests/UserIcons/${member.user.user_profile.avatar}.png`}
                                 sx = {{ width: '24px', height: '24px' ,bgcolor: `${member.user.user_profile.bgcolor}` }} />
                        })
                    }
                </AvatarGroup>
            </section>
        </article>
    )
}

export default RecentProjectContainer;