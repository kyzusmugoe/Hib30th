import React,{useState} from "react";
import { useSelector } from 'react-redux'
import { StoreType } from "../../store";

export default () => {
    //const count = useSelector((state:StoreType) => state.basic.count)
   // const myName = useSelector((state:StoreType) => state.rename.name)
    const [isOpen, setIsOpen] = useState<boolean>(window.localStorage.getItem("clicked_treasure") ? true:false)
    const openTreasure=()=>{
        if(!isOpen){
            alert("!")
            window.localStorage.setItem("clicked_treasure", "1");
            setIsOpen(true)
        }
    }

    return (
        <div>
            <div>晉升達成</div>
            <div onClick={openTreasure}>
                {
                    isOpen?
                    "treasure box is open":
                    "treasure box is not open"
                }
            </div>
        </div>
    )
}
