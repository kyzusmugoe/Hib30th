import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { BasicState } from "../reducers/basic/types";

import { AppDispatch } from "../store";




const controls = ()=>{
    const dispatch = useDispatch<AppDispatch>()

    const plusHandler =()=>{
        dispatch({
            type:"plus"
        })
    }

    const minusHandler =()=>{
        dispatch({
            type:"minus"
        })
    }

    const [rename, setRename] = useState<string>("Wade2")

    const renameHandler =()=>{
        dispatch({
            type:"CHANGE_NAME",
            name:rename
        })
    }

    return(
        <div>
            <button onClick={plusHandler}>+</button>
            <button onClick={minusHandler}>-</button>

            
            <div>
                <input placeholder="set name" onChange={event=>{setRename(event.target.value)}}/>
                <button onClick={renameHandler}>change</button>
            </div>
        </div>
    )
}


export default controls