$(function () {
    MasklayerHide();
    var getstr = "";
    var setstr = "";
    var getarea = "";
    var color = "rgb(255, 0, 0)";
    var colors = "rgb(255,0,0)";
    var clickName = 0;
    if ($.browser.msie && $.browser.version.indexOf("9") == -1 && $.browser.version.indexOf("10") == -1) {
        //color = color.replace(/\s/g, "");
    }
    $("#TAmIsEnable").change(function () {
        DivBox($(this).attr("checked") * 1 == 1, "#TAlmTabel");
        DivBox($(this).attr("checked") * 1 == 1, "#TAmDiv");
        if ($(this).attr("checked") * 1 == 1) {
            $("#TAmBox").attr("bEnable", "bEnable")
        } else {
            $("#TAmBox").attr("bEnable", "");
        }
    })

    $("#FileNameIsEnable").change(function () {
        DivBox($(this).attr("checked") * 1 == 1, "#FileNameTable");
    })

    var strHTML = "";
    for (var i = 0; i < 24; i++) {
        strHTML += "<div style='height:23px;float:left;width:27px; border:1px solid #70c8e6;border-left:none;overflow:hidden;'><div style='height:15px;overflow:hidden;line-height:15px;'>" + (i < 10 ? ('0' + i) : i) + "</div><div style='height:7px;width:27px;'><div  id='TAmBoxc" + i * 2 + "' style='width:13px;height:7px;float:left;clear:left;border-top:1px solid #70c8e6;border-right:1px solid #70c8e6'></div><div   id='TAmBoxc" + (i * 2 + 1) + "' style='width:13px;height:7px;float:left;border-top:1px solid #70c8e6;'></div></div></div>";
    }
    $("#TAmHead").html(strHTML);

    var astyle = "height:23px;float:left;width:55px; border:1px solid #70c8e6;border-bottom:none;overflow:hidden;"

    strHTML = "<div id='TAmBoxAll' style='" + astyle + "' name=''>" + lg.get("IDS_ALARM_WEEK_ALL") + "</div>";
    strHTML += "<div id='TAmBoxr1' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_MONDAY") + "</div>";
    strHTML += "<div id='TAmBoxr2' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_TUESDAY") + "</div>";
    strHTML += "<div id='TAmBoxr3' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_WEDNESDAY") + "</div>";
    strHTML += "<div id='TAmBoxr4' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_THURSDAY") + "</div>";
    strHTML += "<div id='TAmBoxr5' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_FRIDAY") + "</div>";
    strHTML += "<div id='TAmBoxr6' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_SATURDAY") + "</div>";
    strHTML += "<div id='TAmBoxr7' style='" + astyle + " border-bottom:1px solid #70c8e6' name=''>" + lg.get("IDS_WEEK_SUNDAY") + "</div>";
    $("#TAmXq").html(strHTML);

    $("#Tam_DivBox").divBox({ col: 7, height: 23, width: 13, bkColor: color, row: 48, bDownID: "TAmBox" });

    $("#TAmBoxAll").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        clickName = 0;
        if ($("#TAmIsEnable").attr("checked") * 1) {
            for (var i = 1; i <= 7; i++) {
                if ($("#TAmBoxr" + i).attr("name") == "") clickName = clickName + 1;
            }
            if (clickName == 7) {
                $(this).attr("name", "isOk")
                $("div [id^='TAmBoxr']").attr("name", "isOk");
                $("div [id^='TAmBoxc']").attr("name", "isOk");
                $("#Tam_DivBox >div").css("background-color", color)
            }
            else if (clickName == 0) {
                $(this).attr("name", "");
                $("div [id^='TAmBoxr']").attr("name", "");
                $("div [id^='TAmBoxc']").attr("name", "");
                $("#Tam_DivBox >div").css("background-color", "transparent");
            }
            else {
                if ($(this).attr("name") != "isOk") {
                    $(this).attr("name", "isOk")
                    $("div [id^='TAmBoxr']").attr("name", "isOk");
                    $("div [id^='TAmBoxc']").attr("name", "isOk");
                    $("#Tam_DivBox >div").css("background-color", color)
                } else if ($(this).attr("name") == "isOk") {
                    $(this).attr("name", "");
                    $("div [id^='TAmBoxr']").attr("name", "");
                    $("div [id^='TAmBoxc']").attr("name", "");
                    $("#Tam_DivBox >div").css("background-color", "transparent");
                }
            }
        }
    })

    $("div [id^='TAmBoxr']").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        if ($("#TAmIsEnable").attr("checked") * 1) {
            var r = $(this).attr("id").split("TAmBoxr")[1] * 1 - 1;
            if ($(this).attr("name") != "isOk") {
                $(this).attr("name", "isOk")
                $("div[id^='TAmBox_" + r + "_']").css("background-color", color);
            } else {
                $(this).attr("name", "")
                $("div[id^='TAmBox_" + r + "_']").css("background-color", "transparent");
            }
        }
    })

    $("div [id^='TAmBoxc']").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        if ($("#TAmIsEnable").attr("checked") * 1) {
            var c = $(this).attr("id").split("TAmBoxc")[1] * 1;
            if ($(this).attr("name") != "isOk") {
                $(this).attr("name", "isOk");
                $("div[id^='TAmBox_'][id$='_" + c + "']").css("background-color", color);
            } else {
                $(this).attr("name", "")
                $("div[id^='TAmBox_'][id$='_" + c + "']").css("background-color", "transparent");
            }
        }
    });

    $("#avcapath").change(function () {
        if (isSoftAPMode == 1) {
            if ($(this).val() * 1 == 2 || $(this).val() * 1 == 3) {
                $("#divCapPathSoftTips").css("display", "");
            } else {
                $("#divCapPathSoftTips").css("display", "none");
            }
        } else {
            if ($(this).val() * 1 == 3) {
                $("#divCapPathTips").css("display", "");
            } else {
                $("#divCapPathTips").css("display", "none");
            }
        }
        if ($(this).val() * 1 == 2) {
            $("#setFileName,#FileNameTable").css("display", "");
            setTimeout(function () {
                $("#FileNameIsEnable").change();
            }, 500)
        }
        else {
            $("#setFileName,#FileNameTable").css("display", "none");
        }
    });

    function FileCall(xml) {
        var fileName = $(xml).find("fileName").text();
        $("#FileNameIsEnable").attr("checked", $(xml).find("isEnableSetFilename").text() * 1);
        $("#FileNameInput").val(fileName);
        $("#avcapturRf").attr("disabled", "");
    }

    function Call(xml) {
        var sQual = $(xml).find("snapPicQuality").text() * 1;
        $("#avcaqua").val(sQual);
        var sLoc = $(xml).find("saveLocation").text() * 1;
        $("#avcapath").val(sLoc);
        $("#avcapath").change();
        if (gVar_first.sdFlag == 0) {
            $("#AvCaptSDCard").remove();
            //$("#avcapath").attr("disabled", "disable");
        }
        if (((gVar_first.reserve1 & (0x01)) == 0) || (gVar_first.sdFlag == 0)) {
            $("#AvCapSDAndCloud").remove();
        }
        bMaskHide = false;
        RfParamCall(FileCall, "", "getSnapToFtpFilenameConfig");
    }

    function jhCall(xml) {
        if(gVar_first.model>5000 && gVar_first.model<6000){
            $("#TAmCTime").val($(xml).find("snapInterval").text() * 1);            
        }else{
            $("#TAmCTimeE").val($(xml).find("snapInterval").text() * 1);
        }
        $("#TAmIsEnable").attr("checked", $(xml).find("isEnable").text() * 1);
        SetTimeView(xml);
        setTimeout(function () {
            $("#TAmIsEnable").change();
        }, 1)
        bMaskHide = false;
        RfParamCall(Call, "", "getSnapConfig");
    }

    function SetTimeView(xml) {
        var weekAll = true;
        for (var i = 0; i <= 6; i++) {
            var colorA;
            var sch = $(xml).find("schedule" + i).text() * 1;
            var week;
            if (sch == 281474976710655) {
                week = i + 1;
                $("#TAmBoxr" + week).attr("name", "isOk");
            }
            else {
                weekAll = false;
            }
            var s = sch.toString(2);
            s = s.split("").reverse().join("");
            for (var j = 0; j < 48; j++) {
                var n = s.charAt(j);
                n = n == "" ? 0 : n;
                $("#TAmBoxc" + j).attr("value", n);
                if (n == 1) colorA = color;
                else colorA = "transparent"
                $("#TAmBox_" + i + "_" + j).css("background-color", colorA);
            }
        }
        if (weekAll == true) {
            $("#TAmBoxAll").attr("name", "isOk")
            $("div [id^='TAmBoxr']").attr("name", "isOk");
            $("div [id^='TAmBoxc']").attr("name", "isOk");
        }
    }

    $("#avcapturRf").click(function () {
        if(gVar_first.model>5000 && gVar_first.model<6000){
            $("#isHisi").hide();
            $("#isAmba").show();
        }else{
            $("#isHisi").show();
            $("#isAmba").hide();
        }
        $("#Tamtable").css("display", "");
        $("#Thwdtable").css("display", "none");

        $("#avcapturRf").css("display", "")
        $("#avCaptSave").css("display", "")
        getstr = "getScheduleSnapConfig";
        setstr = "setScheduleSnapConfig";
        //$("#avcapturRf").attr("disabled", "disabled");
        bMaskHide = false;
        RfParamCall(jhCall, "", getstr);
    });

    function SaveFileName(xml) {
        RfParamCall("", "", "setSnapToFtpFilenameConfig&isEnableSetFilename=" + $("#FileNameIsEnable").attr("checked") * 1 + "&fileName=" + $("#FileNameInput").val());
    }

    function SaveScheduleSnapCall(xml) {
        if ($(xml).find("result").text() == 0 && xml != null) {
            RfParamCall(SaveFileName, "", "setSnapConfig&snapQuality=" + $("#avcaqua").val() + "&saveLocation=" + $("#avcapath").val());
        }
    }

    $("#avCaptSave").click(function () {
        var colorB = "";
        var sch = new Array(7);
        sch[0] = 0;
        sch[1] = 0;
        sch[2] = 0;
        sch[3] = 0;
        sch[4] = 0;
        sch[5] = 0;
        sch[6] = 0;
        for (var i = 0; i <= 6; i++) {
            var s = "";
            for (var j = 0; j < 48; j++) {
                var n;
                colorB = $("#TAmBox_" + i + "_" + j).css("background-color");
                if (colorB == color || colorB == colors)
                    n = "1";
                else
                    n = "0";
                s += n;
            }
            s = s.split("").reverse().join("");
            sch[i] = parseInt(s, 2);
        }
        var str = "&schedule0=" + sch[0] + "&schedule1=" + sch[1] + "&schedule2=" + sch[2] + "&schedule3=" + sch[3] + "&schedule4=" + sch[4] + "&schedule5=" + sch[5] + "&schedule6=" + sch[6];
        var linkkag = $("#TAmLink1").attr("checked") * 1 + ($("#TAmLink2").attr("checked") * 1 << 1) + ($("#TAmLink3").attr("checked") * 1 << 2) + ($("#TAmLink4").attr("checked") * 1 << 3);

        if ($("#avcapath").val() == 2 && $("#FileNameIsEnable").attr("checked") * 1 == 1) {
            var fileName = $("#FileNameInput").val();
            //check not null
            if (fileName == "") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_WNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_NET_NOTNULL").toLowerCase());
                $("#FileNameInput").focus();
                return;
            }
            //check format
            var file = fileName.substring(0, 1);
            if (!FileNameReg(fileName) || file == ".") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_WNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
                $("#FileNameInput").focus();
                return;
            }
            //check length
            if (!IsLimitLength(fileName, 30)) {
                if (gVar_first.N_language != 2)
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS") + " " + lg.get("IDS_CHARACTER_NOTICE"));
                else
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS"));

                $("#FileNameInput").focus();
                return;
            }
        }

        if (setstr == "setScheduleSnapConfig") {
            if ($("#TAmIsEnable").attr("checked") * 1 == 1) {
                
                if(gVar_first.model>5000 && gVar_first.model<6000){
                         if ($("#TAmCTime").val() > 0 && $("#TAmCTime").val() < 65536) {
                            RfParamCall(SaveScheduleSnapCall, "", setstr + "&isEnable=" + $("#TAmIsEnable").attr("checked") * 1 + "&snapInterval=" + $("#TAmCTime").val() + str);
                        }
                        else if ($("#TAmCTime").val() == "") {
    					ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_ALARM_TIME") +(gVar.lg=="CHS"||gVar.lg=="CHT"?"":" ")+ lg.get("IDS_NET_NOTNULL"));
                         }
                        else {
                          ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NUMBER_NFIT"))
                         }
                }else{

                    if ($("#TAmCTimeE").val() > 0 && $("#TAmCTimeE").val() < 65536) {
                            RfParamCall(SaveScheduleSnapCall, "", setstr + "&isEnable=" + $("#TAmIsEnable").attr("checked") * 1 + "&snapInterval=" + $("#TAmCTimeE").val() + str);
                        }
                        else if ($("#TAmCTimeE").val() == "") {
                            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_ALARM_TIME") + lg.get("IDS_NET_NOTNULL"));
                        }
                        else {
                            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NUMBER_NFIT"))
                        }
                }
            }
            else {
                if(gVar_first.model>5000 && gVar_first.model<6000){
                    RfParamCall(SaveScheduleSnapCall, "", setstr + "&isEnable=" + $("#TAmIsEnable").attr("checked") * 1 + "&snapInterval=" + $("#TAmCTime").val() + str);
                }else{   
                    RfParamCall(SaveScheduleSnapCall, "", setstr + "&isEnable=" + $("#TAmIsEnable").attr("checked") * 1 + "&snapInterval=" + $("#TAmCTimeE").val() + str);
                }
            }

        }
    });

    $("#TAmMoSX").click(function () {
        $("#Talarm>.config_content").css("display", "");
        $("#TAmMoSX").css("display", "none");
        gDvr.ChangeWndSize(-1);
    });

    $("#avcapturRf").click();
});