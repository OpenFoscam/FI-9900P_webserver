$(function () {
	
	
	
    MasklayerHide();
    function Call(xml) {
        var firmwarever = $(xml).find("firmwareVer").text();
        document.getElementById("sys_upNowVer").innerHTML = lg.get("IDS_SYS_UPNOWVER") + ": " + firmwarever;
    }

    $("#sysupdataRf").click(function () {
        $("#MaskError").html("");
        if (gVar_first.model == 1113 ) {
            $("#sys_updata_fushibao").css("display", "none");
        }
        RfParamCall(Call, "", "getDevInfo");
    })

    $("#sys_upload").click(function () {
      var  brand="foscam";
     if(gVar_first.reserveFlag1==101)
      {
        brand="huntvisiontech";
      }

        if (gVar_first.N_language == 2) {
            var updateUrl = "http://www."+brand+".com/update/" + urlDecode(gVar_first.modelName) + "/" + urlDecode(gVar_first.modelName) + ".zip";
            $("#sys_upload").attr("href", updateUrl);
            //document.getElementById("cgiframe1").src = "" + urlDecode(gVar_first.modelName) + "/" + urlDecode(gVar_first.modelName) + ".zip";
        }
        else {
            var updateUrl = "http://www."+brand+".com.cn/update/" + urlDecode(gVar_first.modelName) + "/" + urlDecode(gVar_first.modelName) + ".zip";
            $("#sys_upload").attr("href", updateUrl);
        }
    })

    $("#btnSysUpdate").click(function () {
        gDvr.UpdateFirmFilePath(function(data){
			
			if(!!!data)
			return ;
			
			$("#txtSysUpdate").val(data);
			
			gDvr.GetFileSizeByPath(data+"",function(data){
				
				
				if(data*1<=0)
				{
				ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NOT_0KB_FILE"))
				$("#txtSysUpdate").val("");
				}
				
				})
			
			
	        	
	    	  	});
    })

    function FwUpdateCall(xml) {
        if ($(xml).find("result").text() == 0 && xml != null) {
            Do_js_Time("sysUpdataResult", 210, lg.get("IDS_CLASS_UPDATA"), "0", "55px");
        }
    }

    function EUpdateCall(xml) {
        if ($(xml).find("result").text() == 0 && xml != null) {
            Do_js_Time("sysUpdataResult", 260, lg.get("IDS_CLASS_UPDATA"), "0", "55px");
            setTimeout(function () {
                gDvr.GetDevIPandPort(43200000);
            }, 80000)
        }
    }

    $("#upPareDraw").click(function () {
        var filetype = $("#txtSysUpdate").val().substr($("#txtSysUpdate").val().length - 4, 4);
        if (filetype != ".bin") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYS_DR_FILETYPE_ERROR"));
            return;
        }
      
		 bMaskHide = false;
        if (gVar_first.model > 3000 && gVar_first.model < 4000||gVar_first.model > 5000 && gVar_first.model < 6000||gVar_first.model > 6000 && gVar_first.model < 7000) {
            RfParamCall(EUpdateCall, "", "fwUpgrade&sender=udt", "", 25000);
        }
        else {
            RfParamCall(FwUpdateCall, "", "fwUpgrade&sender=udt","",25000);
        }
			
			
			
			
        
    });
     if(gVar_first.reserveFlag1==100)
	 {
		 $("#sys_updata_fushibao").remove();
	 }
    $("#sysupdataRf").click();
})