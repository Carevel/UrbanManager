function PlayVoice(strFilePath) {
    var openWindow = window.open(strFilePath, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=200,top=100,width=270,height=10");
    //window.parent.openMap["_blank"] = openWindow;
    //openWindow.focus();

}

function PlayPic(strFilePath) {
    //Taskid="+_TaskID+"&TaskType="+_TaskType+"&Image="+_Image+"&Wav="+_Wav+"&tmp="+DateTime.Now.ToString("yyyyMMddHHmmss")+"')
    var openWindow = window.open('../CaseOperate_flat/PlayPci.aspx?Image=' + strFilePath, '_blank', 'resizable=no,status=no,toolbar=no,menubar=no,location=no,left=200,top=100,width=380,height=520')
    //window.parent.openMap["PlayPci"] = openWindow;
    //openWindow.focus();
}

function DisplayDetails(strTaskID, strType, strTitle, windowName) {
    var openWindow = window.open('../PublicPages/ShowFlowDetail.aspx?taskId=' + strTaskID + '&operateTypes=' + strType + '&TITLE=' + strTitle, windowName, 'toolBar=no, menubar=no, status=no,resizable=no,left=100,top=100,width=800,height=450,scrollbars=yes');
    //var ran = new Date();
    //window.parent.openMap["ShowFlowDetail" + ran] = openWindow;


    //openWindow.focus();
}

function DisplayCaseInfoUpdateLog(strTaskID) {
    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    var openWindow = window.open('CaseInfoChangeLog.aspx?TaskID=' + strTaskID, 'newDetails8', 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}

//弹出外拨页面
function DisplayCallOut(strTaskID, strhfdh) {

    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    var openWindow = window.open('CallOut.aspx?taskid=' + strTaskID + '&hfdh=' + strhfdh, 'newDetails8', 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}
function DisplayCallOutPar(strTaskID, strhfdh) {

    var h = screen.availHeight - 120;
    var w = screen.availWidth - 100;
    var openWindow = window.open('HeCha/CallOut.aspx?taskid=' + strTaskID + '&hfdh=' + strhfdh, 'newDetails8', 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=50,top=50,width=' + w + ',height=' + h + ',scrollbars=yes');
    openWindow.focus();
}

function DisplayDetailSolvings(strTaskID, strType, strTitle, windowName, InfoSourceId) {
    var openWindow = window.open('../PublicPages/ShowFlowDetail.aspx?taskId=' + strTaskID + '&operateTypes=' + strType + '&TITLE=' + strTitle + '&infoSourceId=' + InfoSourceId, windowName, 'toolBar=no, menubar=no, status=no,resizable=no,left=100,top=100,width=800,height=450,scrollbars=yes');
    //window.parent.openMap["_ShowFlowDetail"] = openWindow;
    //openWindow.focus();

}

function DisplayTrac(strTaskID) {
    var h = screen.availHeight - 300;
    var w = screen.availWidth - 250;
    var openWindow = window.open('../CaseOperate_flat/ProgressChart/AllProgress.aspx?taskId=' + strTaskID, 'cc1', 'toolBar=no, menubar=no,location=no,status=no,resizable=yes,left=120,top=150,width=' + w + ',height=' + h + ',scrollbars=yes,overflow:auto');
    //window.parent.openMap["AllProgress"] = openWindow;
    //openWindow.focus();
}

function DisplayOpinion(strTaskID) {
    var openWindow = window.open('../LeaderOpinion_flat/LeaderOpinion_flatInput.aspx?SUPTYPE=1&taskid=' + strTaskID, 'cc2', 'toolBar=no, menubar=no,location=no,status=no,resizable=no,left=90,top=50,width=840,height=600,scrollbars=yes');
    //window.parent.openMap["LeaderOpinionInput"] = openWindow;
    //openWindow.focus();
}

function DisplayPrinting(strTaskID, approach, InfoSourceid) {
    var openWindow = window.open('../Misc/PrintCaseLinkNew.aspx?TaskID=' + strTaskID + '&approach=' + approach + '&InfoSourceid=' + InfoSourceid, 'newwindow', 'height=490,width=725,top=100,left=100,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no');
    //window.parent.openMap["PrintCaseLink"] = openWindow;
    //openWindow.focus();
}

function DisplayFlowChart(taskId) {
    var w = window.open('Flow.aspx?taskId=' + taskId, 'myNewDetails', 'toolBar=no, menubar=no, status=no,resizable=no,left=5,top=30,width=1004,height=650,scrollbars=no');
    //window.parent.openMap["Flow"] = w;
    //w.focus();
}
function DisplayGIS(taskId) {
    var w = window.open('../Gis_flat/FullScreenGisPage.aspx?taskId=' + taskId, 'myNewDetails', 'toolBar=no, menubar=no, status=no,resizable=no,left=5,top=30,width=1004,height=650,scrollbars=no');
    //window.parent.openMap["Flow"] = w;
    //w.focus();
}
function ShowGridInfo(gridcode) {
    var w = window.open('../Utility/GridInfo.aspx?GridCode=' + gridcode, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=500,height=100");
    //window.parent.openMap["GridInfo"] = w;
}
function ShowKeeperInfo(keepersn) {
    var w = window.open('../WorkManage_flat/ShowKeeperProfile.aspx?keepersn=' + keepersn, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=800,height=200");
    //window.parent.openMap["ShowKeeperProfile"] = w;
}
function ShowPartInfo(partsn) {
    var w = window.open('../Utility/PartInfo.aspx?PartSN=' + partsn, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=680,height=200");
    //window.parent.openMap["PartInfo"] = w;
}
//打开图片比较
function OpenCompareImg(taskID) {
    var tmpDate = new Date();
    //window.showModelessDialog("CompareImg.htm?tmp=" + tmpDate.toString(), taskID, " help: no; resizable: no; status: no;dialogWidth:700px;dialogHeight:630px");
    var win = window.open("FileToHotlineFilter.aspx?TaskID=" + taskID + "&tmp=" + tmpDate.toString(), "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=668,height=700");
    //window.parent.openMap['FileToHotlineFilter'] = win;
}
//12345工单详细信息
function Open12345case(ID) {
    window.open('12345CaseInfo.aspx?WPID=' + ID, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=1050,height=550");
    //window.parent.openMap["12345CaseInfo"] = win;
}

//12345工单详细信息
function Open12345NewCase(ID) {
    var w = screen.availWidth - 300;

    var win = window.open('AssignHotlineCaseDetail.aspx?taskID=' + ID, '_blank', 'toolBar=no, menubar=no, status=no,resizable=no,top=250,width=' + w + ',height=300,scrollbars=yes');
    //window.parent.openMap["AssignHotlineCaseDetail"] = win;
}
//专项排查详细信息
function OpenSplInvestcase(ID) {
    var win = window.open('SplInvestCaseInfo.aspx?WPID=' + ID, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=720,height=470");
    //window.parent.openMap["SplInvestCaseInfo"] = win;
}

//两厢案件详细信息
function OpenPostCase(TASKID, ID) {
    window.open("NewDisplayPost.aspx?TASKID=" + TASKID + "&WPID=" + ID, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=720,height=470");
}
//环境热线案件详细信息
function OpenEnvironmentCase(TASKID, ID) {
    var win = window.open("NewDisplayEnvironment.aspx?TASKID=" + TASKID + "&HOTLINESN=" + ID, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=720,height=570");
    //window.parent.openMap["NewDisplayEnvironment"] = win;
}
function OpenSQCase(ID) {
    var myDate = new Date();
    var win = window.open('DetailInfo/DelegateInfo.aspx?taskId=' + ID + '&now=' + myDate, "_blank", "scrollbars=yes,resizable=no,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=924,height=600");
    //var win = window.open('../CaseOperate/DetailInfo/DelegateInfo.aspx?taskId=' + ID + '&now=' + myDate, "_blank", "scrollbars=yes,resizable=no,status=no,toolbar=no,menubar=no,location=no,left=10,top=0,width=924,height=600");
    //window.parent.openMap['DelegateInfo'] = win;
}
function OpenFileView(TASKID) {
    var ran = Math.random() * 1000;
    var win = window.open("FileUploadView.aspx?TASKID=" + TASKID + "&ran=" + ran, "_blank", "resizable=yes,status=no,toolbar=no,menubar=no,location=no,left=50,top=50,width=668,height=380");
    //window.parent.openMap["FileUploadView"] = win;
}

function ShowSimilarDetail(strTaskID) {
    var w = screen.availWidth - 300;
    var h = screen.availHeight - 300;
    var ran = Math.random() * 1000;

    var statues = document.getElementById("hidPTStatus").value;
    if (statues == "1") { //判断是否是普陀区
        var win = window.open('OSSimilarCaseInfoInfo.aspx?taskId=' + strTaskID + '&random=' + ran, '_blank', 'toolBar=no, menubar=no, status=no,resizable=no,top=250,width=' + w + ',height=' + h + ',scrollbars=yes');
        //window.parent.openMap["OSSimilarCaseInfoInfo"] = win;
    } else {
        var win = window.open('SimilarCaseInfoInfo.aspx?taskId=' + strTaskID + '&random=' + ran, '_blank', 'toolBar=no, menubar=no, status=no,resizable=no,top=250,width=' + w + ',height=' + h + ',scrollbars=yes');
        //window.parent.openMap["OSSimilarCaseInfoInfo"] = win;
    }
}


function ChangeCaseCE(strTaskID) {
    var ran = Math.random() * 1000;
    window.open('CaseCharacteristicElement.aspx?taskId=' + strTaskID + '&random=' + ran, '_blank', 'toolBar=no, menubar=no, status=no,resizable=no,top=250,width=600,height=200,scrollbars=yes');
}
function showPlayList(taskId) {
    var ran = Math.random() * 1000;
    var win = window.open('DisplayInfoList.aspx?taskId=' + taskId + '&random=' + ran, '_blank', 'toolBar=no, menubar=no, status=no,resizable=no,top=250,width=400,height=300', 'height=100,scrollbars=yes');
    //window.parent.openMap["DisplayInfoList"] = win;
}

//点击需求联系人进入综合查询页面
function lblKeeperSNClick() {
    if ($("#lblKeeperSN")[0].innerText != "" && $("#lblKeeperSN")[0] != null) {
        window.open("../../CaseOperate_flat/REPORTERQuery/REPORTERQuery.aspx?UserName=" + $("#lblKeeperSN")[0].innerText);
    }
};
function showFeedback(taskid) {
    window.open('JieAn/FeedBack.aspx?TaskId=' + taskid);
}


function openAndCloseContent(name)
{
    var isopen = $("#div_" + name + "_content").css("display");
    if (isopen != 'none') {
        $("#div_" + name + "_content").hide();
        $("#img_" + name).attr("src", "../Images_flat/a_down.png");
        $("#img_" + name).attr("title", "展开");
    }
    else
    {
        $("#div_" + name + "_content").show();
        $("#img_" + name).attr("src", "../Images_flat/a_up.png");
        $("#img_" + name).attr("title", "折叠");
    }
   
}


function getProessDetailDiv(taskId, trackid, recordId, opCode, lstable, type, infosourceId, callbackFlagStr)
{
    $.post("../AjaxHandlers_flat/Ajax_ParticularDisplayInfoHandle.ashx", { "Method": "GetProessDetail", "taskId": taskId, "RecordId": recordId, "opCode": opCode, "lstable": lstable, "Type": type, "infosourceId": infosourceId, "CallBackFlagStr": callbackFlagStr }, function (msg) {
        if (msg != "") {
            document.getElementById("div_trackDetail").innerHTML = msg;

        }
    });
}