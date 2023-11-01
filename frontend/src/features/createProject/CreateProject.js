import { Alert, AppBar, Button, Dialog, FormControl, IconButton, InputAdornment, InputLabel, List, MenuItem, Select, Snackbar, TextField, Toolbar, Typography } from '@mui/material'
import './CreateProject.css'
import CloseIcon from "@mui/icons-material/Close"
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark"
import DescriptionIcon from "@mui/icons-material/Description"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/DeleteForever"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react'
import CreateBacklog from './createBacklog/CreateBacklog'
import { ProjectFields, useProjectFields, useProjectfieldErrors } from './Hooks'
import { createProject, onFieldChange, onReleaseFieldChange } from './Services'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from '../../hooks/UseSnackBar'
import { useNavigate } from 'react-router-dom'

const CreateProject = (props) => {
    const [isBacklog, setIsBacklog] = useState(false)
    const { snackBar, openSnackBar, closeSnackBar } = useSnackbar()
    const [projectRequirementField, setProjectRequiremenField] = useState({
        requirement: "",
        isComplete: false
    })
    const { projectFieldErrors, checkFieldErrors, checkReleaseFieldErrors, isProjectFieldErrors } = useProjectfieldErrors()
    const { project, setProjectField, addProjectRelease, addReleaseBacklogItem, removeReleaseBacklogItem, addRequirementItem, removeRequirementItem,reset_project } = useProjectFields()
    const usersProject = useSelector((state) => state.projects)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <Dialog
            disablePortal
            fullScreen
            open={props.isCreateProject}>
            <section className='create-project-container'>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                            onClick={() => {
                                props.setIsCreateProject(false)
                            }}>
                            <CloseIcon />

                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Create Project
                        </Typography>
                        <Button autoFocus color="inherit">
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <form className='create-project-form'>
                    <section className='create-project-detail-container'>
                        <p className='create-project-detail-label'>Project details</p>
                        <TextField required
                            id="tittle"
                            label="Project Name"
                            variant="filled"
                            color='black'
                            value={project.tittle}
                            error={projectFieldErrors.tittle.isError}
                            helperText={projectFieldErrors.tittle.label}
                            onChange={(e) => {
                                onFieldChange('tittle', e.target.value, checkFieldErrors, setProjectField)
                            }} />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disablePast
                                label="Due date"
                                value={project.due_date}
                                onChange={(newValue) => {
                                    const date = new Date(newValue).toISOString()
                                    setProjectField('due_date', date)
                                }}

                            />
                        </LocalizationProvider>
                        <TextField required
                            multiline
                            rows={8}
                            label="Description"
                            variant="filled"
                            color='black'
                            value={project.description}
                            error={projectFieldErrors.description.isError}
                            helperText={projectFieldErrors.description.label}
                            onChange={(e) => {
                                onFieldChange('description', e.target.value, checkFieldErrors, setProjectField)

                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionIcon color='black' />
                                    </InputAdornment>
                                ),
                            }} />
                        <section className='create-project-requirement-container'>
                            <TextField
                                required
                                label="Requirements"
                                value={projectRequirementField.requirement}
                                onChange={(e) => {
                                    setProjectRequiremenField((prevState) => ({
                                        ...prevState,
                                        requirement: e.target.value
                                    }))

                                }}
                                variant="standard"
                                color='black'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon color='black' />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <IconButton disabled={projectRequirementField.requirement === "" ? true : false} size='small' onClick={() => {
                                            addRequirementItem(projectRequirementField)
                                            setProjectRequiremenField({
                                                requirement: "",
                                                isComplete: false
                                            })
                                        }}>
                                            <AddIcon />
                                        </IconButton>
                                    ),
                                }} />
                            <List className='create-project-requirement-list'>
                                {
                                    project.project_requirements.map((requirement, index) => {
                                        return <li key={index} className='create-project-requirement-list-item'>
                                            <p className='create-project-requirement-list-lbl'>{requirement.requirement}</p>
                                            <IconButton size='small' onClick={() => {
                                                removeRequirementItem(requirement)
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </li>
                                    })}

                            </List>
                        </section>
                    </section>
                    <section className='create-project-release-container'>
                        <p className='create-project-release-lbl'>Release</p>
                        <p className='create-project-release-slogan-lbl'>The release backlog will be used to group related backlogs within a project.</p>
                        <section className='create-project-name-container'>
                            <TextField required
                                id="tittle"
                                label="Release Name"
                                variant="filled"
                                color='black'
                                value={project.project_releases[0].tittle}
                                error={projectFieldErrors.project_releases.tittle.isError}
                                helperText={projectFieldErrors.project_releases.tittle.label}
                                onChange={(e) => {
                                    onReleaseFieldChange("tittle", e.target.value, checkReleaseFieldErrors, addProjectRelease)
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CollectionsBookmarkIcon color='black' />
                                        </InputAdornment>
                                    ),
                                }} />
                            <TextField required
                                label="Purpose"
                                variant="filled"
                                color='black'
                                value={project.project_releases[0].purpose}
                                error={projectFieldErrors.project_releases.purpose.isError}
                                helperText={projectFieldErrors.project_releases.purpose.label}

                                onChange={(e) => {
                                    onReleaseFieldChange("purpose", e.target.value, checkReleaseFieldErrors, addProjectRelease)
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon color='black' />
                                        </InputAdornment>
                                    ),
                                }} />
                        </section>
                    </section>
                    <section className='create-project-backlog-container'>
                        <section className='create-project-backlog-header-container'>
                            <p className='create-project-backlog-lbl'>Backlog Details <strong className='create-project-backlog-optional-lbl' >(Optional)</strong> </p>
                            <section>
                                <IconButton onClick={() => {
                                    setIsBacklog(!isBacklog)
                                }}>
                                    {isBacklog ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </section>
                        </section>
                        {
                            isBacklog ? <CreateBacklog addReleaseBacklogItem={addReleaseBacklogItem} removeReleaseBacklogItem={removeReleaseBacklogItem} backlogList={project.project_releases[0].release_backlogs} /> : <></>
                        }

                    </section>
                    <Button
                        variant='contained'
                        disabled={isProjectFieldErrors()}
                        onClick={() => {
                            createProject(project, isProjectFieldErrors, props.openSnackBar, usersProject, dispatch, navigate)
                            reset_project()
                            props.setIsCreateProject(false)
                        }}
                        startIcon={<AddIcon />}>Create Project</Button>
                </form>
            </section >
        </Dialog >
    )
}

export default CreateProject;