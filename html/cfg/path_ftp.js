$(function () {
    var pwdLength;
    function Call(xml) {
        $(xml).find("CGI_Result").children().not("result").each(function (i) {
            if(("phFtp_" + $(this).context.nodeName.toUpperCase()) == "phFtp_FTPPORT"){
                if($(this).text() * 1 == 0){
                    $("#phFtp_FTPPORT").val("");
                }
                else {
                    $("#phFtp_FTPPORT").val($(this).text());
                }
            }else{
                $("#phFtp_" + $(this).context.nodeName.toUpperCase()).val($(this).text());
            }
        });
    }

    function FTPTestCall(xml) {
        var textresult = $(xml).find("testResult").text();
        if (textresult == "0")
            $("#phFtpsult").val(lg.get("IDS_BS_TESTTURE"));
        else {
            if (textresult == "-1") {
                $("#phFtpsult").val(lg.get("IDS_BS_FTP_ADDR_FORMAT_ERROR"));
            } else if (textresult == "-2") {
                $("#phFtpsult").val(lg.get("IDS_BS_FTP_CONNECT_ERROR"));
            } else if (textresult == "-3") {
                $("#phFtpsult").val(lg.get("IDS_BS_FTP_LOGIN_ERROR"));
            } else if (textresult == "-4") {
                $("#phFtpsult").val(lg.get("IDS_BS_FTP_DIR_ERROR"));
            }
        }
        $("#pathftpword1").css("display", "none");
        $("#phFtpTest").attr("disabled", "");
    }

    $("#phFtpTest").click(function () {
        $("#phFtpTest").attr("disabled", "disabled");
        var ftpAddr = $("#phFtp_FTPADDR").val();
        if (ftpAddr != "") {
            //check phFtp_FTPADDR format
            if (ftpAddr.indexOf("&") != -1 || ftpAddr.indexOf("=") != -1) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PATH_FTPADDR") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                $("#phFtp_FTPADDR").focus();
                $("#phFtpTest").attr("disabled", "");
                return;
            }
            //check phFtp_FTPADDR length
            if (!IsLimitLength(ftpAddr, 127)) {
                if (gVar_first.N_language != 2)
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS") + " " + lg.get("IDS_CHARACTER_NOTICE"));
                else
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS"));

                $("#phFtp_FTPADDR").focus();
                $("#phFtpTest").attr("disabled", "");
                return;
            }
        }

        var ftpUserName = $("#phFtp_USERNAME").val();
        if (ftpUserName != "") {
            var bIsChinaDev = (gVar_first.N_language != 2);
            //check phFtp_USERNAME format
            if ((!bIsChinaDev && !ftpUserName.match(/^[a-zA-Z0-9\_\@\$\*\-\,\.\#\!]+$/)) ||
                (bIsChinaDev && !ftpUserName.match(/^[a-zA-Z0-9\_\@\$\*\-\,\.\#\!\u4e00-\u9fa5]+$/))) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PATH_FTPUSRNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                $("#phFtp_USERNAME").focus();
                $("#phFtpTest").attr("disabled", "");
                return;
            }

            //check phFtp_USERNAME length
            if (!IsLimitLength(ftpUserName, 63)) {
                if (bIsChinaDev)
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS") + " " + lg.get("IDS_CHARACTER_NOTICE"));
                else
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS"));

                $("#phFtp_USERNAME").focus();
                $("#phFtpTest").attr("disabled", "");
                return;
            }
        }
        //check phFtp_PASSWORD format
        var ftpPwd = $("#phFtp_PASSWORD").val();
        if (ftpPwd != "" && !ftpPwd.match(/^[a-zA-Z0-9\~\!\@\$\#\*\(\)\_\[\]\{\}\:\"\|\<\>\?\`\-\;\'\\\,\.\/\+\%\^\&\=]+$/)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PATH_FTPPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#phFtp_PASSWORD").focus();
            $("#phFtpTest").attr("disabled", "");
            return;
        }

        $("#pathftpword1").css("display", "");
        $("#phFtpsult").val("");
        bJudgeCgiResult = false;

        pwdLength = "";
        for (var s = 0; s < ftpPwd.length; s++) {
            pwdLength += ftpPwd.charCodeAt(s) + ",";
        }
        pwdLength = pwdLength.substring(0, pwdLength.length - 1);

        RfParamCall(FTPTestCall, "", "testFtpServerNew&ftpAddr=" + $("#phFtp_FTPADDR").val() + "&ftpPort=" + $("#phFtp_FTPPORT").val() + "&mode=" + $("#phFtp_MODE").val() + "&fptUserName=" + $("#phFtp_USERNAME").val() + "&ftpPassword=" + pwdLength, "", 3500);

        /*gVar.Cgi({
        url: "cmd=testFtpServer&ftpAddr=" + $("#phFtp_FTPADDR").val() + "&ftpPort=" + $("#phFtp_FTPPORT").val() + "&mode=" + $("#phFtp_MODE").val() + "&fptUserName=" + $("#phFtp_USERNAME").val() + "&ftpPassword=" + $("#phFtp_PASSWORD").val(),
        timeout: 35000,
        suc: function (data, state) {
        var textresult = $(data).find("testResult").text();
        if (textresult == "0")
        $("#phFtpsult").val(lg.get("IDS_BS_TESTTURE"));
        else {
        if (textresult == "-1") {
        $("#phFtpsult").val(lg.get("IDS_BS_FTP_ADDR_FORMAT_ERROR"));
        } else if (textresult == "-2") {
        $("#phFtpsult").val(lg.get("IDS_BS_FTP_CONNECT_ERROR"));
        } else if (textresult == "-3") {
        $("#phFtpsult").val(lg.get("IDS_BS_FTP_LOGIN_ERROR"));
        } else if (textresult == "-4") {
        $("#phFtpsult").val(lg.get("IDS_BS_FTP_DIR_ERROR"));
        }
        }
        $("#pathftpword1").css("display", "none");
        $("#phFtpTest").attr("disabled", "");
        },
        err: function (data, state) {
        $("#pathftpword1").css("display", "none");
        $("#phFtpTest").attr("disabled", "");
        }
        })*/
    });

    $("#pathftpRf").click(function () {
        $("#phFtpTest").attr("disabled", "");
        $("#phFtpsult").val("");
        RfParamCall(Call, "", "getFtpConfig");
    });

    $("#phFtpSave").click(function () {
        //check phFtp_FTPADDR format
        var ftpAddr = $("#phFtp_FTPADDR").val();
        if (ftpAddr != "" && (ftpAddr.indexOf("&") != -1 || ftpAddr.indexOf("=") != -1)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PATH_FTPADDR") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#phFtp_FTPADDR").focus();
            return;
        }
        //check phFtp_USERNAME format
        var ftpUserName = $("#phFtp_USERNAME").val();
        if (ftpUserName != "") {
            var bIsChinaDev = (gVar_first.N_language != 2);
            if ((!bIsChinaDev && !ftpUserName.match(/^[a-zA-Z0-9\_\@\$\*\-\,\.\#\!]+$/)) ||
                (bIsChinaDev && !ftpUserName.match(/^[a-zA-Z0-9\_\@\$\*\-\,\.\#\!\u4e00-\u9fa5]+$/))) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PATH_FTPUSRNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                $("#phFtp_USERNAME").focus();
                return;
            }
        }
        //check phFtp_PASSWORD format
        var ftpPwd = $("#phFtp_PASSWORD").val();
        if (ftpPwd != "" && !ftpPwd.match(/^[a-zA-Z0-9\~\!\@\$\#\*\(\)\_\[\]\{\}\:\"\|\<\>\?\`\-\;\'\\\,\.\/\+\%\^\&\=]+$/)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PATH_FTPPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#phFtp_PASSWORD").focus();
            return;
        }
        
        pwdLength = "";
        for (var s = 0; s < ftpPwd.length; s++) {
            pwdLength += ftpPwd.charCodeAt(s) + ",";
        }
        pwdLength = pwdLength.substring(0, pwdLength.length - 1);
        RfParamCall(null, "",
		"setFtpConfigNew&ftpAddr=" + $("#phFtp_FTPADDR").val() + "&ftpPort=" + $("#phFtp_FTPPORT").val() + "&mode=" + $("#phFtp_MODE").val() + "&userName=" + $("#phFtp_USERNAME").val() + "&password=" + pwdLength, null, 35000);
    });

    $("#pathftpRf").click();
});