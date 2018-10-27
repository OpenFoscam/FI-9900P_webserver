$(function () {
    //LIVE
    function Call(xml) {
        if (gVar.httpver == "https") {
            setCookie("snapcmd", gVar.httpver + "://" + gVar.ip + ":" + mult_https_port[IFs] + "/cgi-bin/CGIProxy.fcgi?" + (urlEncode("usr=" + gVar.user + "&pwd=" + gVar.passwd + "&cmd=snapPicture")));
        } else {
            setCookie("snapcmd", gVar.httpver + "://" + gVar.ip + ":" + gVar.port + "/cgi-bin/CGIProxy.fcgi?" + (urlEncode("usr=" + gVar.user + "&pwd=" + gVar.passwd + "&cmd=snapPicture")));
        }
        var a = $("<a href='/html/snap.html' target='_blank'></a>").get(0);
        if ($.browser.msie) {
            window.open(a);
        } else {
            if (document.createEvent) {
                var evObj = document.createEvent('MouseEvents')
                evObj.initEvent('click', true, false)
                a.dispatchEvent(evObj)
            } else if (document.createEventObject) {
                a.fireEvent('onclick')
            }
        }
    }

    function OpenSnapWindow() {
        var a = $("<a href='/html/snap.html' target='_blank'></a>").get(0);
        if ($.browser.msie) window.open(a);
        else {
            if (document.createEvent) {
                var evObj = document.createEvent('MouseEvents')
                evObj.initEvent('click', true, false)
                a.dispatchEvent(evObj)
            }
            else if (document.createEventObject) {
                a.fireEvent('onclick')
            }
        }
    }

    function SnapCall(xml) {
        var snapStart = xml.indexOf("snapPic/") * 1;
        var snapEnd = xml.indexOf(".jpg") * 1;
        if (snapStart == -1 || snapEnd == -1) {
            return;
        } else {
            if (gVar.httpver == "https") {
                setCookie("snapcmd", gVar.httpver + "://" + gVar.ip + ":" + mult_https_port[IFs] + "/snapPic/" + xml.substring(snapStart * 1 + 8, snapEnd * 1 + 4));
            } else {
                setCookie("snapcmd", gVar.httpver + "://" + gVar.ip + ":" + gVar.port + "/snapPic/" + xml.substring(snapStart * 1 + 8, snapEnd * 1 + 4));
            }
        }
    }

    $("#LVCapture").click(function () {
        if (gVar.ip == "" || gVar.port * 1 == 0) return;
        if (gVar.nUserRight >= 100) {
            setCookie("snapcmd", "http://" + gVar.ip + ":" + gVar.port + "/snapshot.cgi?user=" + urlEncode(gVar.user) + "&pwd=" + urlEncode(gVar.passwd));
            OpenSnapWindow();
        } else {
        		if (IsChromeSupportNacl())
        		{
        				gDvr.SnapPicture();
        		}
            else if (isEncy[IFs]) {
                //OpenSnapWindow();
                //RfParamCallNoShadow(SnapCall, "", "snapPicture");
                RfParamCallNoShadow("", "", "snapPicture");
            } else {
                Call();
            }
            //RfParamCallNoShadow("", "", "snapPicture");
        }
    })

    $("#LVRcA").click(function () {
        try { gDvr.Record(true); }
        catch (e) { }
    })
    $("#LVRc").click(function () {
        cutdownalarmrecord[IFs] = false;
        try { gDvr.Record(false); }
        catch (e) { }
    })

    $("#irOn").click(function () {
        //gVar.KCgi("cmd=openInfraLed");
        RfParamCallNoShadow("", "", "openInfraLed");
    })

    $("#irOff").click(function () {
        //gVar.KCgi("cmd=closeInfraLed");
        RfParamCallNoShadow("", "", "closeInfraLed");
    })

    //回放页面事件处理	
    //搜索按钮事件处理
    if (gDvr.nPlatFormShowTag * 1 == 1) {
        $("#plat_set").css("display", "block");
    }
    switch (lgCls.version) {
        case "SWANN":
            {
                $("#net_mobile").css("display", "none");
            }
            break;
        default:
            {
                $("#net_mobile").css("display", "block");
            }
            break;
    }
    var turnPage = false;
    function SwitchRecordPage() {
        turnPage = true;
        $("#RcSearch").click();
    }
    $("#rcListT").attr("tPage", 0);
    $("#rcListT").attr("page", 0);
    $("#rcListT").attr("isNan", 0);
    $("#RcSearch").click(function () {
        if (turnPage == false) {
            $("#rcListT").attr("isNan", 0);
            $("#rcListT").attr("page", 0);
        }
        turnPage = false;
        
        var startT = 0;
        var endT = 0;

        var numT = $("#rcListT").attr("page") * 1;
        var isNan = $("#rcListT").attr("isNan") * 1;
		
		    var d = $("#calday").val().split("-")
            var dateS = new Date();
            dateS.setUTCFullYear(d[0], d[1] * 1 - 1, d[2]);
			
            dateS.setUTCHours($("#rTime_SHour").val()*1, $("#rTime_SMinute").val()*1, 0, 0);
            startT = dateS.getTime() / 1000;
            

            var dateE = new Date();
            dateE.setUTCFullYear(d[0], d[1] - 1, d[2]);
			if($("#rTime_EMinute").val()*1==59&&$("#rTime_EHour").val()*1==23)
			{
            dateE.setUTCHours($("#rTime_EHour").val()*1, $("#rTime_EMinute").val()*1, 59, 0);
			}
			else
			{
				dateE.setUTCHours($("#rTime_EHour").val()*1, $("#rTime_EMinute").val()*1, 0, 0);
			}
			endT = dateE.getTime() / 1000;
			if(endT<=startT)
			{
		      ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_NORECORD"));
			  return ;
			}
		   $("#serword").css("display", "");
		   gVar.recordEndTime = endT;
		   gVar.recordStartTime = startT;
		
		   /*
        if ($("#leftretime").val() == 0) {
            //全时间
            startT = 0;
            endT = 0;
            gVar.recordStartTime = 0;
            gVar.recordEndTime = 0;
        }
        else if ($("#leftretime").val() == 1) {
            var d = $("#calday").val().split("-")
            var dateS = new Date();
            dateS.setUTCFullYear(d[0], d[1] * 1 - 1, d[2]);
            dateS.setUTCHours(0, 0, 0, 0);
            startT = dateS.getTime() / 1000;
            gVar.recordStartTime = startT;

            var dateE = new Date();
            dateE.setUTCFullYear(d[0], d[1] - 1, d[2]);
            dateE.setUTCHours(23, 59, 59, 0);
            endT = dateE.getTime() / 1000;
            gVar.recordEndTime = endT;
        }
        else {
            var calt = $("#calday").val().split("-");
            var dateS = new Date();
            dateS.setUTCFullYear(calt[0], calt[1] * 1 - 1, 1);
            dateS.setUTCHours(0, 0, 0, 0);
            startT = dateS.getTime() / 1000;
            gVar.recordStartTime = startT;

            var calte = 0;
            if (calt[1] <= 7) {
                if (calt[1] % 2 != 0) calte = 31; //calt[0] + "-" + calt[1] + "-" + 31;
                else if (calt[1] % 2 == 0 && calt[1] != 2) calte = 30; //calt[0] + "-" + calt[1] + "-" + 30;
                else {
                    if (((calt[0] % 4 == 0 && calt[0] % 100 != 0) || calt[0] % 400 == 0)) calte = 29; //calt[0] + "-" + calt[1] + "-" + 29;
                    else calte = 28; //calt[0] + "-" + calt[1] + "-" + 28;
                }
            }
            else if (calt[1] > 7) {
                if (calt[1] % 2 != 0) calte = 30; //calt[0] + "-" + calt[1] + "-" + 30;	
                else calte = 31; //calt[0] + "-" + calt[1] + "-" + 31;
            }

            var datee = new Date();
            datee.setUTCFullYear(calt[0], calt[1] * 1 - 1, calte);
            datee.setUTCHours(23, 59, 59, 0);
            endT = datee.getTime() / 1000;
            gVar.recordEndTime = endT;
        }*/
        var rDir = $("#leftrepath").val();
        $("#rcListT").attr("rDir", rDir);

        gVar.pbType = $("#pbRcType").val();
        if (gVar.playRecord == true) {
            gVar.pbType = $("#pbRcType").val();
            gVar.lastType = gVar.pbType;
            gVar.playRecord = false;
        }
        if (gVar.lastType != gVar.pbType) {
            gVar.lastType = gVar.pbType;
            gVar.pbRecord = false;
        }


        RfParamCall(function (xml) {
            $("#serword").css("display", "none");
            var res = XmlParser("result", xml) * 1;
            if (res != 0) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_SERTCHF"))
            } else {
                var total = XmlParser("totalCnt", xml) * 1;
                gVar.totalRecord = total;
                if (total <= 0) { $("#rcListT").empty(); $("#rcListM > div:first").empty(); $("#rcListM > div:last").empty(); ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_NORECORD")); return; }
                $("#rcListT, #rcListM").css("display", "");
                var num = XmlParser("curCnt", xml);
                var Page = ((total / 10) | 0) + ((total % 10 == 0) ? 0 : 1) - 1;
                if (Page >= 0) {
                    UI.FyHead("rcListM", ">div:first", ">div:last", Page, numT, isNan);
                }
                $("#rcListT").attr("tPage", Page);

                var rcl;
                $("#rcListT").empty();
                var str = ' <thead height="20"><th width="34">NO.</th><th width="114">' + lg.get("IDS_LEFT_WNAME") + '</th><th>' + lg.get("IDS_TYPE") + '</th></thead>'
                $("#rcListT").append(str);
                gVar.recordPath.length = 0;
                for (var i = 0; i < num; i++) {
                    gVar.recordPath[i] = XmlParser("record" + i, xml);
                    rcl = XmlParser("record" + i, xml).split("/");
                    var rectyp = "";
                    if (rcl[2].toLowerCase().indexOf("alarm") != -1) {
                        rectyp = lg.get("IDS_LEFT_ARM");
                    } else if (rcl[2].toLowerCase().indexOf("schedule") != -1) {
                        rectyp = lg.get("IDS_LEFT_PLAN");
                    } else if (rcl[2].toLowerCase().indexOf("normal") != -1) {
                        rectyp = lg.get("IDS_LEFT_NOMAL");
                    }

                    str = '<tr><td>' + (i + numT * 10 + 1) + '</td><td title=' + rcl[2] + '><div>' + rcl[2].substring(0, 8) + "..." + rcl[2].substring(rcl[2].length - 8, rcl[2].length) + '</div></td><td style="text-indent:0;">' + rectyp + '</td></tr>';
                    $("#rcListT").append(str);
                }
                if ($("#rcListT").attr("page") == "0") {
                    $("#rcListT tr td div:first").css("background-color", "transparent").removeClass("rcChoseAC");
                    $("#rcListT tr td div:first").css("background-color", "#FAD");
                    $("#rcListT tr td div:first").addClass("rcChoseAC");
                }
            }
        }, "", "getRecordList2&recordPath=" + rDir + "&startTime=" + startT + "&endTime=" + endT + "&recordType=" + $("#pbRcType").val() + "&startNo=" + numT * 10, "", 10000);
    })

    $("#RcReload").click(function () {
        RfParamCall(function (xml) {
            if (XmlParser("result", xml) * 1 == 0) {
                setTimeout(function () {
                    var b = document.getElementById("MaskLayout");
                    b.style.width = "250px";
                    b.style.height = document.body.offsetHeight + "px";
                    b.style.display = "block";
                    setTimeout(function () {
                        b.style.width = "250px";
                        b.style.height = document.body.offsetHeight + "px";
                        b.style.display = "none";
                    }, 5000);
                }, 500);
            }
        }, "", "reloadRecordindex");
    })

    $("#divReloadMusic").click(function () {
        RfParamCall(function (xml) {
            if (XmlParser("result", xml) * 1 == 0) {
                setTimeout(function () {
                    var b = document.getElementById("MaskLayout");
                    b.style.width = "250px";
                    b.style.height = document.body.offsetHeight + "px";
                    b.style.display = "block";
                    setTimeout(function () {
                        b.style.width = "250px";
                        b.style.height = document.body.offsetHeight + "px";
                        b.style.display = "none";
                    }, 5000);
                }, 500);
            }
        }, "", "setMusicDefaultListRefresh");
    })

    $("#leftrepath").change(function () {
        $("#rcListT").attr("page", 0);
    })

    $("#leftretime").change(function () {
        $("#rcListT").attr("page", 0);
    })

    $("#pbRcType").change(function () {
        $("#rcListT").attr("page", 0);
    })


    UI.FyHeadEvent("rcListM",
                   function (p, b) { $("#rcListT").attr("page", p); $("#rcListT").attr("isNan", b * 1); SwitchRecordPage(); },
                   function (p, b) { $("#rcListT").attr("page", p); $("#rcListT").attr("isNan", b * 1); SwitchRecordPage(); },
                   function () { return ($("#rcListT").attr("tPage") * 1) }
    );

    $("#rcListT tr td div").live("mouseover", function () {
        $(this).css("cursor", "default");
    }).live("click", function () {
        $("#rcListT tr td div").css("background-color", "transparent").removeClass("rcChoseAC");
        $(this).css("background-color", "#FAD");
        $(this).addClass("rcChoseAC");
    }).live("dblclick", function () {
        if (!gVar.bPbStop) {
            $("#pbBtnBt12").mousedown();
            gVar.dbOpenNew = true;
        }
        else {
            $("#pbBtnBt10").mousedown();
        }
    });
})

$(function(){	//config页面事件处理
	//config左边菜单点击事件
	$("div[id^='cfgmune_']").mouseover(function(){
		$(this).css("cursor", "pointer");
	}).click(function(){
		var id = $(this).attr("id").split("cfgmune_")[1];
		$(".configpanel").removeClass("configpanel").slideUp(0, function(){
			$("#cfgpanel_"+id).slideDown(300, function(){
				$(this).addClass("configpanel");
			});
		});
	});	
	
	//子菜单下面样式事件
	$(".notselected").mouseover(function(){
		$(this).css("cursor", "pointer");
		$(this).addClass("selecteda");
	}).mouseout(function(){
		$(this).removeClass("selecteda");
	}).click(function(){
		MasklayerShow();
		$(".selectedb").removeClass("selectedb");
		$(this).addClass("selectedb");
		showConfigChild(this);
	});
    
});
$("#liveVideo_NAA").change(function(){
   ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_NET_NAA_TIP"));
   var enable = $(this).val(); 
   RfParamCallNoShadow("","", "setNetworkAutoAdaptability&enable="+enable);
})

//视频遮挡，移动侦测在此页面中做处理
function showConfigChild($o){	//显示子页面
	gVar.SetPluginPos(0,0,0,0);
	gDvr.ChangeWndSize(-1);
	gDvr.ClearAreas();
	$("#avSheDel").css("display", "none");
	$("#avSheback").css("display", "none");
	$("#AmAlarmImg").css("display", "none");
	var name=$o.id;
	lanPage=name;
    if($o.id != "set_guid" && $("#setguid").attr("name") == "isDown"){
        $("#setGuidCountry").html("");
        $("#setGuidName").html("");
        $("#setGuidSoftAP").html("");
        $("#setGuidTime").html("");
        $("#setGuidWifi").html("");
        $("#setGuidIp").html("");
        $("#setGuidWelcome").attr("name", "").css("display", "none");
        $("#setGuidCountry").attr("name", "").css("display", "none");
        $("#setGuidName").attr("name", "").css("display", "none");
        $("#setGuidSoftAP").attr("name", "").css("display", "none");
        $("#setGuidTime").attr("name", "").css("display", "none");
        $("#setGuidWifi").attr("name", "").css("display", "none");
        $("#setGuidIp").attr("name", "").css("display", "none");
        $(".guidActive").removeClass("guidActive");
    }
    if ($o.id == "alarm_mv" || $o.id == "alarm_sud" || $o.id == "rc_jh" || $o.id == "alarm_io" || $o.id == "alarm_temperature" || $o.id == "alarm_humidity" || $o.id == "alarm_motion") {
		name="alarm";
	}	
	var $p = $("#"+name.split("_").join(""));

	if ($o.id != "alarm_mv") {
	    $("#MotionRegion").css("display", "none");
	}

	$(".cfgactive").removeClass("cfgactive").css("display","none");
    if($("#netsoftAP").attr("name") == "isDown"){
        $("#netsoftAP").attr("name", "");
        $("#netsoftAP").html("");
    }
    if ($("#bsbase").attr("name") == "isDown") {
        $("#bsbase").attr("name", "");
        $("#bsbase").html("");
    }
    if ($("#bstime").attr("name") == "isDown") {
        $("#bstime").attr("name", "");
        $("#bstime").html("");
    }
    if ($("#netwifi").attr("name") == "isDown") {
        $("#netwifi").attr("name", "");
        $("#netwifi").html("");
    }
    if ($("#netip").attr("name") == "isDown") {
        $("#netip").attr("name", "");
        $("#netip").html("");
    }
    if ($("#bscountry").attr("name") == "isDown") {
        $("#bscountry").attr("name", "");
        $("#bscountry").html("");
    }
	if ($p.attr("name") != "isDown"){
		$.get("html/cfg/"+name+".html?"+gVar.nDate,function(data,state){
			if (state != "success"){}
			if(name == "net_softAP" || name == "bs_base" || name == "bs_time" || name == "net_wifi" || name == "net_ip"){
                var dataPrefix = '<fieldset style="height:520px;"><legend><font size="5px" color="#4793e7"><strong><div id="';
                switch(name){
                    case "net_softAP":dataPrefix = dataPrefix + "NetSoftAPPwd";break;
                    case "bs_base":dataPrefix = dataPrefix + "BsBaset";break;
                    case "bs_time":dataPrefix = dataPrefix + "BsTimet";break;
                    case "net_wifi":dataPrefix = dataPrefix + "NetWifit";break;
                    case "net_ip":dataPrefix = dataPrefix + "NetIPt";break;
                    default:dataPrefix = dataPrefix + "";
                }
                data = dataPrefix + '"></div></strong></font></legend>' + data + '</fieldset>';
            }
            $p.html(data);
			$p.attr("name", "isDown").addClass("cfgactive").css({"display":"block","height":550});
			$.getScript("html/cfg/"+name+".js?"+gVar.nDate, null);
			
			lan(name);

			if ($o.id == "alarm_mv" || $o.id == "alarm_motion") {
				$("#AmMoSX").click();
			}
		})
	}else {
	    if (name == "bs_multi") {
	        if (bMaskHide) {
	            $("#" + name.split("_").join("") + "Rf").click();
	        }
	    } else {
	        $("#" + name.split("_").join("") + "Rf").click();
	    }
		$p.addClass("cfgactive").css("display","block");
        if($o.id == "set_guid"){
            $("#setGuidWelcome").addClass("guidActive").css("display", "block");
            $("#setGuidCountry").css("display", "none");
            $("#setGuidName").css("display", "none");
            $("#setGuidSoftAP").css("display", "none");
            $("#setGuidTime").css("display", "none");
            $("#setGuidWifi").css("display", "none");
            $("#setGuidIp").css("display", "none");
        }
        if ($o.id == "alarm_mv" || $o.id == "alarm_motion") {
			$("#AmMoSX").click();
		}
	}
}

/*var hue = new cursor();
var Bright = new cursor();
var Contrast = new cursor();
var Saturation = new cursor();
var Sharpness = new cursor();
hue.create("live_wd_sj");
Bright.create("live_wd_ld");
Contrast.create("live_wd_dbd");
Saturation.create("live_wd_bhd");
Sharpness.create("live_wd_rd");*/

