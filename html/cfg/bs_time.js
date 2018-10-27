$(function () {
    //var timerID = -1;
    var timeFormat = 0;
    var dstTimeAhead = 0;
	var hasStartDST=0;
    jQuery("#bsTNTPTable,#bsTSDT tr:odd").addClass("t1");
    jQuery("#bsTNTPTable,#bsTSDT tr:even").addClass("t2");

    if (isSoftAPMode == 1) {
        $("#tblTimeServer").css("display", "none");
    }

    var dateTime;
    var hh; var mm; var ss; var yy; var MM; var dd; var week;
    var ntpSvr = "";
    var timezone = 0;
    var timeOut = 0;
    $('#bsTSTime').simpleDatepicker({ type: 1, x: $('#bsTSTime').offset().left - $("#main").offset().left, y: $('#bsTSTime').offset().top - $("#main").offset().top + 20, Laguage: gVar.lg, name: "DstPiTimer1", nIframe: "iframe1", UseZS: true });
    $("#bsTSTimerObj").timer();
    $("#bsT_TIMEFORMAT").change(function () {
        $("#bsTSTimerObj").timer.ChangeType($(this).val() * 1, $("#bsTSTimerObj"));
        timeFormat = $(this).val() * 1;
    })

    function StartTimeTick() {
        if (timerID != -1) {
            clearInterval(timerID);
        }

        timerID = setInterval(function () {
            bsTimeVal = bsTimeVal.split(":");
            bsTimeVal = bsTimeVal[0] * 3600 + bsTimeVal[1] * 60 + bsTimeVal[2] * 1 + 1;
            var h = (bsTimeVal / 3600 | 0) % 24 | 0;
            var m = bsTimeVal % 3600 / 60 | 0;
            var s = bsTimeVal % 60 | 0;
            bsTimeVal = h + ":" + m + ":" + s;

            if (document.activeElement!=null&&(document.activeElement.id == "bsTSTimerObj_Hour" || document.activeElement.id == "bsTSTimerObj_Min" || document.activeElement.id == "bsTSTimerObj_Sec" || document.activeElement.id == "bsTSTimerObj_Type") ) {
                //bsTimeVal = $("#bsTSTimerObj").timer.GetTimeFor24($("#bsTSTimerObj"));
            } else {
                $("#bsTSTimerObj").timer.SetTimeIn24(bsTimeVal, $("#bsTSTimerObj"), timeFormat);
            }
        }, 1000);
    }

    $("#bstimeLoad").click(function () {
		dstTimeAhead=0;
		$("#bsTUseDST").attr("checked",false);
        dateTime = new Date();
        hh = dateTime.getHours();
        mm = dateTime.getMinutes();
        ss = dateTime.getSeconds();

        yy = dateTime.getFullYear();
        MM = dateTime.getMonth() + 1;  //因为1月这个方法返回为0，所以加1
        dd = dateTime.getDate();

        week = dateTime.getDay();


        var time = hh + ":" + mm + ":" + ss;

        $("#bsTSTimerObj").timer.SetTimeIn24(time, $("#bsTSTimerObj"), $("#bsT_TIMEFORMAT").val() * 1);
        bsTimeVal = time;
        StartTimeTick();


        var date = new Date(yy + "/" + MM + "/" + dd);
        $("#bsTSTime").attr("DateTime", date).val($('#bsTSTime').simpleDatepicker.formatOutput(date, true));
        timezone = dateTime.getTimezoneOffset() * 60;
        $("#bsTTimeZone").val(timezone);

        $("#bsTNTPS1").change();
        $("#bsTistS").change();
        //$("#bsTUseDST").change();
        DivBox($("#bsTUseDST").attr("checked") * 1, "#bsTDST");
        $("#bsTSTimerObj").find("select").css({ "background": "#3F444E", "border": "0px", "color": "#FFFFFF" });
    })
	
	
	//  get DTS setting
	function getScheduleDstConfigCall(xml)
	{
     var sMouth=XmlParser("dstStartMonth", xml)*1;
	 var sHour=XmlParser("dstStartHour", xml)*1;
	 var sWhichWeek=XmlParser("dstStartWhichOne", xml)*1;
	 var sWeek=	XmlParser("dstStartWhichWeek", xml)*1;
	 var eMouth=XmlParser("dstEndMonth", xml)*1;
	 var eHour=XmlParser("dstEndHour", xml)*1;
	 var eWhichWeek=XmlParser("dstEndWhichOne", xml)*1;
	 var eWeek=	XmlParser("dstEndWhichWeek", xml)*1;
	 hasStartDST=XmlParser("hasStartDst", xml)*1;
	 $("#TDSSMouth").val(sMouth);
	 $("#TDSSWhichWeek").val(sWhichWeek);
	 $("#TDSSWeek").val(sWeek);
	 $("#TDSSHour").val(sHour);
	  $("#TDSEMouth").val(eMouth);
	 $("#TDSEWhichWeek").val(eWhichWeek);
	 $("#TDSEWeek").val(eWeek);
	 $("#TDSEHour").val(eHour); 
     //$("#bstimeRf").attr("disabled","");
	}
	
	
	// get Time setting
    function Call(xml) {
        var dst;
        var year, mon, day, hour, mim, sec;
        var isNtp1 = false;
        $("#bsTistS").attr("checked", 1 - XmlParser("timeSource", xml) * 1);
        $("#bsTUseDST").attr("checked", XmlParser("isDst", xml) * 1);
        $("#bsTTimeZone").val(XmlParser("timeZone", xml));
        timezone = XmlParser("timeZone", xml);
        ntpSvr = XmlParser("ntpServer", xml);
        if ($("#bsTNTPS1 option").each(function () {
            if ($(this).val() == ntpSvr) {
                isNtp1 = true;
            }
        }))

            if (isNtp1) {
                $("#bsTNTPS1").val(ntpSvr)
            } else {
                $("#bsTNTPS1").val("...");
                $("#bsTNTPSE2").val(ntpSvr);
            }

        $('#bsTSTime').simpleDatepicker.TimeType = XmlParser("dateFormat", xml);
        $("#bsT_DATEFORMAT").val($('#bsTSTime').simpleDatepicker.TimeType);
        $("#bsT_TIMEFORMAT").val(XmlParser("timeFormat", xml));
        timeFormat = $("#bsT_TIMEFORMAT").val();
        dst = XmlParser("dst", xml);
        //		if(dst >= 0){
        //			$("#bsTDstFH").val(0);
        //		}else{
        //			$("#bsTDstFH").val(1);
        //		}
        //$("#bsTDstV").val(Math.abs(dst));
        $("#bsTDstFH").val(dst);
        dstTimeAhead = dst;
        var date = new Date(XmlParser("year", xml) + "/" + XmlParser("mon", xml) + "/" + XmlParser("day", xml));
        $("#bsTSTime").attr("DateTime", date).val($('#bsTSTime').simpleDatepicker.formatOutput(date, true));

        $("#bsTNTPS1").change();
        //$("#bsTUseDST").change();
        if (gVar_first.model > 3000 && gVar_first.model < 4000 && gVar_first.N_language != 2) {
            $("#bsTimeTDST").css("display", "none");
            $("#bsTDST").css("display", "none");
        }
        else {
            DivBox($("#bsTUseDST").attr("checked") * 1, "#bsTDST");
        }

        var time = XmlParser("hour", xml) + ":" + XmlParser("minute", xml) + ":" + XmlParser("sec", xml);
        $("#bsTSTimerObj").timer.InsertHtml($("#bsTSTimerObj"), $("#bsT_TIMEFORMAT").val() * 1);
        $("#bsTSTimerObj").timer.SetTimeIn24(time, $("#bsTSTimerObj"), $("#bsT_TIMEFORMAT").val() * 1);
        $("#bsTSTimerObj").find("select").css({ "background": "#3F444E", "border": "0px", "color": "#FFFFFF" });

        $("#bsTistS").change();
        $("#bsTSTime").attr("readonly", "readonly");
        bsTimeVal = time;
        StartTimeTick();
		if(gVar_first.N_language == 0)
		return;
		bMaskHide = false;
		RfParamCall(getScheduleDstConfigCall,"","getScheduleDstConfig");
    }
    //时区
    var str_tz_list = '<option value=43200>(GMT -12:00)' + lg.get("IDS_BS_DATELIME_WEST") + '</option><option value=39600>(GMT -11:00) ' + lg.get("IDS_BS_MIDWAY") + '</option><option value=36000>(GMT -10:00) ' + lg.get("IDS_BS_HAWAII") + '</option><option value=32400>(GMT -09:00) ' + lg.get("IDS_BS_ALASKA") + '</option><option value=28800>(GMT -08:00) ' + lg.get("IDS_BS_PACIFIC") + '</option><option value=25200>(GMT -07:00) ' + lg.get("IDS_BS_MOUNTAIN") + '</option><option value=21600>(GMT -06:00) ' + lg.get("IDS_BS_CENTRAL") + '</option><option value=18000>(GMT -05:00) ' + lg.get("IDS_BS_EASTERN") + '</option><option value=14400>(GMT -04:00) ' + lg.get("IDS_BS_ATLANTIC") + '</option><option value=12600>(GMT -03:30) ' + lg.get("IDS_BS_NEWFOUNDLAND") + '</option><option value=10800>(GMT -03:00) ' + lg.get("IDS_BS_BRASILIA") + '</option><option value=7200>(GMT -02:00) ' + lg.get("IDS_BS_SOUTH") + '</option><option value=3600>(GMT -01:00) ' + lg.get("IDS_BS_PEYKJAVIK") + '</option><option value=0>(GMT) ' + lg.get("IDS_BS_GREENWICH") + '</option><option value=-3600>(GMT +01:00) ' + lg.get("IDS_BS_BRUSSELS") + '</option><option value=-7200>(GMT +02:00) ' + lg.get("IDS_BS_ATHENS") + '</option><option value=-10800>(GMT +03:00) ' + lg.get("IDS_BS_NAIROBI") + '</option><option value=-12600>(GMT +03:30) ' + lg.get("IDS_BS_TEHRAN") + '</option><option value=-14400>(GMT +04:00) ' + lg.get("IDS_BS_BAKU") + '</option><option value=-16200>(GMT +04:30) ' + lg.get("IDS_BS_KABUL") + '</option><option value=-18000>(GMT +05:00) ' + lg.get("IDS_BS_ISLAMABAD") + '</option><option value=-19800>(GMT +05:30) ' + lg.get("IDS_BS_BOMBAY") + '</option><option value=-21600>(GMT +06:00) ' + lg.get("IDS_BS_ASTANA") + '</option><option value=-25200>(GMT +07:00) ' + lg.get("IDS_BS_BANGKOK") + '</option><option value=-28800>(GMT +08:00) ' + lg.get("IDS_BS_BEIGING") + '</option><option value=-32400>(GMT +09:00) ' + lg.get("IDS_BS_SEOUL") + '</option><option value=-34200>(GMT +09:30) ' + lg.get("IDS_BS_DARWIN") + '</option><option value=-36000>(GMT +10:00) ' + lg.get("IDS_BS_GUAM") + '</option><option value=-39600>(GMT +11:00) ' + lg.get("IDS_BS_MAGADAN") + '</option><option value=-43200>(GMT +12:00) ' + lg.get("IDS_BS_AUCKLAND") + '</option>';
    $("#bsTTimeZone").append(str_tz_list);

    $("#bsTTimeZone").change(function () {
        var time = $("#bsTSTimerObj").timer.GetTimeFor24($("#bsTSTimerObj")).split(":");
        var px = $("#bsTTimeZone").val() * 1 - timezone * 1;
        time = time[0] * 3600 + time[1] * 60 + time[2] * 1;
        if (time >= px) {
            time = time - px;
            if (time >= 24 * 3600) {
                //var cDate = new Date($("#bsTSTime").val().split("-")[0], $("#bsTSTime").val().split("-")[1] - 1, $("#bsTSTime").val().split("-")[2]);
                var cDate;
                if ($("#bsT_DATEFORMAT").val() * 1 == 0) {
                    cDate = new Date($("#bsTSTime").val().split("-")[0], $("#bsTSTime").val().split("-")[1] - 1, $("#bsTSTime").val().split("-")[2]);
                }
                else if ($("#bsT_DATEFORMAT").val() * 1 == 1) {
                    cDate = new Date($("#bsTSTime").val().split("/")[2], $("#bsTSTime").val().split("/")[1] - 1, $("#bsTSTime").val().split("/")[0]);
                }
                else if ($("#bsT_DATEFORMAT").val() * 1 == 2) {
                    cDate = new Date($("#bsTSTime").val().split("/")[2], $("#bsTSTime").val().split("/")[0] - 1, $("#bsTSTime").val().split("/")[1]);
                }
                cDate = cDate.valueOf();
                cDate = cDate + 24 * 60 * 60 * 1000;
                cDate = new Date(cDate);
                var cDate2 = cDate;
                $("#bsTSTime").attr("DateTime", cDate).val($('#bsTSTime').simpleDatepicker.formatOutput(cDate, true));
            }
        } else {
            time += 24 * 3600;
            time = time - px;
            //var cDate = new Date($("#bsTSTime").val().split("-")[0], $("#bsTSTime").val().split("-")[1] - 1, $("#bsTSTime").val().split("-")[2]);
            var cDate;
            if ($("#bsT_DATEFORMAT").val() * 1 == 0) {
                cDate = new Date($("#bsTSTime").val().split("-")[0], $("#bsTSTime").val().split("-")[1] - 1, $("#bsTSTime").val().split("-")[2]);
            }
            else if ($("#bsT_DATEFORMAT").val() * 1 == 1) {
                cDate = new Date($("#bsTSTime").val().split("/")[2], $("#bsTSTime").val().split("/")[1] - 1, $("#bsTSTime").val().split("/")[0]);
            }
            else if ($("#bsT_DATEFORMAT").val() * 1 == 2) {
                cDate = new Date($("#bsTSTime").val().split("/")[2], $("#bsTSTime").val().split("/")[0] - 1, $("#bsTSTime").val().split("/")[1]);
            }
            cDate = cDate.valueOf();
            cDate = cDate - 24 * 60 * 60 * 1000;
            cDate = new Date(cDate);
            var cDate2 = cDate;
            $("#bsTSTime").attr("DateTime", cDate).val($('#bsTSTime').simpleDatepicker.formatOutput(cDate, true));

        }
        var h = (time / 3600 | 0) % 24 | 0;
        var m = time % 3600 / 60 | 0;
        var s = time % 60 | 0;
        time = h + ":" + m + ":" + s;
        $("#bsTSTimerObj").timer.SetTimeIn24(time, $("#bsTSTimerObj"), $("#bsT_TIMEFORMAT").val() * 1);
        timezone = $("#bsTTimeZone").val();
        bsTimeVal = time;
        StartTimeTick();
        //setTimeout(function(){$("#bsT_TIMEFORMAT").change()},10)
    })
    //时间
    $("#bsTNTPS1").change(function () {
        var text = $(this).children(":selected").val();
        if ($(this).children(":selected").val() == "...") {
            $("#bsTNTPTable tr[name='bsTSDNpt']").css("display", "");
        } else {
            $("#bsTNTPTable tr[name='bsTSDNpt']").css("display", "none");
            ntpSvr = text;
        }
    })

    //根据日期格式修改系统时间
    $("#bsT_DATEFORMAT").change(function () {
        $('#bsTSTime').simpleDatepicker.TimeType = $(this).val() * 1;
        var dateObj = new Date($('#bsTSTime').attr("DateTime"));
        $("#bsTSTime").val($('#bsTSTime').simpleDatepicker.formatOutput(new Date(dateObj), true));
    })

    $("#bstimeRf").click(function () {
        //$("#bstimeRf").attr("disabled","disabled");
        RfParamCall(Call, "", "getSystemTime");
    }); 
   function setScheduleDstConfigCall(xml)
   {
        
   }
   function saveTimeCall(xml)
   {
	   if(gVar_first.N_language == 0)
	   return;
	   bMaskHide = false;
	   RfParamCall(setScheduleDstConfigCall,"","setScheduleDstConfig&dstStartMonth="+$("#TDSSMouth").val()*1+"&dstStartWhichOne=" + $("#TDSSWhichWeek").val()*1 + "&dstStartWhichWeek=" + $("#TDSSWeek").val()*1 + "&dstStartHour="+ $("#TDSSHour").val()*1 +"&dstEndMonth="+ $("#TDSEMouth").val()*1 +"&dstEndWhichOne="+$("#TDSEWhichWeek").val()+"&dstEndWhichWeek="+ $("#TDSEWeek").val()*1 +"&dstEndHour="+$("#TDSEHour").val()*1);
	   setGuidResult = true;
   }

    $("#bsTSave").click(function () {
        if ($("#bsTNTPS1").children(":selected").text() == "...")
            ntpSvr = $("#bsTNTPSE2").val();


        
        var y, m, d;
        if ($("#bsT_DATEFORMAT").val() * 1 == 0) {
            y = $("#bsTSTime").val().split("-")[0];
            m = $("#bsTSTime").val().split("-")[1] - 1;
            d = $("#bsTSTime").val().split("-")[2];
            cDate = new Date([0], $("#bsTSTime").val().split("-")[1] - 1, $("#bsTSTime").val().split("-")[2]);
        }
        else if ($("#bsT_DATEFORMAT").val() * 1 == 1) {
            y = $("#bsTSTime").val().split("/")[2];
            m = $("#bsTSTime").val().split("/")[1] - 1;
            d = $("#bsTSTime").val().split("/")[0];
        }
        else if ($("#bsT_DATEFORMAT").val() * 1 == 2) {
            y = $("#bsTSTime").val().split("/")[2];
            m = $("#bsTSTime").val().split("/")[0] - 1;
            d = $("#bsTSTime").val().split("/")[1];
        }
        var time = $("#bsTSTimerObj").timer.GetTimeFor24($("#bsTSTimerObj")).split(":");
        bsTimeVal = $("#bsTSTimerObj").timer.GetTimeFor24($("#bsTSTimerObj"));
        StartTimeTick();
        var nD = Date.UTC(y, m, d, time[0], time[1], time[2]) + (new Date()).getTimezoneOffset() * 60000;
		
		
		if(hasStartDST&&$("#bsTUseDST").attr("checked"))
       {
	      var UTCTime = new Date(nD -dstTimeAhead*60*1000+ $("#bsTTimeZone").val() * 1000);
       }
	   else
	   {
        var UTCTime = new Date(nD + $("#bsTTimeZone").val() * 1000);
	   }
        var enbdst = 0;
        var dsttime = 0;
        if (gVar_first.N_language != 2) {
            enbdst = 0;
            dsttime = 0;
        } else {
            enbdst = ($("#bsTUseDST").attr("checked") * 1);
            dsttime = $("#bsTDstFH").val().split("'")[0];
        }

        var bs_time_Source;
        if (gVar_first.N_language != 2 && gVar_first.model == "1111") {
            bs_time_Source = 1;
        }
        else {
            if (isSoftAPMode) {
                bs_time_Source = 1;
            }
            else {
                bs_time_Source = (1 - $("#bsTistS").attr("checked") * 1);
            }
        }

        if($("#bsTUseDST").attr("checked")){
            if($("#TDSSMouth").val() == $("#TDSEMouth").val() ){
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_TDS_SAMETIME_TIP"));
                setGuidResult = false;
                return; 
            }
        }
        RfParamCall(saveTimeCall, "",
		"setSystemTime&timeSource=" + bs_time_Source + "&ntpServer=" + ntpSvr +
		                            "&dateFormat=" + $("#bsT_DATEFORMAT").val() + "&timeFormat=" + $("#bsT_TIMEFORMAT").val() +
		                            "&timeZone=" + $("#bsTTimeZone").val() + "&isDst=" + enbdst + "&dst=" + dsttime + "&year=" +
		                            UTCTime.getFullYear() + "&mon=" + (UTCTime.getMonth() + 1) + "&day=" + UTCTime.getDate() +
		                            "&hour=" + UTCTime.getHours() + "&minute=" + UTCTime.getMinutes() + "&sec=" + UTCTime.getSeconds());
        setGuidResult = true;
    });

    $("#bsTistS").change(function () {
        if (isSoftAPMode == 1) {
            $("#bsTNTPTable").css("display", "none");
        } else {
            var b = $(this).attr("checked") * 1;
            if ($(this).attr("checked") * 1 == 1) {
                $("#bsTSTime").attr("disabled", "disabled");
            }
            else {
                $("#bsTSTime").attr("disabled", "");
            }
            DivBox(b, "#bsTNTPTable");
            DivBox(!b, "#bsTSDT");
            if (b == 1) $("#bstimeLoad").attr("disabled", "disabled")
            else $("#bstimeLoad").attr("disabled", "")
            $("#bsTSTime").attr("readonly", "readonly");
        }
    });

    $("#bsTUseDST").change(function () {
        DivBox($(this).attr("checked") * 1, "#bsTDST");
		if(hasStartDST)
		{
        //dstTimeAhead = $("#bsTDstFH").val();
        var timeDst = $("#bsTSTimerObj").timer.GetTimeFor24($("#bsTSTimerObj")).split(":");
        if ($(this).attr("checked")) {
            timeDst = timeDst[0] * 3600 + timeDst[1] * 60 + timeDst[2] * 1 + dstTimeAhead*60;//$("#bsTDstFH").val() * 60;
        } else {
            timeDst = timeDst[0] * 3600 + timeDst[1] * 60 + timeDst[2] * 1 - dstTimeAhead*60;//$("#bsTDstFH").val() * 60;
        }
        var hDst = (timeDst / 3600 | 0) % 24 | 0;
        var mDst = timeDst % 3600 / 60 | 0;
        var sDst = timeDst % 60 | 0;
        timeDst = hDst + ":" + mDst + ":" + sDst;
        $("#bsTSTimerObj").timer.SetTimeIn24(timeDst, $("#bsTSTimerObj"), $("#bsT_TIMEFORMAT").val() * 1);

        bsTimeVal = timeDst;
        StartTimeTick();
		}
    });

    $("#bsTDstFH").change(function () {
     /*   var timeDstSel = $("#bsTSTimerObj").timer.GetTimeFor24($("#bsTSTimerObj")).split(":");
        timeDstSel = timeDstSel[0] * 3600 + timeDstSel[1] * 60 + timeDstSel[2] * 1 - dstTimeAhead * 60 + $("#bsTDstFH").val() * 60;
        var hDstSel = (timeDstSel / 3600 | 0) % 24 | 0;
        var mDstSel = timeDstSel % 3600 / 60 | 0;
        var sDstSel = timeDstSel % 60 | 0;
        timeDstSel = hDstSel + ":" + mDstSel + ":" + sDstSel;

        $("#bsTSTimerObj").timer.SetTimeIn24(timeDstSel, $("#bsTSTimerObj"), $("#bsT_TIMEFORMAT").val() * 1);
        dstTimeAhead = $("#bsTDstFH").val();

        bsTimeVal = timeDstSel;
        StartTimeTick();*/
    });

    $("#bstimeRf").click();

})