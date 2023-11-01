import { Navigate } from "react-router-dom"
import RegisterUserService from "../../api/Services"

export const registerNewUser = (user, isUserFieldValid, userFieldErrors,openSnackBar,setUserErrors,navigate,setLoading) => {
    if (isUserFieldValid(userFieldErrors)) {
        setLoading(true)
        RegisterUserService(user).then((value)=>{
            setLoading(false)
            openSnackBar("success","You have successfully created an account . procced to login.")
            setTimeout(()=>{
                navigate('/login')
            },2000)

        }).catch((error)=>{
            //when the request to a server has been made and server responeded.
            if (error.response) {
                if (error.response.status === 400) {
                    setLoading(false)
                    setUserErrors("username",error.response.data.username)
                }
            } else if (error.request) {
                setLoading(false)
                //when the request to a server has been made but no response from the server
                openSnackBar("error","your account was not created ,system could not establish a connection to server.please try again later.")
            } else {
                setLoading(false)
                openSnackBar("error","your account was not created ,system could not establish a connection to server.please try again later.")
            }
        })
    } else {
        openSnackBar("warning","Some fields are not valid.Please verify all provided details")                
    }
}

export const handleFieldChange = (event, field, setUserField, checkFieldNullError) => {
    setUserField(field, event.target.value)
    checkFieldNullError(field, event.target.value)
}

export const Avatars = () => {
    const NUMBER_OF_AVATARS = 22
    const avatars = []

    let flag = 1
    while (flag < NUMBER_OF_AVATARS) {
        avatars.push(`UserAvatar${flag}`)
        flag++;
    }
    return avatars
}
