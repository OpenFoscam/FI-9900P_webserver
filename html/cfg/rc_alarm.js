$(function () {
    MasklayerHide();
    $("#rcalischeck").change(function () { DivBox($(this).attr("checked") * 1 == 1, "#RcAmTabel"); })

    function Call(xml) {
        var isEna = $(xml).find("isEnablePreRecord").text() * 1;
        $("#rcalischeck").attr("checked", isEna);
        var preR = $(xml).find("preRecordSecs").text() * 1;
        $("#AmIotrigger").val(preR);
        var alarmR = $(xml).find("alarmRecordSecs").text() * 1;
        $("#AmRctrigger").val(alarmR);
        setTimeout(function () {
            $("#rcalischeck").change();
        }, 1)
    }

    $("#rcalarmRf").click(function () {
        if (gVar_first.model > 3000 && gVar_first.model < 4000||isModel_6000To7000()) {
            $("#is3sIoAlarm").remove();
            $("#is4sIoAlarm").remove();
            $("#is5sIoAlarm").remove();
        }
        RfParamCall(Call, "", "getAlarmRecordConfig");
    });

    $("#RcAlarmSave").click(function () {
        RfParamCall(null, "", "setAlarmRecordConfig&isEnablePreRecord=" + $("#rcalischeck").attr("checked") * 1 + "&preRecordSecs=" + $("#AmIotrigger").val() + "&alarmRecordSecs=" + $("#AmRctrigger").val());
    });
    $("#rcalarmRf").click();

});