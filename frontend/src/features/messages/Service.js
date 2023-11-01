import { axiosGet, axiosPost } from "../../utils/axiosRequestUtil/AxiosRequestUtil"
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil"
import { setMessages } from "./../../api/store/Slices/MessagesSlice"
import { serverPath } from "../../api/service/ServerPath"
import { CheckTokenExpired } from "../../services/CheckTokenExpired"
import { NetworkError } from "../../services/networkErrors/NetworkErrors"
import { logout } from "../../api/store/Slices/LoginSlice"


export const getUserMessages = (dispatch,navigate,interval) => {
    const token = JSON.parse(retrieveValueSessionStorage("token"))
    if(token !== null){
        if (!CheckTokenExpired(token.expiry)) {
            axiosGet(`${serverPath}/mrbug/conversations/`, `token ${token.token}`).then((value) => {
                dispatch(setMessages(value.data))
                return value.data
            }).catch((error) => {
                console.log(NetworkError(error))
            })
        }else{
            navigate('/login')
            dispatch(logout())
        }
    }else{
        clearInterval(interval)
    }
    

}
export const createMessage = (token, message) => {
    axiosPost(`${serverPath}/mrbug/messages/`, token, message).then((value) => {
        return value.data
    }).catch((error) => {
        console.log(error)
    })
}
export const UnreadMessagesCount = (messages, user) => {
    var unread_messages = 0;
    //verify if the conversation list is not empty
    if (messages.count !== 0) {
        messages.results.map((conversation) => {
            conversation.conversations.map((message) => {
                if (!message.isRead & message.sender.id !== user.id)
                    unread_messages += 1;
            })
        })
    }
    return unread_messages;
}

