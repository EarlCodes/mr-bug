import './DialogComponent.css'

import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';

const DialogComponent = (props) => {
    const message = props.message
    const isSender = props.isSender
    const mesageDate = new Date (message.date_created).toTimeString().slice(0,5)

    return (
        <section className={props.type === 'sender' ? 'chat-dialog dialog-sender' : 'chat-dialog dialog-user'}>
            <header>
                <p className="chat-dialog-message-lbl" style={{color: props.type === "sender" ? "#e5e5e5e5":"#36413E"}} >{message.note}</p>
            </header>

            <footer className='chat_messages_dialog_user_header_container'>
                {isSender ?  message.isRead ? <DoneAllIcon sx={{ width: 14, height: 14, marginRight: 'auto' }} color='black' />:<DoneIcon sx={{ width: 14, height: 14, marginRight: 'auto' }} color='black' />:<></> }
                <p className='chat-messages-dialog-user-time-lbl' style={{color: props.type === "sender" ? "#e5e5e5e5":"#36413E"}} >{mesageDate}</p>
            </footer>
        </section>
    )
}

export default DialogComponent;