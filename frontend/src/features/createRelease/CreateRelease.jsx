import { Alert, AppBar, Button, IconButton, Modal, Snackbar, TextField, Toolbar, Typography } from '@mui/material';
import './CreateRelease.css'
import { useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux';
import { axiosPost } from '../../utils/axiosRequestUtil/AxiosRequestUtil';
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil';
import { updateRelease } from '../../services/stateUpdate/UpdateRelease';
import { updateSelectedProject } from '../../services/UpdateSelectedProject';
import { CheckTokenExpired } from '../../services/CheckTokenExpired';

import { useNavigate } from 'react-router-dom'
import { SnackContext } from '../../pages/board/Services';
import { NetworkError } from '../../services/networkErrors/NetworkErrors';
import { serverPath } from '../../api/service/ServerPath';
import { logout } from '../../api/store/Slices/LoginSlice';

const CreateRelease = (props) => {
    const openSnackBar = useContext(SnackContext);
    const selectedProject = useSelector((state) => state.selectedProject)
    const projects = useSelector((state) => state.projects)
    const dispatch = useDispatch()
    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    const navigate = useNavigate()
    const { insertRelease } = updateRelease()
    const [release, setRelease] = useState({
        project: selectedProject.id,
        tittle: "",
        purpose: ""
    })
    const [releaseError, setReleaseError] = useState({
        tittle: {
            isError: false,
            label: ""
        },
        purpose: {
            isError: false,
            label: ""
        }
    })

    const handleCreatRelease = () => {
        const token = `Token ${session_token.token}`
        if (!CheckTokenExpired(session_token.expiry)) {
            axiosPost(`${serverPath}/mrbug/release/`, token, release).then((value) => {
                if (value.status === 201) {
                    insertRelease(projects, selectedProject.id, value.data, dispatch)
                    openSnackBar("success", "Release has been added.")
                }
            }).catch((error) => {
                openSnackBar('error', NetworkError(error))
            })
        } else {
            navigate('/login')
            dispatch(logout)
        }
    }

    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
    }, [projects])

    const handleReleaseErrors = (value, field) => {
        if (value === "") {
            setReleaseError((prevState) => ({
                ...prevState,
                [field]: {
                    isError: true,
                    label: 'Field is required'
                }
            }))
        } else {
            setReleaseError((prevState) => ({
                ...prevState,
                [field]: {
                    isError: false,
                    label: ""
                }
            }))
        }
    }

    return (
        <Modal
            onClose={() => {
                props.setIsReleaseOpen(false)
            }}
            open={props.isReleaseOpen}
            disablePortal
            style={{ position: 'absolute', width: '350px' }}>
            <section className='add-release-modal-container'>
                <AppBar sx={{ position: 'relative', borderRadius: '8px' }}>
                    <Toolbar variant='dense'>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Create release
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                            onClick={() => {

                                props.setIsReleaseOpen(false)
                            }}>
                            <CloseIcon />

                        </IconButton>
                    </Toolbar>
                </AppBar>
                <form className='add-release-modal-form'>
                    <TextField
                        error={releaseError.tittle.isError}
                        helperText={releaseError.tittle.label}
                        label="Tittle"
                        variant='filled'
                        value={release.tittle}
                        onChange={(event) => {
                            handleReleaseErrors(event.target.value, 'tittle')
                            setRelease((prevState) => ({
                                ...prevState,
                                tittle: event.target.value
                            }))
                        }}

                        sx={{ width: '100%' }} />
                    <TextField
                        error={releaseError.purpose.isError}
                        helperText={releaseError.purpose.label}
                        label="Purpose"
                        variant='filled'
                        onChange={(event) => {
                            handleReleaseErrors(event.target.value, 'purpose')
                            setRelease((prevState) => ({
                                ...prevState,
                                purpose: event.target.value
                            }))
                        }}
                        multiline
                        rows={4}
                        sx={{ width: '100%' }}
                    />
                    <Button
                        disabled={release.tittle !== "" & release.purpose !== "" ? false : true}
                        variant='contained'
                        onClick={() => {
                            handleCreatRelease()
                            props.setIsReleaseOpen(false)
                            setRelease({
                                project: selectedProject.id,
                                tittle: "",
                                purpose: ""
                            })
                        }}
                    >CREATE Release</Button>
                </form>

            </section>
        </Modal>
    )
}

export default CreateRelease;