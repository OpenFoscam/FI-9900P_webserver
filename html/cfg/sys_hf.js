$(function () {
    function Call(xml) {
        if ($(xml).find("result").text() == 0) {
            Do_js_Time("sysFactoryResult", 100, lg.get("IDS_COM_RESTART"), "0", "55px");
            getDevIPandPort();
        }
    }

    $("#SysReFact").click(function () {
        if (gVar_first.model == "1111") {
            if (confirm(lg.get("IDS_FB_RESET_TIPS"))) {
                $("#MaskError").html("");
                bMaskHide = false;
                RfParamCall(Call, "", "restoreToFactorySetting");
            } else return;
        } else {
            if (confirm(lg.get("IDS_RESET_RESTART_TIPS"))) {
                $("#MaskError").html("");
                bMaskHide = false;
                RfParamCall(Call, "", "restoreToFactorySetting");
            } else return;
        }
    })

    $("#syshfRf").click(function () {
        MasklayerHide();
    });

    $("#syshfRf").click();
})