import { useEffect, useState } from "react"

/**
 * Custome hook to manage password
 * @returns - returns password and a method to manipulate it
 */
export const usePassword = () => {
    const [password, setPassword] = useState("")

    const handleSetPassword = (password) => {
        setPassword(password)
    }

    return { password, handleSetPassword }
}


/**
 * Arrow function to set and clear user field errors
 * @returns - a users errors field object ,a method to set and another method to clear. 
 */
export const useUserFieldValidation = () => {
    const INNITIAL_STATE = {
        username: {
            isError: false,
            label: ""
        },
        first_name: {
            isError: false,
            label: ""
        },
        last_name: {
            isError: false,
            label: ""
        },
        email: {
            isError: false,
            label: ""
        },
        role: {
            isError: false,
            label: ""
        },

        password: {
            isError: false,
            label: ""
        },

        confirm_password: {
            isError: false,
            label: ""
        },
        termsAndConditions: {
            isError: true,
            label: ""
        },

        user_profile: {
            "avatar": "UserAvatar1.png",
            "bgcolor": "#ffffff"
        },
        is_active: true
    }

    const [userFieldErrors, setUserFieldErrors] = useState(INNITIAL_STATE)

    /**
     * Arrow function to set user objects field errrors.
     * @param {String} field -The user field to set
     * @param {*} label -The label to set the field to.
     */
    const setUserErrors = (field, label) => {
        setUserFieldErrors((prevState) => ({
            ...prevState,
            [field]: {
                label: label,
                isError: true
            }
        }))
    }

    /**
     * Function used to clear field errros
     * @param {string} field -The name of the field to clear.
     */
    const clearUserErrors = (field) => {
        setUserFieldErrors((prevState) => ({
            ...prevState,
            [field]: {
                isError: false,
                label: ""
            }
        }))
    }

    /**
     * Arrow function used to check if fields do not contain null values.
     * @param {String} field - The name of the field to check.
     * @param {String} value - the value to check against. 
     */

    const checkFieldNullError = (field, value) => {
        if (isFieldValueNull(value)) { setUserErrors(field, "This field is required.") } else { clearUserErrors(field) }
    }

    /**
     * Arrow function used to validate email address
     * @param {String} email - Email address to validate. 
     */
    const emailValidation = (email) => {

        //email format
        const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(EMAIL_FORMAT)) { clearUserErrors("email") } else { setUserErrors("email", "Please enter a valid email address.") }
    }

    /**
     * Arrow funtion used to validate user password.
     * @param {String} password -Password to validated.
     */
    const passwordValidation = (password) => {

        //check if the password contains small letters[a-z]
        if (!password.match(/[a-z]/g)) { setUserErrors("password", 'At least one Lowercase letter') }

        //Check if password atleast contains big latters[A-Z]
        else if (!password.match(/[A-Z]/g)) setUserErrors("password", 'Atleast one Uppercase letter')

        //check if the password contains  a numeric values
        else if (!password.match(/[0-9]/g)) setUserErrors("password", 'Atleast one numeric')
        //Password Validations
        else if (password.length <= 8) setUserErrors("password", 'Must be More than 8 characters')

        //password exceeds 30 characters
        else if (password.length >= 30) setUserErrors("password", "Must not exceed 30 characters")

        else clearUserErrors("password")
    }

    const isFieldValueNull = (value) => {
        let isNull = true
        if (value === "") { isNull = true } else { isNull = false }
        return isNull
    }

    const isUserFieldValid = (userFieldErrors,email) => {
        
        if (email ==="" | userFieldErrors.email.isError| userFieldErrors.username.isError | userFieldErrors.first_name.isError | userFieldErrors.last_name.isError | userFieldErrors.email.isError | userFieldErrors.role.isError | userFieldErrors.password.isError | userFieldErrors.confirm_password.isError | userFieldErrors.termsAndConditions.isError) {
            return false
        } else { return true }
    }

    const doesPasswordMatch = (password, confirmPassword) => {
        if (confirmPassword == password) {
            clearUserErrors("confirm_password")
        }
        else {
            setUserErrors("confirm_password", "Password does not match")
        }
    }

    return { userFieldErrors, clearUserErrors, setUserErrors, checkFieldNullError, passwordValidation, doesPasswordMatch, emailValidation, isUserFieldValid }
}

