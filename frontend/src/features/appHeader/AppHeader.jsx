import './AppHeader.css'

import { ReactComponent as SeparationIcon } from '../../vector/seperation.svg';
import { Avatar, MenuItem } from "@mui/material";
import { IconButton, Badge } from "@mui/material";
//Icons
import ForumOutlined from '@mui/icons-material/ForumOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import { useEffect, useState } from 'react';
import Profile from '../profile/Profile';
import { useSelector } from 'react-redux';


const AppHeader = (props) => {
    const [openProfile, setOpenProfile] = useState(false);
    const user = useSelector((state) => state.user)

    //Notifications toggle options
    const handleOpenProfile = () => {
        setOpenProfile(true);
    };
    const handleCloseProfile = () => {
        setOpenProfile(false);
    };
    return (
        <section className='app-header'>
            <IconButton className="messages-button" onClick={() => {
                props.setIsMessagesOpen(true)}}>
                    
                <Badge badgeContent={props.unreadMessages} color="tertiary">
                    <ForumOutlined />
                </Badge>
            </IconButton>

            <IconButton className="notifications" onClick={() => { 
                props.setIsNotificationOpen(true)
            }}>
                <Badge badgeContent={props.unreadNotifications} color="tertiary">
                    <NotificationsOutlined />
                </Badge>
            </IconButton>
            <SeparationIcon />
            <section className="user-profile">
                <Avatar alt='BLACLL' sx={{ bgcolor: `${user.user_profile.bgcolor}` }} src={`../assests/UserIcons/${user.user_profile.avatar}.png`} className="user-icon" onClick={() => {
                    openProfile ? handleCloseProfile() : handleOpenProfile()}} />
                <Profile open={openProfile} handleClose={handleCloseProfile}/>            
            </section>
        </section>
    )
}

export default AppHeader;