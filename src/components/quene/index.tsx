import React from "react";
import { useSelector } from 'react-redux'
import { StoreType } from "../../store";


export default () => {
    //const count = useSelector((state:StoreType) => state.basic.count)
    //const myName = useSelector((state: StoreType) => state.rename.name)

    
    return (
        <div>
            <div>
                <input type="radio" /> 我同意1
            </div>
            <div>
                <input type="radio" /> 我同意2
            </div>
            <div style={{ display: "flex" }}>
                {
                    ["直接增員主管", "事業體", "處經理"].map((label:string, index:number) => {
                        return (
                            <div key={"sign"+index}>
                                <div>
                                    {label}簽章
                                </div>
                                <div>
                                    簽名
                                </div>
                                <div>
                                    110年01月01日
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button>下一步</button>
        </div>
    )
}
