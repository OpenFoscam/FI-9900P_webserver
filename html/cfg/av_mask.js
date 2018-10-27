$(function () {
    MasklayerHide();
    var maskArea = "";
    var pluginMaskArea = "";
    $("#avOsdOSDMask").change(function () {
        if ($("#avOsdOSDMask").val() == 1) {
            $("#avShbjtr").css("display", "")
        }
        else {
            gVar.SetPluginPos(0, 0, 0, 0);
            $("#avSheDel").css("display", "none")
            $("#avSheback").css("display", "none")
            $("#avMaskTable").css("display", "")
            $("#avShbjtr").css("display", "none")
        }
    })
    $("#avSheback").click(function () {
        gVar.SetPluginPos(0, 0, 0, 0);
        gDvr.ChangeWndSize(-1);
        $("#avSheDel").css("display", "none")
        $("#avSheback").css("display", "none")
        $("#avmask>.config_content").css("display", "");
        pluginMaskArea = gDvr.GetAVArea();
    })
    $("#avShbj").click(function () {
        if (gVar_first.model > 5000 && gVar_first.model < 6000) {
            gVar.SetPluginPos(70, 80, 802, 502);
        }
        else {
            gVar.SetPluginPos(70, 80, 800, 500);
        }
        gDvr.ChangeWndSize(2, 4);
        gDvr.SetAVArea(maskArea);
        $("#avSheDel").css("display", "")
        $("#avSheback").css("display", "")
        $("#avosd>.config_content").css("display", "none")
    })
    function ShCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {

            try {
                //gDvr.ChangeWndSize(2, 4);
                //gDvr.SetAVArea(xml.toLowerCase().replace(/( )|(\n)/g, ""));
                maskArea = xml.toLowerCase().replace(/( )|(\n)/g, "");
            } catch (e) { }
        }
    }
    function EnableCall(xml) {
        $("#avOsdOSDMask").val($(xml).find("isEnableOSDMask").text() * 1);
        $("#avOsdOSDMask").change();
        loadXml = false;
        bMaskHide = false;
        RfParamCall(ShCall, "", "getOsdMaskArea");
    }
    $("#avSheDel").click(function () {
        gDvr.MsDel();
    })
    $("#avmaskRf").click(function () {
        gVar.SetPluginPos(0, 0, 0, 0);
        gDvr.ChangeWndSize(-1);
        $("#avSheDel").css("display", "none")
        $("#avSheback").css("display", "none")
        $("#avmask>.config_content").css("display", "")
        bMaskHide = false;
        RfParamCall(EnableCall, "", "getOSDMask");
    })

    /*function MaskSavedCall(xml) {
    if ($(xml).find("result").text() * 1 == 0) {
    RfParamCall(ShCall, "", "getOsdMaskArea");
    }
    }*/

    $("#avmaskSave").click(function () {
        RfParamCall(function (xml) {
            if ($(xml).find("result").text() * 1 == 0) {
                try {
                    var str = "setOsdMaskArea" + pluginMaskArea;
                    var aMask = str.split("&");
                    var x, y;
                    var areas = "";
                    for (var i = 1; i < aMask.length; i++) {
                        x = aMask[i].split("=")[0];
                        y = aMask[i].split("=")[1];
                        areas += "<" + x + ">" + y + "</" + x + ">";
                    }
                    maskArea = "<cgi_result><result>0</result>" + areas + "</cgi_result>";
                    RfParamCall(null, "", str);
                } catch (e) { }
            }

        }, "", "setOSDMask&isEnableOSDMask=" + $("#avOsdOSDMask").val());

    })
    $("#avmaskRf").click();
});