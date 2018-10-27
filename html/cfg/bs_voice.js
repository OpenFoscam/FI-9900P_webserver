$(function () {
    MasklayerHide();
    function BsVoiceStatusCall(xml) {
        $("#selBsVoiceStat").val($(xml).find("isEnable").text() * 1);
    }
    $("#bsvoiceRf").click(function () {
        RfParamCall(BsVoiceStatusCall, "", "getVoiceEnableState");
    });
    $("#bsvoiceSave").click(function () {
        RfParamCall(null, "", "setVoiceEnableState&isEnable=" + $("#selBsVoiceStat").val()*1); 
    });
    $("#bsvoiceRf").click();
})