import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer"

type ChartProps = {
    regDate: string
    enable: boolean
    value: number
}

const moneyFormat = (value: number) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits: 0,
        currency: 'USD',
    });

    return formatter.format(value)
}

export default (props: ChartProps) => {
    const [value, setValue] = useState<number>(0)
    useEffect(() => {
        if (props.enable) {
            setValue(props.value)
        }
    }, [props])

    return (
        <div>
            {
                /*
                    process.env.NODE_ENV == "development" &&
                    [90000, 190000, 310000, 450000, props.value].map((num) => {
                        return (
                            <button key={"cb"+num} onClick={() => {
                                setValue(num)
                            }}>{num}</button>
                        )
                    })
                */
            }

            <div style={{ display: "flex", alignItems: "center" }}>
                <ReactSpeedometer
                    forceRender={true}
                    width={400}
                    height={250}
                    maxValue={50}
                    value={Math.floor(value * 0.0001) > 50 ? 50 : Math.floor(value * 0.0001)}
                    needleColor={props.enable == false ? "#eee" : Math.floor(value * 0.0001) < 50 ? "#f00" : "#0f0"}
                    segments={5}
                    segmentColors={[
                        Math.floor(value * 0.0001) > 10 ? "#093" : "#eee",
                        Math.floor(value * 0.0001) > 20 ? "#093" : "#eee",
                        Math.floor(value * 0.0001) > 30 ? "#093" : "#eee",
                        Math.floor(value * 0.0001) > 40 ? "#093" : "#eee",
                        Math.floor(value * 0.0001) > 50 ? "#093" : "#eee"
                    ]}
                    textColor={value == 0 ? "#ccc" : "#000"}
                    currentValueText={"單位：萬元"}
                />

                <div style={{ color: value == 0 ? "#ccc" : "#000", fontSize:"1.4em",flex:"1 0 auto" }}>
                    <div style={{ display: "flex" }}>
                        <div style={{ flex: "0 0 120px" }}>
                            計算時間
                        </div>
                        <div>：</div>
                        <div style={{fontWeight:"bolder"}}>
                            民國{props.regDate.slice(0, 3)}年{props.regDate.slice(3, 5)}月{props.regDate.slice(5, 7)}日-
                            民國{
                                new Date(Date.now()).getFullYear() - 1911}年{
                                new Date(Date.now()).getMonth() < 9 ?
                                    "0" + (new Date(Date.now()).getMonth() + 1).toString() :
                                    (new Date(Date.now()).getMonth() + 1).toString()
                            }月{
                                new Date(Date.now()).getDate() < 9 ?
                                    "0" + (new Date(Date.now()).getDate()).toString() :
                                    (new Date(Date.now()).getDate().toString())
                            }日
                        </div>
                    </div>

                    <div style={{ display: "flex" }}>
                        <div style={{ flex: "0 0 120px" }}>
                            業績
                        </div>
                        <div>：</div>
                        <div style={{ fontWeight:"bolder"}}>
                            {moneyFormat(value)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


