$(function () {
    MasklayerHide();
    var ipwebport = 0;
    var ipmediaport = 0;
    var iphttpsport = 0;
    var iponvifport = 0;
    var ipp2pport = 0;
    var unSafePort = [1, 7, 9, 11, 13, 15, 17, 19, 20, 21, 22, 23, 25, 37, 42, 43, 53, 77, 79, 87, 95, 101, 102, 103, 104, 109, 110, 111, 113, 115, 117, 119, 123, 135, 139, 143, 179, 389, 465, 512, 513, 514, 515, 526, 530, 531, 532, 540, 556, 563, 587, 601, 636, 993, 995, 2049, 3659, 4045, 6000, 6665, 6667, 6668, 6669];
    var isPort = ',' + unSafePort.join(",") + ",";
    var rtspPort = 0;

    function CallP2PPort(xml) {
        ipp2pport = $(xml).find("port").text() * 1;
    }
  $("#SysipOfPort1").blur(function () {
        var ipHPort = $("#SysipOfPort1").val();
        if (isPort.indexOf("," + ipHPort + ",") != -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_UNSAFE_PORT"));
            $("#SysipOfPort1").val("");
            $("#SysipOfPort1").focus();
            return;
        }
    });
	
	$("#enableOnvif").change(function(){
		 DivBox($(this).attr("checked") * 1, "#netonviftab1");
		})
    function Call(xml) {
        ipwebport = $(xml).find("webPort").text() * 1;
        ipmediaport = $(xml).find("mediaPort").text() * 1;
        iphttpsport = $(xml).find("httpsPort").text() * 1;
        iponvifport = $(xml).find("onvifPort").text() * 1;
        $("#SysipOfPort1").val(iponvifport);
        rtspPort = $(xml).find("rtspPort").text() * 1;
        $("#SysipRTPort1").val(rtspPort);
		bMaskHide = false;
        RfParamCall(CallP2PPort, "", "getP2PPort");
    }

  


function GetOnvifAgentStatCall(xml)
{
	if($(xml).find("OnvifAgentStat").text()=="enable")
	{
		$("#enableOnvif").attr("checked","checked");
	}
	else
	{
		$("#enableOnvif").attr("checked","");
	}
	$("#enableOnvif").change();
	bMaskHide = false;
	RfParamCall(Call,"","getPortInfo");
	
}


    $("#netonvifRf").click(function () {
        if (gVar_first.model > 3000 && gVar_first.model < 4000||isModel_6000To7000()) {
            $("#RtspPortShow1").css("display", "");
        }
        RfParamCall(GetOnvifAgentStatCall, "", "GetOnvifAgentStat");

    })
	
	
	$("#netonvifSave").click(function(){
		   $("#MaskError").html("");
        var ipOfPort = $("#SysipOfPort1").val();
        if ( $("#SysipOfPort1").val() == 0||$("#SysipRTPort1").val()==0) {
            User_defined_text("netonvifResult", lg.get("IDS_NET_PORT_NONULL"), "0", "55px");
            return;
        }

        if ( $("#SysipOfPort1").val() == 21||$("#SysipRTPort1").val()==21) {
            User_defined_text("netonvifResult", lg.get("IDS_NET_PORTILLEGAL_TIPS"), "0", "55px");
            return;
        }


            //check http port and onvif port  if same
            if (ipwebport == $("#SysipOfPort1").val()) {
                User_defined_text("netonvifResult", lg.get("IDS_NET_PORT_HTTPONVIF_NOSAME"), "0", "55px");
                return;
            }
            //check https port and onvif port if same
            if (iphttpsport == $("#SysipOfPort1").val()) {
                User_defined_text("netonvifResult", lg.get("IDS_NET_PORT_HTTPSONVIF_NOSAME"), "0", "55px");
                return;
            }
        
        //if is p2p dev
        if (gVar_first.p2pFlag == 1) {
           
                //check onvif ports and p2p port if same
                if ($("#SysipOfPort1").val() == ipp2pport) {
                    User_defined_text("netonvifResult", lg.get("IDS_NET_PORT_ONVIFP2P_NOSAME"), "0", "55px");
                    return;
                }
            
        } //end if is p2pDev

        if (isPort.indexOf("," + ipOfPort + ",") != -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_UNSAFE_PORT"));
            $("#SysipOfPort1").val("");
            return;
        }
        //if is RTSP
       
            if ( ipwebport== $("#SysipRTPort1").val()) {
                User_defined_text("netonvifResult", lg.get("IDS_NET_PORT_HTTPRTSP_NOSAME"), "0", "55px");
                return;
            }
            if (iphttpsport == $("#SysipRTPort1").val()) {
                User_defined_text("netonvifResult", lg.get("IDS_NET_PORT_HTTPSRTSP_NOSAME"), "0", "55px");
                return;
            }
            if ($("#SysipOfPort1").val() == $("#SysipRTPort1").val()) {
                User_defined_text("netonvifResult", lg.get("IDS_NET_PORT_ONVIFRTSP_NOSAME"), "0", "55px");
                return;
            }
		
		
		if($("#enableOnvif").attr("checked")*1)
		{    
			 RfParamCall(EnableAgentStatCall, "", "EnableOnvifAgent");
		
		}
		else
		{
			 RfParamCall(null, "", "DisableOnvifAgent");
		}
		
		
		
		
		
		})
	
	
	
	
   function EnableAgentStatCall(xml) {
     
            
			if($(xml).find("result").text() * 1 != 0|| xml===null)
			 return;
            MasklayerShow();
            bMaskHide = false;
            RfParamCall(null, "", "setPortInfo&webPort=" + ipwebport + "&mediaPort=" + ipmediaport + "&httpsPort=" + iphttpsport + "&rtspPort=" + $("#SysipRTPort1").val() + "&onvifPort=" + $("#SysipOfPort1").val());
      
   }
    $("#netonvifRf").click();
})