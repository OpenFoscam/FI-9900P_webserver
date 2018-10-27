var $o = "";
var curAddChn = 0;
var curSelChn = 0;
var curDelChn = 0;
function ShowOrHide(o) {
    if ($o != "") $("tr[id^='" + $o + "']").addClass("bsmul");
    $o = o;
    $("tr[id^='" + $o + "']").removeClass("bsmul");
}

function MultiAddCall(xml) {
    Struct.devInfo[curAddChn - 1].ip = $("#bs" + curAddChn + "_hostput").val();
    Struct.devInfo[curAddChn - 1].port = $("#bs" + curAddChn + "_portput").val();
    Struct.devInfo[curAddChn - 1].mediaport = $("#bs" + curAddChn + "_Mportput").val();
    Struct.devInfo[curAddChn - 1].user = $("#bs" + curAddChn + "_userput").val();
    Struct.devInfo[curAddChn - 1].pwd = $("#bs" + curAddChn + "_pwdput").val();
    Struct.devInfo[curAddChn - 1].devname = $("#bs" + curAddChn + "_nameput").val();
    Struct.devInfo[curAddChn - 1].type = $("#bs" + curAddChn + "_typesel").val() * 1;
    gDvr.obj[curAddChn - 1].UNRegMy();
    setTimeout(function () {
        try {
            gDvr.obj[curAddChn - 1].UpdateFirstChannelUserRight(Qqx);
        }
        catch (e) { }

        gDvr.obj[curAddChn - 1].RegMy(Struct.devInfo[curAddChn - 1].ip, Struct.devInfo[curAddChn - 1].port * 1, Struct.devInfo[curAddChn - 1].mediaport * 1, Struct.devInfo[curAddChn - 1].user, Struct.devInfo[curAddChn - 1].pwd, Struct.devInfo[curAddChn - 1].devname, gVar.nStreamType, gVar.nDate * 1 + curAddChn - 1, Struct.devInfo[curAddChn - 1].type);
    }, 100);
    //set selected options disabled
    var child = document.getElementById("bsmullist").childNodes;
    for (var j = 0; j < child.length; j++) {
        if (child[j].text.indexOf($("#bs" + n + "_hostput").val()) != -1) {
            child[j].disabled = true;
            break;
        }
    }
    var $tS = $(this).find("option:selected");
    $tS.attr("selected", "");
}

function bs_addput(n) {
    curAddChn = n;
    var name = $("#bs" + n + "_nameput").val();
    if (name != "") {
        //check name format
        if (!MatchReg(name)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BASE_DEVNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#bs" + n + "_nameput").focus();
            return;
        }
        //check name length
        if (!IsLimitLength(name, 20)) {
            if (gVar_first.N_language != 2)
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS") + " " + lg.get("IDS_CHARACTER_NOTICE"));
            else
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS"));

            $("#bs" + n + "_nameput").focus();
            return;
        }
    }
    if(name == ""){
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BASE_DEVNAME")+ ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ")+ lg.get("IDS_NET_NOTNULL"));
        $("#bs" + n + "_nameput").focus();
        return;
    }
    //check host not null
    var host = $("#bs" + n + "_hostput").val();
    if (host == "") {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS2_HOST") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_NET_NOTNULL"));
        $("#bs" + n + "_hostput").focus();
        return;
    }
    if(!Isip($("#bs" + n + "_hostput"))){
    	var RegUrl = new RegExp();
    	RegUrl.compile("[a-zA-z]+://[^\s]*");
	    if(!RegUrl.test(host)){
	        var reg = /^([A-Za-z0-9]+.)+((com)|(net)|(org)|(gov.cn)|(info)|(cc)|(com.cn)|(net)|(org.cn)|(com.ru)|(net.ru)|(org.ru)|(name)|(biz)|(hk)|(tv)|(cn))$/;
		    if(!reg.test(host))
		    {
			    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS2_HOST") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
			    $("#bs" + n + "_hostput").focus();
			    return;
		    }
	    }
    }
    //check host format
    if (host.indexOf("&") != -1 || host.indexOf("=") != -1) {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS2_HOST") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
        $("#bs" + n + "_hostput").focus();
        return;
    }
    //check host not myselef
    if ($("#bs" + n + "_hostput").val() == ip) {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NO_SELF"));
        $("#bs" + n + "_hostput").focus();
        return;
    }
    //check add already
    for (var l = 2; l <= 9; l++) {
        if (n != l) {
            if (($("#bs" + n + "_hostput").val() == $("#bs" + l + "_hostput").val()) && ($("#bs" + n + "_portput").val() == $("#bs" + l + "_portput").val())) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_ADD_ALREADY"));
                return;
            }
        }
    }
    //check port not null
    if ($("#bs" + n + "_portput").val() == "") {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BSMULTI_WPORT1"));
        $("#bs" + n + "_portput").focus();
        return;
    }
    //check mport not null
    if ($("#bs" + n + "_Mportput").val() == "") {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BSMULTI_WMPORT1"));
        $("#bs" + n + "_Mportput").focus();
        return;
    }
    //check user not null
    var userput = $("#bs" + n + "_userput").val();
    if (userput == "") {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_INPUT_USERNAME"));
        $("#bs" + n + "_userput").focus();
        return;
    }
    //check user format
    if (!IsLimitLength(userput, 20) || !userput.match(/^[a-zA-Z0-9\_\-\@\$\*]+$/)) {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_NAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
        $("#bs" + n + "_userput").focus();
        return;
    }
    //check pwd format
    var pwdput = $("#bs" + n + "_pwdput").val();
    if (pwdput != "") {
        if (pwdput.indexOf("&") != -1 || pwdput.indexOf("=") != -1 || pwdput.indexOf("$") != -1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SERVERINFO_PSW") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#bs" + n + "_pwdput").focus();
            return;
        }
    }
    //check username and pwd default
    if (userput == "admin" && pwdput == "") {
        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_MULTI_USERNAME_PWD_DEFAULT_ERROR"));
        $("#bs" + n + "_userput").focus();
        return;
    }
    var aStr = $("#bs" + n + "_hostput").val();
    aStr = aStr.split("http://").join("").split(" ").join("");
    $("#bs" + n + "_hostput").val(aStr);
    $("#bs" + n + "_text").text($("#bs" + n + "_nameput").val() + "(" + $("#bs" + n + "_hostput").val() + ")");
    $("#bs_mul" + n + "_type").addClass("bsmul");
    $("#bs_mul" + n + "_name").addClass("bsmul");
    $("#bs_mul" + n + "_host").addClass("bsmul");
    $("#bs_mul" + n + "_port").addClass("bsmul");
    $("#bs_mul" + n + "_Mport").addClass("bsmul");
    $("#bs_mul" + n + "_user").addClass("bsmul");
    $("#bs_mul" + n + "_pwd").addClass("bsmul");
    $("#bs_mul" + n + "_but").addClass("bsmul");
    RfParamCall(MultiAddCall, "", "addMultiDev&chnnl=" + (n - 1) + "&ip=" + $("#bs" + n + "_hostput").val() + "&port=" + $("#bs" + n + "_portput").val() + "&mediaPort=" + $("#bs" + n + "_Mportput").val() + "&userName=" + $("#bs" + n + "_userput").val() + "&passWord=" + $("#bs" + n + "_pwdput").val() + "&devName=" + $("#bs" + n + "_nameput").val() + "&productType=" + $("#bs" + n + "_typesel").val(), null, 5000, n - 1);
}

function call(n){
	$("#bs"+n+"_typesel").val(XmlParser("productType", xml));
	$("#bs"+n+"_nameput").val(XmlParser("devName", xml));
	$("#bs"+n+"_hostput").val(XmlParser("ip", xml));
	$("#bs"+n+"_portput").val(XmlParser("port", xml));
	$("#bs"+n+"_Mportput").val(XmlParser("mediaPort", xml));
	$("#bs"+n+"_userput").val(XmlParser("userName", xml));
	$("#bs"+n+"_pwdput").val(XmlParser("passWord", xml));
}

function MultiDelCall(xml) {
    //set selected options disabled
    var child = document.getElementById("bsmullist").childNodes;
    for (var m = 0; m < child.length; m++) {
        if (child[m].text.indexOf(Struct.devInfo[curDelChn - 1].ip) != -1) {
            child[m].removeAttribute('disabled');
            break;
        }
    }
    $("#bsmulrf").click();
    $("#bs" + (curDelChn) + "_text").text(lg.get("IDS_NET_WIFIPNO"));
    $("#bs" + (curDelChn) + "_typesel").val(1);
    $("#bs" + (curDelChn) + "_nameput").val("");
    $("#bs" + (curDelChn) + "_hostput").val("");
    $("#bs" + (curDelChn) + "_portput").val("0");
    $("#bs" + (curDelChn) + "_Mportput").val("0");
    $("#bs" + (curDelChn) + "_userput").val("");
    $("#bs" + (curDelChn) + "_pwdput").val("");
    Struct.devInfo[curDelChn - 1].type = 1;
    Struct.devInfo[curDelChn - 1].ip = "";
    Struct.devInfo[curDelChn - 1].port = 0;
    Struct.devInfo[curDelChn - 1].mediaport = 0;
    Struct.devInfo[curDelChn - 1].user = "";
    Struct.devInfo[curDelChn - 1].pwd = "";
    Struct.devInfo[curDelChn - 1].devname = "";
    isOpenA[curDelChn - 1] = false;
    isOpenV[curDelChn - 1] = false;
    isOpenT[curDelChn - 1] = false;
    gDvr.obj[curDelChn - 1].UNRegMy();
}

function bs_delput(n) {
    curDelChn = n;
    $("#bs_mul" + n + "_type").addClass("bsmul");
    $("#bs_mul" + n + "_name").addClass("bsmul");
    $("#bs_mul" + n + "_host").addClass("bsmul");
    $("#bs_mul" + n + "_port").addClass("bsmul");
    $("#bs_mul" + n + "_Mport").addClass("bsmul");
    $("#bs_mul" + n + "_user").addClass("bsmul");
    $("#bs_mul" + n + "_pwd").addClass("bsmul");
    $("#bs_mul" + n + "_but").addClass("bsmul");
    RfParamCall(MultiDelCall, "", "delMultiDev&chnnl=" + (n - 1), null, 5000);
}

$(function () {
    $("#bsmulrf").click(function () {
        $("#bsmullist").empty();
        gDvr.obj[0].SearchDev(5000);
    });

    $("#bsmullist").click(function () {
        var $t = $(this).find("option:selected");
        if ($o != "" && $t.attr("ip") != "") {
            var i = $o.substring($o.length - 1, $o.length);
            var $t = $(this).find("option:selected");
            var $val = $("#bs" + i + "_text").text().split("(");
            if ($val.length >= "2") {
                return false;
            }
            else {
                $("#bs" + i + "_nameput").val($t.attr("dname"));
                $("#bs" + i + "_hostput").val($t.attr("ip"));
                $("#bs" + i + "_portput").val($t.attr("port"));
                var mPort = $t.attr("mport") * 1;
                if (mPort == 0) {
                    $("#bs" + i + "_typesel").val(0)
                    $("#bs" + i + "_Mportput").val($t.attr("port"));
                } else {
                    $("#bs" + i + "_typesel").val(1)
                    $("#bs" + i + "_Mportput").val($t.attr("mport"));
                }
            }
        }
    });

    $("#bs2_addput").click(function () {
        bs_addput(2);
    })
    $("#bs3_addput").click(function () {
        bs_addput(3);
    })
    $("#bs4_addput").click(function () {
        bs_addput(4);
    })
    $("#bs5_addput").click(function () {
        bs_addput(5);
    })
    $("#bs6_addput").click(function () {
        bs_addput(6);
    })
    $("#bs7_addput").click(function () {
        bs_addput(7);
    })
    $("#bs8_addput").click(function () {
        bs_addput(8);
    })
    $("#bs9_addput").click(function () {
        bs_addput(9);
    })
    $("#bs2_delput").click(function () {
        bs_delput(2);
    })
    $("#bs3_delput").click(function () {
        bs_delput(3);
    })
    $("#bs4_delput").click(function () {
        bs_delput(4);
    })
    $("#bs5_delput").click(function () {
        bs_delput(5);
    })
    $("#bs6_delput").click(function () {
        bs_delput(6);
    })
    $("#bs7_delput").click(function () {
        bs_delput(7);
    })
    $("#bs8_delput").click(function () {
        bs_delput(8);
    })
    $("#bs9_delput").click(function () {
        bs_delput(9);
    })

    function Call8(xml) {
        $("#bs9_typesel").val(XmlParser("productType", xml));
        $("#bs9_nameput").val(XmlParser("devName", xml));
        $("#bs9_hostput").val(XmlParser("ip", xml));
        $("#bs9_portput").val(XmlParser("port", xml));
        $("#bs9_Mportput").val(XmlParser("mediaPort", xml));
        $("#bs9_userput").val(XmlParser("userName", xml));
        $("#bs9_pwdput").val(XmlParser("passWord", xml));
        if ($("#bs9_nameput").val() != "" || $("#bs9_hostput").val() != "")
            $("#bs9_text").text($("#bs9_nameput").val() + "(" + $("#bs9_hostput").val() + ")");
        Struct.devInfo[8].ip = $("#bs9_hostput").val();
        Struct.devInfo[8].port = $("#bs9_portput").val();
        Struct.devInfo[8].mediaport = $("#bs9_Mportput").val();
        Struct.devInfo[8].user = $("#bs9_userput").val();
        Struct.devInfo[8].pwd = $("#bs9_pwdput").val();
        Struct.devInfo[8].devname = $("#bs9_nameput").val();
        Struct.devInfo[8].type = $("#bs9_typesel").val() * 1;
        if (Struct.devInfo[8].ip == "") {
            isOpenA[8] = false;
            //gDvr.obj[8].UNRegMy();
        } else {
            try {
                //gDvr.obj[8].UpdateFirstChannelUserRight(Qqx);
            }
            catch (e) { }
            //gDvr.obj[8].RegMy(Struct.devInfo[8].ip, Struct.devInfo[8].port * 1, Struct.devInfo[8].mediaport * 1, Struct.devInfo[8].user, Struct.devInfo[8].pwd, Struct.devInfo[8].devname, gVar.nStreamType, gVar.nDate * 1 + 8, Struct.devInfo[8].type);
        }

        //set selected options disabled
        var child = document.getElementById("bsmullist").childNodes;
        var channel = $("#bs9_hostput").val();
        if (channel != "") {
            for (var k = 0; k < child.length; k++) {
                if (child[k].text.indexOf(channel) != -1) {
                    child[k].disabled = true;
                    break;
                }
            }
        }
        MasklayerHide();
        //RfParamCall(Call8, "", "getMultiDevDetailInfo&chnnl=" + 8, null, 5000);
    }
    function Call7(xml) {
        $("#bs8_typesel").val(XmlParser("productType", xml));
        $("#bs8_nameput").val(XmlParser("devName", xml));
        $("#bs8_hostput").val(XmlParser("ip", xml));
        $("#bs8_portput").val(XmlParser("port", xml));
        $("#bs8_Mportput").val(XmlParser("mediaPort", xml));
        $("#bs8_userput").val(XmlParser("userName", xml));
        $("#bs8_pwdput").val(XmlParser("passWord", xml));
        if ($("#bs8_nameput").val() != "" || $("#bs8_hostput").val() != "")
            $("#bs8_text").text($("#bs8_nameput").val() + "(" + $("#bs8_hostput").val() + ")");
        Struct.devInfo[7].ip = $("#bs8_hostput").val();
        Struct.devInfo[7].port = $("#bs8_portput").val();
        Struct.devInfo[7].mediaport = $("#bs8_Mportput").val();
        Struct.devInfo[7].user = $("#bs8_userput").val();
        Struct.devInfo[7].pwd = $("#bs8_pwdput").val();
        Struct.devInfo[7].devname = $("#bs8_nameput").val();
        Struct.devInfo[7].type = $("#bs8_typesel").val() * 1;
        if (Struct.devInfo[7].ip == "") {
            isOpenA[7] = false;
            //gDvr.obj[7].UNRegMy();
        } else {
            try {
                //gDvr.obj[7].UpdateFirstChannelUserRight(Qqx);
            }
            catch (e) { }
            //gDvr.obj[7].RegMy(Struct.devInfo[7].ip, Struct.devInfo[7].port * 1, Struct.devInfo[7].mediaport * 1, Struct.devInfo[7].user, Struct.devInfo[7].pwd, Struct.devInfo[7].devname, gVar.nStreamType, gVar.nDate * 1 + 7, Struct.devInfo[7].type);
        }

        //set selected options disabled
        var child = document.getElementById("bsmullist").childNodes;
        var channel = $("#bs8_hostput").val();
        if (channel != "") {
            for (var k = 0; k < child.length; k++) {
                if (child[k].text.indexOf(channel) != -1) {
                    child[k].disabled = true;
                    break;
                }
            }
        }
        bMaskHide = false;
        RfParamCall(Call8, "", "getMultiDevDetailInfo&chnnl=" + 8, null, 5000);
    }
    function Call6(xml) {
        $("#bs7_typesel").val(XmlParser("productType", xml));
        $("#bs7_nameput").val(XmlParser("devName", xml));
        $("#bs7_hostput").val(XmlParser("ip", xml));
        $("#bs7_portput").val(XmlParser("port", xml));
        $("#bs7_Mportput").val(XmlParser("mediaPort", xml));
        $("#bs7_userput").val(XmlParser("userName", xml));
        $("#bs7_pwdput").val(XmlParser("passWord", xml));
        if ($("#bs7_nameput").val() != "" || $("#bs7_hostput").val() != "")
            $("#bs7_text").text($("#bs7_nameput").val() + "(" + $("#bs7_hostput").val() + ")");
        Struct.devInfo[6].ip = $("#bs7_hostput").val();
        Struct.devInfo[6].port = $("#bs7_portput").val();
        Struct.devInfo[6].mediaport = $("#bs7_Mportput").val();
        Struct.devInfo[6].user = $("#bs7_userput").val();
        Struct.devInfo[6].pwd = $("#bs7_pwdput").val();
        Struct.devInfo[6].devname = $("#bs7_nameput").val();
        Struct.devInfo[6].type = $("#bs7_typesel").val() * 1;
        if (Struct.devInfo[6].ip == "") {
            isOpenA[6] = false;
            //gDvr.obj[6].UNRegMy();
        } else {
            try {
                //gDvr.obj[6].UpdateFirstChannelUserRight(Qqx);
            }
            catch (e) { }
            //gDvr.obj[6].RegMy(Struct.devInfo[6].ip, Struct.devInfo[6].port * 1, Struct.devInfo[6].mediaport * 1, Struct.devInfo[6].user, Struct.devInfo[6].pwd, Struct.devInfo[6].devname, gVar.nStreamType, gVar.nDate * 1 + 6, Struct.devInfo[6].type);
        }

        //set selected options disabled
        var child = document.getElementById("bsmullist").childNodes;
        var channel = $("#bs7_hostput").val();
        if (channel != "") {
            for (var k = 0; k < child.length; k++) {
                if (child[k].text.indexOf(channel) != -1) {
                    child[k].disabled = true;
                    break;
                }
            }
        }
        bMaskHide = false;
        RfParamCall(Call7, "", "getMultiDevDetailInfo&chnnl=" + 7, null, 5000);
    }
    function Call5(xml) {
        $("#bs6_typesel").val(XmlParser("productType", xml));
        $("#bs6_nameput").val(XmlParser("devName", xml));
        $("#bs6_hostput").val(XmlParser("ip", xml));
        $("#bs6_portput").val(XmlParser("port", xml));
        $("#bs6_Mportput").val(XmlParser("mediaPort", xml));
        $("#bs6_userput").val(XmlParser("userName", xml));
        $("#bs6_pwdput").val(XmlParser("passWord", xml));
        if ($("#bs6_nameput").val() != "" || $("#bs6_hostput").val() != "")
            $("#bs6_text").text($("#bs6_nameput").val() + "(" + $("#bs6_hostput").val() + ")");
        Struct.devInfo[5].ip = $("#bs6_hostput").val();
        Struct.devInfo[5].port = $("#bs6_portput").val();
        Struct.devInfo[5].mediaport = $("#bs6_Mportput").val();
        Struct.devInfo[5].user = $("#bs6_userput").val();
        Struct.devInfo[5].pwd = $("#bs6_pwdput").val();
        Struct.devInfo[5].devname = $("#bs6_nameput").val();
        Struct.devInfo[5].type = $("#bs6_typesel").val() * 1;
        if (Struct.devInfo[5].ip == "") {
            isOpenA[5] = false;
            //gDvr.obj[5].UNRegMy();
        } else {
            try {
                //gDvr.obj[5].UpdateFirstChannelUserRight(Qqx);
            }
            catch (e) { }
            //gDvr.obj[5].RegMy(Struct.devInfo[5].ip, Struct.devInfo[5].port * 1, Struct.devInfo[5].mediaport * 1, Struct.devInfo[5].user, Struct.devInfo[5].pwd, Struct.devInfo[5].devname, gVar.nStreamType, gVar.nDate * 1 + 5, Struct.devInfo[5].type);
        }

        //set selected options disabled
        var child = document.getElementById("bsmullist").childNodes;
        var channel = $("#bs6_hostput").val();
        if (channel != "") {
            for (var k = 0; k < child.length; k++) {
                if (child[k].text.indexOf(channel) != -1) {
                    child[k].disabled = true;
                    break;
                }
            }
        }
        bMaskHide = false;
        RfParamCall(Call6, "", "getMultiDevDetailInfo&chnnl=" + 6, null, 5000);
    }
    function Call4(xml) {
        $("#bs5_typesel").val(XmlParser("productType", xml));
        $("#bs5_nameput").val(XmlParser("devName", xml));
        $("#bs5_hostput").val(XmlParser("ip", xml));
        $("#bs5_portput").val(XmlParser("port", xml));
        $("#bs5_Mportput").val(XmlParser("mediaPort", xml));
        $("#bs5_userput").val(XmlParser("userName", xml));
        $("#bs5_pwdput").val(XmlParser("passWord", xml));
        if ($("#bs5_nameput").val() != "" || $("#bs5_hostput").val() != "")
            $("#bs5_text").text($("#bs5_nameput").val() + "(" + $("#bs5_hostput").val() + ")");
        Struct.devInfo[4].ip = $("#bs5_hostput").val();
        Struct.devInfo[4].port = $("#bs5_portput").val();
        Struct.devInfo[4].mediaport = $("#bs5_Mportput").val();
        Struct.devInfo[4].user = $("#bs5_userput").val();
        Struct.devInfo[4].pwd = $("#bs5_pwdput").val();
        Struct.devInfo[4].devname = $("#bs5_nameput").val();
        Struct.devInfo[4].type = $("#bs5_typesel").val() * 1;
        if (Struct.devInfo[4].ip == "") {
            isOpenA[4] = false;
            //gDvr.obj[4].UNRegMy();
        } else {
            try {
                //gDvr.obj[4].UpdateFirstChannelUserRight(Qqx);
            }
            catch (e) { }
            //gDvr.obj[4].RegMy(Struct.devInfo[4].ip, Struct.devInfo[4].port * 1, Struct.devInfo[4].mediaport * 1, Struct.devInfo[4].user, Struct.devInfo[4].pwd, Struct.devInfo[4].devname, gVar.nStreamType, gVar.nDate * 1 + 4, Struct.devInfo[4].type);
        }

        //set selected options disabled
        var child = document.getElementById("bsmullist").childNodes;
        var channel = $("#bs5_hostput").val();
        if (channel != "") {
            for (var k = 0; k < child.length; k++) {
                if (child[k].text.indexOf(channel) != -1) {
                    child[k].disabled = true;
                    break;
                }
            }
        }
        bMaskHide = false;
        RfParamCall(Call5, "", "getMultiDevDetailInfo&chnnl=" + 5, null, 5000);
    }
    function Call3(xml) {
        $("#bs4_typesel").val(XmlParser("productType", xml));
        $("#bs4_nameput").val(XmlParser("devName", xml));
        $("#bs4_hostput").val(XmlParser("ip", xml));
        $("#bs4_portput").val(XmlParser("port", xml));
        $("#bs4_Mportput").val(XmlParser("mediaPort", xml));
        $("#bs4_userput").val(XmlParser("userName", xml));
        $("#bs4_pwdput").val(XmlParser("passWord", xml));
        if ($("#bs4_nameput").val() != "" || $("#bs4_hostput").val() != "")
            $("#bs4_text").text($("#bs4_nameput").val() + "(" + $("#bs4_hostput").val() + ")");
        Struct.devInfo[3].ip = $("#bs4_hostput").val();
        Struct.devInfo[3].port = $("#bs4_portput").val();
        Struct.devInfo[3].mediaport = $("#bs4_Mportput").val();
        Struct.devInfo[3].user = $("#bs4_userput").val();
        Struct.devInfo[3].pwd = $("#bs4_pwdput").val();
        Struct.devInfo[3].devname = $("#bs4_nameput").val();
        Struct.devInfo[3].type = $("#bs4_typesel").val() * 1;
        if (Struct.devInfo[3].ip == "") {
            isOpenA[3] = false;
            //gDvr.obj[3].UNRegMy();
        } else {
            try {
                //gDvr.obj[3].UpdateFirstChannelUserRight(Qqx);
            }
            catch (e) { }
            //gDvr.obj[3].RegMy(Struct.devInfo[3].ip, Struct.devInfo[3].port * 1, Struct.devInfo[3].mediaport * 1, Struct.devInfo[3].user, Struct.devInfo[3].pwd, Struct.devInfo[3].devname, gVar.nStreamType, gVar.nDate * 1 + 3, Struct.devInfo[3].type);
        }

        //set selected options disabled
        var child = document.getElementById("bsmullist").childNodes;
        var channel = $("#bs4_hostput").val();
        if (channel != "") {
            for (var k = 0; k < child.length; k++) {
                if (child[k].text.indexOf(channel) != -1) {
                    child[k].disabled = true;
                    break;
                }
            }
        }
        bMaskHide = false;
        RfParamCall(Call4, "", "getMultiDevDetailInfo&chnnl=" + 4, null, 5000);
    }
    function Call2(xml) {
        $("#bs3_typesel").val(XmlParser("productType", xml));
        $("#bs3_nameput").val(XmlParser("devName", xml));
        $("#bs3_hostput").val(XmlParser("ip", xml));
        $("#bs3_portput").val(XmlParser("port", xml));
        $("#bs3_Mportput").val(XmlParser("mediaPort", xml));
        $("#bs3_userput").val(XmlParser("userName", xml));
        $("#bs3_pwdput").val(XmlParser("passWord", xml));
        if ($("#bs3_nameput").val() != "" || $("#bs3_hostput").val() != "")
            $("#bs3_text").text($("#bs3_nameput").val() + "(" + $("#bs3_hostput").val() + ")");
        Struct.devInfo[2].ip = $("#bs3_hostput").val();
        Struct.devInfo[2].port = $("#bs3_portput").val();
        Struct.devInfo[2].mediaport = $("#bs3_Mportput").val();
        Struct.devInfo[2].user = $("#bs3_userput").val();
        Struct.devInfo[2].pwd = $("#bs3_pwdput").val();
        Struct.devInfo[2].devname = $("#bs3_nameput").val();
        Struct.devInfo[2].type = $("#bs3_typesel").val() * 1;
        if (Struct.devInfo[2].ip == "") {
            isOpenA[2] = false;
            //gDvr.obj[2].UNRegMy();
        } else {
            try {
                //gDvr.obj[2].UpdateFirstChannelUserRight(Qqx);
            }
            catch (e) { }
            //gDvr.obj[2].RegMy(Struct.devInfo[2].ip, Struct.devInfo[2].port * 1, Struct.devInfo[2].mediaport * 1, Struct.devInfo[2].user, Struct.devInfo[2].pwd, Struct.devInfo[2].devname, gVar.nStreamType, gVar.nDate * 1 + 2, Struct.devInfo[2].type);
        }

        //set selected options disabled
        var child = document.getElementById("bsmullist").childNodes;
        var channel = $("#bs3_hostput").val();
        if (channel != "") {
            for (var k = 0; k < child.length; k++) {
                if (child[k].text.indexOf(channel) != -1) {
                    child[k].disabled = true;
                    break;
                }
            }
        }
        bMaskHide = false;
        RfParamCall(Call3, "", "getMultiDevDetailInfo&chnnl=" + 3, null, 5000);
    }

    function Call1(xml) {
        $("#bs2_typesel").val(XmlParser("productType", xml));
        $("#bs2_nameput").val(XmlParser("devName", xml));
        $("#bs2_hostput").val(XmlParser("ip", xml));
        $("#bs2_portput").val(XmlParser("port", xml));
        $("#bs2_Mportput").val(XmlParser("mediaPort", xml));
        $("#bs2_userput").val(XmlParser("userName", xml));
        $("#bs2_pwdput").val(XmlParser("passWord", xml));
        if ($("#bs2_nameput").val() != "" || $("#bs2_hostput").val() != "")
            $("#bs2_text").text($("#bs2_nameput").val() + "(" + $("#bs2_hostput").val() + ")");
        Struct.devInfo[1].ip = $("#bs2_hostput").val();
        Struct.devInfo[1].port = $("#bs2_portput").val();
        Struct.devInfo[1].mediaport = $("#bs2_Mportput").val();
        Struct.devInfo[1].user = $("#bs2_userput").val();
        Struct.devInfo[1].pwd = $("#bs2_pwdput").val();
        Struct.devInfo[1].devname = $("#bs2_nameput").val();
        Struct.devInfo[1].type = $("#bs2_typesel").val() * 1;
        if (Struct.devInfo[1].ip == "") {
            isOpenA[1] = false;
            //gDvr.obj[1].UNRegMy();
        } else {
            try {
                //gDvr.obj[1].UpdateFirstChannelUserRight(Qqx);
            }
            catch (e) { }
            //gDvr.obj[1].RegMy(Struct.devInfo[1].ip, Struct.devInfo[1].port * 1, Struct.devInfo[1].mediaport * 1, Struct.devInfo[1].user, Struct.devInfo[1].pwd, Struct.devInfo[1].devname, gVar.nStreamType, gVar.nDate * 1 + 1, Struct.devInfo[1].type);
        }

        //set selected options disabled
        var child = document.getElementById("bsmullist").childNodes;
        var channel = $("#bs2_hostput").val();
        if (channel != "") {
            for (var k = 0; k < child.length; k++) {
                if (child[k].text.indexOf(channel) != -1) {
                    child[k].disabled = true;
                    break;
                }
            }
        }
        bMaskHide = false;
        RfParamCall(Call2, "", "getMultiDevDetailInfo&chnnl=" + 2, null, 5000);
    }

    $("#bsmultiRf").click(function () {
        $("#bsmullist").empty();
        gDvr.obj[0].SearchDev(5000);
        bMaskHide = false;
        //for (var i = 1; i <= 8; i++) {
        RfParamCall(Call1, "", "getMultiDevDetailInfo&chnnl=" + 1, null, 5000);
        //}
        //MasklayerHide();
    });
    $("#bsmultiRf").click();
});