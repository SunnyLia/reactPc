import { combineReducers } from 'redux'
import * as types from './action_types'
const initState = {
    address: [],
    userLists: [],
    filterQuery: []
}
const userDatas = (state = initState, action) => {
    switch (action.type) {
        case types.USER_LISTS:
            return {
                ...state,
                userLists:action.payload
            }
        default:
            return state
    }
}
const comDatas = (state = [], action) => {
    switch (action.type) {
        case types.NAV_MENUS:
            return action.payload
        default:
            return state
    }
}
export default combineReducers({
    comDatas,
    userDatas
})