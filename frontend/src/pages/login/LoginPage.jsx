import './LoginPage.css'
import { ReactComponent as DesignIcon1 } from '../../vector/loginDesign1.svg'
import { ReactComponent as DesignIcon2 } from '../../vector/loginDesign2.svg'
import { React, useState, useEffect } from 'react'
import { TextField, InputAdornment, Button, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

//Icons
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Key from '@mui/icons-material/Key';
import Login from '@mui/icons-material/Login';
import CardMembership from '@mui/icons-material/CardMembership';
import { useLoginUser, useLoginFieldErrors } from './hooks.js'

import { handleSubmit } from './Service'
import { useSnackbar } from '../../hooks/UseSnackBar'
import { LogoSlogan } from '../../features/logoSlogan/LogoSlogan'
import { LoginRegisterNav } from '../../features/loginRegisterNav/LoginRegisterNav'

//States for input adorments    
const LoginPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { handleUser, user } = useLoginUser()
    const { checkFieldError, setFieldError, userFieldErrors } = useLoginFieldErrors()
    const { snackBar, openSnackBar, closeSnackBar } = useSnackbar()

    return (
        <section className='login_container'>
            <DesignIcon2 className='design_icon1' />
            <DesignIcon1 className='design_icon1' />
            <LogoSlogan />
            <LoginRegisterNav page="login" />
            <section className='login_content'>
                <p className='login_header'>Welcome</p>
                <p className='login_description'>Login to continue where you left or</p>
                <p className='login_description'>register for an account.</p>
                <form className='loginForm'>
                    <TextField
                        required
                        error={userFieldErrors.username.isError}
                        helperText={userFieldErrors.username.label}
                        className=""
                        type='text'
                        label="Username"
                        placeholder="DoeJhon"
                        variant="filled"
                        value={user.username}
                        onChange={(e) => {
                            handleUser('username', e.target.value)
                            checkFieldError('username', e.target.value)
                        }}

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CardMembership color='primary' />
                                </InputAdornment>
                            ),
                        }} />

                    <TextField
                        required
                        type={isPasswordVisible ? "text" : "password"}
                        error={userFieldErrors.password.isError}
                        helperText={userFieldErrors.password.label}
                        value={user.password}
                        className='form_input'
                        id="filled-basic"
                        label="password"
                        variant="filled"
                        onChange={(e) => {
                            handleUser("password", e.target.value)
                            checkFieldError("password", e.target.value)
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key color='primary' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { setIsPasswordVisible(!isPasswordVisible) }}
                                        color='secondary'>
                                        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                    <Button
                        disabled={userFieldErrors.password.isError | userFieldErrors.username.isError ? true : false}
                        variant="contained"
                        color='primary'
                        size='large'
                       
                        onClick={() => {
                            handleSubmit(user, userFieldErrors, setFieldError, navigate, setIsLoading, openSnackBar)
                        }}
                        endIcon={<Login />}>Login</Button>
                    <Link to='/register' className='login'>
                        <Button
                        sx={{width:"100%"}}
                            variant="outlined"
                            color='primary'
                            size='large'>Register</Button>
                    </Link>
                </form>
            </section>
            {isLoading ? <CircularProgress className='progress_indicator' /> : <></>}
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

export default LoginPage
