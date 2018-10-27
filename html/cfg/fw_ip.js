$(function () {
    MasklayerHide();
    $("#FwIPIsEnable").change(function () { DivBox($(this).attr("checked") * 1 == 1, "#fwIpDiv"); })
    $("#fwIpTable").empty().append("<tr><th width='180'>" + lg.get("IDS_FW_IPGY") + 1 +
    	"</th><th><input class='select' id='fwIp_IP0' maxlength='15' onkeyup='rpPos(this,/[^0-9\.]/g,\"\")'/></th></tr>");
    for (var i = 1; i <= 7; i++) {
        $("#fwIpTable").append("<tr><th>" + lg.get("IDS_FW_IPGY") + (i + 1) + "</th><th><input class='select' id='fwIp_IP" + i +
	        "' maxlength='15' onkeyup='rpPos(this,/[^0-9\.]/g,\"\")'/></th></tr>")
    }

    function Call(xml) {
        var rule = $(xml).find("rule").text() * 1;
        $("#FwIP_rule").val(rule);
        for (var i = 0; i <= 7; i++) {
            var fwiplist = $(xml).find("ipList" + i).text();
            if (fwiplist == 0)
                $("#fwIp_IP" + i).val("");
            else
                $("#fwIp_IP" + i).val(num2ip(fwiplist));
        }
        $("#FwIPIsEnable").attr("checked", $(xml).find("isEnable").text() * 1)
        setTimeout(function () {
            $("#FwIPIsEnable").change();
        }, 1)
    }

    $("#fwipRf").click(function () {
        RfParamCall(Call, "", "getFirewallConfig");
    });

    $("#fwIpSave").click(function () {
        var fip = new Array;
        fip[0] = "";
        fip[1] = "";
        fip[2] = "";
        fip[3] = "";
        fip[4] = "";
        fip[5] = "";
        fip[6] = "";
        fip[7] = "";
        if ($("#FwIPIsEnable").attr("checked") * 1 == 1) {
            if ($("#fwIp_IP" + 0).val() == "" && $("#fwIp_IP" + 1).val() == "" && $("#fwIp_IP" + 2).val() == "" && $("#fwIp_IP" + 3).val() == "" && $("#fwIp_IP" + 4).val() == "" && $("#fwIp_IP" + 5).val() == "" && $("#fwIp_IP" + 6).val() == "" && $("#fwIp_IP" + 7).val() == "" &&
			$("#FwIP_rule").val() == 1 && $("#FwIPIsEnable").attr("checked") * 1 == 1) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FW_IPLIST_ERROR"));
                return;
            }
            var issameFlag = false;
            for (var i = 0; i < (fip.length - 1); i++) {
                for (var j = i + 1; j < fip.length; j++) {
                    if (($("#fwIp_IP" + i).val() != "") &&
		            ($("#fwIp_IP" + j).val() != "") &&
		            ($("#fwIp_IP" + i).val() == $("#fwIp_IP" + j).val())) {
                        issameFlag = true;
                        break;
                    }
                }
            }
            if (issameFlag == false) {

            }
            else {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FIP_IPLISTSAME"));
                return;
            }
            for (var i = 0; i <= 7; i++) {
                if ($("#fwIp_IP" + i).val() == "")
                { fip[i] = "0.0.0.0"; }
                else {
                    if (Isip($("#fwIp_IP" + i)))
                    { fip[i] = $("#fwIp_IP" + i).val(); }
                    else {
                        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FW_IP_FORMAT_ERROR"));
                        return;
                    }
                }
            }
        }
        else {
            for (var i = 0; i <= 7; i++) {
                //fip[i] = $("#fwIp_IP" + i).val();
                $("#fwIp_IP" + i).val("");
            }
        }

        RfParamCall(null, "", "setFirewallConfig&isEnable=" + $("#FwIPIsEnable").attr("checked") * 1 + "&rule="
		+ $("#FwIP_rule").val() + "&ipList0=" + ip2num(fip[0]) + "&ipList1=" + ip2num(fip[1]) + "&ipList2=" + ip2num(fip[2])
		+ "&ipList3=" + ip2num(fip[3]) + "&ipList4=" + ip2num(fip[4]) + "&ipList5=" + ip2num(fip[5]) + "&ipList6=" + ip2num(fip[6])
		+ "&ipList7=" + ip2num(fip[7]));
    });

    $("#fwipRf").click();
});