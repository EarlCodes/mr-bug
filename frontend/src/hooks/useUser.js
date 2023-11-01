import { useState } from "react"

/**
 * User hook used to store and set user object. 
 * @returns a user object and a function to set user fields
 */
export const useUser = () => {
    const INNITIAL_USER = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        role:"",
        user_profile: {
            "avatar": "UserAvatar1",
            "bgcolor": "#ffffff"
        },
        is_active: true
    }

    const [user, setUser] = useState(INNITIAL_USER)

    /**
     * Arrow function used to set field errors using the field as key 
     * @param {string} field - The field to set. 
     * @param {String} value -The value to set the field to.
     */
    const setUserField = (field,value)=>{
        setUser((prevState)=>({
            ...prevState,
            [field]:value
        }))
    }

    /**
     * Arrow function to update user profile field on user object
     * @param {String} field -user profile field to update.
     * @param {String} value - the value of field.
     */

    const setUserProfile = (field,value) =>{
        setUser((prevState)=>({
            ...prevState,
            user_profile:{
                ...prevState.user_profile,
                [field]:value
            }
        }))
    }

    return {user,setUserField,setUserProfile,setUser}
}