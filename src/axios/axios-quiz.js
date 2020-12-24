import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-424fa-default-rtdb.firebaseio.com/'
})