import axios from "axios"

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiam9iVGl0bGUiOiJNYW5hamVyIiwibmFtZSI6IkVrbyIsImVtYWlsIjoiZWtvQG1haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2NjE4Mjk2NzYsImV4cCI6MTY2MTg2MjA3Nn0.9ha57OzJW8wJnBX4yAxk6UHoJ_3A4F4V5aO_HwC3rnM'
const instance = axios.create({
    baseURL : process.env.REACT_APP_API,
    timeout: 2000,
    headers: {'Authorization' : 'Bearer '+ token}
});

export default instance;
