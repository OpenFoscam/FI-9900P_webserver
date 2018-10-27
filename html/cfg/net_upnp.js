$(function(){
	MasklayerHide();
	function Call(xml){
		var UPnPisEn = $(xml).find("isEnable").text()*1;
		$("#SysipUPnP").val(UPnPisEn);
	}
	$("#netupnpRf").click(function(){
		RfParamCall(Call, "", "getUPnPConfig");
	})
	$("#SysipSave").click(function(){
		RfParamCall(null, "", "setUPnPConfig&isEnable="+$("#SysipUPnP").val(),null,30000);
	})
	$("#netupnpRf").click();
})