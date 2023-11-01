import { useState } from "react"

export const useUserErrorFields = () => {
    const INNITIAL_USER_ERROR_FIELDS = {
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
        user_profile: {
            "avatar": {
                isError: false,
                label: ""
            },
            "bgcolor": {
                isError: false,
                label: ""
            },
        }
    }
    const [userFieldError, setUserFieldError] = useState(INNITIAL_USER_ERROR_FIELDS)

    const checkFieldChange = (field, prevValue, value) => {
        if (isFieldNull(field, value)) {
            setFieldError(field, "Field Required")
        }
        else {
            clearFieldError(field)
            if (prevValue !== value) setFieldError(field, "field change.Update to save.")
        }
    }

    const clearFieldError = (field) => {
        setUserFieldError((prevState) => ({
            ...prevState,
            [field]: {
                isError: false,
                label: ""
            }
        }))
    }

    const isFieldNull = (field, value) => {
        if (value === "") {
            return true
        }
        else {
            return false
        }
    }


    /**
     * Arrow function used to validate email address
     * @param {String} email - Email address to validate. 
     */
    const emailValidation = (email, prevState, value) => {
        //email format
        const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(EMAIL_FORMAT)) {
            clearFieldError("email")
            checkFieldChange(email, prevState, value)
        }
        else {
            setFieldError("email", "Please enter a valid email address.")
        }
    }


    const setFieldError = (field, label) => {
        setUserFieldError((prevState) => ({
            ...prevState,
            [field]: {
                isError: true,
                label: label
            }
        }))
    }

    const setFieldErrorProfile = (field) => {
        setUserFieldError((prevState) => ({
            ...prevState,
            user_profile: {
                ...prevState.user_profile,
                [field]: {
                    isError: true,
                    label: "Field changed.Update to save."
                }
            }
        }))
    }

    const setFieldNotChangeProfile = (field) => {
        setUserFieldError((prevState) => ({
            ...prevState,
            user_profile: {
                ...prevState.user_profile,
                [field]: true
            },
        }))
    }

    const resetUserFieldErrors = () => {
        setUserFieldError(INNITIAL_USER_ERROR_FIELDS)
    }
    const isFieldErrorsEnabled = () => {
        if (userFieldError.email.isError | userFieldError.first_name.isError | userFieldError.last_name.isError) {
            return true
        } else {
            return false
        }
    }



    return { userFieldError, setFieldError, clearFieldError, setFieldErrorProfile, emailValidation, resetUserFieldErrors, isFieldErrorsEnabled }

}

export const useUserChangedField = () => {
    const INNITIAL_USER_FIELDS = {
        username: {
            isChanged: false,
            label: ""
        },
        first_name: {
            isChanged: false,
            label: ""
        },
        last_name: {
            isChanged: false,
            label: ""
        },
        email: {
            isChanged: false,
            label: ""
        },
        role: {
            isChanged: false,
            label: ""
        },
        user_profile: {
            "avatar": {
                isChanged: false,
                label: ""
            },
            "bgcolor": {
                isChanged: false,
                label: ""
            }
        },

        isFieldChangedValid: true
    }

    const [userFieldChanged, setUserFieldChange] = useState(INNITIAL_USER_FIELDS)


    const checkFieldChange = (field, prevValue, value, setFieldError, clearFieldError) => {
        if (isFieldNull(field, value)) {
            setFieldError(field, "Field Required")
        }
        else {
            clearFieldError(field)
            if (prevValue === value) {
                disableChangeStatus(field)
            }
            else {
                enableChangeStatus(field, "Field changed.Update to save.")
            }
        }
        
    }

    const isFieldNull = (field, value) => {
        if (value === "") {
            return true
        }
        else {
            return false
        }
    }

    const setFieldProfileChanged = (field) => {
        setUserFieldChange((prevState) => ({
            ...prevState,
            user_profile: {
                ...prevState.user_profile,
                [field]: {
                    isChanged: true,
                    label: "Field changed.Update to save."
                }
            }
        }))
        
    }

    const clearFieldProfileChanged = (field) => {
        setUserFieldChange((prevState) => ({
            ...prevState,
            user_profile: {
                ...prevState.user_profile,
                [field]: {
                    isChanged: false,
                    label: ""
                }
            }
        }))
    }

    const checkProfileChanged = (field, prevValue, value) => {
        if (prevValue === value) {
            clearFieldProfileChanged(field)
        } else {
            setFieldProfileChanged(field)
        }
    }

    const resetUserFieldChanged = () => {
        setUserFieldChange(INNITIAL_USER_FIELDS)
        isFieldChanged()
    }
    const isFieldChanged = () => {
        if (userFieldChanged.email.isChanged | userFieldChanged.last_name.isChanged | userFieldChanged.first_name.isChanged | userFieldChanged.user_profile.avatar.isChanged | userFieldChanged.user_profile.bgcolor.isChanged) {
            setUserFieldChange((prevState) => ({
                ...prevState,
                isFieldChangedValid: true
            }))
        }
        else {
            setUserFieldChange((prevState) => ({
                ...prevState,
                isFieldChangedValid: false
            }))
        }
    }


    const enableChangeStatus = (field, label) => {
        setUserFieldChange((prevState) => ({
            ...prevState,
            [field]: {
                isChanged: true,
                label: label
            }
        }))
    }

    const disableChangeStatus = (field) => {
        setUserFieldChange((prevState) => ({
            ...prevState, 
            [field]: {
                isChanged: false,
                label: ""
            }
        }))
    }

    return { userFieldChanged, checkFieldChange, checkProfileChanged, resetUserFieldChanged, isFieldChanged, enableChangeStatus, disableChangeStatus }
}




