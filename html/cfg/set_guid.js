$(function () {
    var nextGuidId = "";
    var nextSetPage = "";
    var curGuidId = "";
    var guidPages = new Array();
	var cgiClock=0;
    if(gVar_first.wifiType == 0){
        guidPages = ["setGuidWelcome","setGuidCountry", "setGuidName", "setGuidTime", "setGuidIp"];
    }
    if (gVar_first.wifiType != 0) {
        guidPages = ["setGuidWelcome","setGuidCountry", "setGuidName", "setGuidTime", "setGuidWifi", "setGuidIp"];
    }
    if (gVar_first.wifiType != 0 && (gVar_first.reserve3 >> 2 & 0x01) == 1) {
        guidPages = ["setGuidWelcome","setGuidCountry", "setGuidSoftAP", "setGuidName", "setGuidTime", "setGuidWifi", "setGuidIp"];
    }

    function GetGuidPageName(guidPageId) {
        switch (guidPageId) {
            case "setGuidWelcome": return "set_guid"; break;
            case "setGuidCountry": return "bs_country";break;
            case "setGuidSoftAP": return "net_softAP"; break;
            case "setGuidName": return "bs_base"; break;
            case "setGuidTime": return "bs_time"; break;
            case "setGuidWifi": return "net_wifi"; break;
            case "setGuidIp": return "net_ip"; break;
            default: return "set_guid";
        }
    }

    function SetGuidTitle(guidPageId) {
        switch (guidPageId) {
            case "setGuidWelcome": document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_SET_GUID") + " - " + lg.get("IDS_SET_GUID_BEGIN"); break;
            
            case "setGuidCountry":
                if (gVar_first.wifiType == 0) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_ONE").replace(/6/g, "4") + " - " + lg.get("IDS_BS_COUNTRY");
                }
                if (gVar_first.wifiType != 0) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_ONE").replace(/6/g, "5") + " - " + lg.get("IDS_BS_COUNTRY");
                }
                if (gVar_first.wifiType != 0 && (gVar_first.reserve3 >> 2 & 0x01) == 1) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_ONE") + " - " + lg.get("IDS_BS_COUNTRY");
                }
                break;
            case "setGuidSoftAP":
                document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_TWO") + " - " + lg.get("IDS_NET_SOFTAP");
                break;
            case "setGuidName":
                if (gVar_first.wifiType == 0) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_TWO").replace(/6/g, "4") + " - " + lg.get("IDS_BASE_DEVNAME");
                }
                if (gVar_first.wifiType != 0) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_TWO").replace(/6/g, "5") + " - " + lg.get("IDS_BASE_DEVNAME");
                }
                if (gVar_first.wifiType != 0 && (gVar_first.reserve3 >> 2 & 0x01) == 1) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_THREE") + " - " + lg.get("IDS_BASE_DEVNAME");
                }
                break;
            case "setGuidTime":
                if (gVar_first.wifiType == 0) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_THREE").replace(/6/g, "4") + " - " + lg.get("IDS_BS_TIME");
                }
                if (gVar_first.wifiType != 0) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_THREE").replace(/6/g, "5") + " - " + lg.get("IDS_BS_TIME");
                }
                if (gVar_first.wifiType != 0 && (gVar_first.reserve3 >> 2 & 0x01) == 1) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_FOUR") + " - " + lg.get("IDS_BS_TIME");
                }
                break;
            case "setGuidWifi":
                if (gVar_first.wifiType != 0) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_FOUR").replace(/6/g, "5") + " - " + lg.get("IDS_NET_WIFI");
                }
                if (gVar_first.wifiType != 0 && (gVar_first.reserve3 >> 2 & 0x01) == 1) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_FIVE") + " - " + lg.get("IDS_NET_WIFI");
                }
                break;
            case "setGuidIp":
                if (gVar_first.wifiType == 0) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_FOUR").replace(/6/g, "4") + " - " + lg.get("IDS_NET_NETIP");
                }
                if (gVar_first.wifiType != 0) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_FIVE").replace(/6/g, "5") + " - " + lg.get("IDS_NET_NETIP");
                }
                if (gVar_first.wifiType != 0 && (gVar_first.reserve3 >> 2 & 0x01) == 1) {
                    document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_STEP_SIX") + " - " + lg.get("IDS_NET_NETIP");
                }
                break;
            default: document.getElementById("divGuidTbTitle").innerHTML = "";
        }
    }

    function DoGuidClick(guidPageId) {
        switch (guidPageId) {
            case "setGuidWelcome": setGuidResult = true; break;
            case "setGuidCountry":$("#bscountryRf").click(); break;
            case "setGuidSoftAP": $("#netsoftAPSave").click(); break;
            case "setGuidName": $("#bsBsSave").click(); break;
            case "setGuidTime": $("#bsTSave").click(); break;
            case "setGuidWifi": $("#NWifiSave").click(); break;
            case "setGuidIp": $("#netIpSave").click(); break;
            default: setGuidResult = true; return;
        }
    }

    function LoadGuidPage(pageName) {

   cgiClock=setInterval(function(){
	if($("#MaskLayout").css("display")=="none")
	{
	clearInterval(cgiClock);
	if ($("#" + nextGuidId).attr("name") == "isGuidDown") {
            $("#" + nextGuidId).addClass("guidActive").css("display", "");
			$("#" + pageName.split("_").join("") + "Rf").click();
        } else {
            $.get("html/cfg/" + pageName + ".html?" + gVar.nDate, function (data, state) {
                if (state != "success") { }
                $("#" + nextGuidId).attr("name", "isGuidDown").addClass("guidActive").css("display", "block");
                $("#" + nextGuidId).html(data);
                $(".guidActive .item").css("display", "none");
                $.getScript("html/cfg/" + pageName + ".js?" + gVar.nDate, null);
                lan(pageName);
            });
        }
	
	}
	
	},10)
        
    }

    $("#setguidRf").click(function () {
        RfParamCall(null, "", "setGuideMode&guideMode=0");
        $("#btnPre").css("display", "none");
        $("#btnNext").css("display", "");
        $("#btnFinish").css("display", "none");
        document.getElementById("divGuidTbTitle").innerHTML = lg.get("IDS_SET_GUID") + " - " + lg.get("IDS_SET_GUID_BEGIN");
        MasklayerHide();
        if($(".guidActive").attr("id") == "setGuidWelcome"){
            
            if(isFirstUse == 1 && ($("#country").val() == "" || typeof($("#country").val()) == "undefined")){
                $("#maskDiv").css("display","block");
                $("#maskDiv").css("z-index","99999");
                $("#maskDiv").css("background-color","rgba(84, 84, 84, 0.5)");
                $("#maskHeaderDiv").css("display","block");
                $("#maskHeaderDiv").css("z-index","99999");
                $("#maskHeaderDiv").css("background-color","rgba(84, 84, 84, 0.5)");
                $("#MsgPaop").css("z-index","999999");
            }
        }
        
    })

    $("#btnPre").click(function () {
        setGuidResult = true;
        if ($("#btnNext").css("display") == "none") {
            $("#btnNext").css("display", "");
        }
        $("#btnFinish").css("display", "none");
        curGuidId = $(".guidActive").attr("id");
            if (curGuidId == "setGuidCountry") {
                //guid country
                $(".guidActive").removeClass("guidActive").css("display", "none");
                $("#setGuidWelcome").addClass("guidActive").css("display", "block");
                SetGuidTitle("setGuidWelcome");
                $("#btnPre").css("display", "none");
                return;
            } else {
                var guidIndex = 0;
                for (var j = 0; j < guidPages.length; j++) {
                    if (guidPages[j] == curGuidId) {
                        guidIndex = j;
                        break;
                    }
                }
                $(".guidActive").removeClass("guidActive").css("display", "none");
                nextGuidId = guidPages[guidIndex - 1];
                nextSetPage = GetGuidPageName(nextGuidId);
                LoadGuidPage(nextSetPage);
                SetGuidTitle(nextGuidId);
            }
    })

    $("#btnNext").click(function () {
        if ($("#btnPre").css("display") == "none") {
            $("#btnPre").css("display", "");
        }
        curGuidId = $(".guidActive").attr("id");
        if(curGuidId == "setGuidCountry"){
            if($("#country").val() == "" || typeof($("#country").val()) == "undefined"){
                ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_COUNTRY_TIP"));
                return;
            }
            if(isFirstUse == 1){
                $("#maskDiv").css("display","none");
                $("#maskDiv").css("background-color","none");
                $("#maskHeaderDiv").css("display","none");
                $("#maskHeaderDiv").css("background-color","none");
            }
            $("#bsCountrySave").click();
        }
        if (curGuidId == "setGuidIp") {
            //whether need restart
        } else {
            DoGuidClick(curGuidId);
            if (!setGuidResult) {
                return;
            }
            for (var i = 0; i < guidPages.length - 1; i++) {
                if (curGuidId != guidPages[i]) {
                    continue;
                } else {
                    $(".guidActive").removeClass("guidActive").css("display", "none");
                    nextGuidId = guidPages[i + 1];
                    nextSetPage = GetGuidPageName(nextGuidId);
                    LoadGuidPage(nextSetPage);
                    SetGuidTitle(nextGuidId);
                    if (nextGuidId == "setGuidIp") {
                        $("#btnNext").css("display", "none");
                        $("#btnFinish").css("display", "");
                    }
                    break;
                }
            }
        }
    })

    function setGuidIpCall(xml) {
        getDevIPandPort();
        Do_js_Time("netIPResult", 100, lg.get("IDS_COM_RESTART"), "0", "55px");
        return false;
    }

    $("#btnFinish").click(function () {
        $("#netIpSave").click();
    })

    $("#setguidRf").click();
})