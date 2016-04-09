$(function () {
    $.ajaxSetup({
        async: false
    })
    difConfig.init();
    if (difConfig.getValueByEname("0232") == '1') {
        $("#solveBtn").show();
        $("#SolveWindow").show();
        SuperviseCase.init();
    }
})

var difConfig = {
    config: {},
    init: function () {
        $.post(
                 "../../setSysConfig/getSysConfig",
                 function (data) {
                     if (data.length > 0) {
                         difConfig.config = data;
                     }
                 });
    },
    getValueByEname: function (ename) {
        var value = '0';
        for (var i = 0; i < difConfig.config.length; i++) {
            if (difConfig.config[i].ename == ename) {
                value = difConfig.config[i].configValue;
                return value;
            }
        }
        return value;
    },
    setValueByEname: function (ename) {
        //to be continue
    }
};
var SuperviseCase = {
    init: function () {
        this.initNonContactReasonType();
        this.initFactType();
        this.initAppealType();
        this.initIsOpenType();
        this.initSenceType();
        this.initNotSatisfyType();
        this.initIsSatisfyType();
        this.initAnswerType();
        this.initBanLiType();
        this.initValues();
    },
    initNonContactReasonType: function () {
        $("#select_NonContactReason").empty();
        $.post(
             "../../JieAn/GetNonContactReason",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_NonContactReason"));
                 })
             });
    },
    initFactType: function () {
        $("#select_FactType").empty();
        $.post(
             "../../JieAn/GetFactType",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_FactType"));
                 })
             });
    },
    initAppealType: function () {
        $("#select_AppealType").empty();
        $.post(
             "../../JieAn/GetAppealType",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_AppealType"));
                 })
             });
    },
    initIsOpenType: function () {
        $("#select_IsOpen").empty();
        $.post(
             "../../JieAn/GetIsOpen",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsOpen"));
                 })
             });
    },
    initSenceType: function () {
        $("#select_SceneType").empty();
        $.post(
             "../../JieAn/GetSceneType",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_SceneType"));
                 })
             });
    },
    initIsOverType: function () {
        $("#select_IsOver").empty();

        $.post(
             "../../JieAn/GetIsOver",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsOver"));
                 })

             });
    },
    initAnswerType: function () {
        $("#select_way").empty();
        $.post(
             "../../JieAn/GetAnswerWay",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_way"));
                 })
             });
    },
    initNotSatisfyType: function () {
        $("#select_reason").empty();
        $.post(
             "../../JieAn/GetBMY",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_reason"));
                 })
             });
    },
    initIsSatisfyType: function () {
        $("#select_IsManyi").empty();
        $.post(
             "../../JieAn/GetIsManY",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_IsManyi"));
                 })
             });
    },
    initBanLiType: function () {
        var tempData = getElementItemValue("Operate");
        $("#BANLIRESULT").empty();
        $.post(
             "../../JieAn/GetBanLiResult",
             { arrstring: JSON.stringify(tempData) },
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#BANLIRESULT"));
                 })
             });
    },
    initValues: function () {
        var taskId = $("#TaskId").val();
        if (taskId) {
            $.post(
             "../../JieAn/GetValuesByTaskId",
             { taskId: taskId },
             function (data) {
                 //alert(data["IsContact"]);//是否联系**********
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
                         if (difConfig.getValueByEname('0197') == '1') {
                             $("#select_IsManyi").val('3');
                         }
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
                     $("#BANLIRESULT").find("option[value='" + data["SolvingResult"] + "']").attr("selected", true);
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
                 if (data["CITIZEN_FEEDBACKNOTE"]) {
                     $("#txt_Citizen_FeedbackNote").val(data["CITIZEN_FEEDBACKNOTE"]);
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
    }
};

