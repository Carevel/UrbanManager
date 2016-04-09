
var picturedata;
var audiodata;
var rootpath;
$(function () {
    //图片
    var html = '';

    for (var i = 0; i < picturedata.length; i++) {
        if (i == picturedata.length - 1)
            html += '<div style="width:60px; height:60px;"><img class="cutline" src="' + picturedata[i]["src"] + '" /></div>';
        else
            html += '<div style="width:60px; height:60px;margin-right:4px;"><img  class="cutline"  src="' + picturedata[i]["src"] + '" /></div>';

    }

    $("#divbox").empty().html(html);

    $("#divbox").width(($("#divbox div").length * 64) - 4);

    $(".buttomText").text("1/" + $("#divbox div").length);
    if (picturedata[0]["src"].indexOf("NoUpPic") > 0 || picturedata[0]["src"].indexOf("NoCheckPic") > 0) {
        $("#divSol").hide();
        $(".buttomText").text("0/0");
    }
    $("#imgDilg").attr("src", $("#divbox div").eq(0).find("img").attr("src"));

    $("#divSol").niceScroll({
        cursorcolor: "#418BCA",
        cursoropacitymax: 1,
        touchbehavior: false,
        cursorwidth: "4px",
        cursorborder: "0",
        cursorborderradius: "4px",
        hidecursordelay: 3000
    });
    //声音
    var ahtml = '';
    for (var i = 0; i < audiodata.length; i++) {
        var aName = audiodata[i]["name"].toString().length > 8 ? audiodata[i]["name"].toString().substr(0, 8) : audiodata[i]["name"].toString();
        if (audiodata[i]["type"] == "0") {
            ahtml += '<div class="row-fluid " style="height: 56px; background-color: #489bcf">' +
                            '<div class="value3span" style="width: 400px !important; margin: 0 0 !important;">' +
                                '<label title="' + audiodata[i]["name"] + '" class="checkbox" style="line-height: 57px; font-size:24px; margin: 0px 0 0 10px; color: #fff;">' +
            '<input type="checkbox" style="margin-top: 20px;" value="' + audiodata[i]["src"] + '" />' + aName + '</label></div><div class="value3span" style="width: 82px !important; margin: 0 0 !important;">' +
                                '<img style="margin: -3px 20px 0 5px;cursor: pointer;" src="' + rootpath + 'Images_flat/sjx.jpg" onclick="Play(\'' + audiodata[i]["src"] + '\');" />' +
                                '<img  style="cursor: pointer;margin: -3px 0px 0 0px;"  src="' + rootpath + 'Images_flat/xz.jpg"  onclick="DownLoad(\'' + audiodata[i]["src"] + '\');" /></div></div>' +
                        '<div style="background-color: #fff; height: 1px;"></div>';
        }
        else {
            ahtml += '<div class="row-fluid " style="height: 56px; background-color: #489bcf">' +
                            '<div class="value3span" style="width: 400px !important; margin: 0 0 !important;">' +
                                '<label title="' + audiodata[i]["name"] + '" class="checkbox" style="line-height: 57px; font-size:24px; margin: 0px 0 0 10px; color: #fff;">' +
            '<input type="checkbox" style="margin-top: 20px;" value="' + audiodata[i]["src"] + '" />' + aName + '</label></div><div class="value3span" style="width: 82px !important; margin: 0 0 !important;">' +
                                '<img  style="margin-left:33px;cursor: pointer;margin-top: -3px;"  src="' + rootpath + 'Images_flat/xz.jpg"  onclick="DownLoad(\'' + audiodata[i]["src"] + '\');" /></div></div>' +
                        '<div style="background-color: #fff; height: 1px;"></div>';
        }
    }

    $("#audiodiv").empty().html(ahtml);



    $("#divbox div img").click(function () {
        $("#imgDilg").attr("src", $(this).attr("src"));
        $(".buttomText").text(($("#divbox div").index($(this).parent()) + 1) + "/" + $("#divbox div").length);
    });

    $(".focusbtnl").click(function () {
        var r = $(".buttomText").text().split('/');
        if (r[0] > 1) {
            $("#imgDilg").attr("src", $("#divbox div").eq((r[0] - 2)).find("img").attr("src"));
            $(".buttomText").text((parseInt(r[0]) - 1) + "/" + r[1]);
        }
    });

    $(".focusbtnr").click(function () {
        var r = $(".buttomText").text().split('/');
        if (parseInt(r[0]) < parseInt(r[1])) {
            $("#imgDilg").attr("src", $("#divbox div").eq(r[0]).find("img").attr("src"));
            $(".buttomText").empty().text((parseInt(r[0]) + 1) + "/" + r[1]);
        }
    });
});