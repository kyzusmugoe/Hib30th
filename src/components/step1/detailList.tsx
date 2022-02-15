import React, { useState } from "react";

type detailListProps = {
    members: HibManMember[]
}


const moneyFormat = (value: number) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits: 0,
        currency: 'USD',
    });

    return formatter.format(value)
}

const choosenOneBg = (member: HibManMember): string => {
    
    /*
    for (let i = 0; i < 5; i++) {
        if (member.type == "一般人力" && member.prefB > 100000) {
            return "#b0e745"
        }
        if (member.type == "專案人力" && member.prefA > 100000) {
            return "#2dc146"
        }
    }*/
    return "#fff"
}

export default (props: detailListProps) => {
    const [state, setstate] = useState<boolean>(false)
    const [step, setStep] = useState<boolean>(false)
    return (
        <div>
            <div
                style={{
                    width: 420,
                    border: "1px solid #aaa",
                    borderRadius: 3,
                    padding: "5px 10px",
                    display: "flex",
                    justifyContent: "space-between"
                }}

                onClick={() => {
                    setstate(!state)
                }}
            >
                <span>
                    業績明細
                </span>
                <span>
                    {
                        state ? "+" : "-"
                    }
                </span>
            </div>
            {
                state &&
                <div style={{ width: 420, padding: 10, border: "1px solid #ccc" }}>
                    <table className="table" style={{ width: "100%" }}>
                        <thead style={{ color: "#fff", backgroundColor: "#18391d" }}>
                            <tr>
                                <th>區處名稱</th>
                                <th>姓名</th>
                                <th>職位名稱</th>
                                <th>業績金額</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.members.map((member: HibManMember, index: number) => {
                                    return (
                                        <tr key={"menbers" + index} style={{ backgroundColor: choosenOneBg(member) }}>
                                            <td>{member.dept}</td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <div style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 20,
                                                        backgroundColor: member.type == "一般人力" ? "#a3ce7a" : "#16391d",
                                                    }}></div>
                                                    {member.name}
                                                </div>
                                            </td>
                                            <td>{member.title}</td>
                                            <td>
                                                {
                                                    member.type == "一般人力" ?
                                                        moneyFormat(member.prefB) :
                                                        moneyFormat(member.prefA)
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}


