$(function () {
    init_select();//初始化下拉框
})
function init_select() {
    CancelResource();
}

function CancelResource() {
    $("#cancelResource").empty();
    $.post(
         "../../BackCase/GetCodeList",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#cancelResource"));
             })
         });
}

//保存
function Save(btnid) {
    var tempData = getElementItemValue("Operateleft");
    if (isValid(tempData)) {
        $.post(
             ("../../BackCase/BackCase12319"),
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