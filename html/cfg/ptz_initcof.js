$(function () {
    var prePointName = "";
    var num = 0;
    MasklayerHide();
    function CallPrePointList(xml) {
        $("#PTZInitCofPrePoint").empty();
        num = XmlParser("cnt", xml) * 1;
        var point, str;
        var i = 0;
        for (var i = 0; i < num; i++) {
            point = XmlParser("point" + i, xml);

            if (prePointName != "" && prePointName == point)
                str = '<option value="' + point + '" selected="selected">' + EnuToOth(point) + '</option>';
            else
                str = '<option value="' + point + '">' + EnuToOth(point) + '</option>';

            $("#PTZInitCofPrePoint").append(str);
        }
    }
    function CallPTZInitMode(xml) {
        var mode = XmlParser("mode", xml) * 1;
        $("#PTZInitCofMode").val(mode);
        if (mode == 2) {
            $("#PTZInitCofPrePointSet").css("display", "");
        }
        else {
            $("#PTZInitCofPrePointSet").css("display", "none");
        }
        var flag = gVar_first.reserveFlag2.toString(2).substr(0, 1);
        if (flag == 1) {
            $("#PTZInitPrePoint").remove();
        }
        else {
            $("#PTZInitGuard").remove();
        }
        RfParamCall(CallPTZInitPrePoint, "", "getPTZPrePointForSelfTest");
    }

    function CallPTZInitPrePoint(xml) {
        if (XmlParser("result", xml) * 1 == 0) {
            prePointName = XmlParser("name", xml);
        }
        RfParamCall(CallPrePointList, "", "getPTZPresetPointList");
    }

    $("#PTZInitCofMode").change(function () {
        if ($(this).val() == 2) {
            $("#PTZInitCofPrePointSet").css("display", "");
        } else {
            $("#PTZInitCofPrePointSet").css("display", "none");
        }
    });

    $("#ptzinitcofRf").click(function () {
        
        RfParamCall(CallPTZInitMode, "", "getPTZSelfTestMode");
    });

    function SavePTZSelfModeCall(xml) {
        if ($("#PTZInitCofMode").val() == "2") {
            RfParamCall(null, "", "setPTZPrePointForSelfTest&name=" + OthToEnu($("#PTZInitCofPrePoint").val()));
        }
    }

    $("#ptzinitcofSave").click(function () {
        RfParamCall(SavePTZSelfModeCall, "", "setPTZSelfTestMode&mode=" + $("#PTZInitCofMode").val());
    });


    $("#ptzinitcofRf").click();
})