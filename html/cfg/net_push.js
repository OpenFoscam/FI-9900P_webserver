$(function(){
	MasklayerHide();
	$("#netpushischeck").change(function(){DivBox($(this).attr("checked")*1 == 1, "#netpushtab");})
	function Call(xml){
		MasklayerHide();
        var isEna = $(xml).find("isEnable").text()*1;
		$("#netpushischeck").attr("checked",isEna);
		var statemsg = $(xml).find("statusMsg").text();
		$("#pushserverstate").val(statemsg);
		var pushserver = $(xml).find("pushServer").text()*1;
		$("#pushserver").val(pushserver);
		setTimeout(function(){
			$("#netpushischeck").change();
		}, 1)
	}
	//------------------------------
	function TestpushCall(xml){
        if($(xml).find("result").text() * 1 == 0){
            setTimeout(function(){
                RfParamCall(Call, "", "getPushConfig");
            }, 5000);
        }else{
            MasklayerHide();
        }
        //$("#pushserverstate").val($(xml).find("statusMsg").text());
	        /*var testResult = $(xml).find("resultCode").text() * 1;
	        switch (testResult) {
	            case 200:
	                $("#pushserverstate").val(lg.get("IDS_BS_TESTTURE"));
	                break;
	            case 400:
	                $("#pushserverstate").val(lg.get("IDS_PUSH_TEST_RESULT400"));
	                break;
	            case 402:
	                $("#pushserverstate").val(lg.get("IDS_PUSH_TEST_RESULT402"));
	                break;
	            case 403:
	                $("#pushserverstate").val(lg.get("IDS_PUSH_TEST_RESULT403"));
	                break;
	            case 404:
	                $("#pushserverstate").val(lg.get("IDS_PUSH_TEST_RESULT404"));
	                break;
	            case 405:
	                $("#pushserverstate").val(lg.get("IDS_PUSH_TEST_RESULT405"));
	                break;
	            case 408:
	                $("#pushserverstate").val(lg.get("IDS_PUSH_TEST_RESULT408"));
	                break;
	            case 409:
	                $("#pushserverstate").val(lg.get("IDS_PUSH_TEST_RESULT409"));
	                break;
	        }*/
    }
	
	
	//-------------------------
	$("#netpushRf").click(function(){
		$("#pushserverstate").val("");
        RfParamCall(Call, "", "getPushConfig");	
	});
	
	$("#netpushSave").click(function(){
		RfParamCall(null, "", "setPushConfig&isEnable="+$("#netpushischeck").attr("checked")*1+"&pushServer="+$("#pushserver").val());	
	});
	
	$("#pushtest").click(function(){
		 $("#pushserverstate").val("");
	    RfParamCall(TestpushCall, "", "testPushServer&isEnable="+$("#netpushischeck").attr("checked")*1+"&pushServer="+$("#pushserver").val());
	});
	
	$("#netpushRf").click();
	
});