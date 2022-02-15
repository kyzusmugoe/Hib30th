import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { StoreType } from "../../store";

import Level from "./level"
import Chart from "./chart"
import Runner from "./runner"

export default () => {
    const hibmanData = useSelector((state: StoreType) => state.HibmanReducer.hibMan)

    const [mainType, setMainType] = useState<string>("")
    const [regDate, setRegDate] = useState<string>("")
    const [jobTitle, setJobTitle] = useState<string>("")
    const [sex, setSex] = useState<number>(0)

    const [pref, setPref] = useState<number>(0)
    const [prefA, setPrefA] = useState<number>(0)
    const [prefB, setPrefB] = useState<number>(0)

    const [step, setStep] = useState<number>(0)

    useEffect(() => {
        if (hibmanData.uid != null) {
            // let hm = Hibman
            setMainType(hibmanData.state == "O" ? "原大誠人員" : "新大誠人員")
            setRegDate(hibmanData.regDate != null ? hibmanData.regDate : "尚未取得資料")
            setJobTitle(hibmanData.jobTitle != null ? hibmanData.jobTitle : "尚未取得資料")
            setSex(parseInt(hibmanData.sex))
            setPref(hibmanData.state == "O" ? hibmanData.prefB : hibmanData.prefA)
        }
    }, [hibmanData])


    return (
        <div>
            {
                mainType &&
                <div>
                    <div style={{ height: 200, display: "flex", alignItems: "center" }}>
                        <div >
                            {
                                sex == 1 ?
                                    <img style={{ width: "100%", maxWidth: 200 }} src="./images/event30/man_head.svg" /> :
                                    <img style={{ width: "100%", maxWidth: 200 }} src="./images/event30/man_head.svg" />
                            }
                        </div>
                        <div>
                            <h1>
                                您是
                                <span style={{ fontWeight: "bolder" }}>
                                    {mainType}
                                </span>
                            </h1>
                            <h4>
                                民國{regDate[0] == "0" ? regDate.slice(1, 3) : regDate.slice(0, 3)}年{regDate.slice(3, 5)}月{regDate.slice(5, 7)}日
                            </h4>
                        </div>

                    </div>
                    <hr />
                    <div>
                        <h3>● 職級：</h3>
                        <Level jobTitle={jobTitle} />
                    </div>
                    <hr />
                    <div>
                        <h3>● {hibmanData.state == "O" ? "發薪" : "專案"}業績：</h3>
                        <Chart regDate={hibmanData.regDate} enable={jobTitle == "經理"} /*enable={jobTitle == "經理"}*/ value={pref} />
                    </div>
                    <hr />
                    <div>
                        <h3>● 直增人力：</h3>
                        <Runner enable={jobTitle == "經理" && pref >= 500000} members={hibmanData.menbers} jobTitle={"1"} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", margin: 15 }}>
                        <button
                            style={{
                                border: "none",
                                color: "#fff",
                                backgroundColor: "#ccc",
                                padding: "5px 30px",
                                borderRadius: 30
                            }}

                            onClick={() => {
                                let ct = 0;
                                for (let i = 0; i < 5; i++) {
                                    if (hibmanData.menbers[i].type == "一般人力" && hibmanData.menbers[i].prefB > 100000) {
                                        ct++
                                    }
                                    if (hibmanData.menbers[i].type == "專案人力" && hibmanData.menbers[i].prefA > 100000) {
                                        ct++
                                    }
                                }

                                console.log(jobTitle)
                                console.log(pref)
                                console.log(ct)
                                if (jobTitle == "經理" && pref >= 500000 && ct == 5) {
                                    alert("!")
                                }
                            }}
                        >下一步</button>
                    </div>
                </div>
            }
        </div >
    )
}
