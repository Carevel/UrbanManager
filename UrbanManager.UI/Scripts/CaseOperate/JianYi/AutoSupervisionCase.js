$(function () {
    $.ajaxSetup({
        async: false
    });
    difConfig.init();
    autoSuperVision.init();
    $("#btnSave").bind("click", function () {
        autoSuperVision.handler.save();
    })
    $("#btnSave_HotlineFeedBack").bind("click", function () {
        autoSuperVision.handler.saveFeedBack();
    })
    $("#btn_set_ynzz").bind("click", function () {
        autoSuperVision.handler.saveWanzheng();
    })
    $("#btn_cancel").bind("click", function () {
        autoSuperVision.handler.cancel();
    })
});

//观察者模式
(function ($) {
    var o = $({});//自定义事件对象
    $.each({
        trigger: 'publish',
        on: 'subscribe',
        off: 'unsubscribe'
    }, function (key, val) {
        jQuery[val] = function () {
            o[key].apply(o, arguments);
        };
    });
})(jQuery);

var difConfig = {
    init: function () {
        $.post(
                 "../../setSysConfig/getSysConfig",
                 function (data) {
                     if (data.length > 0) {
                         config = data;
                     }
                 });
    },
    getValueByEname: function (ename) {
        var value = '0';
        for (var i = 0; i < config.length; i++) {
            if (config[i].ename == ename) {
                value = config[i].configValue;
                return value;
            }
        }
        return value;
    },
    setValueByEname: function (ename) {
        //to be continue
    }
};
//js获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}
var autoSuperVision = {
    init: function () {
        this.caseValuation();
    },
    caseValuation: function () {
        $("#CaseValuation").empty();
        $.post(
             "../../JieAn/GetCaseValuation",
             function (data) {
                 $.each(data, function (i, item) {
                     $("<option></option>").val(item["Value"]).text(item["Text"]).appendTo($("#CaseValuation"));
                 })
             });
    },
    handler: {
        DestinationURL: function () {
            return '../../CaseOperate_flat/' + GetQueryString('returnurl') + '&page=' + GetQueryString('page');
        },
        GoDestinationURL: function () {
            loadi = layer.msg('正在返回', { shade: 0.15, skin: '' });
            $.post(
             ("../../Common/Unlock"),
             {},
             function (data) {
                 window.location.href = autoSuperVision.handler.DestinationURL();
             });
        },
        layerIndexParameters: {},
        saveWanzheng: function () {
            var tempData = getElementItemValue("Operateleft");
            if ($("#ynwzModal").is(":visible")) {
                if ($.trim($("#txt_ynwz").val()) == "") {
                    alert("说明不能为空!");
                    return false;
                }
            }
            loadi = layer.msg('加载中', { shade: 0.15, skin: '' });;
            $.post(
                 ("../../Dispatch/Save_wanzheng?random=" + Math.random()),
                 { "arrstring": JSON.stringify(tempData) },
                 function (data) {
                     var arr = data.split(";");
                     var result = arr[0];
                     var message = arr[1];
                     if (result == "True") {
                         alert(message);
                         autoSuperVision.handler.cancel();
                     }
                     else
                         alert(message);
                 });
        },
        validateSubmit: function (tempData) {
            if ($.trim($("#CaseValuation").val()) == "") {
                alert('结案评判不能为空!');
                return false;
            }
            if ($.trim($("#txtEndResult").val()) == "") {
                alert('结案意见不能为空!');
                return false;
            }
            //责任网格
            if ($("#GridCode").val() == "" || $("#GridCode").val() == null || $("#GridCode").val() == "-1") {
                alert('责任网格不能为空!');
                return false;
            }
            return true;
        },
        save: function () {
            var w = document.body.clientWidth;
            var h = document.body.clientHeight;
            if ($.trim($("#CaseValuation").val()) == "") {
                alert('结案评判不能为空!');
                return false;
            }
            var loadIndexParameter = layer.load(1, { shade: 0.2 });
            var tempData = getElementItemValue("Operateleft");
            var taskId = GetQueryString("taskid");
            var categoryId = GetQueryString("categoryId");
            var url = "../CaseOperate_flat/FeedBack/FeedBack.cshtml?ran=" + Math.random() + "&taskId=" + taskId + "&solvingid=" + GetQueryString("solvingid") + "&categoryId=" + GetQueryString("categoryId") + "";
            if ($("#isNeedHotlineBack").val() == "T" && difConfig.getValueByEname('0206') == '1') {
                parent.$("#popMainIframe").attr("src", url).attr("rel", "");
                var index = parent.layer.open({
                    type: 1,
                    title: ['办结信息反馈', 'background-color:#5F7FC5;color:white;text-align:center'],
                    closeBtn: 1,
                    area: [w + 'px', h + 'px'],
                    offset: ['10%', '10%'],
                    scrollbar: false,
                    content: parent.$("#popMainIframe"),
                    end: function () {
                        if (parent.$("#popMainIframe").attr("src", "").attr("rel") == 'True') {
                            autoSuperVision.handler.submit();
                        }
                        layer.close(loadIndexParameter);
                        return false;
                    }
                })
                return false;
            }
            else {
                if (autoSuperVision.handler.validateSubmit(tempData)) {
                    autoSuperVision.handler.submit();
                }
            }
        },
        submit: function () {
            var loadIndexParameter = layer.load(1, { shade: 0.4 });
            var tempData = getElementItemValue("Operateleft");
            if (autoSuperVision.handler.validateSubmit()) {
                $.post(
                    ("../../AutoSupervision/AutoSupervision"),
                    { arrstring: JSON.stringify(tempData) },
                    function (data) {
                        var arr = data.split(";");
                        var result = arr[0];
                        var message = arr[1];
                        if (result == "True") {
                            alert(message);
                            layer.close(loadIndexParameter);
                            autoSuperVision.handler.cancel();
                        }
                        else {
                            layer.close(loadIndexParameter);
                            alert(message);
                        }
                    })
            }
        },
        cancel: function () {
            autoSuperVision.handler.GoDestinationURL();
        }
    }
}


function GetMouseclick(ID) {
    if (event.button == 2)
        handle_mouseclick(ID);
}


//****************以下方法已过时*********************
function isValid(tempData) {
    var taskId = $("#taskId").val();
    var Description = $("#txtEndResult");
    var CaseValuation = $("#CaseValuation");
    if (CaseValuation.val() == "") {
        alert('结案评判不能为空!');
        return false;
    }
    if (Description.val() == "") {
        alert('结案意见不能为空!');
        return false;
    }
    if (Description.val().length > 500) {
        alert('结案意见不能超过500个字符');
        return false;
    }
    //责任网格
    if ($("#GridCode").val() == "" || $("#GridCode").val() == null || $("#GridCode").val() == "-1") {
        alert('责任网格不能为空!');
        return false;
    }
    Description.val(Description.val().replace(new RegExp(/(')/g), "''"));
    //是否需要热线反馈
    if (document.getElementById("isNeedHotlineBack").value == "T" && $("#hd_deptcode").val() == "101") {
        caseValueChanged();
        var infosourceIdVal = document.getElementById("hd_infosorceId").value;//渠道来源
        var infosourceIdsVal = document.getElementById("hd_infosorceIds").value;//案件来源
        var callbackFlagVal = document.getElementById("hd_callbackFlag").value;//是否回访复核
        var isFeedBackVal = document.getElementById("hd_isFeedBack").value;//是否跟踪解决
        var isBackToPlatform = document.getElementById("hd_isBack").value;//是否不办理退单
        var isNeedDJVal = document.getElementById("hd_isNeedDJ").value;//判断浦东违法搭建

        var countHasChaiDan = document.getElementById("hd_checkHasChaiDan").value;//是否有拆单案件未结案
        var countHasChaiDanNum = new Number(countHasChaiDan);
        var Rand = Math.random();
        var dialogHeight = screen.height;
        var dialogWidth = screen.width;
        var url = encodeURI("");

        if (infosourceIdVal == '10' || (infosourceIdVal == '2' && infosourceIdsVal == '68')) {

            if (countHasChaiDanNum > 0) {
                if (!window.confirm('有' + countHasChaiDan + '个拆单案件未结案，是否继续操作?')) {
                    return false;
                }
            }
            //弹出回访复核窗口
            if (callbackFlagVal == 'Y') {
                url = encodeURI("../JieAn/HotlLineFeedBack/HotlineFeedBack.aspx?rd=" + Rand + "&taskId=" + taskId + "&callbackFlag=T&CaseValuation=" + encodeURI($("#CaseValuation").find("option:selected").text()));
            }
            else {
                url = encodeURI("../JieAn/HotlLineFeedBack/HotlineFeedBack.aspx?rd=" + Rand + "&taskId=" + taskId + "&callbackFlag=F&CaseValuation=" + encodeURI($("#CaseValuation").find("option:selected").text()));
            }
        }
        else {
            if (isBackToPlatform == 'T') {
                if (callbackFlagVal == 'Y') {
                    alert("环境热线市绿化崔督办案件不能不办理退单!");
                    return false;
                }
                if (isFeedBackVal == 'T') {
                    alert("环境热线市绿化案件跟踪申请后不能不办理退单!");
                    return false;
                }
                url = "../JieAn/HotlLineFeedBack/BackCaseFB.aspx?taskId=" + taskId;

                var dialogHeight = "220px";
                var dialogWidth = "600px";
            }
            else {

                var dialogHeight = "615px";
                var dialogWidth = "1300px";
                if (isFeedBackVal == 'T') {
                    url = "../JieAn/HotlLineFeedBack/EnvironmentFeedBack.aspx?taskId=" + taskId + "&callbackFlag=F&isFeedBack=T&isNeedDJ=" + isNeedDJVal;

                }
                else {
                    if (callbackFlagVal == 'Y') {
                        url = "../JieAn/HotlLineFeedBack/EnvironmentFeedBack.aspx?taskId=" + taskId + "&callbackFlag=T&isFeedBack=F&isNeedDJ=" + isNeedDJVal;
                    }
                    else {
                        url = "../JieAn/HotlLineFeedBack/EnvironmentFeedBack.aspx?taskId=" + taskId + "&callbackFlag=F&isFeedBack=F&isNeedDJ=" + isNeedDJVal;
                    }
                }
            }
        }
        var hotlinebak = window.showModalDialog(url, document.getElementById("txtEndResult").value, "dialogHeight=" + dialogHeight + ";dialogWidth=" + dialogWidth + ";center:yes;help:no;scroll:yes;resizable:yes;status:no;");
    }
    else if ($("#isNeedHotlineBack").val() == "T" && difConfig.getValueByEname('0206') == '1') {

        var index = layer.open({
            type: 1,
            title: '请输入反馈内容',
            closeBtn: 1,
            area: ['1000px', '500px'],
            fix: false, //不固定
            shadeClose: true,
            content: $('#hotlineFeedBack')
        });
        return false;
    }
    return true;
}

function caseValueChanged() {
    var ddl = $("#CaseValuation").val();
    //不办理退单进入退单页面
    if (ddl == '不办理退单') {
        document.getElementById("hd_isBack").value = 'T';
    }
    else {
        document.getElementById("hd_isBack").value = 'F';
    }
}
//****************方法已过时*********************