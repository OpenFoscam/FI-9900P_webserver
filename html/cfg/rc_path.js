$(function () {
    MasklayerHide();
    var nRecordPath = 0;
    try { gDvr.Test(); } catch (e) { $("#rcPathps1,#rcPathps2,#rcPathps0").css("display", "none") }
    function SpaceToString(space) {
        var isInt = true;
        if (space >= 1024 * 1024 * 1024) {
            space = (space / (1024 * 1024 * 1024)) + "";
            for (var i = 0; i < space.length; i++) {
                if (space.charAt(i) == ".") { isInt = false; break; }
            }
            if (isInt == false) {
                space = space.split(".")[0] + "." + ("" + space.split(".")[1]).charAt(0) + " TB";
            }
            else {
                space = space.split(".")[0] + ".0" + " TB";
            }
        }
        else if (space >= 1024 * 1024) {
            space = (space / (1024 * 1024)) + "";
            for (var i = 0; i < space.length; i++) {
                if (space.charAt(i) == ".") { isInt = false; break; }
            }
            if (isInt == false) {
                space = space.split(".")[0] + "." + ("" + space.split(".")[1]).charAt(0) + " GB";
            }
            else {
                space = space.split(".")[0] + ".0" + " GB";
            }
        } else if (space >= 1024) {
            space = space / 1024 + "";
            for (var i = 0; i < space.length; i++) {
                if (space.charAt(i) == ".") { isInt = false; break; }
            }
            if (isInt == false) {
                space = space.split(".")[0] + "." + (space.split(".")[1]).charAt(0) + " MB";
            }
            else {
                space = space.split(".")[0] + ".0" + " MB";
            }
        } else {
            space = space + " KB";
        }
        return space;
    }

    function Call(xml) {
        var Pathpat = $(xml).find("path").text() * 1;
        if ((gVar_first.reserve4 >> 1 & 0x01) == 1) {  //part 1080P Dev not suppot record to sd card.  1-not support to sd  0-support
            $("#rcPathSD").css("display", "none");
        }
        if (gVar_first.sdFlag == 0) {
            $("#RcPath").val(Pathpat);
            $("#rcPathSDCard").remove();
            $("#rcPathSDirF").css("display", "none");
            $("#rcPathSDCardF").css("display", "none");
            $("#rcPathSDAndCloud").remove();
            //$("#RcPath").attr("disabled","disable");
            return;
        } else {
            if ((gVar_first.reserve1 & (0x01)) == 0) {
                $("#rcPathSDAndCloud").remove();
            }
        }
        nRecordPath = Pathpat;
        $("#RcPath").val(Pathpat);
        var free = $(xml).find("free").text() * 1;
        var total = $(xml).find("total").text() * 1;
        if (Pathpat == 0) {
            if (free == 0 && total == 0) {
                $("#rcPathSDirF").css("display", "none");
                $("#rcPathSDCardF").css("display", "");
            }
            else {
                $("#rcPathSDirF").css("display", "");
                $("#rcPathSDCardF").css("display", "none");
                $("#rcPathSDirF").text(SpaceToString(free) + " \/ " + SpaceToString(total));
            }
            $("#divRcPathCloudTips").css("display", "none");
            $("#divRcPathSoftTips").css("display", "none");
        } else if (Pathpat == 3) {
            if (free == 0 && total == 0) {
                $("#rcPathSDirF").css("display", "none");
                $("#rcPathSDCardF").css("display", "");
            } else {
                if (isSoftAPMode == 1) {
                    $("#rcPathSDirF").css("display", "none");
                    $("#rcPathSDCardF").css("display", "none");
                    $("#divRcPathCloudTips").css("display", "none");
                    $("#divRcPathSoftTips").css("display", "");
                } else {
                    $("#rcPathSDirF").css("display", "none");
                    $("#rcPathSDCardF").css("display", "none");
                    $("#divRcPathCloudTips").css("display", "");
                }
            }
        } else {
            if (isSoftAPMode == 1) {
                $("#rcPathSDirF").css("display", "none");
                $("#rcPathSDCardF").css("display", "none");
                $("#divRcPathCloudTips").css("display", "none");
                $("#divRcPathSoftTips").css("display", "");
            } else {
                $("#rcPathSDirF").css("display", "none");
                $("#rcPathSDCardF").css("display", "none");
                $("#divRcPathCloudTips").css("display", "none");
            }
        }
    }

    function Scall(xml) {
        var Pathpat = $(xml).find("setResult").text() * 1;
        if (Pathpat == 0) {
            if (gVar_first.sdFlag == 0) {
                //$("#RcPath").val(2);
                $("#rcPathSDCard").remove();
                $("#rcPathSDirF").css("display", "none");
                $("#rcPathSDCardF").css("display", "none");
                return;
            }
            var free = $(xml).find("free").text() * 1;
            var total = $(xml).find("total").text() * 1;
            if ($("#RcPath").val() * 1 == 0) {
                if (free == 0 && total == 0) {
                    $("#rcPathSDirF").css("display", "none");
                    $("#rcPathSDCardF").css("display", "");
                }
                else {
                    $("#rcPathSDirF").css("display", "");
                    $("#rcPathSDCardF").css("display", "none");
                    $("#rcPathSDirF").text(SpaceToString(free) + " \/ " + SpaceToString(total));
                }
                $("#divRcPathCloudTips").css("display", "none");
                $("#divRcPathSoftTips").css("display", "none");
            } else if ($("#RcPath").val() * 1 == 3) {
                if (free == 0 && total == 0) {
                    $("#rcPathSDirF").css("display", "none");
                    $("#rcPathSDCardF").css("display", "");
                } else {
                    if (isSoftAPMode == 1) {
                        $("#rcPathSDirF").css("display", "none");
                        $("#rcPathSDCardF").css("display", "none");
                        $("#divRcPathCloudTips").css("display", "none");
                        $("#divRcPathSoftTips").css("display", "");
                    } else {
                        $("#rcPathSDirF").css("display", "none");
                        $("#rcPathSDCardF").css("display", "none");
                        $("#divRcPathCloudTips").css("display", "");
                    }
                }
            } else {
                if (isSoftAPMode == 1) {
                    $("#rcPathSDirF").css("display", "none");
                    $("#rcPathSDCardF").css("display", "none");
                    $("#divRcPathCloudTips").css("display", "none");
                    $("#divRcPathSoftTips").css("display", "");
                } else {
                    $("#rcPathSDirF").css("display", "none");
                    $("#rcPathSDCardF").css("display", "none");
                    $("#divRcPathCloudTips").css("display", "none");
                }
            }
        }
        else if (Pathpat == -5) {
            User_defined_text("rcPathResult", lg.get("IDS_RC_PATH_ERROR_RECORDING"), "0", "55px");
        }
    }

    $("#RcPath").change(function () {
        if ($("#RcPath").val() * 1 == 0 || $("#RcPath").val() * 1 == 3) {
            RfParamCall(function (xml) {
                if ($(xml).find("result").text() * 1 == 0) {
                    var freeSpace = $(xml).find("sdFreeSpace").text().split("k")[0];
                    var totalSpace = $(xml).find("sdTotalSpace").text().split("k")[0];
                    if ($("#RcPath").val() * 1 == 0) {
                        if (freeSpace == 0 && totalSpace == 0) {
                            $("#rcPathSDirF").css("display", "none");
                            $("#rcPathSDCardF").css("display", "");
                        }
                        else {
                            $("#rcPathSDirF").css("display", "");
                            $("#rcPathSDCardF").css("display", "none");
                            $("#rcPathSDirF").text(SpaceToString(freeSpace) + " \/ " + SpaceToString(totalSpace));
                        }
                    } else {
                        if (freeSpace == 0 && totalSpace == 0) {
                            $("#rcPathSDirF").css("display", "none");
                            $("#rcPathSDCardF").css("display", "");
                        } else {
                            if (isSoftAPMode == 1) {
                                $("#rcPathSDirF").css("display", "none");
                                $("#rcPathSDCardF").css("display", "none");
                                $("#divRcPathCloudTips").css("display", "none");
                                $("#divRcPathSoftTips").css("display", "");
                            } else {
                                $("#rcPathSDirF").css("display", "none");
                                $("#rcPathSDCardF").css("display", "none");
                                $("#divRcPathCloudTips").css("display", "");
                                $("#divRcPathSoftTips").css("display", "none");
                            }
                        }
                    }
                }
            }, "", "getDevState");
            $("#divRcPathCloudTips").css("display", "none");
            $("#divRcPathSoftTips").css("display", "none");
        }
        else {
            if (isSoftAPMode == 1) {
                $("#rcPathSDirF").css("display", "none");
                $("#rcPathSDCardF").css("display", "none");
                $("#divRcPathCloudTips").css("display", "none");
                $("#divRcPathSoftTips").css("display", "");
            } else {
                $("#rcPathSDirF").css("display", "none");
                $("#rcPathSDCardF").css("display", "none");
                $("#divRcPathCloudTips").css("display", "none");
                $("#divRcPathSoftTips").css("display", "none");
            }
        }
    })

    $("#btnSelPath").click(function () {
    	  gDvr.SelectRecordPath(
    	  	function(data){
        	$("#rcPathsd").val(data);
    	  	});
    });
   

    $("#btnLocalFolder").click(function () {
        try 
        {   
            gDvr.OpenLocalRecordFolder($("#rcPathsd").val());
        }
        catch(e)
        {
            
        }
        
    });

    $("#rcpathRf").click(function () {
        try {
        		gDvr.GetRecordPath(function(data){
	        	$("#rcPathsd").val(data);
	    	  	});
        } catch (e) { }
        RfParamCall(Call, "", "getRecordPath");
    });

    $("#rcPathSave").click(function () {
        if (!Stringlen_check($("#rcPathsd").val(), 200)) {
            User_defined_text("rcPathResult", lg.get("IDS_RC_PATH_RECORD_TOOLONG_ERROR"), "0", "55px");
            return;
        }
        var sPath = $("#rcPathsd").val();
        if (sPath == "") {
            User_defined_text("rcPathResult", lg.get("IDS_RC_PATH_RECORD_EMPTY_ERROR"), "0", "55px");
            return;
        }
        if (sPath.charAt(0) == "\\") {
            User_defined_text("rcPathResult", lg.get("IDS_RC_PATH_LOCAL_PATH_ERROR"), "0", "55px");
            return;
        }
	if ( sPath.match("\\\\\\\\")) {
            User_defined_text("rcPathResult", lg.get("IDS_FORMAT_ERROR"), "0", "55px");
            return;
        }
        try {
            gDvr.SetRecordPath(sPath);
        		gDvr.GetRecordPath(function(data){
	        	$("#rcPathsd").val(data);
	    	  	});
        } catch (e) { }
        if (nRecordPath != $("#RcPath").val() * 1) {
            RfParamCall(Scall, "", "setRecordPath&path=" + $("#RcPath").val());
        }
    });




    $("#rcpathRf").click();
});
