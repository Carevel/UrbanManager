$(function () {
    $.ajaxSetup({
        async: false
    });
    VerifyApplyEndCase.Init();
    //默认选项卡切换
    $("#normaltab").tabso({
        cntSelect: "#normalcon",
        tabEvent: "click",
        tabStyle: "normal"
    });
    caseOperateLayout();
    //办理进度高度设置（每个操作页面单独的）
    $("#CaseProgressdiv").height($("#tabsl_gis").height() - 495);
    $("#btnSave").click(function () {
        VerifyApplyEndCase.Submit();
    })
    $("#btnCancel").click(function () {
        VerifyApplyEndCase.Cancel();
    })
})

function GisWindDisplay(ClickType) {
    if (ClickType == "1") {
        $("#GridWindow").show();
        $("#GidCon").hide();
    }
    else {
        $("#GridWindow").hide();
        $("#GidCon").show();
    }
}
//附件上传+多媒体
function OpenFilterMediaLoad(taskid, CaseStatus, Category, userCardId, deptCode, categoryId) {
    var ran = Math.random() * 1000;
    var url = "../MediaFileViewFrame.aspx?taskid=" + taskid + "&userCardId=" + userCardId + "&deptCode=" + deptCode + "&CaseStatus=" + CaseStatus + "&Category=" + Category + "&ran=" + ran + "&categoryId=" + categoryId
    var openWindow = window.open(url, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=50,top=50,width=680,height=660");
    openWindow.focus();
}
function OpenUploadFilter(taskid, CaseStatus) {
    var ran = Math.random() * 1000;
    var res = window.showModalDialog('../PicfilterNew.aspx?taskid=' + taskid + '&CaseStatus=' + CaseStatus + '&random=' + ran, "window", "dialogHeight:620px;dialogWidth:1000px;center:yes;help:no;resizable:no;status:no;");
    if (res == 1) {
        var random = guidGenerator();
        $.post(
         "../../Common/ReloadMedia",
         { 'taskid': taskid, random: random },
         //返回后并刷新页面中的多媒体部门
         function (data) {
             picturedata = eval(data.split('|||')[0]);
             audiodata = eval(data.split('|||')[1]);
             ReLoadMedia();
         });
    }
}

//js获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

var VerifyApplyEndCase = {
    Init: function () {
        $("#radio_approve").change(function () {
            if ($("#radio_approve").is(":checked")) {
                $("#radio_reject").attr("checked", false);
            }
        });
        $("#radio_reject").change(function () {
            if ($("#radio_reject").is(":checked")) {
                $("#radio_approve").attr("checked", false);
            }
        });
        var data = getElementItemValue("Operateleft");
        var settings = { solvingId: GetQueryString("solvingId"), categoryId: GetQueryString("categoryId"), taskId: GetQueryString("taskId") };
        $.post(
                "../../ShenHe/getLastestVerifyApplyInfo",
                { arrstring: JSON.stringify(jQuery.extend(data, settings)) },
                function (data) {
                    $("#taskId").html(data[0].parameter.TASKID).attr("title", data[0].parameter.TASKID);
                    $("#requestNote").html(data[0].parameter.REQUESTNOTE.length > 10 ? data[0].parameter.REQUESTNOTE.substring(0, 30)+'......' : data[0].parameter.REQUESTNOTE).attr("title", data[0].parameter.REQUESTNOTE);
                    $("#requestUser").html(data[0].parameter.REQUESTUSERID).attr("title", data[0].parameter.REQUESTUSERID);
                    $("#requestTime").html(data[0].parameter.REQUESTDATE).attr("title", data[0].parameter.REQUESTDATE);
                    $("#requestDept").html(data[0].parameter.REQUESTDEPT).attr("title", data[0].parameter.REQUESTDEPT);
                }
            )
    },
    GoDestinationURL: function () {
        loadi = layer.load('加载中…');
        $.post(
         ("../../Common/Unlock"),
         {},
         function (data) {
             var returnUrl = "../../CaseOperate_flat/" + GetQueryString("returnurl") + "&page=" + GetQueryString("page");
             window.location.href = returnUrl;
         });
    },
    Submit: function () {
        var data = getElementItemValue("Operateleft");
        if ($("#radio_approve").is(":checked")) {
            data.checkResult = '1';
        }
        else {
            data.checkResult = '2';
        }
        var settings = { solvingId: GetQueryString("solvingId"), categoryId: GetQueryString("categoryId"), taskId: GetQueryString("taskId") };
        data = jQuery.extend(data, settings);
        $.post(
            "../../ShenHe/VerifyApplyEndCase",
            { arrstring: JSON.stringify(data) },
            function (data) {
                var arr = data.split(";");
                var result = arr[0];
                var message = arr[1];
                alert(message);
                if (result == "True") {
                    VerifyApplyEndCase.GoDestinationURL();
                }
            }
        )
    },
    Cancel: function () {
        VerifyApplyEndCase.GoDestinationURL();
    }
};