//import { rejects } from "assert";

class Webservice {
    url: string = "../Ashx/Event30.ashx";

    constructor() {
        
        if (process.env.NODE_ENV == "development") {
            this.url = "http://localhost:56400/Ashx/Event30.ashx";
        }
        console.log("init webservice ", this.url)
    }

    getEvent30Step = async (): Promise<HibManData> => {
        return await this.asyncGetEvent30Step()
    }

    getEvent30Data = async (): Promise<HibManData> => {
        return await this.asyncGetEvent30Data()
    }

    asyncGetEvent30Step = (): Promise<HibManData> => {
        let formData = new FormData();
        formData.append("RequestType", "Step");

        return new Promise((resolve, reject) => {
            fetch(this.url, {
                method: 'POST',
                mode: 'cors',
                body: formData
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(res => {
                if (res.Result == "OK") {
                    resolve(res.Data[0])
                } else {
                    console.error('[HIB168 錯誤] => 連線成功但取得資料失敗。');
                    reject()
                }
            }).catch(error => {
                console.error('[HIB168 錯誤]=>jsonip 取得失敗:', error)
                reject()
            });

        })
    }

    asyncGetEvent30Data = (): Promise<HibManData> => {
        let formData = new FormData();
        formData.append("RequestType", "GetData");
        if (process.env.NODE_ENV == "development") {
            formData.append("TestUID", "A228770302");
            //formData.append("TestUID", "D220629409");//陳於之
            //formData.append("TestUID", "N124527984");
            //formData.append("TestUID", "M122653935");
        }

        return new Promise((resolve, reject) => {
            fetch(this.url, {
                method: 'POST',
                mode: 'cors',
                body: formData
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(res => {
                if (res.Result == "OK") {
                    /*
                    for (let _d in res.Data[0]) {
                        let editData: HibManData = this.HibManDataAlex(JSON.parse(res.Data[0][_d])[0])
                        resolve(editData)
                    }
                    */
                    
                    let editData: HibManData = this.HibManDataSnow(res.Data[0]);                    
                    resolve(editData);
                } else {
                    console.error('[HIB168 錯誤] => 連線成功但取得資料失敗。');
                    reject()
                }
            }).catch(error => {
                console.error('[HIB168 錯誤]=>jsonip 取得失敗:', error)
                reject()
            });

        })
    }
    
    //整理從後端取回的資料 from snow
    
    HibManDataSnow = (data: any): HibManData => {
        console.log("oringal snow data", data);
        let members: Array<HibManMember> = [];
        for (let member of JSON.parse(data.人力)) {
            //console.log(member)
            let mb: HibManMember = {
                dept: member.一代區處名稱,
                sex: member.Sex,
                name: member.一代員工姓名,
                title: member.一代職位名稱,
                type: member.一代人力類別,
                prefA: parseInt(member.一代專案業績),
                prefB: parseInt(member.一代發薪業績),
            }
            members.push(mb)
        }

        let d: HibManData = {
            state: data.P_State,
            cName: data.歸屬後姓名,
            uid: data.歸屬後ID,
            sex: data.Sex,
            prefA: parseInt(data.專案業績),
            prefB: parseInt(data.發薪業績),
            regDate: data.登錄日,
            jobTitle: data.職位,
            menbers: members
        }
        return d
    }
    //整理從後端取回的資料 from Alex
    HibManDataAlex = (data: any): HibManData => {
        console.log("oringal data", data);
        
        let members: Array<HibManMember> = [];
        for (let member of data.V_30人力業績_Sum_1[0].V_30人力業績_Sum) {
            //console.log(member)
            let mb: HibManMember = {
                dept: member.一代區處名稱,
                name: member.一代員工姓名,
                sex: member.sex,                
                type: member.一代人力類別,
                title: member.一代職位名稱,
                prefA: member.一代專案業績,
                prefB: member.一代發薪業績,
            }
            members.push(mb)
        }

        let d: HibManData = {
            state: data.state,
            cName: data.歸屬後姓名,
            uid: data.歸屬後ID,
            sex: data.Sex,
            prefA: data.V_30人力業績_Sum_1[0].專案業績,
            prefB: data.V_30人力業績_Sum_1[0].發薪業績,
            regDate: data.登錄日,
            jobTitle: data.職位名稱,
            menbers: members
        }
        return d
    }

    /*
    saveExamResult = async(eid:string):Promise<object> =>{
        return await this.asyncSaveExamResult(eid);
    }

    getExamComplete = async(eid:string):Promise<object> =>{
        return await this.asyncGetExamComplete(eid);
    }

    resetExamComplete = async():Promise<object> =>{
        return await this.asyncResetExamComplete();
    }

    getExamList = async(eid:string):Promise<object> =>{
        return await this.asyncGetExamList(eid);
    }

    getExamInfo = async(eid:string):Promise<object> =>{
        return await this.asyncGetExamInfo(eid);
    }

    asyncGetExamInfo = (eid:string):object=>{            
        let formData = new FormData();
        formData.append("RequestType", "GetExamInfo");
        formData.append("ExamID", eid);
        return new Promise((resolve, reject) => {
            fetch(this.url, {
                method: 'POST',
                mode: 'cors', 
                body: formData
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(res => {
                resolve(res)
            }).catch(error => {
                console.error('[HIB168 錯誤]=>jsonip 取得失敗:', error)
                reject()
            });
        })
    }

    asyncGetExamList = (eid:string):object=>{           
        let formData = new FormData();
        formData.append("RequestType", "GetExamList");
        formData.append("ExamID", eid);
        return new Promise((resolve, reject) => {
            fetch(this.url, {
                method: 'POST',
                mode: 'cors', 
                body: formData
            }).then(response => { 
                if (response.ok) {
                    return response.json();
                }
            }).then(res => {
                // 資料處理：
                // 由於Answers在SQL已先使JSON string處理過，因此前端取回資料的時候先行將string處理回JSON物件以利後續處理。*             
                console.log(res)
                if(res.Result == "OK"){
                    resolve(res)
                }else{
                    console.error('[HIB168 錯誤] => 連線成功但取得資料失敗。');
                    reject()
                }                
            }).catch(error => {
                console.error('[HIB168 錯誤]=>jsonip 取得失敗:', error)
                reject()
            });
        })
    }

    asyncSaveExamResult = (eid:string):object=>{
        let formData = new FormData();
        formData.append("RequestType", "SaveExamResult");
        formData.append("ExamID", eid);
        return new Promise((resolve, reject) => {
            fetch(this.url, {
                method: 'POST',
                mode: 'cors', 
                body: formData
            }).then(response => { 
                if (response.ok) {
                    return response.json();
                }
            }).then(res => {
                if(res.Result == "OK"){
                    resolve(res)
                }else{
                    console.error('[HIB168 錯誤] => 連線成功但取得資料失敗。');
                    reject()
                }                
            }).catch(error => {
                console.error('[HIB168 錯誤]=>jsonip 取得失敗:', error)
                reject()
            });
        })
    }

    asyncGetExamComplete = (eid:string):object=>{
        let formData = new FormData();
        formData.append("RequestType", "GetExamComplete");
        formData.append("ExamID", eid);
        return new Promise((resolve, reject) => {
            fetch(this.url, {
                method: 'POST',
                mode: 'cors', 
                body: formData
            }).then(response => { 
                if (response.ok) {
                    return response.json();
                }
            }).then(res => {
                if(res.Result == "OK"){
                    resolve(res)
                }else{
                    console.error('[HIB168 錯誤] => 連線成功但取得資料失敗。');
                    reject()
                }                
            }).catch(error => {
                console.error('[HIB168 錯誤]=>jsonip 取得失敗:', error)
                reject()
            });
        })
    }

    asyncResetExamComplete = ():object=>{
        let formData = new FormData();
        formData.append("RequestType", "ResetExamComplete");
        return new Promise((resolve, reject) => {
            fetch(this.url, {
                method: 'POST',
                mode: 'cors', 
                body: formData
            }).then(response => { 
                if (response.ok) {
                    return response.json();
                }
            }).then(res => {
                if(res.Result == "OK"){
                    resolve(res)
                }else{
                    console.error('[HIB168 錯誤] => 連線成功但取得資料失敗。');
                    reject()
                }                
            }).catch(error => {
                console.error('[HIB168 錯誤]=>jsonip 取得失敗:', error)
                reject()
            });
        })
    }
    */
}

export interface IWebService {
    webservice: Webservice;
}

export default Webservice