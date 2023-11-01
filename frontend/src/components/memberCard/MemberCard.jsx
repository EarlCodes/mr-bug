import './MemberCard.css'
import { Avatar, IconButton, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react';
import { calculateTaskPercentage } from './Services';
import RemoveMember from '../../features/removeMember/RemoveMember';

const MemberCard = (props) => {

    const [task, setTasks] = useState({
        task: [],
        completed: [],
        working_on: [],
        not_started: []
    })

    const [isRemoveMemberOpen,setIsRemoveMemberOpen] = useState(false)

    useEffect(() => {
        let user_task = []
        let completed_task = []
        let working_task = []
        let not_started = []

        props.releases.release_backlogs.map((backlog) => {
            backlog.backlog_tasks.map((current_task) => {
                if (current_task.assigned === props.member.id) {
                    user_task.push(current_task)
                    switch (current_task.progress) {
                        case 'TODO': not_started.push(current_task)
                            break;
                        case 'IN_PROGRESS': working_task.push(current_task)
                            break;
                        case 'DONE': completed_task.push(current_task)
                    }
                }
            })
        })
        setTasks({
            task: user_task,
            completed: completed_task,
            working_on: working_task,
            not_started: not_started
        })
    }, [])

    return (
        <section className='team-member-card'>
            <IconButton 
            sx={{ marginLeft: 'auto' }} 
            onClick={()=>{
                setIsRemoveMemberOpen(true)
            }}
            size='small'>
                <DeleteIcon sx={{ width: '21px', height: '21px', color: '#313937' }} className='member-team-icon' />
            </IconButton>
            <article className='team-member-avatar-card'>
                <Avatar src={`assests/UserIcons/${props.member.user.user_profile.avatar}.png`} alt="brave" sx={{ width: '70px', height: '70px', backgroundColor: `${props.member.user.user_profile.bgcolor}` }} />
                <p className='team-member-avatar-lbl'>{`${props.member.user.first_name} ${props.member.user.last_name}`}</p>
            </article>
            <article className='team-member-avatar-container'>
                <article className='team-member-task-container'>
                    <p className='team-member-task-lbl'>Tasks</p>
                    <p className='team-member-task-lbl'>{`${task.completed.length}/${task.task.length}`}</p>
                </article>
                <LinearProgress variant='determinate' value={task.task.length >= 1 ? calculateTaskPercentage(task.task.length, task.completed.length):0} />
                <article className='team-member-task-stats-container' >
                    <article className='team-member-task-stats-wrapper'>
                        <p className='team-member-task-stats-wrapper-lbl'>Not started</p>
                        <p className='team-member-task-stats-wrapper-no-lbl'>{task.not_started.length}</p>
                    </article>
                    <article className='team-member-task-stats-wrapper'>
                        <p className='team-member-task-stats-wrapper-lbl'>Working</p>
                        <p className='team-member-task-stats-wrapper-no-lbl'>{task.working_on.length}</p>
                    </article>
                    <article className='team-member-task-stats-wrapper'>
                        <p className='team-member-task-stats-wrapper-lbl'>Done</p>
                        <p className='team-member-task-stats-wrapper-no-lbl'>{task.completed.length}</p>
                    </article>
                </article>
            </article>
            <RemoveMember isRemoveMemberOpen={isRemoveMemberOpen} setIsRemoveMemberOpen={setIsRemoveMemberOpen} member ={props.member} release = {props.releases} team={props.team} openSnackBar={props.openSnackBar}/>
        </section>
    )
}

export default MemberCard;