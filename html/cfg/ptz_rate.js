$(function () {
    MasklayerHide();
	function SwitchCall(xml)
	{
		var afSwitch=$(xml).find("switch").text()*1;
		$("#IsAutoZoon").val(afSwitch);
	}
    function ZCall(xml) {
        var PTZRatete = $(xml).find("speed").text() * 1;
        $("#ZRateSet").val(PTZRatete);
		RfParamCall(SwitchCall, "", "getAFSwitch");
    }

    function Call(xml) {
        var PTZRatete = $(xml).find("speed").text() * 1;
        $("#PTZRateSet").val(PTZRatete);
        if (gVar_first.zoomFlag == 1) {
            RfParamCall(ZCall, "", "getZoomSpeed");
        }
    }

    $("#ptzrateRf").click(function () {
		if ((gVar_first.reserveFlag2 & 0x01) == 0) {
            $("#ZRateSetTR").remove();
            $("#AutoZoon").remove();
        }
        RfParamCall(Call, "", "getPTZSpeed");
    });
    function  SavePTZAutoZoon(xml)
    {
         RfParamCall(null, "", "setAFSwitch&switch=" + $("#IsAutoZoon").val());
    }
    function SavePTZSpeedCall(xml) {
        if (gVar_first.zoomFlag == 1) {
            RfParamCall(SavePTZAutoZoon, "", "setZoomSpeed&speed=" + $("#ZRateSet").val());
        }
    }

    $("#PTZRateSave").click(function () {
        RfParamCall(SavePTZSpeedCall, "", "setPTZSpeed&speed=" + $("#PTZRateSet").val());
    });
    
    $("#ptzrateRf").click();
})