console.log("Hib168 is include");

function HIB168(option) {
    //construct 建構函式
    console.log("Hib168 is be create");

    //20210830 加上亂數測試是否會讓暫存強制更新
    urlHash = '6ScPwqyy'

    //private var 
   // let UserDate = {};

    //public function
    /* siteMap的click行為*/
    HIB168.prototype.menuClick = function (ID) {        
        _MenuClick(ID);
        gtag('event', 'siteMap_click', { 'event_category': 'user', 'event_label': $("#loginedUserName").html() }); 
    };


    //20210106修正：GetPageBasic 改成async function 可讓外部讀取user data
    HIB168.prototype.GetPageBasic = async function (PageName) {
       return await _getPageBasic(PageName);
    }; 

    HIB168.prototype.GetUrlHash = function () {  return urlHash; };

    /*20210727：取得USER IP*
     * 以下IP搜尋會先以HIB的server為主做搜尋的動作，如果該服務沒正確回傳IP，將會往下搜尋
     * IP服務網站的清單參考如下：https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
     * */
    HIB168.prototype.GetUserIP = async () => {

        let ip = "";
        await fetchHibIP().then(
            ip => ip,
            () => fetchJsonIP("https://jsonip.com/", "ip")
        ).then(
            ip => ip,
            () => fetchJsonIP("https://api.ipify.org?format=json", "ip") 
        ).then(
            ip => ip,
            () => fetchJsonIP("https://api.db-ip.com/v2/free/self", "ipAddress") 
        ).then(
            ip => ip,
            () => fetchJsonIP("https://json.geoiplookup.io", "ip") 
        ).then(
            ip => ip,
            () => fetchJsonIP("https://ipapi.co/json", "ip") 
        ).then(
            ip => ip,
            () => fetchJsonIP("http://www.geoplugin.net/json.gp", "geoplugin_request") 
        ).then(
            ip => ip,
            () => fetchJsonIP("http://ip-api.com/json", "query") 
        ).then(
            ip => ip,
            () => fetchJsonIP("http://ip.jsontest.com/", "ip") 
        ).then(
            ip => ip,
            () => fetchJsonIP("http://ip.jsontest.com/", "ip")
        ).then(
            success => { ip = success; },
            fail => { ip = "0.0.0.0";console.log(fail) }
        )
        return ip
    }

    const fetchJsonIP = (url, key) => {
        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(res =>{
                console.log("Get IP from " + url, res);
                if (res[key]) {
                    resolve(res[key])
                } else {
                    console.error('[HIB168 錯誤]=>關鍵字中尚未找尋到IP資料:', error)
                    reject()
                }
            }).catch(error => {
                console.error('[HIB168 錯誤]=>jsonip 取得失敗:', error)
                reject()
            });
        })
    }

    const fetchHibIP = () => { 
        return new Promise((resolve, reject) => {
            fetch("https://168.hib.com.tw/l/whatismyip.ashx", {
                mode: 'cors'
            }).then(response => {
                console.log(response)
                if (response.ok) {
                    return response.text();
                }
             }).then(res => {
                if (res.length > 0) {
                    console.log("Get IP from https://168.hib.com.tw/l/whatismyip.ashx", res);
                    resolve(res)
                } else {
                    console.error('[HIB168 錯誤]=>尚未在阿忠的服務找到IP資料:', error)
                    reject()
                }
            }).catch(error => {
                console.error('[HIB168 錯誤]=>HIB ip 取得失敗:', error)
                reject()
            });
        })
    }

    //private function
    const _getPageBasic = PageName => {
        let formData = new FormData();
        formData.append("RequestType", "PageBasic");
        formData.append("PageName", PageName);
        return new Promise((resolve, reject) => {

            fetch("../Ashx/Login.ashx", {
                method: 'POST',
                body: formData
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("hib168 連線失敗");
                    return null;
                }
            }).then(data => {
                if (data.IsLogin === 'Y') {
                    //單位名稱
                    var UserUnit = data.UserUnit;
                    //產險登錄字號
                    var propLicenseID = data.propLicenseID;
                    //壽險登錄字號
                    var lifeLicenseID = data.lifeLicenseID;
                    //console.log(UserUnit);
                    //console.log(lifeLicenseID);

                    this.Signatory = data.Signatory;//是否為簽署人

                    _headNav();//加入標頭功能列

                    if (document.querySelector("#loginedUserName")) {
                        document.querySelector("#loginedUserName").innerHTML = data.UserName;
                    }

                    //沒有姓名資料的時候隱藏header的USER icon
                    if (document.querySelector("#loginedUserName").innerHTML === "" || document.querySelector("#loginedUserName").innerHTML === undefined) {
                        document.querySelector("#UserPanel").style.display = "none";
                    }


                    var jsonobj = JSON.parse(data.PortalMenu);
                    if (option && option.getPortalMenu) {
                        option.getPortalMenu(jsonobj);
                    }
                    // console.log(getPortalMenu);
                    //設置左方menu
                    if ($("#left-menu-area").length > 0) {
                        var _t = $("#left-menu-area");
                        _t.html(_renderMenu(jsonobj));
                        //console.log(jsonobj);
                        //設定menu的按鈕行為
                        _t.find('a').each(function (index, item) {
                            $(item).click(function () {
                                try {
                                    gtag('event', 'menuName_' + $(this).data("menuname") + '_click', { 'event_category': 'user', 'event_label': $("#loginedUserName").html() });
                                } catch (e) {
                                    console.log('GA錯誤', e);
                                }


                                localStorage.setItem("show_current_menu", $(this).data("menucode") );
                                _MenuClick($(this).data("menucode"));

                               

                                //change collpase button state 
                                if ($(this).hasClass("hasCollapse")) {
                                    console.log("hasCollapse");
                                }
                            });
                        });


                        //logo
                        $("#hib-logo").click(function () {
                            gtag('event', 'click_logo', { 'event_category': 'user', 'event_label': $("#loginedUserName").html() });
                            document.location.href = "../Html/DashBoard.html";
                        });

                        //開啟選單按紐
                        _t.find('#menu-open-btn').click(function () {
                            _t.addClass("open");
                            $(this).hide();
                            gtag('event', 'menu_open', { 'event_category': 'user', 'event_label': $("#loginedUserName").html() });
                        });

                        //關閉選單按紐
                        _t.find('#menu-close-btn').click(function () {
                            _t.removeClass("open");
                            _t.find('#menu-open-btn').show();
                            gtag('event', 'menu_close', { 'event_category': 'user', 'event_label': $("#loginedUserName").html() });
                        });
                    } else {
                        console.log("尚未設定  $(\"#left-menu-area\")");
                    }

                    //20200811 新增設置footer menu
                    _footer();

                    if (data.BackNoRight === '') {
                        //initCharts();
                    } else {
                        alert('無此功能後門權限！');
                        if (PageName !== 'index') {
                            window.location = "../Html/index.html";
                        }
                    }

                    //20200921 新增系統公告功能
                    try {
                        //_announcement();
                    } catch (error) {
                        console.log("公告設置失敗", error);
                    }

                    //20201126 新增timeout計時器
                    try {
                        _timeoutTimer(data.LastLoginTime);
                    } catch (error) {
                        console.log("time count 設置失敗", error);
                    }
                    resolve(data);
                }
                else {
                    // console.log(option)
                    if (data.UID !== '') {
                        console.log("a");
                        //從indicateLine.ashx過來的，就可以不必管Session["UID"]
                    } else if (option !== undefined && option.guest === true) {

                        console.log("B");
                        //20201130 訪客功能|目前是為了公平待客原則頁面可允許外部訪客瀏覽下載
                        _headNav();//加入標頭功能列
                        document.querySelector("#left-menu-area").style.display = "none";
                        document.querySelector("#timeoutContainer").style.display = "none";
                        document.querySelector("#UserPanel").innerHTML = '<a class="btn btn-primary text-white" href="../Html/Login.html">登入168</a>';
                        document.querySelector("#right-content").style.width = "100%";

                        _footer();//加入footer
                    } else {
                        console.log("C");
                        alert('登入逾期！請重新登入');
                        window.location = "../Html/Login.html";
                    }
                }
            });
        });
    };
    
    _headNav = function () {
        var plugin = ($("#navbar-area").html());
        $("#navbar-area").html(
            '<nav id="navbar-content" class="navbar navbar-expand navbar-light m-3 p-2 pb-3 shadow-sm">' +
                '<div class="collapse navbar-collapse" id = "navbarText" >' +
                    '<ul class="navbar-nav mr-auto">' +
                        '<li class="nav-item active"><img class="w-100" style="max-width:250px" src="./img/hib_logo.svg" /></li>' +
                    '</ul>' +
                     plugin +
                    '<div id="UserPanel" class="navbar-text" style="display:flex;align-items: center;">' +
                        'hi! <span id="loginedUserName" style="white-space:nowrap"></span>' +
                        '<button type="button" class="btn btn-primary btn-light" data-toggle="modal" data-target="#exampleModalLong">' +
                            '<i id="logout-btn" class="fas fa-user p-2" data-toggle="modal" data-target="#exampleModalLong"></i>' +
                        '</button>' +
                        '<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">' +
                            '<div id="user-panel" class="modal-dialog float-right m-3" role="document">' +
                                '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                        '<h5 class="modal-title text-center w-100" id="exampleModalLongTitle">帳戶管理</h5>' +
                                    '</div>' +
                                    '<div class="modal-body">' +
                                        '<div>登入時間：<span class="text-info" id="loginTime"></span></div>' +
                                        '<hr/>' +
                                        '<div>' +
                                            '<ul class="p-info">' +
                                                '<li><span class="title">通訊處：</span><span class="content" id="MainContent_Lab_通訊處"></span></li>' +
                                                '<li><span class="title">單位：</span><span class="content" id="MainContent_Lab_單位"></span></li>' +
                                                '<li><span class="title">壽險登錄字號：</span><span class="content" id="MainContent_Lab_壽險登錄字號"></span></li>' +
                                                '<li><span class="title">壽險登錄日：</span><span class="content" id="MainContent_Lab_壽險登錄日"></span></li>' +
                                                '<li><span class="title">壽險初登錄日：</span><span class="content" id="MainContent_Lab_壽險初次登錄日"></span></li>' +
                                                '<li><span class="title">投資登錄日：</span><span class="content" id="MainContent_Lab_投資登錄日"></span></li>' +
                                                '<li><span class="title">外幣登錄日：</span><span class="content" id="MainContent_Lab_外幣登錄日"></span></li>' +
                                                '<li><span class="title">登錄有效日：</span><span class="content" id="MainContent_Lab_登錄有效日"></span></li>' +
                                                '<li><span class="title">電子郵件：</span><span class="content" id="MainContent_Lab_電子郵件"></span></li>' +
                                                '<li><span class="title">產險登錄字號：</span><span class="content" id="MainContent_Lab_產險登錄字號"></span></li>' +
                                                '<li><span class="title">產險登錄日：</span><span class="content" id="MainContent_Lab_產險登錄日"></span></li>' +
                                                '<li><span class="title">產險初登錄日：</span><span class="content" id="MainContent_Lab_產險初次登錄日"></span></li>' +
                                                '<li><span class="title">產險有效日：</span><span class="content" id="MainContent_Lab_產險有效日"></span></li>' +
                                                '<li><span class="title">業績歸屬至：</span><span class="content" id="MainContent_Lab_業績歸屬至"></span></li>' +
                                            '</ul>' +
                                        '</div>' +
                                        '<div>' +
                                            '<ul class="list-group list-group-flush">' +
                                                '<li class="list-group-item"><a href="../Html/index.html?ShowPWD=U">修改密碼</a></li>' +
                                                '<li class="list-group-item"><a href="javascript:_logoutPortal();">登出</a></li>' +
                                            '</ul>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="modal-footer">' +
                                        '<button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
            '</div >' +
            '<div id="timeoutContainer">剩餘時間:<span  id="timeout"></span></div >' +
            '</nav >'
        );
        _getUserInfo();
    };

    _footer = function () {
        if ($("#footer-area").length > 0) {
            $("#footer-area").html(
                '<div class= "shadow-sm  p-3" >' +
                '<div id="footer-container">' +
                        '<div style="display:flex; justify-content: space-between;">'+
                            '<div>' +
                                '<a href="javascript:location.href=\'https://publicca.hinet.net/SSLQueryCert/SSLQueryCert.jsp?Domain_name=www.hib.com.tw\'">'+
                                    '<img src="./images/SSL_seal_60x84.gif" width="60" height="84" />'+
                                '</a>'+
                            '</div>'+
                            '<div class="p-3">' +
                                '<a class="mr-3 m-3 m-sm-1" href="./OLD.html">' +
                                '<i class="fa fa-handshake mr-2"></i>公平待客原則' +
                                '</a>' +
                                '<a class="mr-3 m-3 m-sm-1" href="./SiteMap.html">' +
                                '<i class="fa fa-map-marker mr-2"></i>網站地圖' +
                                '</a>' +
                                '<a class="mr-3 m-3 m-sm-1" href="mailto:hibwja@gmail.com">' +
                                '<i class="fa fa-envelope mr-2"></i>聯絡我們' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                        '<div class="text-black-50 small m-0 d-flex flex-row flex-wrap justify-content-end">' +
                            '<div class="h6">Copyright © 2020 </div>' +
                            '<div class="h6">Honesty Insurance Brokers co., LTD.</div>' +
                            '<div class="h6">All rights reserved.</div>' +
                        '</div>' +
                    '</div>' +
                '</div > '
            );
        } else {
            console.log("尚未設定 footer，請在right-content中最後方增加一個div區塊id為'footer-area'。");
        }
    }

    _logoutPortal = function () {
        window.location = "../Ashx/Indicate.ashx?Qtype=logout";
    }

    _getUserInfo = function() {
        $.ajax({
            url: '../Ashx/Performance.ashx',
            data: { RequestType: 'GetUserInfo' },
            type: 'POST',
            dataType: 'json',
            success: function (data) {

                if (data.length > 0) {
                    var foo = data[0];
                    //console.log("foo:", foo);

                    $("#MainContent_Lab_通訊處").html(foo.通訊處);
                    $("#MainContent_Lab_單位").html(foo.單位);

                    $("#MainContent_Lab_壽險登錄字號").html(foo.壽險登錄字號);
                    $("#MainContent_Lab_壽險登錄日").html(foo.壽險登錄日);
                    $("#MainContent_Lab_壽險初次登錄日").html(foo.壽險初次登錄日);

                    $("#MainContent_Lab_投資登錄日").html(foo.投資登錄日);
                    $("#MainContent_Lab_外幣登錄日").html(foo.外幣登錄日);

                    $("#MainContent_Lab_登錄有效日").html(foo.登錄有效日);
                    $("#MainContent_Lab_電子郵件").html(foo.電子郵件);

                    $("#MainContent_Lab_產險登錄字號").html(foo.產險登錄字號);
                    $("#MainContent_Lab_產險登錄日").html(foo.產險登錄日);
                    $("#MainContent_Lab_產險初次登錄日").html(foo.產險初次登錄日);

                    $("#MainContent_Lab_產險有效日").html(foo.產險有效日);
                    $("#MainContent_Lab_業績歸屬至").html(foo.業績歸屬至);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
                alert('GetUserInfo服務失敗！');
            }
        });
    }

    _announcement = function () {
        /*產生公告*/
        var annKey = "ANN2021052801s";
        var modalTitle = "【總公司資訊部 網路維護公告】";
        /*var annBody =
            "<p style='color:red'>更新：因應富邦產物行動投保網路流量爆增導致作業出現異常情況下，行動投保登錄時間截止時間將延至5月19日18:00</p>"+
            "係因近日Covid-19疫情嚴峻，為維護全體同仁健康及避免今年1月防疫保單銷售亂象再次發生，僅針對產險防疫保單銷售規範如下：" +
            "<ul style='list-style-type: cjk-ideographic;'>"+
            "<li>富邦產物（含疫苗險）、泰安、旺旺友聯、南山產物、安達產物（安打疫苗保險）…等產險公司之防疫商品，將於<span style='color:#aaa'>5月19日（星期三）下午15: 00</span>為最後紙本收件日及行動投保登錄時間，逾時將不再受理。富邦產物（疫苗險）及安達產物（安打疫苗保險）將視疫情情況重新啟動銷售並另行公告作業流程。</li>"+
            "<li>要保文件謄寫請於『通訊處所外』完成；送件至通訊處時請務必遵循總公司及通訊處相關防疫規定作業。</li>"+
            "<li>為配合產險公司作業規範，本次不接受以Excel明細檔方式作業。</li>" +
            "</ul>" +
            "以上，敬請協助配合，謝謝。";*/
        var annBody = "<p>總公司資訊部為因應<span style='color:red'>防火牆調整維護作業</span>，將於<span style='color:red'>2021/05/29(星期六)12:00~16:00</span>暫停提供<span style='color:red'>168網站、受理系統、業績薪資、Line@超人秘書等...各項提供之連網服務</span>。<p>"+
                      "<p>總公司資訊部為因應<span style='color:red'>中華電信HiNet企業上網資安設備維護作業</span>，將於<span style='color:red'>2021/06/03(星期四) 凌晨 04:00 ~08:00</span>暫停提供<span style='color:red'>168網站、受理系統、業績薪資、Line@超人秘書等...各項提供之連網服務等...</span>。</p>"+
                      "不便之處敬請見諒 資訊部"
       
        var annLS = window.localStorage.getItem(annKey);
        /*使用者如果沒有點選不必提醒，在瀏覽器還沒關閉的時，用sessionStorage內的read判斷是否需要彈出提醒*/
        if (window.sessionStorage.getItem('read') === null ) {
            window.sessionStorage.setItem("read", true);
        } else {
            return;
        }
        if (annLS) {
            console.log("已經看過公告了喔", annKey);
        } else {
            $("#main-page").append(
                '<div id="annModal" class="modal fade" tabindex="-1" role="dialog">' +
                    '<div class= "modal-dialog  modal-dialog-centered modal-lg" role = "document" >' +
                        '<div class="modal-content">' +
                            '<div class="modal-header">' +
                                '<h5 class="modal-title" style="color:#ff8405">' + modalTitle + '</h5>' +
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                    '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                            '</div>' +
                            '<div class="modal-body">' + annBody + '</div>' +
                            '<div class="modal-footer">' +
                                '<button type="button" class="preventAnn btn btn-secondary" data-dismiss="modal">關閉並不再提醒</button>' +
                                '<button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>' +
                            '</div>' +
                        '</div>' +
                    '</div >' +
                '</div >');
            $('#annModal').modal('show');
            $('#annModal .preventAnn').click(function (e) {
                window.localStorage.setItem(annKey, true);
            });
        }
    };

    _renderMenu = function (data) { 
        var i = 0;
        var sortMenu = {};
        var render = "";
        var iconCollpase = '<i class="collapse-icon fas fa-dot-circle"></i>';
        //console.log(data)
        //編輯資料，先將資料排序處理過，以便後續操作dom
        for (i = 0; i < data.length; i++) {
            if (data[i].MenuLevel === 1) {
                data[i].children = {};
                sortMenu[data[i].MenuCode] = data[i];
            }
        }

        for (i = 0; i < data.length; i++) {
            if (data[i].MenuLevel === 2) {
                if (sortMenu[data[i].ParentMenu] === undefined) {
                    console.log("子選單:" + data[i].MenuCode + ",尚未找到上層選單:" + data[i].ParentMenu);
                } else {
                    sortMenu[data[i].ParentMenu].children[data[i].MenuCode] = data[i];
                }
            }
        }


       
        
        //render menu dom
        for (var _f in sortMenu) {
            let _pt = sortMenu[_f];
            let _active = "";
            let _class_a = "";
            let _ch = _pt.children;
            
            if (Object.keys(_ch).length !== 0) {
                render += '<li class="' + _active + '"><a  id="menu_' + _pt.MenuCode + '" class="' + _class_a + ' hasCollapse" data-menucode="' + _pt.MenuCode + '" data-menuname="' + _pt.MenuName  +'" data-toggle="collapse" data-target="#collapse_' + _pt.MenuCode + '" >' + _pt.MenuName + iconCollpase + '</a>';
            } else {
                render += '<li class="' + _active + '"><a id="menu_' + _pt.MenuCode + '" class="' + _class_a + '" data-menucode="' + _pt.MenuCode + ',' + _pt.RightsType + '" data-menuname="' + _pt.MenuName +'">' + _pt.MenuName + '</a>';
            }

            
            if (Object.keys(_ch).length !== 0) {
                render += '<ul id="collapse_' + _pt.MenuCode + '"  class="secondmenu collapse ' + _showMenu(_pt.MenuCode) +'">';
                for (var _s in _ch) {
                    render += '<li><a id="menu_' + _ch[_s].MenuCode + '" data-menucode="' + _ch[_s].MenuCode + ',' + _ch[_s].RightsType + '" data-menuname="' + _ch[_s].MenuName+'">' + _ch[_s].MenuName + '</a></li>';
                }
                render += '</ul>';
            }
            render += '</li>';
        }
		return '<div id="left-menu-toggle"><i id="menu-close-btn" class="fas fa-times-circle p-2"></i><i id="menu-open-btn" class="fas fa-list p-2"></i></div>' +
                '<div id="logoArea" class="text-center">' +
                    '<div class="flip-card">'+
                        '<div class="flip-card-inner">' +
                            '<div class="pt-4 pl-5 pr-5 flip-card-front">' +
                                '<img id="hib-logo" class="w-100 " src="./images/logo2.svg" alt="logo">' +
                                '<p id="logo-sub">HIB 168 2.0</p>' +
                            '</div>' +
                            '<div class="p-2  flip-card-back">' +
                                '<img id="hib-logo" class="w-100" src="./images/Project333.svg" alt="logo">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +          
                '</div>' +
                    '<ul id="menu-list">' +
                    render +
                '</ul>';
    };

    const _showMenu = id => {
        let nowid = String(localStorage.getItem("show_current_menu"))[0];
        if (id == nowid) {
            localStorage.setItem("show_current_menu", "");
            return "show"
        } else {
            return ""
        }
        
    }

    _MenuClick = function (FuncProp) {
        var words = FuncProp.split(',');
        var MenuCode = words[0];
        var RightsType = words[1];
    
        if (RightsType !== "" && RightsType !== undefined)
        {   //RightsType若空白就是有子menu功能的
            $.ajax({
                url: '../Ashx/GoToPage.ashx',
                data: { MenuCode: MenuCode, RightsType: RightsType},
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.Result !== 'OK') {
                        if (data.Result === 'timeout') {
                            alert('登入逾期！請重新登入');
                            document.location.href = "../Html/Login.html";
                        }
                        else {
                            alert(data.Result);
                        }
                    }
                    else {
                        if (RightsType === "zsystem") {
                            //心統直播
                            var zsystem = "../Ashx/GoOtherSite.ashx?SiteName=" + RightsType + "&KEY=" + data.AesKey + "&Position=" + data.Position;
                            if (!window.open(zsystem)) {
                                document.location.href = zsystem;
                            }
                        } else {
                            var newURL = data.URL;
                            if (newURL !== "") {
                                if (data.open === '_blank') {
                                    if (!window.open(newURL)) {
                                        document.location.href = newURL;
                                    }
                                }
                                else {
                                    const _hash = newURL.match(/\?/i) ? "&hash=" + urlHash : "?" + urlHash;
                                    document.location.href = newURL + _hash ;
                                }
                            }
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    alert('GoToPage服務失敗！');
                }
            });

        }
      
    };
    
    _timeoutTimer = function (lastLoginTime) {
        //登入時間
        const _t = lastLoginTime;
        const lDate = _t.split(" ")[0];
        const lTime = _t.split(" ")[2];
        const timestamp =new Date(
            lDate.split("/")[0],
            lDate.split("/")[1],
            lDate.split("/")[2],
            lTime.split(":")[0],
            lTime.split(":")[1],
            lTime.split(":")[2]
        ).getTime();
        const timeout = new Date(parseInt(timestamp));
        document.querySelector("#loginTime").innerHTML = lastLoginTime;

        //timeout剩餘時間
        const my60 = Date.now() + (60000 * 60);
        document.querySelector("#timeout").innerHTML = "60分00秒" ;

        const ct = setInterval(() => {
            if (my60 - Date.now() > 0) {
                const _d = new Date(my60 - Date.now());
                if (_d.getMinutes() > 0) {
                    document.querySelector("#timeout").innerHTML = _d.getMinutes() + "分" + _d.getSeconds() + "秒";

                } else {
                    document.querySelector("#timeout").innerHTML = _d.getSeconds() + "秒";
                }
            } else {
                clearInterval(ct);
                alert("您已經尚未操作一段時間，請重新登入。");
                location.href = "./Login.html";
            }
        }, 500);
    };


    /*20210825新增，公用上傳器物件 */
    HIB168.prototype.setUploadTMP = function () {
        let _modal = document.createElement("div");
        let uploadMyFileBtn;
        let base64Data;
        let sender;        
        const _toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        
        this.open = () => {
            $('#HibUploadModal').modal("show");
        }

        this.setSender = senderObject => {
            sender = senderObject
        }
                
        _modal.innerHTML =  '<div id="HibUploadModal" class="modal" tabindex = "-1" >' +
               '<div class="modal-dialog modal-dialog-centered">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<div class="header-message">'+
                                '<h5 class="modal-title">上傳檔案(僅限上傳一個<span id="uploadFileType" class="text-danger"></span>檔案)</h5>'+
                            '</div>'+
                            '<button type="button" class="close modalClose" data-dismiss="modal" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>'+
                        '<div class="modal-body align-items-center">'+
                            '<h5 class="mb-3">點選<span class="text-warning">選擇檔案</span>後<br />請選擇<span class="text-danger fileType"></span><br />確認後請點確認上傳</h5>'+
                            '<div class=" d-flex justify-content-center">'+
                                '<div class="custom-file">'+
                                    '<label class="custom-file-label" for="customFile">選擇檔案</label>'+
                                    '<input type="file" class="custom-file-input" id="customFile">'+
                                '</div>'+
                                    '<button id="uploadMyFile" type="button" class=" btn btn-primary"  data-dismiss="modal" disabled>確認上傳</button>'+
                                '</div>'+
                                '<p class="text-danger">單一檔案大小必須在10MB以內</p>'+
                            '</div>'+
                            '<div class="modal-footer justify-content-center">'+
                                '<button type="button" class=" btn btn-secondary" data-dismiss="modal">取消</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
            '</div>' +
            '<div id="prefileModal" class="modal" tabindex="-1">'+
                '<div class="modal-dialog modal-dialog-centered">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<div class="header-message">'+
                                '<h5 class="modal-title">重要訊息</h5>'+
                            '</div>'+
                            '<button type="button" class="close modalClose" data-dismiss="modal" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>'+
                        '<div class="modal-body d-flex justify-content-center align-items-center">'+
                            '<p class="message">是否確定上傳?<br />上傳後無法修改！</p>'+
                        '</div>'+
                        '<div class="modal-footer justify-content-center">'+
                            '<button type="button" class=" btn btn-secondary" data-dismiss="modal">取消</button>'+
                            '<button type="button" class=" btn btn-primary" data-dismiss="modal" id="confrimUploadFile">確定</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>' +
            '<div id="loadingModal" class="modal" tabindex="-1" data-backdrop="static">'+
                '<div class="modal-dialog modal-dialog-centered">'+
                    '<div class="modal-content">'+
                        '<div class="modal-body align-items-center">'+
                            '<div class=" d-flex justify-content-center">'+
                                '<div id="loadingSpinner" class="spinner-border text-primary" role="status">'+
                                    '<span class="sr-only">Loading...</span>'+
                                '</div>'+
                                '<h4 id="queneMessage">上傳中請稍後</h4>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        ;

        uploadMyFileBtn = _modal.querySelector("#uploadMyFile");

        //當_modal被插入到DOM tree的時後觸發
        _modal.addEventListener("DOMNodeInserted", () => {
            //當開啟的時候，清空裡面的資料
            $("HibUploadModal").on("shown.bs.modal", event => {
                console.log("fileModal show clear");
                $(".custom-file-label").html("選擇檔案");
                //customFile.value = "";
                uploadMyFileBtn.disabled = true;
            });
        })

        //選取檔案後的行為
        _modal.querySelector("#customFile").addEventListener("change", event => {
            console.log(event.target.files)
            if (event.target.value != "") {
                //取得base64的字串並記錄
                _toBase64(event.target.files[0]).then(file64 => {
                    base64Data = file64;
                    //開啟上傳按鈕
                    uploadMyFileBtn.disabled = false;
                    _modal.querySelector(".custom-file-label").innerHTML = event.target.files[0].name;
                });
            } else {
                uploadMyFileBtn.disabled = true;
                _modal.querySelector(".custom-file-label").innerHTML = "選擇檔案";
            }
        });

        //點選確定
        uploadMyFileBtn.addEventListener("click", event => {
            $('#prefileModal').modal("show");
            console.log(base64Data)
        });

        //再次確認後上傳
        _modal.querySelector("#confrimUploadFile").addEventListener("click", event => {
            $('#loadingModal').modal("show");
            //模擬
            if (sender) {
                try {
                    let formData = new FormData();
                    if (sender.requestType) {
                        formData.append("RequestType", sender.requestType);
                    }
                    formData.append("Base64Data", base64Data);
                    if (sender.formData) {
                        for (const key in sender.formData) {
                            formData.append(key, sender.formData[key]);
                        }
                    }
                    fetch(sender.url, {
                        method: 'POST',
                        body: formData
                    }).then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            console.log("hib168 連線失敗");
                            return null;
                        }
                    }).then(data => {
                        console.log(data);
                        _modal.querySelector("#loadingSpinner").style.display = "none";
                        _modal.querySelector("#queneMessage").innerHTML = "上傳完成!";
                        
                        setTimeout(() => {
                            location.reload();
                        }, 1000)
                        
                    })
                } catch (e) {
                    console.log("HIBUploadTMP 失敗：" + e.error)
                    _modal.querySelector("#queneMessage").innerHTML = "上傳失敗，請聯絡管理者。";
                }
            } else {
                console.log("sender 尚未設定")
            } 
        });

        document.querySelector("body").append(_modal);
        
        return this;
    }

  

    //_GoToPage = function (SiteName) {
    //    console.log("_GoToPage");  
    //};
}


class HibLocalStorage{
    constructor(pageID) {
        this.pageID = pageID;
        this.LSdata = {};
        if (window.sessionStorage.getItem(pageID) !== null) {
            this.LSdata = JSON.parse(window.sessionStorage.getItem(pageID));
        } else {
            window.sessionStorage.setItem(this.pageID, JSON.stringify(this.LSdata));
        }
    }
    getValue(key){
        for (let item in this.LSdata) {
            //console.log(item, key);
            if (item === key) {
                return this.LSdata[item];
            }
        }
        console.log("local storage[" + this.pageID + "]：並沒有搜尋到" + key + "的資料，請使用setValue新增。", this.LSdata);
        return null;
    }

    setValue(key, value){
        this.LSdata[key] = value;
        window.sessionStorage.setItem(this.pageID, JSON.stringify(this.LSdata));
        console.log("local storage[" + this.pageID + "]：新增" + key + "資料完成。", this.LSdata);
    }
    
}