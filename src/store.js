import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {ReactReducer} from './reducers/itemReducer';


const middleware = [thunk];
const initialState = {
        items:{
            isLoading: false,
            items: [],
            isSubmitting: false,
            item: {}
        },
        notification: {
            isLoading: false,
            notifications: [],
            isSubmitting: false,
            notification: {}
        },
        user: {
            isLoading: false,
            users: [],
            isSubmitting: false,
            user: {}
        }
}


export const store = createStore(ReactReducer,initialState, applyMiddleware(
...middleware
))