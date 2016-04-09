var id;
var flag = true;
function selectevent(ObjID, celltext, selectid, objItem) {

    //if(ObjID.split("_")[0]=="")
    //{
    //	alert(ObjID);
    //	document.all.item(ObjID).innerHTML=celltext;
    //	var hdnid = "_"+ObjID.split("_")[1] +"_hdn_selectid";
    //	document.all.item(hdnid).value = selectid;

    //}
    //else
    //{
    document.all.item(ObjID).innerHTML = celltext;
    var hdnid = "hdn_selectid";
    document.all.item(hdnid).value = selectid;
    //}
    if (id == null) {
        id = objItem.rowIndex;
    }
    else {
        if (id != objItem.rowIndex) {
            obj5 = objItem.parentElement;
            o = obj5.rows[id];
            if (o.className == "subTableTr2") {
                o.style.background = "DFDFDF";
            }
            else {
                o.style.background = "FFFFFF";
            }
            o.style.color = "#383838";
            id = objItem.rowIndex;
        }
    }
    objItem.style.background = "#0E28A5";

}
function selectdblclick(ObjID, celltext, id) {

    var r = new Ajax.XmlHttpReq('../../AjaxHandlers/Ajax_UpdateWordsTimes.aspx?ID=' + id);

    window.close();
    returnValue = celltext;
}

function handle_mouseclick(typetext) {
    var h = screen.availHeight - 180;
    var w = screen.availWidth - 400;
    returnValueA = window.showModalDialog('../../SystemForm_flat/UserSetting/HabitualWord.aspx?type=userid&displaytype=1&time=' + Math.random(1000000), '', 'dialogHeight: ' + h + 'px; dialogWidth: ' + w + 'px;  edge: Raised; center: Yes; help: No; resizable: Yes; status: No;scroll=Yes;');
    if (returnValueA != "" && returnValueA != null)
        if (document.all[typetext] != null) {
            document.all[typetext].value += returnValueA;
        }
        else {
            typetext.value += returnValueA;
        }
}
function showComplete() {
    alert('保存成功');
}
var windowvalues = '';

function CloseSchedule() {
    if (windowvalues != '')
        windowvalues.close();
}



