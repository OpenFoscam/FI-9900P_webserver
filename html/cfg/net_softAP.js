$(function () {
    var pwdInit = "";
    var pwdSoftOld = "";
    var pwdSoftNew = "";
    var pwdSoftCof = "";
    function Call(xml) {
        $("#thSoftSSIDV").html(XmlParser("ssid", xml));
        var encType = XmlParser("authMode", xml);
        switch (encType) {
            case 0: $("#thSoftEncV").html("OPEN"); break;
            case 1: $("#thSoftEncV").html("SHARED"); break;
            case 2: $("#thSoftEncV").html("WPAPSK"); break;
            case 3: $("#thSoftEncV").html("WPA2PSK"); break;
            default: $("#thSoftEncV").html("WPA/WPA2");
        }
        pwdInit = XmlParser("psk", xml);
        $("#iptSoftPasOld").val(pwdInit);
        if (pwdInit == "") {
            $("#iptSoftPasCof").val(pwdInit);
        }
        if (pwdInit != "") {
            $("#trNetSoft").css("display", "");
            if ($("#iptSoftPasNew").val() == "") {
                $("#iptSoftPasCof").val("");
            }
            $("#iptSoftPasOld").attr("disabled", "disabled");
        }
		$("#iptSoftPasNew").val("");
        $("#iptSoftPasCof").val("");
        $("#divSoftPasLev").css('background', 'url(../images/pwd_no.gif)no-repeat center');
    }

    $("#netsoftAPRf").click(function () {
        RfParamCall(Call, "", "getSoftApConfig");
    });

    $("#netsoftAPSave").click(function () {
        if (pwdInit == "") {
            pwdSoftOld = $("#iptSoftPasOld").val();
            pwdSoftCof = $("#iptSoftPasCof").val();
            if (pwdSoftOld == "") {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                $("#iptSoftPasOld").focus();
                return;
            }
            if (pwdSoftOld.length < 8 || pwdSoftCof.length > 64) {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SOFTAP_PSD_LENGTH_ERR"));
                $("#iptSoftPasOld").focus();
                return;
            }
            if (!pwdSoftOld.match(/^[a-zA-Z0-9\~\!\^\@\#\*\(\)\_\{\}\:\"\|\<\>\?\`\-\;\'\\\,\.\/\+\%]+$/)) {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SERVERINFO_PSW") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR") + "! " + lg.get("IDS_SET_GUID_SOFAP_PWD") + " ~ ! @ # % ^ * ( ) _ + { } : \"| < > ? ` - ; ' \\ , . /");
                $("#iptSoftPasOld").focus();
                return;
            }
            if (pwdSoftOld != pwdSoftCof) {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PWD_NOTSAME"));
                $("#iptSoftPasCof").focus();
                return;
            }
        } else {
            pwdSoftNew = $("#iptSoftPasNew").val();
            pwdSoftCof = $("#iptSoftPasCof").val();
            if (pwdSoftNew == "") {
                if (lanPage == "set_guid") {
                    if (confirm(lg.get("IDS_SET_GUID_SOFTAP_PSD_NEXT"))) {
                        setGuidResult = true;
                        return;
                    } else {
                        setGuidResult = false;
                        return;
                    }
                } else {
                    setGuidResult = false;
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                    $("#iptSoftPasNew").focus();
                    return;
                }
            }
            if (pwdSoftNew.length < 8 || pwdSoftCof.length > 64) {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SOFTAP_PSD_LENGTH_ERR"));
                $("#iptSoftPasNew").focus();
                return;
            }
            if (!pwdSoftNew.match(/^[a-zA-Z0-9\~\^\!\@\#\*\(\)\_\{\}\:\"\|\<\>\?\`\-\;\'\\\,\.\/\+\%]+$/)) {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEWPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR") + "! " + lg.get("IDS_SET_GUID_SOFAP_PWD") + " ~ ! @ # % ^ * ( ) _ + { } : \"| < > ? ` - ; ' \\ , . /");
                $("#iptSoftPasNew").focus();
                return;
            }
            if (pwdSoftNew != pwdSoftCof) {
                setGuidResult = false;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PWD_NOTSAME"));
                $("#iptSoftPasCof").focus();
                return;
            }
        }
        RfParamCall(function (xml) {
            if ($(xml).find("result").text() * 1 == -3) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SOFTAP_PSD_LENGTH_ERR"));
            }
        }, "", "setSoftApConfig&psk=" + pwdSoftCof);
        setGuidResult = true;
    });

    $("#netsoftAPRf").click();
});