import { Avatar, CircularProgress, IconButton, InputBase, List } from '@mui/material'
import './Contacts.css'
import SearchIcon from '@mui/icons-material/Search'

import CloseIcon from '@mui/icons-material/CancelRounded'

import ContactsComponent from './contactComponent/ContactComponent'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedMessage } from '../../api/store/Slices/SelectedMessageSlice'
import { useState } from 'react'
import { handleSearchUser } from './Services'
import { Navigate, useNavigate } from 'react-router-dom'

const Contacts = (props) => {
    const [sugestedMemberList, setSugestedMemberList] = useState([])
    const [searchUser, setSearchUser] = useState("")
    const [isSuggestionOpen, setIsSuggestionOpen] = useState(false)
    const user = useSelector((state) => state.user)
    const messages = useSelector((state) => state.messages)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(false)

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
        <section className='contact-list-container'>
            <header className='contact-list-header-container'>
                <p className='contact-list-header-lbl'>Contacts</p>
                <div className='contact-list-search-textfield-container'>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="search for users"
                        inputProps={{ 'aria-label': 'search for users' }}
                        value={searchUser}
                        onChange={(event) => {
                            setSearchUser(event.target.value)
                        }}
                    />
                    {
                        isLoading ? <CircularProgress size='20px' sx={{alignSelf:'center',marginRight:'5px'}} /> : <IconButton
                        disabled={searchUser === '' ? true : false}
                        onClick={() => {
                            handleSearchUser(searchUser, setSugestedMemberList, navigate,dispatch,props.openSnackBar,setIsLoading)
                            setIsSuggestionOpen(true)
                        
                        }}

                        size='small'><SearchIcon /></IconButton>
                    }
                    
                        
                        
                </div>
            </header>
            {
                isSuggestionOpen ? <>
                    <article className='contact-search-user-list-header' >
                        <p className='contact-search-user-list-item-suggestion-lbl'>Suggestions</p>
                        <IconButton size='small' onClick={() => {
                            setIsSuggestionOpen(false)
                        }}>
                            <CloseIcon />
                        </IconButton>
                    </article>
                    <List className='contact-search-user-list'>
                        {
                            sugestedMemberList.map((member) => {
                                return <li className='contact-search-user-list-item' onClick={() => {
                                    handleOnMemberClick(user, member, messages)
                                }}>
                                    <Avatar alt={"Steve"} src={`../assests/UserIcons/${member.user_profile.avatar}.png`} sx={{ backgroundColor: `${member.user_profile.bgcolor}`, width: '30px', height: '30px' }} />
                                    <p className='contact-search-user-list-item-lbl'>{`${member.first_name} ${member.last_name}`}</p>
                                </li>
                            })
                        }
                    </List>
                </> : <></>
            }

            <p className='contact-list-organization-lbl'>Organizations</p>
            {
                props.projects.count != 0 ? <List className='contact-list'>
                    {
                        props.projects.results.map((project) => {
                            return <li key={project.id} className='list-item-container'>
                                <ContactsComponent project={project} setHasConversation={props.setHasConversation} />
                            </li>
                        })
                    }
                </List> : <section>
                    <p className='no-contact-list-lbl'>You have not been enrolled to any organizations yet</p>
                </section>
            }

        </section>
    )
}

export default Contacts;