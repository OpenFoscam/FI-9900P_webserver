$(function () {
    MasklayerHide();
    for (var tm = 1; tm <= 3; tm++) {
        for (var tm1 = 0; tm1 < 24; tm1++) {
            $("#ASS" + tm + "_SHour").append('<option value="' + tm1 + '">' + (("" + tm1).length < 2 ? "0" + tm1 : tm1) + '</option>');
        }
        for (var tm2 = 0; tm2 < 60; tm2++) {
            $("#ASS" + tm + "_SMinute").append('<option value="' + tm2 + '">' + (("" + tm2).length < 2 ? "0" + tm2 : tm2) + '</option>');
        }
        for (var tm3 = 0; tm3 < 24; tm3++) {
            $("#ASS" + tm + "_EHour").append('<option value="' + tm3 + '">' + (("" + tm3).length < 2 ? "0" + tm3 : tm3) + '</option>');
        }
        for (var tm4 = 0; tm4 < 60; tm4++) {
            $("#ASS" + tm + "_EMinute").append('<option value="' + tm4 + '">' + (("" + tm4).length < 2 ? "0" + tm4 : tm4) + '</option>');
        }
    }

    $("#ASS_Add").attr("title", lg.get("IDS_BTN_ADD_BSS"));

    function SILCCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            var j = 0;
            var startHour = 0;
            var startMin = 0;
            var endHour = 0;
            var endMin = 0;
            for (var ii = 2; ii <= 4; ii++) {
                $("#AvHSS_" + ii).css("display", "none");
            }

            for (var index = 0; index < 3; index++) {
                startHour = $(xml).find("startHour" + index).text() * 1;
                startMin = $(xml).find("startMin" + index).text() * 1;
                endHour = $(xml).find("endHour" + index).text() * 1;
                endMin = $(xml).find("endMin" + index).text() * 1;

                if (startHour == endHour && startMin == endMin/* == 0*/) {
                    $("#ASS" + (index + 1) + "_SHour").val(0);
                    $("#ASS" + (index + 1) + "_SMinute").val(0);
                    $("#ASS" + (index + 1) + "_EHour").val(0);
                    $("#ASS" + (index + 1) + "_EMinute").val(0);
                    continue;
                }

                j++;
                $("#AvHSS_" + j).css("display", "");
                $("#ASS" + j + "_SHour").val(startHour);
                $("#ASS" + j + "_SMinute").val(startMin);
                $("#ASS" + j + "_EHour").val(endHour);
                $("#ASS" + j + "_EMinute").val(endMin);
            }

            var count = j;
            while (++count <= 3 && count > 1) {
                $("#AvHSS_" + count).css("display", "none");
            }

            if (j == 3) {
                $("#ASS_Add").css("display", "none");
            }
            else {
                $("#ASS_Add").css("display", "");
            }
        }
    }

    $("#ASS_Add").click(function () {
        var nums = 0;
        for (nums = 1; nums <= 3; nums++) {
            if ($("#AvHSS_" + nums).css("display") == "none") {
                $("#AvHSS_" + nums).css("display", "");
                $("#ASS" + nums + "_SHour").val(0);
                $("#ASS" + nums + "_SMinute").val(0);
                $("#ASS" + nums + "_EHour").val(0);
                $("#ASS" + nums + "_EMinute").val(0);
                break;
            }
        }
        if (nums >= 3) {
            $("#ASS_Add").css("display", "none");
        }
    });

    $("#ASS_Sub2").click(function () {
        $("#AvHSS_2").css("display", "none");
        $("#ASS2_SHour").val(0);
        $("#ASS2_SMinute").val(0);
        $("#ASS2_EHour").val(0);
        $("#ASS2_EMinute").val(0);
        $("#ASS_Add").css("display", "");
    })

    $("#ASS_Sub3").click(function () {
        $("#AvHSS_3").css("display", "none");
        $("#ASS3_SHour").val(0);
        $("#ASS3_SMinute").val(0);
        $("#ASS3_EHour").val(0);
        $("#ASS3_EMinute").val(0);
        $("#ASS_Add").css("display", "");
    })

    $("#avirledRf").click(function () {
        MasklayerHide();
        RfParamCall(SILCCall, "", "getScheduleInfraLedConfig");
    });

    $("#avirledSave").click(function () {
        var timeArray_S = new Array();
        var timeArray_E = new Array();
        var isAllNull = true;
        var startT = 0;
        var endT = 0;
        var timeStr = "";
        var disASS_1 = false;
        var disASS_2 = false;
        var disASS_3 = false;
        for (var index = 0; index < 3; index++) {
            startT = ($("#ASS" + (index + 1) + "_SHour").val() | 0) * 60 + ($("#ASS" + (index + 1) + "_SMinute").val() | 0);
            endT = ($("#ASS" + (index + 1) + "_EHour").val() | 0) * 60 + ($("#ASS" + (index + 1) + "_EMinute").val() | 0);
            timeStr = timeStr + "&startHour" + index + "=" + $("#ASS" + (index + 1) + "_SHour").val() * 1 + "&startMin" + index + "=" + $("#ASS" + (index + 1) + "_SMinute").val() * 1;
            timeStr = timeStr + "&endHour" + index + "=" + $("#ASS" + (index + 1) + "_EHour").val() * 1 + "&endMin" + index + "=" + $("#ASS" + (index + 1) + "_EMinute").val() * 1;
            timeArray_S.push(startT);
            timeArray_E.push(endT)
            isAllNull = false;
        }
        if ($("#AvHSS_1").css("display") == "block") disASS_1 = true;
        if ($("#AvHSS_2").css("display") == "block") disASS_2 = true;
        if ($("#AvHSS_3").css("display") == "block") disASS_3 = true;
        //Schedule is null
        if (isAllNull == true) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BSS_TERROR_NULL"));
            $("#ASS1_EMinute").focus();
            return;
        }
        for (var i = 0; i < timeArray_S.length; i++) {
            //the end time earlier the start time
            if ($("#AvHSS_" + (i + 1)).css("display") == "block" && timeArray_S[i] * 1 >= timeArray_E[i] * 1) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BSS_TFORMAT_ERROR" + (i + 1)));
                $("#ASS" + (i + 1) + "_EMinute").focus();
                return;
            }
        }
        //Schedule overlapped
        if (disASS_1 == true && disASS_2 == true) {
            if (chkSecIsAcross2(timeArray_S[0], timeArray_E[0], timeArray_S[1], timeArray_E[1])) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BSS_TERROR"));
                $("#ASS2_EMinute").focus();
                return;
            }
        }
        if (disASS_1 == true && disASS_3 == true) {
            if (chkSecIsAcross2(timeArray_S[0], timeArray_E[0], timeArray_S[2], timeArray_E[2])) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BSS_TERROR"));
                $("#ASS2_EMinute").focus();
                return;
            }
        }
        if (disASS_1 == true && disASS_2 == true && disASS_3 == true) {
            if (chkSecIsAcross3(timeArray_S[0], timeArray_E[0], timeArray_S[1], timeArray_E[1], timeArray_S[2], timeArray_E[2])) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BSS_TERROR"));
                $("#ASS3_EMinute").focus();
                return;
            }
        }

        RfParamCall(null, "", "setScheduleInfraLedConfig" + timeStr);
    });
    $("#avirledRf").click();
});