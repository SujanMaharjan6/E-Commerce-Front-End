// import {combineReducers} from 'redux';
import { combineReducers } from 'redux';
import {ReactReducer} from './itemReducer.js';

export default combineReducers({
    items: ReactReducer
})
