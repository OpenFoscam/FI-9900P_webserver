$(function () {
    MasklayerHide();
    $("#chkSysCqSche").change(function () {
        DivBox($(this).attr("checked") * 1 == 1, "#tbSysReboot");
    })

    function Call(xml) {
  		    getDevIPandPort();
            Do_js_Time("sysRebootResult", 100, lg.get("IDS_COM_RESTART"), "0", "55px");
        
    }
    $("#syscqRest").click(function () {
        if (confirm(lg.get("IDS_COM_NOWREST"))) {
            $("#MaskError").html("");
            bMaskHide = false;
            RfParamCall(Call, "", "rebootSystem");
        }
        else return;
    })

    function isCalls(xml) {
        isEnable = $(xml).find("isEnable").text() * 1;
        intervalDay = $(xml).find("intervalDay").text() * 1;
        $("#chkSysCqSche").attr("checked", $(xml).find("isEnable").text() * 1);
        $("#optSysTime").val(intervalDay);
        if ((gVar_first.reserve4 >> 2 & 0x01) == 0) {
            $("#syscqSetTimeOut").css("display", "none");
            $("#tbSysReboot").css("display", "none");
        }
        else {
            $("#syscqSetTimeOut").css("display", "");
            $("#tbSysReboot").css("display", "");
            setTimeout(function () {
                $("#chkSysCqSche").change();
            }, 1)
        }

    }


    $("#syscqRf").click(function () {
        RfParamCall(isCalls, "", "getTimingRebootConfig");
    });

    $("#syscqSave").click(function () {
        RfParamCall(null, "", "setTimingRebootConfig&isEnable=" + $("#chkSysCqSche").attr("checked") * 1 + "&intervalDay=" + $("#optSysTime").val());
    });

    $("#syscqRf").click();
})