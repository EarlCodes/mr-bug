import './Profile.css'
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Badge, Button, List, Modal, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, handleGetAvatars, handleUpDateUserProfile } from './Service';
import { useUserChangedField, useUserErrorFields } from './Hook';
import { setUser as redux_setUser } from "./../../api/store/Slices/UserSlice";
import { removeValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/store/Slices/LoginSlice';

const Profile = (props) => {
    const [avatars, setAvatars] = useState(handleGetAvatars({}))
    const { user, setUserField, setUserProfile, setUser } = useUser()
    const { userFieldChanged, checkFieldChange, checkProfileChanged, resetUserFieldChanged, isFieldChanged } = useUserChangedField()
    const { userFieldError, setFieldError, clearFieldError, setFieldChangeProfile, emailValidation, resetUserFieldErrors, isFieldErrorsEnabled } = useUserErrorFields()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const stored_user = useSelector((state) => state.user)

    useEffect(() => {
        getUserDetails(dispatch,navigate)
    }, [])

    useEffect(() => {
        setUser(stored_user)
    }, [stored_user])

    useEffect(() => {
        isFieldChanged()
    }, [userFieldChanged.email, userFieldChanged.last_name, userFieldChanged.first_name, userFieldChanged.email, userFieldChanged.user_profile])


    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            style={{ position: 'absolute' }}
        >
            <section className='profile-modal'>
                <header >
                    <h3 className='profile-modal-header-lbl'>Profile</h3>
                </header>
                <Badge badgeContent={userFieldChanged.user_profile.avatar.isChanged | userFieldChanged.user_profile.bgcolor.isChanged ? "" : 0} color='primary' sx={{ alignSelf: 'center' }} size='smail'>
                    <Avatar
                        sx={{ width: '88px', height: '88px', bgcolor: `${user.user_profile.bgcolor}` }}
                        src={`../assests/UserIcons/${user.user_profile.avatar}.png`} />
                </Badge>
                <article className='profile-modal-avatar-container'>
                    <header className='profile-avatar-header'>
                        <p className='profile-personal-info-lbl'>Avatar</p>

                        <input type='color' onChange={(event) => {
                            setUserProfile("bgcolor", event.target.value)
                            checkProfileChanged('bgcolor', stored_user.user_profile.bgcolor, event.target.value)
                        }}
                            value={user.user_profile.bgcolor} />
                    </header>
                    <List className='profile-avatar-list'>
                        {
                            avatars.map((icon, index) => {
                                return <li key={index} className='profile-avatar-list-item'  >
                                    <Avatar alt='jb' variant="rounded" src={`../assests/UserIcons/${icon}.png`} sx={{ width: "30px", height: "30px", bgcolor: `` }} onClick={() => {
                                        setUserProfile("avatar", icon)
                                        checkProfileChanged('avatar', stored_user.user_profile.avatar, icon)
                                    }} />
                                </li>
                            })
                        }
                    </List>
                </article>
                <section className='profile-avatar-container'>
                    <header>
                        <p className='profile-personal-info-lbl'>Personal information</p>
                    </header>
                    <form className='profile-personal-info-form'>
                        <TextField
                            label="username"
                            value={stored_user.username}
                            variant="outlined"
                            sx={{ width: '100%' }} />
                        <TextField
                            label="Role"
                            variant="outlined"
                            value={user.role}
                            sx={{ width: '100%' }} />
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={user.email}
                            error={userFieldError.email.isError}
                            helperText={userFieldError.email.label}
                            onChange={(event) => {
                                setUserField('email', event.target.value)
                                emailValidation("email", stored_user.email, event.target.value)
                            }}
                            sx={{ width: '100%' }} />
                        <TextField
                            label="First name"
                            value={user.first_name}
                            error={userFieldError.first_name.isError}
                            helperText={userFieldError.first_name.label}
                            onChange={(event) => {
                                setUserField('first_name', event.target.value)
                                checkFieldChange("first_name", stored_user.first_name, event.target.value, setFieldError, clearFieldError)
                            }}

                            variant="outlined"
                            sx={{ width: '100%' }} />
                        <TextField
                            label="Last name"
                            value={user.last_name}
                            error={userFieldError.last_name.isError}
                            helperText={userFieldError.last_name.label}
                            onChange={(event) => {
                                setUserField('last_name', event.target.value)
                                checkFieldChange("last_name", stored_user.last_name, event.target.value, setFieldError, clearFieldError)
                            }}
                            variant="outlined"
                            sx={{ width: '100%' }} />
                        {userFieldChanged.isFieldChangedValid ? <p className='profile-update-status'>"Field changed update required"</p> : <></>}
                        <Button
                            startIcon={<UpdateIcon />}
                            variant='contained'
                            onClick={() => {
                                handleUpDateUserProfile(user, redux_setUser, dispatch,navigate, resetUserFieldChanged, resetUserFieldErrors, isFieldErrorsEnabled, isFieldChanged)
                            }}

                            color="primary">Update</Button>
                        <Button
                            startIcon={<LogoutIcon />}
                            onClick={() => {
                                removeValueSessionStorage('token')
                                dispatch(logout())
                                navigate('/login')
                            }}
                            variant='contained'
                            color="error">Logout</Button>
                    </form>
                </section>
            </section>
        </Modal>
    )
}

export default Profile;