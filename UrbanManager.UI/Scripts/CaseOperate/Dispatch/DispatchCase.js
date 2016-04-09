

var ID_ExecuteDept_Text = "#txt_ExecuteDept";//主责部门text
var ID_ExecuteDept_Code = "#txt_ExecuteDeptCode";//主责部门code
var ID_AssistDept_Text = "#txt_AssistDept";//协办部门text
var ID_AssistDept_Code = "#txt_AssistDeptCode";//协办部门code
var ID_ExecuteDept_Tree = "tree_executeDept";//主责部门树id
var ID_AssistDept_Tree = "tree_AssistDept";//协办部门树id
var ID_SmsUser_Text = "#txt_smsuser";//短信接收人text
var ID_SmsUser_Code = "#txt_smsusercode";//短信接收人code
var ID_SmsUser_Tree = "tree_SmsUser";//短信接收人树
$(function () {
    initSelect();//初始化下拉框
    select_arrivetimeBind();//绑定到场时限
    select_solvetimeBind();//绑定处理时限

    EventBind();//事件

    //到场时限改变事件
    $("#select_arrivetime").change(function () {
        Smartspinner_arrivetime_SetValue($("#select_arrivetime").val());

    });
    //处理时限改变事件
    $("#select_solvingtime").change(function () {
        Smartspinner_solvingtime_SetValue($("#select_solvingtime").val());
    });

});

function EventBind() {
    $("#img_executedeptcode").click(function () {
        ExecuteDeptViewShow();
    });
    $(ID_AssistDept_Text).click(function () {
        AssistDeptViewShow();
    });
    $(ID_SmsUser_Text).click(function () {
        SmsUserViewShow();
    });
    $("body").click(function () {
        SrcElementClick();

    });
}



//主责部门tree显示
function ExecuteDeptViewShow() {
    $("#div_ExecuteDept").show().css({ "left": $(ID_ExecuteDept_Text).offset().left, "top": $(ID_ExecuteDept_Text).offset().top - 19, "width": $(ID_ExecuteDept_Text).css("width") });
}

//协办部门tree控件的显示
function AssistDeptViewShow() {
    $("#div_AssistDept").show().css({ "left": $(ID_AssistDept_Text).offset().left, "top": $(ID_AssistDept_Text).offset().top - 19, "width": $(ID_AssistDept_Text).css("width") });
}
//短信接收人员
function SmsUserViewShow() {
    $("#div_SmsUserList").show().css({ "left": $(ID_SmsUser_Text).offset().left, "top": $(ID_SmsUser_Text).offset().top - 19, "width": $(ID_SmsUser_Text).css("width") });
}

//计算截止时间
function select_solveEndTime(objId, taskId) {
    var tempData = getElementItemValue("Operateleft");
    var IsDeleteArriveTime = Number($("#hid_IsDeleteArriveTime").val());
    var hidInfoSourceid = $("#hidInfosourceid").val();
    var objHolder = $("#divLastSlovingTimeHolder");

    var left = $("#" + objId).offset().left;
    var top = $("#" + objId).offset().top - 82;
    var timespan = 0;
    if (IsDeleteArriveTime == 0) {
        timespan = Number(Smartspinner_arrivetime_GetValue()) + Number(Smartspinner_solvingtime_GetValue());
    }
    else {
        timespan = Number(Smartspinner_solvingtime_GetValue());
    }

    $.post("../../AutoPreCreateCase/GetSolveEndTime", { starttime: '', timespan: timespan, infosource: hidInfoSourceid, taskid: taskId }, function (data) {
        var result = data;
        $("#divLastSlovingTimeHolder").html("<table><tr><td class='key' >处理截止时间：</td><td class='value' title='" + data + "'>" + data + "</td></tr></table>");
        $("#divLastSlovingTimeHolder").css({ "width": "250px", "height": "20px", "left": left - 240, "top": top });
        $("#divLastSlovingTimeHolder").show();
        $("#" + objId).mouseout(function () {
            $("#divLastSlovingTimeHolder").hide();
        });
    });
}

// 所有tree控件在点击别的元素时隐藏
function SrcElementClick() {
    if ($(event.srcElement).attr("ID") == undefined) {
        AssistDeptViewHide();
        ExecuteDeptViewHide();
        SmsUserViewHide();
        deptRemove();
        if ($(ID_ExecuteDept_Text).val() != "")
            ValidDeptcode($(ID_ExecuteDept_Code).val());
        $(".SeBox").hide();
    }
    else {
        //协办隐藏
        if ($(event.srcElement).attr("ID") != "txt_AssistDept" && $(event.srcElement).attr("ID") != "div_AssistDept" && $(event.srcElement).attr("ID").indexOf("tree_AssistDept") < 0) {
            AssistDeptViewHide();
        }
        //主责部门隐藏
        if ($(event.srcElement).attr("ID") != "img_executedeptcode" && $(event.srcElement).attr("ID") != "div_ExecuteDept" && $(event.srcElement).attr("ID").indexOf("tree_executeDept") < 0) {
            if ($("#div_ExecuteDept").css("display") != "none") {
                if ($(ID_ExecuteDept_Text).val() != deptHide) {
                    AssistDeptBind();
                    deptHide = $(ID_ExecuteDept_Text).val();
                }
            }
            ExecuteDeptViewHide();
            deptRemove();
        }
        //短信接收隐藏
        if ($(event.srcElement).attr("ID") != "txt_smsuser" && $(event.srcElement).attr("ID") != "div_SmsUserList" && $(event.srcElement).attr("ID").indexOf("tree_SmsUser") < 0) {
            SmsUserViewHide();
        }
        //隐藏主责部门模糊查询
        if ($(event.srcElement).attr("ID") != "txt_ExecuteDept") {
            if ($(ID_ExecuteDept_Text).val() != "")
                ValidDeptcode($(ID_ExecuteDept_Code).val());
            $(".SeBox").hide();
        }
    }
}
//主责部门tree控件的隐藏
function ExecuteDeptViewHide() {
    $("#div_ExecuteDept").hide();
}
//协办部门tree控件的隐藏
function AssistDeptViewHide() {
    $("#div_AssistDept").hide();
}
//接收短信人树隐藏
function SmsUserViewHide() {
    $("#div_SmsUserList").hide();
}

//初始化下拉框
function initSelect() {
    //select_executedeptBind();
    ExecuteDeptBind();
}
//绑定到场时限下拉框
function select_arrivetimeBind() {
    var tempData = getElementItemValue("Operateleft");
    $("#select_arrivetime").empty();
    $.post(
         "../../Dispatch/GetArriveList",
         { "arrstring": JSON.stringify(tempData) },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_arrivetime"));
             })
             //无下拉框时
             if ($("#select_arrivetime").css("display") == "none") {
                 Smartspinner_arrivetime_SetValue($("#hide_arrivetime").val());
             } else {
                 Smartspinner_arrivetime_SetValue($("#select_arrivetime").val());
             }
             setArriveTime();//给到场时间框赋值


         });
}
//绑定处理时限下拉框
function select_solvetimeBind() {
    var tempData = getElementItemValue("Operateleft");
    $("#select_solvingtime").empty();
    $.post(
         "../../Dispatch/GetSolveList",
         { "arrstring": JSON.stringify(tempData) },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_solvingtime"));
             })
             //无下拉框时
             if ($("#select_solvingtime").css("display") == "none") {
                 Smartspinner_solvingtime_SetValue($("#hide_resulttime").val());
             } else {
                 Smartspinner_solvingtime_SetValue($("#select_solvingtime").val());
             }
             setSolveTime();//处理时间框赋值

         });
}
//绑定主责用时
function zzys_bind(taskid, deptcode, Urgentdegree) {
    $.post("../../Dispatch/GetTaskDeptagCLTime", { "taskid": taskid, "deptcode": deptcode, "Urgentdegree": Urgentdegree },
        function (data) {
            lb_zzys_SetValue(data);
        });
}

//保存
function Save() {
    var tempData = getElementItemValue("Operateleft");
    //主责部门=12345时，弹出信息填写界面
    if (tempData["txt_ExecuteDeptCode"] == "XT003" && $("#txt_ExecuteDept").attr("disabled") != "disabled") {
        var Rand = Math.random();
        var taskId = $("#taskId").val();
        var url = encodeURI("12345Dispatch.aspx?rd=" + Rand + "&taskId=" + taskId);
        var FileBak = window.showModalDialog(url,'', "dialogHeight=445px;dialogWidth=780px;scroll:no;center:yes;help:no;resizable:no;status:no;");

        if (FileBak != "T") {
            return false;
        }
    }
    $("#btnSave").hide();
    loadi = layer.load('正在保存…');
    
    tempData["arrivetime"] = Smartspinner_arrivetime_GetValue();
    tempData["solvetime"] = Smartspinner_solvingtime_GetValue();
    tempData["verify_result"] = $('input[name="radiocheck"]:checked').val();
    if ($("#tb_NewGrid").is(":visible")) {
        tempData["tb_NewGrid_Visible"] = "1";
    }
    else {
        tempData["tb_NewGrid_Visible"] = "0";
    }
    var url = "../../Dispatch/DispatchCase?random=" + Math.random();
    if ($("#hid_categoryid").val() == "26") {
        url = "../../Dispatch/DispatchCaseVerify?random=" + Math.random();
    }
    
    if (isValid(tempData)) {
        $.post(
             (url),
             { "arrstring": JSON.stringify(tempData) },
             function (data) {
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     alert(message);
                     GoDestinationURL();
                     $("#btnSave").show();
                 }
                 else {
                     alert(message);
                     $("#btnSave").show();
                 }
                     
             });
    }
    
}

function allowTuidan() {
    loadi = layer.load('正在保存…');
    var tempData = getElementItemValue("Operateleft");
        $.post(
             ("../../Dispatch/UpdateIsBack?random=" + Math.random()),
             { "arrstring": JSON.stringify(tempData) },
             function (data) {
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     alert(message);
                     GoDestinationURL();
                 }
                 else
                     alert(message);
             });
    
}
function allowYanQi() {
    loadi = layer.load('正在保存…');
    var tempData = getElementItemValue("Operateleft");
        $.post(
             ("../../Dispatch/UpdateIsVerify?random=" + Math.random()),
             { "arrstring": JSON.stringify(tempData) },
             function (data) {
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     alert(message);
                     GoDestinationURL();
                 }
                 else
                     alert(message);
             });
}
//顽症 申请协调
function Save_wanzheng() {

    var tempData = getElementItemValue("Operateleft");
    loadi = layer.load('正在保存…');
    if ($("#ynwzModal").is(":visible")) {
        if ($.trim($("#txt_ynwz").val()) == "") {
            alert("说明不能为空!");
            return false;
        }
    }
    $.post(
         ("../../Dispatch/Save_wanzheng?random=" + Math.random()),
         { "arrstring": JSON.stringify(tempData) },
         function (data) {
             var arr = data.split(";");
             var result = arr[0];
             var message = arr[1];
             if (result == "True") {
                 alert(message);
                 GoDestinationURL();
             }
             else
                 alert(message);
         });
}
//热线拆单
function hotlineNewCase() {
    var tempData = getElementItemValue("Operateleft");
    loadi = layer.load('正在保存…');
    $.post(
         ("../../Dispatch/hotlineNewCase?random=" + Math.random()),
         { "arrstring": JSON.stringify(tempData) },
         function (data) {
             var arr = data.split(";");
             var result = arr[0];
             var message = arr[1];
             if (result == "True") {
                 alert(message);
                 GoDestinationURL();
             }
             else
                 alert(message);
         });
}
//数据校验
function isValid(tempData) {
    if (tempData["hidInfosourceid"] == "10" || tempData["hidInfosourceid"] == "2" || tempData["hidInfosourceid"] == "68") {
        if (tempData["txt_ExecuteDeptCode"] == "XT001" || tempData["txt_ExecuteDeptCode"] == "XT003") {
            alert("12345和12319案件不能派回市级平台!");
            return false;
        }
    }
    //判断是否有效部门 $("#hid_categoryid").val() != "26" 普陀派遣审核默认赋值时有问题 排除此情况  $("#dept_isdisable").val()排除主责部门未完成时赋值
    if ($("#is_valid").val() == "0" || ($("#is_valid").val() == "" && $(ID_ExecuteDept_Text).val() != "" && $("#dept_isdisable").val() != "1") && $("#hid_categoryid").val() != "26") {
        return false;
    }
    if ($("#chk_firstContactTime").get(0).checked == true) {
        if ($("#firstContactTime").val() == "") {
            alert('首次联系时间不能为空!');
            return false;
        }
        if ($("#txt_Contactperson").val() == "") {
            alert('联系人不能为空!');
            return false;
        }
    }
    if ($("#hid_categoryid").val() == "7" && $("#userDeptcode").val() == "101") {
        if (Smartspinner_solvingtime_GetValue() == "0") {
            alert("普通派遣处理时限不能派0分钟!");
            return false;
        }
    }
    if ($("#txt_ExecuteDept").val() == "") {
        alert('请选择主责部门!');
        return false;
    }
    if ($("#txt_description").val() == "") {
        alert('派遣意见不能为空!');
        return false;
    }
    if ($("#txt_description").val().length > 500) {
        alert('派遣意见字符数不能超过500个字符!');
        return false;
    }

    if ($("#chk_firstContactTime").checked == true) {
        if ($("#firstContactTime").val() != "") {
            alert("首次联系时间不能为空!")
            return false;
        }
        if ($("#txt_Contactperson").val() != "") {
            alert("联系人不能为空!")
            return false;
        }
    }

    
    

    return true;
}

/*-----------------------------ExecuteDeptTree-----------------------------*/

var deptHide = "";
var settingExecute = {
    check: { enable: true, chkStyle: "radio", radioType: "all" },
    data: {
        keep: {
            parent: true
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: ExecuteDeptcodeonClick,
        beforeCheck: zTreeBeforeClick,
        onCheck: ExecuteDeptCheck
    }
}

function ExecuteDeptcodeonClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(ID_ExecuteDept_Tree);
    if (treeNode != null) {
        if (treeNode.checked == true) {
            treeNode.checked = false;
            zTree.updateNode(treeNode, false);
        }
        else {
            treeNode.checked = true;
            zTree.updateNode(treeNode, true);
        }
        getCount();
    }
}


function zTreeBeforeClick(treeId, treeNode, clickFlag) {
    return !treeNode.isParent; //当是单选树根节点时返回false不能选
}

function ExecuteDeptCheck(e, treeId, treeNode) {
    getCount();
}
function getCount() {
    var zTree = $.fn.zTree.getZTreeObj(ID_ExecuteDept_Tree),
               check = zTree.getCheckedNodes(true),
               checkNameList = "",
               checkCodeList = "";

    $(check).each(function (k, v) {
        if (!v.isParent) {
            checkNameList = v["name"];
            checkCodeList = v["id"];
        }
    });
    $(ID_ExecuteDept_Text).val(checkNameList.replace("全部,", ""));
    $(ID_ExecuteDept_Code).val(checkCodeList.replace("0,", ""));
    SmsUserBind();
    //黄浦街镇派区中心 处理时限默认14天
    if ($(ID_ExecuteDept_Code).val() == "101" && $("#hide_areacode").val() == "01") {
        ChangeSolvingtimeByDept();
    }
}

function deptRemove() {
    var deptCode = "";
    deptCode = $(ID_ExecuteDept_Code).val();
    if (deptCode != "" && deptCode != null) {
        var deptTree = $.fn.zTree.getZTreeObj(ID_AssistDept_Tree);
        if (deptTree != null) {
            var treeNode = deptTree.getNodeByParam("id", deptCode, null);
            deptTree.removeNode(treeNode);
        }
    }
    if ($("#assistdeptcodelist").val() != "")
        AssisDeptCodeRemove($("#assistdeptcodelist").val());


}
//再派遣 剔除已派遣未完成的协办部门
function AssisDeptCodeRemove(deptcodeList) {
    var list = deptcodeList.split(',');
    var deptTree = $.fn.zTree.getZTreeObj(ID_AssistDept_Tree);
    var exeDeptTree = $.fn.zTree.getZTreeObj(ID_ExecuteDept_Tree);
    //剔除协办部门列表中 再派遣未完成的协助部门
    if (deptTree != null) {
        for (var i = 0; i < list.length; i++) {
            var treeNode = deptTree.getNodeByParam("id", list[i], null);
            deptTree.removeNode(treeNode);
        }
    }
    //剔除主责部门列表中 再派遣未完成的协助部门
    if (exeDeptTree != null) {
        for (var i = 0; i < list.length; i++) {
            var treeNode = exeDeptTree.getNodeByParam("id", list[i], null);
            exeDeptTree.removeNode(treeNode);
        }
    }


}
/*------------------------------ end ------------------------------------*/

/*---------------------------绑定主责部门树形控件(浦东)---------------------*/
//主责部门
function ExecuteDeptBind() {
    $.post("../../Dispatch/GetExecuteDept", { "deptcode": $("#hide_deptcode").val(), "taskid": $("#taskId").val(), "solveid": $("#hid_solveid").val() }, function (msg) {
        var cacheExeDeptData = JSON.parse(msg);

        $.fn.zTree.init($("#" + ID_ExecuteDept_Tree), settingExecute, cacheExeDeptData);
        if ($("#resdeptcode").val()!=""){
            $("#txt_ExecuteDept").val($("#resdeptname").val());
            $("#txt_ExecuteDeptCode").val($("#resdeptcode").val());
            setCheckDeptCode(ID_ExecuteDept_Tree, ID_ExecuteDept_Code)
        }
        if ($("#executedeptcode").val() != "") {
            $("#txt_ExecuteDept").val($("#executedeptname").val());
            $("#txt_ExecuteDeptCode").val($("#executedeptcode").val());
            setCheckDeptCode(ID_ExecuteDept_Tree, ID_ExecuteDept_Code)
        }
        AssistDeptBind();
    });



}

/*------------------------------ end ------------------------------------*/

/*---------------------------绑定协办部门---------------------*/
//协办部门
function AssistDeptBind() {
    $(ID_AssistDept_Text).val("");
    $(ID_AssistDept_Code).val("");
    $.post("../../Dispatch/GetAssistDept", { "deptcode": $("#hide_deptcode").val() }, function (msg) {
        var cacheDeptData = JSON.parse(msg);

        $.fn.zTree.init($("#" + ID_AssistDept_Tree), AssistSetting, cacheDeptData);
        deptRemove();
        if ($("#assistdeptcode").val() != "") {
            $("#txt_AssistDept").val($("#assistdeptname").val());
            $("#txt_AssistDeptCode").val($("#assistdeptcode").val());
            setCheckDeptCode(ID_AssistDept_Tree, ID_AssistDept_Code)
        }
    });

}

/*------------------------------ end ------------------------------------*/
/******************* Assist Dept tree*******************************/
//协办部门treeSetting
var AssistSetting = {
    check: {
        enable: true
    },
    data: {
        keep: {
            parent: true
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onClick,
        onCheck: CheckCount
    }

};

function onClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(ID_AssistDept_Tree);
    if (treeNode != null) {
        if (treeNode.checked == true) {
            treeNode.checked = false;
            zTree.updateNode(treeNode, false);
        }
        else {
            treeNode.checked = true;
            zTree.updateNode(treeNode, true);
        }
        CheckCount();
    }
}

function CheckCount(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(ID_AssistDept_Tree),
               check = zTree.getCheckedNodes(true),
               checkNameList = "",
               checkCodeList = "";

    $(check).each(function (k, v) {
        if (!v.getCheckStatus().half) {
            if (!v.isParent) {
                checkNameList = checkNameList + v["name"] + ",";
                checkCodeList = checkCodeList + v["id"] + ",";
            }
        }
    });
    $(ID_AssistDept_Text).val(checkNameList.substring(0, checkNameList.length - 1).replace("全部,", ""));
    //$(ID_AssistDept_Code).val(checkCodeList.substring(0, checkCodeList.length - 1).replace("0,", ""));
    $(ID_AssistDept_Code).val(checkCodeList.substring(0, checkCodeList.length - 1).indexOf("0,") == 0 ? checkCodeList.substring(0, checkCodeList.length - 1).substring(2) : checkCodeList.substring(0, checkCodeList.length - 1));
    SmsUserBind();
}
/************************** end ******************************/

/*----------------短信接收人--------------------------*/
var SmsUserSetting = {
    check: {
        enable: true
    },
    data: {
        keep: {
            parent: true
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: clickSmsCode,
        onCheck: CheckSmsCode
    }

};
function clickSmsCode(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(ID_SmsUser_Tree);
    if (treeNode != null) {
        if (treeNode.checked == true) {
            treeNode.checked = false;
            zTree.updateNode(treeNode, false);
        }
        else {
            treeNode.checked = true;
            zTree.updateNode(treeNode, true);
        }
        getSmsCodeCount();
    }

}
function CheckSmsCode(e, treeId, treeNode) {
    getSmsCodeCount();
}

function getSmsCodeCount() {
    var zTree = $.fn.zTree.getZTreeObj(ID_SmsUser_Tree),
               check = zTree.getCheckedNodes(true),
               checkNameList = "",
               checkCodeList = "";

    $(check).each(function (k, v) {
        //        if (!v.getCheckStatus().half) {
        if (!v.isParent) {
            checkNameList = checkNameList + v["name"] + ",";
            checkCodeList = checkCodeList + v["id"] + ",";
        }
    });
    var username = "";
    if (checkNameList != null && checkNameList != "") {
        checkNameList = checkNameList.substring(0, checkNameList.length - 1);
        for (var i = 0; i < checkNameList.split(',').length; i++) {
            username += checkNameList.split(',')[i].split('-')[0] + ",";
        }
        username = username.substr(0, username.length - 1);
    }
    $(ID_SmsUser_Text).val(username.replace("全部,", ""));
    $(ID_SmsUser_Code).val(checkCodeList.substring(0, checkCodeList.length - 1));
}



function SmsUserBind() {
    $(ID_SmsUser_Text).val("");
    $(ID_SmsUser_Code).val("");
    $.post("../../Dispatch/GetSmsUser", { executedeptcode: $(ID_ExecuteDept_Code).val(), assistdeptcode: $(ID_AssistDept_Code).val() }, function (msg) {
        var cacheDeptData = JSON.parse(msg);

        $.fn.zTree.init($("#" + ID_SmsUser_Tree), SmsUserSetting, cacheDeptData);
    });
}

/*----------------------------------------------------*/

function ShowDeptList(obj) {
    var loaca = $(obj);
    $(".SeBox").show().css({ "left": loaca.offset().left + "px", "top": (parseInt(loaca.offset().top) - $(ID_ExecuteDept_Text).height()), "width": $(ID_ExecuteDept_Text).width() });
    findDept(obj);
}

function findDept(obj) {
    $.post("../../AjaxHandlers/DeptSendHandler.ashx", { "data": $(obj).val(), "Method": "Search" }, function (msg) {

        var data = JSON.parse(msg); $(".SeBox").children().remove();
        $(data).each(function (k, v) {
            var div = document.createElement("div");
            div.setAttribute("DEPTCODE", v["Key"]);
            div.setAttribute("DEPTNAME", v["Value"]);
            $(div).addClass("line");
            $(div).html(v["Value"]);
            $(".SeBox").append(div);
            $(div).mouseover(function () {
                $(this).css({ "backgroundColor": "#7AC5F4" });
            }).mouseout(function () {
                $(this).css({ "backgroundColor": "#e0f3ff" });
            }).click(function () {
                $(obj).val($(this).html());
                $("#txt_ExecuteDeptCode").val($(this).attr("DEPTCODE"));
                $(".SeBox").hide();
                setCheckDeptCode(ID_ExecuteDept_Tree, ID_ExecuteDept_Code);
                AssistDeptBind();
                SmsUserBind();
                ValidDeptcode($(ID_ExecuteDept_Code).val());
                //黄浦街镇派区中心 处理时限默认14天
                if ($(ID_ExecuteDept_Code).val() == "101" && $("#hide_areacode").val() == "01") {
                    ChangeSolvingtimeByDept();
                }
            });
        });
    });
}
function setCheckDeptCode(treeId, deptcodeId) {
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var checkedCode = $(deptcodeId).val();
    if (checkedCode.length > 0) {
        var code = checkedCode.split(",");
        $.each(code, function (k, v) {
            var node = treeObj.getNodeByParam("id", v, null);
            if (node != null)
                treeObj.checkNode(node, true, true);
            else {
                $(ID_ExecuteDept_Code).val("");
                $(ID_ExecuteDept_Text).val("");
            }
            
        });
    }
}
//验证是否有效部门
function ValidDeptcode(deptcode) {
    $.post("../../Dispatch/GetIsValidDeptcode", { "deptcode": deptcode },
        function (msg) {
            if (msg != "1") {
                $("#is_valid").val("0");
                alert("请输入有效部门!");
                $(ID_ExecuteDept_Code).val("");
                $(ID_ExecuteDept_Text).val("");
            } else {
                $("#is_valid").val("1");
            }
        });
}

//黄浦街镇派区中心默认处理时限
function ChangeSolvingtimeByDept() {
    Smartspinner_solvingtime_SetValue('20160');
    $("#select_solvingtime option[value='" + '20160' + "']").attr("selected", "selected");
}