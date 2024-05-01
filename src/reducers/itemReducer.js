// import { SET_IS_LOADING } from "../actions/items/types";

import { SET_IS_LOADING } from "../actions/items/types";

const defaultState = {
    isLoading: false,
    items: []
}


export const ReactReducer = (state = defaultState, action) => {
    console.log(' at reducer >>', action);
    console.log('action >>', state);
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }

        default:
            return {
                ...state
            }
    }

}