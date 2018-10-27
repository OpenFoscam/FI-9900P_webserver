$(function(){	
	var page = 0;
	var pageCnt = 10;
	var tPage = 0;
	var isNan = false;
	function Call(xml){
		var total = XmlParser("totalCnt", xml);
		var num = XmlParser("curCnt", xml);
		tPage = ((total / pageCnt) | 0) + ((total % pageCnt == 0)?0:1) - 1;
		
		
		UI.FyHead("devLogTHead", " th:nth-child(2)", " th:last", tPage, page, isNan);
		$("#devLogTHead").css("border-bottom", "1px solid #FFFFFF");
		
		var usr, str;
		for(var i=0; i<num; i++){
			usr = XmlParser("log"+i, xml).split("+");
			var data = new Date(usr[0]*1000);
			var year = data.getUTCFullYear();
			var month = data.getUTCMonth()+1;
			var day = data.getUTCDate();
			var hour = data.getUTCHours();
			var minutes = data.getUTCMinutes();
			var sec = data.getUTCSeconds();
			month = month.toString().length == 2?month:"0"+month;
			day = day.toString().length == 2?day:"0"+day;
			hour = hour.toString().length == 2?hour:"0"+hour;
			minutes = minutes.toString().length == 2?minutes:"0"+minutes;
			sec = sec.toString().length == 2?sec:"0"+sec;
			var lognr = "";
			if(usr[3] == 0) lognr = lg.get("IDS_DEV_SYSSTALOG");
			else if(usr[3] == 1) lognr = lg.get("IDS_DEV_GOALARM");
			else if(usr[3] == 2) lognr = lg.get("IDS_DEV_SUDALARM");
			else if(usr[3] == 3) lognr = lg.get("IDS_SERVER_LOGIN");
			else if(usr[3] == 4) lognr = lg.get("IDS_DEV_DOMELOG");
			else if(usr[3] == 6) lognr = lg.get("IDS_DEV_IOALARM");
			else if (usr[3] == 7) lognr = lg.get("IDS_DEV_TEMPERATURE_ALARM");
			else if (usr[3] == 8) lognr = lg.get("IDS_DEV_HUMIDITY_ALARM");
			else if (usr[3] == 9) lognr = lg.get("IDS_DEV_HUMAN_ALARM");
			else lognr = lg.get("IDS_DEV_NOONLINE");
			str = '<tr style="border-bottom:1px solid #FFFFFF"><td>'+(i+1+page*pageCnt)+'</td><td>'+year+ "-" +month+ "-" +day+ " " +hour+":"+minutes+":"+sec+'</td><td>'+usr[1]+'</td><td>'+num2ip(usr[2])+'</td><td>'+lognr+'</td></tr>';
			$("#devLogTable").append(str);
		}
		
		jQuery("#devLogTable tr:odd").addClass("t1");
   		jQuery("#devLogTable tr:even").addClass("t2");
	}
	
	UI.FyHeadEvent("devLogTHead", function(p,b){
		page=p;isNan=b;
		$("#devLogTable tr").not(":first").remove();
		RfParamCall(Call, "", "getLog&offset="+page*10+"&count="+pageCnt);
	}, function(p,b){
		page=p;isNan=b;
		$("#devLogTable tr").not(":first").remove();
		RfParamCall(Call, "", "getLog&offset="+page*10+"&count="+pageCnt);
	}, function(){return(tPage)});
	
	

	$("#devlogRf").click(function(){
		$("#devLogTable tr").not(":first").remove();
		RfParamCall(Call, "", "getLog&offset="+page*10+"&count="+pageCnt);
	});
	$("#devlogRf").click();
});