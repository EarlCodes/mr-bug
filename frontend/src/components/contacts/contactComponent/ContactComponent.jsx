import { Avatar, List } from '@mui/material';
import './ContactComponent.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMessage } from '../../../api/store/Slices/SelectedMessageSlice';

const ContactsComponent = (props) => {
    const [members, setMembers] = useState([])
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const messages = useSelector((state) => state.messages)

    useEffect(() => {
        let temp_member = []
        props.project.project_releases.map((release) => {
            release.teams_working_on.map((team) => {
                team.members_team.map((member) => {
                    if (member.user.id != user.id) {
                        temp_member.push(member)
                    }
                })
            })
        })
        setMembers([...new Set(temp_member)])
    }, [props.project])

    const handleOnMemberClick = (participant_one, participant_two, messages) => {
        props.setHasConversation(false)
        const CONVERSATION = {
            conversations: [],
            participant_one: participant_one,
            participant_two: participant_two,
            id: 0
        }
        dispatch(setSelectedMessage(CONVERSATION))

        messages.results.map((message) => {
            if (message.participant_one.id == participant_one.id && message.participant_two.id == participant_two.id || message.participant_one.id == participant_two.id && message.participant_two.id == participant_one.id) {
                console.log("has conversation")
                props.setHasConversation(true)
                dispatch(setSelectedMessage(message))
            }
        })
    }

    return (
        <section className='contact-orgarnization-list-item'>
            <header className='contact-list-item-header'>
                <p className='contact-list-item-header-lbl'>{props.project.tittle}</p>
            </header>

            <List className='contact-list-item-list'>
                {
                    members.map((member) => {
                        return <li className='list-item-container' key={member.id} onClick={() => {
                            handleOnMemberClick(user, member.user, messages)
                        }}>
                            <article className='contact-list-item'>
                                <Avatar alt={"Steve"} src={`../assests/UserIcons/${member.user.user_profile.avatar}.png`} sx={{ backgroundColor: ``, width: '36px', height: '36px' }} />
                                <p className='contact-list-item-lbl'>{`${member.user.first_name} ${member.user.last_name}`}</p>
                            </article>
                        </li>
                    })
                }
            </List>
        </section>
    )
}
export default ContactsComponent;