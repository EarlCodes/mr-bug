import { useState } from "react"

export const useBacklogFields = () => {
    const INITIAL_STATE = {
        tittle: "",
        description: "",
        acceptence_criteria: "",
        story_points: 0,
        color: "#000000",
        priority: "LOW",
        status: "NOT_STARTED",
        progress:0,
        backlog_tasks: [],
    }
    const [backlog, setBacklog] = useState(INITIAL_STATE)

    const setBacklogField = (field, value) => {
        setBacklog((prevState) => ({
            ...prevState,
            [field]: value
        }))
    }

    const clearFields =()=>{
        setBacklog(INITIAL_STATE)
    }

    return {backlog,setBacklogField,clearFields}
}

export const useBacklogFieldErrors = ()=>{
    const INITIAL_STATE = {
        tittle: {
            label:"",
            isError:false
        },
        description: {
            label:"",
            isError:false
        },
        acceptence_criteria: {
            label:"",
            isError:false
        },

        story_points: 0,
        color: "#000000",
        priority: "LOW",
        status: "NOT_STARTED",
        backlog_tasks: [],
    }

    const [backlogFieldErrors,setBacklogFieldErrors] = useState(INITIAL_STATE)
    
    const enableBacklogFieldError = (field,label)=>{
        setBacklogFieldErrors((prevState)=>({
            ...prevState,
            [field]:{
                label:label,
                isError:true
            }
        }))        
    }

    const disableBacklogFieldError = (field)=>{
        setBacklogFieldErrors((prevState)=>({
            ...prevState,
            [field]:{
                label:"",
                isError:false
            }
        }))        
    }

    
    const checkBacklogFieldErrorValid = (field,label) =>{
        const isNull = (label) =>{
            let isNull = false
            if(label === ""){
                isNull = true
            }else{
                isNull = false
            }
            return isNull
        }

        if(isNull(label)){
            enableBacklogFieldError(field,"Field Required")
        }else{
            disableBacklogFieldError(field)
        }
        
    }

    const isAllFieldsValid = () =>{
        let isValid = false
        
        if(backlogFieldErrors.tittle.isError | backlogFieldErrors.description.isError | backlogFieldErrors.acceptence_criteria.isError ){
            isValid = false
        }else{
            isValid = true
        }
        return isValid
    }

    return {backlogFieldErrors,checkBacklogFieldErrorValid,isAllFieldsValid}
}