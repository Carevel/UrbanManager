$(function () {
    $.ajaxSetup({
        async: false
    })
    FeedBack.Init();
    CaseProcess.Init();
    $("#btnSave").click(function () {
        FeedBack.Save();
    })
})
//js获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}
var CaseProcess = {
    Init: function () {
        this.InitCaseProcess();
    },
    InitCaseProcess: function () {
        var taskId = GetQueryString('taskid');
        $.post(
             "../../FeedBack/GetCaseProcess",
             { taskId: taskId },
             function (data) {
                 $.each(data, function (i, item) {
                     $('<tr style="cursor:pointer;"><td>' + item.itemname + '</td><td>' + item.username + '</td><td>' + item.deptname + '</td><td title="' + item.note + '">' + item.note + '</td><td>' + item.LEADERUSERNAME + '</td><td>' + item.HEADUSERNAME + '</td><td>' + item.inserttime + '</td></tr>').bind("click", function () {
                         if (item.OPERATETYPE != 'T' && item.OPERATETYPE != 'H' && item.OPERATETYPE != '-') {
                             CaseProcess.ShowSelectedCaseProcessDetail(item.TaskID, item.ID, item.recordid, item.OPERATETYPE, item.tablename, item.TYPE);
                         }
                         else {
                             CaseProcess.ShowSeletedMessageDetail(item.TaskID, item.ID);
                         }
                         $(this).css("background", "#CCC").siblings().css("background", "");
                     }).appendTo($("#CaseProcessDataList"));
                     if (i == 0) {
                         CaseProcess.ShowSelectedCaseProcessDetail(item.TaskID, item.ID, item.recordid, item.OPERATETYPE, item.tablename, item.TYPE);
                     }
                 })
             });
    },
    ShowSelectedCaseProcessDetail: function (TaskId, Id, RecordId, OperateType, TableName, Type) {
        $("#CaseProcessDetailDataList").text('');
        $.post(
            "../../FeedBack/GetCaseProcessDetails",
            { TaskId: TaskId, RecordId: RecordId, OperateType: OperateType, TableName: TableName },
            function (data) {
                var ProcessDetailHtml = "";
                $.each(data, function (i, item) {
                    ProcessDetailHtml += '<tr><td style="width: 20%">' + item.StringName + '</td><td style="width: 80%">' + item.StringValue + ' </td></tr>';
                })
                $(ProcessDetailHtml).appendTo($("#CaseProcessDetailDataList"));
            });
    },
    ShowSeletedMessageDetail: function (TaskId, RecordId) {
        $("#CaseProcessDetailDataList").text('');
        $.post(
            "../../FeedBack/GetCaseMessageDetails",
            { TaskId: TaskId, RecordId: RecordId },
            function (data) {
                data = data[0];
                var ProcessDetailHtml = '<tr><td class="key" style="width: 72px; height: 45px;"></td><td class="value" style="font-weight: bold;">' + data.ItemName + '</td><td class="key" style="width: 72px;">任务编号</td><td class="value" style="font-weight: bold">' + data.TaskId + '</td></tr>';
                ProcessDetailHtml += '<tr><td class="key" style="width: 72px; height: 30px;">发送人</td><td class="value" >' + data.UserName + '[' + data.DeptName + ']</td><td class="key" style="width: 72px;">发送时间</td><td class="value">' + data.InsertTime + '</td></tr>';
                if (data.ToUserName) {
                    ProcessDetailHtml += '<tr class="tr2"><td class="key" style="height: 30px;">接收人</td><td class="value"  colspan="3">' + data.ToUserName + '</td></tr>';
                }
                else {
                    ProcessDetailHtml += '<tr><td class="key" style="height: 30px;">内容</td><td class="value" colspan="3" style="white-space: normal"><div style="white-space:normal;height: 100px; overflow-y: auto;">' + data.Note + '</div></td> </tr>';
                }
                $(ProcessDetailHtml).appendTo($("#CaseProcessDetailDataList"));
            });
    }
}
var FeedBack = {
    TaskInfo: {},
    layerIndexParameters: {},
    Init: function () {
        this.InitNonContactReason(),
        this.InitFactType(),
        this.InitAppealType(),
        this.InitIsOpen(),
        this.InitSceneType(),
        this.InitIsOver(),
        this.InitIsManyi(),
        this.initNonSatisfiReason(),
        this.InitAnswerWay(),
        this.InitBanLiResult(),
        this.InitTaskInfo();
        this.InitDefaultFeedBackValues(),
        this.InitChangesEvent()
    },
    InitTaskInfo: function () {
        var taskId = GetQueryString('taskid');
        if (taskId) {
            $.post(
             "../../FeedBack/GetTaskInfo",
             { taskId: taskId },
             function (data) {
                 FeedBack.TaskInfo = data;
                 if ((FeedBack.TaskInfo.InfoSourceID == '10' && FeedBack.TaskInfo.ReportDept == '10' && $.inArray(FeedBack.TaskInfo.ServiceType, ["0", "3"]) < 0) || (FeedBack.TaskInfo.InfoSourceID == '68' && FeedBack.TaskInfo.ReportDept == '2')) {
                     $("#factInfo").show();
                 }
                 else {
                     $("#factInfo").hide();
                 }
             })
        }
    },
    InitChangesEvent: function () {
        $("#select_IsContact").change(function () {
            //已联
            if ($("#select_IsContact").val() == "1") {
                $("#select_NonContactReason").hide();
                $("#sp_NonContactReason").hide();
                $("#ContactTimeAndPerson").show();
                $("#hd_txt_firstContractTime").hide();
                $("#txt_firstContractTime").show();
            }
            else {
                $("#select_NonContactReason").show();
                $("#sp_NonContactReason").show();
                $("#ContactTimeAndPerson").hide();
                $("#txt_firstContractTime").val("");
                $("#txt_ContactPerson").val("");
                $("#hd_txt_firstContractTime").attr("readonly", "true").show();
                if (difConfig.getValueByEname('0197') == '1') {
                    $("#select_IsManyi").val('3');
                }
            }
        })
        $("#select_IsManyi").change(function () {
            if ($("#select_IsManyi").val() == "1") {
                $("#select_reasonTr").show();
            }
            else {
                $("#select_reasonTr").hide();
            }
            //当是否满意选择“不满意”、“认可”、“未评价”时需要填写市民反馈说明
            if ($.inArray($("#select_IsManyi").find("option:selected").val(), ["1", "2", "3"]) != -1) {
                $("#sp_Citizen_FeedbackNote").show();
            }
            else {
                $("#sp_Citizen_FeedbackNote").hide();
            }
        })
        $("#select_FactType").change(function () {
            if ($("#select_FactType").val() != "0") {
                $("#factNote_required").show();
            }
            else {
                $("#factNote_required").hide();
            }
        })
        $("#select_AppealType").change(function () {
            if ($("#select_AppealType").val() == "1") {
                $("#appealNote_required").show();
            }
            else {
                $("#appealNote_required").hide();
            }
        })
    },
    //未联系原因
    InitNonContactReason: function () {
        $("#select_NonContactReason").empty();
        $.post(
             "../../FeedBack/GetNonContactReason",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_NonContactReason"));
                 })
             });
    },
    //事实认定
    InitFactType: function () {
        $("#select_FactType").empty();
        $.post(
             "../../FeedBack/GetFactType",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_FactType"));
                 })
             });
    },
    //诉求认定
    InitAppealType: function () {
        $("#select_AppealType").empty();
        $.post(
             "../../FeedBack/GetAppealType",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_AppealType"));
                 })
             });
    },
    //是否公开
    InitIsOpen: function () {
        $("#select_IsOpen").empty();
        $.post(
             "../../FeedBack/GetIsOpen",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsOpen"));
                 })
             });
    },
    //现场查看
    InitSceneType: function () {
        $("#select_SceneType").empty();
        $.post(
             "../../FeedBack/GetSceneType",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_SceneType"));
                 })
             });
    },
    //绑定处理结果
    InitIsOver: function () {
        $("#select_IsOver").empty();

        $.post(
             "../../FeedBack/GetIsOver",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsOver"));
                 })

             });
    },
    //回访满意度
    InitIsManyi: function () {
        $("#select_IsManyi").empty();
        $.post(
             "../../FeedBack/GetIsManY",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsManyi"));
                 })
             });
    },
    //处理不满意原因
    initNonSatisfiReason: function () {
        $("#select_reason").empty();
        $.post(
             "../../FeedBack/GetBMY",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_reason"));
                 })
             });
    },
    //答复方式
    InitAnswerWay: function () {
        $("#select_way").empty();
        $.post(
             "../../FeedBack/GetAnswerWay",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_way"));
                 })
             });
    },
    //办理结果
    InitBanLiResult: function () {
        var tempData = getElementItemValue("Operate");
        $("#select_BanliResult").empty();
        $.post(
             "../../FeedBack/GetBanLiResult",
             { arrstring: JSON.stringify(tempData) },
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_BanliResult"));
                 })
             });
    },
    ValidFeedback: function (tempData) {
        if (tempData["txt_firstContractTime"] == "" && $("#ContactTimeAndPerson").is(":visible")) {
            alert("联系时间不能为空！");
            return false;
        }
        if ($.trim(tempData["txt_ContactPerson"]) == "" && $("#ContactTimeAndPerson").is(":visible")) {
            alert("联系人不能为空！");
            return false;
        }
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
        //当是否满意选择“不满意”、“认可”、“未评价”时需要填写市民反馈说明
        if ($.inArray($("#select_IsManyi").find("option:selected").val(), ["1", "2", "3"]) != -1) {
            if ($.trim($("#txt_Citizen_FeedbackNote").val()) == "") {
                alert('市民反馈说明不能为空!');
                return false;
            }
        }
        if ($.trim($("#txt_ReplyNote").val()) == "") {
            alert('答复要点不能为空!');
            return false;
        }
        if (tempData["txt_replayTime"] == "") {
            alert("答复时间不能为空！");
            return false;
        }
        if ($.trim($("#txtDescription").val()) == "") {
            alert('反馈结论不能为空!');
            return false;
        }
        if ($("#txtDescription").val().length > 500) {
            alert('反馈结论不能超过500个字符');
            return false;
        }
        $("#txtDescription").val($("#txtDescription").val().replace(new RegExp(/(')/g), "''"));
        return true;
    },
    InitDefaultFeedBackValues: function () {
        var taskId = GetQueryString('taskid');
        if (taskId) {
            $.post(
             "../../FeedBack/GetSolvingInfoByTaskId",
             { taskId: taskId },
             function (data) {
                 data = data[0];
                 if (data["IsContact"]) {
                     $("#select_IsContact").find("option[value='" + data["IsContact"] + "']").attr("selected", true);
                     //已联
                     if ($("#select_IsContact").val() == "1") {
                         $("#select_NonContactReason").hide();
                         $("#sp_NonContactReason").hide();
                         $("#ContactTimeAndPerson").show();
                         $("#hd_txt_firstContractTime").hide();
                     }
                     else {
                         $("#select_NonContactReason").show();
                         $("#sp_NonContactReason").show();
                         $("#ContactTimeAndPerson").hide();
                         $("#txt_firstContractTime").val("");
                         $("#txt_ContactPerson").val("");
                         $("#hd_txt_firstContractTime").attr("readonly", "true").show();
                     }
                 }
                 //未联原因
                 if (data["NonContactReason"]) {
                     $("#select_NonContactReason").val(data["NonContactReason"]);
                 }
                 //联系时间
                 if (data["FirstContractTime"]) {
                     $("#txt_firstContractTime").val(data["FirstContractTime"]);
                 }
                 //联系人
                 if (data["ContactPerson"]) {
                     $("#txt_ContactPerson").val(data["ContactPerson"]);
                 }
                 //到场时间
                 if (data["ArriveTime"]) {
                     $("#txt_arriveTime").val(data["ArriveTime"]);
                 }
                 //到场人员
                 if (data["PresentPerson"]) {
                     $("#txt_arrivePerson").val(data["PresentPerson"]);
                 }
                 //完成时间
                 if (data["SolvingTime"]) {
                     $("#txt_solveTime").val(data["SolvingTime"]);
                 }
                 //处理人员
                 if (data["SolvePerson"]) {
                     $("#txt_solvePerson").val(data["SolvePerson"]);
                 }
                 //处理结果********
                 if (data["SolvingResult"]) {
                     $("#select_IsOver").val(data["SolvingResult"]);
                     $("#select_BanliResult").val(data["SolvingResult"]);
                 }
                 //是否满意*******
                 if (data["Uservaluate"]) {
                     $("#select_IsManyi").val(data["Uservaluate"]);
                     if ($("#select_IsManyi").find("option:selected").val() == "1") {
                         if (data["Solvingdisreason"]) {
                             $("#select_reason").val(data["Solvingdisreason"]);
                         }
                         $("#select_reasonTr").show();
                     }
                     else {
                         $("#select_reasonTr").hide();
                     }
                     //当是否满意选择“不满意”、“认可”、“未评价”时需要填写市民反馈说明
                     if ($.inArray($("#select_IsManyi").find("option:selected").val(), ["1", "2", "3"]) != -1) {
                         $("#sp_Citizen_FeedbackNote").show();
                     }
                     else {
                         $("#sp_Citizen_FeedbackNote").hide();
                     }
                 }
                 else {
                     $("#select_IsManyi").val('0');
                     $("#sp_Citizen_FeedbackNote").hide();
                 }
                 //市民反馈说明
                 if (data["Citizen_FeedbackNote"]) {
                     $("#txt_Citizen_FeedbackNote").val(data["Citizen_FeedbackNote"]);
                 }
                 //事实认定
                 if (data["FactType"]) {
                     $("#select_FactType").val(data["FactType"]);
                 }
                 //事实认定说明
                 if (data["FactNote"]) {
                     $("#txt_FactNote").val(data["FactNote"]);
                 }
                 //现场查看
                 if (data["SceneType"]) {
                     $("#select_SceneType").val(data["SceneType"]);
                 }
                 //诉求认定
                 if (data["AppealType"]) {
                     $("#select_AppealType").val(data["AppealType"]);
                 }
                 //诉求认定说明
                 if (data["AppealNote"]) {
                     $("#txt_AppealNote").val(data["AppealNote"]);
                 }
                 //答复要点
                 if (data["ReplyNote"]) {
                     $("#txt_ReplyNote").val(data["ReplyNote"]);
                 }
                 //答复方式*****
                 if (data["Huifufangshi"]) {
                     $("#select_way").val(data["Huifufangshi"]);
                 }
                 //答复时间
                 if (data["ReplyTime"]) {
                     $("#txt_replayTime").val(data["ReplyTime"]);
                 }
                 //是否公开
                 if (data["IsOpen"]) {
                     $("#select_IsOpen").val(data["IsOpen"]);
                 }
                 if (data["SolvingPerson"]) {
                     $("#Level3_Handler").val(data["SolvingPerson"]);
                 }
                 if (data["Description"]) {
                     $("#txtDescription").val(data["Description"]);
                 }
             })
        }
        var casevaluation = decodeURI(GetQueryString('CaseValuation'));
        //将结案评判中的默认值带到反馈办理结果
        $("#BANLIRESULT option:contains('" + casevaluation + "')").attr("selected", "selected");
    },
    Save: function () {
        var loadIndexParameter = layer.load(1, { shade: 0.4 });
        var tempData = getElementItemValue("GridWindow");
        tempData["solvingId"] = GetQueryString("solvingid");
        tempData["taskId"] = GetQueryString("taskId");
        tempData["categoryId"] = GetQueryString("categoryId");
        if (FeedBack.ValidFeedback(tempData)) {
            $.post(
                 ("../../FeedBack/SolveCase"),
                 { arrstring: JSON.stringify(tempData) },
                 function (data) {
                     var arr = data.split(";");
                     var result = arr[0];
                     var message = arr[1];
                     if (result == "True") {
                         alert(message);
                         parent.$("#popMainIframe").attr("rel", "True");
                         parent.layer.closeAll();
                     }
                     else {
                         alert(message);
                         layer.close(loadIndexParameter);
                     }
                 })
        }
    },
};