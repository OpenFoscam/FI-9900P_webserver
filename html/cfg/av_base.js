$(function () {
/*nvr  套装ipc 的判断*/

function initResolution(sensortype)
{
	var sensortype_1080p=[8,9,10,11,12,15,16,17];
    var sensortype_960p=[6,8,9];
    var sensortype_3M_2K=[11];
	var flag=true;
	var i ;
	for(i =0 ;i< sensortype_1080p.length ;i++)
	{
		if(sensortype==sensortype_1080p[i])
		{
			flag=false;
			break;
		}
	}
	if(flag)
	{
		$("#is1080Rsltion").remove();
	}
	flag=true;
	for(i =0 ;i< sensortype_960p.length ;i++)
	{
		if(sensortype==sensortype_960p[i])
		{
			flag=false;
			break;
		}
	}
	if(flag)
	{
		     $("#is960Rsltion").remove();
            if (gVar_first.model > 5000 && gVar_first.model < 6000) {
                //$("#avBSR_0").remove();
                //$("#avBSR_3").remove();
                $("#avBSR_4").remove();
            }
	}
	flag=true;
	for(i =0 ;i< sensortype_3M_2K.length ;i++)
	{
		if(sensortype==sensortype_3M_2K[i])
		{
			flag=false;
			break;
		}
	}
	if(flag)
	{
		$("#is3MRsltion").remove();
		$("#is4MRsltion").remove();
		$("#is6M_Rate").remove();
	}
	
}

    //MasklayerHide();
	if(isModel_6000To7000())
	{
		$("#AvBsGops").css("display","none");
		$("#SubAvBsGops").css("display","none");
	}
	if(isNVRIPC())
	{
		$("#avBSR_1").remove();
	}
	
    $("#avBaseStType").change(function () {
		
		var j;
        var i = $(this).val();
        $("#avbs_rsltion").val(Struct.StreamParamInfo[i].resolution);
        if(Struct.StreamParamInfo[i].bitRate > 4194304)
		{
			$("#avbs_bRate").val(6291456);
		}
        else if (Struct.StreamParamInfo[i].bitRate > 3145728&&Struct.StreamParamInfo[i].bitRate <=4194304 ) {
            $("#avbs_bRate").val(4194304);
        }else if (Struct.StreamParamInfo[i].bitRate > 1572864 && Struct.StreamParamInfo[i].bitRate <= 3145728) {
            $("#avbs_bRate").val(2097152);
        }
        else if (Struct.StreamParamInfo[i].bitRate > 786432 && Struct.StreamParamInfo[i].bitRate <= 1572864) {
            $("#avbs_bRate").val(1048576);
        }
        else if (Struct.StreamParamInfo[i].bitRate > 393216 && Struct.StreamParamInfo[i].bitRate <= 786432) {
            $("#avbs_bRate").val(524288);
        }
        else if (Struct.StreamParamInfo[i].bitRate > 233472 && Struct.StreamParamInfo[i].bitRate <= 393216) {
            if(isNVRIPC())
			{
				$("#avbs_bRate").val(204800);
			}
			else
			{
			$("#avbs_bRate").val(262144);
			}
        }
        else if (Struct.StreamParamInfo[i].bitRate > 167936 && Struct.StreamParamInfo[i].bitRate <= 233472) {
            $("#avbs_bRate").val(204800);
        }
        else if (Struct.StreamParamInfo[i].bitRate > 116736 && Struct.StreamParamInfo[i].bitRate <= 167936) {
            $("#avbs_bRate").val(131072);
        }
        else if (Struct.StreamParamInfo[i].bitRate > 76800 && Struct.StreamParamInfo[i].bitRate <= 116736) {
            $("#avbs_bRate").val(102400);
        }
        else if (Struct.StreamParamInfo[i].bitRate > 35840 && Struct.StreamParamInfo[i].bitRate <= 76800) {
            $("#avbs_bRate").val(51200);
        }
        else if (Struct.StreamParamInfo[i].bitRate > 0 && Struct.StreamParamInfo[i].bitRate <= 35840) {
            $("#avbs_bRate").val(20480);
        }
        $("#avbs_GOP").val(Struct.StreamParamInfo[i].GOP);
    	if(isModel_6000To7000()) 
    	{
    		if(i!=3)
    		{
    		$("#avbs_rsltion").attr("disabled","disabled");
    		$("#avbs_bRate").attr("disabled","disabled");
    		$("#avbs_fRate").attr("disabled","disabled");
    		$("#selAvBsisVBR").attr("disabled","disabled");
    		}
    		else
    		{
    		$("#avbs_rsltion").attr("disabled","");
    		$("#avbs_bRate").attr("disabled","");
    		$("#avbs_fRate").attr("disabled","");
    		$("#selAvBsisVBR").attr("disabled","");
    		}
    	}
	
	
        if (gVar_first.model > 5000 && gVar_first.model < 6000) {
            $("#streamLbrVal").val(Struct.StreamParamInfo[i].isVBR);
			$("#streamLbrVal").change();	
        }
        else {
            $("#selAvBsisVBR").val(Struct.StreamParamInfo[i].isVBR);
			}
        
		       
		for( j=1;j<=30;j++)
		{
			$("#avbs_fRate").append("<option value="+ j +">" + j + "</option>");
		}
		$("#avbs_fRate").val(Struct.StreamParamInfo[i].frameRate);
		$("#avbs_rsltion").change();
        $("#LbrRatio").text(Struct.StreamParamInfo[i].lbrRatio);
        var lbrLeft = (Struct.StreamParamInfo[i].lbrRatio - 10) * 2.5;
        if (lbrLeft < 0) {
            lbrLeft = 0;
            $("#Lbrbtn_1").css("margin-left", lbrLeft);
        }
        if (lbrLeft != "" || lbrLeft == 0) {
            $("#Lbrbtn_1").css("margin-left", lbrLeft);
        }
	
	
    });
    $("#avbs_rsltion").change(function () {
        var b = $("#avBaseStType").val();
		var frameRate=$("#avbs_fRate").val();
		var maxFrameRate=30;
		var lbr=$("#streamLbrVal").val();
		var resolution=$("#avbs_rsltion").val();
		var i;
        if (gVar_first.model > 5000 && gVar_first.model < 6000) {
           if(resolution == 9)
		   {
			   maxFrameRate=15;
		   }
		   else if (resolution == 7 ||resolution==8) {
              maxFrameRate = 25;
            }
            else {
               maxFrameRate = 30;
            }
        $("#streamLbrVal").change();
		}
        else if(isModel_6000To7000())
		{
			maxFrameRate=30;
            if(isNVRIPC()){
                maxFrameRate=19;
            }
		}
		else{
            var bsResolution = $(this).val();
            var bsRate = $("#avbs_fRate").val();
            if (gVar_first.model > 3000 && gVar_first.model < 4000) {
    		    if(!isNVRIPC()){
					maxFrameRate=23;
    		    }else{
    				maxFrameRate=19;
				}
            }
        }
			
	   $("#avbs_fRate").empty();
        for (i = 1; i <=maxFrameRate; i++) {
            $("#avbs_fRate").append("<option value=" + i + ">" + i + "</option>");
        }
		if(frameRate<=maxFrameRate)
		{
        $("#avbs_fRate").val(frameRate);
		}
		else
		{
			$("#avbs_fRate").val(maxFrameRate);
		}
		
		
    });

    $("#avBaseSubStType").change(function () {
		var j,
		    i=$(this).val()*1, 
		    maxFrameRate=30, 
			subFrameRate = Struct.SubStreamParamInfo[i].frameRate,
		    resolution=Struct.SubStreamParamInfo[i].resolution;
		$("#avbssub_fRate").empty();
        for(j=1;j<=maxFrameRate;j++)
		{
			$("#avbssub_fRate").append("<option value=" + j + " > " + j + "</option>");
		}
        if (Struct.SubStreamParamInfo[i].resolution * 1 >= 0) $("#avbssub_rsltion").val(resolution);

        if (Struct.SubStreamParamInfo[i].frameRate * 1 > 0) $("#avbssub_fRate").val(subFrameRate);
		
        if (Struct.SubStreamParamInfo[i].GOP * 1 >= 10) $("#avbssub_GOP").val(Struct.SubStreamParamInfo[i].GOP);

        //if (Struct.SubStreamParamInfo[i].bitRate * 1 > 0) $("#avbssub_bRate").val(Struct.SubStreamParamInfo[i].bitRate);
        if (Struct.SubStreamParamInfo[i].bitRate > 1572864) {
            $("#avbssub_bRate").val(2097152);
        }
        if (Struct.SubStreamParamInfo[i].bitRate > 786432 && Struct.SubStreamParamInfo[i].bitRate <= 1572864) {
            $("#avbssub_bRate").val(1048576);
        }
        if (Struct.SubStreamParamInfo[i].bitRate > 393216 && Struct.SubStreamParamInfo[i].bitRate <= 786432) {
            $("#avbssub_bRate").val(524288);
        }
        if (Struct.SubStreamParamInfo[i].bitRate > 233472 && Struct.SubStreamParamInfo[i].bitRate <= 393216) {
            if(isNVRIPC())
			{
				$("#avbssub_bRate").val(204800);
			}
			else
			{
			$("#avbssub_bRate").val(262144);
			}
        }
        if (Struct.SubStreamParamInfo[i].bitRate > 167936 && Struct.SubStreamParamInfo[i].bitRate <= 233472) {
            $("#avbssub_bRate").val(204800);
        }
        if (Struct.SubStreamParamInfo[i].bitRate > 116736 && Struct.SubStreamParamInfo[i].bitRate <= 167936) {
            $("#avbssub_bRate").val(131072);
        }
        if (Struct.SubStreamParamInfo[i].bitRate > 76800 && Struct.SubStreamParamInfo[i].bitRate <= 116736) {
            $("#avbssub_bRate").val(102400);
        }
        if (Struct.SubStreamParamInfo[i].bitRate > 35840 && Struct.SubStreamParamInfo[i].bitRate <= 76800) {
            $("#avbssub_bRate").val(51200);
        }
        if (Struct.SubStreamParamInfo[i].bitRate > 0 && Struct.SubStreamParamInfo[i].bitRate <= 35840) {
            $("#avbssub_bRate").val(20480);
        }
        if (Struct.SubStreamParamInfo[i].lbrRatio * 1 >= 10) {
            $("#LbrSubRatio").text(Struct.SubStreamParamInfo[i].lbrRatio);
        }
        $("#SubLbrVal").val(Struct.SubStreamParamInfo[i].isVBR);
		$("#avbssub_rsltion").change();
        var lbrSubLeft = (Struct.SubStreamParamInfo[i].lbrRatio - 10) * 2.5;
        if (lbrSubLeft < 0) {
            lbrSubLeft = 0;
            $("#Lbrbtn_2").css("margin-left", lbrSubLeft);
        }
        if (lbrSubLeft != "" || lbrSubLeft == 0) {
            $("#Lbrbtn_2").css("margin-left", lbrSubLeft);
        }
		if(isModel_6000To7000()) 
	    {
			if(i!=3)
			{
		    $("#avbssub_rsltion").attr("disabled","disabled");
		    $("#avbssub_bRate").attr("disabled","disabled");
		    $("#avbssub_fRate").attr("disabled","disabled");
		    //$("#selAvBsisVBR").attr("disabled","disabled");
			}
			 else
	        {
		    $("#avbssub_rsltion").attr("disabled","");
		    $("#avbssub_bRate").attr("disabled","");
		    $("#avbssub_fRate").attr("disabled","");
		    //$("#selAvBsisVBR").attr("disabled","");
		
     	    }
	    }
	   
		
		
    })

    //LBR
    $("#streamLbrVal").change(function () {
        var lbr = $(this).val() * 1;
		var resolution=$("#avbs_rsltion").val();
		if(lbr == 2 && ( resolution == 8 || resolution ==9 )){
			$("#liveLBRNumber").css("display", "");
            $("#avbs_bRate").val(6291456);
            $("#avbs_bRate").attr("disabled", "disabled");
            $("#avbs_fRate").attr("disabled", "disabled");
            $("#avbs_GOP").attr("disabled", "disabled");
	    }
		else if (lbr == 2 && resolution == 7) {
            $("#liveLBRNumber").css("display", "");
            $("#avbs_bRate").val(4194304);
            $("#avbs_bRate").attr("disabled", "disabled");
            $("#avbs_fRate").attr("disabled", "disabled");
            $("#avbs_GOP").attr("disabled", "disabled");
        }
        else if (lbr == 2 && resolution == 0) {
            $("#liveLBRNumber").css("display", "");
            $("#avbs_bRate").val(2097152);
            $("#avbs_bRate").attr("disabled", "disabled");
            $("#avbs_fRate").attr("disabled", "disabled");
            $("#avbs_GOP").attr("disabled", "disabled");
        }
        else if (lbr == 2 && resolution == 1 || lbr == 2 && resolution == 3) {
            $("#liveLBRNumber").css("display", "");
            $("#avbs_bRate").val(1048576);
            $("#avbs_bRate").attr("disabled", "disabled");
            $("#avbs_fRate").attr("disabled", "disabled");
            $("#avbs_GOP").attr("disabled", "disabled");
        }
        else if (lbr == 2 && resolution == 2 || lbr == 2 && resolution == 4) {
            $("#liveLBRNumber").css("display", "");
            $("#avbs_bRate").val(524288);
            $("#avbs_bRate").attr("disabled", "disabled");
            $("#avbs_fRate").attr("disabled", "disabled");
            $("#avbs_GOP").attr("disabled", "disabled");
        }
        else {
			 $("#liveLBRNumber").css("display", "none");
            $("#avbs_bRate").attr("disabled", "");
            $("#avbs_fRate").attr("disabled", "");
            $("#avbs_GOP").attr("disabled", "");
        }
    });

    //sub stream
    $("#SubLbrVal").change(function () {
        var lbr = $(this).val() * 1;
		var resolution = $("#avbssub_rsltion").val();
        if (lbr == 2 && resolution == 0 || lbr == 2 && resolution == 1 || lbr == 2 && resolution == 3) {
            $("#liveSubLBRNumber").css("display", "");
            $("#avbssub_bRate").val(1048576);
            $("#avbssub_bRate").attr("disabled", "disabled");
            $("#avbssub_fRate").attr("disabled", "disabled");
            $("#avbssub_GOP").attr("disabled", "disabled");
        }
        else if (lbr == 2 && resolution == 2) {
            $("#liveSubLBRNumber").css("display", "");
            $("#avbssub_bRate").val(524288);
            $("#avbssub_bRate").attr("disabled", "disabled");
            $("#avbssub_fRate").attr("disabled", "disabled");
            $("#avbssub_GOP").attr("disabled", "disabled");
        }
        else {
           $("#liveSubLBRNumber").css("display", "none");
            $("#avbssub_bRate").attr("disabled", "");
            $("#avbssub_fRate").attr("disabled", "");
            $("#avbssub_GOP").attr("disabled", "");
        }
    });

    $("#avbssub_rsltion").change(function () {
		var i;
        var subResolution = $(this).val() * 1;
        var subRate = $("#avbssub_fRate").val();
		var lbr=$("#SubLbrVal").val();
		var maxFrameRate=30;
        if (gVar_first.model > 5000 && gVar_first.model < 6000) {
            $("#SubLbrVal").change();
			if (subResolution == 0) {
               maxFrameRate=11;
            }
            else {
				maxFrameRate=20;
				}

        }
        if (gVar_first.model > 3000 && gVar_first.model < 4000) {
            if (subResolution == 0) {
				maxFrameRate = 10;
			}
			else {
               maxFrameRate = 15;
            }
        }
        else if(gVar_first.model > 5000 && gVar_first.model < 6000)
		{
			 if (subResolution == 0) {
                maxFrameRate = 11;
            } 
			else {
				maxFrameRate = 20;
			}
				
		} 
		else if(isModel_6000To7000())
		 {
           maxFrameRate = 15;
        }
		else
		{
			maxFrameRate = 30;
		}
		if(isNVRIPC()){
			var bitrate = $("#avbssub_bRate").val();
			if(subResolution == 2 || subResolution == 4){
				$("#is1M_bRate").remove();
				$("#is512k_bRate").remove();
			}
			else{
				$("#avbssub_bRate").empty();
				$("#avbssub_bRate").append("<option value='1048576' id='is1M_bRate'>1M</option>");
				$("#avbssub_bRate").append("<option value='524288' id='is512k_bRate'>512K</option>");
				$("#avbssub_bRate").append("<option value='262144' id='is256k_bRate'>256K</option>");
                $("#avbssub_bRate").append("<option value='204800'>200K</option>");
				$("#avbssub_bRate").append("<option value='102400'>100K</option>");
				$("#avbssub_bRate").append("<option value='51200'>50K</option>");
				$("#avbssub_bRate").append("<option value='20480'>20K</option>");
				$("#avbssub_bRate").val(bitrate);
			}
		}
		$("#avbssub_fRate").empty();
		for(i=1;i<=maxFrameRate;i++)
		{
			$("#avbssub_fRate").append("<option value=" + i + " > " + i + "</option>");
		}
		if(subRate<=maxFrameRate)
		{
		$("#avbssub_fRate").val(subRate);
		}
		else
		{
			$("#avbssub_fRate").val(maxFrameRate);
		}
		
    });


    function GetDeFrameCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            $("#chkAvBaseNight").attr("checked", $(xml).find("level").text() * 1);    //level: 1 - open; 0 - close
        }
        $("#avbaseRf").attr("disabled", "");
        MasklayerHide();
    }
    function subTypeCall(xml){
        if($(xml).find('result').text() == "0"){
            var subType = $(xml).find('streamType').text()*1;
            $("#avBaseSubStType").val(subType);
            $("#avBaseSubStType").change();
            RfParamCall(GetDeFrameCall, "", "getDeFrameLevel");
        }
    }
    function SubCall(xml) {
        var result = $(xml).find("result").text() * 1;
        if (result == 0) {
            for (var i = 0; i < 4; i++) {
                Struct.SubStreamParamInfo[i].resolution = $(xml).find("resolution" + i).text() * 1;
                Struct.SubStreamParamInfo[i].bitRate = $(xml).find("bitRate" + i).text() * 1;
                Struct.SubStreamParamInfo[i].frameRate = $(xml).find("frameRate" + i).text() * 1;
                Struct.SubStreamParamInfo[i].GOP = $(xml).find("GOP" + i).text() * 1;
                Struct.SubStreamParamInfo[i].isVBR = $(xml).find("isVBR" + i).text() * 1;
                Struct.SubStreamParamInfo[i].lbrRatio = $(xml).find("lbrRatio" + i).text() * 1;
            }
            setTimeout(function(){
                RfParamCall(subTypeCall, "", "getSubVideoStreamType");
            },300);
        }
    }
    function mainTypeCall(xml){
        if($(xml).find('result').text() == "0"){
            var mainType = $(xml).find('streamType').text()*1;
            $("#avBaseStType").val(mainType);
            $("#avBaseStType").change();
            RfParamCall(SubCall, "", "getSubVideoStreamParam");
        }
    }
    function Call(xml) {
        for (var i = 0; i < 4; i++) {
            Struct.StreamParamInfo[i].resolution = $(xml).find("resolution" + i).text() * 1;
            Struct.StreamParamInfo[i].bitRate = $(xml).find("bitRate" + i).text() * 1;
            Struct.StreamParamInfo[i].frameRate = $(xml).find("frameRate" + i).text() * 1;
            Struct.StreamParamInfo[i].GOP = $(xml).find("GOP" + i).text() * 1;
            Struct.StreamParamInfo[i].isVBR = $(xml).find("isVBR" + i).text() * 1;
            Struct.StreamParamInfo[i].lbrRatio = $(xml).find("lbrRatio" + i).text() * 1;
        }
    /*    if (gVar_first.sensorType != 6 && gVar_first.sensorType != 8 && gVar_first.sensorType != 9) {
            $("#is960Rsltion").remove();
            if (gVar_first.model > 5000 && gVar_first.model < 6000) {
                //$("#avBSR_0").remove();
                //$("#avBSR_3").remove();
                $("#avBSR_4").remove();
            }
        }*/
        if (gVar_first.model > 5000 && gVar_first.model < 6000) {
            $("#liveSubLBR,#liveLBR").css("display", "");
            $("#avbaseVBR").css("display", "none");
            $("#divAvBaseNight").css("display", "none");
            $("#chkAvBaseNight").css("display", "none");
            //$("#avBR_3").remove();
            $("#avBR_4").remove();
            $("#is50k_Rate").remove();
            $("#is20k_Rate").remove();
        }
		// sensorType 10 is same with 12
		
		initResolution(gVar_first.sensorType)
		/*
        if (gVar_first.sensorType != 8 && gVar_first.sensorType != 9 && gVar_first.sensorType != 10&&gVar_first.sensorType!=11&&gVar_first.sensorType != 12) {
            $("#is1080Rsltion").remove();
        }*/
        setTimeout(function(){
            RfParamCall(mainTypeCall, "", "getMainVideoStreamType");
        },300);
    }

    $("#avbaseRf").click(function () {
        //init sub stream
        //$("#avbssub_bRate").attr("disabled", "disabled");
        //$("#avbssub_fRate").attr("disabled", "disabled");
        //$("#avbssub_GOP").attr("disabled", "disabled");
        //$("#avBSST_2").remove();
        //$("#avBSST_3").remove();
        //$("#avBSR_0").remove();
		


        UI.Clors("Lbrdiv_1", "Lbrbtn_1", "Lbrdir_1", 0, function ($o, v) { $("#LbrRatio").attr("innerHTML", v | 0); });
        UI.Clors("Lbrdiv_2", "Lbrbtn_2", "Lbrdir_2", 0, function ($o, v) { $("#LbrSubRatio").attr("innerHTML", v | 0); });
        
		if(isModel_6000To7000())
		{
			$("#avBSR_0").remove();
			$("#is2M_bRate,#is1M_bRate").remove();
		}
		
		
        if (gVar_first.model >= 2001 && gVar_first.model < 3000) {
            $("#avBSR_1").remove();
            $("#avBSR_3").remove();
            $("#avBSR_0").remove();
            $("#is256k_Rate").remove();
            $("#is128k_Rate").remove();
            $("#is128k_bRate").remove();
            $("#is256k_bRate").remove();
            $("#is512k_bRate").remove();
        }
        if (gVar_first.model > 1000 && gVar_first.model < 2000) {
            $("#avBSR_0").remove();
			/*if (gVar_first.sensorType == 6) {
                $("#avBSR_0").remove();
            }*/
            $("#is2M_bRate,#is1M_bRate").remove();
        }
        if (gVar_first.model == 1111 || gVar_first.model == 1112) {
            $("#is50k_Rate").remove();
            $("#is20k_Rate").remove();
        }
        if (gVar_first.model > 3000 && gVar_first.model < 4000) {
			if(!isNVRIPC()){
				$("#avBSR_1").remove();
				$("#avBSR_3").remove();
				$("#is512k_bRate").remove();
				$("#is1M_bRate").remove();
			}
            $("#is4M_Rate").remove();
            $("#is256k_Rate").remove();
            $("#is128k_Rate").remove();
            $("#avBSR_0").remove();
            //$("#is256k_bRate").remove();
            $("#is128k_bRate").remove();
            $("#is2M_bRate").remove();
        }
		
		

        $("#avBSR_is960Rsltion").remove();
        $("#avBSR_is1080Rsltion").remove();

        if (gVar_first.HasSubStream == -1) {
            $("#AvBsSubStreamT").remove();
            $("#substreamtab").remove();
        }
        RfParamCall(Call, "", "getVideoStreamParam");
        $("#avbaseRf").attr("disabled", "disabled");
        MasklayerShow();
    });
    function setDeFrameLevelCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            MasklayerHide();
            RfParamCallNoShadow("", "", "setMainVideoStreamType&streamType=" + $("#avBaseStType").val()*1);
            setTimeout(function(){
                RfParamCallNoShadow("", "", "setSubVideoStreamType&streamType=" + $("#avBaseSubStType").val()*1);
            },300);
        }
    }
    function SaveSubStreamParmCall(xml) {
        //setTimeout(function () { $("#live_spl").change() }, 50);
        bMaskHide = false;
        
        if (gVar.nStreamType == 0) {
            var i = $("#avBaseStType").val();
            Struct.StreamParamInfo[i].resolution = $("#avbs_rsltion").val();
            Struct.StreamParamInfo[i].bitRate = $("#avbs_bRate").val();
            Struct.StreamParamInfo[i].frameRate = $("#avbs_fRate").val();
            Struct.StreamParamInfo[i].GOP = $("#avbs_GOP").val();
            if (gVar_first.model > 5000 && gVar_first.model < 6000) {
                Struct.StreamParamInfo[i].isVBR = $("#streamLbrVal").val();
            }
            else {
                Struct.StreamParamInfo[i].isVBR = $("#selAvBsisVBR").val();
            }
            RfSpl();
        }
        else {
            var i = $("#avBaseSubStType").val();
            Struct.SubStreamParamInfo[i].resolution = $("#avbssub_rsltion").val();
            Struct.SubStreamParamInfo[i].bitRate = $("#avbssub_bRate").val();
            Struct.SubStreamParamInfo[i].frameRate = $("#avbssub_bRate").val();
            Struct.SubStreamParamInfo[i].GOP = $("#avbssub_GOP").val();
            if (gVar_first.model > 5000 && gVar_first.model < 6000) {
                Struct.SubStreamParamInfo[i].isVBR = $("#SubLbrVal").val();
            }
            else {
                Struct.SubStreamParamInfo[i].isVBR = 1;
            }
            RfSplSub();
        }
        RfParamCall(setDeFrameLevelCall, "", "setDeFrameLevel&level=" + ($("#chkAvBaseNight").attr("checked") * 1));
        
    }
    function SaveMainStreamParmCall(xml) {
        bMaskHide = false;
        if (gVar_first.model > 5000 && gVar_first.model < 6000) {
            RfParamCall(SaveSubStreamParmCall, "", "setSubVideoStreamParam&streamType=" + $("#avBaseSubStType").val() + "&resolution=" + $("#avbssub_rsltion").val() + "&bitRate=" + $("#avbssub_bRate").val() + "&frameRate=" + $("#avbssub_fRate").val() + "&GOP=" + $("#avbssub_GOP").val() + "&isVBR=" + $("#SubLbrVal").val() + "&lbrRatio=" + $("#LbrSubRatio").text());
        }
        else {
            RfParamCall(SaveSubStreamParmCall, "", "setSubVideoStreamParam&streamType=" + $("#avBaseSubStType").val() + "&resolution=" + $("#avbssub_rsltion").val() + "&bitRate=" + $("#avbssub_bRate").val() + "&frameRate=" + $("#avbssub_fRate").val() + "&GOP=" + $("#avbssub_GOP").val() + "&isVBR=" + 1);
        }
    }

    $("#avBsSave").click(function () {
        bMaskHide = false;
        if (gVar_first.model > 5000 && gVar_first.model < 6000) {
            RfParamCall(SaveMainStreamParmCall, "", "setVideoStreamParam&streamType=" + $("#avBaseStType").val() + "&resolution=" + $("#avbs_rsltion").val() + "&bitRate=" + $("#avbs_bRate").val() + "&frameRate=" + $("#avbs_fRate").val() + "&GOP=" + $("#avbs_GOP").val() + "&isVBR=" + $("#streamLbrVal").val() + "&lbrRatio=" + $("#LbrRatio").text());
        }
        else {
            RfParamCall(SaveMainStreamParmCall, "", "setVideoStreamParam&streamType=" + $("#avBaseStType").val() + "&resolution=" + $("#avbs_rsltion").val() + "&bitRate=" + $("#avbs_bRate").val() + "&frameRate=" + $("#avbs_fRate").val() + "&GOP=" + $("#avbs_GOP").val() + "&isVBR=" + $("#selAvBsisVBR").val());
        }
    });

    $("#avbaseRf").click();
})