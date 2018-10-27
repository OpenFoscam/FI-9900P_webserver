$(function () {
    MasklayerHide();
    var firmwarever;
    function Call(xml) {
        firmwarever = $(xml).find("firmwareVer").text();
        if (firmwarever.match("p")) {
            $("#sys_RemovePatch").attr("disabled", "");
        }
        else {
            $("#sys_RemovePatch").attr("disabled", "disabled");
        }
        document.getElementById("sys_upNowVer_patch").innerHTML = lg.get("IDS_SYS_UPNOWVER") + ": " + firmwarever;
    }

    $("#syspatchRf").click(function () {
        $("#MaskError").html("");
        RfParamCall(Call, "", "getDevInfo");
    })

    function RemovePatch_Call(xml) {
        if ($(xml).find("result").text() * 1 == 0 && xml != null) {
            $("#Supresult_patch").val(lg.get("IDS_SYS_RMSUCCESS"));
           getDevIPandPort();
            Do_js_Time("sysUpdataResult_patch", 100, lg.get("IDS_SYS_UPSEC") + "," + lg.get("IDS_COM_RESTART"), "0", "55px");
        }
        else {
            $("#Supresult_patch").val(lg.get("IDS_SYS_RMFAIL"));
        }
    }

    $("#sys_RemovePatch").click(function () {
        if (firmwarever.match("p")) {
            if (confirm(lg.get("IDS_COM_REMOVEPATCH"))) {
                $("#MaskError").html("");
                bMaskHide = false;
                RfParamCall(RemovePatch_Call, "", "removePatch");
            }
            else return;
        }
        else {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYS_NOPATCH"));
            return;
        }
    })

    $("#btnSysPatch").click(function () {
        gDvr.UpdateFirmFilePath(function(data){
			
			
			
			if(!!!data)
			return ;
			
		  $("#txtSysPatch").val(data);
			
			gDvr.GetFileSizeByPath(data+"",function(data){
				
				if(data*1<=0)
				{
				ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NOT_0KB_FILE"))
				$("#txtSysPatch").val("");
				}
				
				})
	        	
	    	  	});
    })

    function PatchUpdateCall(xml) {
        if ($(xml).find("result").text() == 0 && xml != null) {
            Do_js_Time("sysUpdataResult_patch", 180, lg.get("IDS_CLASS_UPDATA"), "0", "55px");
        }
    }

    $("#upPareDraw_patch").click(function () {
        var patchFileType = $("#txtSysPatch").val().substr($("#txtSysPatch").val().length - 4, 4);
        //check file type        1---.bin        0----not .bin
        if (patchFileType != ".bin") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYS_DR_FILETYPE_ERROR"));
            return;
        }
        bMaskHide = false;
        RfParamCall(PatchUpdateCall, "", "fwUpgrade&sender=udt", "",25000);
    });

    $("#syspatchRf").click();
})