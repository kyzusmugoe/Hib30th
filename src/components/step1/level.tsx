import React, { useState } from "react";

type LevelProps = {
    jobTitle: string
}

export default (props: LevelProps) => {
    const [myTitle, setMyTitle] = useState<string>(props.jobTitle)
    return (
        <div>            
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: "1000px",
                height: 160,
                backgroundImage: "url('./images/event30/road.svg')",
                backgroundSize: "auto 50px",
                backgroundPosition: "bottom center",
                backgroundRepeat: "repeat-x"
            }}>
                {
                    [{ name: "專員" }, { name: "主任" }, { name: "襄理" }, { name: "經理" }].map((item, index) => {
                        return (
                            <div key={"level_"+index} style={{
                                display: "flex",
                                flex: "0 0 160px",
                                justifyContent: "flex-end",
                                position: "relative"
                            }}>
                                {
                                    myTitle == item.name &&
                                    <img id="leader" src="./images/event30/leader.svg" style={{ width: 80 }} />
                                }
                                <div style={{ width: 80 }}>
                                    <span style={{ position: "absolute", top: 20, right: 16, color: "#fff" }}>{item.name}</span>
                                    <img src={myTitle == item.name ? "./images/event30/gap.svg" : "./images/event30/gap_disable.svg"} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


