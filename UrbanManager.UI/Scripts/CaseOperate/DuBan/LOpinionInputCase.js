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
$(function () {
    init();
    EventBind();//事件
})
function init() {
    ExecuteUserBind();
    select_CuiBanWayBind();
}

//绑定催办方式
function select_CuiBanWayBind() {
    $("#select_messageWayType").empty();
    $.post(
         "../../DuBan/getCuiBanWay",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_messageWayType"));
             })
         });
}

function EventBind() {
    $("#CheckUser").click(function () {
        ExecuteUserViewShow();
    });
    
    $("body").click(function () {
        SrcElementClick();
    });

}

//接人员tree控件的显示
function ExecuteUserViewShow() {
    $("#userList").show().css({ "left": $("#CheckUser").offset().left, "top": $("#CheckUser").offset().top - 19, "width": $("#CheckUser").css("width") });
}

//接人员tree控件的隐藏
function ExecuteUserViewHide() {
    $("#userList").hide();
}

// 所有tree控件在点击别的元素时隐藏
function SrcElementClick() {
    if ($(event.srcElement).attr("ID") == undefined) {
        ExecuteUserViewHide();
    }
    else {
        //接人员隐藏
        if ($(event.srcElement).attr("ID") != "CheckUser" && $(event.srcElement).attr("ID") != "userList" && $(event.srcElement).attr("ID").indexOf("zTreeUser") < 0) {
            ExecuteUserViewHide();
        }
    }
}

//数据校验
function isValid(tempData) {
    if ($("#txt_Note").val() == "") {
        alert("催办内容不能为空!")
        return false;
    }
    if ($("#txt_Note").val() != "" && $("#txt_Note").val().length > 250) {
        alert('催办内容字符数不能超过250个字!');
        return false;
    }
    if ($("#select_messageWayType").val() == "6") {
        if ($("#CheckUserCode").val() == "") {
            alert("接收人员不能为空!")
            return false;
        }
    }
    return true;
}

function ExecuteUserBind() {
    $.post("../../DuBan/GetSmsUser", { taskid: $("#taskId").val() }, function (msg) {
        var cacheExeDeptData = JSON.parse(msg);
        $.fn.zTree.init($("#zTreeUser"), UserSetting, cacheExeDeptData);
    });
}

/******************* 接收人员 tree*******************************/
//接收人员treeSetting
var UserSetting = {
    check: {
        enable: true
    },
    data: {
        keep: {
            parent: true
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onClick,
        onCheck: CheckCount
    }

};

function onClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("zTreeUser");
    if (treeNode != null) {
        if (treeNode.checked == true) {
            treeNode.checked = false;
            zTree.updateNode(treeNode, false);
        }
        else {
            treeNode.checked = true;
            zTree.updateNode(treeNode, true);
        }
        CheckCount();
    }
}

function CheckCount(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("zTreeUser"),
               check = zTree.getCheckedNodes(true),
               checkNameList = "",
               checkCodeList = "";

    $(check).each(function (k, v) {
        if (!v.getCheckStatus().half) {
            if (!v.isParent) {
                checkNameList = checkNameList + v["name"] + ",";
                checkCodeList = checkCodeList + v["id"] + ",";
            }
        }
    });
    $("#CheckUser").val(checkNameList.substring(0, checkNameList.length - 1).replace("全部,", ""));
    //$("#CheckUserCode").val(checkCodeList.substring(0, checkCodeList.length - 1).replace("0,", ""));
    $("#CheckUserCode").val(checkCodeList.substring(0, checkCodeList.length - 1).indexOf("0,") == 0 ? checkCodeList.substring(0, checkCodeList.length - 1).substring(2) : checkCodeList.substring(0, checkCodeList.length - 1));
}
/************************** end ******************************/