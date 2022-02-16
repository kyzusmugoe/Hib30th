import React from "react";

import { useSelector, useDispatch } from 'react-redux'
import { StoreType } from "../../store";
import { AppDispatch } from "../../store";
import { MAIN_STEP_NEXT } from "../../reducers/actionsTypes"


import * as HibStyle from '../../style'
import styled from 'styled-components'
import { HButton, HConfirm } from '../unit'

type boardProp = {
    id: string,
    value: number,
    unit: string,
    txt: string
}

const boardData: boardProp[] = [
    { id: "date", value: 79, unit: "天", txt: "剩餘天數" },
    { id: "total", value: 10, unit: "%", txt: "總達成率" },
    { id: "month", value: 20, unit: "%", txt: "月達成率" }
]

const HBoardEntity = (props: { className?: string, bData: boardProp }) => (
    <div className={props.className}>
        <div className="rings">
            <img src="./images/event30/ring.png" />
            <img src="./images/event30/ring.png" />
        </div>
        <div className="card">
            <div className="value">{props.bData.value}</div>
            <div className="unit">{props.bData.unit}</div>
        </div>
        <div className="text">{props.bData.txt}</div>
    </div>
)

const HBoard = styled(HBoardEntity)`
    margin: 5px;
    position: relative;
    text-align: center;
    .rings{
        width:100%;
        z-index:10;
        position: absolute;
        display: flex;
        justify-content: space-around;
        top:-20px;
        
    }
    .card{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        background-color: ${HibStyle.M_WHITE};
    }
    .value{
        color: ${HibStyle.M_DK_Green};
        font-size: 3em;
        line-height: 1em;
        padding-top: 20px;
        font-weight: bolder;
    }
    .unit{
        color: ${HibStyle.M_DK_Green};
        align-self: flex-end;
        padding-right: 5px;
    }
    .text{
        margin-top:10px;
        color:${HibStyle.M_WHITE};
        font-size: 1.1em;
    }
`

const HBoardBody = styled.div`
    background-color: ${HibStyle.M_DK_Green};
    width: fit-content;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

`
const Road = styled.div`
    background-image: url('./images/event30/road2.png');
    width:250px;
    height: 90px;
    position: relative;
    &::after{
        content: " ";
        position: absolute;
        width:15px;
        height: 90px;
        right:0;
        background-image: url('./images/event30/goal.png');
    }
    &.end{ width:100px; }
    &.end::after{
        background-image: none
    }
    .value{
        position: absolute;
        right:10px;
        bottom:-20px;
        color: rgba(255,255,255,.6);
        font-size: 4em;
    }    
`
const Leader = styled.div`
    width: 80px;
    height: 120px;
    position: absolute;
    top:-50px;
    right: 0;
    img{
        width: 100%;
    }
`

export default () => {

    const dispatch = useDispatch<AppDispatch>()

    //const count = useSelector((state:StoreType) => state.basic.count)
    //const myName = useSelector((state: StoreType) => state.rename.name)    
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div >
                <h3>專案業績</h3>
                <p>三個月內全體系(全金字塔不限代數),專案業績 累積達200萬!為了時時督促同仁我們將200萬分成三個月的目標並以70-70-60萬做為月業績達標基礎，以確保同仁在進度之内</p>
                <a>下載專案事業體組織業明細</a>
            </div>
            <HBoardBody>
                {
                    boardData.map(
                        (data: boardProp) => <HBoard key={data.id} bData={data} />
                    )
                }
            </HBoardBody>
            <div style={{ display: "flex", width: 830, position: "relative", marginTop: 150 }}>
                {
                    [70, 70, 60, 0].map((value: number, index: number) => {
                        return (
                            value == 0 ?
                                <Road className="end" /> :
                                <Road key={"road" + index}>
                                    <div className="value">
                                        {value}萬
                                    </div>
                                </Road>
                        )
                    })
                }
                <Leader>
                    <img src="./images/event30/leader.svg" />
                </Leader>
            </div>
            <div style={{margin:20, fontSize:"1.6em", fontWeight:"bolder"}}>
                目前專案業績累計$<span style={{color:HibStyle.Hint}}>21,000,000</span>元。
            </div>
            <div>
                <HButton
                    type="old"
                    onClick={()=>{
                        dispatch({
                            type: MAIN_STEP_NEXT,
                            step: 4
                        })
                    }}
                >測試用:"達成結果"</HButton>
            </div>
        </div>
    )
}
