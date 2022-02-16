import React, { useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { StoreType } from "../../store";
import { AppDispatch } from "../../store";
import { MAIN_STEP_NEXT } from "../../reducers/actionsTypes"


import { HButton } from '../unit'

export default () => {
    //const count = useSelector((state:StoreType) => state.basic.count)
    // const myName = useSelector((state:StoreType) => state.rename.name)
    const [isOpen, setIsOpen] = useState<boolean>(window.localStorage.getItem("clicked_treasure") ? true : false)
    const openTreasure = () => {
        if (!isOpen) {
            alert("!")
            window.localStorage.setItem("clicked_treasure", "1");
            setIsOpen(true)
        }
    }

    const dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            <h2>HI！王大誠</h2>
            <h3>恭喜您！晉升達成</h3>
            <img src="./images/event30/end-1.jpg" />
            <div style={{ display: "flex" }}>
                <div>
                    <img style={{ width: "100%" }} src="./images/event30/man_head.svg" />
                </div>
                <div>
                    <ul style={{ fontSize: "1.2em" }} >
                        <li>姓名：王大誠</li>
                        <li>登錄日：110/1/1</li>
                        <li>職等：經理</li>
                        <li>發薪業績累積50萬</li>
                        <li>直增人力5人,且達10萬元</li>
                        <li>三個月內專案業績200萬</li>
                        <li>預計晋升日為xxx年xx月xx日。</li>
                    </ul>
                </div>
            </div>
            <HButton
                    type="old"
                    onClick={()=>{
                        dispatch({
                            type: MAIN_STEP_NEXT,
                            step: 1
                        })
                    }}
                >測試用:"回到第一頁"</HButton>
        </div>
    )
}
