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
    var des = $("#txtDes");
    if ($.trim(des.val()) == "" || $.trim(des.val()) == null) {
        alert('退回理由不能为空!');
        $("#txtDes")[0].focus();
        return false;
    }
    if ($.trim(des.val()).length > 500) {
        alert('退回理由内容不能超过200个字符');
        $("#txtDes")[0].focus();
        return false;
    }
    des.val(des.val().replace(new RegExp(/(')/g), "''"));
    return true;
}

//保存
function Save() {
    var tempData = getElementItemValue("Operateleft");
    if (isValid(tempData)) {
        $.post(
             ("../../BackCase/BackCaseCreate"),
             { arrsString: JSON.stringify(tempData) },
             function (data) {
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     BackToTaskListPage("btnSave");
                     alert(message);
                 }
                 else
                     alert(message);
             });
    }
}