import { serverPath } from "../../api/service/ServerPath"
import { CheckTokenExpired } from "../../services/CheckTokenExpired"
import { NetworkError } from "../../services/networkErrors/NetworkErrors"
import { UpdateMember } from "../../services/stateUpdate/UpdateMember"
import { axiosGet, axiosPost } from "../../utils/axiosRequestUtil/AxiosRequestUtil"
import { retrieveValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil"

export const handleSearchUser = (username, setSuggestionList, setIsLoading) => {
    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    if (!CheckTokenExpired(session_token.expiry)) {
        const token = `Token ${session_token.token}`
        axiosGet(`${serverPath}/mrbug/users/?search=${username}`, token).then((value) => {
            if (value.status === 200) {
                setSuggestionList((prevState) => ({
                    isOpen: true,
                    suggestionList: value.data.results,
                }))
                setIsLoading(false)
            }
        }).catch(error => console.log(NetworkError(error)))
    }

}

export const handleAddMember = (member, projects, selectedProjectId, releaseId, teamId, dispatch) => {
    const { insertMember, removeMember } = UpdateMember()
    const session_token = JSON.parse(retrieveValueSessionStorage('token'))
    if (!CheckTokenExpired(session_token.expiry)) {
        const token = `Token ${session_token.token}`
        axiosPost(`${serverPath}/mrbug/member/`, token, member).then((value) => {
            if (value.status === 201) {
                createNotificationService(member, token)
                insertMember(projects, selectedProjectId, releaseId, teamId, value.data, dispatch)
            }
        }).catch((error) => console.log(error))
    }


    const createNotificationService = (receiver, token) => {
        axiosPost(`${serverPath}/mrbug/notifications/`, token, { receiver: receiver.user, description: `You have been added as a member of ... team to work on ...project .To view project details and task ,head over to the projects page.` }).catch((error) => console.log(NetworkError(error)))
    }
}