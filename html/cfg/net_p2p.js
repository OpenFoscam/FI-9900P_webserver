$(function () {
    MasklayerHide();
    var ipwebport = 0;
    var ipmediaport = 0;
    var iphttpsport = 0;
    var iponvifPort = 0;
    var ipp2pport = 0;
    var ipp2penable = 0;
    var ipp2puid = 0;
    var ipP2pServerflag;
    //var iponvifport = 0;

    $("#chkEnableP2PPort").change(function () {
        if(ipP2pServerflag !=2){
        DivBox($(this).attr("checked") * 1, "#tbP2P");
        }else{
            DivBox(0, "#tbP2P");
        }
    });

    function Call(xml) {
        if($(xml).find("result").text() * 1 == 0){
        ipwebport = $(xml).find("webPort").text() * 1;
        ipmediaport = $(xml).find("mediaPort").text() * 1;
        iphttpsport = $(xml).find("httpsPort").text() * 1;
        iponvifPort = $(xml).find("onvifPort").text() * 1;
            $("#netp2pRf").attr("disabled","");
        }
    }

    function CallP2PPort(xml) {
        if($(xml).find("result").text() * 1 == 0){
        ipp2pport = $(xml).find("port").text() * 1;
        $("#txtP2PPort").val(ipp2pport);
        RfParamCall(Call, "", "getPortInfo");
        }
    }

    function CallP2PUID(xml) {
        if($(xml).find("result").text() * 1 == 0){
            ipP2pServerflag = $(xml).find("p2pServer").text()*1;
            if($(xml).find("p2pServer").text()*1 == 2){
                DivBox(0, "#tbP2P");
            }
        ipp2puid = $(xml).find("uid").text();
        $("#theNetUID").val(ipp2puid);
        RfParamCall(CallP2PPort, "", "getP2PPort");
        }
    }

    function CallP2PEanble(xml) {
        if($(xml).find("result").text() * 1 == 0){
        $("#chkEnableP2PPort").attr("checked", $(xml).find("enable").text() * 1);
        $("#chkEnableP2PPort").change();
        ipp2penable = $(xml).find("enable").text() * 1;
        RfParamCall(CallP2PUID, "", "getP2PInfo");
        }
    }

    $("#netp2pRf").click(function () {
        $("#netp2pRf").attr("disabled","disabled");
        RfParamCall(CallP2PEanble, "", "getP2PEnable");
    })

    function P2PPortCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            if (gVar_first.httpver == "http") {
                Do_js_Time("netp2pResult", 10, lg.get("IDS_NET_REPORTS"), "0", "55px");
                setTimeout(function () { window.location = "http://" + gVar_first.ip + ":" + gVar_first.port }, 10000)
            }
            if (gVar_first.httpver == "https") {
                Do_js_Time("netp2pResult", 10, lg.get("IDS_NET_REPORTS"), "0", "55px");
                setTimeout(function () { window.location = "https://" + gVar_first.ip + ":" + gVar_first.port }, 10000)
            }
        }
    }

    function P2PEnableCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            RfParamCall(P2PPortCall, "", "setP2PPort&port=" + $("#txtP2PPort").val());
            /*gVar_first._Cgi({
            url: "cmd=setP2PPort&port=" + $("#txtP2PPort").val(),
            suc: function (data, state) {
            if (gVar_first.httpver == "http") {
            Do_js_Time("netp2pResult", 10, lg.get("IDS_NET_REPORTS"), "0", "55px");
            setTimeout(function () { window.location = "http://" + gVar_first.ip + ":" + gVar_first.port }, 10000)
            }
            if (gVar_first.httpver == "https") {
            Do_js_Time("netp2pResult", 10, lg.get("IDS_NET_REPORTS"), "0", "55px");
            setTimeout(function () { window.location = "https://" + gVar_first.ip + ":" + gVar_first.port }, 10000)
            }
            },
            err: function (data, state) {
            User_defined_text("netp2pResult", lg.get("IDS_NET_WIFININTE"), "0", "55px");
            }
            })*/
        }
    }

    $("#netp2pSave").click(function () {
        if (ipp2pport == $("#txtP2PPort").val() && ipp2penable == $("#chkEnableP2PPort").attr("checked") * 1)
            return;

        //check p2p port not null
        var p2pPort = $("#txtP2PPort").val();
        if(ipP2pServerflag != 2){
        if (p2pPort == 0) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_PORT_NONULL"));
            return;
            }
        }
        if (p2pPort == 21) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_PORTILLEGAL_TIPS"));
            return;
        }
        if (p2pPort == ipwebport) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_P2P_PORT_CHECKOUT1"));
            return;
        }
        if (p2pPort == iphttpsport) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_P2P_PORT_CHECKOUT2"));
            return;
        }
        if (p2pPort == ipmediaport) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_P2P_PORT_CHECKOUT3"));
            return;
        }
        if (p2pPort == iponvifPort) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_P2P_PORT_CHECKOUT4"));
            return;
        }
        if (ipp2pport != $("#txtP2PPort").val() || ipp2penable != $("#chkEnableP2PPort").attr("checked") * 1) {
            var isP2PUse = $("#chkEnableP2PPort").attr("checked") * 1;
            RfParamCall(P2PEnableCall, "", "setP2PEnable&enable=" + isP2PUse);
        }
    })
    $("#netp2pRf").click();
})