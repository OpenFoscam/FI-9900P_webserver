$(function () {
    var pre_recver;
    var pre_bsE1_SERVER;
    var pre_bsEl_PORT;
    var pre_bsEl_TLS;
    var pre_bsEl_ISNEEDAUTH;
    var pre_bsEl_USER;
    var pre_bsEl_PASSWORD;
    var pre_bsEl_SENDER;
    var pwdLength;
    $("#bsElUse").change(function () {
        DivBox($(this).attr("checked") * 1 == 1, "#bsElTable1");
        $("#bsetestsult").attr("readonly", "readonly");
        if ($(this).attr("checked") * 1 == 1) {
            $("#bsElTest").attr("disabled", "");
        }
        else {
            $("#bsElTest").attr("disabled", "disabled");
        }

    })
    jQuery("#bsElTable tr:odd").addClass("t1");
    jQuery("#bsElTable tr:even").addClass("t2");

    function Call(xml) {
        $(xml).find("CGI_Result").children().not("result, isEnable, reciever").each(function (i) {
            $("#bsEl_" + $(this).context.nodeName.toUpperCase()).val($(this).text());
            pre_bsE1_SERVER = $("#bsEl_SERVER").val();
            pre_bsEl_PORT = $("#bsEl_PORT").val();
            pre_bsEl_TLS = $("#bsEl_TLS").val();
            pre_bsEl_ISNEEDAUTH = $("#bsEl_ISNEEDAUTH").val();
            pre_bsEl_USER = $("#bsEl_USER").val();
            pre_bsEl_PASSWORD = $("#bsEl_PASSWORD").val();
            pre_bsEl_SENDER = $("#bsEl_SENDER").val();
        });

        $("#bsElUse").attr("checked", XmlParser("isEnable", xml) * 1);
        var reciever = XmlParser("reciever", xml).split(",");

        pre_recver = XmlParser("reciever", xml);
        for (var i = 1; i <= reciever.length; i++) {
            $("#bsEl_RECIEVER" + i).val(reciever[i - 1]);
        }
        setTimeout(function () {
            $("#bsElUse").change();
        }, 1)
    }

    function MailTestCall(xml) {
        if (gVar.lg == "CHS") {
            if($(xml).find("testResult").text() != "");
            var testResult = $(xml).find("testResult").text() * 1;
            switch (testResult) {
                case 0:
                    $("#bsetestsult").val(lg.get("IDS_BS_TESTTURE"));
                    break;
                case 2:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT2"));
                    break;
                case 3:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT3"));
                    break;
                case 4:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT4"));
                    break;
                case 5:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT5"));
                    break;
                case 6:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT6"));
                    break;
                case 7:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT7"));
                    break;
                case 8:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT8"));
                    break;
                case 9:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT9"));
                    break;
                case 64:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT64"));
                    break;
                case 65:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT65"));
                    break;
                case 66:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT66"));
                    break;
                case 67:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT67"));
                    break;
                case 68:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT68"));
                    break;
                case 69:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT69"));
                    break;
                case 70:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT70"));
                    break;
                case 71:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT71"));
                    break;
                case 72:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT72"));
                    break;
                case 73:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT73"));
                    break;
                case 74:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT74"));
                    break;
                case 75:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT75"));
                    break;
                case 76:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT76"));
                    break;
                case 77:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT77"));
                    break;
                case 78:
                    $("#bsetestsult").val(lg.get("IDS_EMAIL_TEST_RESULT78"));
                    break;
            }
        }
        else {
            if ($(xml).find("testResult").text() != "0") {
                $("#bsetestsult").val($(xml).find("errorMsg").text());
            }
            else $("#bsetestsult").val(lg.get("IDS_BS_TESTTURE"));
        }
        $("#baemailword").css("display", "none");
        $("#bsElTest").attr("disabled", "");
    }

    $("#bsElTest").click(function () {
        $("#bsElTest").attr("disabled", "disabled");
        $("#baemailword").css("display", "");
        $("#bsetestsult").val("");

        pwdLength = "";
        var pwd = $("#bsEl_PASSWORD").val();
        for (var s = 0; s < pwd.length; s++) {
            pwdLength += pwd.charCodeAt(s) + ",";
        }
        pwdLength = pwdLength.substring(0, pwdLength.length - 1);

        RfParamCall(MailTestCall, "", "smtpTestNew&smtpServer=" + $("#bsEl_SERVER").val() + "&port=" + $("#bsEl_PORT").val() + "&tls=" + $("#bsEl_TLS").val() + "&isNeedAuth=" + $("#bsEl_ISNEEDAUTH").val() + "&user=" + $("#bsEl_USER").val() + "&password=" + pwdLength + "&sender=" + $("#bsEl_SENDER").val(), null, 35000);
    })

    $("#bsemailRf").click(function () {
        RfParamCall(Call, "", "getSMTPConfig");
        $("#bsetestsult").val("");
        $("#baemailword").css("display", "none");
        $("#bsElTest").attr("disabled", "");
    });


    $("#bsElSave").click(function () {
        var tmpReceive = "";
        var sReg = /[_a-zA-Z\d\-\.\$\*]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;

        if ($("#bsElUse").attr("checked") * 1) {

            //check SMTP addr
            var smtpAddr = $("#bsEl_SERVER").val();
            if (smtpAddr != "") {
                 if (!smtpAddr.match(/^[a-zA-Z0-9\@\_\.\-]+$/)) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_SMTPAD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                    $("#bsEl_SERVER").focus();
                    return;
                }
            }
            //check SMTP user
            var smtpUser = $("#bsEl_USER").val();
            if (smtpUser != "") {
                if (!IsLimitLength(smtpUser, 63) || !smtpUser.match(/^[a-zA-Z0-9\@\_\.\$\*\-]+$/)) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_SMTPUSRNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                    $("#bsEl_USER").focus();
                    return;
                }
            }
            //check SMTP password
            var smtpPwd = $("#bsEl_PASSWORD").val();
            if (smtpPwd != "") {
                if (!IsLimitLength(smtpPwd, 16)) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_SMTPPASSWORD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                    $("#bsEl_PASSWORD").focus();
                    return;
                }
            }
            //check Recipients
            for (var i = 1; i <= 4; i++) {
                tmpReceive = $("#bsEl_RECIEVER" + i).val();
                if (tmpReceive != "") {
                    if (!IsLimitLength(tmpReceive, 63) || !tmpReceive.match(/^[a-zA-Z0-9\@\_\.\$\*\-]+$/) || !tmpReceive.match(sReg)) {
                        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_RECIEVER" + i) + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                        $("#bsEl_RECIEVER" + i).focus();
                        return;
                    }
                }
            }

            var tmpSender = $("#bsEl_SENDER").val();
            if (tmpSender != "") {
                if (!IsLimitLength(tmpSender, 63) || !tmpSender.match(/^[a-zA-Z0-9\@\_\.\$\*\-]+$/) || !tmpSender.match(sReg)) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_MAIL_SENDER_FORMAT_ERROR"));
                    $("#bsEl_SENDER").focus();
                    return;
                }
            }
            var reciever = "";
            for (var i = 1; i < 4; i++) {
                reciever += $("#bsEl_RECIEVER" + i).val() + ",";
            }
            reciever += $("#bsEl_RECIEVER" + 4).val();

            pwdLength = "";
            for (var s = 0; s < smtpPwd.length; s++) {
                pwdLength += smtpPwd.charCodeAt(s) + ",";
            }
            pwdLength = pwdLength.substring(0, pwdLength.length - 1);

            RfParamCall(null, "", "setSMTPConfigNew&isEnable=" + $("#bsElUse").attr("checked") * 1 + "&server=" + $("#bsEl_SERVER").val() + "&port=" + $("#bsEl_PORT").val() + "&tls=" + $("#bsEl_TLS").val() + "&isNeedAuth=" + $("#bsEl_ISNEEDAUTH").val() + "&user=" + $("#bsEl_USER").val() + "&password=" + pwdLength + "&sender=" + $("#bsEl_SENDER").val() + "&reciever=" + reciever);
        }
        else {
            reciever = pre_recver;

            pwdLength = "";
            var pwd = pre_bsEl_PASSWORD;
            for (var s = 0; s < pwd.length; s++) {
                pwdLength += pwd.charCodeAt(s) + ",";
            }
            pwdLength = pwdLength.substring(0, pwdLength.length - 1);

            RfParamCall(null, "", "setSMTPConfigNew&isEnable=" + $("#bsElUse").attr("checked") * 1 + "&server=" + pre_bsE1_SERVER + "&port=" + pre_bsEl_PORT + "&tls=" + pre_bsEl_TLS + "&isNeedAuth=" + pre_bsEl_ISNEEDAUTH + "&user=" + pre_bsEl_USER + "&password=" + pwdLength + "&sender=" + pre_bsEl_SENDER + "&reciever=" + reciever);
        }
    })

    $("#bsemailRf").click();
});