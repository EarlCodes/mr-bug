import { serverPath } from "../../api/service/ServerPath"
import { logout } from "../../api/store/Slices/LoginSlice"
import { setNotifications } from "../../api/store/Slices/NotificationSlice"
import { CheckTokenExpired } from "../../services/CheckTokenExpired"
import { axiosDelete, axiosGet, axiosUpdate } from "../../utils/axiosRequestUtil/AxiosRequestUtil"
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil"

const token = JSON.parse(retrieveValueSessionStorage("token"))

export const deleteNotification = (id, notifications, dispatch, navigate) => {
    if (!CheckTokenExpired(token.expiry)) {
        axiosDelete(`${serverPath}/mrbug/notifications/${id}`, `token ${token.token}`).then((value) => {
            if (value.status === 204) {
                updateNotificationRead(id, notifications, dispatch)
            }
        }).catch((error) => {
            console.log(error)
        })
    } else {
        dispatch(logout())
        navigate('/login')
    }

    const updateNotificationRead = (noteId, notifications, dispatch) => {
        dispatch(setNotifications({
            ...notifications,
            results: notifications.results.filter((current_note) => {
                if (current_note.id !== noteId) {
                    return current_note
                }
            })
        }))
    }
}


export const markMessageRead = (notificationId, notifications, dispatch,navigate) => {
    if (!CheckTokenExpired(token.expiry)) {
        axiosUpdate(`${serverPath}/mrbug/notifications/${notificationId}`, `token ${token.token}`, { isRead: true }).then((value) => {
            if (value.status === 200) {
                updateNotificationRead(value.data, notifications, dispatch)
            }
        })
    } else {
        dispatch(logout())
        navigate('/login')
    }

    const updateNotificationRead = (note, notifications, dispatch) => {
        dispatch(setNotifications({
            ...notifications,
            results: notifications.results.map((current_note) => {
                if (current_note.id === note.id) {
                    return note
                } else {
                    return current_note
                }
            })
        }))
    }
}
