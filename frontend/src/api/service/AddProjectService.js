import axios from "axios";

const AddProjectService = async (token, project) => {
    const date = new Date(project.due_date)

    const response = await axios.post('http://127.0.0.1:8000/mrbug/projects/', {
        due_date: date.toISOString(),
        tittle: project.tittle,
        description: project.description,
        project_releases:[{
            tittle:project.project_releases.tittle,
            purpose:project.project_releases.purpose,
            release_backlogs: [...project.release_backlogs]
        }]},{
        headers: {
            Authorization: token
        }
    }).catch(err => { console.log(err) })

    return response;
}

export default AddProjectService;