import { Avatar, Button, IconButton, List } from '@mui/material';
import './TeamsContainer.css'
import PeopleIcon from '@mui/icons-material/Groups3Outlined'
import AddIcon from '@mui/icons-material/AddCircle'
import { useEffect, useState } from 'react';
import { useTeams } from './Hooks';
import CreateTeam from '../../../features/createTeam/CreateTeam';
import CreateMember from '../../../features/createMember/CreateMember';

const TeamsContainer = (props) => {
    const [teamMembers, setTeamMembers] = useState([])
    const [isTeamOpen, setIsTeamOpen] = useState(false)
    const [isMemberOpen, setIsMemberOpen] = useState(false)
    const { teams, selectedTeam, setTeamsList, activateTeam } = useTeams()

    useEffect(() => {
        setTeamsList(props.selectedRelease.teams_working_on)

        const teams_working_on = props.selectedRelease.teams_working_on
        if (teams_working_on.length > 0) {
            const team = teams_working_on.slice(0, 1)[0]
            activateTeam(team)
            setTeamMembers(team.members_team)
        }
    }, [props.selectedRelease])

    return (

        <article className='board-page-teams-container'>
            <header className='board-page-teams-header'>
                <h2 className='board-page-team-header-lbl'>Teams</h2>
                <PeopleIcon sx={{ color: '#313937' }} />
            </header>
            <section className='board-page-team-release-list-container'>
                <List className='board-page-team-release-list'>
                    {
                        teams.map((team) => {
                            return <li key={team.id}>
                                <Button key={team.team.id}
                                    variant='text'
                                    sx={{ whiteSpace: "nowrap" }}
                                    size='small'
                                    color={team.isActive ? 'tertiary' : 'light'}
                                    onClick={() => {
                                        activateTeam(team.team)
                                        setTeamMembers(team.team.members_team)
                                    }}
                                >{team.team.name}</Button>
                            </li>
                        })
                    }
                </List>
                <IconButton
                    onClick={() => {
                        setIsTeamOpen(true)
                    }}>
                    <AddIcon
                        color='primary'
                    />
                </IconButton>

                <CreateTeam isTeamOpen={isTeamOpen} setIsTeamOpen={setIsTeamOpen} release={props.selectedRelease.id} />

            </section>
            <article className='board-page-team-member-container'>
                <List className='board-page-team-list'>
                    {
                        teamMembers.map((member) => {
                            return <li key={member.id}><Avatar src={`assests/UserIcons/${member.user.user_profile.avatar}.png`} alt='re' sx={{ height: '24px', width: '24px', backgroundColor: `${member.user.user_profile.bgcolor}` }} /></li>
                        })
                    }
                    <CreateMember isMemberOpen={isMemberOpen} setIsMemberOpen={setIsMemberOpen} team={selectedTeam} release={props.selectedRelease.id} />
                    <IconButton
                        disabled={teams.length > 0 ? false : true}
                        onClick={() => {
                            setIsMemberOpen(true)
                        }}>
                        <AddIcon color='primary' />
                    </IconButton>
                </List>
            </article>
        </article>
    )
}

export default TeamsContainer;