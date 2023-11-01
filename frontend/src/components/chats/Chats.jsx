import './Chats.css'
import { List } from '@mui/material'
import ChatComponent from './chatComponent/ChatComponent'


const Chats = (props) => {

    return (
        <section className='recent-chats-container'>
            <header className='recent-chats-header' >
                <p className='recent-chats-header-label'>Chats</p>
            </header>
            {
                props.messages.length != 0 ? <List className='recent-chats-list'>
                    {
                        props.messages.map((conversation) => {
                            return <li key={conversation.id}>
                                <ChatComponent conversation={conversation} user={props.user} setHasConversation={props.setHasConversation} />
                            </li>
                        })
                    }
                </List> : <section className='no-recent-chats-list-container'>
                    <p className='no-recent-chats-list-lbl'>You have no chats at this moment</p>
                </section>
            }

        </section>
    )
}

export default Chats;