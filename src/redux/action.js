import * as types from './action_types';
const serverUrl = "http://127.0.0.1:8080";
const interviewUrl = "/MANAGE-SERVICE";
export const getCategory = () => {
    return fetch(interviewUrl + "/category/get").then(response => response.json())
}

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
export const addUserLists = (item) => {
    return {
        type: types.ADD_USER_LISTS,
        item
    }
}
export const editUserLists = (item) => {
    return {
        type: types.EDIT_USER_LISTS,
        item
    }
}
export const filterQuery = (result) => {
    return {
        type: types.FILTER_QUERY,
        result
    }
}