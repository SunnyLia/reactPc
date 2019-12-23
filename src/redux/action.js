import * as types from './action_types';
const serverUrl = "http://127.0.0.1:8080";
export const getNavMenu = () => {
    return dispatch => {
        return fetch(serverUrl + "/navMenus")
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: types.NAV_MENUS,
                    payload: result.data
                });
            })
    }
}
export const getUserLists = () => {
    return dispatch => {
        return fetch(serverUrl + "/getUserLists")
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: types.USER_LISTS,
                    payload: result.data
                });
            })
    }
}
export const getAddress = () => {
    return dispatch => {
        return fetch(serverUrl + "/getAddress")
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: types.ADDRESS,
                    payload: result.data
                });
            })
    }
}
export const delUserLists = (id) => {
    return {
        type: types.DEL_USER_LISTS,
        id
    }
}