$(function () {
    function Call(xml) {
        $("#devsesRf").attr("disabled", "");
        var num = XmlParser("usrCnt", xml);
        var usr, str;
        for (var i = 1; i <= num; i++) {
            usr = XmlParser("usr" + i, xml).split("+");
            str = '<tr><td>' + usr[0] + '</td><td>' + usr[1] + '</td></tr>';
            $("#sessionUser").append(str);
        }
        MasklayerHide();
        jQuery("#sessionUser tr:odd").addClass("t1");
        jQuery("#sessionUser tr:even").addClass("t2");
    }

    $("#devsesRf").click(function () {
        bMaskHide = false;
        $("#devsesRf").attr("disabled", "disabled");
        $("#sessionUser tr").not(":first").remove();
        RfParamCall(Call, "", "getSessionList");
    });

    $("#devsesRf").click();
});