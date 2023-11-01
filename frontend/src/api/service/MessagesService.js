import axios from 'axios'

const MessagesService = (token)=>{
    const response = axios.get('http://127.0.0.1:8000/mrbug/conversations/',{
        headers:{
            'Authorization':token
        }
    }).catch(err =>{console.log(err)})
    
    return response;
}

export default MessagesService;