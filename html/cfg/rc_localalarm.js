$(function () {
    MasklayerHide();

    $("#rcLocalAListCheck").change(function () {
        DivBox($(this).attr("checked") * 1 == 1, "#RcLocalAmTabel");
    })

    function Call(xml) {
        var isEnable = $(xml).find("isEnableLocalAlarmRecord").text() * 1;
        var timeSec = $(xml).find("localAlarmRecordSecs").text() * 1;
        if (isEnable == 1) {
            $("#rcLocalAListCheck").attr("checked", true);
        }
        else {
            $("#rcLocalAListCheck").attr("checked", false);
        }
        $("#rcLocalAlarmTimeList").val(timeSec);
        $("#rcLocalAListCheck").change();
    }

    $("#rclocalalarmRf").click(function () {
        RfParamCall(Call, "", "getLocalAlarmRecordConfig");
    });

    $("#rcLocalAlarmSave").click(function () {
        var isEnable = 0;
        if ($("#rcLocalAListCheck").attr("checked") == true)
            isEnable = 1;
        RfParamCall(null, "", "setLocalAlarmRecordConfig&isEnableLocalAlarmRecord=" + isEnable + "&localAlarmRecordSecs=" + $("#rcLocalAlarmTimeList").val());
    });

    $("#rclocalalarmRf").click();
});
