$(function () {
    function Call(xml) {
        $("#bsBs_NAME").val(XmlParser("devName", xml));
    }

    $("#bsbaseRf").click(function () {
        setTimeout(function(){
            RfParamCall(Call, "", "getDevName");
        },100);
    });

    $("#bsBsSave").click(function () {
        //check name
        var strName = $("#bsBs_NAME").val();
        //check not null
        if (strName == "") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_DEVNAME_ERROR"));
            $("#bsBs_NAME").focus();
            setGuidResult = false;
            return;
        }
        //check format
        if (!MatchReg(strName)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BASE_DEVNAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#bsBs_NAME").focus();
            setGuidResult = false;
            return;
        }
        //check length
        if (!IsLimitLength(strName, 20)) {
            if (gVar_first.N_language !=2)
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS") + " " + lg.get("IDS_CHARACTER_NOTICE"));
            else
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS"));

            $("#bsBs_NAME").focus();
            setGuidResult = false;
            return;
        }

        RfParamCall(null, "", "setDevName&devName=" + $("#bsBs_NAME").val());
        setGuidResult = true;
    });

    $("#bsbaseRf").click();
});