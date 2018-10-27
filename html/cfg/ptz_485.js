$(function(){
	MasklayerHide();
	function Call(xml){
	    $("#p485Addr").val($(xml).find("rs485Addr").text());
	    $("#p485Protocol").val($(xml).find("rs485Protocol").text()*1);
	    $("#p485Baud").val($(xml).find("rs485Baud").text()*1);
	    $("#p485DataBit").val($(xml).find("rs485DataBit").text()*1);
	    $("#p485StopBit").val($(xml).find("rs485StopBit").text()*1);
	    $("#p485Check").val($(xml).find("rs485Check").text()*1);
	}
	$("#ptz485Rf").click(function(){
		RfParamCall(Call, "", "get485Info");
	});
	$("#ptz485Save").click(function(){
	    if($("#p485Addr").val() == ""){
	        $("#p485Addr").focus();
	        User_defined_text("ptz485Result",lg.get("IDS_PTZ_485_ADDR_ERR"),"0","55px");
	    }else{
	        RfParamCall(null, "", "set485Info&rs485Protocol="+$("#p485Protocol").val()+"&rs485Addr="+$("#p485Addr").val()+"&rs485Baud="+$("#p485Baud").val()+"&rs485DataBit="+$("#p485DataBit").val()+"&rs485StopBit="+$("#p485StopBit").val()+"&rs485Check="+$("#p485Check").val());
	    }
	});
	
	$("#ptz485Rf").click();
})