
$(function () {
    jQuery("#DevStTable tr:odd").addClass("t1");
    jQuery("#DevStTable tr:even").addClass("t2");

    function HumCall(xml) {
        var humAlmSta = $(xml).find("state").text() * 1;
        $("#thConHumidityAlarm").html(lg.get("ALARM_TEST").split(",")[humAlmSta]);
    }

    function TempuCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            var tempAlmSta = $(xml).find("state").text() * 1;
            $("#thConTempAlarm").html(lg.get("ALARM_TEST").split(",")[tempAlmSta]);
        }
        if ((gVar_first.reserve2 >> 3 & 0x01) == 1) {
            RfParamCall(HumCall, "", "getHumidityState");
        }
    }

    function Call(xml) {
        var DSMDAlarm = $(xml).find("motionDetectAlarm").text() * 1;
        $("#devSTT_MOTIONDETECTALARM").html(lg.get("ALARM_TEST").split(",")[DSMDAlarm]);
        var EventsAlarm = $(xml).find("motionDetectAlarm").text() * 1;
        $("#devSTT_EVENTSETECTALARM").html(lg.get("ALARM_TEST").split(",")[EventsAlarm]);

        var HuamnAlarm = $(xml).find("humanDetectAlarmState").text()*1;
        $("#thConHumanAlarm").html(lg.get("ALARM_TEST").split(",")[HuamnAlarm]);

        var DSIOAlarm = $(xml).find("IOAlarm").text() * 1;
        $("#devSTT_IOALARMSTATE").html(lg.get("ALARM_TEST").split(",")[DSIOAlarm]);
        var DSSAlarm = $(xml).find("soundAlarm").text() * 1;
        $("#thConSoudAlarm").html(lg.get("ALARM_TEST").split(",")[DSSAlarm]);
        var DSrecord = $(xml).find("record").text() * 1;
        $("#devSTT_RECORD").html(lg.get("RECORD_TEST").split(",")[DSrecord]);
        var DSsdS = $(xml).find("sdState").text() * 1;
        $("#devSTT_SDSTATE").html(lg.get("SDSTATE_TEST").split(",")[DSsdS]);
        var DSntpS = $(xml).find("ntpState").text() * 1;
        $("#devSTT_NTPSSTATE").html(lg.get("NTPORDDNSSTATE_TEST").split(",")[DSntpS]);

        var DSddnsS = $(xml).find("ddnsState").text() * 1;
        var ddnsurl = "";
        if (DSddnsS == 1) {
            var url = $(xml).find("url").text();
            ddnsurl = '<a href="' + url + '" target="_blank">' + url + '</a>';
        }
        else ddnsurl = "";
        $("#devSTT_DDNSSTATE").html(lg.get("NTPORDDNSSTATE_TEST").split(",")[DSddnsS] + "  " + ddnsurl);
        var DSupnpS = $(xml).find("upnpState").text() * 1;
        $("#devSTT_UPNPSTATE").html(lg.get("UPNPSTATE_TEST").split(",")[DSupnpS]);
        var DSSDFSp = $(xml).find("sdFreeSpace").text();
        var freesp = DSSDFSp.split("k");
        $("#devSTT_SDFS").text(DEVSP(freesp, DSSDFSp));
        var DSSDTS = $(xml).find("sdTotalSpace").text();
        var toal = DSSDTS.split("k");
        $("#devSTT_SDTS").text(DEVSP(toal, DSSDTS));
        var wifis = $(xml).find("isWifiConnected").text() * 1;
        if (isSoftAPMode == 1) {
            $("#devSTT_WIFISTATE").html("Soft AP");
        } else {
            if (wifis == 0)
                $("#devSTT_WIFISTATE").html(lg.get("IDS_DEV_NOWIFI"));
            else
                $("#devSTT_WIFISTATE").html(lg.get("IDS_DEV_YESWIFI") + $(xml).find("wifiConnectedAP").text());
        }
        var leds = $(xml).find("infraLedState").text() * 1;
        if (leds == 0) {
            $("#devSTT_LEDSTATE").html(lg.get("IDS_OTHER_OFF"));
        }
        else {
            $("#devSTT_LEDSTATE").html(lg.get("IDS_OTHER_ON"));
        }

        if (gVar_first.sdFlag == 0) {
            $("#IDS_DEV_SDSTATETR").css("display", "none");
            $("#IDS_DEV_SDFSTR").css("display", "none");
            $("#IDS_DEV_SDTSTR").css("display", "none");
            $("#devstate_record").css("display", "none");
        }

        if ((gVar_first.reserve2 >> 4 & 0x01) == 0) {
            $("#trMotionAlarm").css("display", "");
            $("#trEventsAlarm").css("display", "none");
        }
        else {
            $("#trMotionAlarm").css("display", "none");
            $("#trEventsAlarm").css("display", "");
        }

        if (gVar_first.wifiType == 0) {
            $("#dstatewifiTR").css("display", "none");
        }

        if (!(gVar_first.reserve2 & (0x1 << 1))) {
            $("#trSoudAlarm").css("display", "none");
        }
        else {
            $("#trSoudAlarm").css("display", "");
        }

        if ((gVar_first.reserve2 >> 2 & 0x01) == 1) {
            $("#trTempAlarm").css("display", "");
        }

        if ((gVar_first.reserve2 >> 3 & 0x01) == 1) {
            $("#trHumidityAlarm").css("display", "");
        }

        if ((gVar_first.reserve3 >> 5 & 0x01) == 1) {
            $("#IDS_DEV_IRLED").css("display", "none");
        }

        if (gVar_first.ioAlarmFlag == 0) {
            $("#IDS_DEV_IOALARMSTATETR").css("display", "none");
        }
        if (gVar_first.model == "1111" || gVar_first.model == "1112" || gVar_first.model == "1113") {
            if (gVar_first.reserve2 & (0x1 << 2)) {
                RfParamCall(TempuCall, "", "getTemperatureState");
            }
        }
        if (isNVRIPC()) {
            $("#trDevDDNS").css("display", "none");
        }
        if ((gVar_first.reserve2 >> 5) == 0){
            $("#trHumanAlarm").css("display", "none");
        }else{
            $("#trHumanAlarm").css("display", "");
        }
    }

    function DEVSP(freesp, DSSDFSp) {
        var num = "";
        var a = 1024 * 1024;
        var b = 1024 * 1024 * 1024;
        var isInt = true;
        if (freesp[0] >= 1024 && freesp[0] < a) {
            num = "" + freesp[0] / 1024;
            for (var i = 0; i < num.length; i++) {
                if (num.charAt(i) == ".") { isInt = false; }
            }
            if (isInt == false) {
                DSSDFS = num.split(".")[0] + "." + ("" + num.split(".")[1]).charAt(0) + "MB";
            }
            else {
                DSSDFS = num.split(".")[0] + ".0" + "MB";
            }
        }
        else if (freesp[0] >= a && freesp[0] < b) {
            num = "" + freesp[0] / a;
            for (var i = 0; i < num.length; i++) {
                if (num.charAt(i) == ".") { isInt = false; }
            }
            if (isInt == false) {
                DSSDFS = num.split(".")[0] + "." + ("" + (num.split(".")[1])).charAt(0) + "GB";
            }
            else {
                DSSDFS = num.split(".")[0] + ".0" + "GB";
            }

        }
        else if (freesp[0] >= b) {
            num = "" + freesp[0] / b;
            for (var i = 0; i < num.length; i++) {
                if (num.charAt(i) == ".") { isInt = false; }
            }
            if (isInt == false) {
                DSSDFS = num.split(".")[0] + "." + ("" + num.split(".")[1]).charAt(0) + "TB";
            }
            else {
                DSSDFS = num.split(".")[0] + ".0" + "TB";
            }
        }
        else DSSDFS = freesp[0] + "KB";
        return DSSDFS;

    }
    $("#devstateRf").click(function () {
			
        RfParamCall(Call, "", "getDevState");
    });
    $("#devstateRf").click();
});