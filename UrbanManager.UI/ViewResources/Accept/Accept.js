var takeCase = {
    init: {
        NonContactReasonBind: function () {
            $("#select_NonContactReason").empty();
            $.post(
                 "../../JieDan/GetNonContactReason",
                 function (data) {
                     $.each(data, function (i, item) {
                         $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_NonContactReason"));
                     })
                 });
        },
        HuifufangshiBind: function () {
            $("#select_HuiFuStyle").empty();
            $.post(
                 "../../JieDan/GetHuifufangshi",
                 function (data) {
                     $.each(data, function (i, item) {
                         $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_HuiFuStyle"));
                     })
                 });
        }
    },
    isValidate: function (tempData) {
        if ($("#d0041").is(":visible")) {
            if (!$("#isUpdate").is(":visible")) {
                if ($("#select_IsContact").val() == "1") {
                    if (tempData["txt_firstContractTime"] == "") {
                        alert("联系时间不能为空！");
                        return false;
                    }
                    if ($.trim(tempData["txt_ContactPerson"]) == "") {
                        alert("联系人不能为空！");
                        return false;
                    }
                }
            }
            if ($("#isUpdate").is(":visible") && $("#chk_update").is(":checked")) {
                if ($("#select_IsContact").val() == "1") {
                    if ($("#txt_firstContractTime").val() == "") {
                        alert('联系时间不能为空!');
                        return false;
                    }
                    if (!dateCompare($("#txt_firstContractTime").val(), $("#hd_dispatchTime").val())) {
                        alert("联系时间不能早于派遣时间!");
                        return false;
                    }
                    if ($.trim($("#txt_ContactPerson").val()) == "") {
                        alert("联系人不能为空!");
                        return false;
                    }
                }
            }
        }
        if ($.trim($("#txtDescription").val()) == "") {
            alert('接单意见不能为空!');
            return false;
        }
        $("#txtDescription").val($("#txtDescription").val().replace(new RegExp(/(')/g), "''"));
        return true;
    }
}
$(function () {
    $.ajaxSetup({
        async: false
    });
    //init_select();
    takeCase.init.NonContactReasonBind();
    takeCase.init.HuifufangshiBind();
    $("#select_NonContactReason").hide();
    $("#sp_NonContactReason").hide();
    //是否联系
    $("#select_IsContact").change(function () {
        //已联
        if ($("#select_IsContact").val() == "1") {
            $("#select_NonContactReason").hide();
            $("#sp_NonContactReason").hide();
            $("#txt_firstContractTime").removeAttr("disabled").show();
            $("#sp_required_firstContractTime").show();
            $("#txt_ContactPerson").removeAttr("disabled");
            $("#sp_required_ContactPerson").show();
        }
        else {
            $("#select_NonContactReason").removeAttr("disabled").show();
            $("#sp_NonContactReason").show();
            $("#txt_firstContractTime").val('').attr("disabled", "disabled");
            $("#sp_required_firstContractTime").hide();
            $("#txt_ContactPerson").val('').attr("disabled", "disabled");
            $("#sp_required_ContactPerson").hide();
        }
    })
})


function GetMouseclick(ID) {
    if (event.button == 2)
        handle_mouseclick(ID);
}
//时间比较
function dateCompare(data1, data2) {
    var d1 = new Date(data1.replace(/-/g, "/"));
    var d2 = new Date(data2.replace(/-/g, "/"));
    if (d1 >= d2) {
        return true;
    }
    else {
        return false;
    }
}
//数据校验
function isValid(tempData) {
    if ($("#d0041").is(":visible")) {
        if (!$("#isUpdate").is(":visible")) {
            if ($("#select_IsContact").val() == "1") {
                if (tempData["txt_firstContractTime"] == "") {
                    alert("联系时间不能为空！");
                    return false;
                }
                if ($.trim(tempData["txt_ContactPerson"]) == "") {
                    alert("联系人不能为空！");
                    return false;
                }
            }
        }
        if ($("#isUpdate").is(":visible") && $("#chk_update").is(":checked")) {
            if ($("#select_IsContact").val() == "1") {
                if ($("#txt_firstContractTime").val() == "") {
                    alert('联系时间不能为空!');
                    return false;
                }
                if ($.trim($("#txt_ContactPerson").val()) == "") {
                    alert("联系人不能为空!");
                    return false;
                }
            }
        }
    }
    if ($.trim($("#txtDescription").val()) == "") {
        alert('接单意见不能为空!');
        return false;
    }
    $("#txtDescription").val($("#txtDescription").val().replace(new RegExp(/(')/g), "''"));
    return true;
}

//保存
function Save() {
    loadi = layer.load('正在保存…');
    var tempData = getElementItemValue("Operateleft");
    tempData["contected"] = '0';
    if (isValid(tempData)) {
        //热线回复
        if ($("#d0041").is(":visible")) {
            tempData["contected"]='1';
            //tempData["select_IsContact"] = "";
            //tempData["select_NonContactReason"] = "";
            //tempData["txt_firstContractTime"] = "";
            //tempData["txt_ContactPerson"] = "";
        }
        //回复方式
        //if (!$("#d0150").is(":visible")) {
        //    tempData["select_HuiFuStyle"] = "";
        //}

        $.post(
             ("../../JieDan/TakeCase"),
             { arrstring: JSON.stringify(tempData)},
             function (data) {
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     alert(message);
                     BackToTaskListPage("btnSave");
                 }
                 else
                     alert(message);
             });
    }
}