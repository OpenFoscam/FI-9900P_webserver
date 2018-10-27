$(function(){
	MasklayerHide();
	$("#bscountryRf").click(function(){
		MasklayerHide();
	});
	var  arrayA=new Array();
	arrayA = ["America","Brazil","Canada","Colombia","Costa Rica","Guatemala","Japan","Korea","Mexico","Panama","Peru","Philippines","Saudi Arabia","Surinam","Taiwan","Venezuela",
	"美国","巴西","加拿大","哥伦比亚","哥斯达黎加","危地马拉","日本","韩国","墨西哥","巴拿马","秘鲁","菲律宾","沙特阿拉伯","苏里南","中国台湾","委内瑞拉"];

	var  arrayB=new Array();
	arrayB = ["Andorra","Argentina","Australia","Austria","Bahrain","Belgium","Bolivia","Bulgaria","Chech","Chile","China",
	"Croatia","Cyprus","Dominica","Dubai","Finland","France","Georgia","Germany","Greece","Hong Kong","Hungary","Iceland",
	"India","Indonesia","Iran","Israel","Italy","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Latvia","Madagascar",
	"Malaysia","Moldova","Namibia","Netherlands","New Zealand","Nigeria","Norway","Poland","Portugal","Qutar","Romania","Russia",
	"Serbia","Singapore","Slovenia","South Africa","Spain","Sri Lanka","Switzerland","Thailand","Turkey","Ukraine","United Kingdom",
	"Uruguay","Vietnam","Others","安道尔","阿根廷","澳大利亚","奥地利","巴林","比利时","玻利维亚","保加利亚","捷克","智利","中国","克罗地亚","塞浦路斯",
	"多米尼加","迪拜","芬兰","法国","格鲁吉亚","德国","希腊","中国香港","匈牙利","冰岛","印度","印度尼西亚","伊朗","以色列","意大利","约旦",
	"哈萨克斯坦","肯尼亚","科威特","吉尔吉斯斯坦","拉脱维亚","马达加斯加","马来西亚","摩尔多瓦","纳米比亚","荷兰","新西兰",
	"尼日利亚","挪威","波兰","葡萄牙","卡塔尔","罗马尼亚","俄罗斯","塞尔维亚","新加坡","斯洛文尼亚","南非","西班牙","斯里兰卡","瑞士",
	"泰国","土耳其","乌克兰","英国","乌拉圭","越南","其他"];

	var arr=new Array();
	arr[0]=lg.get("America");arr[1]=lg.get("Andorra");arr[2]=lg.get("Argentina");
	arr[3]=lg.get("Australia");arr[4]=lg.get("Austria");arr[5]=lg.get("Bahrain");
	arr[6]=lg.get("Belgium");arr[7]=lg.get("Bolivia");arr[8]=lg.get("Brazil");
	arr[9]=lg.get("Bulgaria");arr[10]=lg.get("Canada");arr[11]=lg.get("Chech");
	arr[12]=lg.get("Chile");arr[13]=lg.get("China");arr[14]=lg.get("Colombia");
	arr[15]=lg.get("Costa Rica");arr[16]=lg.get("Croatia");arr[17]=lg.get("Cyprus");
	arr[18]=lg.get("Dominica");arr[19]=lg.get("Dubai");arr[20]=lg.get("Finland");
	arr[21]=lg.get("France");arr[22]=lg.get("Georgia");arr[23]=lg.get("Germany");
	arr[24]=lg.get("Greece");arr[25]=lg.get("Guatemala");arr[26]=lg.get("Hong Kong");
	arr[27]=lg.get("Hungary");arr[28]=lg.get("Iceland");arr[29]=lg.get("India");
	arr[30]=lg.get("Indonesia");arr[31]=lg.get("Iran");arr[32]=lg.get("Israel");
	arr[33]=lg.get("Italy");arr[34]=lg.get("Japan");arr[35]=lg.get("Jordan");
	arr[36]=lg.get("Kazakhstan");arr[37]=lg.get("Kenya");arr[38]=lg.get("Korea");
	arr[39]=lg.get("Kuwait");arr[40]=lg.get("Kyrgyzstan");arr[41]=lg.get("Latvia");
	arr[42]=lg.get("Madagascar");arr[43]=lg.get("Malaysia");arr[44]=lg.get("Mexico");
	arr[45]=lg.get("Moldova");arr[46]=lg.get("Namibia");arr[47]=lg.get("Netherlands");
	arr[48]=lg.get("New Zealand");arr[49]=lg.get("Nigeria");arr[50]=lg.get("Norway");
	arr[51]=lg.get("Panama");arr[52]=lg.get("Peru");arr[53]=lg.get("Philippines");
	arr[54]=lg.get("Poland");arr[55]=lg.get("Portugal");arr[56]=lg.get("Qutar");
	arr[57]=lg.get("Romania");arr[58]=lg.get("Russia");arr[59]=lg.get("Saudi Arabia");
	arr[60]=lg.get("Serbia");arr[61]=lg.get("Singapore");arr[62]=lg.get("Slovenia");
	arr[63]=lg.get("South Africa");arr[64]=lg.get("Spain");arr[65]=lg.get("Sri Lanka");
	arr[66]=lg.get("Surinam");arr[67]=lg.get("Switzerland");arr[68]=lg.get("Taiwan");
	arr[69]=lg.get("Thailand");arr[70]=lg.get("Turkey");arr[71]=lg.get("Ukraine");
	arr[72]=lg.get("United Kingdom");arr[73]=lg.get("Uruguay");arr[74]=lg.get("Venezuela");
	arr[75]=lg.get("Vietnam");arr[76]=lg.get("Others");
	var list="";
	for(var i=0;i<arr.length;i++){
		list+="<li>"+arr[i]+"</li>";
	}
	document.getElementById("ulList").innerHTML=list;
	$("#dropDown").click(function(){
		if($("#countryList1").css("display")=="none")
        {
        $("#countryList1").css("display","");
        }
        else
        {
        $("#countryList1").css("display","none");
        }
	})
	$(document).click(function(e){
        e = e || event;
        var target = e.target || e.srcElement;
		if(target.id != "dropDown")
		{
			$("#countryList1").css("display","none");
		}
    })
    $("#ulList li").click(function(){
    	$("#country").val($(this).text());
    	
    })
    
    $("#bsCountrySave").click(function(){
    	if(gVar_first.outdoorFlag == 1){
    		RfParamCallNoShadow("", "", "setPwrFreq&freq=2");
    	}else{
    		var countryIndex1 = $.inArray($("#country").val(), arrayA);
	    	var countryIndex2 = $.inArray($("#country").val(), arrayB);
	    	if(countryIndex1 != -1){
	    		RfParamCallNoShadow("", "", "setPwrFreq&freq=0");
	    	}else if(countryIndex2 != -1){
	    		RfParamCallNoShadow("", "", "setPwrFreq&freq=1");
	    	}
    	}
    	
    });
    

})