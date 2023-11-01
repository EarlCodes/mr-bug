import { Alert, Badge, Button, FormControl, IconButton, InputLabel, List, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import './TeamPage.css'
import MemberCard from '../../components/memberCard/MemberCard';
import TeamIcon from '@mui/icons-material/Groups3'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CreateMember from '../../features/createMember/CreateMember';
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil';
import { updateTeam } from '../../services/stateUpdate/UpdateTeam'
import { axiosPost } from '../../utils/axiosRequestUtil/AxiosRequestUtil';
import { updateSelectedProject } from '../../services/UpdateSelectedProject';
import RemoveTeam from '../../components/removeTeam/RemoveTeam';
import { serverPath } from '../../api/service/ServerPath';
import { useSnackbar } from '../../hooks/UseSnackBar';
import { CheckTokenExpired } from '../../services/CheckTokenExpired';
import { useNavigate } from 'react-router-dom';
import { NetworkError } from '../../services/networkErrors/NetworkErrors';
import { logout } from '../../api/store/Slices/LoginSlice';

const TeamPage = () => {
    const selectedProject = useSelector((state) => state.selectedProject)
    const [selectedRelease, setSelectedRelease] = useState({
        id: 0,
        teams_working_on: []
    })
    const [selectedTeam, setSelectedTeam] = useState({
        id: 0,
        members_team: []
    })
    const [isMemberOpen, setIsMemberOpen] = useState(false)
    const [isRemoveTeamOpen, setIsRemoveTeamOpen] = useState(false)

    const { snackBar, openSnackBar, closeSnackBar } = useSnackbar()

    const [newTeam, setNewTeam] = useState({
        name: '',
        description: '',
        release_id: 0,
        project_id: selectedProject.id,
    })

    const { insertTeam, removeTeam } = updateTeam()
    const projects = useSelector((state) => state.projects)
    const dispatch = useDispatch()
    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    const navigate = useNavigate()

    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
        const choosenProject = selectedProject.project_releases.slice(0, 1)[0]
        if (selectedRelease.id === 0) {
            setSelectedRelease(choosenProject)
            if (choosenProject.teams_working_on.length > 0) {
                setSelectedTeam(choosenProject.teams_working_on.slice(0, 1)[0])
            }
        }
    }, [projects])

    useEffect(() => {
        selectedProject.project_releases.map((release) => {
            if (release.id === selectedRelease.id) {
                setSelectedRelease(release)
                release.teams_working_on.map((team) => {
                    if (selectedTeam.id === team.id) {
                        setSelectedTeam(team)
                    }
                })
            }
        })
    }, [selectedProject])

    const handleCreateTeam = () => {
        if (!CheckTokenExpired(session_token.expiry)) {
            const valid_token = `Token ${session_token.token}`

            axiosPost(`${serverPath}/mrbug/team/`, valid_token, newTeam).then((value) => {
                if (value.status === 201) {
                    insertTeam(projects, selectedProject.id, selectedRelease.id, value.data, dispatch)
                    openSnackBar('success', `${value.data.name} team added.`)
                    setNewTeam({
                        name: '',
                        description: '',
                        release_id: 0,
                        project_id: selectedProject.id,
                    })
                }
            }).catch((error) => {
                openSnackBar('error', NetworkError(error))
            })
        } else {
            navigate('/login')
            dispatch(logout())
        }
    }

    return (
        <section className='teams-page'>
            <header className='teams-page-header'>
                <h2 className='teams-page-header-lbl'>Teams</h2>
                <p className='teams-page-slogan-lbl'>{selectedProject.tittle}</p>
            </header>
            <section className='teams-page-container'>
                <article className='teams-team-article-p'>
                    <header>
                        <img src='./assests/TeamsLabelAnimation.png' alt='team' className='team-member-display-img' />
                    </header>
                    <FormControl fullWidth>
                        <InputLabel>Release</InputLabel>
                        <Select
                            value={selectedRelease}
                            variant='outlined'
                            color='light'
                            onChange={(event) => {
                                setSelectedRelease(event.target.value)
                            }} label="Release">
                            {
                                selectedProject.project_releases.map((release) => {
                                    return <MenuItem key={release.id} value={release}>{release.tittle}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <p className='teams-create-team-article-lbl'>Teams</p>
                    <List className='team-teamlist'>
                        {
                            selectedRelease.teams_working_on.map((team) => {
                                return <li className='teams-team-list' key={team.id} onClick={() => {
                                    setSelectedTeam(team)
                                }} >
                                    <p className='teams-team-list-text'>{team.name}</p>
                                    <Badge badgeContent={team.members_team.length} color='tertiary' />
                                    <IconButton
                                        onClick={() => {
                                            setIsRemoveTeamOpen(true)
                                        }}
                                        size='small'>
                                        <DeleteIcon sx={{ width: '24px', height: '24px' }} color='light' />
                                    </IconButton>
                                </li>
                            })
                        }
                    </List>
                    <RemoveTeam isRemoveTeamOpen={isRemoveTeamOpen} setIsRemoveTeamOpen={setIsRemoveTeamOpen} team={selectedTeam} selectedRelease={selectedRelease} openSnackBar={openSnackBar} setSelectedTeam={setSelectedTeam} />
                    <form className='teams-create-team-article'>
                        <p className='teams-create-team-article-lbl'>Create team</p>
                        <TextField
                            value={newTeam.name}
                            onChange={(event) => {
                                setNewTeam((prevState) => ({
                                    ...prevState,
                                    name: event.target.value,
                                    release_id: selectedRelease.id
                                }))
                            }}
                            label='Name' />
                        <TextField
                            value={newTeam.description}
                            onChange={(event) => {
                                setNewTeam((prevState) => ({
                                    ...prevState,
                                    description: event.target.value,
                                    release_id: selectedRelease.id
                                }))
                            }}
                            label='Description'
                            multiline
                            rows={4} />
                        <Button
                            disabled={newTeam.name !== '' & newTeam.description !== '' ? false : true}
                            onClick={() => {
                                handleCreateTeam()
                            }}
                            variant='contained'>Create team</Button>
                    </form>
                </article>
                <article className='team-team-member'>
                    <header className='team-team-member-header'>
                        <article className='team-team-member-header-container'>
                        <p className='team-team-member-header-lable'>{selectedTeam.name}</p>
                            <article className='team-team-member-header-icon-wrapper'>
                                <h3 className='team-team-member-header-icon-lbl'>Team members</h3>
                                <TeamIcon sx={{ color: '#313937' }} />
                            </article>
                            <p className='team-team-member-header-lbl'>{selectedTeam.description}</p>
                        </article>
                        <article style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '400px' }}>
                            <CreateMember isMemberOpen={isMemberOpen} setIsMemberOpen={setIsMemberOpen} team={selectedTeam} release={selectedRelease.id} />
                            <Button
                            disabled = {selectedTeam.id === 0 ? true:false}
                                onClick={() => {
                                    setIsMemberOpen(true)
                                }}
                                sx={{ width: 'fit-content', marginLeft: 'auto' }}
                                variant='contained'>add member</Button>
                        </article>
                    </header>
                    {
                        selectedTeam.members_team.length > 0 ? <List className='teams-page-list'>
                            {
                                selectedTeam.members_team.map((member) => {
                                    return <li className='teams-page-list-item' key={member.id}>
                                        <MemberCard member={member} releases={selectedRelease} team={selectedTeam} openSnackBar={openSnackBar} />
                                    </li>
                                })
                            }
                        </List> : <section className='no-team-member-wrapper'>
                            <p className='no-team-member-wrapper-lbl'>Team has no members yet. Click on add member button to add members to team.</p>
                            <img src='./assests/TeamWork.png' alt='team' className='team-work-img' />
                        </section>
                    }

                </article>
            </section>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackBar.isOpen}
                onClose={closeSnackBar}
                autoHideDuration={5000} >
                <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
            </Snackbar>
        </section>
    )
}

export default TeamPage;