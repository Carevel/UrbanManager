/** GetInfoSourceTree.js **/
/** 案件来源树**/
var msgSource = new GetInfoSourceTree();

var zTree;

$(document).ready(function ($) {
    msgSource.Init();
});
/// <summary>构造函数
///   <para></para>
/// </summary>
function GetInfoSourceTree() {
}

/// <summary>初始化
///   <para>这是一个详细信息</para>
/// </summary>
/// <param name="_parameter" type="String">参数说明</param>
/// <return></returen>
GetInfoSourceTree.prototype.Init = function (_parameter) {
    this._BindEvent();
    this.LoadUserTree();
}


/// <summary>绑定，注册相关操作事件
///  <para></para>
/// </summary>
GetInfoSourceTree.prototype._BindEvent = function () {
    var _this = this;
    //主办树列表
    $("#infoSourceId").click(function () {
        _this.showMenu("infoSourceId");
    });
}

/// <summary>显示菜单树
///   <para>控件ID</para>
/// </summary>
GetInfoSourceTree.prototype.showMenu = function (controlID) {
    var cityObj = $("#" + controlID);
    var cityOffset = $("#" + controlID).offset();
    if (controlID == "infoSourceId") {
        $("#menuSource").css({ left: cityOffset.left + "px", top: cityOffset.top + cityObj.outerHeight() + "px" }).show();
        $("body").bind("mousedown", this.CaseUserOnBodyDown);
    }

}

/// <summary>隐藏树
///   <para></para>
/// </summary>
GetInfoSourceTree.prototype.CaseUserHideMenu = function () {
    $("#menuSource").fadeOut("fast");
    $("body").unbind("mousedown", this.CaseUserOnBodyDown);
}

GetInfoSourceTree.prototype.CaseUserOnBodyDown = function (event) {
    if (!(event.target.id == "infoSourceId" ||
         event.target.id == "menuSource" ||
     $(event.target).parents("#menuSource").length > 0)) {
        msgSource.CaseUserHideMenu();
    }
}

/// <summary>加载信息员树列表
/// <para></para>
/// </summary>
GetInfoSourceTree.prototype.LoadUserTree = function () {

    var setting = {
        check: {
            enable: true
        },
        view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: ""
            }
        },
        callback: {
            onClick: msgSource.beforeClick,
            onCheck: msgSource.onCheck
        }
    };
    $.post("../../AjaxHandlers/CodeListHandler.ashx", { "Action": "GetInfoSourceTree", "SelSourceID": $("#HidSourceID").val(), "FZXDeptCode": $("#HidDeptCode").val() }, function (data) {
        var returnMsg = JSON.parse(data)
        if (returnMsg.IsSucceed) {
            $.fn.zTree.init($("#SourceTree"), setting, JSON.parse(returnMsg.Data));
        }
        else {
            alert(returnMsg.Message);
        }

    });
}

/// <summary>复选框选择事件
///   <para></para>
/// </summary>
GetInfoSourceTree.prototype.onCheck = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId),
    nodes = zTree.getCheckedNodes(true),
    vName = "";
    var vVulue = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        if (nodes[i].isParent == false) {
            vVulue += nodes[i].value + ",";
            vName += nodes[i].name + ",";
        }
    }

    if (vName.length > 0) vName = vName.substring(0, vName.length - 1);
    if (vVulue.length > 0) vVulue = vVulue.substring(0, vVulue.length - 1);
    if (treeId == "SourceTree") {
        $("#HidSourceID").val(vVulue);
        $("#infoSourceId").val(vName);
        $("#HidSourceName").val(vName);
    }
}