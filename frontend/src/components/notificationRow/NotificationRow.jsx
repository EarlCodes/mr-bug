import './NotificationRow.css'

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deleteNotification, markMessageRead } from './Service';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NotificationRow = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const note = props.note
    const notifications = useSelector((state) => state.notifications)
    
    return (
        <section className='notification-row-container' onClick={() => {
            if (!note.isRead) {
                markMessageRead(note.id, notifications, dispatch,navigate)
            }
        }}>
            {
                !note.isRead ? <div className='notification-row-read-indicator' /> : <div className='notification-row-read-indicator-none' />
            }
            <article className='notification-row-date-container'>
                <p className='notification-row-date'>{new Date(note.date_created).toUTCString()}</p>
                <p className='notification-row-message'>{note.description}</p>
            </article>
            <IconButton className='notification-btn' onClick={() => {
                deleteNotification(note.id,notifications, dispatch, navigate)
            }}>
                <DeleteIcon
                    sx={{ marginRight: "10px", width: '18px', height: '18px' }}
                    className="notification-delete-icon"
                />
            </IconButton></section>
    )
}

export default NotificationRow;