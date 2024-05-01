// export const fetch_item = (params) => {
//     return (dispatch) => {

import { SET_IS_LOADING } from "./types";

//     }
// }


export const fetchItems_ac = function(params){
    console.log('dispatch')
    return function(dispatch){
        dispatch({
            type: SET_IS_LOADING,
            payload: true
        })
    
        setTimeout(() => {
            dispatch({
                type: SET_IS_LOADING,
                payload: false
            })
        }, 1000);
    }
}


// export const fetchItems_ac = params => dispatch => {
//     // console.log('dispatch', dispatch)
//     dispatch({
//         type: SET_IS_LOADING,
//         payload: true
//     })

//     setTimeout(() => {
//         dispatch({
//             type: SET_IS_LOADING,
//             payload: false
//         })
//     }, 1000);
// }