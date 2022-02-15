import React from "react";
import { useSelector } from 'react-redux'
import { StoreType } from "../../store";


export default () => {
    //const count = useSelector((state:StoreType) => state.basic.count)
    //const myName = useSelector((state: StoreType) => state.rename.name)
    return (
        <div>
            <h3>Hi！王大誠</h3>
            <div style={{display:"flex"}}>
                <div>20萬</div>
                <div>剩餘90日</div>
                <div>key</div>
                <button>i</button>
            </div>
        </div>
    )
}
