(function($){
	$.fn.divBox = function(options){
		
		var opts = jQuery.extend({},jQuery.fn.divBox.defaults, options);
			
		function initHTML(e){
			var strHTML = "";
			var nMax = opts.row - 1;
			var border = "1px solid "+opts.borderColor;
			for (var j=0; j<opts.col; j++){
				strHTML += ("<div id='"+opts.bDownID+"_"+j+"_"+0+"' class='"+opts.nclass+"' style='height:"+opts.height+"px;float:left;clear:left;overflow:hidden;width:"+opts.width+"px; border-bottom:"+border+";border-right:"+border+";'></div>");
				for (var i=1; i<opts.row; i++){
					strHTML += ("<div id='"+opts.bDownID+"_"+j+"_"+i+"' class='"+opts.nclass+"' style='height:"+opts.height+"px;float:left;overflow:hidden;width:"+opts.width+"px; border-bottom:"+border+";border-right:"+border+";'></div>");
				}
			}
			strHTML += "<div id='"+opts.bDownID+"' style='display:none' bEnable="+ (opts.bEnable?'bEnable':'') +"></div>";
			e.html(strHTML);
		}
		
		return this.each(function() {
			initHTML($(this));
			opts.bDownID = "#"+opts.bDownID;
			$("#"+$(this).attr("id") + ">div").mouseover(function(){
				if (!opts.bEnable) return;
				//$(this).css("cursor", "pointer");
				if ($(opts.bDownID).attr("name") == "down"){
					if ($(this).css("background-color") != opts.bkColor){
						$(this).css("background-color", opts.bkColor);
					}else{
						$(this).css("background-color", opts.parentColor);
					}
				}
			}).mousedown(function(){
				if ($(opts.bDownID).attr("bEnable") != "bEnable") return;
				$(opts.bDownID).attr("name", "down");
				//$(this).css("cursor", "pointer");
				if ($(this).css("background-color") != opts.bkColor){
					$(this).css("background-color", opts.bkColor);
				}else{
					$(this).css("background-color", opts.parentColor);
				}
			}).mouseup(function(){
				$(opts.bDownID).attr("name", "")
			});
			$(document).mouseup(function(){
				$(opts.bDownID).attr("name", "")
			});
		});  
	};
	
	
	
	jQuery.fn.divBox.defaults = {
		borderColor: "#70c8e6",
		parentColor: "transparent",
		bkColor:"#f00",
		height: 23,
		width: 30,
		row:24,
		nclass:"",
		col: 1,
		bDownID:"bDownIDNew",
		bEnable:true
	};
})(jQuery);

//timer
(function($){
	var opts;
	$.fn.timer = function(options){		
		opts = jQuery.extend({},jQuery.fn.timer.defaults, options);
		return this.each(function() {
			jQuery.fn.timer.InsertHtml($(this), opts.Type);
		});		
	};
	
	jQuery.fn.timer.InsertHtml = function(obj, type){
		var id = obj.attr("id");
		var strHTML = ("<table style='text-indent:0px;' class='timer'><tr><td><div ><select id='"+id+"_Hour' class='timerHour'></select></div></td><td>:</td><td><div><select id='"+id+"_Min' class='timerMin'></select></div></td><td>:</td><td><div><select id='"+id+"_Sec' class='timerSec'></select></div></td><th style='border:0px'><div><select id='"+id+"_Type' class='timerType'></select></div></th></tr></table>");
			
		obj.html(strHTML);
		
		$("#"+id+"_Type").append('<option value="0">AM</option>');
		$("#"+id+"_Type").append('<option value="1">PM</option>');
		
		for (var i=0; i<60; i++){
			$("#"+id+"_Min,#"+id+"_Sec").append('<option value="'+i+'">'+((""+i).length<2?"0"+i:i)+'</option>');
		}
		
		if (type == 0){ //12
			$("#"+id+"_Type").css("display", "block");
			$("#"+id+"_Hour").empty();
			$("#"+id+"_Hour").append('<option value="0">12</option>')
			for (var i=1; i<12; i++){
				$("#"+id+"_Hour").append('<option value="'+i+'">'+((""+i).length<2?"0"+i:i)+'</option>');
			}
		}else{	//24
			$("#"+id+"_Type").css("display", "none");
			$("#"+id+"_Hour").empty();
			for (var i=0; i<24; i++){
				$("#"+id+"_Hour").append('<option value="'+i+'">'+((""+i).length<2?"0"+i:i)+'</option>');
			}
		}
	}
	
	jQuery.fn.timer.GetTimeFor24 = function(obj){
		var id = obj.attr("id");
		var timerHour = $("#"+id+"_Hour").val()*1;
		var timerMin = $("#"+id+"_Min").val()*1;
		var timerSec = $("#"+id+"_Sec").val()*1;
		var zs = $("#"+id+"_Type").val()*1;
		if ($("#"+id+"_Type").css("display") != "none"){
			if (zs == 0){ 
				return (timerHour+ ":" + timerMin + ":" + timerSec);
			}else{
				return ((timerHour+12)+ ":" + timerMin + ":" + timerSec);
			}
		}else{
			return (timerHour+ ":" + timerMin + ":" + timerSec);
		}
	}
	
	jQuery.fn.timer.SetTimeIn24 = function(time, obj, type){
		var id = obj.attr("id");
		var timerHour = time.split(":")[0]*1;
		var timerMin = time.split(":")[1]*1;
		var timerSec = time.split(":")[2]*1;
		var timerType = 0;
		
		//$.fn.timer.InsertHtml(obj, type);
		if(type == 0){      //12
		    if(timerHour>=12){
		        if(timerHour>12){
		            timerHour = timerHour-12;
		        }else{
                    timerHour = 0;
                }
		        timerType = 1;
		    }else{
		        timerType = 0;
		    }
		    $("#"+id+"_Hour").val(timerHour);
		    $("#"+id+"_Type").css("display", "block");
		}else{      //24
            $("#"+id+"_Type").css("display", "none");
		    $("#"+id+"_Hour").val(timerHour);
		}
		$("#"+id+"_Min").val(timerMin);
		$("#"+id+"_Sec").val(timerSec);
		$("#"+id+"_Type").val(timerType);
	}
	
	jQuery.fn.timer.ChangeType = function (type, obj) {
		var id = obj.attr("id");
		var timerHour = $("#"+id+"_Hour").val()*1;
		var timerMin = $("#"+id+"_Min").val()*1;
		var timerSec = $("#"+id+"_Sec").val()*1;
		var zs = $("#"+id+"_Type").val()*1;
		//重绘timer
		//if(opts.Type != type){
			//opts.Type = type;
			if (type == 0){ //12
				$("#"+id+"_Type").css("display", "block");
				$("#"+id+"_Hour").empty();
				$("#"+id+"_Hour").append('<option value="0">12</option>')
				for (var i=1; i<12; i++){
					$("#"+id+"_Hour").append('<option value="'+i+'">'+((""+i).length<2?"0"+i:i)+'</option>');
				}
			}else{	//24
				$("#"+id+"_Type").css("display", "none");
				$("#"+id+"_Hour").empty();
				for (var i=0; i<24; i++){
					$("#"+id+"_Hour").append('<option value="'+i+'">'+((""+i).length<2?"0"+i:i)+'</option>');
				}
			}
		//}
		
		//时间计算
		if (type == 1){	//12 -> 24
			$("#"+id+"_Type").css("display", "none");
			if (zs == 0){	//AM
				$("#"+id+"_Hour").val(timerHour);
			}else{	//PM
				$("#"+id+"_Hour").val(timerHour+12);
			}
		}else {	//24 -> 12
			$("#"+id+"_Type").css("display", "block");
			if (timerHour < 12){	//AM
				$("#"+id+"_Type").val(0);
				$("#"+id+"_Hour").val(timerHour);
			}else {	//PM
				$("#"+id+"_Type").val(1);
				$("#"+id+"_Hour").val(timerHour-12);
			}
		}
		
		$("#"+id+"_Min").val(timerMin)
		$("#"+id+"_Sec").val(timerSec)
	};
	
	jQuery.fn.timer.defaults = {
		Type:1	//0--12小时制，1--24小时制
	};
})(jQuery);

(function($) {
	jQuery.fn.backgroundPosition = function() {
		var bgPosition = $(this).css('background-position');
		if(typeof(bgPosition) == 'undefined') {
			return $(this).css('background-positionX') + ' ' + $(this).css('background-positionY');
	  	}else{
	   		return bgPosition;
	  	}
	};
})(jQuery);