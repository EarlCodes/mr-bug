//Drawer for side navigation
import './Drawer.css';
import { Badge, Select } from '@mui/material/';
import { Button, List } from '@mui/material';
import { ReactComponent as Logo } from '../../vector/Logo.svg';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import './Drawer.css'
import { useDrawer } from './Hooks';

const Drawer = (props) => {
    const { drawer, setDrawerFieldSelected } = useDrawer()

    return (
        <nav className='drawer'>
            <header className='drawer-header'>
                <Logo className="drawer-logo" />
            </header>
            <h2 className='menu-heading-text'>Main Menu</h2>
            <List className='menu-list'>
                <li>
                    <article className='menu-list-item'
                        onClick={
                            () => {
                                setDrawerFieldSelected('project')
                                props.setSelectedPage('Projects')
                            }
                        }
                    >
                        <BusinessCenterRoundedIcon className="icon" sx={{ width: 24, height: 24, color: drawer.project.isSelected ? "#C7EF00" : "#e5e5e5e5" }} />
                        <p className="menu-list-label" style={{ color: drawer.project.isSelected ? "#C7EF00" : "#e5e5e5e5" }} >Projects</p>
                        {
                            drawer.project.isSelected ? <div className="menu-indicator" /> : <></>
                        }
                    </article>
                </li>
                <li >
                    <article className='menu-list-item'
                        onClick={
                            () => {
                                setDrawerFieldSelected('tasks')
                                props.setSelectedPage('Tasks')
                            }
                        }>
                        <ExtensionRoundedIcon className="icon" sx={{ width: 24, height: 24, color: drawer.tasks.isSelected ? "#C7EF00" : "#e5e5e5e5" }} />
                        <p className="menu-list-label" style={{ color: drawer.tasks.isSelected ? "#C7EF00" : "#e5e5e5e5" }} >Tasks</p>
                        <Badge badgeContent={12} size='small' color='primary' sx={{ marginLeft: 'auto', alignSelf: 'center', visibility: "collapse" }} className="menu-list-badge" />
                        {
                            drawer.tasks.isSelected ? <div className="menu-indicator" /> : <div className="menu-indicator" style={{ visibility: 'hidden' }} />
                        }
                    </article>
                </li>
            </List>
            <h2 className='menu-heading-text'>Workspace</h2>
            <Select size='small' label="Projects" className='menu-list-selector' />
            <List className='menu-list'>
                <li>
                    <article className='menu-list-item' onClick={
                        () => {
                            setDrawerFieldSelected('backlog')
                        }
                    } >
                        <AssignmentIcon className="icon" sx={{ width: 24, height: 24, color: drawer.backlog.isSelected ? "#C7EF00" : "#e5e5e5e5" }} />
                        <p className="menu-list-label" style={{ color: drawer.backlog.isSelected ? "#C7EF00" : "#e5e5e5e5" }}>Product Backlog</p>
                        <Badge badgeContent={12} color='primary' sx={{ marginLeft: 'auto', alignSelf: 'center', visibility: "collapse" }} className="menu-list-badge" />
                        {
                            drawer.backlog.isSelected ? <div className="menu-indicator" /> : <div className="menu-indicator" style={{ visibility: 'hidden' }} />
                        }
                    </article>
                </li >
                <li>
                    <article className='menu-list-item' onClick={
                        () => {
                            setDrawerFieldSelected('board')
                            props.setSelectedPage('Board')
                        }}>
                        <GridViewRoundedIcon className="icon" sx={{ width: 24, height: 24, color: drawer.board.isSelected ? "#C7EF00" : "#e5e5e5e5" }} />
                        <p className="menu-list-label" style={{ color: drawer.board.isSelected ? "#C7EF00" : "#e5e5e5e5" }}>Board</p>
                        {
                            drawer.board.isSelected ? <div className="menu-indicator" /> : <div className="menu-indicator" style={{ visibility: 'hidden' }} />
                        }
                    </article>
                </li>
                <li>
                    <article className='menu-list-item' onClick={
                        () => {
                            setDrawerFieldSelected('team')
                            props.setSelectedPage('Team')
                        }}>
                        <GroupsIcon className="icon" sx={{ width: 24, height: 24, color: drawer.team.isSelected ? "#C7EF00" : "#e5e5e5e5" }} />
                        <p className="menu-list-label" style={{ color: drawer.team.isSelected ? "#C7EF00" : "#e5e5e5e5" }}>Teams</p>
                        {
                            drawer.team.isSelected ? <div className="menu-indicator" /> : <div className="menu-indicator" style={{ visibility: 'hidden' }} />
                        }
                    </article>
                </li>
                <li>
                    <article className='menu-list-item' onClick={
                        () => {
                            setDrawerFieldSelected('stats')
                        }}>
                        <InsightsIcon className="icon" sx={{ width: 24, height: 24, color: drawer.stats.isSelected ? "#C7EF00" : "#e5e5e5e5" }} />
                        <p className="menu-list-label" style={{ color: drawer.stats.isSelected ? "#C7EF00" : "#e5e5e5e5" }}>Statistic</p>
                        {
                            drawer.stats.isSelected ? <div className="menu-indicator" /> : <div className="menu-indicator" style={{ visibility: 'hidden' }} />
                        }
                    </article>
                </li>
            </List>
            <h3 className='menu-heading-text'>Support</h3>
            <List className='menu-list'>
                <li>
                    <article className='menu-list-item' onClick={
                        () => {
                            setDrawerFieldSelected('setting')
                        }}>
                        <SettingsIcon className="icon" sx={{ width: 24, height: 24, color: drawer.setting.isSelected ? "#C7EF00" : "#e5e5e5e5" }} />
                        <p className="menu-list-label" style={{ color: drawer.setting.isSelected ? "#C7EF00" : "#e5e5e5e5" }}>Settings</p>
                        {
                            drawer.setting.isSelected ? <div className="menu-indicator" /> : <div className="menu-indicator" style={{ visibility: 'hidden' }} />
                        }
                    </article>
                </li>
            </List>
            <section className='app-helper'>
                <LiveHelpRoundedIcon />
                <p className='helper-label'>Need Help?</p>
                <p className='helper-des'>watch brief toturial on youtube to help you understand how the application works.</p>
            </section>
            <article className='helper-icon-container'>

            </article>
        </nav>
    )
}

export default Drawer;