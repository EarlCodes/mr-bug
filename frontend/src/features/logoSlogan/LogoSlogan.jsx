import "./LogoSlogan.css"
import { ReactComponent as LogoIcon } from '../../vector/Logo.svg'

export const LogoSlogan = () => {
    return (
        <header className='logo_div'>
                <LogoIcon className='big_logo' />
                <h1 className='app_name'>Mr Bug</h1>
                <p className='app_description' >Project management and Bug tracking application</p>
            </header>
    )
}