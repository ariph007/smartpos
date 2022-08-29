import axios from "axios"

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiam9iVGl0bGUiOiJNYW5hamVyIiwibmFtZSI6IkVrbyIsImVtYWlsIjoiZWtvQG1haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2NjE3NDI0ODYsImV4cCI6MTY2MTc3NDg4Nn0.BMZHqtxGhcQ2mg43nsdK_Kp96JtN-tAMFN6-etsqTRs'
const instance = axios.create({
    baseURL : process.env.REACT_APP_API,
    timeout: 2000,
    headers: {'Authorization' : 'Bearer '+ token}
});

export default instance;
