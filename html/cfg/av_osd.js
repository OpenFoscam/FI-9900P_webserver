$(function () {
    MasklayerHide();
    function Call(xml) {
        var avTimeStamp = $(xml).find("isEnableTimeStamp").text() * 1;
        $("#avOsdTimeStamp").val(avTimeStamp);
        var avDevName = $(xml).find("isEnableDevName").text() * 1;
        $("#avOsdDevName").val(avDevName);
        var avTempAndHumid = $(xml).find("isEnableTempAndHumid").text() * 1;
        $("#AvOSDTempAndHumName").val(avTempAndHumid);
        var avTemp = $(xml).find("isEnableTempAndHumid").text() * 1;
        $("#AvOSDTempName").val(avTemp);
        var avPos = $(xml).find("dispPos").text() * 1;
        $("#avOsdPos").val(avPos);
        //var avOSDMask =  $(xml).find("isEnableOSDMask").text()*1;
        //$("#avOsdOSDMask").val(avOSDMask);
    }
    $("#avosdRf").click(function () {
        gVar.SetPluginPos(0, 0, 0, 0);
        if ((gVar_first.reserve2 >> 2 & 0x01) == 1) {
            $("#TempAndHumidName").css("display", "none");
            $("#TemeratureName").css("display", "");
        }
        if ((gVar_first.reserve2 >> 3 & 0x01) == 1) {
            $("#TempAndHumidName").css("display", "");
            $("#TemeratureName").css("display", "none");
        }
        RfParamCall(Call, "", "getOSDSetting");
    })

    $("#avOsdSave").click(function () {
        if ((gVar_first.reserve2 >> 3 & 0x01) == 0) {
            RfParamCall(null, "", "setOSDSetting&isEnableTimeStamp=" + $("#avOsdTimeStamp").val() + "&isEnableDevName=" + $("#avOsdDevName").val() + "&isEnableTempAndHumid=" + $("#AvOSDTempName").val() + "&dispPos=" + $("#avOsdPos").val());
        }
        else {
            RfParamCall(null, "", "setOSDSetting&isEnableTimeStamp=" + $("#avOsdTimeStamp").val() + "&isEnableDevName=" + $("#avOsdDevName").val() + "&isEnableTempAndHumid=" + $("#AvOSDTempAndHumName").val() + "&dispPos=" + $("#avOsdPos").val());
        }
    })

    $("#avosdRf").click();
});