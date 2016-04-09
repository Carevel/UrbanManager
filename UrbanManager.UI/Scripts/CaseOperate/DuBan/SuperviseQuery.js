$(function () {
    $.ajaxSetup({
        async: false
    });
    //加载案件属性
    $("#text_infotypeid").empty();
    $("<option></option>").val("").text("全部").appendTo($("#text_infotypeid"));
    $.post(
         ("../SuperviseQuery/BindInfoType"),
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#text_infotypeid"));
             })
             $("#text_infotypeid option[value='" + $("#hid_infotypeid").val() + "']").attr("selected", "selected");
             InitInfobccode();
         });

    //加载所属街镇
    $("#text_streetcode").empty();
    $("<option></option>").val("").text("全部").appendTo($("#text_streetcode"));
    $.post(
         ("../SuperviseQuery/BindStreet"),
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#text_streetcode"));
             })
             $("#text_streetcode option[value='" + $("#hid_streetcode").val() + "']").attr("selected", "selected");
             InitCommunity();
         });
    LoadSourceTree();//加载问题来源
    LoadDeptTree();//加载部门来源
    if ($("#hidSourceID").val().length > 0)
        $("#menuSource").text("已选择");
    else
        $("#menuSource").text("请选择");

    if ($("#hidDeptCode").val().length > 0)
        $("#menuDept").text("已选择");
    else
        $("#menuDept").text("请选择");
    //来源树列表
    $("#menuSource").click(function () {
        showMenu("menuSource");
    });
    //部门树列表
    $("#menuDept").click(function () {
        showMenu("menuDept");
    });

})
/// <summary>显示菜单树
///   <para>控件ID</para>
/// </summary>
function showMenu(controlID) {
    var cityObj = $("#" + controlID);
    var cityOffset = $("#" + controlID).offset();

    if (controlID == "menuSource") {

        $("#divSource").css({ left: cityOffset.left + "px", top: cityOffset.top + cityObj.outerHeight() - parseInt(0) + "px" }).slideDown("fast");
        $("body").bind("mousedown", this.SourceOnBodyDown);
    }

    if (controlID == "menuDept") {

        $("#divDept").css({ left: cityOffset.left - parseInt(210) + "px", top: cityOffset.top + cityObj.outerHeight() - parseInt(0) + "px" }).slideDown("fast");
        $("body").bind("mousedown", this.DeptOnBodyDown);
    }
}
/// <summary>隐藏来源树
///   <para></para>
/// </summary>
function SourceHideMenu() {
    $("#divSource").fadeOut("fast");

    $("body").unbind("mousedown", this.SourceOnBodyDown);
    if ($("#hidSourceID").val().length > 0)
        $("#menuSource").text("已选择");
    else
        $("#menuSource").text("请选择");
}
function SourceOnBodyDown(event) {
    if (event.target.id != "menuSource" && event.target.id != "divSource" && event.target.id.indexOf("Sourcetree") < 0) {
        SourceHideMenu();
    }
}

function DeptHideMenu() {
    $("#divDept").fadeOut("fast");
    $("body").unbind("mousedown", this.DeptOnBodyDown);

    if ($("#hidDeptCode").val().length > 0)
        $("#menuDept").text("已选择");
    else
        $("#menuDept").text("请选择");
}
function DeptOnBodyDown(event) {
    if (event.target.id != "menuDept" && event.target.id != "divDept" && event.target.id.indexOf("Depttree") < 0) {
        DeptHideMenu();
    }
}
//绑定案件大类
function InitInfobccode() {
    $("#text_infobccode").empty();
    $("#text_infosccode").empty();
    $("<option></option>").val("").text("全部").appendTo($("#text_infobccode"));
    $("<option></option>").val("").text("全部").appendTo($("#text_infosccode"));
    var $infoType = $("#text_infotypeid").val();
    if ($infoType != "") {
        $.post(
            ("../SuperviseQuery/Bindbccode"),
            { infotypeid: $infoType },
            function (data) {
                $.each(data, function (i, item) {
                    $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#text_infobccode"));
                })
                $("#text_infobccode option[value='" + $("#hid_infobccode").val() + "']").attr("selected", "selected");
                InitInfosccode();
            });
    }

}
//绑定案件小类
function InitInfosccode() {
    $("#text_infosccode").empty();
    var $infoType = $("#text_infotypeid").val();
    var $infobccode = $("#text_infobccode").val();
    $("<option></option>").val("").text("全部").appendTo($("#text_infosccode"));
    if ($infobccode != "") {
        $.post(
                 ("../SuperviseQuery/Bindsccode"),
                 { infotypeid: $infoType, infobccode: $infobccode },
                 function (data) {
                     $.each(data, function (i, item) {
                         $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#text_infosccode"));
                     })
                     $("#text_infosccode option[value='" + $("#hid_infosccode").val() + "']").attr("selected", "selected");
                 });
    }

}
//绑定居委村居
function InitCommunity() {
    $("#text_communitycode").empty();
    $("#text_gridcode").empty();
    $("<option></option>").val("").text("全部").appendTo($("#text_communitycode"));
    $("<option></option>").val("").text("全部").appendTo($("#text_gridcode"));
    var $streetCode = $("#text_streetcode").val();
    if ($streetCode != "") {
        $.post(
            ("../SuperviseQuery/BindCommunity"),
            { streetCode: $streetCode },
            function (data) {
                $.each(data, function (i, item) {
                    $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#text_communitycode"));
                })
                $("#text_communitycode option[value='" + $("#hid_communitycode").val() + "']").attr("selected", "selected");
                InitGridcode();
            });
    }

}
//绑定网格编号
function InitGridcode() {
    $("#text_gridcode").empty();
    var $streetCode = $("#text_streetcode").val();
    var $communityCode = $("#text_communitycode").val();
    $("<option></option>").val("").text("全部").appendTo($("#text_gridcode"));
    if ($communityCode != "") {
        $.post(
                 ("../SuperviseQuery/BindGridcode"),
                 { streetCode: $streetCode, communityCode: $communityCode },
                 function (data) {
                     $.each(data, function (i, item) {
                         $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#text_gridcode"));
                     })
                     $("#text_gridcode option[value='" + $("#hid_gridcode").val() + "']").attr("selected", "selected");
                 });
    }

}

/// <summary>加载来源树列表
/// <para></para>
/// </summary>
function LoadSourceTree() {
    var setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true,
            }
        },
        callback: {
            onClick: beforeClick,
            onCheck: onCheck
        }
    };
    $.post("../AjaxHandlers/CommonsHandler.ashx", { "Action": "GetInfoSourceTree", "SelSource": $("#hidSourceID").val(), "CurDeptLv": $("#HidCurDeptLv").val(), "CurStreetCode": $("#HidCurStreetCode").val() }, function (data) {
        var returnMsg = JSON.parse(data)
        if (returnMsg.IsSucceed) {
            $.fn.zTree.init($("#Sourcetree"), setting, JSON.parse(returnMsg.Data));
        }
        else {
            alert(returnMsg.Message);
        }

    });
}

/// <summary>单击之前事件
///   <para></para>
/// </summary>
function beforeClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    if (treeNode != null) {
        if (treeNode.checked == true) {
            treeNode.checked = false;
            zTree.updateNode(treeNode, false);
        }
        else {
            treeNode.checked = true;
            zTree.updateNode(treeNode, true);
        }
        onCheck(e, treeId, treeNode);
    }
    //zTree.checkNode(treeNode, !treeNode.checked, null, true);
    //return false;
}


/// <summary>复选框选择事件
///   <para></para>
/// </summary>
function onCheck(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId),
    nodes = zTree.getCheckedNodes(true),
    vName = "",
    checkNameList = "",
    checkCodeList = "";;
    var statusValue = "";
    
    if (treeId == "Sourcetree") {
        for (var i = 0, l = nodes.length; i < l; i++) {
            if (nodes[i].isParent == false) {
                statusValue += nodes[i].value + ",";
                vName += nodes[i].name + ",";
            }
        }
        if (vName.length > 0) vName = vName.substring(0, vName.length - 1);
        if (statusValue.length > 0) statusValue = statusValue.substring(0, statusValue.length - 1);
        $("#hidSourceID").val(statusValue);
        $("#hidSourceName").val(vName);
    }

    if (treeId == "Depttree") {
        $(nodes).each(function (k, v) {
            if (!v.getCheckStatus().half) {
                if (!v.isParent) {
                    checkNameList = checkNameList + v["name"] + ",";
                    checkCodeList = checkCodeList + v["id"] + ",";
                }
            }
        });
        $("#hidDeptName").val(checkNameList.substring(0, checkNameList.length - 1).replace("全部,", ""));
        $("#hidDeptCode").val(checkCodeList.substring(0, checkCodeList.length - 1).indexOf("0,") == 0 ? checkCodeList.substring(0, checkCodeList.length - 1).substring(2) : checkCodeList.substring(0, checkCodeList.length - 1));
    }
}


/// <summary>加载部门树列表
/// <para></para>
/// </summary>
function LoadDeptTree() {
    var settingDept = {
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
            onClick: beforeClick,
            onCheck: onCheck
        }
    };
    $.post(("../SuperviseQuery/GetSolvingDept"), {}, function (data) {
        var cacheDeptData = JSON.parse(data)
        $.fn.zTree.init($("#Depttree"), settingDept, cacheDeptData);
        setCheckDeptCode("Depttree", "#hidDeptCode");
    });
}

function setCheckDeptCode(treeId, deptcodeId) {
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var checkedCode = $(deptcodeId).val();
    if (checkedCode.length > 0) {
        var code = checkedCode.split(",");
        $.each(code, function (k, v) {
            var node = treeObj.getNodeByParam("id", v, null);
            if (node != null)
                treeObj.checkNode(node, true, true);
            else {
                $("#hidDeptName").val("");
                $("#hidDeptCode").val("");
            }

        });
    }
}
