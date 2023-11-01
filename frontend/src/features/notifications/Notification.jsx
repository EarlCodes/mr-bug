import { Badge, Button, List, Modal, Slide } from '@mui/material'
import UnreadIcon from "@mui/icons-material/MarkAsUnread"
import './Notification.css'
import NotificationRow from '../../components/notificationRow/NotificationRow'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getNotification, unreadNotifications } from './Service'

const Notification = (props) => {
    const dispatch = useDispatch()
    const stored_notification = useSelector((state) => state.notifications)
    const [isUnReadSelected, setIsUnReadSelected] = useState(false)
    const [unreadNotiications, setUnreadNotifications] = useState(0)
    const setunreadMessages = props.setunreadMessages
    const [notification, setNotifications] = useState({
        results: []
    })


    useEffect(() => {
        getNotification(dispatch)
    }, [])

    
    useEffect(()=>{
        const unread_notification = unreadNotifications(notification.results)
        setunreadMessages(unread_notification)
        setUnreadNotifications(unread_notification)
        
    },[notification])

    useEffect(() => {
        setNotifications(stored_notification)
    }, [stored_notification])


    const unreadMessages = () => {
        setIsUnReadSelected(true)
        setNotifications((prevState) => ({
            ...prevState,
            results: prevState.results.filter((value) => {
                return value.isRead === false
            })
        }))
    }

    return (
        <Modal open={props.isNotificationOpen} onClose={() => {
            props.setIsNotificationOpen(false)
        }} sx={{ position: "absolute" }}>
            <Slide direction="down" in={props.isNotificationOpen} mountOnEnter unmountOnExit>
                <section className="notification-modal">
                    <header>
                        <h2 className="notification-modal-header-label" >Notification</h2>
                    </header>
                    <section className="notification-modal-message-btns">
                        <Button
                            variant={isUnReadSelected ? 'text' : 'contained'}
                            color={isUnReadSelected ? 'black' : 'primary'}
                            size='small'
                            sx={{ borderRadius: "16px" }}
                            onClick={() => {
                                setIsUnReadSelected(false)
                                setNotifications(stored_notification)
                            }}>All</Button>

                        <Badge
                            color='primary'
                            badgeContent={unreadNotiications}>
                            <Button
                                variant={isUnReadSelected ? 'contained' : 'text'}
                                color={isUnReadSelected ? 'primary' : 'black'}
                                startIcon={<UnreadIcon />}
                                size='small'
                                sx={{ borderRadius: "16px" }}
                                onClick={() => {
                                    unreadMessages()
                                }} >Unread</Button>
                        </Badge>

                    </section>

                    <List className="notification-modal-message-list">
                        {notification.results.map((note) => {
                            return <li key={note.id}>
                                <NotificationRow note={note}/>
                            </li>
                        })}
                    </List>
                </section>
            </Slide>
        </Modal>
    )
}

export default Notification;