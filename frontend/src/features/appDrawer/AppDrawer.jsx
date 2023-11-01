import './AppDrawer.css'
import { ReactComponent as Logo } from '../../vector/Logo.svg';
import { Badge, IconButton, List } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import { useDrawer } from './Hooks';
import { useSelector } from 'react-redux';

const AppDrawer = (props) => {
    const { drawer, setDrawerFieldSelected } = useDrawer()
    const projects = useSelector((state) => state.projects)

    return (
        <nav className='app-drawer-top'>
            <Logo style={{ width: '30px', height: '30px' }} />
            <List className='app-drawer-icons-list'>
                <li className='app-drawer-icons-list-item'>
                    <IconButton
                        onClick={
                            () => {
                                setDrawerFieldSelected('project')
                                props.setSelectedPage('Projects')
                            }
                        }
                        size='small'>
                        <BusinessCenterRoundedIcon color={drawer.project.isSelected ? 'tertiary' : 'light'} sx={{ width: '21px', height: '21px' }} />
                    </IconButton>
                    {drawer.project.isSelected ? <p className='app-drawer-icons-list-item-txt'>Projects</p> : <></>}
                </li>
                {
                    projects.count != 0 ? <>
                        <li className='app-drawer-icons-list-item'>
                            <IconButton
                                onClick={
                                    () => {
                                        setDrawerFieldSelected('tasks')
                                        props.setSelectedPage('Tasks')
                                    }
                                }
                                size='small'>
                                <AssignmentIcon color={drawer.tasks.isSelected ? 'tertiary' : 'light'} sx={{ width: '21px', height: '21px' }} />
                            </IconButton>
                            {drawer.tasks.isSelected ? <p className='app-drawer-icons-list-item-txt'>Tasks</p> : <></>}
                        </li>
                        <li className='app-drawer-icons-list-item'>
                            <IconButton
                                onClick={
                                    () => {
                                        setDrawerFieldSelected('board')
                                        props.setSelectedPage('Board')
                                    }}
                                size='small'>
                                <ExtensionRoundedIcon color={drawer.board.isSelected ? 'tertiary' : 'light'} sx={{ width: '21px', height: '21px' }} />
                            </IconButton>
                            {drawer.board.isSelected ? <p className='app-drawer-icons-list-item-txt'>Boards</p> : <></>}
                        </li>
                        <li className='app-drawer-icons-list-item'>
                            <IconButton
                                onClick={
                                    () => {
                                        setDrawerFieldSelected('team')
                                        props.setSelectedPage('Team')
                                    }}
                                size='small'>
                                <GroupsIcon color={drawer.team.isSelected ? 'tertiary' : 'light'} sx={{ width: '21px', height: '21px' }} />
                            </IconButton>
                            {drawer.team.isSelected ? <p className='app-drawer-icons-list-item-txt'>Teams</p> : <></>}
                        </li>
                        <li className='app-drawer-icons-list-item'>
                            <IconButton size='small' disabled>
                                <SettingsIcon color={drawer.setting.isSelected ? 'tertiary' : 'light'} sx={{ width: '21px', height: '21px' }} />
                            </IconButton>
                            {drawer.setting.isSelected ? <p className='app-drawer-icons-list-item-txt'>Settings</p> : <></>}
                        </li>
                    </> : <></>
                }

            </List>
        </nav>
    )
}

export default AppDrawer;