$(function () {
    MasklayerHide();
    var getstr = "";
    var setstr = "";
    var getarea = "";
    var color = "rgb(255, 0, 0)";
    var colors = "rgb(255,0,0)";
    var clickName = 0;
    var recordSaveMode = 0;
    var freeofsd = 0;
    $("#rcPumpFrameOpt").val(1);
    if ($.browser.msie && $.browser.version.indexOf("9") == -1 && $.browser.version.indexOf("10") == -1) {
        //color = color.replace(/\s/g, "");
    }
    $("#rcplan_enable").change(function () {
        DivBox(1, "#RcplanEnable");
        if (recordSaveMode == 0 || recordSaveMode == 3) {
            DivBox($(this).attr("checked") * 1 == 1, "#rcplanPumptab");
            if (gVar_first.H264FrmRef == -1) {//if is mtk dev(no pump fram),displaynone #rcplanPumptab and 
                $("#rcplanPumptab").css("display", "none");
                $("#record_levtr").css("display", "none");
            } else {//if is not mtk dev
                $("#rcplanPumptab").css("display", "");
                $("#record_levtr").css("display", "none");
            }
	        if((gVar_first.model > 5000 && gVar_first.model < 6000)){
		        $("#rcplanPumptab").css("display", "none");
                $("#record_levtr").css("display", "none");  
	        }
            
        }
        DivBox($(this).attr("checked") * 1 == 1, "#rcplantabl");
        DivBox($(this).attr("checked") * 1 == 1, "#RTAmDiv");
        if ($(this).attr("checked") * 1 == 1) {
            $("#RTAmBox").attr("bEnable", "bEnable");
            if (gVar_first.sdFlag == 1)
                $("#rcPlanNotice2").css("display", "");
        } else {
            $("#RTAmBox").attr("bEnable", "");
            $("#rcPlanNotice2").css("display", "none");
        }
        var levtmp = 0;
        levtmp = $("#record_lev").val();
        $("#rcPumpFrameOpt").change();
        $("#record_lev").val(levtmp);
    })

    $("#rcPumpFrameOpt").change(function () {
        if (recordSaveMode == 0 || recordSaveMode == 3) {  //SD
            if ($("#rcPumpFrameOpt").val() == 1) {
                $("#record_lev").attr("disabled", "");
                for (var i = 1; i <= 5; i++)
                    $("#" + i).css("display", "");

                $("#record_lev").val(4);
            }
            else {
                $("#record_lev").val(0);
                $("#record_lev").attr("disabled", "disabled");
            }
        }
    })
    var strHTML = "";
    for (var i = 0; i < 24; i++) {
        strHTML += "<div style='height:23px;float:left;width:27px; border:1px solid #70c8e6;border-left:none;overflow:hidden;'><div style='height:15px;overflow:hidden;line-height:15px;'>" + (i < 10 ? ('0' + i) : i) + "</div><div style='height:7px;width:27px;'><div  id='RTAmBoxc" + i * 2 + "' style='width:13px;height:7px;float:left;clear:left;border-top:1px solid #70c8e6;border-right:1px solid #70c8e6'></div><div   id='RTAmBoxc" + (i * 2 + 1) + "' style='width:13px;height:7px;float:left;border-top:1px solid #70c8e6;'></div></div></div>";
    }
    $("#RTAmHead").html(strHTML);

    var astyle = "height:23px;float:left;width:55px; border:1px solid #70c8e6;border-bottom:none;overflow:hidden;"

    strHTML = "<div id='RTAmBoxAll' style='" + astyle + "' name=''>" + lg.get("IDS_ALARM_WEEK_ALL") + "</div>";
    strHTML += "<div id='RTAmBoxr1' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_MONDAY") + "</div>";
    strHTML += "<div id='RTAmBoxr2' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_TUESDAY") + "</div>";
    strHTML += "<div id='RTAmBoxr3' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_WEDNESDAY") + "</div>";
    strHTML += "<div id='RTAmBoxr4' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_THURSDAY") + "</div>";
    strHTML += "<div id='RTAmBoxr5' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_FRIDAY") + "</div>";
    strHTML += "<div id='RTAmBoxr6' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_SATURDAY") + "</div>";
    strHTML += "<div id='RTAmBoxr7' style='" + astyle + " border-bottom:1px solid #70c8e6' name=''>" + lg.get("IDS_WEEK_SUNDAY") + "</div>";
    $("#RTAmXq").html(strHTML);


    $("#RTam_DivBox").divBox({ col: 7, height: 23, width: 13, bkColor: color, row: 48, bDownID: "RTAmBox" });

    $("#RTAmBoxAll").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        clickName = 0;
        clickDate = 0;
        if ($("#rcplan_enable").attr("checked") * 1) {
            for (var i = 1; i <= 7; i++) {
                if ($("#RTAmBoxr" + i).attr("name") == "") clickName = clickName + 1;
            }
            if (clickName == 7) {
                $(this).attr("name", "isOk")
                $("div [id^='RTAmBoxr']").attr("name", "isOk");
                $("div [id^='RTAmBoxc']").attr("name", "isOk");
                $("#RTam_DivBox >div").css("background-color", color)
            }
            else if (clickName == 0) {
                $(this).attr("name", "");
                $("div [id^='RTAmBoxr']").attr("name", "");
                $("div [id^='RTAmBoxc']").attr("name", "");
                $("#RTam_DivBox >div").css("background-color", "transparent");
            }
            else {
                if ($(this).attr("name") != "isOk") {
                    $(this).attr("name", "isOk")
                    $("div [id^='RTAmBoxr']").attr("name", "isOk");
                    $("div [id^='RTAmBoxc']").attr("name", "isOk");
                    $("#RTam_DivBox >div").css("background-color", color)
                } else if ($(this).attr("name") == "isOk") {
                    $(this).attr("name", "");
                    $("div [id^='RTAmBoxr']").attr("name", "");
                    $("div [id^='RTAmBoxc']").attr("name", "");
                    $("#RTam_DivBox >div").css("background-color", "transparent");
                }
            }
        }
    })

    $("div [id^='RTAmBoxr']").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        if ($("#rcplan_enable").attr("checked") * 1) {
            var r = $(this).attr("id").split("RTAmBoxr")[1] * 1 - 1;
            if ($(this).attr("name") != "isOk") {
                $(this).attr("name", "isOk")
                $("div[id^='RTAmBox_" + r + "_']").css("background-color", color);
            } else {
                $(this).attr("name", "")
                $("div[id^='RTAmBox_" + r + "_']").css("background-color", "transparent");
            }
        }
    })

    $("div [id^='RTAmBoxc']").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        if ($("#rcplan_enable").attr("checked") * 1) {
            var c = $(this).attr("id").split("RTAmBoxc")[1] * 1;
            if ($(this).attr("name") != "isOk") {
                $(this).attr("name", "isOk");
                $("div[id^='RTAmBox_'][id$='_" + c + "']").css("background-color", color);
            } else {
                $(this).attr("name", "")
                $("div[id^='RTAmBox_'][id$='_" + c + "']").css("background-color", "transparent");
            }
        }
    });

    function SetTimeView(xml) {
        var weekAll = true;
        for (var i = 0; i <= 6; i++) {
            var colorA;
            var sch = $(xml).find("schedule" + i).text() * 1;
            var week;
            if (sch == 281474976710655) {
                week = i + 1;
                $("#RTAmBoxr" + week).attr("name", "isOk");
            }
            else {
                weekAll = false;
            }
            var s = sch.toString(2);
            s = s.split("").reverse().join("");
            for (var j = 0; j < 48; j++) {
                var n = s.charAt(j);
                n = n == "" ? 0 : n;
                $("#RTAmBoxc" + j).attr("value", n);
                if (n == 1) colorA = color;
                else colorA = "transparent"
                $("#RTAmBox_" + i + "_" + j).css("background-color", colorA);
            }
        }
        if (weekAll == true) {
            $("#RTAmBoxAll").attr("name", "isOk")
            $("div [id^='RTAmBoxr']").attr("name", "isOk");
            $("div [id^='RTAmBoxc']").attr("name", "isOk");
        }
    }

    function GetScheduleStreamCall(xml) {
        var rcStream = $(xml).find("chn").text() * 1;
        if (rcStream >= 0 && rcStream <= 1) {
            $("#RcStreamSelect").val(rcStream);
        }
    }

    function GetScheduleRecordCall(xml) {
        var sQual = $(xml).find("recordLevel").text() * 1;
        $("#record_lev").val(sQual);
        var sLoc = $(xml).find("spaceFullMode").text() * 1;
        $("#rcfull_modle").val(sLoc);
        var enaudio = $(xml).find("isEnableAudio").text() * 1;
        $("#rcenableaudio").val(enaudio);
        $("#rcplan_enable").attr("checked", $(xml).find("isEnable").text() * 1);
        SetTimeView(xml);
        setTimeout(function () {
            $("#rcplan_enable").change();
        }, 1);
        bMaskHide = false;
        RfParamCall(GetScheduleStreamCall, "", "getScheduleRecordStreamChn");
    }

    function GetH264FrmRefModeCall(xml) {
        var mode = $(xml).find("mode").text() * 1;
        if (mode == 0 || mode == 1) {
            $("#rcPumpFrameOpt").val(mode);
            if (mode == 1) {
                $("#record_lev").attr("disabled", "");
                for (var i = 1; i <= 5; i++)
                    $("#" + i).css("display", "");
            }
            else {
                $("#record_lev").attr("disabled", "disabled");
                for (var i = 1; i <= 5; i++) {
                    $("#" + i).css("display", "none");
                }
                $("#record_lev").val(0);
            }
        }
        bMaskHide = false;
        RfParamCall(GetScheduleRecordCall, "", "getScheduleRecordConfig");
    }

    function GetRecordPathCall(xml) {
        recordSaveMode = $(xml).find("path").text() * 1;
        freeofsd = $(xml).find("free").text() * 1;
        if (gVar_first.model > 3000 && gVar_first.model < 4000) {
            $("#is30_record").remove();
            $("#is24_record").remove();
        }
        if (recordSaveMode == 65535) {
            DivBox(0, "#RcplanEnable");
            DivBox(0, "#rcplanPumptab");
            DivBox(0, "#rcplantabl");
            DivBox(0, "#RTAmDiv");
			sH("legRcPlan", "IDS_RC_PLAN");
            MasklayerHide();
        } else if (recordSaveMode == 2) {
            //DivBox(1, "#RcplanEnable");
            //DivBox(1, "#rcplanPumptab");
            //DivBox(1, "#rcplantabl");
            //DivBox(1, "#RTAmDiv");
            document.getElementById("legRcPlan").innerHTML = lg.get("IDS_RC_PLAN") + " " + lg.get("IDS_RECORD_PATH_FTP");
            $("#rcplanPumptab").css("display", "none");
            $("#rcenableaudiotr").css("display", "none");
            $("#rcfulltr").css("display", "none");
            $("#record_levtr").css("display", "none");
            bMaskHide = false;
            RfParamCall(GetScheduleRecordCall, "", "getScheduleRecordConfig");
        } else {
            //DivBox(1, "#RcplanEnable");
           // DivBox(1, "#rcplanPumptab");
            //DivBox(1, "#rcplantabl");
            //DivBox(1, "#RTAmDiv");
            document.getElementById("legRcPlan").innerHTML = lg.get("IDS_RC_PLAN") + " " + lg.get("IDS_RECORD_PATH_SD_CARD");
            if (gVar_first.audioFlag == 0) {
                $("#rcenableaudiotr").css("display", "none");
            } else {
                $("#rcenableaudiotr").css("display", "");
            }
            $("#rcfulltr").css("display", "");
            if (gVar_first.H264FrmRef == -1) {//if is mtk dev(no pump fram),displaynone #rcplanPumptab and 
                $("#rcplanPumptab").css("display", "none");
                $("#record_levtr").css("display", "none");
            } else {//if is not mtk dev
                $("#rcplanPumptab").css("display", "");
                $("#record_levtr").css("display", "none");
            }
            if ((gVar_first.model > 5000 && gVar_first.model < 6000)||isModel_6000To7000()) {
                $("#rcplanPumptab").css("display", "none");
                $("#record_levtr").css("display", "none");
            }
            bMaskHide = false;
            RfParamCall(GetH264FrmRefModeCall, "", "getH264FrmRefMode");
        }
    }

    $("#rcplanRf").click(function () {
        $("#RTamtable").css("display", "");
        $("#RThwdtable").css("display", "none");
        $("#rcPlanSave").css("display", "");
        if (gVar_first.sdFlag == 0) {
            $("#rcPlanNotice2").css("display", "none");
        }
        bMaskHide = false;
        RfParamCall(GetRecordPathCall, "", "getRecordPath");
    });
    function HumanAlarmCall(xml){
        if($(xml).find("isEnable").text()*1 == true && $("#AmLink_Man4").attr("checked") * 1 == true){
            if (gVar_first.sdFlag == 1) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_RCPLAN_TIP7"));
            }
        }
    }
    function IOAlarmCall(xml) {
        if ($(xml).find("isEnable").text() * 1 == true) {
            if (gVar_first.sdFlag == 0) {

            }
            else {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_RCPLAN_TIP2"));
            }
        }
        RfParamCall(HumanAlarmCall,"","getHumanDetectConfig");
        
    }

    function MotionAlarmCall(xml) {
        if ($(xml).find("isEnable").text() * 1 == true) {
            if (gVar_first.sdFlag == 1) {
                var linkpak = $(xml).find("linkage").text() * 1;
                if (((linkpak & (0x01 << 3)) >> 3) == true) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_RCPLAN_TIP1"));
                }
            }
        }
        //get IO alarm enable
        bMaskHide = false;
        RfParamCall(IOAlarmCall, "", "getIOAlarmConfig");
    }
    function AudioAlarmCall(xml) {
        if ($(xml).find("isEnable").text() * 1 == true) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_RCPLAN_TIP3"));
        }
        //get motion detect enable
        bMaskHide = false;
        
		if (gVar_first.model > 5000 && gVar_first.model < 6000)
		{
        RfParamCall(MotionAlarmCall, "", "getMotionDetectConfig1");
		}
		else
		{
			 RfParamCall(MotionAlarmCall, "", "getMotionDetectConfig");
		}
    }
    function CheckAlarmRecord() {
        if ($("#rcplan_enable").attr("checked") * 1 == true) {
            //get audio alarm enable
            bMaskHide = false;
            RfParamCall(AudioAlarmCall, "", "getAudioAlarmConfig");
            //SD card not enough free space
            setTimeout(function () {
                if ((recordSaveMode == 0 || recordSaveMode == 3) && (freeofsd < 256 * 1024) && ($("#rcfull_modle").val() != 0)) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_NOSPACE"));
                }
            }, 3000);
        } else {
            MasklayerHide();
        }
    }

    function SaveScheduleStreamCall(xml) {
        if ((recordSaveMode == 0 || recordSaveMode == 3) && gVar_first.H264FrmRef != -1) {
            bMaskHide = false;
            RfParamCall(CheckAlarmRecord, "", "setH264FrmRefMode&mode=" + $("#rcPumpFrameOpt").val());
        } else {
            bMaskHide = false;
            CheckAlarmRecord();
        }
    }

    function SaveScheduleRecordCall(xml) {
        bMaskHide = false;
        RfParamCall(SaveScheduleStreamCall, "", "setScheduleRecordStreamChn&chn=" + $("#RcStreamSelect").val());
    }

    $("#rcPlanSave").click(function () {
        if (recordSaveMode == 65535) {
            return;
        }
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
                colorB = $("#RTAmBox_" + i + "_" + j).css("background-color");
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
        bMaskHide = false;
        RfParamCall(SaveScheduleRecordCall, "", "setScheduleRecordConfig&isEnable=" + $("#rcplan_enable").attr("checked") * 1 + "&recordLevel=" + $("#record_lev").val() + "&spaceFullMode=" + $("#rcfull_modle").val() + "&isEnableAudio=" + $("#rcenableaudio").val() + str);
    });

    $("#TAmMoSX").click(function () {
        $("#Talarm>.config_content").css("display", "");
        $("#TAmMoSX").css("display", "none");
        gDvr.ChangeWndSize(-1);
    });

    $("#rcplanRf").click();
});