import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react"; 

import { useSelector, useDispatch } from 'react-redux'
import WebServiceContext from '../webService/WebServiceContext'
import { AppDispatch } from "../store";
import { SET_HIBMAN } from "../reducers/actionsTypes"


const App = () => {
    const ws = useContext(WebServiceContext)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        return
    }, [])

    return (
        <div>
            <button>設定步驟</button>
        </div>
    )
};


export default App;