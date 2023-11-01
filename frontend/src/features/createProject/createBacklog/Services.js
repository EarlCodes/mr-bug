export const addBacklog = (backlog,addBacklogItem,isAllFieldsValid) => {
    const isBacklogValid = ()=>{
        let isValid = false
        if(backlog.tittle === ''|backlog.description === ''|backlog.acceptence_criteria === ''| backlog.story_points === ''){
            isValid = false       
        }else{
            isValid = true
            if(!isAllFieldsValid()){
                isValid =false
            }
        }    
        return isValid
    }
    
    if(isBacklogValid()){
        addBacklogItem(backlog)
    }
} 
