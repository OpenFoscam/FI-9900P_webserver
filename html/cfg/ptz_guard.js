$(function () {
    MasklayerHide();
    function Call(xml) {
        var preR = $(xml).find("minutes").text() * 1;
        $("#PTZInitGuardMode").val(preR);
    }

    $("#ptzguardRf").click(function () {
        MasklayerHide();
        RfParamCall(Call, "", "ptzGetGuardPositionBackTime");
    });

    $("#ptzguardSave").click(function () {
        RfParamCall(null, "", "ptzSetGuardPositionBackTime&minutes=" + $("#PTZInitGuardMode").val());
    });
    $("#ptzguardRf").click();
})