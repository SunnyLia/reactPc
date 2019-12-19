import { combineReducers } from 'redux'
import * as types from './action_types'
const initState = {
    navMenus: [],
    address: [],
    userLists: [],
    filterQuery: []
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
    initState
})