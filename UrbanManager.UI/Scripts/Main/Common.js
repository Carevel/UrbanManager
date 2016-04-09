var cWin;
var loadi;
//获取整个页面的值
function getPageValue() {
    var postData = {};
    $("input").each(function (k, v) {
        var type = $(v).attr("type");
        switch (type) {
            case "checkbox":
                if ($(v).attr("id") != null && $(v).attr("id") != "") {
                    postData[$(v).attr("id")] = $(v)[0].checked;
                }
                break;
            case "radio":
                if ($(v).attr("id") != null && $(v).attr("id") != "") {
                    postData[$(v).attr("id")] = $(v)[0].checked;
                }
                break;
            default: if ($(v).attr("id") != null && $(v).attr("id") != "") {
                postData[$(v).attr("id")] = $(v).val();
                break;
            }
        }
    });
    $("textarea").each(function (k, v) {
        postData[$(v).attr("id")] = $(v).val();
    });
    $("select").each(function (k, v) {
        if ($(v).attr("id") != null && $(v).attr("id") != "") {
            postData[$(v).attr("id")] = $(v).val();
        }
    });
    return postData;
}
//右键惯用语
function GetMouseclick(ID) {
    if (event.button == 2)
        handle_mouseclick(ID);
}
//获取指定Id下面的值
function getElementItemValue(ViewId) {

    var postData = {};
    $("#" + ViewId).find("input").each(function (k, v) {
        var type = $(v).attr("type");
        switch (type) {
            case "checkbox":
                if ($(v).attr("id") != null && $(v).attr("id") != "") {
                    postData[$(v).attr("id")] = $(v)[0].checked;
                }
                break;
            case "radio":
                if ($(v).attr("id") != null && $(v).attr("id") != "") {
                    postData[$(v).attr("id")] = $(v)[0].checked;
                }
                break;
            default: if ($(v).attr("id") != null && $(v).attr("id") != "") {
                postData[$(v).attr("id")] = $(v).val();
                break;
            }
        }
    });
    $("#" + ViewId).find("textarea").each(function (k, v) {
        postData[$(v).attr("id")] = $(v).val();
    });
    $("#" + ViewId).find("select").each(function (k, v) {
        if ($(v).attr("id") != null && $(v).attr("id") != "") {
            postData[$(v).attr("id")] = $(v).val();
        }
    });

    return postData;
}
//设置指定Id下元素为ReadyOnly
function setElementItemReadyOnly(ViewId) {

    $("#" + ViewId).find("input").each(function (k, v) {
        var type = $(v).attr("type");
        switch (type) {
            case "checkbox":
                $(v).prop("disabled", true);
                break;
            case "radio":
                $(v).prop("disabled", true);
                break;
            default:
                $(v).prop("readonly", true);
                break;
        }
    });
    $("#" + ViewId).find("textarea").each(function (k, v) {
        $(v).prop("readonly", true);
    });
    $("#" + ViewId).find("select").each(function (k, v) {
        $(v).prop("disabled", true);
    });
}



/*菜单转向功能页面*/
function GoToFunctionPage(sURL) {
    var starIndex = sURL.lastIndexOf('/');
    var endIndex = sURL.lastIndexOf('?');
    
   // window.parent.dispose();
     
    var urlName = sURL.substring(starIndex + 1, endIndex);
    
    //add by wenhao 热线平台（浦东的环境热线、奉贤的城建热线）的菜单都通过base64加密方式传递用户UserID，进行打开链接
    if (urlName == "LoginPage.aspx") {
        //获取当前登录的用户账号
        var _Index = sURL.lastIndexOf('=');
        var _Length = sURL.length;
        var UID = sURL.substring(_Index + 1, _Length + 1);

        var _CurrentDate = new Date();
        var chkTime = GetTime(_CurrentDate);
        var chkStr = base64encode(base64encode(UID).replace('=', '').replace('=', '').replace('=', '')).replace('=', '').replace('=', '').replace('=', '')
               + base64encode(base64encode(chkTime).replace('=', '').replace('=', '').replace('=', '')).replace('=', '').replace('=', '').replace('=', '')

        //fullscreen=yes 设置满屏显示
        var url = sURL + "&CHKTime=" + chkTime + "&CHKStr=" + chkStr;
        //newWindow = window.open(url,'CallCenterEx','toolBar=no, menubar=no, status=no,resizable=yes,scrollbars=yes,height=\'screen.availHeight\',width=\'screen.availWidth\',top=0,left=0');
        newWindow = window.open(url, 'CallCenterEx', 'toolBar=no, menubar=no, status=no,resizable=yes,left=0,top=0,width=' + (screen.availWidth - 10) + ',height=' + (screen.availHeight - 30) + ',scrollbars=no');
        newWindow.focus();
    } else {
        //CloseLeftMenuSwitch();
        //LoadWaiting(ifrm_Module, sapppath)
        //var _CurrentDate = new Date();
        var random = guidGenerator();
      //  parent.PclearIframe();
        parent.ifrm_Module.location = sURL + "&random=" + random;
        //	alert(ifrm_Module.location);
    }
    
}

function clearIframe(id) {
    var el = document.getElementById(id),
        iframe = el.contentWindow;
    if (el) {
        el.src = 'about:blank';
        try {
            iframe.document.write('');
            iframe.document.clear();
        } catch (e) { };
        //以上可以清除大部分的内存和文档节点记录数了
        //最后删除掉这个 iframe 就哦咧。
        //document.body.removeChild(el);
    }
}

/*菜单转向功能页面*/
function BackToTaskListPage(btnid) {
    var random = guidGenerator();
    //解锁
    $.post(
     ("../../Common/Unlock"),
     { random: random },
     function (data) {
         var url = $("#" + btnid + "_ReturnUrl").val();
         if (url == "") {
             url = $("#DestinationURL").val();
         }
         window.location.href = url;
     });
}

/*显示新到消息*/
function ShowPersonalMessageList(count) {
    if (count > 0 && (cWin == null || cWin.closed)) {
        var h = screen.availHeight - 120;
        var w = screen.availWidth - 100;
        cWin = window.open("../SystemForm_flat/SiteMessage/MessageViewNew.aspx?flag=0", '查看信息', 'resizable=no,status=no,toolbar=no,menubar=no,location=no,left=50,top=50,height=' + h + ',width=' + w);
        parent.refresh.location = "refresh.aspx?ss=" + Math.random(1000000);
        if (document.getElementById('PcPoPmarket') == null) return;
        $("#PcPoPmarket").hide(1000);
    }
}

/*显示个人收件箱*/
function ShowMessageList(userid) {
        var h = screen.availHeight - 120;
        var w = screen.availWidth - 100;
        cWin = window.open("../SystemForm_flat/SITEMESSAGE/MESSAGELIST.ASPX?TYPE=0&Userid=" + userid, '查看信息', 'resizable=no,status=no,toolbar=no,menubar=no,location=no,left=50,top=50,height=' + h + ',width=' + w);
        parent.refresh.location = "refresh.aspx?ss=" + Math.random(1000000);
        if (document.getElementById('PcPoPmarket') == null) return;
        $("#PcPoPmarket").hide(1000);
}

/*显示特定消息明细*/
function ShowPersonalMessageContent(ID, flag, ObjID, type) {
    newWindow = window.open("../../SiteMessage/MessageView.aspx?ID=" + ID + "&flag=" + flag + "&objid=" + ObjID + "&type=" + type, '查看信息', 'resizable=no,status=no,toolbar=no,menubar=no,location=no,left=450,top=250,height=350,width=460');
    newWindow.focus();
    parent.refresh.location = "../refresh.aspx?ss=" + Math.random(1000000);

    if (document.all.item(ObjID).innerHTML == "<IMG src=\"../images/noread.gif\">") {
        document.all.item(ObjID).innerHTML = "<img src='../images/haveread.gif'>";
        document.all.item(ObjID).title = "已读";
    }
}

//打开图片比较
function OpenCompareImg(taskID) {
    var tmpDate = new Date();
    //window.showModelessDialog("CompareImg.htm?tmp=" + tmpDate.toString(), taskID, " help: no; resizable: no; status: no;dialogWidth:700px;dialogHeight:630px");
    window.open("../../CaseOperate_flat/FileToHotlineFilter.aspx?TaskID=" + taskID + "&tmp=" + tmpDate.toString(), "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=200,top=0,width=668,height=700");
}
//展示流程图
function DisplayFlowChart(taskId) {
    var w = window.open('../../CaseOperate/Flow.aspx?taskId=' + taskId, 'myNewDetails', 'toolBar=no, menubar=no, status=no,resizable=no,left=5,top=30,width=1004,height=650,scrollbars=no');
    w.focus();
}
//弹出处理反馈页面
function ShowFeedMessage(strTaskID) {
    var h =200;
    var w = 550;
    var sh = (document.body.clientHeight - h) / 2;
    var sw = (document.body.clientWidth  - w)/2;
    var openWindow = window.open('../../CaseOperate_flat/FeedMessage.aspx?taskid=' + strTaskID, 'newDetails8', 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left='+sw+',top='+sh+',width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}

//弹出详细信息
function DisplayInfo(strTaskID) {

    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    var openWindow = window.open('../../CaseOperate_flat/ParticularDisplayInfo.aspx?taskid=' + strTaskID, strTaskID, 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}
//弹出案件详细信息
function DisplayInfo2(strTaskID) {
    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    var openWindow = window.open('../CaseOperate_flat/ParticularDisplayInfo.aspx?taskid=' + strTaskID, strTaskID + '_task', 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}
//弹出案件修改
function CaseUpdate(strTaskID) {
    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    var openWindow = window.open('../XinZeng/UpdateBasicInfo.aspx?taskid=' + strTaskID, strTaskID, 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}
//弹出案件修改
function CaseUpdate2(strTaskID) {
    var h = screen.availHeight - 60;
    var w = screen.availWidth - 100;
    var openWindow = window.open('../CaseOperate_flat/XinZeng/CaseUpdate.aspx?taskid=' + strTaskID, strTaskID, 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}
//重复案卷
function similiarCase(id, taskid, strCallNumber, d0090) {
    var url = "";
    //普陀差异化
    if (d0090 == "1")
        url = "../../Common/GetOSSimilarTaskNum?random=" + Math.random();
    else
        url = "../../Common/GetSimilarTaskNum?random=" + Math.random();
    $.post(url, { taskid: taskid, strCallNumber: strCallNumber },
        function (data) {
            $("#" + id).html("重复案件(" + data + ")");
        });
}

function selectevent(id) {
    //document.getElementById('Hidden_Index').value = objItem.rowIndex;
    var _Currentdate = new Date();
    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    window.open('../ParticularDisplayInfoLink.aspx?Dt=' + _Currentdate.toString() + '&taskid=' + id, id, 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
   // openWindow.focus();
    //window.open("../../GIS/FullScreenGisPage.aspx?taskid=" + id, "newGisByTaskid", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=200,top=100,width=700px,height=600px");
}

//弹出重复案件页面
function OpenSimilarCase(taskid) {
    var ran = Math.random() * 1000;
    //普陀:受理、立案、派遣环节关联查询功能 1:普陀区 0:非普陀区 
    //var statues = document.getElementById("hidPTStatus").value;
    var statues = $("#hidPTStatus").val();
    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    if (statues == "1") { //判断是否是普陀区
        window.open("../AllOSSimilarCase.aspx?taskid=" + taskid + "&CaseStatus=PreCreate&random=" + ran, "windowsimilar", "toolBar=no, menubar=no, status=no,resizable=no,width=" + w + ",height=" + h + ",scrollbars=yes");
        //win.focus();
    } else {
        window.open("../AllSimilarCase.aspx?taskid=" + taskid + "&CaseStatus=PreCreate&random=" + ran, "windowsimilar", "toolBar=no, menubar=no, status=no,resizable=no,width=" + w + ",height=" + h + ",scrollbars=yes");
       // win.focus();
    }

}
function ShowSimilarDetailOP(strTaskID, d0090) {
    var w = screen.availWidth - 150;
    var h = screen.availHeight - 300;
    var ran = Math.random() * 1000;

    var statues = d0090;
    if (statues == "1") { //判断是否是普陀区
        var win = window.open('../OSSimilarCaseInfoInfo.aspx?taskId=' + strTaskID + '&random=' + ran, '_blank', 'toolBar=no, menubar=no, status=no,resizable=no,top=250,width=' + w + ',height=' + h + ',scrollbars=yes');
        //window.parent.openMap["OSSimilarCaseInfoInfo"] = win;
    } else {
        var win = window.open('../SimilarCaseInfoInfo.aspx?taskId=' + strTaskID + '&random=' + ran, '_blank', 'toolBar=no, menubar=no, status=no,resizable=no,top=250,width=' + w + ',height=' + h + ',scrollbars=yes');
        //window.parent.openMap["OSSimilarCaseInfoInfo"] = win;
    }
}
//弹出案件详细信息
function DisplayDetail(strTaskID) {
    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    window.open('ParticularDisplayInfo.aspx?taskid=' + strTaskID, strTaskID, 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
}

function ShowDetail(taskId) {
    event.cancelBubble = true;
    var objHolder = $("#divSimilarCaseHolder");

    var left = event.clientX - 250;
    var top = event.clientY;
    var random = guidGenerator();
    $.post(
     ("../../TaskList/GetSimilarCase"),
     { TaskId: taskId, random: random },
     function (data) {
         objHolder[0].innerHTML = data;
         objHolder.css("left", left);
         objHolder.css("top", top);
         ShowIt();
         senfenoclick("similarTable", "#e0f3ff", "#fff", "#fbf0bc");
     });
}
function ShowIt() {
    var objHolder = $("#divSimilarCaseHolder");
    objHolder[0].style.display = "block";
    objHolder[0].style.width = "720px;";
}
function HandleBodyClick() {
    HideDetail();
}
function HideDetail() {
    try {
        $("#divSimilarCaseHolder")[0].style.display = "none";
    } catch (e) { }
}
//上传信息added by caochangjiang 2014-7-16
function OpenFileMediaLoad(taskid, CaseStatus, Category, userCardid, deptCode, categoryId) {
    var ran = Math.random() * 1000;
    var url = "../MediaFileUploadFrame.aspx?taskid=" + taskid + "&userCardId=" + userCardid + "&deptCode=" + deptCode + "&CaseStatus=" + CaseStatus + "&Category=" + encodeURI(Category) + "&ran=" + ran + "&categoryId=" + categoryId
    var openWindow = window.open(url, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=50,top=50,width=680,height=660");
    openWindow.focus();

}

//附件上传
function OpenFileLoad(url, taskid, Category) {

    var h = screen.availHeight - 200;
    var w = screen.availWidth - 180;
    var ran = Math.random() * 1000;
    url = url + '?taskId=' + taskid + '&Category=' + Category + '&ran=' + ran
    var openWindow = window.open(url, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=90,top=100,width="+w+",height="+h);
    openWindow.focus();
}
//附件上传按钮点击事件
function OpenFileLoad_V2(url, taskid, Category, userCardid, deptCode, categoryId) {
    var h = screen.availHeight - 200;
    var w = screen.availWidth - 180;
    var ran = Math.random() * 1000;
    url = url + '?taskid=' + taskid + '&userCardId=' + userCardid + '&deptCode=' + deptCode + '&Category=' + encodeURI(Category) + '&ran=' + ran + '&categoryId=' + categoryId;
    var openWindow = window.open(url, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=90,top=100,width=" + w + ",height=" + h);
    openWindow.focus();
}
//附件上传
function OpenMessageFileLoad(url, MessageCode) {
    var h = screen.availHeight - 200;
    var w = screen.availWidth - 180;
    var ran = Math.random() * 1000;
    url = url + '?MessageCode=' + MessageCode + '&ran=' + ran
    var openWindow = window.open(url, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=90,top=100,width=" + w + ",height=" + h);
    openWindow.focus();

}
function showPlayList(taskId) {
    var ran = Math.random() * 1000;
    window.open('DisplayInfoList.aspx?taskId=' + taskId + '&random=' + ran, '_blank', 'toolBar=no, menubar=no, status=no,resizable=no,top=250,width=400,height=300', 'height=100,scrollbars=yes');
}
//弹出打印页面
function PrintCase(strTaskID, approach, InfoSourceid) {
    var h = screen.availHeight - 240;
    var w = screen.availWidth - 200;
    var openWindow = window.open('../Misc/PrintCaseLinkNew.aspx?TaskID=' + strTaskID + '&approach=' + approach + '&InfoSourceid=' + InfoSourceid, strTaskID + '_print', 'width=' + w + ',height=' + h + ',top=100,left=120,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no');
    openWindow.focus();
}

//操作页面中弹出打印页面
function PrintCaseOperate(strTaskID, approach, InfoSourceid) {
    var h = screen.availHeight - 240;
    var w = screen.availWidth - 200;
    var openWindow = window.open('../../Misc/PrintCaseLinkNew.aspx?TaskID=' + strTaskID + '&approach=' + approach + '&InfoSourceid=' + InfoSourceid, strTaskID + '_print', 'width=' + w + ',height=' + h + ',top=100,left=120,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no');
    openWindow.focus();
}
//加载tootip
function InitTooltips() {
    var options = {
    }
    //$('*[title]').tooltip(options);
    $('*[title]').poshytip();
}

function InitElementItemTooltips(ViewId) {
    var options = {
    }
    $("#" + ViewId).find('*[title]').poshytip();
}


//各行变色 （tableid,单行色，双行色，鼠标掠过色，点击色）
function senfe(o, a, b, c, d) {
    var t = document.getElementById(o).getElementsByTagName("tr");
    for (var i = 1; i < t.length; i++) {
        t[i].style.backgroundColor = (t[i].sectionRowIndex % 2 == 0) ? a : b;
        t[i].onclick = function () {
            if (this.x != "1") {
                this.x = "1";
                this.style.backgroundColor = d;
            } else {
                this.x = "0";
                this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
            }
        }
        t[i].onmouseover = function () {
            if (this.x != "1") this.style.backgroundColor = c;
        }
        t[i].onmouseout = function () {
            if (this.x != "1") this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
        }
    }
}


//各行变色 （tableid,单行色，双行色，鼠标掠过色）
function senfenoclick(o, a, b, c) {
    var _t = document.getElementById("" + o + "");
    if (_t != null) {
        var t = document.getElementById("" + o + "").getElementsByTagName("tr");
        for (var i = 1; i < t.length; i++) {
            t[i].style.backgroundColor = (t[i].sectionRowIndex % 2 == 0) ? a : b;
            t[i].onmouseover = function () {
                if (this.x != "1") this.style.backgroundColor = c;
            }
            t[i].onmouseout = function () {
                if (this.x != "1") this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
            }
        }
    }

}

//各行变色 （tableid,单行色，双行色）
function senfeonly(o, a, b) {
    var _t = document.getElementById("" + o + "");
    if (_t != null) {
        var t = document.getElementById("" + o + "").getElementsByTagName("tr");
        for (var i = 1; i < t.length; i++) {
            t[i].style.backgroundColor = (t[i].sectionRowIndex % 2 == 0) ? a : b;
        }
    }

}



function SetSelect(selectid, v) {
    if (v == "") {
        $("#" + selectid).get(0).selectedIndex = 0;
    }
    else {
        $("#" + selectid).val(v);
    }
}
function SetCheckbox(selectid, v) {
    if (v == "True" || v == "true" || v == "1") {
        $("#" + selectid).prop('checked', true);
    }
    else {
        $("#" + selectid).prop('checked', false);
    }
}
//布局初始化(所有操作页面一致的)
function caseOperateLayout() {

    var tabsl_gisheight = $("#tabsl_gis").height();
    $("#Operateleft").height(tabsl_gisheight - 71);
    $("#Operateright").height(tabsl_gisheight - 71);
    $("#GisWindow").css("height", (tabsl_gisheight - 71) + "px");
    InitElementItemTooltips("Operateleft");
    $("#Operateleft").niceScroll({
        cursorcolor: "#418bca",
        cursoropacitymax: 1,
        touchbehavior: false,
        cursorwidth: "6px",
        cursorborder: "0",
        cursorborderradius: "4px",
        hidecursordelay: 3000
    });
    InitElementItemTooltips("Operateright");
    $("#Operateright").niceScroll({
        cursorcolor: "#418bca",
        cursoropacitymax: 1,
        touchbehavior: false,
        cursorwidth: "6px",
        cursorborder: "0",
        cursorborderradius: "4px",
        hidecursordelay: 3000
    });
    $("#CaseProgressdiv").find("iframe").height($("#CaseProgressdiv").height() - 10);
}
//获取根目录
function getRootPath() {
    //获取当前网址
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
//操作页面选项切换
function GisWindDisplay(ClickType) {
    if (ClickType == "1") {
        $("#GridWindow").show();
        $("#GidCon").hide();
        $("#SolveWindow").hide();
    }
    else if (ClickType == "3") {
        $("#SolveWindow").show();
        $("#GridWindow").hide();
        $("#GidCon").hide();
    }
    else {
        $("#GridWindow").hide();
        $("#GidCon").show();
        $("#SolveWindow").hide();
    }
}

/*
 * Poshy Tip jQuery plugin v1.1
 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
 * Copyright 2010-2011, Vasil Dinkov, http://vadikom.com/
 */

(function ($) {

    var tips = [],
		reBgImage = /^url\(["']?([^"'\)]*)["']?\);?$/i,
		rePNG = /\.png$/i,
		ie6 = false;

    // make sure the tips' position is updated on resize
    function handleWindowResize() {
        $.each(tips, function () {
            this.refresh(true);
        });
    }
    $(window).resize(handleWindowResize);

    $.Poshytip = function (elm, options) {
        this.$elm = $(elm);
        this.opts = $.extend({}, $.fn.poshytip.defaults, options);
        this.$tip = $(['<div class="', this.opts.className, '">',
				'<div class="tip-inner tip-bg-image"></div>',
				'<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>',
			'</div>'].join('')).appendTo(document.body);
        this.$arrow = this.$tip.find('div.tip-arrow');
        this.$inner = this.$tip.find('div.tip-inner');
        this.disabled = false;
        this.content = null;
        this.init();
    };

    $.Poshytip.prototype = {
        init: function () {
            tips.push(this);

            // save the original title and a reference to the Poshytip object
            var title = this.$elm.attr('title');
            this.$elm.data('title.poshytip', title !== undefined ? title : null)
				.data('poshytip', this);

            // hook element events
            if (this.opts.showOn != 'none') {
                this.$elm.bind({
                    'mouseenter.poshytip': $.proxy(this.mouseenter, this),
                    'mouseleave.poshytip': $.proxy(this.mouseleave, this)
                });
                switch (this.opts.showOn) {
                    case 'hover':
                        if (this.opts.alignTo == 'cursor')
                            this.$elm.bind('mousemove.poshytip', $.proxy(this.mousemove, this));
                        if (this.opts.allowTipHover)
                            this.$tip.hover($.proxy(this.clearTimeouts, this), $.proxy(this.mouseleave, this));
                        break;
                    case 'focus':
                        this.$elm.bind({
                            'focus.poshytip': $.proxy(this.show, this),
                            'blur.poshytip': $.proxy(this.hide, this)
                        });
                        break;
                }
            }
        },
        mouseenter: function (e) {
            if (this.disabled)
                return true;

            this.$elm.attr('title', '');
            if (this.opts.showOn == 'focus')
                return true;

            this.clearTimeouts();
            this.showTimeout = setTimeout($.proxy(this.show, this), this.opts.showTimeout);
        },
        mouseleave: function (e) {
            if (this.disabled || this.asyncAnimating && (this.$tip[0] === e.relatedTarget || jQuery.contains(this.$tip[0], e.relatedTarget)))
                return true;

            var title = this.$elm.data('title.poshytip');
            if (title !== null)
                this.$elm.attr('title', title);
            if (this.opts.showOn == 'focus')
                return true;

            this.clearTimeouts();
            this.hideTimeout = setTimeout($.proxy(this.hide, this), this.opts.hideTimeout);
        },
        mousemove: function (e) {
            if (this.disabled)
                return true;

            this.eventX = e.pageX;
            this.eventY = e.pageY;
            if (this.opts.followCursor && this.$tip.data('active')) {
                this.calcPos();
                this.$tip.css({ left: this.pos.l, top: this.pos.t });
                if (this.pos.arrow)
                    this.$arrow[0].className = 'tip-arrow tip-arrow-' + this.pos.arrow;
            }
        },
        show: function () {
            if (this.disabled || this.$tip.data('active'))
                return;

            this.reset();
            this.update();
            this.display();
            if (this.opts.timeOnScreen)
                setTimeout($.proxy(this.hide, this), this.opts.timeOnScreen);
        },
        hide: function () {
            if (this.disabled || !this.$tip.data('active'))
                return;

            this.display(true);
        },
        reset: function () {
            this.$tip.queue([]).detach().css('visibility', 'hidden').data('active', false);
            this.$inner.find('*').poshytip('hide');
            if (this.opts.fade)
                this.$tip.css('opacity', this.opacity);
            this.$arrow[0].className = 'tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left';
            this.asyncAnimating = false;
        },
        update: function (content, dontOverwriteOption) {
            if (this.disabled)
                return;

            var async = content !== undefined;
            if (async) {
                if (!dontOverwriteOption)
                    this.opts.content = content;
                if (!this.$tip.data('active'))
                    return;
            } else {
                content = this.opts.content;
            }

            // update content only if it has been changed since last time
            var self = this,
				newContent = typeof content == 'function' ?
					content.call(this.$elm[0], function (newContent) {
					    self.update(newContent);
					}) :
					content == '[title]' ? this.$elm.data('title.poshytip') : content;
            if (this.content !== newContent) {
                //this.$inner.empty().append('<input type="button" class="pin"/>' + newContent);
                this.$inner.empty().append(newContent);
                this.content = newContent;
            }

            this.refresh(async);
        },
        refresh: function (async) {
            if (this.disabled)
                return;

            if (async) {
                if (!this.$tip.data('active'))
                    return;
                // save current position as we will need to animate
                var currPos = { left: this.$tip.css('left'), top: this.$tip.css('top') };
            }

            // reset position to avoid text wrapping, etc.
            this.$tip.css({ left: 0, top: 0 }).appendTo(document.body);

            // save default opacity
            if (this.opacity === undefined)
                this.opacity = this.$tip.css('opacity');

            // check for images - this code is here (i.e. executed each time we show the tip and not on init) due to some browser inconsistencies
            var bgImage = this.$tip.css('background-image').match(reBgImage),
				arrow = this.$arrow.css('background-image').match(reBgImage);

            if (bgImage) {
                var bgImagePNG = rePNG.test(bgImage[1]);
                // fallback to background-color/padding/border in IE6 if a PNG is used
                if (ie6 && bgImagePNG) {
                    this.$tip.css('background-image', 'none');
                    this.$inner.css({ margin: 0, border: 0, padding: 0 });
                    bgImage = bgImagePNG = false;
                } else {
                    this.$tip.append(this.$inner);
                }
                // disable fade effect in IE due to Alpha filter + translucent PNG issue
                if (bgImagePNG && !$.support.opacity)
                    this.opts.fade = false;
            }
            // IE arrow fixes
            if (arrow && !$.support.opacity) {
                // disable arrow in IE6 if using a PNG
                if (ie6 && rePNG.test(arrow[1])) {
                    arrow = false;
                    this.$arrow.css('background-image', 'none');
                }
                // disable fade effect in IE due to Alpha filter + translucent PNG issue
                this.opts.fade = false;
            }

            var $table = this.$tip.find('table');
            if (ie6) {
                // fix min/max-width in IE6
                this.$tip[0].style.width = '';
                $table.width('auto').find('td').eq(3).width('auto');
                var tipW = this.$tip.width(),
					minW = parseInt(this.$tip.css('min-width')),
					maxW = parseInt(this.$tip.css('max-width'));
                if (!isNaN(minW) && tipW < minW)
                    tipW = minW;
                else if (!isNaN(maxW) && tipW > maxW)
                    tipW = maxW;
                this.$tip.add($table).width(tipW).eq(0).find('td').eq(3).width('100%');
            } else if ($table[0]) {
                // fix the table width if we are using a background image
                // IE9, FF4 use float numbers for width/height so use getComputedStyle for them to avoid text wrapping
                // for details look at: http://vadikom.com/dailies/offsetwidth-offsetheight-useless-in-ie9-firefox4/
                $table.width('auto').find('td').eq(3).width('auto').end().end().width(document.defaultView && document.defaultView.getComputedStyle && parseFloat(document.defaultView.getComputedStyle(this.$tip[0], null).width) || this.$tip.width()).find('td').eq(3).width('100%');
            }
            this.tipOuterW = this.$tip.outerWidth();
            this.tipOuterH = this.$tip.outerHeight();

            this.calcPos();

            // position and show the arrow image
            if (arrow && this.pos.arrow) {
                this.$arrow[0].className = 'tip-arrow tip-arrow-' + this.pos.arrow;
                this.$arrow.css('visibility', 'inherit');
            }

            if (async) {
                this.asyncAnimating = true;
                var self = this;
                this.$tip.css(currPos).animate({ left: this.pos.l, top: this.pos.t }, 200, function () { self.asyncAnimating = false; });
            } else {
                this.$tip.css({ left: this.pos.l, top: this.pos.t });
            }
        },
        display: function (hide) {
            var active = this.$tip.data('active');
            if (active && !hide || !active && hide)
                return;

            this.$tip.stop();
            if ((this.opts.slide && this.pos.arrow || this.opts.fade) && (hide && this.opts.hideAniDuration || !hide && this.opts.showAniDuration)) {
                var from = {}, to = {};
                // this.pos.arrow is only undefined when alignX == alignY == 'center' and we don't need to slide in that rare case
                if (this.opts.slide && this.pos.arrow) {
                    var prop, arr;
                    if (this.pos.arrow == 'bottom' || this.pos.arrow == 'top') {
                        prop = 'top';
                        arr = 'bottom';
                    } else {
                        prop = 'left';
                        arr = 'right';
                    }
                    var val = parseInt(this.$tip.css(prop));
                    from[prop] = val + (hide ? 0 : (this.pos.arrow == arr ? -this.opts.slideOffset : this.opts.slideOffset));
                    to[prop] = val + (hide ? (this.pos.arrow == arr ? this.opts.slideOffset : -this.opts.slideOffset) : 0) + 'px';
                }
                if (this.opts.fade) {
                    from.opacity = hide ? this.$tip.css('opacity') : 0;
                    to.opacity = hide ? 0 : this.opacity;
                }
                this.$tip.css(from).animate(to, this.opts[hide ? 'hideAniDuration' : 'showAniDuration']);
            }
            hide ? this.$tip.queue($.proxy(this.reset, this)) : this.$tip.css('visibility', 'inherit');
            this.$tip.data('active', !active);
        },
        disable: function () {
            this.reset();
            this.disabled = true;
        },
        enable: function () {
            this.disabled = false;
        },
        destroy: function () {
            this.reset();
            this.$tip.remove();
            delete this.$tip;
            this.content = null;
            this.$elm.unbind('.poshytip').removeData('title.poshytip').removeData('poshytip');
            tips.splice($.inArray(this, tips), 1);
        },
        clearTimeouts: function () {
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = 0;
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = 0;
            }
        },
        calcPos: function () {
            var pos = { l: 0, t: 0, arrow: '' },
				$win = $(window),
				win = {
				    l: $win.scrollLeft(),
				    t: $win.scrollTop(),
				    w: $win.width(),
				    h: $win.height()
				}, xL, xC, xR, yT, yC, yB;
            if (this.opts.alignTo == 'cursor') {
                xL = xC = xR = this.eventX;
                yT = yC = yB = this.eventY;
            } else { // this.opts.alignTo == 'target'
                var elmOffset = this.$elm.offset(),
					elm = {
					    l: elmOffset.left,
					    t: elmOffset.top,
					    w: this.$elm.outerWidth(),
					    h: this.$elm.outerHeight()
					};
                xL = elm.l + (this.opts.alignX != 'inner-right' ? 0 : elm.w);	// left edge
                xC = xL + Math.floor(elm.w / 2);				// h center
                xR = xL + (this.opts.alignX != 'inner-left' ? elm.w : 0);	// right edge
                yT = elm.t + (this.opts.alignY != 'inner-bottom' ? 0 : elm.h);	// top edge
                yC = yT + Math.floor(elm.h / 2);				// v center
                yB = yT + (this.opts.alignY != 'inner-top' ? elm.h : 0);	// bottom edge
            }

            // keep in viewport and calc arrow position
            switch (this.opts.alignX) {
                case 'right':
                case 'inner-left':
                    pos.l = xR + this.opts.offsetX;
                    if (pos.l + this.tipOuterW > win.l + win.w)
                        pos.l = win.l + win.w - this.tipOuterW;
                    if (this.opts.alignX == 'right' || this.opts.alignY == 'center')
                        pos.arrow = 'left';
                    break;
                case 'center':
                    pos.l = xC - Math.floor(this.tipOuterW / 2);
                    if (pos.l + this.tipOuterW > win.l + win.w)
                        pos.l = win.l + win.w - this.tipOuterW;
                    else if (pos.l < win.l)
                        pos.l = win.l;
                    break;
                default: // 'left' || 'inner-right'
                    pos.l = xL - this.tipOuterW - this.opts.offsetX;
                    if (pos.l < win.l)
                        pos.l = win.l;
                    if (this.opts.alignX == 'left' || this.opts.alignY == 'center')
                        pos.arrow = 'right';
            }
            switch (this.opts.alignY) {
                case 'bottom':
                case 'inner-top':
                    pos.t = yB + this.opts.offsetY;
                    // 'left' and 'right' need priority for 'target'
                    if (!pos.arrow || this.opts.alignTo == 'cursor')
                        pos.arrow = 'top';
                    if (pos.t + this.tipOuterH > win.t + win.h) {
                        pos.t = yT - this.tipOuterH - this.opts.offsetY;
                        if (pos.arrow == 'top')
                            pos.arrow = 'bottom';
                    }
                    break;
                case 'center':
                    pos.t = yC - Math.floor(this.tipOuterH / 2);
                    if (pos.t + this.tipOuterH > win.t + win.h)
                        pos.t = win.t + win.h - this.tipOuterH;
                    else if (pos.t < win.t)
                        pos.t = win.t;
                    break;
                default: // 'top' || 'inner-bottom'
                    pos.t = yT - this.tipOuterH - this.opts.offsetY;
                    // 'left' and 'right' need priority for 'target'
                    if (!pos.arrow || this.opts.alignTo == 'cursor')
                        pos.arrow = 'bottom';
                    if (pos.t < win.t) {
                        pos.t = yB + this.opts.offsetY;
                        if (pos.arrow == 'bottom')
                            pos.arrow = 'top';
                    }
            }
            this.pos = pos;
        }
    };

    $.fn.poshytip = function (options) {
        if (typeof options == 'string') {
            var args = arguments,
				method = options;
            Array.prototype.shift.call(args);
            // unhook live events if 'destroy' is called
            if (method == 'destroy')
                this.die('mouseenter.poshytip').die('focus.poshytip');
            return this.each(function () {
                var poshytip = $(this).data('poshytip');
                if (poshytip && poshytip[method])
                    poshytip[method].apply(poshytip, args);
            });
        }

        var opts = $.extend({}, $.fn.poshytip.defaults, options);

        // generate CSS for this tip class if not already generated
        if (!$('#poshytip-css-' + opts.className)[0])
            $(['<style id="poshytip-css-', opts.className, '" type="text/css">',
				'div.', opts.className, '{visibility:hidden;position:absolute;top:0;left:0;}',
				'div.', opts.className, ' table, div.', opts.className, ' td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;}',
				'div.', opts.className, ' td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:', opts.bgImageFrameSize, 'px;width:', opts.bgImageFrameSize, 'px;overflow:hidden;}',
				'div.', opts.className, ' td.tip-right{background-position:100% 0;}',
				'div.', opts.className, ' td.tip-bottom{background-position:100% 100%;}',
				'div.', opts.className, ' td.tip-left{background-position:0 100%;}',
				'div.', opts.className, ' div.tip-inner{background-position:-', opts.bgImageFrameSize, 'px -', opts.bgImageFrameSize, 'px;}',
				'div.', opts.className, ' div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}',
			'</style>'].join('')).appendTo('head');

        // check if we need to hook live events
        if (opts.liveEvents && opts.showOn != 'none') {
            var deadOpts = $.extend({}, opts, { liveEvents: false });
            switch (opts.showOn) {
                case 'hover':
                    this.live('mouseenter.poshytip', function () {
                        var $this = $(this);
                        if (!$this.data('poshytip'))
                            $this.poshytip(deadOpts).poshytip('mouseenter');
                    });
                    break;
                case 'focus':
                    this.live('focus.poshytip', function () {
                        var $this = $(this);
                        if (!$this.data('poshytip'))
                            $this.poshytip(deadOpts).poshytip('show');
                    });
                    break;
            }
            return this;
        }

        return this.each(function () {
            new $.Poshytip(this, opts);
        });
    }

    // default settings
    $.fn.poshytip.defaults = {
        content: '[title]',	// content to display ('[title]', 'string', element, function(updateCallback){...}, jQuery)
        className: 'tip-yellow',	// class for the tips
        bgImageFrameSize: 10,		// size in pixels for the background-image (if set in CSS) frame around the inner content of the tip
        showTimeout: 100,		// timeout before showing the tip (in milliseconds 1000 == 1 second)
        hideTimeout: 100,		// timeout before hiding the tip
        timeOnScreen: 0,		// timeout before automatically hiding the tip after showing it (set to > 0 in order to activate)
        showOn: 'hover',	// handler for showing the tip ('hover', 'focus', 'none') - use 'none' to trigger it manually
        liveEvents: false,		// use live events
        alignTo: 'cursor',	// align/position the tip relative to ('cursor', 'target')
        alignX: 'right',	// horizontal alignment for the tip relative to the mouse cursor or the target element
        // ('right', 'center', 'left', 'inner-left', 'inner-right') - 'inner-*' matter if alignTo:'target'
        alignY: 'top',		// vertical alignment for the tip relative to the mouse cursor or the target element
        // ('bottom', 'center', 'top', 'inner-bottom', 'inner-top') - 'inner-*' matter if alignTo:'target'
        offsetX: -22,		// offset X pixels from the default position - doesn't matter if alignX:'center'
        offsetY: 18,		// offset Y pixels from the default position - doesn't matter if alignY:'center'
        allowTipHover: true,		// allow hovering the tip without hiding it onmouseout of the target - matters only if showOn:'hover'
        followCursor: false,		// if the tip should follow the cursor - matters only if showOn:'hover' and alignTo:'cursor'
        fade: true,		// use fade animation
        slide: true,		// use slide animation
        slideOffset: 8,		// slide animation offset
        showAniDuration: 300,		// show animation duration - set to 0 if you don't want show animation
        hideAniDuration: 300		// hide animation duration - set to 0 if you don't want hide animation
    };

})(jQuery);

/*
 * Poshy Tip jQuery plugin v1.1
 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
 * Copyright 2010-2011, Vasil Dinkov, http://vadikom.com/
 */


//显示多媒体
function mediashow() {
    $("#Operateright").width(310);
    $("#Operateleft").css("margin-right", "310px");
    $("#mediaholddiv").show();
    $("#mediaholddiv").parent().css("margin-left", "29px");
    $("#mediaswitch").css("margin-left", "-29px");
    $("#mediaclose").show();
    $("#mediaopen").hide();
}
//隐藏多媒体
function mediahide() {
    $("#Operateright").width(29);
    $("#Operateleft").css("margin-right", "29px");
    $("#mediaholddiv").hide();
    $("#mediaholddiv").parent().css("margin-left", "29px");
    $("#mediaswitch").css("margin-left", "-29px");
    $("#mediaclose").hide();
    $("#mediaopen").show();

}


var oldAlert = window.alert;

window.alert = function (msg) {

    oldAlert(msg);

   typeof(layer) != "undefined" ?layer.close(loadi):"";
}


//添加到对比栏
function AddCompare(CompareText) {
    var random = guidGenerator();
    $.post(
         ("../Common/AddCompare"),
         { CompareText: CompareText, random: random },
         function (data) {
         });
}

//删除对比栏
function DeleteCompare(CompareText) {
    var random = guidGenerator();
    $.post(
         ("../Common/DeleteCompare"),
         { CompareText: CompareText, random: random },
         function (data) {
             location.replace(location.href);
         });
}

//获取是否带条件查询
function GetQueryStr() {
    var random = guidGenerator();
    $.post(
         ("../TaskList/GetQueryStr"),
         { random: random },
         function (data) {
             $("#QueryStr")[0].innerHTML = data;
         });
}


//生成guiid
function guidGenerator() {

    var S4 = function () {

        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

    };

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());

}
function getRootPath() {
    //获取当前网址
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
//打开责任网格维护页面
function OpenNewGridCodeInfo(GID) {
    $.layer({
        type: 2,
        title: [
            '责任网格',
            'background:#1a8dd5; height:30px; color:#fff; border:none;' //自定义标题样式
        ],
        border: [0],
        area: ['50%', '150px'],
        iframe: { src: getRootPath()+'/SystemManage_flat/NewGridCodeInfo.aspx?GID=' + GID }
    })
}

//打开基础信息修改页面
function OpenUpdateBasicInfo(taskid) {
    $.layer({
        type: 2,
        title: [
            '信息修改',
            'background:#1a8dd5; height:30px; color:#fff; border:none;' //自定义标题样式
        ],
        border: [0],
        area: ['90%', '90%'],
        iframe: { src: '../XinZeng/UpdateBasicInfo.aspx?taskId=' + taskid }
    })
}
//打开基础信息修改页面
function OpenUpdateBasicInfo2(taskid) {
    $.layer({
        type: 2,
        title: [
            '信息修改',
            'background:#1a8dd5; height:30px; color:#fff; border:none;' //自定义标题样式
        ],
        border: [0],
        area: ['100%', '100%'],
        iframe: { src: '../CaseOperate_flat/XinZeng/CaseUpdate.aspx?taskId=' + taskid }
    })
}

function OpenBlowUpPic(CurrentURl) {
    window.open(CurrentURl, 'BlowupPic', "max=no;resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=300,top=32,height=570,width=380");
}

function OpenFilter(taskid, CaseStatus) {



    var ran = Math.random() * 1000;
    var res = window.open('../Picfilter.aspx?taskid=' + taskid + '&CaseStatus=' + CaseStatus + '&random=' + ran, "window", "dialogHeight:590px;dialogWidth:545px;center:yes;help:no;resizable:no;status:no;");
    //var res = window.open('../MediaFileUploadFrame.aspx?taskid=' + taskid + '&CaseStatus=' + CaseStatus + '&random=' + ran, "window", "dialogHeight:590px;dialogWidth:545px;center:yes;help:no;resizable:no;status:no;");
    if (res == 1) {
        //window.location.href = window.location.href + "&ran=" + ran;
        refresh();
    }
}
function ShowExelist() {
    window.opener = null;
    window.open('PackList.aspx?', 'ShowPackList', 'toolBar=no, menubar=no, status=no,resizable=no,left=150,top=80,width=1000,height=600,scrollbars=yes');
}
function OpenPrintPage(URL, TD_Report) {
    window.open(URL, TD_Report);
}


/*
****************************************************
* VeryScript - Javascript Library                  *
* Written by Guozhijian all rights reserved        *
* Written at 2006-11-01                            *
****************************************************
*/

/*
********************************************
* Get Element Object, or its innerText,innerHTML,value
* Written at 2006-11-01
********************************************
*/
function $D(id) {
    return document.getElementById(id);
}
function $T(id) {
    return $D(id).innerText;
}
function $H(id) {
    return $D(id).innerHTML;
}
function $V(id) {
    return $D(id).value;
}


/*************************** TextBox Max Length restrict written by Guozhijian 2008/01/17 *****************************/
var TxtController = new Object();
TxtController.RegisterKeyEvent = function (objTextBox, maxlen) {
    if (objTextBox.attachEvent) {
        objTextBox.attachEvent("onkeyup", new Function("TxtController.RefreshTip('" + objTextBox.id + "'," + maxlen + ")"));
        objTextBox.attachEvent("onfocus", new Function("TxtController.RefreshTip('" + objTextBox.id + "'," + maxlen + ")"));
        objTextBox.attachEvent("onblur", new Function("TxtController.ClearIfOnlySpace('" + objTextBox.id + "')"));
    } else if (objTextBox.addEventListener) {
        objTextBox.addEventListener("keyup", new Function("TxtController.RefreshTip('" + objTextBox.id + "'," + maxlen + ")"), false);
        objTextBox.addEventListener("focus", new Function("TxtController.RefreshTip('" + objTextBox.id + "'," + maxlen + ")"), false);
        objTextBox.addEventListener("blur", new Function("TxtController.ClearIfOnlySpace('" + objTextBox.id + "')"), false);
    }



}
TxtController.Initialize = function (objTextBox, maxlen, emptyFlag) {
    var boxId = objTextBox.id;
    var html = "<span style='border:solid 1px #cccccc;height:20px;line-height:20px;width:auto;color:#4D4D4D;text-indent:2px;font-weight:normal;'>";
    //    html += "<span>" + emptyFlag + "，长度限制：<span style='font-size:11px'>" + maxlen + "</span>，还可输入：</span><span id='" + boxId + "_lf' style='font-size:11px'></span>";
    html += "<span>";
    if (emptyFlag == '必填') {
        //html += "<span style='color:red'>*</span> ";
    }
    html += "<span id='" + boxId + "_lf' style='font-size:11px'></span>/";
    html += "<span style='font-size:11px'>" + maxlen + "</span>";
    html += "</span>";
    html += "</span>";
    var lenLeft = maxlen - objTextBox.value.length;
    objTextBox.parentNode.insertAdjacentHTML("beforeEnd", html);
    $D(boxId + "_lf").innerText = lenLeft;
}
TxtController.RefreshTip = function (objId, maxlen) {
    var oTextBox = $D(objId);
    var oSpan = $D(objId + "_lf");
    var lenLeft = maxlen - oTextBox.value.length;
    if (lenLeft >= 0) {
        oSpan.innerText = lenLeft;
    }
    else {
        oSpan.innerText = "0";
        oTextBox.value = oTextBox.value.substr(0, maxlen);
        return false;
    }
    
}
TxtController.ClearIfOnlySpace = function (objId) {
    var oTextBox = $D(objId);
    if (oTextBox.value.replace(/( )|\r|\n/g, "") == "") {
        oTextBox.value = "";
    }
    //把英文单引号改成中文单引号
    oTextBox.value=oTextBox.value.replace(/'/g, "’");
}

//弹出辅助信息页面
function DisplayIllegalLand(strTaskID, typeSellect, AreaCode, Verification) {

    var h = screen.availHeight - 220;
    var w = screen.availWidth - 200;
    var openWindow = window.open('../DetailInfo/IllegalLandInfo.aspx?taskid=' + strTaskID + '&typeSellect=' + typeSellect + '&AreaCode=' + AreaCode + '&Verification' + Verification, 'newDetails8', 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}

function ShowKeeperInfo(keepersn) {
    window.open('../WorkManage_flat/ShowKeeperProfile.aspx?keepersn=' + keepersn, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=800,height=200");
}

function PlayWave(sWaveFiles) {
    document.WMPlay.FileName = sWaveFiles;
    //window.open(sWaveFiles);
    //window.open('play/PlayWave.aspx?sWaveFiles=' + sWaveFiles, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=200,top=100,width=800,height=400");
}

function PlayWave2(sWaveFiles) {
    document.WMPlay.FileName = sWaveFiles;
    //window.open('../play/PlayWave.aspx?sWaveFiles=' + sWaveFiles, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=200,top=100,width=800,height=400");
}

//详细环节12345工单详细信息
function Open12345case(ID, TASKID) {
    window.open('12345CaseInfo.aspx?WPID=' + ID, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=1050,height=550");
}

//其他环节12345工单详细信息
function OpenOther12345case(ID, TASKID) {
    window.open('../12345CaseInfo.aspx?WPID=' + ID, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=1050,height=550");
}

//原始工单详细信息
function OpentOriginalcase(WPID, taskId) {
    window.open('NewDisplay962000.aspx?WPID=' + WPID + '&TASKID=' + taskId, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,scrollbars=yes,left=10,top=0,width=1000,height=510");
}



//弹出96200多媒体播放
function PlayDSMedia(hotlinesn) {

    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    var openWindow = window.open('../CaseOperate/PlayDSMedia.aspx?hotlinesn=' + hotlinesn, 'newDetails9', 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}


function DisplayIllegalLandPar(strTaskID, typeSellect, AreaCode, Verification) {

    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    var openWindow = window.open('DetailInfo/IllegalLandInfo.aspx?taskid=' + strTaskID + '&typeSellect=' + typeSellect + '&AreaCode=' + AreaCode + '&Verification' + Verification, 'newDetails8', 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}


/*added by xxj 2013-09-27*/
/*ishid:1默认收缩，0默认展开*/
function OpenLeftMenuSwitch(ishid) {
    eval("TurnMenutd").style.display = "";
    if (ishid == 0) {
        showLeftMenu();
    }
    else {
        hiddenLeftMenu();
    }
}
function CloseLeftMenuSwitch() {
    eval("TurnMenutd").style.display = "none";
    showLeftMenu();
}
/*added by xxj 2013-09-27*/
function showLeftMenu() {
    eval("LeftMenutd").style.display = "";
    eval("hidbtn").style.display = "";
    eval("showbtn").style.display = "none";
    document.getElementById("ifrm_Modulediv").style.width = document.body.clientWidth - 203;
    document.getElementById("ifrm_Modulediv").style.left = 180;
}

function hiddenLeftMenu() {
    eval("LeftMenutd").style.display = "none";
    eval("hidbtn").style.display = "none";
    eval("showbtn").style.display = "";
    document.getElementById("ifrm_Modulediv").style.width = document.body.clientWidth - 23;
    document.getElementById("ifrm_Modulediv").style.left = 0;
}