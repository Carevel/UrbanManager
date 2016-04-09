/*
 * ***************************************************
 * written by xxj 2014-11-30
 * ***************************************************
 */

var GetTaskList = new Object();
var objHolder;

GetTaskList.ShowTaskList = function (pageIndex, loadi) {
    var aParams = document.location.search;
    var num = Math.random();
    if (aParams.length==0) {
        num = "?num=" + num;
    }
    else {
        num = "&num=" + num;
    }
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetTaskList.ashx'+aParams+num,
        data: 'pageIndex=' + pageIndex,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            if (obj.Extras == null)
                obj.Extras = "0|||0";
            var Extras = obj.Extras.split("|||");
            Pagination.Refresh(parseInt(Extras[0]), parseInt(Extras[1]), pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 216) + "px");
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


GetTaskList.LiuZhuanTDJGList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetLiuZhuanTDJGList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, $("#ddl_pagesize")[0].value, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 332) + "px");
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

GetTaskList.ShowTeShuAnJianList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetTeShuAnJianList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, $("#ddl_pagesize")[0].value, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 342) + "px");
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


GetTaskList.ShowShenHeJZList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetShenHeJZList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, $("#ddl_pagesize")[0].value, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 322) + "px");
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
GetTaskList.ShowShenHeList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetShengHeList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, $("#ddl_pagesize")[0].value, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 322) + "px");
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

GetTaskList.ShowTuiDanJGList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetTuiDanJGList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, $("#ddl_pagesize")[0].value, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 332) + "px");
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


GetTaskList.ShowBuShouLTDJGList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetBuShouLTDJGList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, $("#ddl_pagesize")[0].value, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 332) + "px");
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

GetTaskList.ShowSolvingQueryTaskList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetSolvingQuery.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, 5, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 372) + "px");
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


GetTaskList.ShowLeaderQueryTaskList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetLeaderQueryTaskList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, $("#ddl_pagesize")[0].value, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 372) + "px");
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

GetTaskList.ShowSuperviseQueryTaskList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetSuperviseQuery.ashx',
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

GetTaskList.ShowCuiBanJGList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetCuiBanJGList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, $("#ddl_pagesize")[0].value, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 290) + "px");
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

GetTaskList.ShowLiAnJGList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetLiAnJGList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, 5, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 342) + "px");
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

GetTaskList.ShowJianGuanList = function (pageIndex, postData) {
    postData["pageIndex"] = pageIndex;
    $.ajax({
        type: 'post',
        url: '../AjaxHandlers_flat/Ajax_GetJianGuanList.ashx',
        data: postData,
        datatype: 'json',
        success: function (data) {
            var obj = eval("(" + data + ")");
            $("#taskholderdiv").empty();
            $("#taskholderdiv").append(obj.Data);
            Pagination.Refresh(obj.Extras, 5, pageIndex);
            $("#tasklistdiv").css("height", (parent.document.body.clientHeight - 310) + "px");
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
