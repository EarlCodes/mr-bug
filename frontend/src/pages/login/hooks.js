import { useState } from "react"


export const useLoginFieldErrors = () => {
    const [userFieldErrors, setUserFieldErrors] = useState({
        username: {
            isError: false,
            label: ""
        },
        password: {
            isError: false,
            label: "",
        }
    })

    const isFieldNull = (value) => {
        var isNull = false
        if (value === "") {
            isNull = true
        } else {
            isNull = false
        }
        return isNull;
    }

    const setFieldError = (field, label) => {
        setUserFieldErrors((prevState) => ({
            ...prevState,
            [field]: {
                isError: true,
                label: label
            }
        }))
    }

    const disableFieldError = (field) => {
        setUserFieldErrors((prevState) => ({
            ...prevState,
            [field]: {
                isError: false,
                label: ""
            }
        }))
    }

    const checkFieldError = (field, value) => {
        if (isFieldNull(value)) {
            setFieldError(field, `${field} required`)
        } else {
            disableFieldError(field)
        }
    }

    return { checkFieldError, setFieldError, userFieldErrors }
}


/**
 * 
 * @returns {axios.response} an object that contains a method to set a user to login and a user object 
 */
export const useLoginUser = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })


    /**
     * Function used to store user field values based on field parameter
     * @param {string} field - The field used to update user object  
     * @param {string} value  - Value 
     */
    const handleUser = (field, value) => {
        setUser((prevState) => ({
            ...prevState,
            [field]: value
        }))
    }
    return { handleUser, user }
}