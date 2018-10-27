$(function(){
	jQuery("#DevIfTable tr:odd").addClass("t1");
    jQuery("#DevIfTable tr:even").addClass("t2");
  
	function Call(xml){
		$(xml).find("CGI_Result").children().not("result,year,mon,day,hour,min,sec").each(function(i){
			$("#DevIf_"+$(this).context.nodeName.toUpperCase()).html($(this).text());
		});
		
		var mon = XmlParser("mon", xml);
		var day = XmlParser("day", xml);
		var hour = XmlParser("hour", xml);
		var min = XmlParser("min", xml);
		var sec = XmlParser("sec", xml);
		$("#DevIfTime").html(XmlParser("year", xml) + "/" + (mon.length==1?"0"+mon:mon) + "/" + (day.length==1?"0"+day:day) + "   " + (hour.length==1?"0"+hour:hour) + ":" + (min.length==1?"0"+min:min) + ":" + (sec.length==1?"0"+sec:sec));
	    $("#DevIf_RC").html("2.0.1.1")
	    $("#DevIf_HARDVER").html(vsIf)
	}
	
	
	$("#devinfoRf").click(function(){
		RfParamCall(Call, "", "getDevInfo");
	});
	var obj = document.getElementById("DevInfobs");
	
	$("#devinfoRf").click();
});
