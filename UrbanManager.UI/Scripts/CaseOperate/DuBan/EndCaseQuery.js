$(function () {
    $.ajaxSetup({
        async: false
    });
    EndCaseQuery.init();
    if ($("#hidSourceID").val())
        $("#menuSource").text("已选择");
    else
        $("#menuSource").text("请选择");
    $("#menuSource").click(function () {
        EndCaseQuery.showSourceTree("menuSource");
    });
    $("#queryTask").click(function () {
        EndCaseQuery.Query();
    })
});
var EndCaseQuery = {
    init: function () {
        this.initInfotype();
        this.initInfoBcCode();
        this.initInfoScCode();
        this.initSourceTree();
        this.initChange();
        //this.initTaskList(0);
    },
    initChange: function () {
        $("#text_infotypeid").change(function () {
            EndCaseQuery.initInfoBcCode();
        })
        $("#text_infobccode").change(function () {
            EndCaseQuery.initInfoScCode();
        })
    },
    initInfotype: function () {
        $("#text_infotypeid").empty();
        $("<option></option>").val("").text("全部").appendTo($("#text_infotypeid"));
        $.post(
             ("../SuperviseQuery/BindInfoType"),
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#text_infotypeid"));
                 })
                 $("#text_infotypeid option[value='" + $("#hid_infotypeid").val() + "']").attr("selected", "selected");
                 EndCaseQuery.initInfoBcCode();
             });
    },
    initInfoBcCode: function () {
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
                    EndCaseQuery.initInfoScCode();
                });
        }
    },
    initInfoScCode: function () {
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
    },
    initSourceTree: function () {
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
        $.post(
            "../AjaxHandlers/CommonsHandler.ashx",
            { "Action": "GetInfoSourceTree", "SelSource": $("#hidSourceID").val(), "CurDeptLv": $("#HidCurDeptLv").val(), "CurStreetCode": $("#HidCurStreetCode").val() },
            function (data) {
                var returnMsg = JSON.parse(data)
                if (returnMsg.IsSucceed) {
                    $.fn.zTree.init($("#Sourcetree"), setting, JSON.parse(returnMsg.Data));
                }
                else {
                    alert(returnMsg.Message);
                }
            });
    },
    SourceOnBodyDown: function (event) {
        if (event.target.id != "menuSource" && event.target.id != "divSource" && event.target.id.indexOf("Sourcetree") < 0) {
            EndCaseQuery.hideSourceTree();
        }
    },
    showSourceTree: function (controlID) {
        var cityObj = $("#" + controlID);
        var cityOffset = $("#" + controlID).offset();
        if (controlID == "menuSource") {
            $("#divSource").css({ left: cityOffset.left + "px", top: cityOffset.top + cityObj.outerHeight() - parseInt(0) + "px" }).slideDown("fast");
            $("body").bind("mousedown", this.SourceOnBodyDown);
        }
    },
    hideSourceTree: function () {
        $("#divSource").fadeOut("fast");
        $("body").unbind("mousedown", this.SourceOnBodyDown);
        if ($("#hidSourceID").val())
            $("#menuSource").text("已选择");
        else
            $("#menuSource").text("请选择");
    },
    Query: function () {
        loadi = layer.load('加载中…');
        var start = document.getElementById("text_startdispatchtime").value;
        var end = document.getElementById("text_enddispatchtime").value;
        if (start > end) {
            alert('开始时间 不能大于 结束时间');
        }
        else {
            //var postData = getElementItemValue("Conditiondiv");
            this.initTaskList(0);
        }
    },
    initTaskList: function (pageIndex) {
        var postData = getElementItemValue("Conditiondiv");
        postData.categoryId = GetQueryString("categoryId");
        postData["pageIndex"] = pageIndex;
        $.ajax({
            type: 'post',
            url: '../AjaxHandlers_flat/Ajax_GetEndCaseQuery.ashx',
            data: postData,
            datatype: 'json',
            success: function (data) {
                var obj = eval("(" + data + ")");
                $("#taskholderdiv").empty();
                $("#taskholderdiv").append(obj.Data);
                Pagination.Refresh(obj.Extras, 5, pageIndex);
                $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 399) + "px");
                InitElementItemTooltips("tasklistdiv");
                $("#tasklistdiv").niceScroll({
                    cursorcolor: "#ff6000",
                    cursoropacitymax: 1,
                    touchbehavior: false,
                    cursorwidth: "4px",
                    cursorborder: "0",
                    cursorborderradius: "4px",
                    hidecursordelay: 3000
                });
                layer.close(loadi);
            }
        });
    }
}

//js获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
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

