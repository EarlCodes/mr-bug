import DoneAllIcon from '@mui/icons-material/Mail';
import DoneIcon from '@mui/icons-material/MarkEmailRead';
import { Avatar, Badge } from '@mui/material';
import './ChatComponent.css'
import { useEffect, useState } from 'react';
import { getParticipant, getTotalUnreadMessages, isSender, recentMessage } from './Service';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMessage } from '../../../api/store/Slices/SelectedMessageSlice';
import { axiosUpdate } from '../../../utils/axiosRequestUtil/AxiosRequestUtil';
import { retrieveValueSessionStorage } from '../../../utils/sessionStorage/SessionStorageUtil';
import { CheckTokenExpired } from '../../../services/CheckTokenExpired';
import { setMessages } from '../../../api/store/Slices/MessagesSlice';
import { logout } from '../../../api/store/Slices/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { NetworkError } from '../../../services/networkErrors/NetworkErrors';
import { serverPath } from '../../../api/service/ServerPath';

const ChatComponent = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const conversations = useSelector((state) => state.messages)
    const [unReadMessages, setUnReadMessages] = useState(getTotalUnreadMessages(props.conversation, props.user))
    const user = props.user
    const convo = props.conversation
    const participant = getParticipant(props)
    const message = recentMessage(props)

    const mesageDate = new Date(message.date_created).toDateString()

    useEffect(() => {
        setUnReadMessages(getTotalUnreadMessages(convo, user))
    }, [convo])

    const handleSetSelectedConvo = () => {
        dispatch(setSelectedMessage(props.conversation))
        if (message.sender.id !== props.user.id) {
            markConversationsAsRead(props.conversation.id)
        }
        props.setHasConversation(true)
    }

    const markConversationsAsRead = (conversationId) => {
        const session_token = JSON.parse(retrieveValueSessionStorage('token'))
        const token = `Token ${session_token.token}`
        if (!CheckTokenExpired(session_token.expiry)) {
            axiosUpdate(`${serverPath}/mrbug/conversations/${conversationId}/`, token, {}).then((value) => {
                if (value.status === 200) {
                    dispatch(setMessages({
                        ...conversations,
                        results: conversations.results.map((convo) => {
                            if (convo.id === value.data.id) {
                                return value.data
                            } else {
                                return convo
                            }
                        })

                    }))
                    dispatch(setSelectedMessage(value.data))
                }
            }).catch((error) => { console.log(NetworkError(error)) })
        } else {
            navigate('/login')
            dispatch(logout())
        }
    }

    return (
        <section className='recent_messages_list_item_container' onClick={() => { handleSetSelectedConvo() }} >
            <Avatar alt="icon" className='messages_user_icon' src={`../assests/UserIcons/${participant.user_profile.avatar}.png`} sx={{ bgcolor: `${participant.user_profile.bgcolor}` }} />
            <section className='recent_messages_username_item_container'>
                <article className='recent_messages_username_time_container'>
                    <p className="recent_messages_username_lbl">{`${participant.first_name} ${participant.last_name}`}</p>
                    <p className="recent_messages_time_lbl">{mesageDate}</p>
                </article>
                <article className='recent_messages_message_icon_container'>
                    {
                        isSender(message, props.user) ? message.isRead ? <DoneIcon sx={{ width: '14px', heigth: '14px' }} color='tertiary' /> : <DoneAllIcon sx={{ width: '14px', heigth: '14px', 'color': 'rgba(54, 65, 62, 0.56)' }} /> : <></>
                    }
                    <p className='recent_messages_content_lbl'>{message.note}</p>
                    <div className='recent_messages_Unread_container'>
                        {
                            isSender(message, props.user) ? <></> : <Badge badgeContent={unReadMessages} color="primary" />
                        }
                    </div>
                </article>
            </section>
        </section>
    )
}

export default ChatComponent;