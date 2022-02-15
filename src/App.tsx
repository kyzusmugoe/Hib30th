import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react";

import { useSelector, useDispatch } from 'react-redux'
import WebServiceContext from './webService/WebServiceContext'
import { AppDispatch } from "./store";

import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Quene from "./components/quene";

import { SET_HIBMAN } from "./reducers/actionsTypes"


const App = () => {
    
    const ws = useContext(WebServiceContext)
    const dispatch = useDispatch<AppDispatch>()
    const [step, setStep] = useState<string>("0")

    useEffect(() => {
        
        /*
            ws.webservice.getEvent30Step().then((res: any) => {
                console.log(res.step)
                if (res.step != undefined) {
                    setStep(res.step);
                    return ws.webservice.getEvent30Data()
                } else {
                    alert("取得資料失敗!")
                }
            }).then((hibMan: HibManData | undefined) => {
                dispatch({
                    type: SET_HIBMAN,
                    hibMan: hibMan
                })
            })
        */
        
        ws.webservice.getEvent30Data().then((hibMan: HibManData|undefined) => {
            //console.log(hibMan)
            if (hibMan != undefined) {
                dispatch({
                    type: SET_HIBMAN,
                    hibMan: hibMan
                })
            } else {
                alert("取得資料失敗!")
            }
        })

        return
    }, [])

    return (
        <div style={{backgroundColor:"#fff", padding:20, borderRadius:5}}>
            {
                step == "0" ?
                <Step1 /> :
                step == "1" ?
                <Quene /> :                
                step == "2" ?
                <Step2 /> : 
                step == "3" ?
                <Step3 /> :
                <div>load</div>
            }
          
        </div>
        
    )
};


export default App;