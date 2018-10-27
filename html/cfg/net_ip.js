$(function () {
    var isDHCP;
    var netIp_IP;
    var netIp_MASK;
    var netIp_GATE;
    var netIp_DNS1;
    var netIp_DNS2;

    MasklayerHide();
    $("#netIpISDHCP").change(function () { DivBox($(this).attr("checked") * 1 == 0, "#netIpTable"); })
    function Call(xml) {
        isDHCP = $(xml).find("isDHCP").text() * 1;
        $(xml).find("CGI_Result").children().not("isDHCP,result").each(function (i) {
            $("#netIp_" + $(this).context.nodeName.toUpperCase()).val($(this).text());
            var mode = $(this).context.nodeName.toUpperCase();
            if (mode == "IP") netIp_IP = $(this).text();
            else if (mode == "MASK") netIp_MASK = $(this).text();
            else if (mode == "GATE") netIp_GATE = $(this).text();
            else if (mode == "DNS1") netIp_DNS1 = $(this).text();
            else if (mode == "DNS2") netIp_DNS2 = $(this).text();
        });
        $("#netIpISDHCP").attr("checked", XmlParser("isDHCP", xml) * 1);
        $("#netIpDHCP").change();
        setTimeout(function () {
            $("#netIpISDHCP").change();
        }, 1)
    }

    function ipCall(xml) {
        if ($(xml).find("result").text() * 1 == -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_IP"));
            MasklayerHide();
        }
        else {
            gDvr.GetDevIPandPort(300000);
            Do_js_Time("netIPResult", 30, lg.get("IDS_NET_WIFI_RECONNECT"), "0", "55px");
        }
        return false;
    }

    function ipCall2(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            gDvr.GetDevIPandPort(300000);
            Do_js_Time("netIPResult", 30, lg.get("IDS_SET_GUID_CHANGE_IP"), "0", "55px");
            return false;
        }
    }

    function ipCall4(xml){
        if ($(xml).find("result").text() * 1 == 0) {
            $("#divSetGuidSoftFinish").css("display", "");
            //Do_js_Time("netIPResult", 30, lg.get("IDS_SET_GUID_WINDOW_CLOSE"), "0", "55px");
        } else {
            MasklayerHide();
        }
    }

    function ipCall3(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            RfParamCall(ipCall4, "", "changeNetMode&netModeChange=2");
        } else {
            MasklayerHide();
        }
    }

    $("#netipRf").click(function () {
        RfParamCall(Call, "", "getIPInfo");
    });

    $("#netIpSave").click(function () {
        var isDHCPEnable = $("#netIpISDHCP").attr("checked") * 1;
        var netIP = $("#netIp_IP").val();
        var netMask = $("#netIp_MASK").val();
        var netGate = $("#netIp_GATE").val();
        var netDns1 = $("#netIp_DNS1").val();
        var netDns2 = $("#netIp_DNS2").val();
        var ipVal = $("#netIp_IP").val().split(".");
        var maskVal = $("#netIp_MASK").val().split(".");
        var gateVal = $("#netIp_GATE").val().split(".");
        var ip_1 = ipVal[0] & maskVal[0];
        var ip_2 = ipVal[1] & maskVal[1]; 
        var ip_3 = ipVal[2] & maskVal[2];
        $("#MaskError").html("");
        if (lanPage != "set_guid") {
            if (isDHCP == isDHCPEnable && netIP == netIp_IP && netMask == netIp_MASK && netGate == netIp_GATE && netDns1 == netIp_DNS1 && netDns2 == netIp_DNS2) {
                return;
            }
            if ($("#netIpISDHCP").attr("checked") == false) {

                if (Isip($("#netIp_IP")) && Isip($("#netIp_MASK")) && Isip($("#netIp_GATE")) && Isip($("#netIp_DNS1")) && (Isip($("#netIp_DNS2")) || $("#netIp_DNS2").val() == '0.0.0.0')) {
                    if (ip_1 == (gateVal[0]&maskVal[0]) && ip_2 == (gateVal[1]&maskVal[1])) {
                        if (confirm(lg.get("IDS_NET_UPDATAIP"))) {
                            bMaskHide = false;
                            bJudgeCgiResult = false;
                            RfParamCall(ipCall, "", "setIpInfo&isDHCP=" + $("#netIpISDHCP").attr("checked") * 1 + "&ip=" + $("#netIp_IP").val() + "&gate=" + $("#netIp_GATE").val() + "&mask=" + $("#netIp_MASK").val() + "&dns1=" + $("#netIp_DNS1").val() + "&dns2=" + $("#netIp_DNS2").val());
                        }
                        else {
                            return;
                        }
                    }
                    else {
                        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_WEEK_TISHIYU"));
                        return;
                    }
                } else {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_IP"));
                }
            } else {
                if (confirm(lg.get("IDS_NET_UPDATAIP"))) {
                    bMaskHide = false;
                    bJudgeCgiResult = false;
                    RfParamCall(ipCall, "", "setIpInfo&isDHCP=" + $("#netIpISDHCP").attr("checked") * 1 + "&ip=" + $("#netIp_IP").val() + "&gate=" + $("#netIp_GATE").val() + "&mask=" + $("#netIp_MASK").val() + "&dns1=" + $("#netIp_DNS1").val() + "&dns2=" + $("#netIp_DNS2").val());
                }
                else {
                    return;
                }
            }
        } else {
            //if ($("#netIpISDHCP").attr("checked") == true) {
                if (isDHCP == isDHCPEnable && netIP == netIp_IP && netMask == netIp_MASK && netGate == netIp_GATE && netDns1 == netIp_DNS1 && netDns2 == netIp_DNS2) {
                    $("#cfgmune_1").click();
                    //$("#dev_info").click();
                    $("#LiveMenu").click();
                    $("#dev_info").addClass("selectedb");
                    return;
                }
            //}
            if (isSoftAPMode == 1) {
                if ($("#netIpISDHCP").attr("checked") == false) {
                    if (Isip($("#netIp_IP")) && Isip($("#netIp_MASK")) && Isip($("#netIp_GATE")) && Isip($("#netIp_DNS1")) && (Isip($("#netIp_DNS2")) || $("#netIp_DNS2").val() == '0.0.0.0')) {
                        if (ip_1 == gateVal[0] && ip_2 == gateVal[1]) {
                            if (confirm(lg.get("IDS_SET_GUID_FINISH"))) {
                                bMaskHide = false;
                                bJudgeCgiResult = false;
                                RfParamCall(ipCall3, "", "setIpInfo&isDHCP=" + $("#netIpISDHCP").attr("checked") * 1 + "&ip=" + $("#netIp_IP").val() + "&gate=" + $("#netIp_GATE").val() + "&mask=" + $("#netIp_MASK").val() + "&dns1=" + $("#netIp_DNS1").val() + "&dns2=" + $("#netIp_DNS2").val());
                            } else {
                                return;
                            }
                        }
                        else {
                            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_WEEK_TISHIYU"));
                            return;
                        }
                    }
                    else {
                        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_IP"));
                    }
                }
                else {
                    if (confirm(lg.get("IDS_SET_GUID_FINISH"))) {
                        bMaskHide = false;
                        bJudgeCgiResult = false;
                        RfParamCall(ipCall3, "", "setIpInfo&isDHCP=" + $("#netIpISDHCP").attr("checked") * 1 + "&ip=" + $("#netIp_IP").val() + "&gate=" + $("#netIp_GATE").val() + "&mask=" + $("#netIp_MASK").val() + "&dns1=" + $("#netIp_DNS1").val() + "&dns2=" + $("#netIp_DNS2").val());
                    }
                    else {
                        return;
                    }
                }
            }
            else {
                if ($("#netIpISDHCP").attr("checked") == false) {
                    if (Isip($("#netIp_IP")) && Isip($("#netIp_MASK")) && Isip($("#netIp_GATE")) && Isip($("#netIp_DNS1")) && (Isip($("#netIp_DNS2")) || $("#netIp_DNS2").val() == '0.0.0.0')) {
                        if (ip_1 == gateVal[0] && ip_2 == gateVal[1] ) {
                            if (confirm(lg.get("IDS_SET_GUID_FINISH"))) {
                                bMaskHide = false;
                                bJudgeCgiResult = false;
                                RfParamCall(ipCall, "", "setIpInfo&isDHCP=" + $("#netIpISDHCP").attr("checked") * 1 + "&ip=" + $("#netIp_IP").val() + "&gate=" + $("#netIp_GATE").val() + "&mask=" + $("#netIp_MASK").val() + "&dns1=" + $("#netIp_DNS1").val() + "&dns2=" + $("#netIp_DNS2").val());
                            } else {
                                return;
                            }
                        }
                        else {
                            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_WEEK_TISHIYU"));
                            return;
                        }
                    }
                    else {
                        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_IP"));
                    }
                }
                else {
                    if (confirm(lg.get("IDS_SET_GUID_FINISH"))) {
                        bMaskHide = false;
                        bJudgeCgiResult = false;
                        RfParamCall(ipCall, "", "setIpInfo&isDHCP=" + $("#netIpISDHCP").attr("checked") * 1 + "&ip=" + $("#netIp_IP").val() + "&gate=" + $("#netIp_GATE").val() + "&mask=" + $("#netIp_MASK").val() + "&dns1=" + $("#netIp_DNS1").val() + "&dns2=" + $("#netIp_DNS2").val());
                    }
                    else {
                        return;
                    }
                }
            }
        }

    });
    $("#netipRf").click();
});
