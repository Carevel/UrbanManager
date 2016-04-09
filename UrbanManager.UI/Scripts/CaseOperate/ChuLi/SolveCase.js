
$(function () {
    initSelect();//初始化下拉框
});

//初始化下拉框
function initSelect() {
    select_FacilTypeBind();
    select_IsOverBind();
    select_leadExedeptBind();
    select_listBind();
    select_RenovateWayBind();
    //getElementItemValue("GridWindow");
}

//绑定责任归属
function select_FacilTypeBind() {
    $("#select_FacilType").empty();
    $.post(
         "../../SolveCase/GetFacilType",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_FacilType"));
             })
         });
}

//绑定处理结果
function select_IsOverBind() {
    $("#select_IsOver").empty();
    $.post(
         "../../SolveCase/GetIsOver",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsOver"));
             })
         });
}

//绑定处置部门
function select_leadExedeptBind() {
    if ($("#hid_Dept_Leader").val() == "1") {
        $("#select_leadExedept").empty();
        $.post(
             "../../SolveCase/GetLeadExedept",
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
    if ($("#hid_Dept_Leader").val() == "1") {
        $("#select_leadHead").empty();
        $.post(
             "../../SolveCase/GetLeadHead",
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
    if ($("#hid_Dept_Leader").val() == "1") {
        $("#select_leader").empty();
        $.post(
             "../../SolveCase/GetLeader",
             { leadExedept: $("#select_leadExedept").val(), leadHeadUser: $("#select_leadHead").val() },
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_leader"));
                 })
             });
    }
}
//绑定回复形式
function select_listBind() {
    $("#select_list").empty();
    $.post(
         "../../SolveCase/GetHuiFuStyle",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_list"));
             })
         });
}

//绑定整治方式
function select_RenovateWayBind() {
    $("#select_RenovateWay").empty();
    $.post(
         "../../SolveCase/GetRenovateWay",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_RenovateWay"));
             })
         });
}
//时间比较
function dateCompare(data1, data2) {
    var d1 = new Date(data1.replace(/-/g, "/"));
    var d2 = new Date(data2.replace(/-/g, "/"));
    if (d1 > d2) {
        return true;
    }
    else {
        return false;
    }
}

//保存事件
function Save() {
    loadi = layer.load('正在保存…');
    var tempData = getElementItemValue("GridWindow");
    tempData["select_leadExedeptname"] = $("#select_leadExedept").find("option:selected").text();
    tempData["select_leadHeadname"] = $("#select_leadHead").find("option:selected").text();
    tempData["select_leadername"] = $("#select_leader").find("option:selected").text();
    if (isValid(tempData)) {
        //$.post(
        //     ("../../SolveCase/SolveSave?random="+Math.random()),
        //     { arrstring: JSON.stringify(tempData) },
        //     function (data) {
        //         var arr = data.split(";");
        //         var result = arr[0];
        //         var message = arr[1];
        //         if (result == "True") {
        //             alert(message);
        //             GoDestinationURL()
        //         }
        //         else
        //             alert(message);
        //     });
        $.post("../../SolveCase/SolveSave", { "arrstring": JSON.stringify(tempData) }, function (msg) {
            var arr = msg.split(";");
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
function isValid(tempData) {
    if ($("#txt_arriveTime").is(":visible")) {
        if (tempData["txt_arriveTime"] == "") {
            mess = "到场时间不允许为空！";
            alert(mess);
            return false;
        }
        if (new Date(tempData["txt_arriveTime"].replace(/-/g, "/")) > new Date()) {
            alert("到场时间不能早于当前时间!");
            return false;
        }
    }
    if (tempData["txt_arrivePerson"] == "") {
        mess = "到场人员不允许为空！";
        alert(mess);
        return false;
    }
    if (tempData["txt_solveTime"] == "") {
        mess = "完成时间不允许为空！";
        alert(mess);
        return false;
    }
    if (new Date(tempData["txt_solveTime"].replace(/-/g, "/")) > new Date()) {
        alert("完成时间不能大于当前时间!");
        return false;
    }
    if (tempData["txt_solvePerson"] == "") {
        mess = "处理人员不允许为空！";
        alert(mess);
        return false;
    }
    if (!dateCompare(tempData["txt_solveTime"], tempData["txt_arriveTime"])) {
        alert("完成时间不能早于到场时间!");
        return false;
    }
    if ($("#txt_firstContractTime").is(":visible")) {
        if (tempData["txt_firstContractTime"] == "") {
            mess = "首次联系时间不允许为空！";
            alert(mess);
            return false;
        }
        if (!dateCompare(tempData["txt_solveTime"], tempData["txt_firstContractTime"])) {
            alert("首次联系时间必须小于完成时间!");
            return false;
        }
    }
    if (tempData["txt_Description"] == "") {
        alert("处理情况不能为空!");
        return false;
    }
    return true;
}