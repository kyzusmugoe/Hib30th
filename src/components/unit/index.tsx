//30有誠的按鈕群
import React, { useState, useEffect, ReactEventHandler } from "react";


import * as HibStyle from '../../style'
import styled from 'styled-components'


const ButtonEmtity = styled.button`
    padding:5px 20px;
    margin: 10px;
    border: none;
    border-radius:30px;
    font-weight: bolder;
    &.old{
        color: ${HibStyle.M_WHITE};
        background-color:${HibStyle.M_DK_Green};
        &:hover{
            background-color:${HibStyle.S_NOR_Green}; 
            box-shadow: 0 2px 5px #aaa;
        }
        &:active{
            background-color:${HibStyle.S_DK_Green}; 
            box-shadow: none
        }
    }

    &.new{
        color: ${HibStyle.M_DK_Green};
        background-color:${HibStyle.M_LT_Green};
        &:hover{
            background-color:${HibStyle.S_LT_Green}; 
            box-shadow: 0 2px 5px #aaa;
        }
        &:active{
            color: ${HibStyle.M_WHITE};
            background-color:${HibStyle.S_MT_Green}; 
            box-shadow: none
        }
    }
    &.disabled{
        color: ${HibStyle.M_WHITE};
        background-color:${HibStyle.M_DIS};
    }
    &.cancel, &.confirm{
        border-radius: 10px;
    }
    &.cancel{
        border: 1px solid #ccc;
    }
    &.confirm{
        color:${HibStyle.M_WHITE};
        background-color:${HibStyle.M_DK_Green};
    } 
    &.cancel:hover, &.confirm:hover{
        color:${HibStyle.M_WHITE};
        background-color:${HibStyle.M_LT_Green};
    }
    &.cancel:active, &.confirm:active{
        color:${HibStyle.M_WHITE};
        background-color:${HibStyle.S_DK_Green};
    }
`

const ConfirmEmtity = styled.div`
    position: fixed;
    width:100%;
    height:100%;
    top:0;
    left: 0;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .6);
    .text{
        font-size: 1.4em;
        
    }
    &.off{
        display:none;
    }

    .c-body{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color:${HibStyle.M_WHITE};
        width: 100%;
        height: 300px;
        max-width: 380px;
    }
`

interface buttonProps {
    type: string
    children: String
    className?: string
    onClick: () => void
}
export class HButton extends React.Component<buttonProps> {
    render() {
        const { children, type, ...props } = this.props as buttonProps;
        return <ButtonEmtity className={type} {...props} > {children} </ButtonEmtity>
    }
}

interface modalProps {
    show?: boolean
    text: string
    cancel: () => void
    confirm: () => void
}

export class HConfirm extends React.Component<modalProps> {
    render() {
        const { show, text, cancel, confirm, ...props } = this.props as modalProps;
        if (show) {
            return (
                <ConfirmEmtity {...props} >
                    <div className="c-body">
                        <div className="text">
                            {text}
                        </div>
                        <div>
                            {
                                /*
                                    <ButtonEmtity className="confirm" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                event.currentTarget.classList.add('off')
                                confirm()
                            }}>確定</ButtonEmtity>

                            <ButtonEmtity className="cancel" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                event.currentTarget.classList.add('off')
                                cancel()
                            }}>取消</ButtonEmtity>
                                */
                            }
                            <ButtonEmtity className="confirm" onClick={confirm}>確定</ButtonEmtity>
                            <ButtonEmtity className="cancel" onClick={cancel}>取消</ButtonEmtity>

                        </div>
                    </div>
                </ConfirmEmtity>
            )
        } else {
            return null
        }
    }
}