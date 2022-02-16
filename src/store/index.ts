import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunkMiddleware from "redux-thunk"
//import { createLogger } from 'redux-logger'

/*reducer list*/
//import basicReducer from "../reducers/basic/reducer"
//import renameReducer from "../reducers/rename/reducer"
import MainReducer from "../reducers/main/reducer"
import HibmanReducer from "../reducers/hibman/reducer"

/*
const store: Store<ArticleState, ArticleAction> & {
    dispatch: DispatchType
  } = createStore(reducer, applyMiddleware(thunk))
*/


const rootReducer = combineReducers({
    //"basic": basicReducer,
    //"rename": renameReducer,
    "MainReducer": MainReducer,
    "HibmanReducer": HibmanReducer,
})
//const loggerMiddleware = createLogger()

const store: Store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        //loggerMiddleware
    )
)

export type StoreType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch


export default store


/*
export default (preloadedState)=> {
    return createStore(
        reducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}*/