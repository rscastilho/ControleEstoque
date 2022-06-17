import axios from 'axios'

// const aut = `bearer ${JSON.parse(localStorage.getItem('token'))}`

const WebApi = axios.create({
    
    baseURL:"https://localhost:5001/api/"
    // baseURL: 'https://localhost:44378/api/'
       
    
    

})
// axios.defaults.headers.authorization = aut;
// axios.interceptors.request.use(async config => config.headers.Authorization = aut)

export default WebApi;

