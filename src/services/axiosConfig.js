import axios from "axios"

// const token = localStorage.getItem('token');
// console.log(token);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiam9iVGl0bGUiOiJNYW5hamVyIiwibmFtZSI6IkVrbyIsImVtYWlsIjoiZWtvQG1haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2NjI2OTU5MTAsImV4cCI6MTY2MjcyODMxMH0.2y1n_FFRUud4MAu1VtQZTzvPxEQyLQIQO0pckOUVTPE'

const instance = axios.create({
    baseURL : process.env.REACT_APP_API,
    timeout: 2000,
    headers: {'Authorization' : 'Bearer '+ token}
});

export default instance;
