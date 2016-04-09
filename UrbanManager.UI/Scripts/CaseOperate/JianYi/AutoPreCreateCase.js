var ID_ExecuteDept_Text = "#txt_ExecuteDept";//主责部门text
var ID_ExecuteDept_Code = "#txt_ExecuteDeptCode";//主责部门code
var ID_AssistDept_Text = "#txt_AssistDept";//协办部门text
var ID_AssistDept_Code = "#txt_AssistDeptCode";//协办部门code
var ID_ExecuteDept_Tree = "tree_executeDept";//主责部门树id
var ID_AssistDept_Tree = "tree_AssistDept";//协办部门树id
var ID_SmsUser_Text = "#txt_smsuser";//短信接收人text
var ID_SmsUser_Code = "#txt_smsusercode";//短信接收人code
var ID_SmsUser_Tree = "tree_SmsUser";//短信接收人树
var ID_SpSign_Text = "#txt_spsignName";//短信接收人text
var ID_SpSign_Code = "#txt_spsignCode";//短信接收人code
var ID_SpSign_Tree = "tree_spsign";//短信接收人树
var isManage = false;   //判断管理要点是否有值
var isSonClass = false;//判断子类是否有值

$(function () {
    //$.ajaxSetup({
    //    async: false
    //});
    initSelect();//初始化下拉框

    EventBind();//事件

    //到场时限改变事件
    $("#select_arrivetime").change(function () {
        Smartspinner_arrivetime_SetValue($("#select_arrivetime").val());

    });
    //处理时限改变事件
    $("#select_solvingtime").change(function () {
        Smartspinner_solvingtime_SetValue($("#select_solvingtime").val());
    });

    //案件属性改变事件
    $("#select_Caseproperty").change(function () {
        casepropertyChange($("#select_Caseproperty").val());
        Select_BigClassBind();

    });
    //案件大类改变事件
    $("#select_BigClass").change(function () {

        Select_SmallClassBind();
    });
    //案件小类改变事件
    $("#select_SmallClass").change(function () {
        Select_SonClassBind();
    });

    //案件管理要点
    $("#select_SonClass").change(function () {
        Select_MangageContentBind();
    });
    //街道改变事件
    $("#select_street").change(function () {
        Select_CommunityBind();

    });

    //社区改变事件
    $("#select_community").change(function () {

        Select_GridBind();

    });
    $("#select_grid").change(function () {

        if ($("#hid0008").val() == "1")
            CoordBind();
    });

});
//初始化下拉框
function initSelect() {
    //select_executedeptBind();
    spsign_Bind();
    select_StAreaBind();
    select_CasepropertyBind();
    select_streetBind();
    Select_InputArea_Bind();
    //select_spSignBind();
    //select_arrivetimeBind();//绑定到场时限
    //select_solvetimeBind();//绑定处理时限
    //ExecuteDeptBind();
}
function EventBind() {
    $("#img_executedeptcode").click(function () {
        ExecuteDeptViewShow();
    });
    $(ID_AssistDept_Text).click(function () {
        AssistDeptViewShow();
    });
    $("body").click(function () {
        SrcElementClick();

    });
    $(ID_SmsUser_Text).click(function () {
        SmsUserViewShow();
    });
    $(ID_SpSign_Text).click(function () {
        SpSignViewShow();
    });
}

//主责部门tree显示
function ExecuteDeptViewShow() {
    $("#div_ExecuteDept").show().css({ "left": $(ID_ExecuteDept_Text).offset().left, "top": $(ID_ExecuteDept_Text).offset().top - $(ID_ExecuteDept_Text).height(), "width": $(ID_ExecuteDept_Text).css("width") });
}

//协办部门tree控件的显示
function AssistDeptViewShow() {
    $("#div_AssistDept").show().css({ "left": $(ID_AssistDept_Text).offset().left, "top": $(ID_AssistDept_Text).offset().top - $(ID_AssistDept_Text).height(), "width": $(ID_AssistDept_Text).css("width") });
}
//短信接收人员
function SmsUserViewShow() {
    $("#div_SmsUserList").show().css({ "left": $(ID_SmsUser_Text).offset().left, "top": $(ID_SmsUser_Text).offset().top - $(ID_SmsUser_Text).height(), "width": $(ID_SmsUser_Text).css("width") });
}
//显示 特征要素
function SpSignViewShow() {
    $("#div_spsign").show().css({ "left": $(ID_SpSign_Text).offset().left, "top": $(ID_SpSign_Text).offset().top - $(ID_SpSign_Text).height(), "width": $(ID_SpSign_Text).css("width") });
}

// 所有tree控件在点击别的元素时隐藏
function SrcElementClick() {
    if ($(event.srcElement).attr("ID") == undefined) {
        AssistDeptViewHide();
        ExecuteDeptViewHide();
        SmsUserViewHide();
        SpSignViewHide();
        deptRemove();
        $(".SeBox").hide();
        if ($(ID_ExecuteDept_Text).val() != "")
            ValidDeptcode($(ID_ExecuteDept_Code).val());
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
        //特征要素隐藏
        if ($(event.srcElement).attr("ID") != "txt_spsignName" && $(event.srcElement).attr("ID") != "div_spsign" && $(event.srcElement).attr("ID").indexOf("tree_spsign") < 0) {
            SpSignViewHide();
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
function SpSignViewHide() {
    $("#div_spsign").hide();
}

//绑定到场时限下拉框
function select_arrivetimeBind() {
    var tempData = getElementItemValue("Operateleft");
    collect("select_arrivetime");
    //$("#select_arrivetime").empty();
    $.post(
         "../../AutoPreCreateCase/GetArriveList?random=" + Math.random(),
         { "arrstring": JSON.stringify(tempData) },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_arrivetime"));
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
             });
             $("#select_arrivetime").html(option);
             ////无下拉框时
             //if ($("#select_arrivetime").css("display") == "none") {
             //    Smartspinner_arrivetime_SetValue($("#hide_arrivetime").val());
             //} else {
             //    Smartspinner_arrivetime_SetValue($("#select_arrivetime").val());
             //}
         });
    $.post(
        "../../AutoPreCreateCase/GetClassinfoTime?random=" + Math.random(),
        { "arrstring": JSON.stringify(tempData) },
        function (data) {
            if (data != "")
                Smartspinner_arrivetime_SetValue(data.split("|||")[0]);
        });

}
//绑定处理时限下拉框
function select_solvetimeBind() {
    var tempData = getElementItemValue("Operateleft");
    collect("select_solvingtime");
    //$("#select_solvingtime").empty();
    $.post(
         "../../AutoPreCreateCase/GetSolveList?random=" + Math.random(),
         { "arrstring": JSON.stringify(tempData) },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_solvingtime"));
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
             });
             $("#select_solvingtime").html(option);
             //无下拉框时
             //if ($("#select_solvingtime").css("display") == "none") {
             //    Smartspinner_solvingtime_SetValue($("#hide_resulttime").val());
             //} else {
             //    Smartspinner_solvingtime_SetValue($("#select_solvingtime").val());
             //}
         });
    $.post(
        "../../AutoPreCreateCase/GetClassinfoTime?random=" + Math.random(),
        { "arrstring": JSON.stringify(tempData) },
        function (data) {
            if (data != "") {
                Smartspinner_solvingtime_SetValue(data.split("|||")[1]);
                setSolveTime();
            }
        });
}
//滚动条位置
function ScollPostion() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return { top: t, left: l, width: w, height: h };
}
//计算截止时间
function select_solveEndTime(objId, taskId) {
    var tempData = getElementItemValue("Operateleft");
    var IsDeleteArriveTime = Number($("#hid_IsDeleteArriveTime").val());
    var hidInfoSourceid = $("#hidInfosourceid").val();
    var objHolder = $("#divLastSlovingTimeHolder");

    var left = $("#" + objId).offset().left;
    var top = $("#" + objId).offset().top - 42;
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
        $("#divLastSlovingTimeHolder").css({ "width": "240px", "height": "20px", "left": left - 240, "top": top });
        $("#divLastSlovingTimeHolder").show();
        $("#" + objId).mouseout(function () {
            $("#divLastSlovingTimeHolder").hide();
        });
    });
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
}
function setCheckDeptCode(treeId, deptcodeId) {
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var checkedCode = $(deptcodeId).val();
    if (checkedCode.length > 0) {
        var code = checkedCode.split(",");
        $.each(code, function (k, v) {
            var node = treeObj.getNodeByParam("id", v, null);
            treeObj.checkNode(node, true, true);
        });
    }
    

}
/*------------------------------ end ------------------------------------*/

/*---------------------------绑定主责部门树形控件(浦东)---------------------*/
//主责部门
function ExecuteDeptBind() {
    var tempData = getElementItemValue("Operateleft");
    $.post("../../AutoPreCreateCase/GetExecuteDept", { "deptcode": $("#hide_deptcode").val(), "arrstring": JSON.stringify(tempData) }, function (msg) {
        if (msg != "") {
            var arr = msg.split(";");
            var cacheExeDeptData = JSON.parse(arr[0]);

            $.fn.zTree.init($("#" + ID_ExecuteDept_Tree), settingExecute, cacheExeDeptData);
            if (arr[1] != "") {
                $("#txt_ExecuteDept").val(arr[2]);
                $("#txt_ExecuteDeptCode").val(arr[1]);
                setCheckDeptCode(ID_ExecuteDept_Tree, ID_ExecuteDept_Code)
            } else {
                $(ID_ExecuteDept_Code).val("");
                $(ID_ExecuteDept_Text).val("");
            }
            deptRemove();
        }

    });
    AssistDeptBind();
}

/*------------------------------ end ------------------------------------*/

/*---------------------------绑定协办部门---------------------*/
//协办部门
function AssistDeptBind() {
    $(ID_AssistDept_Text).val("");
    $(ID_AssistDept_Code).val("");
    $.post("../../AutoPreCreateCase/GetAssistDept", { "deptcode": $("#hide_deptcode").val() }, function (msg) {
        var cacheDeptData = JSON.parse(msg);

        $.fn.zTree.init($("#" + ID_AssistDept_Tree), AssistSetting, cacheDeptData);
        deptRemove();
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
//绑定短信接收人
function SmsUserBind() {
    $(ID_SmsUser_Text).val("");
    $(ID_SmsUser_Code).val("");
    $.post("../../Dispatch/GetSmsUser", { executedeptcode: $(ID_ExecuteDept_Code).val(), assistdeptcode: $(ID_AssistDept_Code).val() }, function (msg) {
        var cacheDeptData = JSON.parse(msg);

        $.fn.zTree.init($("#" + ID_SmsUser_Tree), SmsUserSetting, cacheDeptData);
    });
}


//绑定案件属性
function select_CasepropertyBind() {
    collect("select_Caseproperty");
    //$("#select_Caseproperty").empty();
    $.post(
         "../../AutoPreCreateCase/GetInfoTypeOptions",
         { "infosource": $("#hidInfosourceid").val() },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_Caseproperty"));
             });
             $("#select_Caseproperty").html(option);
             $("#select_Caseproperty option[value='" + $("#taskinfoList").val().split(',')[0] + "']").attr("selected", "selected");
             //下拉列表里没有权限时
             if ($("#select_Caseproperty").val() != $("#taskinfoList").val().split(',')[0])
                 $("#select_Caseproperty").empty();
             if ($("#select_Caseproperty").val() == "0")
                 casepropertyChange($("#select_Caseproperty").val());
             Select_BigClassBind();

         });
}
//绑定案件大类
function Select_BigClassBind() {
    collect("select_BigClass");
    //$("#select_BigClass").empty();
    $.post(
         "../../AutoPreCreateCase/GetbigClassOptions",
         { "infotype": $("#select_Caseproperty").val() },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_BigClass"));
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
             });
             $("#select_BigClass").html(option);
             $("#select_BigClass option[value='" + $("#taskinfoList").val().split(',')[1] + "']").attr("selected", "selected");
             Select_SmallClassBind();
         });
}
//绑定案件小类
function Select_SmallClassBind() {
    collect("select_SmallClass");
    //$("#select_SmallClass").empty();
    $.post(
         "../../AutoPreCreateCase/GetSmallClassOptions",
         { "infotype": $("#select_Caseproperty").val(), "bigclass": $("#select_BigClass").val() },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_SmallClass"));
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
             });
             $("#select_SmallClass").html(option);
             $("#select_SmallClass option[value='" + $("#taskinfoList").val().split(',')[2] + "']").attr("selected", "selected");
             Select_SonClassBind();
         });
}
//绑定案件子类
function Select_SonClassBind() {
    collect("select_SonClass");
    //$("#select_SonClass").empty();
    $.post(
         "../../AutoPreCreateCase/GetSonClassOptions",
         { "infotype": $("#select_Caseproperty").val(), "bigclass": $("#select_BigClass").val(), "smallclass": $("#select_SmallClass").val() },
         function (data) {
             var option = "<option value=''></option>";
             $.each(data, function (i, item) {
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_SonClass"));
             });
             $("#select_SonClass").html(option);
             if (data.length > 0) {
                 isSonClass = true;
                 if (data.length == 1)
                     $("#select_SonClass option[value='" + data[0]["Value"] + "']").attr("selected", "selected");
             }
             else {
                 isSonClass = false;
             }
             if ($("#taskinfoList").val().split(',')[3] != "")
                 $("#select_SonClass option[value='" + $("#taskinfoList").val().split(',')[3] + "']").attr("selected", "selected");
             //杨浦12345子类默认为空
             if ($("#hide_areacode").val() == "10" && $("#hidInfosourceid").val() == "10")
                 $("#select_SonClass").val('');
             ExecuteDeptBind();
             Select_MangageContentBind();
             
         });
}

//绑定管理要点
function Select_MangageContentBind() {
    collect("select_mangageContent");
    //$("#select_mangageContent").empty();
    //console.log($("#select_SonClass").val());
    $.post(
         "../../AutoPreCreateCase/GetMangageContentOptions",
         { "infotype": $("#select_Caseproperty").val(), "bigclass": $("#select_BigClass").val(), "smallclass": $("#select_SmallClass").val(), "sonclass": $("#select_SonClass").val() },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_mangageContent"));
             });
             $("#select_mangageContent").html(option);
             if (data.length > 0) {
                 isManage = true;
             }
             else {
                 isManage = false;
             }
             //alert($("#taskinfoList").val().split(',')[4]);
             $("#select_mangageContent option[value='" + $("#taskinfoList").val().split(',')[4] + "']").attr("selected", "selected");
             select_arrivetimeBind();//绑定到场时限
             select_solvetimeBind();//绑定处理时限
         });

}

//绑定街镇
function select_streetBind() {
    collect("select_street");
    //$("#select_street").empty();
    $.post(
         "../../AutoPreCreateCase/GetStreetOptions",
         {},
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_street"));
             });
             $("#select_street").html(option);
             $("#select_street option[value='" + $("#taskinfoList").val().split(',')[5] + "']").attr("selected", "selected");
             Select_CommunityBind();
         });
}
//绑定社区
function Select_CommunityBind() {
    collect("select_community");
   // $("#select_community").empty();
    $.post(
         "../../AutoPreCreateCase/GetCommunityOptions",
         { "street": $("#select_street").val() },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_community"));
             });
             $("#select_community").html(option);
             $("#select_community option[value='" + $("#taskinfoList").val().split(',')[6] + "']").attr("selected", "selected");
             Select_GridBind();
         });
}
//绑定网格
function Select_GridBind() {
    collect("select_grid");
    //$("#select_grid").empty();
    $.post(
         "../../AutoPreCreateCase/GetGridOptions",
         { "street": $("#select_street").val(), "community": $("#select_community").val() },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_grid"));
             });
             $("#select_grid").html(option);
             $("#select_grid option[value='" + $("#taskinfoList").val().split(',')[7] + "']").attr("selected", "selected");
             if (data.length <= 0) {
                 $("#select_grid").prepend("<option value='00000000'>00000000</option>");
             }
             // CoordBind();
         });


}
//绑定坐标
function CoordBind() {
    $.post(
         "../../AutoPreCreateCase/GetCoordinate",
         { "streetcode": $("#select_street").val(), "gridcode": $("#select_grid").val() },
         function (data) {
             var arr = data.split(";");
             $(".hdnX").val(arr[0]);
             $(".hdnY").val(arr[1]);
             $(".span_infoX").html(arr[0]);
             $(".span_infoY").html(arr[1]);
         });
}
//奉闵上报区域
function Select_InputArea_Bind() {
    $("#InputArea").empty();
    $.post(
         "../../XinZeng/GetInputArea",
         {},
         function (data) {
             $("<option></option>").val("-1").text("").appendTo($("#InputArea"));
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#InputArea"));
             })
             if ($("#taskinfoList").val().split(',')[9] != "") {
                 $("#InputArea option[value=" + $("#taskinfoList").val().split(',')[9] + "]").attr("selected", "selected");
             }
         });
}
////绑定特征要素
//function select_spSignBind() {
//    $("#select_spSign").empty();
//    $.post(
//         "../../AutoPreCreateCase/GetSpSign",
//         {},
//         function (data) {
//             $.each(data, function (i, item) {
//                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_spSign"));
//             })
//         });
//}
//主要区域
function select_StAreaBind() {
    collect("select_StArea");
    //$("#select_StArea").empty();
    $.post(
         "../../AutoPreCreateCase/GetStArea",
         {},
         function (data) {
             var option = "<option value='-1'> </option>";
             //$("<option></option>").val("-1").text(" ").appendTo($("#select_StArea"));
             $.each(data, function (i, item) {
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_StArea"));
             });
             $("#select_StArea").html(option);
         });
    $("#select_StArea option[value='" + $("#taskinfoList").val().split(',')[8] + "']").attr("selected", "selected");
}

/*-----特征要素树-------*/
var SpSignSetting = {
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
        onClick: SpSignonClick,
        onCheck: SpSignCheckCount
    }

};

function SpSignonClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(ID_SpSign_Tree);
    if (treeNode != null) {
        if (treeNode.checked == true) {
            treeNode.checked = false;
            zTree.updateNode(treeNode, false);
        }
        else {
            treeNode.checked = true;
            zTree.updateNode(treeNode, true);
        }
        SpSignCheckCount();
    }
}

function SpSignCheckCount(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(ID_SpSign_Tree),
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
    $(ID_SpSign_Text).val(checkNameList.substring(0, checkNameList.length - 1).replace("全部,", ""));
    $(ID_SpSign_Code).val(checkCodeList.substring(0, checkCodeList.length - 1).indexOf("0,") == 0 ? checkCodeList.substring(0, checkCodeList.length - 1).substring(2) : checkCodeList.substring(0, checkCodeList.length - 1));
}
function spsign_Bind() {
    $.post("../../AutoPreCreateCase/GetSpSign", {}, function (msg) {
        var cacheDeptData = JSON.parse(msg);

        $.fn.zTree.init($("#" + ID_SpSign_Tree), SpSignSetting, cacheDeptData);
    });
}
/*-----------------*/

//数据校验
function isValid(tempData) {
    if (tempData["hidInfosourceid"] == "10" || tempData["hidInfosourceid"] == "2" || tempData["hidInfosourceid"] == "68") {
        if (tempData["txt_ExecuteDeptCode"] == "XT001" || tempData["txt_ExecuteDeptCode"] == "XT003") {
            alert("12345和12319案件不能派回市级平台!");
            return false;
        }
    }
    if (tempData["select_Caseproperty"] == null || tempData["select_Caseproperty"] == "") {
        alert("案件属性不能为空!");
        return false;
    }
    if (tempData["select_BigClass"] == null || tempData["select_BigClass"] == "") {
        alert("案件大类不能为空!");
        return false;
    }
    if (tempData["select_SmallClass"] == null || tempData["select_SmallClass"] == "") {
        alert("案件小类不能为空!");
        return false;
    }
    if (isSonClass) {
        if (tempData["select_SonClass"] == null || tempData["select_SonClass"] == "") {
            alert("案件子类不能为空!");
            $("#select_SonClass").focus();
            return false;
        }
    }
    if (isManage) {
        if ($("#select_mangageContent").val() == null || $("#select_mangageContent").val() == "") {
            alert("管理要点不允许为空!");
            $("#select_mangageContent").focus();
            return false;
        }
    }
    if ($("#oldGrid").css("display") != "none") {
        if (tempData["select_street"] == null || tempData["select_street"] == "") {
            alert("请选择街镇！");
            $("#select_street").focus();
            return false;
        }
        if (tempData["select_grid"] == "" || tempData["select_grid"] == null) {
            alert("请选择网格！");
            $("#select_grid").focus();
            return false;
        }
        if (tempData["hdnX"] == "0" || tempData["hdnX"] == "0.00") {
            alert("坐标不允许为空");
            return false;
        }
        if (tempData["hdnY"] == "0" || tempData["hdnY"] == "0.00") {
            alert("坐标不允许为空");
            return false;
        }
    }
    else {
        if (tempData["select_new_street"] == null || tempData["select_new_street"] == "") {
            alert("请选择所属街道");
            return false;
        }
        if (tempData["select_new_grid"] == null || tempData["select_new_grid"] == "") {
            alert("请选择网格编号");
            return false;
        }
        if (tempData["hdnX_New"] == "0" || tempData["hdnX_New"] == "0.00") {
            alert("坐标不允许为空");
            return false;
        }
        if (tempData["hdny_New"] == "0" || tempData["hdny_New"] == "0.00") {
            alert("坐标不允许为空");
            return false;
        }
    }
    if ($("#tr_area").css("display") != "none") {
        if (tempData["InputArea"] == "-1") {
            alert("请选择区域");
            $("#InputArea").focus();
            return;
        }
    }
    if (tempData["txt_shoulinote"] == "" || tempData["txt_shoulinote"] == null) {
        alert("受理意见不允许为空！");
        $("#txt_shoulinote").focus();
        return false;
    } else if (tempData["txt_shoulinote"].length > 500) {
        alert("受理意见字符数不能超过500个字符！");
        $("#txt_shoulinote").focus();
        return false;
    }
    
    if (tempData["chk_grubcheck"] != true) {
        if ($("#is_valid").val() == "0" || ($("#is_valid").val() == "" && $(ID_ExecuteDept_Text).val() != "")) {
            alert("请输入有效部门!");
            return false;
        }
        if (tempData["txt_note"] == "" || tempData["txt_note"] == null) {
            alert("派遣意见不允许为空！");
            $("#txt_note").focus();
            return false;
        } else if (tempData["txt_note"].length > 200) {
            alert("派遣意见字符数不能超过200个字符！");
            $("#txt_note").focus();
            return false;
        }
        if (Smartspinner_arrivetime_GetValue() == "0") {
            alert("普通派遣到场时限不能派0分钟!");
            return false;
        }
        if (Smartspinner_solvingtime_GetValue() == "0") {
            alert("普通派遣处理时限不能派0分钟!");
            return false;
        }
        if (tempData["txt_ExecuteDept"] == "" || tempData["txt_ExecuteDept"] == null) {
            alert("请选择主责部门！");
            $("#tree_executeDept").focus();
            return false;
        }
    }
    if (tempData["txt_description"] == "") {
        alert("问题描述不允许为空！");
        $("#txt_note").focus();
        return false;
    } else if (tempData["txt_description"].length > 500) {
        alert("问题描述不能超过500个字符！");
        $("#txt_note").focus();
        return false;
    }
    if (tempData["txt_address"] == "") {
        alert("发生地址不允许为空！");
        $("#txt_address").focus();
        return false;
    } else if (tempData["txt_address"].length > 50) {
        alert('发生地址输入不得超过50个字符!');
        $("#txt_address").focus();
        return false;
    }
    return true;
}

//保存
function Save() {
    $("#btnSave").hide();
    loadi = layer.load('正在保存…');
    var tempData = getElementItemValue("Operateleft");
    tempData["arrivetime"] = Smartspinner_arrivetime_GetValue();
    tempData["solvetime"] = Smartspinner_solvingtime_GetValue();
    tempData["select_StAreaName"] = $("#select_StArea").find("option:selected").text();
    tempData["select_spSign"] = $("#select_spSign").find("option:selected").val() == undefined ? "" : $("#select_spSign").find("option:selected").val();
    tempData["select_mangageContent"] = $("#select_mangageContent").val() == null ? "" : $("#select_mangageContent").val();
    var url = "";
    if (tempData["chk_grubcheck"] == true)
        url = "../../AutoPreCreateCase/AutoPreCreateCaseChuZhi?random=" + Math.random();
    else
        url = "../../AutoPreCreateCase/AutoPreCreateCaseSave?random=" + Math.random();
    //if (isValid(tempData)) {
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
   // }
}

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
                setCheckDeptCode();
                AssistDeptBind();
                SmsUserBind();
                ValidDeptcode($(ID_ExecuteDept_Code).val());
                //黄浦街镇派区中心 处理时限默认14天
                if ($(ID_ExecuteDept_Code).val() == "101" && $("#hide_areacode").val()=="01") {
                    ChangeSolvingtimeByDept();
                }
            });
        });
    });
}
function setCheckDeptCode() {
    var treeObj = $.fn.zTree.getZTreeObj(ID_ExecuteDept_Tree);
    var checkedCode = $(ID_ExecuteDept_Code).val();
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
function caseValueChanged() {
    //var ddl = document.getElementById("dllCaseValuation")/
    var ddl = $("#CaseValuation").val();
    //var index = ddl.selectedIndex;
    //var selectText = ddl.options[index].text;
    //不办理退单进入退单页面
    if (ddl == '不办理退单') {
        document.getElementById("hd_isBack").value = 'T';
    }
    else {
        document.getElementById("hd_isBack").value = 'F';
    }
}


//绑定社区
function Gis_CommunityBind(streetcode, commcode, gridcode) {
    collect("select_community");
    //$("#select_community").empty();
    $.post(
         "../../AutoPreCreateCase/GetCommunityOptions",
         { "street": streetcode },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_community"));
             });
             $("#select_community").html(option);
             $("#select_community option[value='" + commcode + "']").attr("selected", "selected");//居村
             Gis_GridBind(streetcode, commcode, gridcode);
         });
}
//绑定网格
function Gis_GridBind(streetcode,commcode, gridcode) {
    collect("select_grid");
    //$("#select_grid").empty();
    $.post(
         "../../AutoPreCreateCase/GetGridOptions",
         { "street": streetcode, "community": commcode },
         function (data) {
             var option = "";
             $.each(data, function (i, item) {
                 option += "<option value=" + item["Value"] + ">" + item["Text"] + "</option>";
                 //$("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_grid"));
             });
             $("#select_grid").html(option);
             $("#select_grid option[value='" + gridcode + "']").attr("selected", "selected");//网格
             if (data.length <= 0) {
                 $("#select_grid").prepend("<option value='00000000'>00000000</option>");
             }
         });


}

function collect(obj) {
    $("*", obj).add([obj]).each(function () {
        $.event.remove(this);
        $.removeData(this);
    });
    obj.innerHTML = "";
}

//知识库
function OpenKnowBase() {
    var res = window.showModalDialog("../KeyWordQuery.aspx?infosourceid=" + $("#hidInfosourceid").val() + "&taskid=" + $("#taskId").val(), "window", "dialogHeight:600px;dialogWidth:1300px;left=100;top=100; resizable: Yes;");
    if (res != "" && res != null) {
        $("#taskinfoList").val(res.toString());
        var typeid = res.toString().split(',')[0];

        //案件属性改变事件
        $("#select_Caseproperty").val(typeid);
        Select_BigClassBind();
    }
}
//[徐汇]12345填报
function Open12345Frm(taskId, hotlineSn) {
    //var res =
    var iWidth = 840; //弹出窗口的宽度;
    var iHeight = 500; //弹出窗口的高度;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
    window.open('../12345WriteFrm.aspx?taskId=' + taskId + '&hotlineSn=' + hotlineSn, 'window', 'status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no,left=' + iLeft + ',top=' + iTop + ',width=' + iWidth + ',height=' + iHeight + ',scrollbars=no');

    //if (res != "" && res != null) {
    //    //$("#taskinfoList").val(res.toString());
    //    //var typeid = res.toString().split(',')[0];
    //    ////案件属性改变事件
    //    //$("#select_Caseproperty").val(typeid);
    //    //Select_BigClassBind();
    //}
}
//黄浦街镇派区中心默认处理时限
function ChangeSolvingtimeByDept() {
    Smartspinner_solvingtime_SetValue('20160');
    $("#select_solvingtime option[value='" + '20160' + "']").attr("selected", "selected");
}

