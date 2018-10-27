$(function () {
    MasklayerHide();
    var ddnsServer = 0;
    var hostName = "";
    var user = "";
    var password = "";
    var language = gVar.lg;//ipc语言
    var timestamp = (new Date()).getTime();
    if(gVar_first.reserveFlag1 == 100 || (gVar_first.N_language != 2)){
        $("#netDDNSFoscam").remove();
    }
    function Call(xml) {
        if($(xml).find("result").text()*1 == 0){

            $(xml).find("CGI_Result").children().not("isEnable,result").each(function (i) {
                $("#netDDns_" + $(this).context.nodeName.toUpperCase()).val($(this).text());
            });

            hostName = XmlParser("hostName", xml);
            ddnsServer = XmlParser("ddnsServer", xml);
            user = XmlParser("user", xml);
            password = XmlParser("password", xml);
            factoryDDNS = XmlParser("factoryDDNS", xml);
            if(factoryDDNS==""){
                $("#netDDNSFoscam").attr("disabled","");
            }else{
                $("#netDDNSFoscam").attr("disabled","disabled");
            }

            if ($("#netDDns_DDNSSERVER").val() == 0) {
                $("#netddnstr0").css("display", "");
                $("#netddnstr1").css("display", "none");
                $("#netddnstr2").css("display", "none");
                $("#getDDNStr").css("display","none");
            }else if($("#netDDns_DDNSSERVER").val() == 5){
                $("#netddnstr0").css("display", "none");
                $("#netddnstr1").css("display", "none");
                $("#netddnstr2").css("display", "none");
                $("#getDDNStr").css("display","");
            }
            else {
                $("#netddnstr0").css("display", "");
                $("#netddnstr1").css("display", "");
                $("#netddnstr2").css("display", "");
                $("#getDDNStr").css("display","none");
            }
            $("#netUseDDns").attr("checked", XmlParser("isEnable", xml) * 1);
            $("#netUseDDns").change();
        }else{
            $("#netDDNSFoscam").attr("disabled","disabled");
        }
        RfParamCall(getDevInfoCall, "", "getDevInfo");//发CGI获取设备信息
    }
    function getDevInfoCall(xml){
        if($(xml).find("result").text() == "0"){
            $("#MacAddress").val($(xml).find("mac").text());
            $("#productName").val($(xml).find("productName").text());
            $("#devName").val($(xml).find("devName").text());
            $("#appVersion").val($(xml).find("firmwareVer").text());
            $("#sysVersion").val($(xml).find("hardwareVer").text());
            $("#cloundContent").attr("src",'https://www.myfoscam.com/ipc/ddns?type=0&mac=' + $("#MacAddress").val() + '&language=' + language + '&ver=' + timestamp);
            $("#ddnsPages").css("display","none");
            $("#cloundContent").css("display","none");
            $("#getDDNStr").css("display","none");
            RfParamCall(getP2PInfoCall, "", "getP2PInfo");//发CGI获取UID信息
        }
    };
    function getP2PInfoCall(xml){
        if($(xml).find("result").text() == "0"){
            $("#uid").val($(xml).find("uid").text());
        }
    };
    function restoreCall(xml) {
        $("#netddnsRf").click();
    }
    $("#netDDns_DDNSSERVER").change(function () {
        
        if ($("#netDDns_DDNSSERVER").val() == 0) {
            $("#netddnstr0").css("display", "");
            $("#netddnstr1").css("display", "none");
            $("#netddnstr2").css("display", "none");
            $("#getDDNStr").css("display","none");
        }else if($("#netDDns_DDNSSERVER").val() == 5){
            $("#netddnstr0").css("display", "none");
            $("#netddnstr1").css("display", "none");
            $("#netddnstr2").css("display", "none");
            $("#getDDNStr").css("display","");
        }else{
            $("#netddnstr0").css("display", "");
            $("#netddnstr1").css("display", "");
            $("#netddnstr2").css("display", "");
            $("#getDDNStr").css("display","none");
        }

        if ($("#netDDns_DDNSSERVER").val() == ddnsServer) {
            $("#netDDns_HOSTNAME").val(hostName);
            $("#netDDns_USER").val(user);
            $("#netDDns_PASSWORD").val(password);
        }
        else {
            $("#netDDns_HOSTNAME").val("");
            $("#netDDns_USER").val("");
            $("#netDDns_PASSWORD").val("");
        }
    });
    $("#netUseDDns").change(function () {
        DivBox($(this).attr("checked") * 1, "#netDDnsFact");
        DivBox($(this).attr("checked") * 1, "#netDDnsthird");
        DivBox($(this).attr("checked") * 1, "#netDDnsTable");
        DivBox($(this).attr("checked") * 1, "#netDDnsTable1");
        DivBox($(this).attr("checked") * 1, "#netDDnsTable2");
        DivBox($(this).attr("checked") * 1, "#netDDnsTable3");
        if ($(this).attr("checked") * 1 == 1) {
            $("#netDDnsrestore").attr("disabled", "");
        }
        else {
            $("#netDDnsrestore").attr("disabled", "disabled");
        }
    })
    $("#netddnsRf").click(function () {
        RfParamCall(Call, "", "getDDNSConfig");
    })
    $("#netddnsRf").click();
    $("#netDDnsrestore").click(function () {
        RfParamCall(restoreCall, "",
		"setDDNSConfig&isEnable=1&hostName=&ddnsServer=0&user=&password=");
    })
    $("#netDDnsSave").click(function () {
        //check user format
        var user = $("#netDDns_USER").val();
        if (user != "" && !user.match(/^[a-zA-Z0-9\@\_\.\$\*\-]+$/)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_DDNSUSRN") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#netDDns_USER").focus();
            return;
        }
        //check password format
        var password = $("#netDDns_PASSWORD").val();
        if (password != "" && (password.indexOf("&") != -1 || password.indexOf("=") != -1)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_DDNSPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#netDDns_PASSWORD").focus();
            return;
        }

        if ($("#netUseDDns").attr("checked")) {
            var selectVal = $("#netDDns_DDNSSERVER").val();
            if ( selectVal != 0 && selectVal != 5 ) {
                if ($("#netDDns_HOSTNAME").val() == "") {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_DOMAINS") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_NET_NOTNULL"));
                    $("#netDDns_HOSTNAME").focus();
                    return;
                }
                if (user == "") {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_NAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_NET_NOTNULL"));
                    $("#netDDns_USER").focus();
                    return;
                }
                if (password == "") {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                    $("#netDDns_PASSWORD").focus();
                    return;
                }
            }
        }

        RfParamCall(null, "",
		"setDDNSConfig&isEnable=" + $("#netUseDDns").attr("checked") * 1 + "&hostName=" + $("#netDDns_HOSTNAME").val() + "&ddnsServer=" + $("#netDDns_DDNSSERVER").val() + "&user=" + user + "&password=" + password);
    });
    $("#getDDNSButton").click(function(){

        MasklayerShow();

        setTimeout(function(){
            MasklayerHide();
            
            $("#ddnsPages").css("display","");
            $("#cloundContent").css('display', '');

            var language = gVar.lg;//ipc语言
            var ip = gVar.ip;//ipc ip
            var ipPort = gVar.port;//ipc 端口
            var ipMediaPort = gVar.mediaport;//ipc 媒体端口
            var supportP2p = gVar.p2pFlag;//是否支持p2p
            var userName = gVar.user;//用户名
            var pwd = gVar.passwd;//密码
            var hasUserTag = gVar_first.reserve1>>2 & 0x01//云推送
            var supportStore = gVar_first.reserve1>>3 & 0x01;//云存储
            var supportRichMedia = gVar_first.reserve1>>4 & 0x01;//富媒体推送

            var MacAddress = $("#MacAddress").val();//macAddr
            var productName = $("#productName").val();//productName
            var devName = $("#devName").val();//deviceName
            var appVersion = $("#appVersion").val();//appVersion
            var sysVersion = $("#sysVersion").val();//sysVersion
            var ipcUid = $("#uid").val();

            var iframeWindow = $("#cloundContent").get(0);
            window.addEventListener('message', function(e) {
                if(e.data){
                    var json = JSON.parse(e.data);
                    if(json['type'] != "undefined" && json['type'] == 'ddnsInfo'){
                        var ddns = json['data']['ddns'];
                        var ddnsStr = ddns.split(".")[0];
                        var encrptData = json['data']['encrptData'];
                        RfParamCall(setDDNSCall,"","adaptFactoryDDNSConfig&ddns="+ ddnsStr +"&password=" + encrptData);        
                    }else if(typeof(json['isOk']) == "boolean"){
                        if(json['isOk'] == true){
                            $("#ddnsPages").css("display","none");
                            $("#cloundContent").css('display', 'none');
                            $("#netDDnsrestore").click();
                        }else{
                            $("#ddnsPages").css("display","none");
                            $("#cloundContent").css('display', 'none');
                            $("#netddnsRf").click();
                        }
                    };
                };
            });
            
            function setDDNSCall(xml){
                if($(xml).find("result").text() == "0"){
                    if($(xml).find("haveddns").text()*1 == 1){
                        iframeWindow.contentWindow.postMessage(JSON.stringify({
                            "type":"deviceInfo",
                            "data":{
                                "macAddr":MacAddress,
                                "ipcUid":ipcUid,
                                "ddns":"",
                                "ddnsPort":ipPort,
                                "ip":ip,
                                "ipPort":ipPort,
                                "ipMediaPort":ipMediaPort,
                                "productType":0,
                                "deviceType":2,
                                "deviceName":devName,
                                "supportP2p":supportP2p,
                                "username":userName,
                                "password":pwd,
                                "additionInfo":"",
                                "hasusertag":hasUserTag,
                                "supportStore":supportStore,
                                "supportRichMedia":supportRichMedia,
                                "appVersion":appVersion,
                                "sysVersion":sysVersion,
                                "productName":productName,
                                "oemCode":"",
                                "appClientVersion":""
                            }
                        }), '*');
                        iframeWindow.contentWindow.postMessage(JSON.stringify({isUsed:true}), '*');
                    }else{
                        iframeWindow.contentWindow.postMessage(JSON.stringify({isUsed:false}), '*');
                    }
                }else{
                    iframeWindow.contentWindow.postMessage(JSON.stringify({isUsed:false}), '*');
                }
            };
        },1000);
    });
    
});