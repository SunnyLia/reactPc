import * as types from './action-types';
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