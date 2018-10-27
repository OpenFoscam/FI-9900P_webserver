$(function () {
    var Cnt = 0;
    var ctrackTime = ["15 " + lg.get("IDS_MINUTE"), "30 " + lg.get("IDS_MINUTE"), "1 " + lg.get("IDS_HOUR"), "2 " + lg.get("IDS_HOUR"), lg.get("IDS_UNLIMITED"), lg.get("IDS_USRDEFINED")];
    var preCount = 0;

    MasklayerHide();
    $("#ctrack_saveN").attr("title", lg.get("IDS_PTZ_DEWLLTIMES"));
    $("#ctrack_time").empty();
    for (var j = 0; j < ctrackTime.length; j++) {
        $("#ctrack_time").append('<option option add="1" value="' + j + '">' + ctrackTime[j] + '</option>');
    }
    $("#ct_Time").val(1);
    //Initial cruise mode selector
    $("#ctrack_mode").empty();
    $("#ctrack_mode").append('<option option add="1" value="1">' + EnuToOth(lg.get("IDS_PTZ_CLOOP")) + '</option>');
    $("#ctrack_mode").append('<option option add="1" value="0">' + EnuToOth(lg.get("IDS_PTZ_CTIME")) + '</option>');

    function DTCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            for (var i = 0; i < preCount; i++) {
                $("#point" + i + "_DT").val($(xml).find("time" + i).text() * 1);
            }
        }
    }

    function CtrackNameCall(xml) {
        if ($(xml).find("getResult").text() * 1 == 0) {

            preCount = 0;
            for (var i = 0; i < 8; i++) {
                if ($(xml).find("point" + i).text() != "") {
                    var cpoint = $(xml).find("point" + i).text();
                    var str = '<tr add="1" value="' + i + '"><th name="point" style="width:130px;text-align:center;">' + EnuToOth(cpoint) + '</th><th name="pointDT' + preCount + '" style="width:130px;text-align:center;"><input type="text" id="point' + preCount + '_DT' + '" onkeyup="rpPos(this,/[^\\d]/g,' + ('\'\'') + ');if(value*1>60)value=60;" onbeforepaste="clipboardData.setData(' + ('\'text\'') + ',clipboardData.getData(' + ('\'text\'') + ').replace(/[^\\d]/g,' + ('\'\'') + '))" style="width:25px;margin-right:0px;border:0px;background-color:#ededed;text-align:right;" maxlength="2"/><label style="margin-left:2px;">' + OthToEnu(lg.get("IDS_SECOND")) + '</label></th></tr>';
                    $("#ptzCTxTable").append(str);
                    $("#point" + preCount + "_DT").attr("title", lg.get("IDS_PTZ_DEWLLTIMET"));
                    $("#point" + preCount + "_DT").val(0);
                    preCount++;
                }
                else { }
            }
            bMaskHide = false;
            RfParamCall(DTCall, "", "getCruisePrePointLingerTime&name=" + $("#ctrack_name").val());
        }
        else {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_EFAILD"));
        }
    }

    function CtrackSubCall(xml) {
        if ($(xml).find("delResult").text() * 1 == 0) {
            $("#ptzctrackRf").click();
        }
        else if ($(xml).find("delResult").text() * 1 == 1)
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_NOMAP"));
        else
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_EFAILD"));
    }

    function SaveCruiseMapTimeCall(xml) {
        $("#ptzctrackRf").click();
    }

    function SaveCall(xml) {
        if ($(xml).find("setResult").text() * 1 == 0) {
            //save dwell time
            var curCount = 0;
            var dwelltime = "";
            $("#ptzCTxTable tr").each(function () {
                dwelltime += "&time" + curCount + "=" + $(this).find("input").val();
                curCount++;
            });
            for (var i = curCount; i < 8; i++) {
                dwelltime += "&time" + i + "=0";
            }
            RfParamCall(SaveCruiseMapTimeCall, "", "setCruisePrePointLingerTime&name=" + $("#PTZCtr_Name").val() + dwelltime);

            $("#PTZCtrack1").css("display", "");
            $("#PTZCtrack2").css("display", "none");
            $("#PTZCtr_Name").val("");

            $("#ctrack_addP").attr("disabled", "disabled");
            $("#ctrack_subP").attr("disabled", "disabled");
            $("#ctrack_subFO").attr("disabled", "disabled");
            $("#ctrack_subDep").attr("disabled", "disabled");
        }
        else if ($(xml).find("setResult").text() * 1 == 1)
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_YESMAP"));
        else if ($(xml).find("setResult").text() * 1 == 2)
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_MAX"));
        else if ($(xml).find("setResult").text() * 1 == 3)
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_NOPOINT"));
        else
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_EFAILD"));
    }

    $("#ctrack_mode").change(function () {
        var scruMode = OthToEnu(($("#ctrack_mode")).find("option:selected").text());
        if (scruMode == lg.get("IDS_PTZ_CLOOP")) {
            $("#ptzLoop").css("display", "");
            $("#ptzTime").css("display", "none");
            sH("ptzValue", "IDS_PTZ_CLOOP");
        }
        else if (scruMode == lg.get("IDS_PTZ_CTIME")) {
            $("#ptzLoop").css("display", "none");
            $("#ptzTime").css("display", "");
            sH("ptzValue", "IDS_PTZ_CTIME");
        }
    });

    $("#ctrack_time").change(function () {
        if (OthToEnu(($("#ctrack_time")).find("option:selected").text()) == lg.get("IDS_USRDEFINED")) {
            $("#divPtzCtrTimeTips").css("display", "none");
            $("#ct_Time").css("display", "");
            $("#chkTimeResult").css("display", "");
        }
        else if (($("#ctrack_time")).find("option:selected").text() == lg.get("IDS_UNLIMITED")) {
            $("#ct_Time").css("display", "none");
            $("#chkTimeResult").css("display", "none");
            $("#divPtzCtrTimeTips").css("display", "");
        }
        else {
            $("#ct_Time").css("display", "none");
            $("#chkTimeResult").css("display", "none");
            $("#divPtzCtrTimeTips").css("display", "none");
        }
    });

    $("#ctrack_addN").click(function () {
        $("#ptzCTxTable").empty();
        $("#PTZCtrack1").css("display", "none");
        $("#PTZCtrack2").css("display", "");
        $("#PTZCtr_OK").attr("disabled", "disabled");
        $("#PTZCtr_Name").focus();

        $("#ctrack_addP").attr("disabled", "");
        $("#ctrack_subP").attr("disabled", "");
        $("#ctrack_subFO").attr("disabled", "");
        $("#ctrack_subDep").attr("disabled", "");
    })

    $("#ctrack_subN").click(function () {
        var scruPath = OthToEnu(($("#ctrack_name")).find("option:selected").text());
        if (scruPath == "Vertical" || scruPath == "Horizontal") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("PTZ_CRUISE_DELETE_ERROR"));
        }
        else {
            $("#ptzCTxTable").empty();
            RfParamCall(CtrackSubCall, "", "ptzDelCruiseMap&name=" + $("#ctrack_name").find("option:selected").text());
        }
    })

    $("#ctrack_saveN").click(function () {
        var curCount = 0;
        var dwelltime = "";
        $("#ptzCTxTable tr").each(function () {
            curCount = $(this).attr("value") * 1;
            dwelltime += "&time" + curCount + "=" + $("#point" + curCount + "_DT").val();
        });
        for (var i = curCount + 1; i < 8; i++) {
            dwelltime += "&time" + i + "=0";
        }
        RfParamCall(null, "", "setCruisePrePointLingerTime&name=" + $("#ctrack_name").val() + dwelltime);
    })

    function SaveMap(mapname, fun) {
        MasklayerShow();
        var point = new Array;
        point[0] = "";
        point[1] = "";
        point[2] = "";
        point[3] = "";
        point[4] = "";
        point[5] = "";
        point[6] = "";
        point[7] = "";
        var i = 0;
        var priPrePointName = "";
        var bSave = true;
        $("#ptzCTxTable th").each(function () {
            if ($(this).attr("name") == "point") {
                if (priPrePointName != OthToEnu($(this).text())) {
                    point[i] = OthToEnu($(this).text());
                    priPrePointName = OthToEnu($(this).text());
                    i++;
                } else {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_CTRACK_NEAR_SAME"));
                    bSave = false;
                }
            }
        })
        if (bSave) {
            RfParamCall(SaveCall, "", "ptzSetCruiseMap&name=" + mapname + "&point0=" + point[0] + "&point1=" + point[1] + "&point2=" + point[2] + "&point3=" + point[3] + "&point4=" + point[4] + "&point5=" + point[5] + "&point6=" + point[6] + "&point7=" + point[7]);
        } else {
            MasklayerHide();
        }
    }

    $("#PTZCtr_OK").click(function () {
        var ptzCtrName = $("#PTZCtr_Name").val();
        //check ptzCtrName not null
        if (ptzCtrName == "") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_CRUISE_NAME_ERROR"));
            $("#PTZCtr_Name").focus();
            return;
        }
        //check ptzCtrName format
        if (!IsLimitLength(ptzCtrName, 20) || !MatchReg(ptzCtrName)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_CTNANE") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#PTZCtr_Name").focus();
            return;
        }

        SaveMap($("#PTZCtr_Name").val(), function (data) {
            $("#PTZCtrack1").css("display", "");
            $("#PTZCtrack2").css("display", "none");
            $("#PTZCtr_Name").val("");
        });
    })
    $("#PTZCtr_CAN").click(function () {
        setTimeout(function () { $("#ctrack_name").change() }, 10);
        $("#PTZCtrack1").css("display", "");
        $("#PTZCtrack2").css("display", "none");
        $("#PTZCtr_Name").val("");

        $("#ctrack_addP").attr("disabled", "disabled");
        $("#ctrack_subP").attr("disabled", "disabled");
        $("#ctrack_subFO").attr("disabled", "disabled");
        $("#ctrack_subDep").attr("disabled", "disabled");
    })
    $("#ctrack_name").change(function () {
        $("#ptzCTxTable").empty();
        bMaskHide = false;
        RfParamCall(CtrackNameCall, "", "ptzGetCruiseMapInfo&name=" + $("#ctrack_name").val());
    })
    UI.Table("ptzCTyTable");
    $("#ptzCTxTable tr").live("mouseover", function () {
        if ($(this).attr("class") != "ptzCTxTable") {
            $(this).css({ "background-color": "#0A5", "cursor": "pointer" });
        }
    }).live("mouseout", function () {
        if ($(this).attr("class") != "ptzCTxTable") {
            $(this).css("background-color", "transparent");
        }
    }).live("click", function () {
        $(".ptzCTxTable").removeClass("ptzCTxTable").css("background-color", "transparent");
        $(this).addClass("ptzCTxTable").css("background-color", "#0f0");
        $("#point" + $(this).attr("value") + "_DT").focus();
    });

    $("#ctrack_addP").click(function () {
        if (typeof $(".ptzCTyTable").attr("id") != "undefined") {
            if ($("#ptzCTxTable tr").size() < 8) {
                preCount = $("#ptzCTxTable tr").size();

                var tmp;
                if (preCount == 0) {
                    tmp = "null";
                } else {
                    tmp = $("#ptzCTxTable tr:last").html();
                }
                //check if the near 2 point is same.(368)
                if (tmp.split(">" + $(".ptzCTyTable").children(":nth-child(1)").html() + "<").length == 1) {
                    var opt = '<tr add="1" value="' + preCount + '"><th name="point" style="width:130px;text-align:center;">' + $(".ptzCTyTable th").html() + '</th><th name="pointDT' + preCount + '" style="width:130px;text-align:center;"><input type="text" id="point' + preCount + '_DT' + '" onkeyup="rpPos(this,/[^\\d]/g,' + ('\'\'') + ');if(value*1>60)value=60;" onbeforepaste="clipboardData.setData(' + ('\'text\'') + ',clipboardData.getData(' + ('\'text\'') + ').replace(/[^\\d]/g,' + ('\'\'') + '))" style="width:25px;margin-right:0px;border:0px;background-color:#ededed;text-align:right;" maxlength="2" /><label style="margin-left:2px;">' + OthToEnu(lg.get("IDS_SECOND")) + '</label></th></tr>';
                    $("#ptzCTxTable").append(opt);
                    $("#point" + preCount + "_DT").attr("title", lg.get("IDS_PTZ_DEWLLTIMET"));
                    $("#point" + preCount + "_DT").val(0);
                    preCount++;
                    if ($("#ptzCTxTable tr").size() >= 2) {
                        $("#PTZCtr_OK").attr("disabled", "");
                    }
                } else {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_CTRACK_NEAR_SAME"));
                } //end check (368)
            }
            else {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_CTRACK_EXCEED_MAXPRESET"));
            }
        }
    })

    $("#ctrack_subP").click(function () {
        if (typeof $(".ptzCTxTable").attr("id") != "undefined") {
            $(".ptzCTxTable").remove();
            preCount--;
            //Sort the index
            var curIndex = 0;
            var curVal = 0;
            var curInput = 0;
            var curTh = "";
            var optString = "";
            $("#ptzCTxTable tr").each(function () {
                curVal = $(this).attr("value") * 1;
                curInput = $(this).find("input").val();
                curTh = $(this).children('th').eq(0).html();
                if (curVal == curIndex) {

                } else {
                    optString = '<th name="point" style="width:130px;text-align:center;">' + curTh + '</th><th name="pointDT' + curIndex + '" style="width:130px;text-align:center;"><input type="text" id="point' + curIndex + '_DT' + '" onkeyup="rpPos(this,/[^\\d]/g,' + ('\'\'') + ');if(value*1>60)value=60;" onbeforepaste="clipboardData.setData(' + ('\'text\'') + ',clipboardData.getData(' + ('\'text\'') + ').replace(/[^\\d]/g,' + ('\'\'') + '))" style="width:25px;margin-right:0px;border:0px;background-color:#ededed;text-align:right;" maxlength="2" /><label style="margin-left:2px;">' + OthToEnu(lg.get("IDS_SECOND")) + '</label></th>';
                    $(this).html(optString);
                    $("#point" + curIndex + "_DT").attr("title", lg.get("IDS_PTZ_DEWLLTIMET"));
                    $("#point" + curIndex + "_DT").val(curInput);
                    $(this).attr("value", curIndex);
                }
                curIndex++;
            });
            if ($("#ptzCTxTable tr").size() <= 1) {
                $("#PTZCtr_OK").attr("disabled", "disabled");
            }
        }
    })

    $("#ctrack_subFO").click(function () {
        if (typeof $(".ptzCTxTable").attr("id") != "undefined") {
            if (typeof $(".ptzCTxTable").prev().html() == "string" && $(".ptzCTxTable").prev().html() != "") {
                var index = $(".ptzCTxTable").attr("value") * 1;
                var dt = new Array(8);
                $("#ptzCTxTable tr").each(function () {
                    var i = $(this).attr("value") * 1;
                    if (i == index || i == (index - 1)) {
                        $(this).children().each(function () {
                            if ($(this).attr("name") == ("pointDT" + i)) {
                                dt[i] = $(this).children().val() * 1;
                                $(this).remove();
                            }
                        });
                        var newIndex = 0;
                        if (i == index) newIndex = index - 1;
                        else if (i == (index - 1)) newIndex = index;
                        var opt = '<th name="pointDT' + newIndex + '" style="width:130px;text-align:center;"><input type="text" id="point' + newIndex + '_DT' + '" onkeyup="rpPos(this,/[^\\d]/g,' + ('\'\'') + ');if(value*1>60)value=60;" onbeforepaste="clipboardData.setData(' + ('\'text\'') + ',clipboardData.getData(' + ('\'text\'') + ').replace(/[^\\d]/g,' + ('\'\'') + '))" style="width:25px;margin-right:0px;border:0px;background-color:#ededed;text-align:right;" maxlength="2" /><label style="margin-left:2px;">' + OthToEnu(lg.get("IDS_SECOND")) + '</label></th>';
                        $(this).append(opt);
                        $("#point" + newIndex + "_DT").attr("title", lg.get("IDS_PTZ_DEWLLTIMET"));
                    }
                });
                var text = $(".ptzCTxTable").prev().html();
                $(".ptzCTxTable").prev().html($(".ptzCTxTable").html());
                $(".ptzCTxTable").html(text);
                $("#point" + index + "_DT").val(dt[index - 1]);
                $("#point" + (index - 1) + "_DT").val(dt[index]);
                $(".ptzCTxTable").prev().click();
            }
        }
    })

    $("#ctrack_subDep").click(function () {
        if (typeof $(".ptzCTxTable").attr("id") != "undefined") {
            if (typeof $(".ptzCTxTable").next().html() == "string" && $(".ptzCTxTable").next().html() != "") {
                var index = $(".ptzCTxTable").attr("value") * 1;
                var dt = new Array(8);
                $("#ptzCTxTable tr").each(function () {
                    var i = $(this).attr("value") * 1;
                    if (i == index || i == (index + 1)) {
                        $(this).children().each(function () {
                            if ($(this).attr("name") == ("pointDT" + i)) {
                                dt[i] = $(this).children().val() * 1;
                                $(this).remove();
                            }
                        });
                        var newIndex = 0;
                        if (i == index) newIndex = index + 1;
                        else if (i == (index + 1)) newIndex = index;
                        var opt = '<th name="pointDT' + newIndex + '" style="width:130px;text-align:center;"><input type="text" id="point' + newIndex + '_DT' + '" onkeyup="rpPos(this,/[^\\d]/g,' + ('\'\'') + ');if(value*1>60)value=60;" onbeforepaste="clipboardData.setData(' + ('\'text\'') + ',clipboardData.getData(' + ('\'text\'') + ').replace(/[^\\d]/g,' + ('\'\'') + '))" style="width:25px;margin-right:0px;border:0px;background-color:#ededed;text-align:right;" maxlength="2" /><label style="margin-left:2px;">' + OthToEnu(lg.get("IDS_SECOND")) + '</label></th>';
                        $(this).append(opt);
                        $("#point" + newIndex + "_DT").attr("title", lg.get("IDS_PTZ_DEWLLTIMET"));
                    }
                });
                var text = $(".ptzCTxTable").next().html();
                $(".ptzCTxTable").next().html($(".ptzCTxTable").html());
                $(".ptzCTxTable").html(text);
                $("#point" + index + "_DT").val(dt[index + 1]);
                $("#point" + (index + 1) + "_DT").val(dt[index]);
                $(".ptzCTxTable").next().click();
            }
        }
    })

    function CruiseMapListCall(xml) {
        $("#ctrack_name").empty();
        var num = $(xml).find("cnt").text() * 1;
        Cnt = num;
        for (var i = 0; i < num; i++) {
            Struct.presetPointList[i] = $(xml).find("map" + i).text();
            $("#ctrack_name").append('<option option add="1" value="' + $(xml).find("map" + i).text() + '">' + EnuToOth($(xml).find("map" + i).text()) + '</option>');
        }
        //setTimeout(function () {
            $("#ctrack_name").change()
        // }, 10);
        $("#ptzctrackRf").attr("disabled", "");
    }

    function PrePointListCall(xml) {
        var num = XmlParser("cnt", xml) * 1;
        var point, str;
        var i = 0;
        for (; i < num; i++) {
            point = XmlParser("point" + i, xml);
            str = '<tr add="1"><th  style="width:130px;text-align:left;">' + EnuToOth(point) + '</th></tr>';
            $("#ptzCTyTable").append(str);
        }
        bMaskHide = false;
        //setTimeout(function () {
            RfParamCall(CruiseMapListCall, "", "ptzGetCruiseMapList");
        //}, 1);
    }

    function CruiseLoopCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            var loop = $(xml).find("count").text() * 1;
            $("#cl_loop").val(loop);
        }
        bMaskHide = false;
        //setTimeout(function () {
            RfParamCall(PrePointListCall, "", "getPTZPresetPointList");
        //}, 1);
    }

    function CruiseTimeCall(xml) {
        var time = 0;
        time = $(xml).find("time").text() * 1;
        if (time >= 0 && time <= 4) {
            $("#ctrack_time").val(time);
        } else {
            $("#ctrack_time").val(0);
        }
        $("#ctrack_time").change();
        bMaskHide = false;
        //setTimeout(function () {
            RfParamCall(PrePointListCall, "", "getPTZPresetPointList");
        //}, 1);
    }

    function CruiseTimeCustomCall(xml) {
        var time = 1;
        var isCustom = 0;
        isCustom = $(xml).find("customed").text() * 1;
        time = $(xml).find("time").text() * 1;
        if (isCustom == 0) {        //uncustomed
            bMaskHide = false;
            RfParamCall(CruiseTimeCall, "", "getCruiseTime");
        } else {      //customed
            $("#ctrack_time").val(ctrackTime.length - 1);
            $("#ct_time").val(time);
            chktime(document.getElementById("ct_time"), chkTimeResult);
            $("#ctrack_time").change();
            bMaskHide = false;
            //setTimeout(function () {
                RfParamCall(PrePointListCall, "", "getPTZPresetPointList");
           // }, 1);
        }
    }

    function CruiseCtrlModeCall(xml) {
        if ($(xml).find("result").text() * 1 == 0) {
            if ($(xml).find("mode").text() * 1 == 1) {     //Cruise loops mode
                $("#ctrack_mode").val(1);
                $("#ctrack_mode").change();
                bMaskHide = false;
                RfParamCall(CruiseLoopCall, "", "getCruiseLoopCnt");
            }
            else if ($(xml).find("mode").text() * 1 == 0) {        //Cruise time mode
                $("#ctrack_mode").val(0);
                $("#ctrack_mode").change();
                bMaskHide = false;
                RfParamCall(CruiseTimeCustomCall, "", "getCruiseTimeCustomed");
            }
        }
    }

    $("#ptzctrackRf").click(function () {
        $("#ptzCTyTable").empty();
        $("#ctrack_name").empty();
        $("#ptzCTxTable").empty();
        bMaskHide = false;
        RfParamCall(CruiseCtrlModeCall, "", "getCruiseCtrlMode");
        $("#ptzctrackRf").attr("disabled", "disabled");
    })

    $("#ctrack_save").click(function () {
        var scMode = OthToEnu(($("#ctrack_mode")).find("option:selected").text());
        if (scMode == lg.get("IDS_PTZ_CLOOP")) {
            var loopVal = $("#cl_loop").val() | 0;
            if (loopVal == 0) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_CLOOP_ERROE"));
                return;
            }
            RfParamCall(null, "", "setCruiseLoopCnt&count=" + loopVal);
        } else if (scMode == lg.get("IDS_PTZ_CTIME")) {
            var timeVal = 0;
            if (OthToEnu(($("#ctrack_time")).find("option:selected").text()) == lg.get("IDS_USRDEFINED")) {
                timeVal = $("#ct_time").val() | 0;
                if (timeVal == 0) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_CTIME_ERROE"));
                    return;
                }
                RfParamCall(null, "", "setCruiseTimeCustomed&customed=1&time=" + timeVal);
            }
            else {
                timeVal = $("#ctrack_time").val();
                RfParamCall(null, "", "setCruiseTime&time=" + timeVal);
            }
        }
    });

    $("#ptzctrackRf").click();
})