import { Chip, IconButton, ListItem } from '@mui/material';
import './ReleaseContainer.css'
import AddIcon from '@mui/icons-material/AddCircle'
import { useEffect, useState } from 'react';
import { useRelease } from './Hooks';
import CreateRelease from '../../../features/createRelease/CreateRelease';
import { axiosDelete } from '../../../utils/axiosRequestUtil/AxiosRequestUtil';
import { retrieveValueSessionStorage } from '../../../utils/sessionStorage/SessionStorageUtil';
import { updateRelease } from '../../../services/stateUpdate/UpdateRelease';
import { useDispatch, useSelector } from 'react-redux';
import { serverPath } from '../../../api/service/ServerPath';
import RemoveRelease from '../../../features/removeRelease/RemoveRelease';

const ReleaseContainer = (props) => {
    const { releaseList, setDefaultRelease, activateRelease } = useRelease()
    const [isCreateReleaseOpen, setIsCreateReleaseOpen] = useState(false)
    const [release,setRelease] = useState({
        tittle:""
    })

    const [isRemoveReleaseOpen, setIsRemoveReleaseOpen] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setDefaultRelease(props.releases)
        if (props.selectedRelease.id === 0) {
            props.setSelectedRelease(props.releases.slice(0, 1)[0])
            activateRelease(props.releases.slice(0, 1)[0])
        }
    }, [props.releases])



    return (
        <article className='board-page-release-container'>
            <h2 className='board-page-release-header-lbl'>Release</h2>
            <article className='board-page-release-list-container'>
                <ListItem className='board-page-release-list'>
                    {
                        releaseList.map((releaseItem) => {
                            return <Chip key={releaseItem.release.id}
                                size='medium'
                                variant={releaseItem.isActive ? 'filled' : 'outlined'}
                                color={releaseItem.isActive ? 'primary' : 'default'}
                                label={releaseItem.release.tittle}
                                onClick={() => {
                                    props.setSelectedRelease(releaseItem.release)
                                    activateRelease(releaseItem.release)
                                }}
                                onDelete={() => {
                                    setRelease(releaseItem.release)
                                    setIsRemoveReleaseOpen(true)
                                    
                                }} />
                        })
                    }
                    <RemoveRelease isRemoveReleaseOpen={isRemoveReleaseOpen} setIsRemoveReleaseOpen={setIsRemoveReleaseOpen} release={release} />
                    <IconButton onClick={() => {
                        setIsCreateReleaseOpen(true)
                    }}>
                        <AddIcon />
                    </IconButton>
                </ListItem>
                <CreateRelease
                    isReleaseOpen={isCreateReleaseOpen}
                    setIsReleaseOpen={setIsCreateReleaseOpen} />
            </article>
            <p className='board-page-release-purpose-lbl'>{props.purpose}</p>
        </article>
    )
}
export default ReleaseContainer;