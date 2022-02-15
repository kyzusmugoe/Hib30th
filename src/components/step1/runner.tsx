import React, { useState, useEffect } from "react";
import Fence from "./fence"
import DetailList from "./detailList"


const memberSVG = (cloth: boolean) => {
    return `
    data:image/svg+xml;charset=utf8,<svg version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 97 135" style="enable-background:new 0 0 97 135;" xml:space="preserve">
<path fill="rgb(23, 35, 69)" id="XMLID_00000118358728585520858310000003255055545920561071_" class="st0" d="M41.1,59.2c0,0-1.7,2.4-1.1,4.6
   c0.6,2.2,1.6,4.4,1.6,4.4s-4.1,13.3-5.1,16.1c-1,2.7-0.2,3-2.9,4.6c-2.6,1.6-8.4,3.9-10.2,9.9c-1.9,6-4.4,11.6-5.1,13.1
   s-1.1,2.4-2.7,2.4s-4.4-0.7-4.6,1.4c-0.2,2.1,0,5.2,0,6s-1.9,2-1.1,4.6c0.7,2.6,2.1,5,2.9,5.2c0.7,0.2,2.1-0.1,2.2-0.7
   c0.1-0.6-1.4-1.6-0.6-3.9c0.7-2.2,4.5-5.9,6.6-7.9s7.1-10.9,10.9-14.8c3.7-4,8-9,11-11.6s9.1-12.7,10.4-15c1.2-2.2,2.6-5.4,2.6-5.4
   s13.1,2.5,15.3,2.9c2.2,0.4,4.5,1.1,4.5,1.1s-3.9,3.4-4.9,8.6s-3.2,14.7-4.4,17.8c-1.1,3.1-2,5-2.7,6.6s-2,3.7-1.1,4.7s5.6,1.6,8,2
   c2.4,0.4,7,0.2,8-0.6c1-0.9,1.1-1.4,0.5-1.5s-4.1-2.4-5.1-3.2s-1.7-2.4-1.6-3s5.7-13,8.2-18s5.2-13.7,6-15.7c0.7-2,1-2.4,0.2-3.4
   c-0.7-1-5.4-4.5-13.1-8.7s-12-4.4-14.3-4.7c-2.4-0.4-6.4-4-11.7-1.6C42.1,57.9,41.1,59.2,41.1,59.2z"/>
<g >
   <path id="XMLID_00000049218256379552832680000010684751371835933369_" class="st1" d="M78.9,113.9c-0.6-0.1-4.1-2.4-5.1-3.2
       c-1-0.9-1.7-2.4-1.6-3c0,0-0.5-1.6-1.6-1.9c-1.1-0.2-1.6,3.1-1.6,3.1l-4.8-1c-0.2,0.5-0.4,0.9-0.6,1.3c-0.7,1.6-2,3.7-1.1,4.7
       s5.6,1.6,8,2s7,0.2,8-0.6C79.4,114.5,79.6,114,78.9,113.9z"/>
   <path id="XMLID_00000136377915458552409920000014206280314482167224_" class="st1" d="M17.9,122c-0.1-0.2-0.2-0.3-0.3-0.5
       c-0.7-1-2,0.1-2,0.1s-1.2-1.4-1.1-3.2c0.1-1.5,1.4-3.4,2-4.2c-0.2,0.1-0.5,0.1-0.8,0.1c-1.6,0-4.4-0.7-4.6,1.4c-0.2,2.1,0,5.2,0,6
       c0,0.7-1.9,2-1.1,4.6c0.7,2.6,2.1,5,2.9,5.2c0.7,0.2,2.1-0.1,2.2-0.7c0.1-0.6-1.4-1.6-0.6-3.9C14.8,125.5,16.3,123.7,17.9,122z"/>
</g>
<path fill="${cloth == true ? "rgb(22, 57, 29)" : "rgb(157, 198, 119)"}" class="st2" d="M71.7,37c-1.3-1.7-2.4-1.3-2.8-0.6c-0.5,0.7-2.9,4.4-2.9,4.4s-3.7-8-4.3-11.2c-0.3-1.5-0.9-2.4-1.4-2.9
   c0,0,0,0,0,0c-1.4-2.6-6.8-3.4-7.3-3.3c-0.4,0.1-3.9-0.3-6,0c-2.8-0.1-9.1,1.4-13.6,3.3c-4.8,2-6.8,2.2-7.3,4.3s0.6,17.4,1.1,19.1
   c0.5,1.7,3.9,1.3,5.5,0.6c1.6-0.7,2.7-2,2.9-4.3c0.2-2.3-1.1-10.4-0.5-11.4c0.4-0.7,4.7-1.3,8.2-1.8c0.5,2.6,1.3,5.9,1,9
   c-0.2,3.5-1.9,14.2-2.4,15.6s-1.1,2.3-1.7,3.7c-0.6,1.4,0.8,2.5,1.6,2.7s4-3.3,7.3-4.5c3.2-1.2,7.6-0.7,8.7-0.9
   c1-0.1,1.9-0.5,2.2-1.2c0.4-0.7-1.2-1.8-1.2-3.9c0-1,0.7-3.8,1.4-7.1c1.8,2,4,4.2,5.4,4.2c2.5,0.1,5-4.3,6.2-7.1
   C73.1,40.9,73.1,38.7,71.7,37z"/>
<path fill="rgb(33, 33, 33)" class="st3" d="M52.3,7.7c-3.7,0.4-6.8,4.4-6.4,7.9c0.1,0.6,0.1,1.2,0,1.7c-0.2,0.7-0.9,1.3-0.7,2c0.1,0.4,0.6,0.7,0.8,1.1
   s0.1,0.9,0.2,1.3c0.2,0.8,1.3,1.3,2.1,0.9c0.3-0.2,0.5-0.4,0.9-0.5c0.3-0.1,0.6,0,1,0.1c0.8,0,2.1-0.6,2.4-1.3
   c0.5-1.1,0.8-3.6,0.8-3.6c-0.4-0.2-0.6-0.8-0.6-1.4c0-0.8,0.4-1.5,1-1.5c0.3,0,0.6,0.3,0.8,0.7c0.3-0.5,6.6-2.4,6.6-2.4
   C60.4,10.3,58.7,7,52.3,7.7z"/>
<g fill="rgb(150, 56, 35)">
    <path class="st4" d="M78.9,113.9c-0.6-0.1-4.1-2.4-5.1-3.2c-1-0.9-1.7-2.4-1.6-3c0-0.2,0.7-1.6,1.6-3.6c-1,0.3-2.3,0.5-3.3,0.4
       c-1.2-0.1-3-0.8-4.3-1.2c-1,2.8-1.9,4.6-2.6,6.1c-0.7,1.6-2,3.7-1.1,4.7s5.6,1.6,8,2c2.3,0.3,6.9,0.1,7.9-0.7
       C79.4,114.5,79.5,114,78.9,113.9z"/>
   <path class="st4" d="M17.7,112.9c-0.5,0.8-1,1.3-2.2,1.3c-1.6,0-4.4-0.7-4.6,1.4c-0.2,2.1,0,5.2,0,6c0,0.7-1.9,2-1.1,4.6
       c0.7,2.6,2.1,5,2.9,5.2c0.7,0.2,2.1-0.1,2.2-0.7c0.1-0.6-1.4-1.6-0.6-3.9c0.7-2.2,4.5-5.9,6.6-7.9c0.4-0.4,0.8-0.9,1.4-1.7
       c-0.8-0.1-1.7-0.5-2.5-1.1C18.7,115.3,18.1,113.9,17.7,112.9z"/>
</g>
<g fill="rgb(255, 187, 158)">
   <path class="st4" d="M55.7,14.1c-0.6,0.2-0.8,0.3-1.2,0.8c-0.1-0.4-0.6-0.5-0.9-0.5c-0.5,0-1,0.7-1,1.5c0,0.7,0.3,1.2,0.6,1.4
       l-0.9,1.8c0,0.1-0.1,0.2-0.1,0.3c-0.1-0.1-1.2,5.5-1.2,5.5c0.5,2.1,5.1,4.8,6.7,4.5c0.2,0,0.4,0,0.6-0.1c1.6-0.6-1.7-2.9-1.7-2.9
       v-4.7c1.5-0.4,2.7-1.3,3.3-3.9c0-0.1,0-0.3,0.1-0.4c0.2-0.6,0.6-2.5,0.3-4.4L55.7,14.1z"/>
   <path class="st4" d="M34.1,49.8L34,49.3l-4.2,1c0,0,0,2.9,0.2,4.3c0.2,1.4,1.7,1.5,1.7,1.5s-0.8,0.8-0.5,1.3s1.2,0.8,3.3-0.2
       c2-1,2-1,2.5-1.6c0.4-0.6-0.2-2-1.3-3.3C34.6,51,34.1,49.8,34.1,49.8z"/>
   <path class="st4" d="M71.6,39.4c1.1-0.1,1.5-0.8,2.6-2.3s2.3-2.7,2-4.4s-1-4-2-4s-1.7,0.5-1.7,0.5s-0.4-0.6-1.3,0.3s-0.6,1.4-1,2.5
       s-0.4,1.5-0.2,2.3s0.3,1.2,0.3,1.2l-1,1.6C69.3,37.1,70.5,39.5,71.6,39.4z"/>   
</g>

</svg>
`
}

type RunnerProps = {
    enable: boolean
    jobTitle: string
    members: HibManMember[]
}

export default (props: RunnerProps) => {

    const [sortMembers, setSortMembers] = useState<HibManMember[]>([])

    useEffect(() => {
        let ct_1 = 0//一般人力 最多三個
        let ct_2 = 0// 專案人力
        let ct_total = 0// 總計人力

        let tempMember: HibManMember[] = []
        props.members.map((member: HibManMember) => {
            if (member.type == "一般人力" && member.prefB >= 100000 && ct_1 < 3) {
                ct_1++;
                tempMember.push(member)
            }
            if (member.type == "專案人力" && member.prefA >= 100000 ) {
                ct_2++;
                tempMember.push(member)
            }
        })
        ct_total = ct_1 + ct_2;
        if (ct_total > 5) ct_total = 5
        setSN(ct_total)
        setSortMembers(tempMember)

    }, [props.members])

    useEffect(() => {
        if (sortMembers.length > 0) {
            console.log(sortMembers)
        }
    }, [sortMembers])

    const [SN, setSN] = useState<number>(0)

    const renderMembers = (num: number) => {
        let members = []
        for (let i: number = 0; i < num; i++) {
            members.push(
                <div key={"menber" + i}
                    style={{
                        width: 60,
                        position: "absolute",
                        top: 40 + ((60 / SN) * i),
                        left: Math.floor(Math.random() * 10) + (i % 2) * 40
                    }}
                >
                    <img src={memberSVG(props.members[i].type == "一般人力")} />
                    <img src="./images/event30/money_10.svg" width={80} style={{ marginTop: 50 }} />
                </div>
            )
        }
        return members
    }

    return (
        <div style={{ minWidth: 1000 }}>
            {
                /*
                    [0, 1, 2, 3, 4, 5].map(sn => {
                        return (
                            <button key={"btn_" + sn} onClick={() => {
                                setSN(sn)
                                //console.log(sn)
                            }}>{sn}</button>
                        )
                    })
                */
            }
            <div style={{ position: "relative" }}>
                <div style={{
                    display: "flex",
                    opacity: props.enable ? 1 : .3,
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "1000px",
                    height: 160,
                    backgroundImage: "url(" + (props.enable ? "./images/event30/road.svg" : "./images/event30/road_disable.svg") + ")",
                    backgroundSize: "auto 50px",
                    backgroundPosition: "bottom center",
                    backgroundRepeat: "repeat-x",
                }}>
                    {
                        [1, 2, 3, 4, 5].map((item: number, index: number) => {
                            return (
                                <div key={"fence" + item} style={{
                                    display: "flex",
                                    flex: "0 0 140px",
                                    justifyContent: "flex-end",
                                    position: "relative",
                                    marginBottom: 45
                                }}>
                                    <div style={{ width: 100, display: "flex", alignItems: "flex-end" }}>
                                        <img style={{ width: 15 }} src={"./images/event30/gap2.svg"} />
                                        {
                                            item > SN &&
                                            <Fence
                                                setMember={props.members.length <= index}
                                                type={
                                                    sortMembers.length > 0 && sortMembers[index] != undefined ?
                                                        sortMembers[0].type
                                                        : "B"
                                                }
                                                money={
                                                    sortMembers[index] != undefined ?
                                                        (
                                                            sortMembers[index].type == "一般人力" ?
                                                                sortMembers[index].prefB :
                                                                sortMembers[index].prefA
                                                        )
                                                        : 0
                                                }
                                            />
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div style={{
                        width: 150,
                        position: "absolute",
                        //left: `${20 * SN}%`
                        left: 150 * SN
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "flex-end",
                            position: "relative",
                        }}>
                            {
                                renderMembers(SN)
                            }
                            <img
                                src={props.enable ? "./images/event30/leader.svg" : "./images/event30/leader_disable.svg"}
                                style={{
                                    width: 60,
                                    right: 0,
                                    top: 60,
                                    position: "absolute",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", width: "100%", maxWidth: 1000, marginTop: 100, justifyContent: "flex-end" }}>
                    <DetailList members={props.members} />
                </div>
            </div>
        </div>
    )
}


