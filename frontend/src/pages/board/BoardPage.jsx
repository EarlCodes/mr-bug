import { Alert, Avatar, Badge, Button, Chip, IconButton, List, ListItem, Snackbar } from '@mui/material';
import './BoardPage.css'
import AddIcon from '@mui/icons-material/AddCircle'
import PeopleIcon from '@mui/icons-material/Groups3'
import Board from '../../features/board/Board';
import ReleaseContainer from './releaseContainer/ReleaseContainer';
import TeamsContainer from './teamsContainer/TeamsContainer';
import { useSelector } from 'react-redux'
import { createContext, useEffect, useState } from 'react';
import CreateBacklog from '../../features/createBacklog/CreateBacklog';
import { updateSelectedProject } from '../../services/UpdateSelectedProject';
import { useSnackbar } from '../../hooks/UseSnackBar';
import { SnackContext, snackContext } from './Services';

const BoardPage = () => {
    const { snackBar, openSnackBar, closeSnackBar } = useSnackbar()
    const project = useSelector((state) => state.selectedProject)
    const [selectedRelease, setSelectedRelease] = useState({
        id: 0,
        teams_working_on: [],
        release_backlogs: []
    })

    useEffect(() => {
        project.project_releases.map((release) => {
            if (release.id === selectedRelease.id) {
                setSelectedRelease(release)
            }
        })
    }, [project])



    return (
        <section className='board-page'>
            <header className='board-page-header'>
                <h1 className='board-page-header-label'>Board</h1>
                <p className='board-page-project-header-label'>{project.tittle}</p>
            </header>
            <SnackContext.Provider value={openSnackBar}>
                <section className='board-page-release-team-container'>
                    <ReleaseContainer
                        releases={project.project_releases}
                        setSelectedRelease={setSelectedRelease}
                        selectedRelease={selectedRelease}
                        purpose={selectedRelease.purpose} />
                    <TeamsContainer selectedRelease={selectedRelease} />
                </section>
                <Board selectedRelease={selectedRelease} />
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={snackBar.isOpen}
                    onClose={closeSnackBar}
                    autoHideDuration={5000} >
                    <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
                </Snackbar>
            </SnackContext.Provider>
        </section>
    )
}

export default BoardPage;