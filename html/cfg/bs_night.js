$(function () {
    MasklayerHide();
    function BsNightCall(xml) {
        $("#selBsNightSta").val($(xml).find("state").text() * 1);
    }
    $("#bsnightRf").click(function () {
        RfParamCall(BsNightCall, "", "getNightLightState");
    });
    $("#bsnightSave").click(function () {
        RfParamCall(null, "", "setNightLightState&state=" + $("#selBsNightSta").val());   //0 - off; 1 - on
    });
    $("#bsnightRf").click();
})