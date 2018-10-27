$(function(){
	MasklayerHide();
    var netCloudType = 0;
	
	$("#netcloudischeck").change(function(){
        DivBox($(this).attr("checked")*1 == 1, "#NetCloudTabel");
        DivBox($(this).attr("checked")*1 == 1, "#tbAuth");
    })
	
	function Call(xml){
	    //$("#netAuthor").val("");
		var isEna = $(xml).find("isEnable").text()*1;
		$("#netcloudischeck").attr("checked",isEna);
        $("#netcloudischeck").change();
		
		$("#netCloud_State").val($(xml).find("statusMsg").text());
		
        $("#selNet_Operator").empty();
		var cloudServ = $(xml).find("cloudServer").text()*1;
        if(cloudServ == 1){
            $("#selNet_Operator").append('<option value="1">Dropbox</option>');
        }else if(cloudServ == 2){
            $("#selNet_Operator").append('<option value="2">' + lg.get("IDS_CLOUD_BAIDU") + '</option>');
        }
		var authadr = $(xml).find("authAddr").text();
		$("#netAuthor").val(authadr);
		var acesCode = $(xml).find("code").text();
		$("#netAuthoriza_Code").val(acesCode);
		var acesToken = $(xml).find("accessToken").text();
		$("#access_Token").val(acesToken);
		var quotainfo = $(xml).find("quota").text()*1;
		$("#netTotal_Valume").html(quotainfo+"MB");
		var usedinfo = $(xml).find("used").text()*1;
		$("#netUsed_Valume").html(usedinfo+"MB");
        $("#netRemain_Volume").html((quotainfo - usedinfo) + "MB");
	}

    function Call2(xml){
        $("#netTotal_Valume").html($(xml).find("quota").text() * 1 + "MB");
        $("#netRemain_Volume").html(($(xml).find("quota").text() * 1 - $(xml).find("used").text() * 1) + "MB");
        //ShowPaop(lg.get("IDS_TIPS"), $(xml).find("statusMsg").text());
        $("#netCloud_State").val($(xml).find("statusMsg").text());
    }
	
	function quotaCall(xml){
		$("#netCloud_State").val($(xml).find("statusMsg").text());
		var quotainfo = $(xml).find("quota").text()*1;
		$("#netTotal_Valume").html(quotainfo+"MB");
		var usedinfo = $(xml).find("used").text()*1;
		$("#netUsed_Valume").html(usedinfo+"MB");
        $("#netRemain_Volume").html((quotainfo - usedinfo) + "MB");
	}
	
	$("#netcloudRf").click(function(){
		if (gVar_first.N_language == 2) {  // for foreign
            netCloudType = 1;
		} else {                           // for china
		    netCloudType = 2;
		}
        //RfParamCall(function(xml){
            //if($(xml).find("result").text() * 1 == 0){
                //var authadr1 = $(xml).find("authAddr").text();
                //$("#netAuthor").val(authadr1);
                RfParamCall(Call, "", "getCloudConfig", "", 10000);
            //}
        //} , "", "selectCloudServer&isEnable=1&cloudServer="+netCloudType, "", 10000);
	});
        
    $("#btnopennetAuthor").click(function(){
        window.open ($("#netAuthor").val());
	});

    function CloadCall3(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            setTimeout(function () {
                RfParamCall(Call2, "", "getCloudConfig", "", 10000);
            }, 10000);
        } else {
            MasklayerHide();
        }
    }

    function CloadCall2(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            RfParamCall(CloadCall3, "", "testCloudServer&isEnable=" + $("#netcloudischeck").attr("checked") * 1 + "&cloudServer=" + netCloudType + "&accessToken=" + $("#netAuthoriza_Code").val());
        } else {
            MasklayerHide();
        }
    }

    function CloadCall1(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            RfParamCall(CloadCall2, "", "getCloudQuota&isEnable=" + $("#netcloudischeck").attr("checked") * 1 + "&cloudServer=" + netCloudType + "&accessToken=" + $("#netAuthoriza_Code").val());
        } else {
            MasklayerHide();
        }
    }

    $("#btnCloudSubmit").click(function(){
        $("#netCloud_State").val("");
        RfParamCall(CloadCall1, "", "getCloudToken&isEnable=" + $("#netcloudischeck").attr("checked") * 1 + "&cloudServer=" + netCloudType + "&code=" + $("#netAuthoriza_Code").val());
    });
	
	$("#NetCloudSave").click(function(){
		RfParamCall(null, "", "setCloudConfig&isEnable="+$("#netcloudischeck").attr("checked")*1+"&cloudServer=" + netCloudType + "&accessToken="+$("#netAuthoriza_Code").val(), "", 10000);	
	});

	$("#netcloudRf").click();
});