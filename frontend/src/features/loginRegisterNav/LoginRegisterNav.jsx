import { Link } from 'react-router-dom';
import './LoginRegisterNav.css'
import { Button } from "@mui/material";
import { ReactComponent as LogoIcon } from '../../vector/Logo.svg'
import { ReactComponent as SeperationIcon } from '../../vector/seperation.svg'


export const LoginRegisterNav = (props) => {
    return (
        <section className='loginRegister_container'>
            <Button><Link to='/login' className={props.page === "login" ? "current-link" : "link"} color='secondary'>Login</Link></Button>
            <SeperationIcon className='separation' />
            <Button><Link className={props.page === "register" ? "current-link" : "link"} to='/register'>Register</Link></Button>
            <LogoIcon className='small_logo' />
        </section>
    )
}