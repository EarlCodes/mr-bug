import './RegisterPage.css'

import '../login/LoginPage.css'
import { ReactComponent as DesignIcon1 } from '../../vector/RegisterDesign1.svg'
import { ReactComponent as DesignIcon2 } from '../../vector/RegisterDesign2.svg'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { React, useState } from 'react'
import { TextField, InputAdornment, Button, List, Avatar, Snackbar, Alert, FormControlLabel, Checkbox } from '@mui/material';
import {useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
//Icons
import Email from '@mui/icons-material/Email';
import Key from '@mui/icons-material/Key';
import CardMembership from '@mui/icons-material/CardMembership'
import AppRegistration from '@mui/icons-material/AppRegistration';
import { LogoSlogan } from '../../features/logoSlogan/LogoSlogan.jsx'
import { LoginRegisterNav } from '../../features/loginRegisterNav/LoginRegisterNav'
import { useUser } from '../../hooks/useUser'
import { usePassword, useUserFieldValidation } from './Hooks'
import { Avatars, handleFieldChange, registerNewUser } from './Service'
import { useSnackbar } from '../../hooks/UseSnackBar'

//States for input adorments    
function RegisterPage() {
    const navigate = useNavigate()
    const [isAvatarOpen, setIsAvatarOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        password: false,
        confirmPassword: false
    })
    const [avatar, setAvatar] = useState([...Avatars()])
    const { password, handleSetPassword } = usePassword()
    const { userFieldErrors, clearUserErrors, setUserErrors, checkFieldNullError, passwordValidation, doesPasswordMatch, emailValidation, isUserFieldValid } = useUserFieldValidation()
    const { user, setUserField, setUserProfile } = useUser()
    const { snackBar, openSnackBar, closeSnackBar } = useSnackbar()

    return (
        <section className='login_container'>
            <DesignIcon2 className='design_icon1' />
            <DesignIcon1 className='design_icon1' />
            <LogoSlogan />
            <LoginRegisterNav page="register" />
            <section className='register_content'>
                <p className='register_header'>Welcome</p>
                <p className='register_description'>Register for an account or</p>
                <p className='register_description'>Login to continue where you left</p>
                <form className='registerForm'>
                    <article className='username-avatar-container'>
                        <TextField
                            required
                            type='Username'
                            value={user.username}
                            error={userFieldErrors.username.isError}
                            helperText={userFieldErrors.username.label}
                            onChange={(event) => { handleFieldChange(event, "username", setUserField, checkFieldNullError) }}
                            id="filled-required"
                            label="username"
                            placeholder="Example@123Gmail.com"
                            variant="filled"
                            sx={{ width: '85%' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color='primary' />
                                    </InputAdornment>
                                ),
                            }} />
                        <Avatar src={`assests/UserIcons/${user.user_profile.avatar}.png`} className='register-avatar' alt='avatar' sx={{ marginLeft: "auto", bgcolor: `${user.user_profile.bgcolor}` }} onClick={() => {
                            setIsAvatarOpen(!isAvatarOpen)
                        }} />
                    </article>
                    {
                        isAvatarOpen ?
                            <List className='register-avatar-list'>
                                <input type='color' onChange={(e) => {
                                    setUserProfile("bgcolor", e.target.value)
                                }} onBlur={()=>{
                                    setIsAvatarOpen(!isAvatarOpen)
                                }} />
                                {
                                    avatar.map((avatar, index) => {
                                        return <Avatar src={`assests/UserIcons/${avatar}.png`} key={index} className='register-avatar' alt='avatar' sx={{ bgcolor: `${user.user_profile.bgcolor}`, width: 28, height: 28 }} variant="rounded" size='small' onClick={() => {
                                            setUserProfile("avatar", avatar)
                                            setIsAvatarOpen(false)
                                        }} />
                                    })
                                } </List> : <></>
                    }

                    <TextField
                        required
                        className='form_input'
                        type='email'
                        value={user.email}
                        error={userFieldErrors.email.isError}
                        helperText={userFieldErrors.email.label}
                        onChange={(event) => {
                            handleFieldChange(event, "email", setUserField, checkFieldNullError)
                            if (event.target.value !== "") {
                                emailValidation(event.target.value)
                            }
                        }}
                        label="Email"
                        placeholder="Example@123Gmail.com"
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color='primary' />
                                </InputAdornment>
                            ),
                        }} />
                    <TextField
                        required
                        className='form_input'
                        type='text'
                        label="Role"
                        value={user.role}
                        error={userFieldErrors.role.isError}
                        helperText={userFieldErrors.role.label}
                        onChange={(event) => { handleFieldChange(event, "role", setUserField, checkFieldNullError) }}
                        placeholder="Jhon"
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CardMembership color='primary' />
                                </InputAdornment>
                            ),
                        }} />
                    <TextField
                        required
                        className='form_input'
                        type='text'
                        label="First name"
                        value={user.first_name}
                        error={userFieldErrors.first_name.isError}
                        helperText={userFieldErrors.first_name.label}
                        onChange={(event) => { handleFieldChange(event, "first_name", setUserField, checkFieldNullError) }}
                        placeholder="Jhon"
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CardMembership color='primary' />
                                </InputAdornment>
                            ),
                        }} />
                    <TextField
                        required
                        className='form_input'
                        type='text'
                        label="Last name"
                        value={user.last_name}
                        error={userFieldErrors.last_name.isError}
                        helperText={userFieldErrors.last_name.label}
                        onChange={(e) => {
                            setUserField('last_name', e.target.value)
                            checkFieldNullError("last_name", e.target.value)
                        }}
                        placeholder="Steve"
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CardMembership color='primary' />
                                </InputAdornment>
                            ),
                        }} />
                    <TextField
                        required
                        type={isPasswordVisible.password ? "text" : "password"}
                        className='form_input'
                        label="password"
                        value={user.password}
                        error={userFieldErrors.password.isError}
                        helperText={userFieldErrors.password.label}
                        onChange={(e) => {
                            setUserField('password', e.target.value)
                            checkFieldNullError("password", e.target.value)
                            if (e.target.value !== "") passwordValidation(e.target.value)
                        }}
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key color='primary' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={() => {
                                            setIsPasswordVisible((prevState) => ({
                                                ...prevState,
                                                password: !isPasswordVisible.password
                                            }))
                                        }}
                                        aria-label="toggle password visibility"
                                        color='secondary'>
                                        {isPasswordVisible.password ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                    <TextField
                        required
                        className='form_input'
                        type={isPasswordVisible.confirmPassword ? "text" : "password"}
                        value={password}
                        helperText={userFieldErrors.confirm_password.label}
                        error={userFieldErrors.confirm_password.isError}
                        onChange={(e) => {
                            handleSetPassword(e.target.value)
                            doesPasswordMatch(user.password, e.target.value)
                        }}
                        label="Confirm password"
                        placeholder="Example@123Gmail.com"
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key color='primary' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={() => {
                                            setIsPasswordVisible((prevState) => ({
                                                ...prevState,
                                                confirmPassword: !isPasswordVisible.confirmPassword
                                            }))
                                        }}
                                        aria-label="toggle password visibility"
                                        color='secondary'>
                                        {isPasswordVisible.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                    <FormControlLabel required control={<Checkbox onChange={(event) => {
                        if (event.target.checked === true) {
                            clearUserErrors("termsAndConditions")
                        } else {
                            setUserErrors("termsAndConditions", "Must agree to terms and conditions before using the app")
                        }
                    }
                    } />} label="you agree to terms and conditions."  checked={!userFieldErrors.termsAndConditions.isError} />
                    <Button
                        disabled={!isUserFieldValid(userFieldErrors,user.email) }
                        variant="contained"
                        color='primary'
                        size='large'
                        onClick={() => {
                            registerNewUser(user, isUserFieldValid, userFieldErrors, openSnackBar, setUserErrors, navigate,setIsLoading)
                        }}
                        endIcon={<AppRegistration />} >Register</Button>
                </form>
            </section>
            {isLoading ? <CircularProgress
                className='progress_indicator' /> : <></>}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackBar.isOpen}
                onClose={closeSnackBar}
                autoHideDuration={5000} >
                <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
            </Snackbar>
        </section>
    );
}


export default RegisterPage