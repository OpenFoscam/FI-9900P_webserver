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

    $("#SysipHPort").blur(function () {
        var ipHPort = $("#SysipHPort").val();
        if (isPort.indexOf("," + ipHPort + ",") != -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_UNSAFE_PORT"));
            $("#SysipHPort").val("");
            $("#SysipHPort").focus();
            return;
        }
    });
    $("#SysipHSPort").blur(function () {
        var ipHPort = $("#SysipHSPort").val();
        if (isPort.indexOf("," + ipHPort + ",") != -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_UNSAFE_PORT"));
            $("#SysipHSPort").val("");
            $("#SysipHSPort").focus();
            return;
        }
    });
    $("#SysipOfPort").blur(function () {
        var ipHPort = $("#SysipOfPort").val();
        if (isPort.indexOf("," + ipHPort + ",") != -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_UNSAFE_PORT"));
            $("#SysipOfPort").val("");
            $("#SysipOfPort").focus();
            return;
        }
    });

    function CallP2PPort(xml) {
        ipp2pport = $(xml).find("port").text() * 1;
    }

    function Call(xml) {
        ipwebport = $(xml).find("webPort").text() * 1;
        $("#SysipHPort").val(ipwebport);
        ipmediaport = $(xml).find("mediaPort").text() * 1;
        $("#SysipMPort").val(ipmediaport);
        iphttpsport = $(xml).find("httpsPort").text() * 1;
        $("#SysipHSPort").val(iphttpsport);
        iponvifport = $(xml).find("onvifPort").text() * 1;
        $("#SysipOfPort").val(iponvifport);
        rtspPort = $(xml).find("rtspPort").text() * 1;
        $("#SysipRTPort").val(rtspPort);
        RfParamCall(CallP2PPort, "", "getP2PPort");
    }

    function NetPortSaveCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            gVar.httpsPort = $("#SysipHPort").val();
            if (gVar_first.httpver == "http") {
                Do_js_Time("netPortResult", 10, lg.get("IDS_NET_REPORTS"), "0", "55px");
                setTimeout(function () { window.location = "http://" + gVar_first.ip + ":" + $("#SysipHPort").val() }, 10000)
            }
            if (gVar_first.httpver == "https") {
                Do_js_Time("netPortResult", 10, lg.get("IDS_NET_REPORTS"), "0", "55px");
                setTimeout(function () { window.location = "https://" + gVar_first.ip + ":" + $("#SysipHSPort").val() }, 10000)
            }
        }
        else {
            User_defined_text("netPortResult", lg.get("IDS_SAVE_FAILED"), "0", "55px");
        }
    }

    $("#netportRf").click(function () {
        if (gVar_first.model > 3000 && gVar_first.model < 4000||isModel_6000To7000()) {
            $("#RtspPortShow").css("display", "");
        }
        RfParamCall(Call, "", "getPortInfo");

    })
    $("#netportSave").click(function () {
        $("#MaskError").html("");
        var ipHPort = $("#SysipHPort").val();
        var ipHSPort = $("#SysipHSPort").val();
        var ipOfPort = $("#SysipOfPort").val();

        if (ipwebport == $("#SysipHPort").val() && ipmediaport == $("#SysipMPort").val() && iphttpsport == $("#SysipHSPort").val() && iponvifport == $("#SysipOfPort").val() && rtspPort == $("#SysipRTPort").val()) {
            return;
        }
        if ($("#SysipHPort").val() == 0 || $("#SysipHSPort").val() == 0 || (gVar_first.onvifFlag == 1 && $("#SysipOfPort").val() == 0)||(gVar_first.model > 3000 && gVar_first.model < 4000&&$("#SysipRTPort").val()==0)) {
            User_defined_text("netPortResult", lg.get("IDS_NET_PORT_NONULL"), "0", "55px");
            return;
        }

        if ($("#SysipHPort").val() == 21 || $("#SysipHSPort").val() == 21 || (gVar_first.onvifFlag == 1 && $("#SysipOfPort").val() == 21)||(gVar_first.model > 3000 && gVar_first.model < 4000&&$("#SysipRTPort").val()==21)) {
            User_defined_text("netPortResult", lg.get("IDS_NET_PORTILLEGAL_TIPS"), "0", "55px");
            return;
        }

        if ($("#SysipHPort").val() == $("#SysipHSPort").val()) {
            User_defined_text("netPortResult", lg.get("IDS_NET_PORT_NOSAME"), "0", "55px");
            return;
        }

        if (gVar_first.onvifFlag == 1) {
            //check http port and onvif port  if same
            if ($("#SysipHPort").val() == $("#SysipOfPort").val()) {
                User_defined_text("netPortResult", lg.get("IDS_NET_PORT_HTTPONVIF_NOSAME"), "0", "55px");
                return;
            }
            //check https port and onvif port if same
            if ($("#SysipHSPort").val() == $("#SysipOfPort").val()) {
                User_defined_text("netPortResult", lg.get("IDS_NET_PORT_HTTPSONVIF_NOSAME"), "0", "55px");
                return;
            }
        }

        //if is p2p dev
        if (gVar_first.p2pFlag == 1) {
            //check http port and p2p port if same
            if ($("#SysipHPort").val() == ipp2pport) {
                User_defined_text("netPortResult", lg.get("IDS_NET_PORT_HTTPP2P_NOSAME"), "0", "55px");
                return;
            }
            //check https port and p2p port if same
            if ($("#SysipHSPort").val() == ipp2pport) {
                User_defined_text("netPortResult", lg.get("IDS_NET_PORT_HTTPSP2P_NOSAME"), "0", "55px");
                return;
            }
            if (gVar_first.onvifFlag == 1) {
                //check onvif ports and p2p port if same
                if ($("#SysipOfPort").val() == ipp2pport) {
                    User_defined_text("netPortResult", lg.get("IDS_NET_PORT_ONVIFP2P_NOSAME"), "0", "55px");
                    return;
                }
            }
        } //end if is p2pDev

        if (isPort.indexOf("," + ipHPort + ",") != -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_UNSAFE_PORT"));
            $("#SysipHPort").val("");
            return;
        }
        if (isPort.indexOf("," + ipHSPort + ",") != -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_UNSAFE_PORT"));
            $("#SysipHSPort").val("");
            return;
        }
        if (isPort.indexOf("," + ipOfPort + ",") != -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_UNSAFE_PORT"));
            $("#SysipOfPort").val("");
            return;
        }
        //if is RTSP
        if (gVar.model > 3000 && gVar.model < 4000||isModel_6000To7000()) {
            if ($("#SysipHPort").val() == $("#SysipRTPort").val()) {
                User_defined_text("netPortResult", lg.get("IDS_NET_PORT_HTTPRTSP_NOSAME"), "0", "55px");
                return;
            }
            if ($("#SysipHSPort").val() == $("#SysipRTPort").val()) {
                User_defined_text("netPortResult", lg.get("IDS_NET_PORT_HTTPSRTSP_NOSAME"), "0", "55px");
                return;
            }
            if ($("#SysipOfPort").val() == $("#SysipRTPort").val()) {
                User_defined_text("netPortResult", lg.get("IDS_NET_PORT_ONVIFRTSP_NOSAME"), "0", "55px");
                return;
            }
        }

        MasklayerShow();
        if (ipwebport != $("#SysipHPort").val() ||  iphttpsport  != $("#SysipHSPort").val() ||iponvifport!= $("#SysipOfPort").val()) {
            bMaskHide = false;
            RfParamCall(NetPortSaveCall, "", "setPortInfo&webPort=" + $("#SysipHPort").val() + "&mediaPort=" + $("#SysipMPort").val() + "&httpsPort=" + $("#SysipHSPort").val() + "&rtspPort=" + $("#SysipRTPort").val() + "&onvifPort=" + (gVar_first.onvifFlag == 1 ? $("#SysipOfPort").val() : iponvifport));
        }
    })
    $("#netportRf").click();
})