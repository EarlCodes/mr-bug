
export const NetworkError = (error) => {
    //when the request to a server has been made and server responeded.
    if (error.response) {
        if (error.response.status === 401 ) {
            return "Could not authenticate your profile .Please login and try again"
        }
    } else if (error.request) {
        //when the request to a server has been made but no response from the server
        console.log(error.request)
        return "Server took long to respond.please try again and if the error persist please contact support."
    } else {
        console.log(error)
        return "Could not connect to server at the moment .if the error persist please contact support."
    }
}