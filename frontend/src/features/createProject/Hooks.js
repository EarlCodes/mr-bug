import dayjs from "dayjs"
import { useState } from "react"

export const useProjectFields = () => {
    
    const INITIAL_STATE = {
        due_date: dayjs(),
        tittle: "",
        description: "",
        project_releases: [{
            tittle: "Initial",
            purpose: "First Release",
            teams_working_on: [],
            release_backlogs: []
        }],

        project_requirements: []
    }

    const [project, setProject] = useState(INITIAL_STATE)

    const setProjectField = (field, value) => {
        setProject((prevState) => ({
            ...prevState,
            [field]: value
        }))
    }

    const addProjectRelease = (field, value) => {
        setProject((prevState) => ({
            ...prevState,
            project_releases: [{
                ...project.project_releases[0],
                [field]: value
            }]
        }))
    }

    const addReleaseBacklogItem = (backlog) => {
        setProject((prevState) => ({
            ...prevState,
            project_releases: [{
                ...prevState.project_releases[0],
                release_backlogs: [...prevState.project_releases[0].release_backlogs, backlog]
            }]
        }))
    }

    const removeReleaseBacklogItem = (backlog) => {
        setProject((prevState) => ({
            ...prevState,
            project_releases: [{
                ...prevState.project_releases[0],
                release_backlogs: releaseBacklogList(backlog, prevState.project_releases[0].release_backlogs)
            }]
        }))

        const releaseBacklogList = (backlogItem, prevBacklogList) => {
            const backlogList = []
            prevBacklogList.map((backlog) => {
                if (backlogItem.tittle !== backlog.tittle) {
                    backlogList.push(backlog)
                }
            })
            return backlogList;
        }

    }

    const addRequirementItem = (requirement) => {
        setProject((prevState) => ({
            ...prevState,
            project_requirements: [...prevState.project_requirements, requirement]
        }))
    }

    const removeRequirementItem = (requirement) => {
        setProject((prevState) => ({
            ...prevState,
            project_requirements: requirementList(requirement, prevState.project_requirements)
        }))

        const requirementList = (requirement, prevRequirementList) => {
            const requirementList = []
            prevRequirementList.map((requirementItem) => {
                if (requirementItem.requirement !== requirement.requirement) {
                    requirementList.push(requirementItem)
                }
            })
            return requirementList
        }
    }

    const reset_project = () =>{
        setProject(INITIAL_STATE)
    }

    return { project, setProjectField, addProjectRelease, addReleaseBacklogItem, removeReleaseBacklogItem, addRequirementItem, removeRequirementItem ,reset_project}
}

export const useProjectfieldErrors = () => {
    const INITIAL_STATE = {
        due_date: {
            label: "",
            isError: false
        },
        tittle: {
            label: "",
            isError: false
        },
        description: {
            label: "",
            isError: false
        },
        progress: {
            label: "",
            isError: false
        },
        project_releases: {
            tittle: {
                label: "",
                isError: false
            },
            purpose: {
                label: "",
                isError: false
            },
        }
    }

    const [projectFieldErrors, setProjectFieldErrors] = useState(INITIAL_STATE)

    const enableProjectFieldError = (field, errorLabel) => {
        setProjectFieldErrors((prevState) => ({
            ...prevState,
            [field]: {
                label:errorLabel,
                isError: true
            }
        }))
    }

    const disableProjectFieldError = (field) => {
        setProjectFieldErrors((prevState) => ({
            ...prevState,
            [field]: {
                label: "",
                isError: false
            }
        }))
    }

    const checkFieldErrors = (field,value) => {
        if (isValueNull(value)) {
            enableProjectFieldError(field, "Field Required")
        } else {
            disableProjectFieldError(field)
        }
    }

    const enableReleaseFieldError =(field,label)=>{
        setProjectFieldErrors((prevState)=>({
            ...prevState,
            project_releases:{
                ...prevState.project_releases,
                [field]:{
                    label:label,
                    isError:true
                }
            }
        }))
    }

    const disableReleaseFieldError =(field)=>{
        setProjectFieldErrors((prevState)=>({
            ...prevState,
            project_releases:{
                ...prevState.project_releases,
                [field]:{
                    label:"",
                    isError:false
                }
            }
        }))
    }

    const checkReleaseFieldErrors =(field,value)=>{
        if (isValueNull(value)) {
            enableReleaseFieldError(field,"Field Required")
        } else {
            disableReleaseFieldError(field)
        }
    }

    const isProjectFieldErrors = ()=>{
        let isError = false
        if(projectFieldErrors.tittle.isError |projectFieldErrors.description.isError |projectFieldErrors.due_date.isError |projectFieldErrors.progress.isError |projectFieldErrors.progress.isError | projectFieldErrors.project_releases.tittle.isError |projectFieldErrors.project_releases.tittle.purpose){
            isError = true
        }else{
            isError = false
        }
        return isError
    }

    const isValueNull = (value) => {
        let isFieldError = false
        if (value === '') {
            isFieldError = true
        } else {
            isFieldError = false
        }
        return isFieldError
    }


    return { projectFieldErrors, checkFieldErrors ,checkReleaseFieldErrors ,isProjectFieldErrors }
}