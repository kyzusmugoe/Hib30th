import React, { ReactComponentElement, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { StoreType } from "../../store";
import { AppDispatch } from "../../store";
import { MAIN_STEP_NEXT } from "../../reducers/actionsTypes"


import * as HibStyle from '../../style'
import styled from 'styled-components'
import { HButton, HConfirm } from '../unit'



export default () => {
    //const count = useSelector((state:StoreType) => state.basic.count)
    //const myName = useSelector((state: StoreType) => state.rename.name)

    const [sendOpen, setSendOpen] = useState<boolean>(true)
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [queenOpen, setQueenOpen] = useState<boolean>(false)


    const dispatch = useDispatch<AppDispatch>()

    const QueneTitle = styled.div`
        display:flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        & div.body{
            font-size: 1.2em;
            display:flex;
            width: 180px;
            justify-content:space-around;
            align-items: center;
            color:#fff;
            background-color: #cacaca;
            padding:5px 10px;
            border-radius: 10px;   
            & div.circle{
                border: 3px solid #fff;
                width: 18px;
                height: 18px;
                background-color:#fff;
                border-radius: 18px;
            
            }  
        }

        & div.body.on{
            background-color:${HibStyle.M_DK_Green};
            
            & div.circle{
                border-color: #fff;
                background-color:${HibStyle.M_DK_Green};
            }
        }

        & div.date{
            font-size: 1.2em;
        }
        
    `


    const QueneTitleHander = (event: React.MouseEvent<HTMLDivElement>) => {
        event.currentTarget.classList.toggle('on')
    }

    return (
        <div>
            <div>
                <input type="radio" /> 我同意(必填)自提出申請並經公司核准後，即視同業事業體身份，本人於晉升後，申請晉升期間即無法領取個人績效獎金，並負擔晉升日當年度全體系績效獎金之發放。
            </div>
            <div>
                <input type="radio" /> 我同意(必填)專案業績於晉升後下兩個年度，皆須維持繼續率80%以上，未達80%以上時則無條件取消晉升資格。
            </div>

            {
                !queenOpen &&
                <div>
                    <HButton
                        type="old"
                        onClick={() => {
                            setConfirmOpen(true)
                        }}
                    >送出簽核</HButton>
                    <HConfirm
                        text="請問是否送出審核？"
                        show={confirmOpen}
                        cancel={() => {
                            setConfirmOpen(false)
                        }}
                        confirm={() => {
                            setConfirmOpen(false)
                            setQueenOpen(true)
                        }}
                    />

                </div>
            }
            {
                queenOpen &&
                <div style={{ display: "flex", transition: ".4s", opacity: 1 }}>
                    簽核狀況：
                    {
                        ["直接增員主管", "事業體", "處經理"].map((label: string, index: number) => {
                            return (
                                <div key={"sign" + index}>
                                    <QueneTitle>
                                        <div className="body" onClick={QueneTitleHander}>
                                            <div className="circle "></div>
                                            {label}
                                        </div>
                                        <span className="date">
                                            110年01月01日
                                        </span>
                                    </QueneTitle>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                queenOpen &&
                <HButton
                type="old"
                onClick={() => {
                    dispatch({
                        type: MAIN_STEP_NEXT,
                        step: 3
                    })
                }}
                >下一步</HButton>
            }
        </div>
    )
}
