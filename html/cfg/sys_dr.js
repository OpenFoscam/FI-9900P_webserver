$(function () {
    function Call(xml) {
        $("#MaskError").html("");
        var LCapt;
        LCapt = $(xml).find("fileName").text();
        //var a = $("<a href='/configs/export/"+LCapt+"' target='_new'></a>").get(0);
        document.getElementById("cgiframe").src = "/configs/export/" + LCapt;
        /*if($.browser.msie)   window.open(a); 			
        else if (document.createEvent)
        {
        var evObj = document.createEvent('MouseEvents')
        evObj.initEvent( 'click', true, false )
        a.dispatchEvent(evObj)
        }
        else if (document.createEventObject)
        {
        //a.click();
        a.fireEvent('onclick')
        }*/
    }

    $("#PareDraw").click(function () {
        RfParamCall(Call, "", "exportConfig");
    })

    $("#btnSysConfig").click(function () {
        var configFilePath = gDvr.UpdateFirmFilePath(function(data){
			if(!!!data)
			return ;
			
			$("#txtSysConfig").val(data);
			
			gDvr.GetFileSizeByPath(data+"",function(data){
				
				
				if(data*1<=0)
				{
				ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NOT_0KB_FILE"))
				$("#txtSysConfig").val("");
				}
				
				})
	        	
	    	  	});
    })

    function ConfigUpdateCall(xml) {
        if ($(xml).find("result").text() == 0 && xml != null) {
            Do_js_Time("sysDrResult", 50, lg.get("IDS_CLASS_ZR"), "0", "55px");
        }
    }

    $("#PareImport").click(function () {
        /*var filetype = $("#SysDrUPathw").val().substr($("#SysDrUPathw").val().length - 4, 4);
        //check file type        1---.bin        0----not .bin
        if (filetype != ".bin") {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYS_DR_FILETYPE_ERROR"));
        return;
        }
        gVar.ajaxFileUpload('sysDrResult', 'SysDrUPathw', 'importConfig');*/
        var configFileType = $("#txtSysConfig").val().substr($("#txtSysConfig").val().length - 4, 4);
        //check file type        1---.bin        0----not .bin
        if (configFileType != ".bin") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYS_DR_FILETYPE_ERROR"));
            return;
        }
        bMaskHide = false;
        RfParamCall(ConfigUpdateCall, "", "importConfig&sender=udt");
    })

    $("#sysdrRf").click(function () {
        MasklayerHide();
    });
    $("#sysdrRf").click();
})