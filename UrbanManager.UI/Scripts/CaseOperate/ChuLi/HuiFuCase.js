$(function () {
    //同步提交，保证每个下拉框可以赋值成功
    $.ajaxSetup({
        async: false
    });
    initSelect();//初始化下拉框

    $("#select_IsContact").change(function () {
        //已联
        if ($("#select_IsContact").val() == "1") {
            $("#select_NonContactReason").hide();
            $("#sp_NonContactReason").hide();
            $("#txt_firstContractTime").removeAttr("disabled");
            $("#sp_required_firstContractTime").show();
            $("#txt_ContactPerson").removeAttr("disabled");
            $("#sp_required_ContactPerson").show();
        }
        else {
            $("#select_NonContactReason").removeAttr("disabled").show();
            $("#sp_NonContactReason").show();
            $("#txt_firstContractTime").attr("disabled", "disabled").val('');
            $("#sp_required_firstContractTime").hide();
            $("#txt_ContactPerson").val('').attr("disabled", "disabled");
            $("#sp_required_ContactPerson").hide();
        }
    })

    $("#select_FactType").change(function () {
        if ($("#select_FactType").val() != "0") {
            $("#factNote_required").show();
            $("#txt_FactNote").val("");
        }
        else {
            $("#factNote_required").hide();
            $("#txt_FactNote").val("事实认定属实。");
        }
    })
    $("#select_AppealType").change(function () {
        if ($("#select_AppealType").val() != "0") {
            $("#appealNote_required").show();
            $("#txt_AppealNote").val("");
        }
        else {
            $("#appealNote_required").hide();
            $("#txt_AppealNote").val("诉求合理合法。");
        }
    })




});

//初始化下拉框
function initSelect() {
    NonContactReasonBind();
    FactTypeBind();
    AppealTypeBind();
    SceneBind();
    IsOpenBind();
    select_IsOverBind();
    select_leadExedeptBind();
    select_typeBind();
    select_IsManyiBind();
    select_reasonBind();
    select_wayBind();
}
//未联系原因
function NonContactReasonBind() {
    $("#select_NonContactReason").empty();
    $.post(
         "../../HuiFuCase/GetNonContactReason",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_NonContactReason"));
             })
         });
}

//事实认定
function FactTypeBind() {
    $("#select_FactType").empty();
    $.post(
         "../../HuiFuCase/GetFactType",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_FactType"));
             })
             $("#select_FactType").change();
         });
}
//诉求认定
function AppealTypeBind() {
    $("#select_AppealType").empty();
    $.post(
         "../../HuiFuCase/GetAppealType",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_AppealType"));
             })
             $("#select_AppealType").change();
         });
}

//是否公开
function IsOpenBind() {
    $("#select_IsOpen").empty();
    $.post(
         "../../HuiFuCase/GetIsOpen",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsOpen"));
             })
         });
}
//现场查看
function SceneBind() {
    $("#select_SceneType").empty();
    $.post(
         "../../HuiFuCase/GetSceneType",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_SceneType"));
             })
         });
}
//绑定处理结果
function select_IsOverBind() {
    $("#select_IsOver").empty();
    if (($("#hd_solvingResult").val() == "0" || $("#hd_solvingResult").val() == "3")) {
        $("<option></option>").val("0").text("实际解决").appendTo($("#select_IsOver"));
        return false;
    }
    $.post(
         "../../HuiFuCase/GetIsOver",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsOver"));
             })
         });
}

//绑定处置部门
function select_leadExedeptBind() {
    //如果值为1，则加载处置部门
    if ($("#hid_Exedept").val() == "1") {
        $("#select_leadExedept").empty();
        $.post(
             "../../HuiFuCase/GetLeadExedept",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_leadExedept"));
                 })
                 select_leadHeadBind();
             });
    }
}
//绑定处置部门负责人
function select_leadHeadBind() {
    if ($("#hid_Exedept").val() == "1") {
        $("#select_leadHead").empty();
        $.post(
             "../../HuiFuCase/GetLeadHead",
             { leadExedept: $("#select_leadExedept").val() },
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_leadHead"));
                 })
                 select_leaderBind();
             });
    }
}
//绑定处置部门负责人
function select_leaderBind() {
    if ($("#hid_Exedept").val() == "1") {
        $("#select_leader").empty();
        $.post(
             "../../HuiFuCase/GetLeader",
             { leadExedept: $("#select_leadExedept").val(), leadHeadUser: $("#select_leadHead").val() },
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_leader"));
                 })
             });
    }
}
//责任判断
function select_typeBind() {
    $("#select_type").empty();
    $.post(
         "../../HuiFuCase/GetResType",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_type"));
             })
         });
}

//回访满意度
function select_IsManyiBind() {
    $("#select_IsManyi").empty();
    $.post(
         "../../HuiFuCase/GetIsManY",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsManyi"));
             })
         });
}

//处理不满意原因
function select_reasonBind() {
    $("#select_reason").empty();
    $.post(
         "../../HuiFuCase/GetBMY",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_reason"));
             })
         });
}

//答复方式
function select_wayBind() {
    $("#select_way").empty();
    $.post(
         "../../HuiFuCase/GetAnswerWay",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_way"));
             })
         });
}


//保存事件
function Save() {
    loadi = layer.load('正在保存…');
    var tempData = getElementItemValue("Operateleft");
    tempData["select_leadername"] = $("#select_leader").find("option:selected").text();
    tempData["select_leadHeadname"] = $("#select_leadHead").find("option:selected").text();

    //事实认定诉求认定等
    if ($("#factInfo").is(":visible")) {
        tempData["factInfo"] = "1";
    }
    else {
        tempData["factInfo"] = "0";
    }

    //责任判断
    if ($("#responsible").is(":visible")) {
        tempData["responsible"] = "1";
    }
    else {
        tempData["responsible"] = "0";
    }

    //热线办理
    if ($("#firstContactInfo").is(":visible")) {
        tempData["firstContactInfo"] = "1";
    }
    else {
        tempData["firstContactInfo"] = "0";
    }

    //回复方式
    if ($("#huiFuStyleInfo").is(":visible")) {
        tempData["huiFuStyleInfo"] = "1";
    }
    else {
        tempData["firstContactInfo"] = "0";
        tempData["huiFuStyleInfo"] = "0";
    }

    //闵行 分管领导和负责人职位差异化
    if ($("#leadExeHidtr").is(":visible")) {
        tempData["hid_lead"] = "1";
    }
    else if ($("#leadInfo_HP").is(":visible")) {
        tempData["hid_lead"] = "2";
    }
    else {
        tempData["hid_lead"] = "0";
    }
    if (isValid(tempData)) {
        $.post(
             ("../../HuiFuCase/HuiFuCase"),
             { arrstring: JSON.stringify(tempData) },
             function (data) {
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     alert(message);
                     GoDestinationURL()
                 }
                 else
                     alert(message);
             });
    }
}
//数据校验
function isValid(tempData) {
    if ($("#factInfo").is(":visible")) {
        if ($.trim($("#txt_FactNote").val()) == "") {
            alert("事实认定说明不能为空！");
            return false;
        }
        if ($.trim($("#txt_AppealNote").val()) == "") {
            alert("诉求认定说明不能为空！");
            return false;
        }
    }
    if ($("#firstContactInfo").is(":visible")) {
        //首次接单
        //不显示可修改checkbox
        if (!$("#isUpdate").is(":visible")) {
            if ($("#select_IsContact").val() == "1") {
                if (tempData["txt_firstContractTime"] == "") {
                    alert("先行联系时间不能为空！");
                    return false;
                }
                if ($.trim(tempData["txt_ContactPerson"]) == "") {
                    alert("联系人不能为空！");
                    return false;
                }
            }
        }
        //非首次
        if ($("#isUpdate").is(":visible") || $("#chk_update").is(":checked")) {
            if ($("#select_IsContact").val() == "1") {
                if (tempData["txt_firstContractTime"] == "") {
                    alert("先行联系时间不能为空！");
                    return false;
                }
                if ($.trim(tempData["txt_ContactPerson"]) == "") {
                    alert("联系人不能为空！");
                    return false;
                }
            }
        }
    }
    if ($.trim(tempData["txt_ReplyNote"]) == "") {
        alert("答复要点不能为空！");
        return false;
    }
    if ($.inArray($("#select_IsManyi").find("option:selected").val(), ["1", "2", "3"]) != -1) {
        if ($.trim($("#txt_Citizen_FeedbackNote").val()) == "") {
            alert('市民反馈说明不能为空!');
            return false;
        }
    }
    if ($.trim(tempData["txt_replayTime"]) == "") {
        alert("答复时间不能为空！");
        return false;
    }
    if ($.trim(tempData["select_IsOver"]) == "") {
        alert("处理结果不能为空！");
        return false;
    }
    if ($("#tr_IllegalInfo").is(":visible") && $.trim(tempData["select_IllegalType"]) == "") {
        alert("请选择违章搭建类型！");
        return false;
    }
    if ($("#tr_IllegalInfo").is(":visible") && $("#txt_IllegalArea").is(":visible") && $.trim(tempData["txt_IllegalArea"]) == "") {
        alert("请输入违章搭建面积！");
        return false;
    }
    if ($("#tr_RentInfo").is(":visible") && $.trim(tempData["select_RentType"]) == "") {
        alert("请选择群租类型！");
        return false;
    }
    if ($.trim(tempData["txt_Description"]) == "") {
        alert("回复内容不能为空！");
        return false;
    }
    return true;
}