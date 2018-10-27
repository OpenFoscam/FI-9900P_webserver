$(function () {
    var DSsdS = 0;
    MasklayerHide();
    jQuery("#DevStTable tr:odd").addClass("t1");
    jQuery("#DevStTable tr:even").addClass("t2");

    try { gDvr.Test(); } catch (e) { $("#btnDevStateSDManage").css("display", "none") }

    $("#rcsdmanageRf").click(function () {
        RfParamCall(Call, "", "getDevState");
        MasklayerHide();
    });

    $("#rcsdmanageSave").click(function () {
        MasklayerHide();
    });

    function Do_js_Load(o, n, str, x, y) {
        n--;
        Web_user_defined_text(o, str + "" + n + "s", x, y);
        if (n > 0) {
            djsTimer = setTimeout(function () { Do_js_Load(o, n, str, x, y) }, 1000);
        } else {
            setTimeout(function () { $("#" + o).css("display", "none"); document.getElementById("btnDevStateSDManage").disabled = false; }, 500);
        }
    }

    function Call(xml) {
        DSsdS = $(xml).find("sdState").text() * 1;
        var userAgent = navigator.userAgent.toLowerCase();
        rSafari = /.*version\/([\w.]+).*(safari).*/;
        var match = rSafari.exec(userAgent);
        if (match != null) {
            $("#btnDevStateSDManage").attr("disabled", "disabled");
            if (DSsdS == 0) {
                $("#divSDManageMAC").css("display", "none");
            } else {
                $("#divSDManageMAC").css("display", "");
            }
        }
        if (DSsdS == 0) {
            $("#btnDevStateSDManage").css("display", "none");
	    if(gVar_first.model > 5000 && gVar_first.model < 6000){
	    	$("#btnSDFormat").hide();
	    }
        }
        else {
            $("#btnDevStateSDManage").css("display", "");
	    if(gVar_first.model > 5000 && gVar_first.model < 6000){
	    	$("#btnSDFormat").show();
	    }
        }
        $("#rcSTT_SDSTATE").html(lg.get("SDSTATE_TEST").split(",")[DSsdS]);

        var DSSDFSp = $(xml).find("sdFreeSpace").text();
        var freesp = DSSDFSp.split("k");
        $("#rcSTT_SDFS").text(DEVSP(freesp, DSSDFSp));
        var DSSDTS = $(xml).find("sdTotalSpace").text();
        var toal = DSSDTS.split("k");
        $("#rcSTT_SDTS").text(DEVSP(toal, DSSDTS));
    }

    function DEVSP(freesp, DSSDFSp) {
        var num = "";
        var a = 1024 * 1024;
        var b = 1024 * 1024 * 1024;
        var isInt = true;
        if (freesp[0] >= 1024 && freesp[0] < a) {
            num = "" + freesp[0] / 1024;
            for (var i = 0; i < num.length; i++) {
                if (num.charAt(i) == ".") { isInt = false; }
            }
            if (isInt == false) {
                DSSDFS = num.split(".")[0] + "." + ("" + num.split(".")[1]).charAt(0) + "MB";
            }
            else {
                DSSDFS = num.split(".")[0] + ".0" + "MB";
            }
        }
        else if (freesp[0] >= a && freesp[0] < b) {
            num = "" + freesp[0] / a;
            for (var i = 0; i < num.length; i++) {
                if (num.charAt(i) == ".") { isInt = false; }
            }
            if (isInt == false) {
                DSSDFS = num.split(".")[0] + "." + ("" + (num.split(".")[1])).charAt(0) + "GB";
            }
            else {
                DSSDFS = num.split(".")[0] + ".0" + "GB";
            }
        }
        else if (freesp[0] >= b) {
            num = "" + freesp[0] / b;
            for (var i = 0; i < num.length; i++) {
                if (num.charAt(i) == ".") { isInt = false; }
            }
            if (isInt == false) {
                DSSDFS = num.split(".")[0] + "." + ("" + num.split(".")[1]).charAt(0) + "TB";
            }
            else {
                DSSDFS = num.split(".")[0] + ".0" + "TB";
            }
        }
        else DSSDFS = freesp[0] + "KB";
        return DSSDFS;
    }

    $("#btnDevStateSDManage").click(function () {
        document.getElementById("btnDevStateSDManage").disabled = true;
        Do_js_Load("sdManageResult", 6, lg.get("IDS_SDM_LOADING"), "0", "55px");
        gDvr.SDManage(gVar.ip);
    });

    function formatCall(xml) {
        MasklayerHide();
        clearTimeout(djsTimer);
        $("#sdManageResult").html("");
        if ($(xml).find("result").text() * 1 == 0 && xml != null) {
            var format = XmlParser("formatResult", xml);
            if (format == 0) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_DISK_SUCCESS"));
            }
            else {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_DISK_FAILURE"));
            }
        }
    }

    $("#btnSDFormat").click(function () {
        if (confirm(lg.get("IDS_DISK_FORMATTEDOK"))) {
            RfParamCall(formatCall, "", "formatSDCard", "", 30000);
            Do_js_Load("sdManageResult", 30, lg.get("IDS_DISK_SDRESULT"), "0", "55px");
        }
        else {
            return;
        }
    });
    $("#rcsdmanageRf").click();
});
