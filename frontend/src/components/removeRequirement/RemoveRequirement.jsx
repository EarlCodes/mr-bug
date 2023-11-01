import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { setProjects } from "../../api/store/Slices/ProjectsSlice"
import { logout } from "../../api/store/Slices/LoginSlice"
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil"
import { NetworkError } from "../../services/networkErrors/NetworkErrors"
import { axiosDelete } from "../../utils/axiosRequestUtil/AxiosRequestUtil"
import { CheckTokenExpired } from "../../services/CheckTokenExpired"
import { serverPath } from "../../api/service/ServerPath"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { LoadingContext } from "../../services/LoadingContext"

const RemoveRequirement = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const setIsLoading = useContext(LoadingContext)

    const handleRemoveRequirement = (projects,updateProject,requirement,dispatch,navigate,setIsLoading) => {
        setIsLoading(true)
        const session_token = JSON.parse(retrieveValueSessionStorage('token'))

        if (!CheckTokenExpired(session_token.expiry)) {
            const token = `Token ${session_token.token}`
            axiosDelete(`${serverPath}/mrbug/requirements/${requirement.id}`, token).then((value) => {
                if (value.status === 204) {
                    removeRequirement(projects,updateProject,requirement.id,dispatch,navigate)
                    setIsLoading(false)
                }
            }).catch((error) => {
                console.log(NetworkError(error))
                setIsLoading(false)
            })
        }else{
            dispatch(logout())
            navigate('/login')
        }

        const removeRequirement = (projects, updateProject,requirementId,dispatch) => {    
            dispatch(setProjects({
                    ...projects,
                    results: projects.results.map((project) => {
                        if (project.id === updateProject.id) {
                            var requirement_list = []
                            project.project_requirements.filter((current_requirement) => {
                                if (current_requirement.id !== requirementId) {
                                    requirement_list.push(current_requirement)
                                } 
                            })
                            return {
                                ...project,
                                project_requirements: requirement_list
                            }
                        } else {
                            return project
                        }
                    })
                }))
            
        }
    }
    return (
        <Dialog
            open={props.isRemoveRequirementOpen}
            onClose={() => {
                props.setIsRemoveRequirementOpen(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete Task?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`You are about to delete ${props.requirement.requirement} requirement.Note that this action can not be undone .Do you want to continue?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { props.setIsRemoveRequirementOpen(false) }}>Disagree</Button>
                <Button
                    color='black'
                    onClick={() => {
                        props.setIsRemoveRequirementOpen(false)
                        handleRemoveRequirement(props.projects,props.updateProject,props.requirement,dispatch,navigate,setIsLoading)
                    }} autoFocus>
                    Agree
                </Button>

            </DialogActions>
        </Dialog>
    )
}

export default RemoveRequirement;