import {combineReducers} from 'redux';
import quizReducer from './quiz'
import createReducer from "./quizCreator";
import authReducer from "./auth";

export default combineReducers({
    quiz: quizReducer,
    quizCreator: createReducer,
    auth: authReducer
})