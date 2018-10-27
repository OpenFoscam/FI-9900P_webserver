$(function () {
    MasklayerHide();
    function BsLedStatusCall(xml) {
        $("#selBsLedSta").val($(xml).find("isEnable").text() * 1);
    }
    $("#bsledRf").click(function () {
        RfParamCall(BsLedStatusCall, "", "getLedEnableState");
    });
    $("#bsledSave").click(function () {
        RfParamCall(null, "", "setLedEnableState&isEnable=" + $("#selBsLedSta").val()); 
    });
    $("#bsledRf").click();
})