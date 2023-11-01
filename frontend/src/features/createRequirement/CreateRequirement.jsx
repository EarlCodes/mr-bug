import { AppBar, Button, IconButton, Modal, TextField, Toolbar, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import "./CreateRequirement.css"
import { useContext, useState } from "react"
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil"
import { CheckTokenExpired } from "../../services/CheckTokenExpired"
import { logout } from "../../api/store/Slices/LoginSlice"
import { axiosPost } from "../../utils/axiosRequestUtil/AxiosRequestUtil"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setProjects } from "../../api/store/Slices/ProjectsSlice"
import { serverPath } from "../../api/service/ServerPath"
import { NetworkError } from "../../services/networkErrors/NetworkErrors"
import { LoadingContext } from "../../services/LoadingContext"

const CreateRequirement = (props) => {
    const setIsLoading = useContext(LoadingContext)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const INNITIAL_REQUIREMENT = {
        requirement: '',
        project_id: 0
    }

    const [requirement, setRequirement] = useState(INNITIAL_REQUIREMENT)

    const handleCreateRequirement = (projects, updateProjectId, requirement, dispatch, navigate, setIsLoading) => {
        setIsLoading(true)

        const session_token = JSON.parse(retrieveValueSessionStorage('token'))
        if (!CheckTokenExpired(session_token.expiry)) {
            const token = `Token ${session_token.token}`
            axiosPost(`${serverPath}/mrbug/requirements/`, token, requirement).then((value) => {
                setIsLoading(true)
                if (value.status === 201) {
                    updateRequirement(projects, updateProjectId, value.data, dispatch)
                    setIsLoading(false)
                }
            }).catch((error) => {
                console.log(NetworkError(error))
                setIsLoading(false)
            })
        } else {
            dispatch(logout())
            navigate('/login')
        }

        const updateRequirement = (projects, updateProjectId, requirement_arg, dispatch) => {
            
            dispatch(setProjects({
                ...projects,
                results: projects.results.map((project) => {
                    if (project.id === updateProjectId) {
                        return {
                            ...project,
                            project_requirements: [...project.project_requirements, requirement_arg]
                        }
                    } else {
                        return project
                    }
                })
            }))
        }
    }

    return (
        <Modal
            onClose={() => {
                props.setIsCreateRequirementOpen(false)
            }}
            open={props.isCreateRequirementOpen}
            disablePortal
            style={{ position: 'absolute', width: '350px' }}>
            <section className='add-release-modal-container'>
                <form className='add-release-modal-form'>
                    <TextField
                        value={requirement.requirement}
                        onChange={(event) => {
                            setRequirement((prevState) => ({
                                project_id: props.updateProject.id,
                                requirement: event.target.value
                            }))
                        }}
                        label="Requirement"
                        variant='filled'
                        sx={{ width: '100%' }} />
                    <Button
                        disabled={requirement.requirement === '' ? true : false}
                        variant='contained'
                        onClick={() => {
                            handleCreateRequirement(props.projects, props.updateProject.id, requirement, dispatch, navigate, setIsLoading)
                            setRequirement(INNITIAL_REQUIREMENT)
                            props.setIsCreateRequirementOpen(false)
                        }}
                    >CREATE Requirement</Button>
                </form>
            </section>
        </Modal>
    )
}

export default CreateRequirement;