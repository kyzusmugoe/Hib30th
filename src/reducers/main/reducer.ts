import { MainState, MainAction }  from "./types"
import * as ActionTypes from "../actionsTypes"

let initState:MainState = {
    step:0
}

const reducer = (
    state: MainState = initState,
    action: MainAction
): MainState => {
    //console.log("Main", action);
    switch (action.type) {
        case ActionTypes.MAIN_STEP_NEXT:
            console.log(action)
            return {
                ...state,
                step:action.step
            }
    }
    return state
}


//const reducer = (state=0) :number => state;

export default reducer

 
