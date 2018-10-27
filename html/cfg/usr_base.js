$(function () {
    var $obj = null;

    function RestoreUserBs() {
        $("#usrBsUTable tr[name='usrBsDP1']").css("display", "none");
        $("#usrBsUTable tr[name='usrBsDP2']").css("display", "none");
        $("#usrBsUTable tr[name='usrBsDP3']").css("display", "none");
        $("#usrBsUTable tr[name='usrBsDP4']").css("display", "none");
        $("#usrBsUTable tr[name='usrBsDP5']").css("display", "none");
        $("#usrBsUTable tr[name='usrBsDP2AG']").css("display", "none");
        $("#chkResultTR").css("display", "none");
        $("#chkResultaddTR").css("display", "none");
        $("#usrRadUsrname").attr("checked", false);//.attr("disabled", true);
        $("#usrRadPwd").attr("checked", false);//.attr("disabled", true);
        $("#usrRadUsrname").css("display", "none");
        $("#usrRadPwd").css("display", "none");
        $("#usrBsModifyUsername").css("display", "none");
        $("#usrBsModifyPwd").css("display", "none");

        $("#usrBsXg").css("display", "none");
    }

    function RfCall(xml) {
        if ($("#usrBsTable tr:eq(8) td:eq(0)").text() == "8") {
            $("#usrBsTable tr:gt(0)").remove();
        }
        var num = XmlParser("usrCnt", xml);
        var usr, str;
        var i = 1;
        RestoreUserBs();

        $("#usrBsTable").not(":first").empty();
        for (; i <= num; i++) {
            var usrqx = "";
            usr = XmlParser("usr" + i, xml).split("+");
            if (usr[1] == 0)
                usrqx = lg.get("IDS_BS_RIGHT0");
            else if (usr[1] == 1)
                usrqx = lg.get("IDS_BS_RIGHT1");
            else usrqx = lg.get("IDS_BS_RIGHT2");
            str = '<tr add="1"><td>' + i + '</td><td>' + usr[0] + '</td><td>' + usrqx + '</td></tr>';
            $("#usrBsTable").append(str);
        }
        if (gVar_first.model == 1113) {
        }
        else {
            for (; i <= 8; i++) {
                str = '<tr add="0"><td>' + i + '</td><td></td><td></td></tr>';
                $("#usrBsTable").append(str);
            }
        }

        $("#usrBsTable tr").removeClass("UserList2").unbind();
        $("#usrBsTable tr").not(":first").mouseover(function () {
            $(this).css("cursor", "pointer").addClass("UserList");
        }).mouseout(function () {
            $(this).removeClass("UserList");
        }).click(function () {
            $("#chkResult").css("background", "url(../../images/pwd_no.gif) center no-repeat");
            $("#chkResultadd").css("background", "url(../../images/pwd_no.gif) center no-repeat");

            if ($obj != null) {
                $obj.attr("active", "0").removeClass("UserList2");
            }

            if ($obj != $(this)) {
                RestoreUserBs();

                $("#usrBsName").val("");
                $("#usrBsOldPwd").val("");
                $("#usrBsNewPwd").val("");
                $("#usrBsNewUsernameP").val("");
                $("#usrBsNewPwdAG").val("");


                var isFirst = ($obj == $("#usrBsTable tr:first-child"));

                ($obj = $(this)).attr("active", "1").addClass("UserList2");
                if ($obj.attr("add") == "0") {
                    //$("#usrRadUsrname").attr("disabled", true);
                    //$("#usrRadPwd").attr("disabled", true);
                    $("#usrRadUsrname").css("display", "none");
                    $("#usrRadPwd").css("display", "none");
                    $("#usrBsModifyUsername").css("display", "none");
                    $("#usrBsModifyPwd").css("display", "none");
                    $("#usrBsUTable tr[name='usrBsDP1']").css("display", "");
                    $("#usrBsUTable tr[name='usrBsDP3']").css("display", "");
                    $("#usrBsUTable tr[name='usrBsDP2AG']").css("display", "");
                    $("#chkResultaddTR").css("display", "");
                    $("#usrBsUTable tr[name='usrBsDP4']").css("display", "none");
                    //$("#usrBsOldPwd").attr("disabled","");

                } else {
                    //$("#usrRadUsrname").attr("disabled", false);
                    //$("#usrRadPwd").attr("disabled", false);
                    $("#usrRadUsrname").css("display", "");
                    $("#usrRadPwd").css("display", "");
                    $("#usrBsModifyUsername").css("display", "");
                    $("#usrBsModifyPwd").css("display", "");
                    $("#usrBsUTable tr[name='usrBsDP3']").css("display", "none");
                    $("#chkResultaddTR").css("display", "none");
                    $("#usrBsUTable tr[name='usrBsDP2AG']").css("display", "none");
                    $("#usrBsUTable tr[name='usrBsDP4']").css("display", "");
                    $("#usrBsName").val($obj.children(":nth-child(2)").text());
                    if ($obj.children(":nth-child(3)").text() == lg.get("IDS_BS_RIGHT0")) {
                        $("#usrBsRight").val(0);
                        $("#usrBsDel").css("display", "");
                    }
                    else if ($obj.children(":nth-child(3)").text() == lg.get("IDS_BS_RIGHT1")) {
                        $("#usrBsRight").val(1);
                        $("#usrBsDel").css("display", "");
                    }
                    else {
                        $("#usrBsRight").val(2);
                        if ($obj.children(":nth-child(2)").text() == gVar_first.user)
                            $("#usrBsDel").css("display", "none");
                        else $("#usrBsDel").css("display", "");
                    }
                }
            }
            //if ($("#usrRadUsrname").attr("disabled") == true && $("#usrRadPwd").attr("disabled") == true) {
            if($("#usrRadUsrname").css("display") == "none" && $("#usrRadPwd").css("display") == "none"){
                $("#usrBsName").attr("readonly", "");
                $("#usrBsRight").attr("disabled", "");
            }
            else {
                $("#usrBsName").attr("readonly", "readonly");
                $("#usrBsRight").attr("disabled", "disabled");
            }
        })

        $("#usrRadUsrname").click(function () {
            $("#chkResult").css("background", "url(../../images/pwd_no.gif) center no-repeat");
            $("#chkResultadd").css("background", "url(../../images/pwd_no.gif) center no-repeat");

            if ($("#usrRadUsrname").attr("checked") == false) {
                $("#usrBsUTable tr[name='usrBsDP5']").css("display", "none");
            } else {
                $("#usrBsUTable tr[name='usrBsDP5']").css("display", "");
            }

            if (Qqx == 0) {
                if ($("#usrBsRight").val() == 0 && gVar.user == $("#usrBsName").val())
                    $("#usrBsXg").css("display", "").css("width", "70px");
                else $("#usrBsXg").css("display", "none");
            }
            else if (Qqx == 1) {
                if ($("#usrBsRight").val() == 1 && gVar.user == $("#usrBsName").val())
                    $("#usrBsXg").css("display", "").css("width", "70px");
                else $("#usrBsXg").css("display", "none");
            }
            else $("#usrBsXg").css("display", "").css("width", "70px");
            $("#usrBsDel").css("display", "none");

            if ($("#usrRadUsrname").attr("checked") == false && $("#usrRadPwd").attr("checked") == false) {
                if ($obj.children(":nth-child(2)").text() != gVar_first.user) {
                    $("#usrBsXg").css("display", "none");
                    $("#usrBsDel").css("display", "");
                } else {
                    $("#usrBsXg").css("display", "none");
                    $("#usrBsDel").css("display", "none");
                }
            }
        })

        $("#usrRadPwd").click(function () {
            if ($("#usrRadPwd").attr("checked") == false) {
                $("#usrBsUTable tr[name='usrBsDP1']").css("display", "none");
                $("#usrBsUTable tr[name='usrBsDP2']").css("display", "none");
                $("#usrBsUTable tr[name='usrBsDP2AG']").css("display", "none");
                $("#chkResultTR").css("display", "none");

            } else {
                $("#usrBsUTable tr[name='usrBsDP1']").css("display", "");
                $("#usrBsUTable tr[name='usrBsDP2']").css("display", "");
                $("#usrBsUTable tr[name='usrBsDP2AG']").css("display", "");
                $("#chkResultTR").css("display", "");
            }
            if (Qqx == 0) {
                if ($("#usrBsRight").val() == 0 && gVar.user == $("#usrBsName").val())
                    $("#usrBsXg").css("display", "").css("width", "70px");
                else $("#usrBsXg").css("display", "none");
            }
            else if (Qqx == 1) {
                if ($("#usrBsRight").val() == 1 && gVar.user == $("#usrBsName").val())
                    $("#usrBsXg").css("display", "").css("width", "70px");
                else $("#usrBsXg").css("display", "none");
            }
            else $("#usrBsXg").css("display", "").css("width", "70px");
            $("#usrBsDel").css("display", "none");

            if ($("#usrRadUsrname").attr("checked") == false && $("#usrRadPwd").attr("checked") == false) {
                if ($obj.children(":nth-child(2)").text() != gVar_first.user) {
                    $("#usrBsXg").css("display", "none");
                    $("#usrBsDel").css("display", "");
                } else {
                    $("#usrBsXg").css("display", "none");
                    $("#usrBsDel").css("display", "none");
                }
            }
        })
    }

    function ChangePwdCall(xml) {
        bJudgeCgiResult = true;
        if ($(xml).find("result").text() * 1 == 0) {
            colorFlag = 1;
            User_defined_text("userModiResult", lg.get("IDS_USR_SUCESSPSD"));
            colorFlag = 0;
            if ($("#usrBsName").val() == gVar_first.user) {
                setTimeout(function () {
                    window.location.href = "";
                }, 1000)
            } else {
                setTimeout(function () {
                    $("#usrbaseRf").click();
                }, 2000)
            }
        }
        else if ($(xml).find("result").text() * 1 == -5)
            User_defined_text("userModiResult", lg.get("IDS_LOG_WPWD"))
        else
            User_defined_text("userModiResult", lg.get("IDS_USR_FAILDPSD"))
    }

    function ChangeUsernameCall(xml) {
        bJudgeCgiResult = true;
        if ($(xml).find("result").text() * 1 == 0) {
            colorFlag = 1;
            User_defined_text("userModiResult", lg.get("IDS_USR_CHANGE_USERNAME_SUCCESS"));
            colorFlag = 0;
            if ($("#usrBsName").val() == gVar_first.user) {
                setTimeout(function () {
                    window.location.href = "";
                }, 1000)
            }
            else {

                setTimeout(function () {
                    $("#usrbaseRf").click();
                }, 2000)
            }
        }
        else if ($(xml).find("result").text() * 1 == -3) {
            User_defined_text("userModiResult", lg.get("IDS_LOGIN_CHANGE_USRNAME_EXIST"));
        }
        else if ($(xml).find("result").text() * 1 == -4) {
            User_defined_text("userModiResult", lg.get("IDS_LOG_NOUSRN"));
        }
        else
            User_defined_text("userModiResult", lg.get("IDS_USR_CHANGE_USERNAME_FAILED"))
    }

    function ChangeUsernameAndPwdCall(xml) {
        bJudgeCgiResult = true;
        if ($(xml).find("result").text() * 1 == 0) {
            colorFlag = 1;
            User_defined_text("userModiResult", lg.get("IDS_NAMEPWD_CHANGESUCSS"));
            colorFlag = 0;
            if ($("#usrBsName").val() == gVar_first.user) {
                setTimeout(function () {
                    window.location.href = "";
                }, 1000)
            }
            else {
                setTimeout(function () {
                    $("#usrbaseRf").click();
                }, 2000)
            }
        }
        else if ($(xml).find("result").text() * 1 == -1)   //USER_ACCOUNT_OPERATE_PARM_ERR
            User_defined_text("userModiResult", lg.get("IDS_LEFT_CGIW"));
        else if ($(xml).find("result").text() * 1 == -2)   //USER_ACCOUNT_OPERATE_EXCEED_MAX_USR
            User_defined_text("userModiResult", lg.get("IDS_LEFT_UNORPWD"));
        else if ($(xml).find("result").text() * 1 == -3)   //USER_ACCOUNT_OPERATE_USR_ALREADY_EXIST
            User_defined_text("userModiResult", lg.get("IDS_LOGIN_CHANGE_USRNAME_EXIST"));
        else if ($(xml).find("result").text() * 1 == -4)   //USER_ACCOUNT_OPERATE_USR_NOT_FOUND
            User_defined_text("userModiResult", lg.get("IDS_LOG_NOUSRN"));
        else if ($(xml).find("result").text() * 1 == -5)
            User_defined_text("userModiResult", lg.get("IDS_LOG_WPWD"));
        else
            User_defined_text("userModiResult", lg.get("IDS_USR_CHANGE_NAMEANDPWD_FAILED"));
    }

    $("#usrbaseRf").click(function () {
        $("#userModiResult").html("");
        $("#usrBsTable tr").not(":first").remove();
        $("#usrBsName").val("");
        $("#usrBsOldPwd").val("");
        $("#usrBsNewPwd").val("");
        $("#usrBsNewUsernameP").val("");
        $("#usrBsNewPwdAG").val("");
        $("#usrBsXg").css("display", "none");
        $("#usrBsDel").css("display", "none");
        $("#chkResultTR").css("display", "none");
        $("#usrBsUTable tr[name='usrBsDP2AG']").css("display", "none");
        if (gVar_first.model == 1113) {
            $("#usrBase_fushibaoPlus").css("display", "none");
        }
        else {
            $("#usrBase_fushibaoPlus").css("display", "");
        }
        RfParamCall(RfCall, "", "getUserList");
    });

    function DellCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            $obj.attr("add", "0");
            $obj.children(":nth-child(2)").text("");
            $obj.children(":nth-child(3)").text("");
            $obj.click();
        }
        else if ($(xml).find("result").text() * 1 == -3) {
            User_defined_text("userModiResult", lg.get("IDS_LOGIN_CHANGE_USRNAME_EXIST"));
        }
        else if ($(xml).find("result").text() * 1 == -4) {
            User_defined_text("userModiResult", lg.get("IDS_LOG_NOUSRN"));
        }
        else if ($(xml).find("result").text() * 1 == -10) {
            User_defined_text("userModiResult", lg.get("IDS_USER_ACCOUNTS"));
        }
        else
            User_defined_text("userModiResult", lg.get("IDS_USR_CHANGE_USERNAME_FAILED"))
    }

    $("#usrBsDel").click(function () {
        var usr = $("#usrBsName").val();
        bJudgeCgiResult = false;
        RfParamCall(DellCall, "", "delAccount&usrName=" + usr);

        /*gVar_first.Cgi({
        url: "cmd=delAccount&usrName=" + usr,
        suc: function (data, state) {
        if ($(data).find("result").text() * 1 == 0) {
        $obj.attr("add", "0");
        $obj.children(":nth-child(2)").text("");
        $obj.children(":nth-child(3)").text("");
        $obj.click();
        }
        else if ($(data).find("result").text() * 1 == -3) {
        User_defined_text("userModiResult", lg.get("IDS_LOGIN_CHANGE_USRNAME_EXIST"));
        }
        else if ($(data).find("result").text() * 1 == -4) {
        User_defined_text("userModiResult", lg.get("IDS_LOG_NOUSRN"));
        }
        else
        User_defined_text("userModiResult", lg.get("IDS_USR_CHANGE_USERNAME_FAILED"))
        },
        err: function (data, state) {
        User_defined_text("userModiResult", lg.get("IDS_WEBF_FALSE"));
        }
        })*/
    })

    function AddCall(xml) {
        if ($(xml).find("result").text() * 1 == -9) {  //passwd is empty
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
            $("#usrBsOldPwd").focus();
            return;
        }
        var usr = $("#usrBsName").val();
        $obj.children(":nth-child(2)").text(usr);
        var right = "";
        if ($("#usrBsRight").val() == 0)
            right = lg.get("IDS_BS_RIGHT0");
        else if ($("#usrBsRight").val() == 1)
            right = lg.get("IDS_BS_RIGHT1");
        else
            right = lg.get("IDS_BS_RIGHT2");
        $obj.children(":nth-child(3)").text(right);
        $obj.attr("add", "1");
        $obj.click();
    }

    $("#usrBsAdd").click(function () {
        var pwd = $("#usrBsOldPwd").val();
        var usr = $("#usrBsName").val();
        var right = $("#usrBsRight").val();
        //check usr not null
        if (usr == "") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_INPUT_USERNAME"));
            $("#usrBsName").focus();
            return;
        }
        //check password not null
        if (pwd == "") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
            $("#usrBsOldPwd").focus();
            return;
        }
        //check newUsrName format
        if (!usr.match(/^[a-zA-Z0-9\_\-\@\$\*]+$/)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_NAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#usrBsName").focus();
            return;
        }

        var hasUsr = false;
        $("#usrBsTable tr").each(function () {
            if ($(this).children(":nth-child(2)").text() == usr) {
                hasUsr = true;
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_USEEXIS"));
                $("#usrBsName").focus();
            }
        })

        if (pwd != "" &&  (isInCheckPwdFormat(pwd) == 1) || isInCheckPwdFormat(pwd) == 0 && !(isPWOK(pwd))) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SERVERINFO_PSW") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR") + "! " + "<br />" + lg.get("IDS_LOGIN_PWDANDUSR_PASSWORD").split(".")[1]);
            //ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SERVERINFO_PSW") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#usrBsOldPwd").focus();
            return;
        }
        if ($("#usrBsNewPwdAG").val() != $("#usrBsOldPwd").val()) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PWD_NOTSAME"));
            $("#usrBsNewPwdAG").focus();
            return;
        }

        if (usr == "admin" && pwd == "") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NO_EMPTY_FOR_ADMIN"));
            $("#usrBsName").focus();
            return;
        }

        if (!hasUsr)
            RfParamCall(AddCall, "", "addAccount&usrName=" + usr + "&usrPwd=" + pwd + "&privilege=" + right);
    })

    $("#usrBsXg").click(function () {
        //check oldPwd format
        var oldPwd = $("#usrBsOldPwd").val();
        if (oldPwd != "" && (isInCheckPwdFormat(oldPwd) == 1)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SERVERINFO_PSW") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#usrBsOldPwd").focus();
            return;
        }
        //check newPwd format
        var newPwd = $("#usrBsNewPwd").val();
        if (newPwd != "" && (isInCheckPwdFormat(newPwd) == 1) || isInCheckPwdFormat(newPwd) == 0 && !(isPWOK(newPwd))) 
        {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEWPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR") + "<br />" + lg.get("IDS_LOGIN_PWDANDUSR_PASSWORD").split(".")[1]);
            $("#usrBsNewPwd").focus();
            return;
        }
        //check newPwdAG format
        var newPwdAG = $("#usrBsNewPwdAG").val();
        if (newPwdAG != "" && (isInCheckPwdFormat(newPwdAG) == 1)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEWPWDAG") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#usrBsNewPwdAG").focus();
            return;
        }

        if ($("#usrBsNewPwdAG").val() != $("#usrBsNewPwd").val()) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PWD_NOTSAME"));
            return;
        }
        bJudgeCgiResult = false;
        //xg pwd
        if ($("#usrRadPwd").attr("checked") == true && $("#usrRadUsrname").attr("checked") == false) {
            var oldPwd = $("#usrBsOldPwd").val();
            if (oldPwd == "") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                $("#usrBsOldPwd").focus();
                return;
            }
            if (newPwd == "") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEWPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_NET_NOTNULL"));
                //ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                $("#usrBsNewPwd").focus();
                return;
            }
            RfParamCall(ChangePwdCall, "", "changePassword&usrName=" + $("#usrBsName").val() + "&oldPwd=" + $("#usrBsOldPwd").val() + "&newPwd=" + $("#usrBsNewPwd").val());
        }
        //xg username
        else if ($("#usrRadUsrname").attr("checked") == true && $("#usrRadPwd").attr("checked") == false) {
            var newUsrName = $("#usrBsNewUsernameP").val();
            if (newUsrName == "") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEW_USERNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_NET_NOTNULL"));
                $("#usrBsNewUsernameP").focus();
                return;
            }
            //check newUsrName format
            if (newUsrName != "" && !newUsrName.match(/^[a-zA-Z0-9\_\-\@\$\*]+$/)) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEW_USERNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                $("#usrBsNewUsernameP").focus();
                return;
            }
            RfParamCall(ChangeUsernameCall, "", "changeUserName&usrName=" + $("#usrBsName").val() + "&newUsrName=" + $("#usrBsNewUsernameP").val());
        }
        //xg username and pwd
        else if ($("#usrRadUsrname").attr("checked") == true && $("#usrRadPwd").attr("checked") == true) {
            var oldPwd = $("#usrBsOldPwd").val();
            if (oldPwd == "") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                $("#usrBsOldPwd").focus();
                return;
            }
            var newUsrName = $("#usrBsNewUsernameP").val();
            if (newUsrName == "") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEW_USERNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_NET_NOTNULL"));
                $("#usrBsNewUsernameP").focus();
                return;
            }
            //check newUsrName format
            if (newUsrName != "" && !newUsrName.match(/^[a-zA-Z0-9\_\-\@\$\*]+$/)) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEW_USERNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                $("#usrBsNewUsernameP").focus();
                return;
            }
            if (newPwd == "") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEWPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_NET_NOTNULL"));
                //ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
                $("#usrBsNewPwd").focus();
                return;
            }
            RfParamCall(ChangeUsernameAndPwdCall, "", "changeUserNameAndPwdTogether&usrName=" + $("#usrBsName").val() + "&newUsrName=" + $("#usrBsNewUsernameP").val() + "&oldPwd=" + $("#usrBsOldPwd").val() + "&newPwd=" + $("#usrBsNewPwd").val());
        }
    })
    $("#usrbaseRf").click();
})