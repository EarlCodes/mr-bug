import './CreateBacklog.css'
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import PaletteColorIcon from "@mui/icons-material/Palette"
import CardMembership from "@mui/icons-material/CardMembership"
import CreateBacklogTable from './createBacklogTable/CreateBacklogTable'
import { BacklogFields, useBacklogFieldErrors, useBacklogFields } from './Hooks'
import { addBacklog } from './Services'


const CreateBacklog = (props) => {
    const { backlog, setBacklogField, clearFields } = useBacklogFields()
    const { backlogFieldErrors, checkBacklogFieldErrorValid, isAllFieldsValid } = useBacklogFieldErrors()

    return (
        <section className='create-backlogs-container'>
            <p className='create-project-backlog-des-lbl'>Backlog is a prioritized list of tasks needed to complete a certain milestone.Backlog has tasks that can be assigned to users.</p>
            <section className='create-project-backlog-color-name'>
                <TextField
                    required
                    label="Tittle"
                    value={backlog.tittle}
                    helperText={backlogFieldErrors.tittle.label}
                    onChange={(e) => {
                        setBacklogField("tittle", e.target.value)
                        checkBacklogFieldErrorValid("tittle", e.target.value)
                    }}
                    sx={{ width: 'fit-content' }}
                    variant="filled"
                    color='black' />

                <TextField
                    required
                    sx={{ width: '5%' }}
                    label="Color"
                    type='color'
                    variant="filled"
                    color='black'
                    value={backlog.color}
                    onChange={(e) => {
                        setBacklogField("color", e.target.value)
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PaletteColorIcon sx={{ color: `${backlog.color}` }} />
                            </InputAdornment>
                        ),
                    }} />
            </section>
            <TextField
                required
                multiline
                rows={8}
                sx={{ width: 'fit-content' }}
                label="Description"
                variant="filled"
                color='black'
                value={backlog.description}
                helperText={backlogFieldErrors.description.label}
                onChange={(e) => {
                    setBacklogField("description", e.target.value)
                    checkBacklogFieldErrorValid("description", e.target.value)
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CardMembership color='black' />
                        </InputAdornment>
                    ),
                }} />
            <TextField
                required
                multiline
                rows={8}
                sx={{ width: 'fit-content' }}
                label="Acceptance criteria"
                variant="filled"
                color='black'
                value={backlog.acceptence_criteria}
                helperText={backlogFieldErrors.acceptence_criteria.label}


                onChange={(e) => {
                    setBacklogField("acceptence_criteria", e.target.value)
                    checkBacklogFieldErrorValid("acceptence_criteria", e.target.value)
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CardMembership color='black' />
                        </InputAdornment>
                    ),
                }} />
            <section className='create-project-backlog-color-name'>
                <FormControl
                    variant="filled"
                    color='black'
                >
                    <InputLabel id="demo-simple-select-filled-label">priority</InputLabel>
                    <Select
                        value={backlog.priority}
                        onChange={(e) => {
                            setBacklogField("priority", e.target.value)
                        }}
                        labelId="demo-simple-select-filled-label"
                        defaultValue={'LOW'}>
                        <MenuItem>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'LOW'}>Low</MenuItem>
                        <MenuItem value={'MED'}>Medium</MenuItem>
                        <MenuItem value={'HIGH'}>High</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" color='black'>
                    <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                    <Select
                        value={backlog.status}
                        onChange={(e) => {
                            setBacklogField("status", e.target.value)
                        }}
                        labelId="demo-simple-select-filled-label"
                        defaultValue={'NOT_STARTED'}>
                        <MenuItem >
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'NOT_STARTED'}>Not Started</MenuItem>
                        <MenuItem value={'WORKING_ON'}>Working On</MenuItem>
                        <MenuItem value={'DONE'}>Done</MenuItem>
                    </Select>
                </FormControl>

            </section>
            <TextField
                required
                label="Story Points"
                variant="filled"
                sx={{ width: 'fit-content' }}
                color='black'
                value={backlog.story_points}
                onChange={(e) => {
                    setBacklogField("story_points", e.target.value)
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CardMembership color='black' />
                        </InputAdornment>
                    ),
                }}
                type='number' />
            <Button
                disabled={!isAllFieldsValid()}
                variant='contained'
                sx={{ width: 'fit-content' }}
                onClick={() => {
                    addBacklog(backlog, props.addReleaseBacklogItem, isAllFieldsValid)
                }}>Add Backlog</Button>
            <p className='create-project-backlog-table-lbl'>Backlog Table</p>
            <CreateBacklogTable backlogList={props.backlogList} removeReleaseBacklogItem={props.removeReleaseBacklogItem} />
            <p className='create-project-backlog-total-lbl'>{`${props.backlogList.length} backlog items`}</p>
        </section>
    )
}

export default CreateBacklog;