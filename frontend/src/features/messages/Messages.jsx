import { useEffect, useState } from 'react'
import Dialog from '../../components/Dialog/Dialog'
import Chats from '../../components/chats/Chats'
import Contacts from '../../components/contacts/Contacts'
import './Messages.css'
import { Alert, Modal, Slide, Snackbar } from '@mui/material'
import { UnreadMessagesCount, getUserMessages } from './Service'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from '../../hooks/UseSnackBar'

export const Messages = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { snackBar, openSnackBar, closeSnackBar } = useSnackbar()

    const messages = useSelector((state) => state.messages)
    const projects = useSelector((state) => state.projects)
    const user = useSelector((state) => state.user)
    const [hasConversation, setHasConversation] = useState(false)


    useEffect(() => {
        getUserMessages(dispatch, navigate)
       const messageInterval = setInterval(() => {
            getUserMessages(dispatch, navigate,messageInterval)
        }, 60000)

    }, [])

    useEffect(() => {
        props.setUnreadMessages(UnreadMessagesCount(messages, user))
    }, [messages])


    return (
        <Modal
            open={props.isMessagesOpen}
            onClose={() => {
                props.setIsMessagesOpen(false)
            }}>
            <Slide direction="down" in={props.isMessagesOpen} mountOnEnter unmountOnExit>
                <section className='messages-window'>
                    <Chats messages={messages.results} user={user} setHasConversation={setHasConversation} />
                    <Dialog user={user} hasConversation={hasConversation} openSnackBar={openSnackBar} />
                    <Contacts projects={projects} setHasConversation={setHasConversation} openSnackBar={openSnackBar} />
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={snackBar.isOpen}
                        onClose={closeSnackBar}
                        autoHideDuration={5000} >
                        <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
                    </Snackbar>
                </section>

            </Slide>
        </Modal>
    )
}

export default Messages;