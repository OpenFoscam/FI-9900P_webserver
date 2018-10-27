$(function () {
    MasklayerHide();
    $("#chkAlarmOneKey").change(function () {
        DivBox($(this).attr("checked") * 1 == 1, "#tbAlarmOneKey");
    });

    function Call(xml) {
        isEnable = $(xml).find("isEnable").text() * 1;
        alarmLink = $(xml).find("alarmLinkage").text() * 1;

        $("#chkAlarmOneKey").attr("checked", $(xml).find("isEnable").text() * 1);

        $("#chkOneKeyMotion").attr("checked", (alarmLink & 0x01));
        $("#chkOneKeySound").attr("checked", (alarmLink & (0x01 << 1)) >> 1);
        $("#chkOneKeyTempurature").attr("checked", (alarmLink & (0x01 << 3)) >> 3);
        $("#chkOneKeyHumidity").attr("checked", (alarmLink & (0x01 << 4)) >> 4);

        setTimeout(function () {
            $("#chkAlarmOneKey").change();
        }, 1)
    }

    $("#alarmonekeyRf").click(function () {
        if ((gVar_first.reserve2 >> 2 & 0x01) == 1) {
            $("#TrkeyTempurature").css("display", "");
        }
        if ((gVar_first.reserve2 >> 3 & 0x01) == 1) {
            $("#TrkeyHumidity").css("display", "");
        }
        if (gVar_first.reserve2 >> 4 & 0x01 == 1) {
            $("#divOneKeyActivity").css("display", "");
            $("#divOneKeyMotion").css("display", "none");
        }
        RfParamCall(Call, "", "getOneKeyAlarmConfig");
    });

    $("#alarmonekeySave").click(function () {
        var amlink = new Array();
        amlink[0] = $("#chkOneKeyMotion").attr("checked") * 1;
        amlink[1] = $("#chkOneKeySound").attr("checked") * 1;
        amlink[2] = $("#chkOneKeyTempurature").attr("checked") * 1;
        amlink[3] = $("#chkOneKeyHumidity").attr("checked") * 1;

        var linkkag = (amlink[0]) + (amlink[1] << 1) + (0 << 2) + (amlink[2] << 3) + (amlink[3] << 4);
        RfParamCall(null, "", "setOneKeyAlarmConfig&isEnable=" + $("#chkAlarmOneKey").attr("checked") * 1 + "&alarmLinkage=" + linkkag);
    });
    $("#alarmonekeyRf").click();
});
