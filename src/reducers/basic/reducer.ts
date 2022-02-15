import { BasicState, BasicAction }  from "./types"
import * as ActionTypes from "../actionsTypes"

let initState:BasicState = {
    count:0
}

const reducer = (
    state: BasicState = initState,
    action: BasicAction
): BasicState => {
    //console.log("Basic", action);
    switch (action.type) {
        case ActionTypes.PLUS:
            return {
                ...state,
                count:initState.count += 1
            }
        case ActionTypes.MINUS:
            return {
                ...state,
                count:initState.count -= 1
            }
    }
    return state
}


//const reducer = (state=0) :number => state;

export default reducer

 
