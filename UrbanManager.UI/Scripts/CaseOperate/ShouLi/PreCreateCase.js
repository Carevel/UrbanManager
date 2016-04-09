
var ID_SpSign_Text = "#txt_spsignName";//短信接收人text
var ID_SpSign_Code = "#txt_spsignCode";//短信接收人code
var ID_SpSign_Tree = "tree_spsign";//短信接收人树
var isManage = false;   //判断管理要点是否有值
var isSonClass = false;//判断子类是否有值

$(function () {
    initSelect();//初始化下拉框

    //案件属性改变事件
    $("#select_Caseproperty").change(function () {
        casepropertyChange($("#select_Caseproperty").val());
        Select_BigClassBind();

    });
    //案件大类改变事件
    $("#select_BigClass").change(function () {

        Select_SmallClassBind();
    });
    //案件小类改变事件
    $("#select_SmallClass").change(function () {
        Select_SonClassBind();
    });
    //案件管理要点
    $("#select_SonClass").change(function () {
        Select_MangageContentBind();
    });
    //街道改变事件
    $("#select_street").change(function () {
        Select_CommunityBind();

    });

    //社区改变事件
    $("#select_community").change(function () {
        
        Select_GridBind();

    });
    //网格改变事件
    $("#select_grid").change(function () {
        if ($("#hid0008").val() == "1")
            CoordBind();
    });

    $("body").click(function () {
        SrcElementClick();

    });
    $(ID_SpSign_Text).click(function () {
        SpSignViewShow();
    });
});

//显示 特征要素
function SpSignViewShow()
{
    $("#div_spsign").show().css({ "left": $(ID_SpSign_Text).offset().left, "top": $(ID_SpSign_Text).offset().top - 19, "width": $(ID_SpSign_Text).css("width") });
}
// 所有tree控件在点击别的元素时隐藏
function SrcElementClick()
{
    if ($(event.srcElement).attr("ID") == undefined) {
        SpSignViewHide();
    }
    else {
        //特征要素隐藏
        if ($(event.srcElement).attr("ID") != "txt_spsignName" && $(event.srcElement).attr("ID") != "div_spsign" && $(event.srcElement).attr("ID").indexOf("tree_spsign") < 0) {
            SpSignViewHide();
        }
    }
}
function SpSignViewHide() {
    $("#div_spsign").hide();
}
//初始化下拉框
function initSelect() {
    select_CasepropertyBind();
    select_streetBind();
    //select_spSignBind();
    spsign_Bind();
    select_StAreaBind();
    TaskUpcodeBind();
    Select_InputArea_Bind();
}
//绑定分组
function TaskUpcodeBind() {
    $("#select_TaskUpcode").empty();
    $.post(
         "../../PreCreateCase/GetTaskUpcodeOptions",
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_TaskUpcode"));
             })
         });

}
//绑定案件属性
function select_CasepropertyBind() {
    $("#select_Caseproperty").empty();
    $.post(
         "../../PreCreateCase/GetInfoTypeOptions",
         { "infosource": $("#hidInfosourceid").val() },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_Caseproperty"));
             })
             $("#select_Caseproperty option[value='" + $("#taskinfoList").val().split(',')[0] + "']").attr("selected", "selected");
             //下拉列表里没有权限时
             if ($("#select_Caseproperty").val() != $("#taskinfoList").val().split(',')[0])
                 $("#select_Caseproperty").empty();
             if ($("#select_Caseproperty").val() == "0")
                 casepropertyChange($("#select_Caseproperty").val());
             Select_BigClassBind();
         });
    
}
//绑定案件大类
function Select_BigClassBind() {
    $("#select_BigClass").empty();
    $.post(
         "../../PreCreateCase/GetbigClassOptions",
         { "infotype": $("#select_Caseproperty").val() },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_BigClass"));
             })
             //alert($("#taskinfoList").val().split(',')[1]);
             $("#select_BigClass option[value='" + $("#taskinfoList").val().split(',')[1] + "']").attr("selected", "selected");
             Select_SmallClassBind();
         });
    
}
//绑定案件小类
function Select_SmallClassBind() {
    $("#select_SmallClass").empty();
    $.post(
         "../../PreCreateCase/GetSmallClassOptions",
         { "infotype": $("#select_Caseproperty").val(), "bigclass": $("#select_BigClass").val() },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_SmallClass"));
             })
             $("#select_SmallClass option[value='" + $("#taskinfoList").val().split(',')[2] + "']").attr("selected", "selected");
             Select_SonClassBind();
         });
    
}
//绑定案件子类
function Select_SonClassBind() {
    $("#select_SonClass").empty();
    $.post(
         "../../PreCreateCase/GetSonClassOptions",
         { "infotype": $("#select_Caseproperty").val(), "bigclass": $("#select_BigClass").val(), "smallclass": $("#select_SmallClass").val() },
         function (data) {
             $("<option></option>").val("").text("").appendTo($("#select_SonClass"));
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_SonClass"));
             })
             if (data.length > 0) {
                 isSonClass = true;
                 if (data.length == 1)
                     $("#select_SonClass option[value='" + data[0]["Value"] + "']").attr("selected", "selected");
             }
             else {
                 isSonClass = false;
             }
             if ($("#taskinfoList").val().split(',')[3] != "")
                 $("#select_SonClass option[value='" + $("#taskinfoList").val().split(',')[3] + "']").attr("selected", "selected");
             Select_MangageContentBind();
         });
}

//绑定管理要点
function Select_MangageContentBind() {
    $("#select_mangageContent").empty();
    //console.log($("#select_SonClass").val());
    $.post(
         "../../PreCreateCase/GetMangageContentOptions",
         { "infotype": $("#select_Caseproperty").val(), "bigclass": $("#select_BigClass").val(), "smallclass": $("#select_SmallClass").val(), "sonclass": $("#select_SonClass").val() },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_mangageContent"));
             })
             if (data.length>0) {
                 isManage = true;
             }
             else {
                 isManage = false;
             }
             //alert($("#taskinfoList").val().split(',')[4]);
             $("#select_mangageContent option[value='" + $("#taskinfoList").val().split(',')[4] + "']").attr("selected", "selected");
         });

}

//绑定街镇
function select_streetBind() {
    $("#select_street").empty();
    $.post(
         "../../PreCreateCase/GetStreetOptions",
         {},
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_street"));
             })
             $("#select_street option[value='" + $("#taskinfoList").val().split(',')[5] + "']").attr("selected", "selected");
             Select_CommunityBind();
         });
    
}
//绑定社区
function Select_CommunityBind() {
    $("#select_community").empty();
    $.post(
         "../../PreCreateCase/GetCommunityOptions",
         { "street": $("#select_street").val() },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_community"));
             })
             $("#select_community option[value='" + $("#taskinfoList").val().split(',')[6] + "']").attr("selected", "selected");
             Select_GridBind();
         });
    
}
//绑定网格
function Select_GridBind() {
    $("#select_grid").empty();
    $.post(
         "../../PreCreateCase/GetGridOptions",
         { "street": $("#select_street").val(), "community": $("#select_community").val() },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_grid"));
             })
             $("#select_grid option[value='" + $("#taskinfoList").val().split(',')[7] + "']").attr("selected", "selected");
             if (data.length <= 0) {
                 $("#select_grid").prepend("<option value='00000000'>00000000</option>");
             }
             //CoordBind();
         });
    
    
}
//绑定坐标
function CoordBind() {
    $.post(
         "../../PreCreateCase/GetCoordinate",
         { "streetcode": $("#select_street").val(), "gridcode": $("#select_grid").val() },
         function (data) {
             var arr = data.split(";");
             $(".hdnX").val(arr[0]);
             $(".hdnY").val(arr[1]);
             $(".span_infoX").html(arr[0]);
             $(".span_infoY").html(arr[1]);
             
         });

}
//奉闵上报区域
function Select_InputArea_Bind() {
    $("#InputArea").empty();
    $.post(
         "../../XinZeng/GetInputArea",
         {},
         function (data) {
             $("<option></option>").val("-1").text("").appendTo($("#InputArea"));
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#InputArea"));
             })
             if ($("#taskinfoList").val().split(',')[9] != "") {
                 $("#InputArea option[value=" + $("#taskinfoList").val().split(',')[9] + "]").attr("selected", "selected");
             }
         });
}

//主要区域
function select_StAreaBind() {
    $("#select_StArea").empty();
    $.post(
         "../../PreCreateCase/GetStArea",
         {},
         function (data) {
             $("<option></option>").val("-1").text("").appendTo($("#select_StArea"));
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_StArea"));
             })
             if ($("#taskinfoList").val().split(',')[8] != "") {
                 $("#select_StArea option[value=" + $("#taskinfoList").val().split(',')[8] + "]").attr("selected", "true");
             }
         }); 
}
/*-----特征要素树-------*/
var SpSignSetting = {
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
        onClick: SpSignonClick,
        onCheck: SpSignCheckCount
    }

};

function SpSignonClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(ID_SpSign_Tree);
    if (treeNode != null) {
        if (treeNode.checked == true) {
            treeNode.checked = false;
            zTree.updateNode(treeNode, false);
        }
        else {
            treeNode.checked = true;
            zTree.updateNode(treeNode, true);
        }
        SpSignCheckCount();
    }
}

function SpSignCheckCount(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(ID_SpSign_Tree),
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
    $(ID_SpSign_Text).val(checkNameList.substring(0, checkNameList.length - 1).replace("全部,", ""));
    $(ID_SpSign_Code).val(checkCodeList.substring(0, checkCodeList.length - 1).indexOf("0,") == 0 ? checkCodeList.substring(0, checkCodeList.length - 1).substring(2) : checkCodeList.substring(0, checkCodeList.length - 1));
}
function spsign_Bind() {
    $.post("../../AutoPreCreateCase/GetSpSign", {}, function (msg) {
        var cacheDeptData = JSON.parse(msg);

        $.fn.zTree.init($("#" + ID_SpSign_Tree), SpSignSetting, cacheDeptData);
       // ChangeTreeChecked();
    });
}

function ChangeTreeChecked() {
    var treeObj = $.fn.zTree.getZTreeObj("tree_spsign");
    if ($("#codevalue").val() != "" && $("#codevalue").val() != null) {
        var value = $("#codevalue").val();
        var list = value.substring(0, value.length - 1).split(",");
        for (var i = 0; i < list.length; i++) {
            var node = treeObj.getNodeByParam("id", list[i], null);
            treeObj.checkNode(node, true, true);
        }
    }
}
/*-----------------*/

function Save() {
    loadi = layer.load('正在保存…');
    var tempData = getElementItemValue("GridWindow");
    tempData["select_StArea"] = $("#select_StArea").find("option:selected").text();
    var url = "";
    if ($("#checkInfoGrubCheck input[type='checkbox']").is(':checked'))
        url = "../../PreCreateCase/QianDuanChuZhi?random=" + Math.random();
    else
        url = "../../PreCreateCase/PreatCaseSave?random=" + Math.random();//添加 ?random="+Math.random()目的是防止由于缓存导致功能失效
    //if (isValid(tempData)) {
        $.post(
             (url),
             { "arrstring": JSON.stringify(tempData) },
             function (data) {
                 layer.close(loadi);
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     alert(message);
                     GoDestinationURL()
                 }
                 else
                     alert(message);
             });
    //}
}
function SaveJA() {
    loadi = layer.load('正在保存…');
    var tempData = getElementItemValue("GridWindow");
    var url = "../../PreCreateCase/PreatCaseSaveJA?random=" + Math.random();//添加 ?random="+Math.random()目的是防止由于缓存导致功能失效
    //if (isValid(tempData)) {
        $.post(
             (url),
             { "arrstring": JSON.stringify(tempData) },
             function (data) {
                 layer.close(loadi);
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     alert(message);
                     GoDestinationURL()
                 }
                 else
                     alert(message);
             });
    //}
}

function ProblemSave() {
    loadi = layer.load('正在保存…');
    var tempData = getElementItemValue("GridWindow");
    var url = "../../PreCreateCase/ProblemCaseSave?random=" + Math.random();//添加 ?random="+Math.random()目的是防止由于缓存导致功能失效
    //if (isValid(tempData)) {
        $.post(
             (url),
             { "arrstring": JSON.stringify(tempData) },
             function (data) {
                 layer.close(loadi);
                 var arr = data.split(";");
                 var result = arr[0];
                 var message = arr[1];
                 if (result == "True") {
                     alert(message);
                     GoDestinationURL()
                 }
                 else
                     alert(message);
             });
   // }
}

//数据校验
function isValid(tempData) {
    if (tempData["select_Caseproperty"] == null || tempData["select_Caseproperty"] == "") {
        alert("案件属性不能为空!");
        return false;
    }
    if (isSonClass) {
        if (tempData["select_SonClass"] == null || tempData["select_SonClass"] == "") {
            alert("案件子类不能为空!");
            $("#select_SonClass").focus();
            return false;
        }
    }
    if (isManage) {
        if (tempData["select_mangageContent"] == null || tempData["select_mangageContent"]=="")
        {
            alert("管理要点不允许为空!");
            $("#select_mangageContent").focus();
            return false;
        }
    }
    if ($("#oldGrid").css("display") != "none") {
        if (tempData["select_street"] == null || tempData["select_street"] == "") {
            alert("请选择街镇！");
            $("#select_street").focus();
            return false;
        }
        if (tempData["select_grid"] == "" || tempData["select_grid"] == null) {
            alert("请选择网格！");
            $("#select_grid").focus();
            return false;
        }
        if (tempData["hdnX"] == "0" || tempData["hdnX"]=="0.00") {
            alert("坐标不允许为空");
            return false;
        }
        if (tempData["hdnY"] == "0" || tempData["hdnY"] == "0.00") {
            alert("坐标不允许为空");
            return false;
        }
    }
    else {
        if (tempData["select_new_street"] == null || tempData["select_new_street"]=="") {
            alert("请选择所属街道");
            return false;
        }
        if (tempData["hdnX_New"] == "0" || tempData["hdnX_New"] == "0.00") {
            alert("坐标不允许为空");
            return false;
        }
        if (tempData["hdny_New"] == "0" || tempData["hdny_New"] == "0.00") {
            alert("坐标不允许为空");
            return false;
        }
    }
    //if ($("#hidArea").val() == "1") {
    //    if (tempData["select_StArea"] == null || tempData["select_StArea"] == "-1") {
    //        alert("请选择主要区域！");
    //        $("#select_StArea").focus();
    //        return false;
    //    }
    //}
    if ($("#tr_area").css("display") != "none") {
        if (tempData["InputArea"] == "-1") {
            alert("请选择区域");
            $("#InputArea").focus();
            return;
        }
    }
    if (tempData["txt_address"] == "" || tempData["txt_address"] == null) {
        alert("发生地点不允许为空！");
        $("#txt_address").focus();
        return false;
    }
    else {   
        if (tempData["txt_address"].length > 50) {
            alert("发生地址输入不得超过50个字符！");
            $("#txt_address").focus();
            return false;
        }
    }

    if (tempData["txt_description"] == "" || tempData["txt_description"] == null) {
        alert("问题描述不允许为空！");
        $("#txt_description").focus();
        return false;
    }
    else {
        if (tempData["txt_description"].length > 500) {
            alert("问题描述不能超过500个字符！");
            $("#txt_description").focus();
            return false;
        }
    }
    if (tempData["txt_note"] == "" || tempData["txt_note"] == null) {
        alert("受理意见不允许为空！");
        $("#txt_note").focus();
        return false;
    }
    else {
        if (tempData["txt_note"].length > 500) {
            alert("受理意见的字符数不能超过500个字符！");
            $("#txt_note").focus();
            return false;
        }
    }
    return true;
}

//绑定社区
function Gis_CommunityBind(streetcode, commcode, gridcode) {
    $("#select_community").empty();
    $.post(
         "../../AutoPreCreateCase/GetCommunityOptions",
         { "street": streetcode },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_community"));
             })
             $("#select_community option[value='" + commcode + "']").attr("selected", "selected");//居村
             Gis_GridBind(streetcode, commcode, gridcode);
         });
}
//绑定网格
function Gis_GridBind(streetcode, commcode, gridcode) {
    $("#select_grid").empty();
    $.post(
         "../../AutoPreCreateCase/GetGridOptions",
         { "street": streetcode, "community": commcode },
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#select_grid"));
             })
             $("#select_grid option[value='" + gridcode + "']").attr("selected", "selected");//网格
             if (data.length <= 0) {
                 $("#select_grid").prepend("<option value='00000000'>00000000</option>");
             }
         });


}

//知识库
function OpenKnowBase() {
    //var res= window.open('../KeyWordQuery.aspx', "_blank", "height=600,Width=1200,resizable=yes,left=100,top=100");
    var res = window.showModalDialog("../KeyWordQuery.aspx?infosourceid=" + $("#hidInfosourceid").val() + "&taskid=" + $("#taskId").val(), "window", "dialogHeight:600px;dialogWidth:1300px;left=100;top=100; resizable: Yes;");
    if (res != "" && res != null) {
        $("#taskinfoList").val(res.toString());
        var typeid = res.toString().split(',')[0];
        //案件属性改变事件
        $("#select_Caseproperty").val(typeid);
        Select_BigClassBind();
    }
}
//[徐汇]12345填报
function Open12345Frm(taskId,hotlineSn) {
    //var res =
    var iWidth = 840; //弹出窗口的宽度;
    var iHeight = 630; //弹出窗口的高度;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
    window.open('../12345WriteFrm.aspx?taskId=' + taskId + '&hotlineSn='+ hotlineSn, 'window', 'status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no,left=' + iLeft + ',top=' + iTop + ',width=' + iWidth + ',height=' + iHeight + ',scrollbars=no');
    
    //if (res != "" && res != null) {
    //    //$("#taskinfoList").val(res.toString());
    //    //var typeid = res.toString().split(',')[0];
    //    ////案件属性改变事件
    //    //$("#select_Caseproperty").val(typeid);
    //    //Select_BigClassBind();
    //}
}
