import { useState } from "react";

/**
 * Arrow function used to track severity,if the snackbar isOpen ,log message to the system.
 * @returns - An object that contains .Snackbar object and openSnackBar method to open snack. 
 */
export const useSnackbar = () => {
    const INITIAL_STATE = {
        severity: "success",
        message: "",
        isOpen: false
    }

    const [snackBar, setSnackBar] = useState(INITIAL_STATE)

    /**
     * Arrow function used to open snack bar ussing severity and messages.
     * @param {string} severity - Errror severity. 
     * @param {string} message - Errror message.
     */
    const openSnackBar = (severity, message) => {
        setSnackBar((prevState) => ({
            ...prevState,
            severity: severity,
            message: message,
            isOpen: true
        }))
    }
    const closeSnackBar = () => {
        setSnackBar(INITIAL_STATE)
    }

    return { snackBar, openSnackBar , closeSnackBar}
}