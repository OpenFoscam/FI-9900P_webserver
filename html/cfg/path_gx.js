$(function () {
    MasklayerHide();
    function Call(xml) {
        $(xml).find("CGI_Result").children().not("result,mountResult,freeSpace,totalSpace").each(function (i) {
            $("#phGx_" + $(this).context.nodeName.toUpperCase()).val($(this).text());
        });
        var isSuc = XmlParser("mountResult", xml) * 1;
        if (isSuc == 0) {
            $("#phGxIsSuc").text(lg.get("IDS_PATH_SUCCESS"));
        } else {
            $("#phGxIsSuc").text(lg.get("IDS_PATH_FAIED"));
        }
        var totalSpace = XmlParser("totalSpace", xml) * 1;
        totalSpace = SpaceToString(totalSpace);

        var freeSpace = XmlParser("freeSpace", xml) * 1;
        freeSpace = SpaceToString(freeSpace);
        $("#phGxSpace").text(freeSpace + " \/ " + totalSpace);
        $("#phGx_ISANONYMOUS").change();
    }

    function SpaceToString(space) {
        if (space >= 1024 * 1024) {
            space = (space / (1024 * 1024)) + "";
            space = space.split(".")[0] + "." + ("" + space.split(".")[1]).charAt(0) + " G";
        } else if (space >= 1024) {
            space = space / 1024 + "";
            space = space.split(".")[0] + "." + (space.split(".")[1]).charAt(0) + " M";
        } else {
            space = space + " K";
        }
        return space;
    }

    $("#phGx_ISANONYMOUS").change(function () {
        if ($(this).val() == 1) {
            $("#phGxTable tr:nth-child(3)").css("display", "none");
            $("#phGxTable tr:nth-child(4)").css("display", "none");
        } else {
            $("#phGxTable tr:nth-child(3)").css("display", "");
            $("#phGxTable tr:nth-child(4)").css("display", "");
        }
    })

    $("#pathgxRf").click(function () {
        RfParamCall(Call, "", "getShareDirConfig");
    });

    $("#phGxSave").click(function () {
        //check phGx_USERNAME format
        var UserName = $("#phGx_USERNAME").val();
        if (UserName != "" && !UserName.match(/^[a-zA-Z0-9\_]+$/)) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PATH_AUSRN") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR"));
            $("#phGx_USERNAME").focus();
            return;
        }

        RfParamCall(Call, "", "setShareDirConfig&shareDirAddr=" + $("#phGx_SHAREDIRADDR").val() + "&isAnonymous=" + $("#phGx_ISANONYMOUS").val() + "&userName=" + $("#phGx_USERNAME").val() + "&password=" + $("#phGx_PASSWORD").val());
    });

    $("#pathgxRf").click();
});