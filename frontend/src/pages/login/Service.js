import { storeValueSessionStorage } from "../../utils/sessionStorage/SessionStorageUtil"
import LoginUserService from "../../api/service/LoginUserService"

/**
 * Arrow function used to handle login button onClick events .
 * @param {object} user - User object to login contains username and password.
 * @param {object} userFieldErrors - Field errors.
 * @param {Function} setFieldError - Function to set field errors.
 * @param {Function} navigate  - Method used to navigate through pages.
 * @param {Function} setLoading  - Method to manipulate loading state. 
 * @param {Function} openSnackBar - Method used to set snack bar. 
 */
export const handleSubmit = (user, userFieldErrors, setFieldError,navigate,setLoading,openSnackBar) => {
    if (!userFieldErrors.password.isError & !userFieldErrors.username.isError) {
        setLoading(true)
        LoginUserService(user).then((value) => {
            if (value.status === 200) {
                storeValueSessionStorage("token", JSON.stringify(value.data))
                setLoading(false)
                navigate("/app")
            }
        }).catch((error) => {
            //when the request to a server has been made and server responeded.
            if (error.response) {
                console.log('reponse here')
                if (error.response.status === 401) {
                    setLoading(false)
                    setFieldError("password", error.response.data.detail)
                }
            } else if (error.request) {
                setLoading(false)
                //when the request to a server has been made but no response from the server
                openSnackBar("error","Could not login to the system.The server could not respond at the moment .please try again later.")
            } else {
                setLoading(false)
                openSnackBar("error","Could not connect to server at the moment .if the error persist please contact support.")
            }
        })
    }
}