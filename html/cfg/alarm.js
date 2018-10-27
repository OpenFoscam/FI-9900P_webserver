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
    $("#AmIsEnable").change(function () {
        DivBox($(this).attr("checked") * 1 == 1, "#AlmTabel");
        DivBox($(this).attr("checked") * 1 == 1, "#AmDiv");
        DivBox($(this).attr("checked") * 1 == 1, "#Table2");
        
        if ($(this).attr("checked") * 1 == 1) {
            $("#AmBox").attr("bEnable", "bEnable");
            $("#AmZC").attr("disabled", "");
            $("#AmLink1").attr("disabled", "");
            if (isSoftAPMode == 1) {
                $("#AmLink2").attr("disabled", "disabled");
                $("#AmLink8").attr("disabled", "disabled");
            } else {
                $("#AmLink2").attr("disabled", "");
                $("#AmLink8").attr("disabled", "");
            }
            $("#AmLink3").attr("disabled", "");
            $("#AmLink4").attr("disabled", "");
            $("#AmLink5").attr("disabled", "");
            $("#AmClearIO").attr("disabled", "");
            $("#chkAlarmPCSound").attr("disabled", "");
        } else {
            $("#AmBox").attr("bEnable", "");
            $("#AmZC").attr("disabled", "disabled");
            $("#AmLink1").attr("disabled", "disabled");
            $("#AmLink2").attr("disabled", "disabled");
            $("#AmLink3").attr("disabled", "disabled");
            $("#AmLink4").attr("disabled", "disabled");
            $("#AmLink5").attr("disabled", "disabled");
            $("#AmClearIO").attr("disabled", "disabled");
            $("#chkAlarmPCSound").attr("disabled", "disabled");
        }
        $("#AmMotionS").change();
        $("#AmHumanS").change();
    })

    $("#AmTemperature_sel_DanWei").change(function () {
        if ($("#AmTemperature_sel_DanWei").val() * 1 == 1) {
            $("#rcTempTips").css("display", "");
            $("#rcTempTips_F").css("display", "none");
            $("#rcTempTips_H").css("display", "none");
        }
        else if ($("#AmTemperature_sel_DanWei").val() * 1 == 2) {
            $("#rcTempTips").css("display", "none");
            $("#rcTempTips_F").css("display", "");
            $("#rcTempTips_H").css("display", "none");
        }

    })

    var strHTML = "";
    for (var i = 0; i < 24; i++) {
        strHTML += "<div style='height:23px;float:left;width:27px; border:1px solid #70c8e6;border-left:none;overflow:hidden;'><div style='height:15px;overflow:hidden;line-height:15px;'>" + (i < 10 ? ('0' + i) : i) + "</div><div style='height:7px;width:27px;'><div  id='AmBoxc" + i * 2 + "' style='width:13px;height:7px;float:left;clear:left;border-top:1px solid #70c8e6;border-right:1px solid #70c8e6'></div><div   id='AmBoxc" + (i * 2 + 1) + "' style='width:13px;height:7px;float:left;border-top:1px solid #70c8e6;'></div></div></div>";
    }
    $("#AmHead").html(strHTML);

    var astyle = "height:23px;float:left;width:55px; border:1px solid #70c8e6;border-bottom:none;overflow:hidden;"

    strHTML = "<div id='AmBoxAll' style='" + astyle + "' name=''>" + lg.get("IDS_ALARM_WEEK_ALL") + "</div>";
    strHTML += "<div id='AmBoxr1' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_MONDAY") + "</div>";
    strHTML += "<div id='AmBoxr2' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_TUESDAY") + "</div>";
    strHTML += "<div id='AmBoxr3' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_WEDNESDAY") + "</div>";
    strHTML += "<div id='AmBoxr4' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_THURSDAY") + "</div>";
    strHTML += "<div id='AmBoxr5' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_FRIDAY") + "</div>";
    strHTML += "<div id='AmBoxr6' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_SATURDAY") + "</div>";
    strHTML += "<div id='AmBoxr7' style='" + astyle + " border-bottom:1px solid #70c8e6' name=''>" + lg.get("IDS_WEEK_SUNDAY") + "</div>";
    $("#AmXq").html(strHTML);


    $("#am_DivBox").divBox({ col: 7, height: 23, width: 13, bkColor: color, row: 48, bDownID: "AmBox" });

    $("#AmBoxAll").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        clickName = 0;
        if ($("#AmIsEnable").attr("checked") * 1) {
            for (var i = 1; i <= 7; i++) {
                if ($("#AmBoxr" + i).attr("name") == "") clickName = clickName + 1;
            }
            if (clickName == 7) {
                $(this).attr("name", "isOk")
                $("div [id^='AmBoxr']").attr("name", "isOk");
                $("div [id^='AmBoxc']").attr("name", "isOk");
                $("#am_DivBox >div").css("background-color", color)
            }
            else if (clickName == 0) {
                $(this).attr("name", "");
                $("div [id^='AmBoxr']").attr("name", "");
                $("div [id^='AmBoxc']").attr("name", "");
                $("#am_DivBox >div").css("background-color", "transparent");
            }
            else {
                if ($(this).attr("name") != "isOk") {
                    $(this).attr("name", "isOk")
                    $("div [id^='AmBoxr']").attr("name", "isOk");
                    $("div [id^='AmBoxc']").attr("name", "isOk");
                    $("#am_DivBox >div").css("background-color", color)
                } else if ($(this).attr("name") == "isOk") {
                    $(this).attr("name", "");
                    $("div [id^='AmBoxr']").attr("name", "");
                    $("div [id^='AmBoxc']").attr("name", "");
                    $("#am_DivBox >div").css("background-color", "transparent");
                }
            }
        }
    })

    $("div [id^='AmBoxr']").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        if ($("#AmIsEnable").attr("checked") * 1) {
            var r = $(this).attr("id").split("AmBoxr")[1] * 1 - 1;
            if ($(this).attr("name") != "isOk") {
                $(this).attr("name", "isOk")
                $("div[id^='AmBox_" + r + "_']").css("background-color", color);
            } else {
                $(this).attr("name", "")
                $("div[id^='AmBox_" + r + "_']").css("background-color", "transparent");
            }
        }
    })

    $("div [id^='AmBoxc']").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        if ($("#AmIsEnable").attr("checked") * 1) {
            var c = $(this).attr("id").split("AmBoxc")[1] * 1;
            if ($(this).attr("name") != "isOk") {
                $(this).attr("name", "isOk");
                $("div[id^='AmBox_'][id$='_" + c + "']").css("background-color", color);
            } else {
                $(this).attr("name", "")
                $("div[id^='AmBox_'][id$='_" + c + "']").css("background-color", "transparent");
            }
        }
    });
    function jhCall(xml) {
        $("#AmIsEnable").attr("checked", $(xml).find("isEnable").text() * 1);
        SetTimeView(xml);
        setTimeout(function () {
            $("#AmIsEnable").change();
        }, 1)
    }

    function Call2(xml) {
        var isOpenPCSoundAlarm = $(xml).find("isEnablePCAudioAlarm").text() * 1;
        //pcalarm type:mv io sud tmp    
        $("#chkAlarmPCSound_tmpalarm").attr("checked", (isOpenPCSoundAlarm & (0x01 << 3)) >> 3);
        $("#chkAlarmPCSound_ioalarm").attr("checked", (isOpenPCSoundAlarm & (0x01 << 2)) >> 2);
        $("#chkAlarmPCSound_sudalarm").attr("checked", (isOpenPCSoundAlarm & (0x01 << 1)) >> 1);
        $("#chkAlarmPCSound").attr("checked", (isOpenPCSoundAlarm & 0x01));
        $("#chkAlarmPCSound_humalarm").attr("checked", (isOpenPCSoundAlarm & (0x01 << 4)) >> 4);
    }

    function Call(xml) {
        $("#AmCTime").val($(xml).find("snapInterval").text() * 1);
        var linkpak = $(xml).find("linkage").text() * 1;
        $("#AmTemperature_sel_DanWei").val((linkpak >> 10) + 1);
        $("#AmLink8").attr("checked", (linkpak & (0x01 << 7)) >> 7);
        //$("#AmLink7").attr("checked", (linkpak & (0x01 << 6)) >> 6);   //alarm record save to cloud
        //$("#AmLink6").attr("checked", (linkpak & (0x01 << 5)) >> 5);   //alarm snap picture save to cloud
        $("#AmLink5").attr("checked", (linkpak & (0x01 << 4)) >> 4);
        $("#AmLink4").attr("checked", (linkpak & (0x01 << 3)) >> 3);
        $("#AmLink3").attr("checked", (linkpak & (0x01 << 2)) >> 2);
        $("#AmLink2").attr("checked", (linkpak & (0x01 << 1)) >> 1);
        $("#AmLink1").attr("checked", (linkpak & 0x01));

        var AmSens = $(xml).find("sensitivity").text() * 1;
        $("#AmSensit").val(AmSens);

        //活动侦测
        var AmMontions = $(xml).find("isMovAlarmEnable").text() * 1;
        $("#AmMotionS").val(AmMontions);

        var AmHumans = $(xml).find("isPirAlarmEnable").text() * 1;
        $("#AmHumanS").val(AmHumans);

        if (AmMontions == 0 && AmHumans == 1) {
            $("#AmSensit").attr("disabled", "disabled");
            //$("#Amtrigger").attr("disabled", "disabled");
        }
        else {
            $("#AmSensit").attr("disabled", "");
            //$("#Amtrigger").attr("disabled", "");
        }

        var Amtrigger = $(xml).find("triggerInterval").text() * 1;
        
        Amtrigger = Amtrigger > 10 ? 10 : Amtrigger;     
        $("#Amtrigger").val(Amtrigger);
        $("#AmIsEnable").attr("checked", $(xml).find("isEnable").text() * 1)
        if (lanPage == "alarm_mv" || lanPage == "alarm_motion") {
            if (gVar_first.model > 5000 && gVar_first.model < 6000) {
                var ambaMotion = "";
                for (var i = 1; i <= 3; i++) {
                    ambaMotion += $(xml).find("x" + i).text() * 1 + ",";
                    ambaMotion += $(xml).find("y" + i).text() * 1 + ",";
                    ambaMotion += $(xml).find("width" + i).text() * 1 + ",";
                    ambaMotion += $(xml).find("height" + i).text() * 1 + ",";
                    $("#selMotion" + i).text($(xml).find("threshold" + i).text() * 1);
                    $("#rfbtr_" + i).css("margin-left", $(xml).find("threshold" + i).text() * 1);
                    $("#selQue" + i).val($(xml).find("sensitivity" + i).text() * 1);
                    $("#MotionEnable" + i).attr("checked", $(xml).find("valid" + i).text() * 1);
                }
                 
				 gDvr.ChangeWndSize(3, 4, 1);
               gDvr.SetMotionArea(ambaMotion);
				 
				 
				 
				 
				 
            } else {
                var motionarea = "";
                if (gVar_first.motionAreaRows == 0) {//if is a dev not support .motionAreaRows,default turn to 10;
                    gVar_first.motionAreaRows = 10;
                }

                for (var i = 0; i < gVar_first.motionAreaRows; i++) {
                    var moarea = $(xml).find("area" + i).text() * 1;
                    motionarea += (moarea + ",");
                }
                ShowArlarmArea(motionarea);
                for (var i = gVar_first.motionAreaRows; i < 20; i++) {
                    motionarea += "0,";
                }
                gDvr.SetMotionArea(motionarea);
            }
        }
        if (lanPage == "alarm_io") {
            $("#AmEleLevelS").val($(xml).find("alarmLevel").text() * 1);
        }
        if (lanPage == "alarm_temperature") {
            $("#AmTemperatureTop").val($(xml).find("topLimit").text() * 1);
            $("#AmTemperatureLow").val($(xml).find("lowerLimit").text() * 1);
            $("#rcTempTips_H").css("display", "none");
            if (($("#AmTemperature_sel_DanWei").val() * 1 == 1)) {
                $("#rcTempTips").css("display", "");
                $("#rcTempTips_F").css("display", "none");
            }
            else {
                $("#rcTempTips").css("display", "none");
                $("#rcTempTips_F").css("display", "");
            }
        }
        if (lanPage == "alarm_humidity") {
            // refresh
            $("#AmHumidityLow").keyup(function () {
                var obj = $("#AmHumidityLow").val();
                if (obj.length > 1) {
                    if (obj == "100" || obj[0] == "0") {
                        $("#AmHumidityLow").focus();
                        $("#AmHumidityLow").val("")
                    }
                }
            });
            $("#AmHumidityHigh").keyup(function () {
                var obj = $("#AmHumidityHigh").val();
                if (obj.length > 1) {
                    if (obj[0] == "0") {
                        $("#AmHumidityHigh").focus();
                        $("#AmHumidityHigh").val("")
                    }
                }
            });

            $("#AmHumidityLow").val($(xml).find("lowerLimit").text() * 1);
            $("#AmHumidityHigh").val($(xml).find("topLimit").text() * 1);
        }

        SetTimeView(xml);
        setTimeout(function () {
            $("#AmIsEnable").change();
            $("#AmMotionS").change();
            $("#AmHumanS").change();
        }, 1)
        bMaskHide = false;
        RfParamCall(Call2, "", "getPCAudioAlarmCfg");
    }

    function SetTimeView(xml) {
        var weekAll = true;
        for (var i = 0; i <= 6; i++) {
            var colorA;
            var sch = $(xml).find("schedule" + i).text() * 1;
            var week;
            if (sch == 281474976710655) {
                week = i + 1;
                $("#AmBoxr" + week).attr("name", "isOk");
            }
            else {
                weekAll = false;
            }
            var s = sch.toString(2); //十进制转换为二进制
            s = s.split("").reverse().join(""); //二进制倒序
            for (var j = 0; j < 48; j++) {
                var n = s.charAt(j); //第j位数据
                n = n == "" ? 0 : n;
                $("#AmBoxc" + j).attr("value", n);
                if (n == 1) colorA = color;
                else colorA = "transparent"
                $("#AmBox_" + i + "_" + j).css("background-color", colorA);
            }
        }
        if (weekAll == true) {
            $("#AmBoxAll").attr("name", "isOk")
            $("div [id^='AmBoxr']").attr("name", "isOk");
            $("div [id^='AmBoxc']").attr("name", "isOk");
        }
    }

    $("#alarmRf").click(function () {
        if (gVar_first.model > 5000 && gVar_first.model < 6000) {
            $("#AmzcMotionText").css("display", "");
           if(!IsChromeSupportNacl()){
            gDvr.obj[0].SetMotionType(1);  //安霸设备
           }  
            //UI.Clor("rfdiv_1", "rfbtr_1", "rfdir_1", 0, function ($o, v) { $("#selMotion1").attr("innerHTML", v | 0); });
            //UI.Clor("rfdiv_2", "rfbtr_2", "rfdir_2", 0, function ($o, v) { $("#selMotion2").attr("innerHTML", v | 0); });
            //UI.Clor("rfdiv_3", "rfbtr_3", "rfdir_3", 0, function ($o, v) { $("#selMotion3").attr("innerHTML", v | 0); });
        }
        $("#btnDelMotionRect").css("display", "none");

        $("#AmTemperature_sel_DanWei").change();

        $("#AmMoSX").css("display", "none");
        $("#AmMoSXOut").css("display", "none");
        $("#alarm>.config_content").css("display", "");
        $("#AmMoSX").click();
        lan(lanPage);
        if (lanPage == "alarm_sud") { //8421: 2
            //show sud things and hide other
            $("#divAlarmPCSound").css("display", "none");
            $("#chkAlarmPCSound").css("display", "none");
            $("#divAlarmPCSound_ioalarm").css("display", "none");
            $("#chkAlarmPCSound_ioalarm").css("display", "none");
            $("#divAlarmPCSound_sudalarm").css("display", "");
            $("#chkAlarmPCSound_sudalarm").css("display", "");
            $("#divAlarmPCSound_tmpalarm").css("display", "none");
            $("#chkAlarmPCSound_tmpalarm").css("display", "none");

            $("#divAlarmPCSound_humalarm").css("display", "none");
            $("#chkAlarmPCSound_humalarm").css("display", "none");
            //end show sud things
            $("#Amcdlev").css("display", "none");
            $("#amtable").css("display", "");
            $("#AlmTabel").css("display", "");
            $("#Amsen").css("display", "");
            $("#Amzcbut").css("display", "none");
            $("#hwdtable").css("display", "none");
            $("#AmMoSX").css("display", "none");
            $("#AmMoSXOut").css("display", "none");
            $("#alarmRf").css("display", "");
            $("#AlarmSave").css("display", "");
            $("#ambjls").css("display", "");
            $("#AmEleLevel").css("display", "none");
            $("#AmTemperature1").css("display", "none");
            $("#AmHumidity").css("display", "none");
            $("#rcTempTips").css("display", "none");
            $("#rcTempTips_F").css("display", "none");
            $("#rcTempTips_H").css("display", "none");
            $("#AmMotion").css("display", "none")
            $("#AmHuman").css("display", "none");
            $("#AmIOOutputTR").css("display", "none");
            if (gVar_first.sdFlag == 0) {
                $("#rcAlarmNotice").css("display", "none")
            }
            getstr = "getAudioAlarmConfig";
            setstr = "setAudioAlarmConfig";
            bMaskHide = false;
            RfParamCall(Call, "", getstr);
        }
        else if (lanPage == "alarm_mv" || lanPage == "alarm_motion") {//8421: 1
            $("#divAlarmPCSound").css("display", "");
            $("#chkAlarmPCSound").css("display", "");
            $("#divAlarmPCSound_ioalarm").css("display", "none");
            $("#chkAlarmPCSound_ioalarm").css("display", "none");
            $("#divAlarmPCSound_sudalarm").css("display", "none");
            $("#chkAlarmPCSound_sudalarm").css("display", "none");
            $("#divAlarmPCSound_tmpalarm").css("display", "none");
            $("#chkAlarmPCSound_tmpalarm").css("display", "none");

            $("#divAlarmPCSound_humalarm").css("display", "none");
            $("#chkAlarmPCSound_humalarm").css("display", "none");
            //end show mv things
            $("#Amcdlev").css("display", "none");
            $("#amtable").css("display", "");
            $("#AlmTabel").css("display", "");
            $("#Amsen").css("display", "");
            // if (IsChromeSupportNacl()) {
            //     $("#Amzcbut").css("display", "none");
            // }else{
                $("#Amzcbut").css("display", "");
            // }
            
            $("#hwdtable").css("display", "none");
            $("#ambjls").css("display", "");
            $("#AmEleLevel").css("display", "none");
            $("#AmTemperature1").css("display", "none");
            $("#AmHumidity").css("display", "none");
            $("#rcTempTips").css("display", "none");
            $("#rcTempTips_F").css("display", "none");
            $("#rcTempTips_H").css("display", "none");
            $("#AmIOOutputTR").css("display", "none");
            if (gVar_first.sdFlag == 0) {
                $("#rcAlarmNotice").css("display", "none")
            }
            if ((gVar_first.reserve2 >> 4 & 0x01) == 0) {
                $("#AmMotion").css("display", "none");
                $("#AmHuman").css("display", "none");
            }
            else {
                //$("#AmMotion").css("display", "")
                //$("#AmHuman").css("display", "")
                //$("#PirMotionAlarm").css("display", "");
                $("#AmMotionAlarm").css("display", "none");
            }
            if (gVar_first.model > 5000 && gVar_first.model < 6000) {
                //if ((gVar_first.reserve2 >> 4 & 0x01) == 1) {
                    $("#Amsen").css("display", "none");
                //}
                getstr = "getMotionDetectConfig1";
                setstr = "setMotionDetectConfig1";
                bMaskHide = false;
                RfParamCall(Call, "", getstr);
            } else {
                getstr = "getMotionDetectConfig";
                setstr = "setMotionDetectConfig";
                bMaskHide = false;
                RfParamCall(Call, "", getstr);
            }

        }
        else if (lanPage == "rc_jh") {
            $("#amtable").css("display", "");
            $("#hwdtable").css("display", "none");
            $("#AlmTabel").css("display", "none");
            $("#AmMoSX").css("display", "none");
            $("#AmMoSXOut").css("display", "none");
            $("#alarmRf").css("display", "");
            $("#AlarmSave").css("display", "");
            $("#AmEleLevel").css("display", "none");
            $("#AmTemperature1").css("display", "none");
            $("#AmHumidity").css("display", "none");
            $("#rcTempTips").css("display", "none");
            $("#rcTempTips_F").css("display", "none");
            $("#rcTempTips_H").css("display", "none");
            getstr = "getScheduleRecordConfig";
            setstr = "setScheduleRecordConfig";
            RfParamCall(jhCall, "", getstr);
        }
        else if (lanPage == "alarm_io") { //8421: 4
            //show ioalarm things and hide other
            $("#divAlarmPCSound").css("display", "none");
            $("#chkAlarmPCSound").css("display", "none");
            $("#divAlarmPCSound_ioalarm").css("display", "");
            $("#chkAlarmPCSound_ioalarm").css("display", "");
            $("#divAlarmPCSound_sudalarm").css("display", "none");
            $("#chkAlarmPCSound_sudalarm").css("display", "none");
            $("#divAlarmPCSound_tmpalarm").css("display", "none");
            $("#chkAlarmPCSound_tmpalarm").css("display", "none");

            $("#divAlarmPCSound_humalarm").css("display", "none");
            $("#chkAlarmPCSound_humalarm").css("display", "none");
            //end show ioalarm things

            $("#Amcdlev").css("display", "none");   //无
            $("#amtable").css("display", "");    //开关
            $("#AlmTabel").css("display", "");    //table
            $("#Amsen").css("display", "none");    //灵敏度
            $("#Amzcbut").css("display", "none");   //选择移动侦测按钮
            $("#hwdtable").css("display", "none");  //无
            $("#AmMoSX").css("display", "none");   //移动侦测返回
            $("#AmMoSXOut").css("display", "none");
            $("#alarmRf").css("display", "");    //刷新
            $("#AlarmSave").css("display", "");   //保存
            $("#ambjls").css("display", "");   //报警铃声
            $("#AmEleLevel").css("display", "");  //电平
            $("#AmTemperature1").css("display", "none");     //温度区间
            $("#AmHumidity").css("display", "none");
            $("#rcTempTips").css("display", "none");
            $("#rcTempTips_F").css("display", "none");
            $("#AmMotion").css("display", "none")
            $("#rcTempTips_H").css("display", "none");
            $("#AmHuman").css("display", "none");
            $("#AmIOOutputTR").css("display", "");
            if (gVar_first.sdFlag == 0) {
                $("#rcAlarmNotice").css("display", "none")
            }
            getstr = "getIOAlarmConfig";
            setstr = "setIOAlarmConfig";
            bMaskHide = false;
            RfParamCall(Call, "", getstr);
        }
        else if (lanPage == "alarm_temperature") {//8421: 8
            //show tmpalarm things and hide other
            $("#divAlarmPCSound").css("display", "none");
            $("#chkAlarmPCSound").css("display", "none");
            $("#divAlarmPCSound_ioalarm").css("display", "none");
            $("#chkAlarmPCSound_ioalarm").css("display", "none");
            $("#divAlarmPCSound_sudalarm").css("display", "none");
            $("#chkAlarmPCSound_sudalarm").css("display", "none");
            $("#divAlarmPCSound_tmpalarm").css("display", "");
            $("#chkAlarmPCSound_tmpalarm").css("display", "");

            $("#divAlarmPCSound_humalarm").css("display", "none");
            $("#chkAlarmPCSound_humalarm").css("display", "none");
            //end show tmpalarm things

            $("#Amcdlev").css("display", "none");   //无
            $("#amtable").css("display", "");    //开关
            $("#AlmTabel").css("display", "");    //table
            $("#Amsen").css("display", "none");    //灵敏度
            $("#Amzcbut").css("display", "none");   //选择移动侦测按钮
            $("#hwdtable").css("display", "none");  //无
            $("#AmMoSXOut").css("display", "none");   //移动侦测返回
            $("#alarmRf").css("display", "");    //刷新
            $("#AlarmSave").css("display", "");   //保存
            $("#ambjls").css("display", "");   //报警铃声
            $("#AmEleLevel").css("display", "none");  //电平
            $("#AmTemperature1").css("display", "");     //温度区间
            $("#AmHumidity").css("display", "none");
            $("#AmMotion").css("display", "none")
            $("#AmHuman").css("display", "none");
            $("#AmIOOutputTR").css("display", "none");

            if (gVar_first.sdFlag == 0) {
                $("#rcAlarmNotice").css("display", "none")
            }
            getstr = "getTemperatureAlarmConfig";
            setstr = "setTemperatureAlarmConfig";
            bMaskHide = false;
            RfParamCall(Call, "", getstr);
        }
        else if (lanPage == "alarm_humidity") {
            //show tmpalarm things and hide other
            $("#divAlarmPCSound").css("display", "none");
            $("#chkAlarmPCSound").css("display", "none");

            $("#divAlarmPCSound_ioalarm").css("display", "none");
            $("#chkAlarmPCSound_ioalarm").css("display", "none");

            $("#divAlarmPCSound_sudalarm").css("display", "none");
            $("#chkAlarmPCSound_sudalarm").css("display", "none");

            $("#divAlarmPCSound_tmpalarm").css("display", "none");
            $("#chkAlarmPCSound_tmpalarm").css("display", "none");

            $("#divAlarmPCSound_humalarm").css("display", "");
            $("#chkAlarmPCSound_humalarm").css("display", "");
            //end show tmpalarm things

            $("#Amcdlev").css("display", "none");   //无
            $("#amtable").css("display", "");    //开关
            $("#AlmTabel").css("display", "");    //table
            $("#Amsen").css("display", "none");    //灵敏度
            $("#Amzcbut").css("display", "none");   //选择移动侦测按钮
            $("#hwdtable").css("display", "none");  //无
            $("#AmMoSXOut").css("display", "none");   //移动侦测返回
            $("#alarmRf").css("display", "");    //刷新
            $("#AlarmSave").css("display", "");   //保存
            $("#ambjls").css("display", "");   //报警铃声
            $("#AmEleLevel").css("display", "none");  //电平
            $("#AmTemperature1").css("display", "none");     //温度区间
            $("#AmHumidity").css("display", "");
            $("#rcTempTips").css("display", "none");
            $("#rcTempTips_F").css("display", "none");
            $("#rcTempTips_H").css("display", "");
            $("#AmMotion").css("display", "none")
            $("#AmHuman").css("display", "none");
            $("#AmIOOutputTR").css("display", "none");

            if (gVar_first.sdFlag == 0) {
                $("#rcAlarmNotice").css("display", "none")
            }
            getstr = "getHumidityAlarmConfig";
            setstr = "setHumidityAlarmConfig";
            bMaskHide = false;
            RfParamCall(Call, "", getstr);
        }
        if (gVar_first.ioAlarmFlag == 0) {
            $("#AmIOOutputTR").remove();
        }
        if ((gVar_first.reserve2 >> 2 & 0x01) == "0") {
            $("#alarm_temperature").css("display", "none");
        }

        if ((gVar_first.reserve2 >> 3 & 0x01) == "0") {
            $("#alarm_humidity").css("display", "none");
        }
    });

    function SavePCAudioAlarm() {
        var motionalarm = 0;
        var soundalarm = 0;
        var ioalarm = 0;
        var tempalarm = 0;
        var humalarm = 0;

        if ($("#chkAlarmPCSound").attr("checked") * 1 == 1) {
            motionalarm = 1;
        } else {
            motionalarm = 0;
        }
        if ($("#chkAlarmPCSound_sudalarm").attr("checked") * 1 == 1) {
            soundalarm = 1;
        } else {
            soundalarm = 0;
        }
        if ($("#chkAlarmPCSound_ioalarm").attr("checked") * 1 == 1) {
            ioalarm = 1;
        } else {
            ioalarm = 0;
        }
        if ($("#chkAlarmPCSound_tmpalarm").attr("checked") * 1 == 1) {
            tempalarm = 1;
        } else {
            tempalarm = 0;
        }
        if ($("#chkAlarmPCSound_humalarm").attr("checked") * 1 == 1) {
            humalarm = 1;
        } else {
            humalarm = 0;
        }
        var isEnablePCAudioAlarm = motionalarm + (soundalarm << 1) + (ioalarm << 2) + (tempalarm << 3) + (humalarm << 5);
        RfParamCall(null, "", "setPCAudioAlarmCfg&isEnablePCAudioAlarm=" + isEnablePCAudioAlarm);
    }

    function SaveHumidityAudioAlarm(xml) {
        if ($("#AmIsEnable").attr("checked") * 1 == true) {
            RfParamCall(function (xml) {
                SavePCAudioAlarm();
                if ($(xml).find("isEnable").text() * 1 == true) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_RCPLAN_TIP6"));
                }
            }, "", "getScheduleRecordConfig");
        }
    }

    function MotionAlarmCall(xml) {
        if ($("#AmIsEnable").attr("checked") * 1 == true && $("#AmLink4").attr("checked") * 1 == true) {
            RfParamCall(function (xml) {
                SavePCAudioAlarm();
                if ($(xml).find("isEnable").text() * 1 == true) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_RCPLAN_TIP1"));
                }
            }, "", "getScheduleRecordConfig");
        } else {
            SavePCAudioAlarm();
        }
    }

    function AudioAlarmCall(xml) {
        if ($("#AmIsEnable").attr("checked") * 1 == true) {
            RfParamCall(function (xml) {
                SavePCAudioAlarm();
                if ($(xml).find("isEnable").text() * 1 == true) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_RCPLAN_TIP3"));
                }
            }, "", "getScheduleRecordConfig");
        } else {
            SavePCAudioAlarm
        }
    }

    function IOAlarmCall(xml) {
        if ($("#AmIsEnable").attr("checked") * 1 == true) {
            RfParamCall(function (xml) {
                SavePCAudioAlarm();
                if ($(xml).find("isEnable").text() * 1 == true) {
                    if (gVar_first.sdFlag == 0) {

                    }
                    else {
                        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_RCPLAN_TIP2"));
                    }
                }
            }, "", "getScheduleRecordConfig");
        } else {
            SavePCAudioAlarm();
        }
    }
    $("#AmMotionS").change(function () {
        if (lanPage == "alarm_motion") {
            if ($("#AmHumanS").val() == 1 && $("#AmMotionS").val() == 0) {
                $("#AmSensit").attr("disabled", "disabled");
                //$("#Amtrigger").attr("disabled", "disabled");
                $("#Amzcbut").css("display", "none");
            }
            else {
                $("#AmSensit").attr("disabled", "");
                // $("#Amtrigger").attr("disabled", "");
                // if (IsChromeSupportNacl()) {
                //     $("#Amzcbut").css("display", "none");
                // } else {
                    $("#Amzcbut").css("display", "");
                // }
            }
        }
    });
    $("#AmHumanS").change(function () {
        if (lanPage == "alarm_motion") {
            if ($("#AmHumanS").val() == 1 && $("#AmMotionS").val() == 0) {
                $("#AmSensit").attr("disabled", "disabled");
                //$("#Amtrigger").attr("disabled", "disabled");
                $("#Amzcbut").css("display", "none");
            }
            else {
                $("#AmSensit").attr("disabled", "");
                $("#Amtrigger").attr("disabled", "");
                // if (IsChromeSupportNacl()) {
                //     $("#Amzcbut").css("display", "none");
                // } else {
                    $("#Amzcbut").css("display", "");
                // }
            }
        }
    });

    $("#AlarmSave").click(function () {
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
                colorB = $("#AmBox_" + i + "_" + j).css("background-color");
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

        var amlink = new Array();
        amlink[0] = 0;
        for (var i = 1; i < 9; i++) {
            if ($("#AmLink" + i).attr("checked") * 1 != 1 && $("#AmLink" + i).attr("checked") * 1 != 0) {
                amlink[i] = 0;
            }
            else
                amlink[i] = $("#AmLink" + i).attr("checked") * 1;
        }
        var linkkag = amlink[1] + (amlink[2] << 1) + (amlink[3] << 2) + (0 << 3) + (amlink[4] << 3) + (0 << 4) + (amlink[5] << 4) + (0 << 5) + (amlink[6] << 5) + (0 << 6) + (amlink[7] << 6) + (0 << 7) + (amlink[8] << 7);
        //linkkage topest bit[10] :0------   1-------
        if ($("#AmTemperature_sel_DanWei").val() * 1 == 2) {
            linkkag |= (0x01 << 10);
        }
        else {
            linkkag &= ~(0x01 << 10);
        }
        //end linkkage

        if (setstr == "setScheduleRecordConfig") {
            RfParamCall(null, "", setstr + "&isEnable=" + $("#AmIsEnable").attr("checked") * 1 + str);
        }
        else if (setstr == "setMotionDetectConfig") {
            getarea = gDvr.GetMotionArea();
            RfParamCall(MotionAlarmCall, "", setstr + "&isEnable=" + $("#AmIsEnable").attr("checked") * 1 + "&isMovAlarmEnable=" + $("#AmMotionS").val() + "&isPirAlarmEnable=" + $("#AmHumanS").val() + "&snapInterval=" + $("#AmCTime").val() + "&sensitivity=" + $("#AmSensit").val() + "&linkage=" + linkkag + "&triggerInterval=" + $("#Amtrigger").val() + str + getarea);
        }
        else if (setstr == "setMotionDetectConfig1") {
            getarea = gDvr.GetMotionArea();
            var areaConfig = "";
            for (var i = 1; i <= 3; i++) {
                areaConfig += "&threshold" + i + "=" + $("#selMotion" + i).text();
                areaConfig += "&sensitivity" + i + "=" + $("#selQue" + i).val();
                areaConfig += "&valid" + i + "=" + $("#MotionEnable" + i).attr("checked") * 1;
            }
            if ((gVar_first.reserve2 >> 4 & 0x01) == 1) {
                RfParamCall(MotionAlarmCall, "", setstr + "&isEnable=" + $("#AmIsEnable").attr("checked") * 1 + "&isMovAlarmEnable=" + $("#AmMotionS").val() + "&isPirAlarmEnable=" + $("#AmHumanS").val() + "&snapInterval=" + $("#AmCTime").val() + "&sensitivity=" + $("#AmSensit").val() + "&linkage=" + linkkag + "&triggerInterval=" + $("#Amtrigger").val() + str + getarea + areaConfig);
            }
            else {
                RfParamCall(MotionAlarmCall, "", setstr + "&isEnable=" + $("#AmIsEnable").attr("checked") * 1 + "&snapInterval=" + $("#AmCTime").val() + "&sensitivity=" + $("#AmSensit").val() + "&linkage=" + linkkag + "&triggerInterval=" + $("#Amtrigger").val() + str + getarea + areaConfig);
            }
        }
        else if (setstr == "setAudioAlarmConfig") {
            RfParamCall(AudioAlarmCall, "", setstr + "&isEnable=" + $("#AmIsEnable").attr("checked") * 1 + "&snapInterval=" + $("#AmCTime").val() + "&sensitivity=" + $("#AmSensit").val() + "&linkage=" + linkkag + "&triggerInterval=" + $("#Amtrigger").val() + str + "&snapInterval" + $("#AmCTime").val());
        }
        else if (setstr == "setIOAlarmConfig") {
            RfParamCall(IOAlarmCall, "", setstr + "&isEnable=" + $("#AmIsEnable").attr("checked") * 1 + "&linkage=" + linkkag + "&alarmLevel=" + $("#AmEleLevelS").val() + "&snapInterval=" + $("#AmCTime").val() + "&triggerInterval=" + $("#Amtrigger").val() + str);
        }
        else if (setstr == "setTemperatureAlarmConfig") {
            var top = $("#AmTemperatureTop").val() * 1;
            var low = $("#AmTemperatureLow").val() * 1;
            if (($("#AmTemperature_sel_DanWei").val() * 1 == 1)) {
                if (top > low && top - low >= 5 && top <= 40 && low <= 40 && top >= 0 && low >= 0) {
                    RfParamCall(SavePCAudioAlarm, "", setstr + "&isEnable=" + $("#AmIsEnable").attr("checked") * 1 + "&linkage=" + linkkag + "&topLimit=" + $("#AmTemperatureTop").val() + "&lowerLimit=" + $("#AmTemperatureLow").val() + "&snapInterval=" + $("#AmCTime").val() + "&triggerInterval=" + $("#Amtrigger").val() + str);
                }
                else {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_ALARM_TTEMPERATRUETIPS"));
                }
            }
            else {
                if (top > low && top - low >= 9 && top <= 104 && low <= 104 && top >= 32 && low >= 32) {
                    RfParamCall(SavePCAudioAlarm, "", setstr + "&isEnable=" + $("#AmIsEnable").attr("checked") * 1 + "&linkage=" + linkkag + "&topLimit=" + $("#AmTemperatureTop").val() + "&lowerLimit=" + $("#AmTemperatureLow").val() + "&snapInterval=" + $("#AmCTime").val() + "&triggerInterval=" + $("#Amtrigger").val() + str);
                }
                else {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_ALARM_TTEMPERATRUETIPS_F"));
                }
            }
        }
        else if (setstr == "setHumidityAlarmConfig") {
            var Low = $("#AmHumidityLow").val() * 1;
            var High = $("#AmHumidityHigh").val() * 1;

            if (High > Low && High - Low >= 5) {
                RfParamCall(SaveHumidityAudioAlarm, "", setstr + "&isEnable=" + $("#AmIsEnable").attr("checked") * 1 + "&linkage=" + linkkag + "&topLimit=" + $("#AmHumidityHigh").val() + "&lowerLimit=" + $("#AmHumidityLow").val() + "&snapInterval=" + $("#AmCTime").val() + "&triggerInterval=" + $("#Amtrigger").val() + str);
            }
            else {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_ALARM_TTHUM1") + "% ," + lg.get("IDS_ALARM_TTHUM2") + "% ," + lg.get("IDS_ALARM_TTHUM3") + "% .");
            }
        }

    });
    $("#AmZC").click(function () {
        $("#alarm>.config_content").css("display", "none");
        
        if (gVar_first.model > 5000 && gVar_first.model < 6000) {
            $("#MotionRegion").css("display", "");
            $("#btnDelMotionRect").css("display", "");
            gVar.SetPluginPos(30, 70, 702, 482);
            gDvr.ChangeWndSize(3, 4, 1);
            $("#AmAlarmImg").css("display", "none");
			$("#mboxamb").css("display","");
        }
        else {
            $("#AmAlarmImg").css("display", "");
			$("#mbox").css("display", "");
			gVar.SetPluginPos(70, 55, 800, 500);
			gDvr.ChangeWndSize(3, 4);
        }
        $("#AmMoSX").css("display", "");
        if ((gVar_first.reserve2 & 0x01) == 0) {
            $("#AmMoSXOut").css("display", "none");
        }
        else {
           $("#AmMoSXOut").css("display", "");
           
        }

    })

    $("#AmClearIO").click(function () {
        RfParamCall(null, "", "clearIOAlarmOutput");
    });

    $("#AmMoSX").click(function () {
        $("#alarm>.config_content").css("display", "");
        $("#MotionRegion").css("display", "none");
        $("#AmMoSX").css("display", "none");
        $("#AmMoSXOut").css("display", "none");
        $("#btnDelMotionRect").css("display", "none");
        $("#AmAlarmImg").css("display", "none");
		gVar.SetPluginPos(0, 0, 0, 0);    
		if(IsChromeSupportNacl())
		{
	    saveMotionAreaForChrome();
		}
		else
		{
			getarea = gDvr.GetMotionArea();
       // gVar.SetPluginPos(0, 0, 0, 0);
        gDvr.ChangeWndSize(-1);
			}
    });

   /*setmotion area for chrom */
    function saveMotionAreaForChrome()
	{
		var str="";
		var area;
		if(gVar_first.model>5000&&gVar_first.model<6000)
		{
			var x=[],y=[],height=[],width=[];
			for(var i=0;i<=3;i++)
			{
				x[i]=0;
				y[i]=0;
				width[i]=0;
				height[i]=0;
			}
		 for(var i=0;i<$(".rect").length;i++)
		 {
			 var rect=$($(".rect").get(i));
			 var number=rect.attr("number")*1;
             var option={};
			 option.left=rect.css("left").split("px")[0];
			 option.top=rect.css("top").split("px")[0];
			 option.width=rect.css("width").split("px")[0];
			 option.height=rect.css("height").split("px")[0];
			 TransformCoordinate(option);
			 x[number]=option.left;
			 y[number]=option.top;
			 height[number]=option.height;
			 width[number]=option.width;
		 }
		 for(var i=1;i<=3;i++)
		 {
			 str+=x[i] + ","+ y[i] + "," + width[i] + "," + height[i] + ",";
			  
		 }
		 $("#mboxamb").css("display","none");
		}
		else
		{
		for(var i=0;i<10;i++)
		{
			area=0;
			for(var j=0;j<10;j++)
			{
				if($("#mbox_"+i+"_"+j).attr("check")*1)
				{
					area+=0x01<<j;
				}
			}
			str+=area+",";
		}
		}
		gDvr.SetMotionArea(str);
        getarea = gDvr.GetMotionArea();        
        gDvr.ChangeWndSize(-1);
		$(".rect").remove();
		
	}
/*end of setmotioneara for chrom*/



    $("#btnDelMotionRect").click(function () {
		if(IsChromeSupportNacl())
		{
        $(".selectArea").remove();//chrome
		}
		else
		{
		gDvr.obj[0].DelMotionRect();
		}
    })

    $("#AmOutMove").click(function () {
       gDvr.SetCheckedOut($(this).attr("checked") * 1);
	   
    })
    function ShowArlarmArea(data){
        var tempData = data.split(",");
        var ArmAreaTemp = new Array(10);
        for(var i=0;i<10;i++){
            ArmAreaTemp[i] = tempData[i];
                for (var j = 0; j < 10; j++) {
                    $("#mbox_"+i+"_"+j).attr("check",((ArmAreaTemp[i]>>j)&0x01));
                    if($("#mbox_"+i+"_"+j).attr("check")==1){
                        $("#mbox_"+i+"_"+j).css("background-color", color);
                    }else{
                         $("#mbox_"+i+"_"+j).css("background-color","");
                    }
                };
        }
    }
    $("#alarmRf").click();
})