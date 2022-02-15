import { RenameState, RenameAction } from "./types"
import * as ActionTypes from "../actionsTypes"

let initState: RenameState = {
    name: "Wade"
}

const reducer = (
    state: RenameState = initState,
    action: RenameAction
): RenameState => {
    //console.log("rename", action);
    switch (action.type) {
        case ActionTypes.RENAME:
            return {
                ...state,
                name: action.name
            }
    }
    return state
}

//const reducer = (state=0) :number => state;
export default reducer

