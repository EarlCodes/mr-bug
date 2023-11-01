import { Avatar, AvatarGroup, Badge, Button, Checkbox, IconButton, LinearProgress, List } from '@mui/material';
import './ProjectSelector.css'
import ProjectItemStats from '../../components/projectItemStats/ProjectItemStats';
import TeamIcon from '@mui/icons-material/Group'
import DoneIcon from '@mui/icons-material/Done'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/ToggleOff'
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProject } from '../../api/store/Slices/SelectedProjectSlice';
import { getBackLog, getBugs, getProjectTeams, getTasks, handleUpdateProjectRequirement } from './Services';
import { useButtonList } from './Hooks';
import { axiosUpdate } from '../../utils/axiosRequestUtil/AxiosRequestUtil';
import { CheckTokenExpired } from '../../services/CheckTokenExpired';
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil';
import { serverPath } from '../../api/service/ServerPath';
import { NetworkError } from '../../services/networkErrors/NetworkErrors';
import { logout } from '../../api/store/Slices/LoginSlice';
import { useNavigate } from 'react-router-dom';
import RemoveRequirement from '../../components/removeRequirement/RemoveRequirement';
import CreateRequirement from '../createRequirement/CreateRequirement';
import { LoadingContext } from '../../services/LoadingContext';

const ProjectSelector = (props) => {
    const navigate = useNavigate()

    const setIsLoading = useContext(LoadingContext)

    const selectedProject = useSelector((state) => state.selectedProject)
    const [selectedTeam, setSelectedTeam] = useState({ "members_team": [] })
    const dispatch = useDispatch()
    const [isCreateRequirementOpen,setIsCreateRequirementOpen] = useState(false)
    const { buttonsList, setDefaultButtonList, setProjectSelected } = useButtonList()
    const [isRemoveRequirementOpen, setIsRemoveRequirementOpen] = useState(false)
    const [requirmentDelete, setRequirementDelete] = useState({})

    useEffect(() => {
        setDefaultButtonList(props.projects)
        props.projects.results.map((project) => {
            if (project.id === selectedProject.id) {
                dispatch(setSelectedProject(project))
            }
        })
    }, [props.projects])

    useEffect(() => {
        setDefaultButtonList(props.projects)
    }, [])

    useEffect(() => {
        setProjectSelected(selectedProject)
        if (getProjectTeams(selectedProject).length > 0) {
            setSelectedTeam(getProjectTeams(selectedProject).slice(0, 1)[0])
        }
    }, [selectedProject])

    const handleCheckRequirement = (requirementId, isCompleted,setIsLoading) => {
        setIsLoading(true)
        var updateRequirement = { isComplete: false }

        if (isCompleted) {
            updateRequirement = { isComplete: false }
        } else {
            updateRequirement = { isComplete: true }
        }

        const session_token = JSON.parse(retrieveValueSessionStorage('token'))

        if (!CheckTokenExpired(session_token.expiry)) {
            const token = `Token ${session_token.token}`
            axiosUpdate(`${serverPath}/mrbug/requirements/${requirementId}`, token, updateRequirement).then((value) => {
                if(value.status === 200){
                    handleUpdateProjectRequirement(props.projects, selectedProject, value.data, dispatch)
                setIsLoading(false)
                } 
            }).catch(error => {
                console.log(NetworkError(error))
                setIsLoading(false)
            })
        } else {
            dispatch(logout())
            navigate('/login')
        }
    }

    return (
        <section className='selected-project-container'>
            <header className='selected-project-header'>
                <List className='project-selector-buttons-list'>
                    {
                        buttonsList.map((project,index) => {
                            return <li key={index}>
                                <Button
                                    variant={project.isSelected ? 'contained' : 'text'}
                                    size='small'
                                    color={project.isSelected ? "tertiary" : "light"}
                                    sx={{ borderRadius: "12px", whiteSpace: 'nowrap' }}
                                    onClick={() => {
                                        setSelectedTeam({ "members_team": [] })
                                        dispatch(setSelectedProject(project.project))
                                    }}>{project.project.tittle}</Button>
                            </li>
                        })
                    }
                </List>
            </header>
            <section className='selected-project-detail-container'>
                <section className='selected-project-description-container' >
                    <header className='selected-project-description-header'>
                        <p className='selected-project-description-header-lbl'>{selectedProject.tittle}</p>
                        <article className='selected-project-description-email-container'>
                            <Avatar
                                src={`../assests/UserIcons/${selectedProject.project_owner.user_profile.avatar}.png`}
                                alt='j'
                                sx={{ width: '28px', height: '28px', bgcolor: `${selectedProject.project_owner.user_profile.bgcolor}` }} />
                            <article className='selected-project-name-email-container'>
                                <p className='selected-project-name-lbl'>{`${selectedProject.project_owner.first_name} ${selectedProject.project_owner.last_name}`}</p>
                                <p className='selected-project-email-lbl'>{selectedProject.project_owner.email}</p>
                            </article>
                        </article>
                    </header>
                    <p className='selected-project-description-lbl'>{selectedProject.description}</p>
                    <section>
                        <header className='selected-project-requirement-header'>
                            <h2 className='selected-project-requirement-lbl'>Requirements</h2>
                            <CreateRequirement isCreateRequirementOpen={isCreateRequirementOpen} setIsCreateRequirementOpen={setIsCreateRequirementOpen} projects ={props.projects} updateProject={selectedProject}/>
                            <IconButton sx={{ marginLeft: 'auto' }} onClick={()=>{
                                setIsCreateRequirementOpen(true)
                            }} >
                                <AddIcon sx={{ width: '18px', height: '18px' }} />
                            </IconButton>
                        </header>
                        <List className='selected-project-requirement-list'>
                            {selectedProject.project_requirements.map((requirement) => {
                                return <li className='requirements-list-item' key={requirement.id}>
                                    <Checkbox checkedIcon={<DoneIcon color='tertiary' />} icon={<CancelIcon />} size='small' sx={{ margin: '0px' }} checked={requirement.isComplete} onChange={(event) => {
                                        handleCheckRequirement(requirement.id, requirement.isComplete,setIsLoading)
                                    }} />
                                    <p className='requirements-list-item-lbl'>{requirement.requirement}</p>
                                    <IconButton sx={{ marginLeft: 'auto' }} onClick={() => {
                                        setIsRemoveRequirementOpen(true)
                                        setRequirementDelete(requirement)
                                    }}>
                                        <DeleteIcon sx={{ width: '18px', height: '18px' }} />
                                    </IconButton>
                                </li>
                            })
                            }
                        </List>
                        <RemoveRequirement setIsRemoveRequirementOpen={setIsRemoveRequirementOpen} isRemoveRequirementOpen={isRemoveRequirementOpen} requirement={requirmentDelete} projects ={props.projects} updateProject={selectedProject}/>
                    </section>

                    <section className='selected-project-footer'>
                        <ProjectItemStats label='Backlog' completed={getBackLog(selectedProject).completed} total={getBackLog(selectedProject).total} />
                        <ProjectItemStats label='Tasks' completed={getTasks(selectedProject).completed} total={getTasks(selectedProject).total} />
                        <ProjectItemStats label='Bugs' completed={getBugs(selectedProject).completed} total={getBugs(selectedProject).total} />
                        <section className='selected-project-footer-container'>
                            <header className='selected-project-footer-header'>
                                <p className='selected-project-footer-lbl'>{selectedProject.progress}%</p>
                                <p className='selected-project-footer-date-lbl'>{new Date(selectedProject.due_date).toUTCString().slice(0, 16)}</p>
                            </header>
                            <LinearProgress variant='determinate' value={selectedProject.progress} sx={{ width: '95%', height: '10px', borderRadius: '6px' }} />
                        </section>
                    </section>
                </section>
                <section className='selected-project-team-container'>
                    <header className='selected-project-team-header'>
                        <p className='selected-project-team-header-lbl'>Teams</p>
                        <TeamIcon sx={{ color: '#e5e5e5e5' }} />
                        <Badge badgeContent={getProjectTeams(selectedProject).length} sx={{ marginLeft: 'auto' }} color='tertiary' />
                    </header>
                    {
                        getProjectTeams(selectedProject).length != 0 ? <>
                            <List className='selected-project-teams-list'>
                                {
                                    getProjectTeams(selectedProject).map((team) => {
                                        return <li key={team.id} className='selected-project-teams-list-item' onClick={() => {
                                            setSelectedTeam(team)
                                        }}>
                                            <p className='selected-project-teams-li-lbl'>{team.name}</p>
                                            <Badge badgeContent={team.members_team.length} color='tertiary' />
                                        </li>
                                    })
                                }
                            </List>
                            <p className='selected-project-team-members-lbl'>Team members</p>
                            <AvatarGroup max={12} sx={{ alignSelf: 'flex-start' }}  >
                                {
                                    selectedTeam.members_team.map((member) => {
                                        return <Avatar key={member.id} src={`../assests/UserIcons/${member.user.user_profile.avatar}.png`} alt='smith' sx={{ width: '24px', height: '24px', bgcolor: `${member.user.user_profile.bgcolor}` }} />
                                    })
                                }

                            </AvatarGroup>
                        </> : <section className='no-project-team-member-container'>
                            <img src='./assests/animations/Member.png' alt='Member' className='no-project-team-member-img' />
                            <p className='no-project-team-member-lbl'>Project has no teams</p>
                        </section>
                    }

                </section>
            </section>

        </section>
    )
}

export default ProjectSelector;