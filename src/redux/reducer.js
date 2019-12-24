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
                userLists: action.payload
            }
        case types.ADDRESS:
            return {
                ...state,
                address: action.payload
            }
        case types.DEL_USER_LISTS:
            return {
                ...state,
                userLists: state.userLists.filter((item) => {
                    return item.id !== action.id
                })
            }
        case types.ADD_USER_LISTS:
            state.userLists.unshift(action.item)
            return state
        case types.EDIT_USER_LISTS:
            return {
                ...state,
                userLists: state.userLists.map((item) => {
                    if (item.id === action.item.id) {
                        return action.item
                    }
                    return item
                })
            }
        case types.FILTER_QUERY:
            let { user, region, date } = action.result;
            var queryList = state.userLists;
            if (user) { //筛选姓名
                queryList = queryList.filter((item) => {
                    return item.name == user
                })
            }
            if (region) { //筛选地址
                queryList = queryList.filter((item) => {
                    return item.address.indexOf(region) != -1
                })
            }
            if (date) { //筛选日期
                queryList = queryList.filter((item) => {
                    let dateItem = (new Date(item.date + " 00:00:00")).getTime();
                    return (date[0]._d.getTime() <= dateItem) && (dateItem <= date[1]._d.getTime())
                })
            }
            return {
                ...state,
                userLists: queryList
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