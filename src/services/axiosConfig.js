import axios from "axios"

// const token = localStorage.getItem('token');
// console.log(token);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiam9iVGl0bGUiOiJNYW5hamVyIiwibmFtZSI6IkVrbyIsImVtYWlsIjoiZWtvQG1haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2NjIwODkwNzUsImV4cCI6MTY2MjEyMTQ3NX0.hAMHIUnZj-OSiJ3hQTKKt7J3DwT-qBiRCipSA37k_5I'

const instance = axios.create({
    baseURL : process.env.REACT_APP_API,
    timeout: 2000,
    headers: {'Authorization' : 'Bearer '+ token}
});

export default instance;
