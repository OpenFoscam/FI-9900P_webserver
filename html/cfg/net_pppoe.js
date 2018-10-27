$(function () {
    var netPPPoE_isEnable;
    var netPPPoE_uername;
    var netPPPoE_password;
    function Call(xml) {
        netPPPoE_isEnable = $(xml).find("isEnable").text() * 1;
        $(xml).find("CGI_Result").children().not("isEnable,result").each(function (i) {
            $("#netPPPoE_" + $(this).context.nodeName.toUpperCase()).val($(this).text());
            if ($(this).context.nodeName.toUpperCase() == "USERNAME") netPPPoE_uername = $(this).text();
            if ($(this).context.nodeName.toUpperCase() == "PASSWORD") netPPPoE_password = $(this).text();
        });
        $("#netUsePPPoE").attr("checked", XmlParser("isEnable", xml) * 1);
        $("#netUsePPPoE").change();
    }
    $("#netUsePPPoE").change(function () { DivBox($(this).attr("checked") * 1, "#netPPPoETable"); })

    $("#netpppoeRf").click(function () {
        RfParamCall(Call, "", "getPPPoEConfig");
    })
    $("#netpppoeRf").click();

    $("#netPPPoESave").click(function () {
		var isEnable = $("#netUsePPPoE").attr("checked") * 1;
        $("#MaskError").html("");
        //check username format
		if(isEnable == 1){
            var username = $("#netPPPoE_USERNAME").val();
            if(username == ""){
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PPPOE_ACCOUNT_EMPTY"));
                $("#netPPPoE_USERNAME").focus();
                return;
            }
            if (username != "" && !username.match(/^[a-zA-Z0-9\@\_\.\$\*\-]+$/)) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_PPPOEACC") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                $("#netPPPoE_USERNAME").focus();
                return;
            }
            //check password format
            var password = $("#netPPPoE_PASSWORD").val();
            if(password == ""){
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                $("#netPPPoE_PASSWORD").focus();
                return;
            }
            if (password != "" && (password.indexOf("&") != -1 || password.indexOf("=") != -1) || password.charAt(0) == " ") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_PPPOPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                $("#netPPPoE_PASSWORD").focus();
                return;
            }

        }
        if (isEnable == netPPPoE_isEnable && $("#netPPPoE_USERNAME").val() == netPPPoE_uername && $("#netPPPoE_PASSWORD").val() == netPPPoE_password)
            return;

        RfParamCall(null, "", "setPPPoEConfig&isEnable=" + $("#netUsePPPoE").attr("checked") * 1 + "&userName=" + $("#netPPPoE_USERNAME").val() + "&password=" + $("#netPPPoE_PASSWORD").val());
    });
});