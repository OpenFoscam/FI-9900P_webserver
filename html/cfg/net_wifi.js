$(function () {
    MasklayerHide();
    var page = 0;
    var tPage = 0;
    var isNan = false;
    var pageCnt = 10;
    var ssid1 = "";
    var $obj = null;
    var wifinum = 0;
    var iswifino = 0;
    var curSsid = "";

    if (gVar.lg == "GER") {
        $("#wifiPSDK").css("width", "95");
    }
    $("#netwififom").change(function () {
        for (var i = 1; i <= 4; i++) {
            if ($(this).val() == 0) {

                if ($("#netkey" + i + "len").val() == 0) {
                    $("#netkey" + i).css("maxlength", 10)
                    $("#netkey" + i).css("onkeyup", "rpPos(this,/[^\a-\f0-9]/g,'')")
                }
                else {
                    $("#netkey" + i).css("maxlength", 26)
                    $("#netkey" + i).css("onkeyup", "rpPos(this,/[^\a-\f0-9]/g,'')")
                }
            }
            else {
                if ($("#netkey" + i + "len").val() == 0) {
                    $("#netkey" + i).css("maxlength", 5)
                    $("#netkey" + i).css("onkeyup", "")
                }
                else {
                    $("#netkey" + i).css("maxlength", 13)
                    $("#netkey" + i).css("onkeyup", "")
                }
            }
        }
    })
    $("#netwifiP").change(function () {
        if ($(this).val() == 0) {
            $("#wfweptab").css("display", "none")
            $("#wfwaptab").css("display", "none")
        }
        else if ($(this).val() == 1) {
            $("#wfweptab").css("display", "")
            $("#wfwaptab").css("display", "none")
        } else {
            $("#wfweptab").css("display", "none")
            $("#wfwaptab").css("display", "")
        }
    })
    function WifiListCall(xml) {
        if($(xml).find('result').text() == '0'){
            var str = "";
            var url = "";
            var curCnt = $(xml).find("curCnt").text() * 1;
            var total = $(xml).find("totalCnt").text() * 1;
            if (total == 0) ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_NOABLEWIFI"));
            tPage = ((total / pageCnt) | 0) + ((total % pageCnt == 0) ? 0 : 1) - 1;
            if (tPage >= 0)
                UI.FyHead("wiftfyHead", ">div:first", ">div:last", tPage, page, isNan);
            if (total > 0)
                $("#netwffield").empty();

            for (var i = 0; i < curCnt; i++) {

                var aps = $(xml).find("ap" + i).text().split("+");

                var isco = "";
                var sty;

                var str = $(xml).find("ap" + i).text();
                           // alert(str);
                var count = 0;
                var count1 = 0;
                for (var j = 0; j < str.length; j++) {
                    if (str.split("")[j] == '+')
                        count++;

                }
                var ap = new Array();
                ap[0] = "";
                for (var j = 0; j < str.length; j++) {
                    if (str.split("")[j] == "+")
                        count1++;
                    if (count1 == count - 3) {
                        break;
                    }
                    ap[0] += str.split("")[j];
                }
                ap[1] = aps[count - 3];
                ap[2] = aps[count - 2];
                ap[3] = aps[count - 1];
                ap[4] = aps[count];

                if (ssid1 == ap[0]) {
                    //isco = lg.get("IDS_NET_WIFIINTE");
                    if (ap[2] >= 0 && ap[2] <= 33)
                        url = "wifi5.png";
                    else if (ap[2] > 33 && ap[2] <= 66)
                        url = "wifi6.png";
                    else
                        url = "wifi7.png";
                }
                else {
                    isco = "";
                    if (ap[2] >= 0 && ap[2] <= 33)
                        url = "wifi2.png";
                    else if (ap[2] > 33 && ap[2] <= 66)
                        url = "wifi3.png";
                    else
                        url = "wifi4.png";
                }
                if (ap[4] == 0)
                    sty = lg.get("IDS_NET_WIFINOS");
                else if (ap[4] == 1)
                    sty = "WEP";
                else if (ap[4] == 2)
                    sty = "WPA";
                else if (ap[4] == 4)
                    sty = "WPA/WPA2";
                //            else if (ap[4] == 5)
                //                sty = "WPA1-TKIP";
                //            else if (ap[4] == 6)
                //                sty = "WPA1-AES";
                //            else if (ap[4] == 7)
                //                sty = "WPA2-TKIP";
                //            else if (ap[4] == 8)
                //                sty = "WPA2-AES";
                else sty = "WPA2";
                if (ap[0] == curSsid) {
                    ap[0]=ap[0].replace(/\"/g,"&quot;");
                    ap[0]=ap[0].replace(/\'/g,"&apos;");
                    str = '<tr class="UserList2" add="1"><td width="160px"><input type="text" value="' + ap[0] + '" readonly="readonly" style="width:100%;margin-left:3px;width:150px;border:0px;background-color:#ededed;"/></td><td width="120px">' + sty + '</td><td ><div style="background:url(../../images/' + url + ') no-repeat; width:22px; height:22px; text-align:center; margin:2px auto;"></div><div>' + isco + '</div></td></tr>';
                } else {
                    ap[0]=ap[0].replace(/\"/g,"&quot;");
                    ap[0]=ap[0].replace(/\'/g,"&apos;");
                    str = '<tr add="1"><td width="160px"><input type="text" value="' + ap[0] + '" readonly="readonly" style="width:100%;margin-left:3px;width:150px;border:0px;background-color:#ededed;"/></td><td width="120px">' + sty + '</td><td ><div style="background:url(../../images/' + url + ') no-repeat; width:22px; height:22px; text-align:center; margin:2px auto;"></div><div>' + isco + '</div></td></tr>';
                }
                $("#netwffield").append(str);
                wifinum++;

            }
            //$("#netwffield tr").removeClass("UserList2").unbind();
            $("#netwffield tr").mouseover(function () {
                $(this).css("cursor", "pointer").addClass("UserList");
            }).mouseout(function () {
                $(this).removeClass("UserList");
            }).click(function () {
                $("#netwffield tr").removeClass("UserList2");
                $("#netwifipsk").val("");
                if ($obj != null) {
                    $obj.attr("active", "0").removeClass("UserList2");
                }

                if ($obj != $(this)) {
                    var isFirst = ($obj == $("#netwffield tr:first-child"));

                    ($obj = $(this)).attr("active", "1").addClass("UserList2");
                    //$("#netwifissid").val($obj.children(":nth-child(1)").text());
                    $("#netwifissid").val($obj.find("input").val());
                    var types;
                    if ($obj.children(":nth-child(2)").text() == "WEP")
                        types = 1;
                    else if ($obj.children(":nth-child(2)").text() == "WPA")
                        types = 2;
                    else if ($obj.children(":nth-child(2)").text() == "WPA2")
                        types = 3;
                    else if ($obj.children(":nth-child(2)").text() == "WPA/WPA2")
                        types = 4;
                    //                else if ($obj.children(":nth-child(2)").text() == "WPA1-TKIP")
                    //                    types = 5;
                    //                else if ($obj.children(":nth-child(2)").text() == "WPA1-AES")
                    //                    types = 6;
                    //                else if ($obj.children(":nth-child(2)").text() == "WPA2-TKIP")
                    //                    types = 7;
                    //                else if ($obj.children(":nth-child(2)").text() == "WPA2-AES")
                    //                    types = 8;
                    else types = 0;
                    $("#netwifiP").val(types);
                }
                setTimeout(function () {
                    $("#netwifiP").change();
                }, 1)
                $("#WiFiTestResult").empty();
            })
            $("#wifiTable").html(str);
        }
    }

    function WifiIPCall(xml) {
        curSsid = $(xml).find("ssid").text();
        $("#netwifissid").val($(xml).find("ssid").text());
        $("#netwifipsk").val($(xml).find("psk").text());
        $("#netwifiP").val($(xml).find("encryptType").text() * 1);
        $("#netwifityp").val($(xml).find("authMode").text() * 1);
        $("#netwififom").val($(xml).find("keyFormat").text() * 1);
        $("#netwifidk").val($(xml).find("defaultKey").text());
        $("#netkey1").val($(xml).find("key1").text());
        $("#netkey1len").val($(xml).find("key1Len").text());
        $("#netkey2").val($(xml).find("key2").text());
        $("#netkey2len").val($(xml).find("key2Len").text());
        $("#netkey3").val($(xml).find("key3").text());
        $("#netkey3len").val($(xml).find("key3Len").text());
        $("#netkey4").val($(xml).find("key4").text());
        $("#netkey4len").val($(xml).find("key4Len").text());

        $("#netwifiP").change();
        $("#WiFiTestResult").empty();
    }

    UI.FyHeadEvent("wiftfyHead", function (p, b) {
        page = p; isNan = b;
        $("#netwffield").empty();
        RfParamCall(WifiListCall, "", "getWifiList&startNo=" + page * pageCnt);
    }, function (p, b) {
        page = p; isNan = b;
        $("#netwffield").empty();
        RfParamCall(WifiListCall, "", "getWifiList&startNo=" + page * pageCnt);
    }, function () { return (tPage) });

    $("#wifiNo").click(function () {
        $("#MaskwifiLogin").css("display", "none");
    })

    $("#netwifiRf").click(function () {
        RfParamCall(netModeCall, "", "getNetMode");
    })

    function netModeCall(xml){
        if($(xml).find("result").text() == "0"){
            if($(xml).find("netMode").text() == "0"){
                $("#WiFiTestDiv").css("display","");
            }
            RfParamCall(WifiIPCall, "", "getWifiConfig");
        }
    };

    function GCall(xml) {
        if ($(xml).find("result").text() == "0"){
            bMaskHide = false;
            RfParamCall(WifiListCall, "", "getWifiList&startNo=" + page * 10,"",10000)
        }
        else{
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_SCAFIAL"))
        }
    }
    function StartCall(xml) {
        if ($(xml).find("startResult").text() == "0") {
            RfParamCall(GCall, "", "refreshWifiList", "", 30000);

            $("#netwifiNo").css("display", "");
            $("#netwifiIs").css("display", "none");
            return false;
        }
        else {
            $("#netwifiIs").css("display", "");
            $("#netwifiNo").css("display", "none");
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_WIFINORES"))
        }
    }
    $("#netwifi_is").click(function () {
        RfParamCall(StartCall, "", "startWifi", "", 20000);
    });
    $("#netwifi_no").click(function () {
        gVar.Cgi({
            url: "cmd=stopWifi",
            suc: function (data, state) {
                if ($(data).find("result").text() * 1 == 0) {
                    $("#netwifiIs").css("display", "");
                    $("#netwifiNo").css("display", "none");
                    $("#netwffield").empty();
                    $("#wiftfyHead > div:first").empty();
                    $("#wiftfyHead > div:last").empty();
                    $("#wifiIsEnable").attr("checked", 0);
                    if (iswifino == 1) {
                        gDvr.GetDevIPandPort(300000);
                        Do_js_Time("netWifiResult", 100, lg.get("IDS_COM_RESTART"), "0", "55px");
                    }
                }
                else {
                    $("#netwifiNo").css("display", "");
                    $("#netwifiIs").css("display", "none");
                }
            },
            err: function (data, state) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_WIFIISRES"));
                $("#netwifiNo").css("display", "");
                $("#netwifiIs").css("display", "none");
            }
        })
    });
    $("#refwifilist").click(function () {
        page = 0;
        bMaskHide = false;
        RfParamCall(GCall, "", "refreshWifiList", "", 30000);
    })
    $("#NWifiSave").click(function () {
        var ssid = $("#netwifissid").val();
        if (lanPage == "set_guid") {
            /*if(ssid == ""){
            setGuidResult = false;
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SET_GUID_WIFI_SSID_ERROR"));
            return;
            }*/
            if (!IsLimitLength(ssid, 31)) {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SET_GUID_WIFI_FORMAT_ERROR"));
                return;
            }
            if ($("#netwifiP").val() != 0 && $("#netwifiP").val() != 1 && $("#netwifipsk").val() == "") {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                return;
            }
            if ($("#netwifiP").val() == 1 && $("#netkey1").val() == "" && $("#netkey2").val() == "" && $("#netkey3").val() == "" && $("#netkey4").val() == "") {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                return;
            }
        }

        var isusewifi;
        var netType;
        if ($("#netwifiIs").attr("display") == "")
            isusewifi = 0;
        else isusewifi = 1;
        if ($("#netwifiP").val() == 0)
            netType = 0;
        else netType = 1;

        //check ssid length
        if (!IsLimitLength(ssid, 31)) {
            if (gVar_first.N_language != 2)
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_WIFI_SSID_ERROR") + " " + lg.get("IDS_CHARACTER_NOTICE"));
            else
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_WIFI_SSID_ERROR"));

            $("#netwifissid").focus();
            setGuidResult = false;
            return;
        }

        //check netkey format
        var netKey;
        for (var i = 1; i <= 4; i++) {
            netKey = $("#netkey" + i).val();
            if (netKey != "" && (netKey.indexOf("&") != -1 || netKey.indexOf("=") != -1)) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_WIFIPSK" + i) + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                $("#netkey" + i).focus();
                setGuidResult = false;
                return;
            }
        }

        //check netwifipsk format
        /*var netwifipsk = $("#netwifipsk").val();
        if (netwifipsk != "" && (netwifipsk.indexOf("&") != -1 || netwifipsk.indexOf("=") != -1)) {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_WIFIPSK") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
        $("#netwifipsk").focus();
        setGuidResult = false;
        return;
        }*/

        var pskLength = "";
        var psk = $("#netwifipsk").val();
        for (var s = 0; s < psk.length; s++) {
            pskLength += psk.charCodeAt(s) + ",";
        }
        pskLength = pskLength.substring(0, pskLength.length - 1);

        RfParamCall(null, "", "setWifiSetting&isEnable=" + 1 + "&isUseWifi=" + 0 + "&ssid=" +
		        $("#netwifissid").val() + "&netType=" + 0 + "&encryptType=" + $("#netwifiP").val() + "&psk=" + pskLength + "&authMode=" +
		        $("#netwifityp").val() + "&keyFormat=" + $("#netwififom").val() + "&defaultKey=" + $("#netwifidk").val() + "&key1=" + $("#netkey1").val() +
		        "&key2=" + $("#netkey2").val() + "&key3=" + $("#netkey3").val() + "&key4=" + $("#netkey4").val() + "&key1Len=" + $("#netkey1len").val() +
		        "&key2Len=" + $("#netkey2len").val() + "&key3Len=" + $("#netkey3len").val() + "&key4Len=" + $("#netkey4len").val() + "&isNewFormat=" + 1);
        setGuidResult = true;
    })
    $("#netwifiRf").click();


    $("#WiFiTest").click(function(){
        $("#WiFiTestResult").empty();
        var pskLength = "";
        var psk = $("#netwifipsk").val();
        for (var s = 0; s < psk.length; s++) {
            pskLength += psk.charCodeAt(s) + ",";
        }
        pskLength = pskLength.substring(0, pskLength.length - 1);
        RfParamCall(wifiTestCall,"","wifiTest&ssid=" +$("#netwifissid").val() + "&netType=" + 0 + "&encryptType=" + $("#netwifiP").val() + "&psk=" + pskLength + "&authMode=" +
                $("#netwifityp").val() + "&keyFormat=" + $("#netwififom").val() + "&defaultKey=" + $("#netwifidk").val() + "&key1=" + $("#netkey1").val() +
                "&key2=" + $("#netkey2").val() + "&key3=" + $("#netkey3").val() + "&key4=" + $("#netkey4").val() + "&key1Len=" + $("#netkey1len").val() +
                "&key2Len=" + $("#netkey2len").val() + "&key3Len=" + $("#netkey3len").val() + "&key4Len=" + $("#netkey4len").val() + "&isNewFormat=" + 1,"",30000);
    });
    function wifiTestCall(xml){
        if(xml != null){
            if($(xml).find("result").text()*1 == 0){
                if($(xml).find("isEnable").text() == "0"){
                    $("#WiFiTestResult").text(lg.get("IDS_WIFITEST_SUCCESS"));
                }else{
                    $("#WiFiTestResult").text(lg.get("IDS_WIFITEST_FAIL"));
                }
            }
        }
    }
});