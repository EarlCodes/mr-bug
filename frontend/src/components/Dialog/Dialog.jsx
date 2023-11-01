import './Dialog.css'

import { Modal, Slide, InputBase, InputAdornment, List, formControlLabelClasses, Avatar, CircularProgress } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';
import MoreIcon from '@mui/icons-material/MoreRounded';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SendIcon from '@mui/icons-material/Send'
import { IconButton } from '@mui/material';
import DialogComponent from './DialogComponent/DialogComponent';
import { createNewMessage, getParticipant, isSender } from './Services';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMessage } from '../../api/store/Slices/SelectedMessageSlice';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';


const Dialog = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const conversation = useSelector((state) => state.selectedMessage)
    const userConversations = useSelector((state) => state.messages)
    const participant = getParticipant(conversation, props.user)

    const [newMessage, setNewMessage] = useState({
        note: "",
        sender: props.user.id,
        conversation: 0
    })

    useEffect(() => {
        userConversations.results.map((message) => {
            if (message.id === conversation.id) {
                dispatch(setSelectedMessage(message))
            }
        })
    }, [userConversations])


    const isMessageSameDay = (message, index, array) => {
        let isSameDayMessage = false
        if (index > 0) {
            if (dayjs(dayjs(new Date(message.date_created).toISOString())).isSame(dayjs(array[index - 1].date_created),'day')) {
                isSameDayMessage = true
            } 
            return isSameDayMessage
        }
    }

    return (

        <section className='selected-dialog-container'>
            {participant.id != 0 ?
                <>
                    <header className='selected-dialog-header-container'>
                        <Avatar alt="img" src={`../assests/UserIcons/${participant.user_profile.avatar}.png`} sx={{ bgcolor: `${participant.user_profile.bgcolor}` }} />
                        <article className='selected-dialog-header-article'>
                            <p className='selected-dialog-header-name-lbl'>{`${participant.first_name} ${participant.last_name}`}</p>
                        </article>
                        <MoreIcon sx={{ marginLeft: 'auto', marginRight: '20px' }} />
                    </header>
                    {
                        conversation.conversations != 0 ? <List className='dialog-list'>
                            {
                                conversation.conversations.map((message, index, array) => {
                                    return <li key={message.id} className='dialog-list-item' >
                                        {
                                            isMessageSameDay(message, index, array) ? <></> : <p className='selected-dialog-tag-date'>{new Date(message.date_created).toUTCString().slice(0, 16)}</p>
                                        }
                                        <DialogComponent type={isSender(message, props.user) ? "receiver" : "sender"} message={message} isSender={isSender(message, props.user)} />
                                    </li>
                                })
                            }
                        </List> : <section className='no-conversation-message-container'>
                            <img src='./assests/animations/Conversation.png' alt='' className='no-conversation-message-img' />
                            <p className='no-conversation-message-lbl'>You have no messages.</p>
                        </section>
                    }

                    <div className='create-message-input-field-container'>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Create new message..."
                            inputProps={{ 'aria-label': 'create new message' }}
                            value={newMessage.note}
                            onChange={(event) => {
                                setNewMessage((prevState) => ({
                                    ...prevState,
                                    note: event.target.value,
                                    conversation: conversation.id
                                }))
                            }}
                        />
                        {
                            isLoading ? <CircularProgress size={'20px'} color='tertiary' sx={{ alignSelf: 'center', marginRight: '5px' }} /> : <IconButton disabled={newMessage.note === "" ? true : false} size='small' onClick={() => {
                                setIsLoading(true)
                                createNewMessage(newMessage, participant, dispatch, props.hasConversation, navigate, props.openSnackBar,setIsLoading)
                                setNewMessage({
                                    note: "",
                                    sender: props.user.id,
                                    conversation: 0
                                })
                            }}><SendIcon /></IconButton>
                        }

                    </div>
                </> : <section className='no-selected-conversation-dialogs'>
                    <img src='./assests/animations/LadyDesk.png' className='no-selected-conversation-img' alt='no selected conversation' />
                    <p className='no-selected-conversation-lbl'>Fast and effective way to communicate with your team members</p>
                </section>
            }
        </section>

    )
}

export default Dialog;