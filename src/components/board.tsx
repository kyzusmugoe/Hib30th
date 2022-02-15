import React from "react";
import { useSelector } from 'react-redux'
import { StoreType } from "../store";

const board = () => {
    //const count = useSelector((state:StoreType) => state.basic.count)
    //const myName = useSelector((state:StoreType) => state.rename.name)
    return (
        <div>
            <div>
                myScore:{
                    //count
                }
            </div>
            <div>
                myName:{
                    //myName
                }
            </div>
        </div>
    )
}

export default board