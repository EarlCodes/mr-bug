import { serverPath } from "../../api/service/ServerPath"
import { logout } from "../../api/store/Slices/LoginSlice"
import { CheckTokenExpired } from "../../services/CheckTokenExpired"
import { NetworkError } from "../../services/networkErrors/NetworkErrors"
import { axiosGet, axiosPost } from "../../utils/axiosRequestUtil/AxiosRequestUtil"
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil"


export const handleSearchUser = (username, setSugestedMemberList, navigate, dispatch, openSnackBar, setIsLoading) => {
    setIsLoading(true)
    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    if (!CheckTokenExpired(session_token.expiry)) {
        const token = `Token ${session_token.token}`
        axiosGet(`${serverPath}/mrbug/users/?search=${username}`, token).then((value) => {
            if (value.status === 200) {
                setSugestedMemberList(value.data.results)
                setIsLoading(false)
            }
        }).catch(error => {
            openSnackBar('error', NetworkError(error))
            setIsLoading(false)
        })
    } else {
        navigate('/login')
        dispatch(logout())
    }
}

