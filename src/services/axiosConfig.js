import axios from "axios"

// const token = localStorage.getItem('token');
// console.log(token);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiam9iVGl0bGUiOiJNYW5hamVyIiwibmFtZSI6IkVrbyIsImVtYWlsIjoiZWtvQG1haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2NjMwNDEzNDMsImV4cCI6MTY2MzA3Mzc0M30.KAtrZfpX03fYh5etdPlbWTRCHfE8BoEwxriAoWrwnvo'

const instance = axios.create({
    baseURL : process.env.REACT_APP_API,
    timeout: 2000,
    headers: {'Authorization' : 'Bearer '+ token}
});

export default instance;
