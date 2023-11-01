import { serverPath } from '../../api/service/ServerPath'
import { logout } from '../../api/store/Slices/LoginSlice'
import { setUser } from '../../api/store/Slices/UserSlice'
import { CheckTokenExpired } from '../../services/CheckTokenExpired'
import { NetworkError } from '../../services/networkErrors/NetworkErrors'
import { axiosGet, axiosUpdate } from '../../utils/axiosRequestUtil/AxiosRequestUtil'
import { retrieveValueSessionStorage } from '../../utils/sessionStorage/SessionStorageUtil'

export const getUserDetails = (dispatch, navigate) => {
    const token = JSON.parse(retrieveValueSessionStorage("token"))
    if (!CheckTokenExpired(token.expiry)) {
        axiosGet(`${serverPath}/mrbug/users/account/`, `token ${token.token}`).then((value) => {
            if (value.status === 200) {
                dispatch(setUser(value.data))
            }

        }).catch((error) => {
            console.log(NetworkError(error))
        })
    } else {
        navigate('/login')
        dispatch(logout())
    }
}

export const handleUpDateUserProfile = (user, setUser, dispatch, navigate, resetUserFieldChanged, resetUserFieldErrors, isFieldErrorsEnabled, isFieldChanged) => {
    const token = JSON.parse(retrieveValueSessionStorage("token"))
    if (!isFieldErrorsEnabled()) {
        if (isFieldChanged) {
            if (!CheckTokenExpired(token.expiry)) {
                axiosUpdate(`${serverPath}/mrbug/users/account/`, `token ${token.token}`, user).then((value) => {
                    if (value.status === 200) {
                        dispatch(setUser(value.data))
                        resetUserFieldChanged()
                        resetUserFieldErrors()
                    }

                }).catch((error) => {
                    console.log(NetworkError(error))
                })
            } else {
                navigate('/login')
                dispatch(logout())
            }
        }
    }
}

export const handleGetAvatars = () => {
    var flag = 1;
    const TOTAL_AVATARS = 21

    const avatar_list = []
    while (flag <= TOTAL_AVATARS) {
        avatar_list.push(`UserAvatar${flag}`)
        flag++;
    }

    return avatar_list
}

