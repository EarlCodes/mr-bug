import './CreateMember.css'

import { InputBase, Modal, IconButton, Avatar, Table, TableHead, Checkbox, Button, List, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/ArrowDropDown"
import OpenIcon from "@mui/icons-material/ArrowDropUp"

import Search from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import PermissionTableRow from "./PermissionTableRow/PermissionTableRow";
import { useDispatch, useSelector } from "react-redux";
import { handleAddMember, handleSearchUser } from './Services';
import { updateSelectedProject } from '../../services/UpdateSelectedProject';


const CreateMember = (props) => {
    
    const projects = useSelector((state) => state.projects)
    const selectedProject = useSelector((state) => state.selectedProject)
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(false)
    const [newMember, setNewMember] = useState({
        "user": 0,
        "team_id": 0,
        "member_permission": {
            "project": "",
            "backlog": "",
            "task": "",
            "bug": "",
            "release": "",
            "team": "",
            "group_members": "",
            "assign": ""
        }
    })
    const [suggestionList, setSuggestionList] = useState({
        isOpen: false,
        suggestionList: []
    })

    const [selectedUser, setSelectectedUser] = useState({
        isSelectedUser: false,
        user: {}

    })

    const [searchUsername, setSearchUsername] = useState("")

    const permmissionsRows = () => {
        const permissions = []
        for (const permission in newMember.member_permission) {
            permissions.push(permission)
        }
        return permissions
    }

    useEffect(() => {
        updateSelectedProject(projects, selectedProject, dispatch)
    }, [projects])

    return (
        <Modal
            disablePortal
            open={props.isMemberOpen}
            onClose={() => { props.setIsMemberOpen(false) }}
            style={{ position: 'absolute' }}>
            <section className="add-member-modal">
                <header>
                    <h2 className="add-member-modal-header-lbl">Add Member</h2>
                </header>
                <div className="add-member-search">
                    <InputBase
                        label="username"
                        placeholder="Username"
                        onChange={(e) => {
                            setSelectectedUser({
                                isSelectedUser: false,
                                user: {}
                            })
                            setSearchUsername(e.target.value)
                        }}
                        sx={{ width: "90%", border: '12px', marginLeft: '5px' }}
                        size="small"
                        variant="filled"
                        value={searchUsername}
                    />
                    {
                        isLoading ? <CircularProgress color='tertiary' size={"20px"} sx={{alignSelf:'center',marginRight:'5px'}}/>:<IconButton size="small" onClick={() => {
                            setIsLoading(true)
                            handleSearchUser(searchUsername, setSuggestionList,setIsLoading)
                            setSelectectedUser((prevState) => ({
                                ...prevState,
                                isSelectedUser: false
                            }))
                        }}>
                            <SearchIcon />
                        </IconButton>
                    }
                    
                </div>
                {
                    suggestionList.isOpen ? <section className="user-selection-suggestion-list">
                        <p className="user-selection-suggestion-lbl">suggestions</p>
                        <List>
                            {
                                suggestionList.suggestionList.map((user) => {
                                    return <li key={user.id}>
                                        <article className="user-selection-suggestion-item" onClick={() => {
                                            setSelectectedUser((prevState) => ({
                                                ...prevState,
                                                isSelectedUser: true,
                                                user: user
                                            }))

                                            setSuggestionList((prevState) => (
                                                {
                                                    ...prevState,
                                                    isOpen: false
                                                }
                                            ))

                                            setNewMember((prevState) => ({
                                                ...prevState,
                                                user: user.id,
                                                team_id: props.team.id
                                            }))
                                        }}>

                                            <Avatar src={`assests/UserIcons/${user.user_profile.avatar}.png`} alt="brave" sx={{ width: "24px", height: "24px", backgroundColor: `${user.user_profile.bgcolor}` }} />
                                            <p className="user-selection-suggestion-item-lbl">{`${user.first_name} ${user.last_name}`}</p>
                                        </article>
                                    </li>
                                })
                            }

                        </List>
                    </section> : undefined
                }
                {
                    selectedUser.isSelectedUser ?
                        <>
                            <article className="selected-user-container">
                                <Avatar src={`./assests/UserIcons/${selectedUser.user.user_profile.avatar}.png`} sx={{ bgcolor: `${selectedUser.user.user_profile.bgcolor}` }} />
                                <article className="selected-user-lbl-container">
                                    <p className="selected-user-head-lbl">{`${selectedUser.user.first_name} ${selectedUser.user.last_name}`}</p>
                                    <p className="selected-user-lbl">Software Developer</p>
                                </article>
                            </article>

                            <section>
                                <header className="permissions-header-container">
                                    <p className="permissions-lbl">Permissions</p>
                                    <IconButton size="small" sx={{ marginLeft: "auto" }}>
                                        <CloseIcon />
                                    </IconButton>
                                </header>

                                <section className="permissions-table-container" >
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th></th>
                                            <th><p className="permissions-table-header-lbl">Read</p></th>
                                            <th><p className="permissions-table-header-lbl">Write</p></th>
                                            <th><p className="permissions-table-header-lbl">Delete</p></th>
                                            <th><p className="permissions-table-header-lbl">Update</p></th>
                                        </tr>
                                            {
                                                permmissionsRows().map((permission, index) => {
                                                    return <PermissionTableRow key={index} permission={permission} setPermission={setNewMember} />
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </section>
                            </section>
                        </>
                        : <></>
                }

                <Button
                    disabled={selectedUser.isSelectedUser ? false : true}
                    sx={{ m: '10px' }}
                    variant={"contained"}
                    size="small"
                    onClick={() => {
                        handleAddMember(newMember, projects, selectedProject.id, props.release, props.team.id, dispatch)
                        setSuggestionList({
                            isOpen: false,
                            suggestionList: []
                        })
                        setSearchUsername("")
                        props.setIsMemberOpen(false)
                    }}>Add member</Button>
            </section>
        </Modal>
    )
}

export default CreateMember;