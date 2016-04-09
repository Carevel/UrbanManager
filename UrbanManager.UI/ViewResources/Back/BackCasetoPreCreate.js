//菜单切换
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
//数据校验
function isValid(tempData) {
    if (tempData["txtDes"] == "") {
        alert("退回理由不能为空！");
        $("#txtDes").focus();
        return false;
    }
    else {
        if (tempData["txtDes"].length > 200) {
            alert('退回理由不能超过200个字符!');
            $("#txtDes").focus();
            return false;
        }
    }
    return true;
}
//保存
function Save(btnid) {
    var tempData = getElementItemValue("Operateleft");
    if (isValid(tempData)) {
        $.post(
             ("../../BackCase/BackAcceptance?random="+Math.random()),
             { arrsString: JSON.stringify(tempData) },
             function (data) {
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     BackToTaskListPage("btnSave");
                     alert(message);
                 }
                 else {
                     alert(message);
                 }
             });
    }
}