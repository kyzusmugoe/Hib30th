import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react";

import { useSelector, useDispatch } from 'react-redux'
import WebServiceContext from './webService/WebServiceContext'
import { AppDispatch, StoreType } from "./store";
import { MAIN_STEP_NEXT, SET_HIBMAN } from "./reducers/actionsTypes"

import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Quene from "./components/quene";

const App = () => {

    const ws = useContext(WebServiceContext)
    const mainStep = useSelector((state: StoreType) => state.MainReducer.step)
    const dispatch = useDispatch<AppDispatch>()
    //const [step, setStep] = useState<number>(0)

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
        dispatch({
            type: MAIN_STEP_NEXT,
            step: 3
        })
        ws.webservice.getEvent30Data().then((hibMan: HibManData | undefined) => {

            //console.log(hibMan)
            if (hibMan != undefined) {
                dispatch({
                    type: SET_HIBMAN,
                    hibMan: hibMan
                })

                //setStep(1)

                //設定步驟
                dispatch({
                    type: MAIN_STEP_NEXT,
                    step: 2
                })
            } else {
                alert("取得資料失敗!")
            }
        })

        return
    }, [])


    const Loading = () => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            Loading...
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )

    return (
        <div style={{ backgroundColor: "#fff", padding: 20, borderRadius: 5, minHeight: 500, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
                <img src="./images/event30/title.svg" width={600} />
            </div>
            <div style={{alignSelf: "flex-start", borderBottom:"1px solid #999", width:"100%", marginBottom:20}}>
                <h1>STEP 1 申請資格</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                    mainStep == 1 ?
                        <Step1 /> :
                    mainStep == 2 ?
                        <Quene /> :
                    mainStep == 3 ?
                        <Step2 /> :
                    mainStep == 4 ?
                        <Step3 /> :
                        <Loading />
                }

            </div>
        </div>

    )
};


export default App;