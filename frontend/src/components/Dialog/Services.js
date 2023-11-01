import { serverPath } from "../../api/service/ServerPath";
import { logout } from "../../api/store/Slices/LoginSlice";
import { setMessages } from "../../api/store/Slices/MessagesSlice";
import { setSelectedMessage } from "../../api/store/Slices/SelectedMessageSlice";
import { CheckTokenExpired } from "../../services/CheckTokenExpired";
import { NetworkError } from "../../services/networkErrors/NetworkErrors";
import { axiosGet, axiosPost } from "../../utils/axiosRequestUtil/AxiosRequestUtil";
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil";

export const getParticipant = (conversation, user) => {
    let participant;

    if (conversation.participant_one.id === user.id) {
        participant = conversation.participant_two
    } else {
        participant = conversation.participant_one
    }
    return participant;
}

export const isSender = (message, user) => {
    let isSender = false
    if (message.sender.id === user.id) {
        isSender = true
    } else {
        isSender = false
    }
    return isSender
}


export const createNewMessage = (message, participant, dispatch, hasConversation, navigate, openSnackBar, setIsLoading) => {
    setIsLoading(true)
    let token = JSON.parse(retrieveValueSessionStorage("token"))
    if (hasConversation) {
        postMessage(token, message, dispatch, navigate, openSnackBar, setIsLoading)
    } else {
        if (!CheckTokenExpired(token.expiry)) {
            createConversation({ participant_two: participant.id }).then((value) => {
                if (value.status === 201) {
                    const newMessage = { ...message, conversation: value.data.id }
                    postMessage(token, newMessage, dispatch, navigate, openSnackBar, setIsLoading)

                }
            }).catch((error) => {
                openSnackBar('error', NetworkError(error))
                setIsLoading(false)
            })
        } else {
            navigate('/login')
            dispatch(logout())
        }
    }
}

const getUserMessages = (token, dispatch, navigate, openSnackBar) => {
    if (!CheckTokenExpired(token.expiry)) {

        axiosGet(`${serverPath}/mrbug/conversations/`, `token ${token.token}`).then((value) => {
            if (value.status === 200) {
                dispatch(setMessages(value.data))
                return value.data
            }
        }).catch((error) => {
            openSnackBar('error', NetworkError(error))
        })
    } else {
        navigate('/login')
        dispatch(logout())
    }
}

const postMessage = (token, message, dispatch, navigate, openSnackBar, setIsLoading) => {
    if (!CheckTokenExpired(token.expiry)) {
        axiosPost(`${serverPath}/mrbug/messages/`, `token ${token.token}`, message).then((newMessage) => {
            if (newMessage.status === 201) {
                getUserMessages(token, dispatch)
                setIsLoading(false)
            }

        }).catch((error) => {
            openSnackBar('error', NetworkError(error))
            setIsLoading(false)
        })
    } else {
        navigate('./login')
        dispatch(logout())
    }
}

export const createConversation = (participant) => {
    let token = JSON.parse(retrieveValueSessionStorage("token"))
    return axiosPost(`${serverPath}/mrbug/conversations/`, `token ${token.token}`, participant)
}