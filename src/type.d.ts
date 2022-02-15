type HibManData = {
    state:string,//新舊大誠人
    cName:string,
    uid:string,
    sex:string,
    prefA:number,//專案業績
    prefB:number,//發薪業績
    regDate:string,//登入日
    jobTitle:string,//登入日
    menbers:menber[]
}

type HibManMember = {
    dept:string,//一代區處名稱
    name:string,
    title:string,
    sex:string,
    type:string,//人力類別
    prefA:number,//專案業績
    prefB:number,//發薪業績
}