import {HibmanState, HibmanAction}  from "./types"
import * as ActionTypes from "../actionsTypes"

let initState:HibmanState = {
    hibMan:{} as HibManData
}

const reducer = (
    state: HibmanState = initState,
    action: HibmanAction
): HibmanState => {
    //console.log("reducer HIBMAN", action);
    switch (action.type) {
        case ActionTypes.SET_HIBMAN:
            state.hibMan =  {...action.hibMan}
            return {...state}
    }
    return state
}


//const reducer = (state=0) :number => state;

export default reducer

