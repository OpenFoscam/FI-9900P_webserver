$(function(){
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
    
    $("#AmIsEnable_Man").change();
    $("#AmIsEnable_Man").change(function () {
        DivBox($(this).attr("checked") * 1 == 1, "#AlmTabel_Man");
        DivBox($(this).attr("checked") * 1 == 1, "#AmDiv_Man");
        DivBox($(this).attr("checked") * 1 == 1, "#setDiv");
        DivBox($(this).attr("checked") * 1 == 1, "#flowCountHuman");
        if ($(this).attr("checked") * 1 == 1) {

            $("#AmBox_Man").attr("bEnable", "bEnable");
            $("#AmLink_Man1").attr("disabled", "");
            if (isSoftAPMode == 1) {
                $("#AmLink_Man2").attr("disabled", "disabled");
                $("#AmLink_Man8").attr("disabled", "disabled");
            } else {
                $("#AmLink_Man2").attr("disabled", "");
                $("#AmLink_Man8").attr("disabled", "");
            }
            $("#AmLink_Man3").attr("disabled", "");
            $("#AmLink_Man4").attr("disabled", "");
            $('#slider').attr('disslider','');
            $("#PCAlarmSwitch").attr("disabled", "");
            $('#switch_flow').attr('disFlow','');
            $('#switch_boundingBox').attr('disFlow','');
            $("#tilt").attr("disabled", "");
            $("#level").attr("disabled", "");
        } else {
            $('#slider').attr('disslider','unslider');

            $('#switch_flow').attr('disFlow','disabled');

            $('#switch_boundingBox').attr('disFlow','disabled');
            
            $("#AmBox_Man").attr("bEnable", "disabled");
            $("#AmLink_Man1").attr("disabled", "");
            $("#AmLink_Man2").attr("disabled", "disabled");
           
            $("#AmLink_Man4").attr("disabled", "disabled");

            $("#AmLink_Man8").attr("disabled", "disabled");

            $("#AmLink_Man3").attr("disabled", "disabled");
            $("#PCAlarmSwitch").attr("disabled", "disabled");
            $("#tilt").attr("disabled", "disabled");
            $("#level").attr("disabled", "disabled");
            
        }
        setTimeout(function(){
            if($('#Set').val() == 1){
                DivBox($("#AmIsEnable_Man").attr("checked") * 1 == 1, "#setArea");
            }
        },100);
        
    });
    
    $("#setArea").css("display","none");

    var strHTML = "";
    for (var i = 0; i < 24; i++) {
        strHTML += "<div style='height:23px;float:left;width:27px; border:1px solid #70c8e6;border-left:none;overflow:hidden;'><div style='height:15px;overflow:hidden;line-height:15px;'>" + (i < 10 ? ('0' + i) : i) + "</div><div style='height:7px;width:27px;'><div  id='AmBox_Manc" + i * 2 + "' style='width:13px;height:7px;float:left;clear:left;border-top:1px solid #70c8e6;border-right:1px solid #70c8e6'></div><div   id='AmBox_Manc" + (i * 2 + 1) + "' style='width:13px;height:7px;float:left;border-top:1px solid #70c8e6;'></div></div></div>";
    }
    $("#AmHead_Man").html(strHTML);

    var astyle = "height:23px;float:left;width:55px; border:1px solid #70c8e6;border-bottom:none;overflow:hidden;"

    strHTML = "<div id='AmBoxAll_Man' style='" + astyle + "' name=''>" + lg.get("IDS_ALARM_WEEK_ALL") + "</div>";
    strHTML += "<div id='AmBox_Manr1' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_MONDAY") + "</div>";
    strHTML += "<div id='AmBox_Manr2' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_TUESDAY") + "</div>";
    strHTML += "<div id='AmBox_Manr3' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_WEDNESDAY") + "</div>";
    strHTML += "<div id='AmBox_Manr4' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_THURSDAY") + "</div>";
    strHTML += "<div id='AmBox_Manr5' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_FRIDAY") + "</div>";
    strHTML += "<div id='AmBox_Manr6' style='" + astyle + "' name=''>" + lg.get("IDS_WEEK_SATURDAY") + "</div>";
    strHTML += "<div id='AmBox_Manr7' style='" + astyle + " border-bottom:1px solid #70c8e6' name=''>" + lg.get("IDS_WEEK_SUNDAY") + "</div>";
    $("#AmXq_Man").html(strHTML);


    $("#am_DivBox_Man").divBox({ col: 7, height: 23, width: 13, bkColor: color, row: 48, bDownID: "AmBox_Man" });

    $("#AmBoxAll_Man").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        clickName = 0;
        if ($("#AmIsEnable_Man").attr("checked") * 1) {
            for (var i = 1; i <= 7; i++) {
                if ($("#AmBox_Manr" + i).attr("name") == "") clickName = clickName + 1;
            }
            if (clickName == 7) {
                $(this).attr("name", "isOk")
                $("div [id^='AmBox_Manr']").attr("name", "isOk");
                $("div [id^='AmBox_Manc']").attr("name", "isOk");
                $("#am_DivBox_Man >div").css("background-color", color)
            }
            else if (clickName == 0) {
                $(this).attr("name", "");
                $("div [id^='AmBox_Manr']").attr("name", "");
                $("div [id^='AmBox_Manc']").attr("name", "");
                $("#am_DivBox_Man >div").css("background-color", "transparent");
            }
            else {
                if ($(this).attr("name") != "isOk") {
                    $(this).attr("name", "isOk")
                    $("div [id^='AmBox_Manr']").attr("name", "isOk");
                    $("div [id^='AmBox_Manc']").attr("name", "isOk");
                    $("#am_DivBox_Man >div").css("background-color", color)
                } else if ($(this).attr("name") == "isOk") {
                    $(this).attr("name", "");
                    $("div [id^='AmBox_Manr']").attr("name", "");
                    $("div [id^='AmBox_Manc']").attr("name", "");
                    $("#am_DivBox_Man >div").css("background-color", "transparent");
                }
            }
        }
    });

    $("div [id^='AmBox_Manr']").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        if ($("#AmIsEnable_Man").attr("checked") * 1) {
            var r = $(this).attr("id").split("AmBox_Manr")[1] * 1 - 1;
            if ($(this).attr("name") != "isOk") {
                $(this).attr("name", "isOk")
                $("div[id^='AmBox_Man_" + r + "_']").css("background-color", color);
            } else {
                $(this).attr("name", "")
                $("div[id^='AmBox_Man_" + r + "_']").css("background-color", "transparent");
            }
        }
    });

    $("div [id^='AmBox_Manc']").mouseover(function () {
        $(this).css("cursor", "pointer");
    }).click(function () {
        if ($("#AmIsEnable_Man").attr("checked") * 1) {
            var c = $(this).attr("id").split("AmBox_Manc")[1] * 1;
            if ($(this).attr("name") != "isOk") {
                $(this).attr("name", "isOk");
                $("div[id^='AmBox_Man'][id$='_" + c + "']").css("background-color", color);
            } else {
                $(this).attr("name", "")
                $("div[id^='AmBox_Man'][id$='_" + c + "']").css("background-color", "transparent");
            }
        }
    });

    function getPersonAlarm(xml)
    {
    SetTimeView(xml);
    var AmIsEnable_ManVal=$(xml).find("isEnable").text()*1;
    $("#AmIsEnable_Man").val(AmIsEnable_ManVal);
    if(AmIsEnable_ManVal == 1){
        $("#AmIsEnable_Man").attr('checked','checked');
    }else{
        $("#AmIsEnable_Man").attr('checked','');
    }

    $("#AmIsEnable_Man").change();

    var SetVal=$(xml).find('settingType').text()*1;
    $("#Set").val(SetVal);

    $("#Set").change();

    var senVal=$(xml).find('sensitivity').text()*1;
    try{
        sliderSet("#strip_left","#slider","#sensitivity_value",senVal);
    }catch(e){
        console.log(e);
    }
    $("#sensitivity_value").html(senVal);
    
    var switchVal=$(xml).find('isHumanCountEnable').text()*1;
    $("#switch_flow").attr("toggle",switchVal);
    personCountToggle(switchVal);


    var manFlowVal=$(xml).find("HumanNumber").text()*1;
    $("#manFlow").html(manFlowVal);
    

    var angleVal=$(xml).find('cameraAngle').text()*1;
    if(angleVal == 1){
        $("#level").attr("checked","checked");
        $("#tilt").attr("checked","");
    }else{
        $("#tilt").attr("checked","checked");
        $("#level").attr("checked","");
    }

    var AmCTimeVal=$(xml).find('snapInterval').text()*1;
    $("#AmCTime_Man").val(AmCTimeVal);

    var defaultAIVal=$(xml).find('triggerInterval').text()*1;
    $("#Amtrigger_Man").val(defaultAIVal);
    
    

    var linkpak = $(xml).find("linkage").text() * 1;
    $("#AmLink_Man8").attr("checked", (linkpak & (0x01 << 7)) >> 7);
    
    $("#AmLink_Man4").attr("checked", (linkpak & (0x01 << 3)) >> 3);
    $("#AmLink_Man3").attr("checked", (linkpak & (0x01 << 2)) >> 2);
    $("#AmLink_Man2").attr("checked", (linkpak & (0x01 << 1)) >> 1);
    $("#AmLink_Man1").attr("checked", (linkpak & 0x01));



    var HumanBoxingSwitchVal = $(xml).find("isHumanBoxingEnable").text()*1;
    $("#switch_boundingBox").attr("state",HumanBoxingSwitchVal);
    boundingBoxState(HumanBoxingSwitchVal);
    //$("#Set").change();
	RfParamCall(getPCAudioAlarmCfgInHumanDetect, "", "getPCAudioAlarmCfg");
    };

	function getPCAudioAlarmCfgInHumanDetect (xml) {
        var isOpenPCSoundAlarm = $(xml).find("isEnablePCAudioAlarm").text() * 1;
		isOpenPCSoundAlarm = isOpenPCSoundAlarm >> 5;
		$("#PCAlarmSwitch").attr("checked", isOpenPCSoundAlarm);
	};
	
    $("#alarmpersonRf").click(function(){
        MasklayerHide();
        $("#AmIsEnable_Man").change();
        try {
            RfParamCall(getPersonAlarm, "","getHumanDetectConfig");
        } catch (e) {
            alert("" + e);
        }
        

    });

    $("#Set").change(function(){
    	var $this=$(this);
    	if($this.val()*1==1){
            $("#setArea").css("display","");
    	}else{
    		$("#setArea").css("display","none");
    	}

    });
    $("#tilt").click(function(){
        if($("#tilt").attr('checked',"checked")){
            $("#tilt").attr("checked","checked");
            $("#level").attr("checked","");
        }else{
            $("#level").attr("checked","checked");
            $("#tilt").attr("checked","");
        }
    })
    $("#level").click(function(){
        if($("#level").attr('checked',"checked")){
            $("#level").attr("checked","checked");
            $("#tilt").attr("checked","");
        }else{
            $("#tilt").attr("checked","checked");
            $("#level").attr("checked","");
        }
    })
    $("#alarmpersonRf").click();
    UI.Clor("strip_div","slider","strip_left",0,function($o,v){$("#sensitivity_value").html(v|0);});
   
    function sliderSet(sliderLeft,sliderBnt,valueDiv,value)
    {
     
     $(sliderLeft).css("width",value+"px");
     
     $(sliderBnt).css("margin-left",value+"px");
     
     $(valueDiv).html(value);
     
     $("#sensitivity_value").html(value);
     

    }
    function SavePersonAlarm(xml)
    {
        if ($("#AmIsEnable_Man").attr("checked") * 1 == true && $("#AmLink_Man4").attr("checked") * 1 == true) {
            RfParamCall(function(xml) {
                if ($(xml).find("isEnable").text() * 1 == true) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_RCPLAN_TIP7"));
                }
            }, "", "getScheduleRecordConfig");
        }
    }

    function SetTimeView(xml) {
        var weekAll = true;
        for (var i = 0; i <= 6; i++) {
            var colorA;
            var sch = $(xml).find("schedule" + i).text() * 1;
            var week;
            if (sch == 281474976710655) {
                week = i + 1;
                $("#AmBox_Manr" + week).attr("name", "isOk");
            }
            else {
                weekAll = false;
            }
            var s = sch.toString(2); //十进制转换为二进制
            s = s.split("").reverse().join(""); //二进制倒序
            for (var j = 0; j < 48; j++) {
                var n = s.charAt(j); //第j位数据
                n = n == "" ? 0 : n;
                $("#AmBox_Manc" + j).attr("value", n);
                if (n == 1) colorA = color;
                else colorA = "transparent"
                $("#AmBox_Man_" + i + "_" + j).css("background-color", colorA);
            }
        }
        if (weekAll == true) {
            $("#AmBoxAll_Man").attr("name", "isOk")
            $("div [id^='AmBox_Manr']").attr("name", "isOk");
            $("div [id^='AmBox_Manc']").attr("name", "isOk");
        }
    };
	
    function HumanAlarmPCRing(){
        
        var humalarm = 0;

        if ($("#PCAlarmSwitch").attr("checked") * 1 == 1) {
            humalarm = 1;
        } else {
            humalarm = 0;
        }
		
        var isEnablePCAudioAlarm = humalarm << 5;
		
        RfParamCall(null, "", "setPCAudioAlarmCfg&isEnablePCAudioAlarm=" + isEnablePCAudioAlarm);

    };
	
   $("#AlarmpersonSave").click(function(){
   
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
                colorB = $("#AmBox_Man_" + i + "_" + j).css("background-color");
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

   var alarmPersonEnable = $("#AmIsEnable_Man").attr("checked")*1;
   var alarmSet = $("#Set").val();
   var sensitivityPerson = $("#sensitivity_value").html()*1;
   var humanCountEnable = $("#switch_flow").attr("toggle")*1;
   var manFlowCount = $("#manFlow").html()*1;

   var cameraAngleVal;
   if($('#tilt').attr('checked') == true){
        cameraAngleVal =0;
   }else{
        cameraAngleVal =1;
   }
    var amlink = new Array();
    amlink[0] = 0;
    for (var i = 1; i < 9; i++) {
        if ($("#AmLink_Man" + i).attr("checked") * 1 != 1 && $("#AmLink_Man" + i).attr("checked") * 1 != 0) {
            amlink[i] = 0;
        }
        else
            amlink[i] = $("#AmLink_Man" + i).attr("checked") * 1;
    }
    var linkAction = amlink[1]  + (amlink[2] << 1) + (amlink[3] << 2) + (0 << 3) + (amlink[4] << 3) + (0 << 4) + (amlink[5] << 4) + (0 << 5) + (amlink[6] << 5) + (0 << 6) + (amlink[7] << 6) + (0 << 7) + (amlink[8] << 7);  
    var snapInterval = $("#AmCTime_Man").val()*1;
    
    var triggerIntervalMan = $("#Amtrigger_Man").val()*1;

    var HumanBoxingSwitch = $("#switch_boundingBox").attr("state")*1;
    RfParamCall(SavePersonAlarm, "","setHumanDetectConfig&isEnable=" + alarmPersonEnable +"&settingType="+ alarmSet +"&sensitivity="+ sensitivityPerson + "&isHumanCountEnable=" + humanCountEnable + "&HumanNumber=" + manFlowCount +"&cameraAngle="+ cameraAngleVal+ "&linkage=" +linkAction + "&snapInterval=" + snapInterval+ "&triggerInterval=" + triggerIntervalMan+ "&isHumanBoxingEnable="+ HumanBoxingSwitch + str );

    //var cmd = "setHumanDetectConfig&isEnable=" + alarmPersonEnable +"&settingType="+ alarmSet +"&sensitivity="+ sensitivityPerson + "&isHumanCountEnable=" + humanCountEnable + "&HumanNumber=" + manFlowCount +"&cameraAngle="+ cameraAngleVal+ "&linkage=" +linkAction + "&snapInterval=" + snapInterval+ "&triggerInterval=" + triggerIntervalMan+ str ;
    //console.log("cmd=" + cmd);
    
    setTimeout(function(){
         HumanAlarmPCRing();
    },300);
    });
 
    
  $("#switch_flow").click(function(e){
   e = e || event;
   if($('#switch_flow').attr('disFlow') == 'disabled'){
    return;
   }
   var target = e.target || e.srcElement;
   var toggle;
   if(target.tagName.toLowerCase()==="img")
   {
     toggle = $(this).attr("toggle")*1;
     if(toggle===0)
     {
      $(this).attr("toggle","1");
      toggle = 1;
     }
     else
     {
      $(this).attr("toggle","0");
      toggle = 0;
     }
    personCountToggle(toggle);
   }

  });

 function personCountToggle(toggle)
 {
 
  if(toggle===1)
     {
      $("#personCountToggle").css("margin-left","-25px");
      $("#switchColor").attr('src', "../images/u78.png");
      $("#flow_man").show();
     }
     else
     {
      $("#personCountToggle").css("margin-left","-54px");
      $("#switchColor").attr('src', "../images/u73.png");
      $("#flow_man").hide();
      
     }
 };
 $("#switch_boundingBox").click(function(e){
    e = e || event;
    if($('#switch_boundingBox').attr('disFlow') == 'disabled'){
        return;
    }
    var target = e.target || e.srcElement;
    var state;
    if(target.tagName.toLowerCase() === "img")
    {
        state = $(this).attr("state")*1;
        if(state === 0){
            $(this).attr("state","1");
            state = 1;
        }else{
            $(this).attr("state","0");
            state = 0;
        }
    boundingBoxState(state);
    }
 });
 function boundingBoxState(state){
    if(state === 1)
     {
      $("#switchSign").css("margin-left","-25px");
      $("#switchBackground").attr('src', "../images/u78.png");
     }
     else
     {
      $("#switchSign").css("margin-left","-54px");
      $("#switchBackground").attr('src', "../images/u73.png");
      
     }
 }
})