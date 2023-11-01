import { serverPath } from "../../api/service/ServerPath";
import { setNotifications } from "../../api/store/Slices/NotificationSlice";
import { CheckTokenExpired } from "../../services/CheckTokenExpired";
import { axiosGet, axiosUpdate } from "../../utils/axiosRequestUtil/AxiosRequestUtil";
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil";


export const getNotification = (dispatch) => {    
    const token = JSON.parse(retrieveValueSessionStorage("token"))
    if (!CheckTokenExpired(token.expiry)) {
        axiosGet(`${serverPath}/mrbug/notifications/`, `token ${token.token}`).then((value) => {
            if(value.status === 200){
                dispatch(setNotifications(value.data))
            }
           
        }).catch((error) => console.log(error))
    }
}

export const unreadNotifications = (notifications) => {
    var number_notiications = 0
    notifications.map((note) => {
        if (!note.isRead) {
            number_notiications += 1;
        }
    })
    return number_notiications
}

