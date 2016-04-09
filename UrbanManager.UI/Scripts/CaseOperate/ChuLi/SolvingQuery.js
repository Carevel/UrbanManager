$(function () {
    //加载案件属性
    $("#dropInfoType").empty();
    $("<option></option>").val("").text("全部").appendTo($("#dropInfoType"));
    $.post(
         ("../SuperviseQuery/BindInfoType"),
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#dropInfoType"));
             })
             if ($("#hid_dropInfoType").val() != '') {
                 $("#dropInfoType option[value='" + $("#hid_dropInfoType").val() + "']").attr("selected", "selected");
             }
             InitInfobccode();
         });

    //加载所属街镇
    $("#dropStreet").empty();
    $("<option></option>").val("").text("全部").appendTo($("#dropStreet"));
    $.post(
         ("../SuperviseQuery/BindStreet"),
         function (data) {
             $.each(data, function (i, item) {
                 $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#dropStreet"));
             })
             if ($("#hid_dropStreet").val() != '') {
                 $("#dropStreet option[value='" + $("#hid_dropStreet").val() + "']").attr("selected", "selected");
             }
             InitCommunity();
         });

})
//绑定案件大类
function InitInfobccode() {
    $("#dropBigClass").empty();
    $("#dropSmallClass").empty();
    $("#DropZiClass").empty();
    $("<option></option>").val("").text("全部").appendTo($("#dropBigClass"));
    $("<option></option>").val("").text("全部").appendTo($("#dropSmallClass"));
    $("<option></option>").val("").text("全部").appendTo($("#DropZiClass"));
    var infoType = $("#dropInfoType").val();
    if (infoType != "") {
        $.post(
            ("../SuperviseQuery/Bindbccode"),
            { infotypeid: infoType },
            function (data) {
                $.each(data, function (i, item) {
                    $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#dropBigClass"));
                })
                if ($("#hid_dropBigClass").val() != '') {
                    $("#dropBigClass option[value='" + $("#hid_dropBigClass").val() + "']").attr("selected", "selected");
                }
                
                InitInfosccode();
            });
    }

}
//绑定案件小类
function InitInfosccode() {
    $("#dropSmallClass").empty();
    var infoType = $("#dropInfoType").val();
    var infobccode = $("#dropBigClass").val();
    $("<option></option>").val("").text("全部").appendTo($("#dropSmallClass"));
    if (infobccode != "") {
        $.post(
                 ("../SuperviseQuery/Bindsccode"),
                 { infotypeid: infoType, infobccode: infobccode },
                 function (data) {
                     $.each(data, function (i, item) {
                         $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#dropSmallClass"));
                     })
                     if ($("#hid_dropSmallClass").val() != '') {
                         $("#dropSmallClass option[value='" + $("#hid_dropSmallClass").val() + "']").attr("selected", "selected");
                     }
                     
                     InitInfozccode();
                 });
    }

}
//绑定案件子类
function InitInfozccode() {
    $("#DropZiClass").empty();
    var infoType = $("#dropInfoType").val();
    var infobccode = $("#dropBigClass").val();
    var infosccode = $("#dropSmallClass").val();
    $("<option></option>").val("").text("全部").appendTo($("#DropZiClass"));
    if (infobccode != "") {
        $.post(
                 ("../SuperviseQuery/Bindzccode"),
                 { infotypeid: infoType, infobccode: infobccode, infosccode: infosccode },
                 function (data) {
                     $.each(data, function (i, item) {
                         $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#DropZiClass"));
                     })
                     if ($("#hid_DropZiClass").val() != '') {
                         $("#DropZiClass option[value='" + $("#hid_DropZiClass").val() + "']").attr("selected", "selected");
                     }
                     
                 });
    }

}
//绑定居委村居
function InitCommunity() {
    $("#dropCommunity").empty();
    $("#dropGrid").empty();
    $("<option></option>").val("").text("全部").appendTo($("#dropCommunity"));
    $("<option></option>").val("").text("全部").appendTo($("#dropGrid"));
    var streetCode = $("#dropStreet").val();
    if (streetCode != "") {
        $.post(
            ("../SuperviseQuery/BindCommunity"),
            { streetCode: streetCode },
            function (data) {
                $.each(data, function (i, item) {
                    $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#dropCommunity"));
                })
                if ($("#hid_dropCommunity").val() != '') {
                    $("#dropCommunity option[value='" + $("#hid_dropCommunity").val() + "']").attr("selected", "selected");
                }
                
                InitGridcode();
            });
    }

}
//绑定网格编号
function InitGridcode() {
    $("#dropGrid").empty();
    var streetCode = $("#dropStreet").val();
    var communityCode = $("#dropCommunity").val();
    $("<option></option>").val("").text("全部").appendTo($("#dropGrid"));
    if (communityCode != "") {
        $.post(
                 ("../SuperviseQuery/BindGridcode"),
                 { streetCode: streetCode, communityCode: communityCode },
                 function (data) {
                     $.each(data, function (i, item) {
                         $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#dropGrid"));
                     })
                     if ($("#hid_dropGrid").val() != '') {
                         $("#dropGrid option[value='" + $("#hid_dropGrid").val() + "']").attr("selected", "selected");
                     }
                     
                 });
    }

}