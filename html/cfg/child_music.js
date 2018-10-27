$(function () {
    var Cnt = 0;
    var page = 0;
    var musicCnt = 10;
    var tPage = 0;
    var isNan = false;
    var hadGet = 0;
    var cnts = "";
    var toalget = 0;
    var toalgets = 0
    var isTrue = true;
    var addlist = false;
    var endGet = 0;

    MasklayerHide();

    function NameCall(xml) {
        var num = XmlParser("cnt", xml) * 1;
        var point, str;
        var total = $(xml).find("cnt").text() * 1;
        //tPage = ((total / musicCnt) | 0) + ((total % musicCnt == 0) ? 0 : 1) - 1;
        //if (tPage >= 0)
        // UI.FyHead("child_music_header", ">div:first", ">div:last", tPage, page, isNan);
        if (total > 0 && isTrue) {
            $("#tab_child_music").empty();
        }
        if (total > 10) {
            //$("#child_music_header").show();
        }
        else {
            //$("#child_music_header").hide();
        }

        for (var i = 0; i < num; i++) {
            if ($(xml).find("music" + i).text() != "") {
                point = XmlParser("music" + i, xml);
                str = '<tr add="1"><th style="text-align:left;">' + point + '</th></tr>';
                $("#tab_child_music").append(str);
            }
        }
        cnts = $(xml).find("cnt").text() * 1;
        hadGet = $(xml).find("hadGet").text() * 1;
        toalget += hadGet;
        endGet = cnts - toalget;

        if (hadGet == cnts || toalget == cnts || toalget > 50 || endGet <= 0) {
            setTimeout(function () { $("#sel_music_list_name").change() }, 1);
            return;
        }
        if (hadGet < cnts) {
            isTrue = false;
            bMaskHide = false;
            RfParamCall(NameCall, "", "getMusicsNameOfList&name=default" + "&startNo=" + toalget + "&musicNum=" + endGet);
        }
        if (isTrue) {
            isTrue = true;
        }

    }

    function ListNameCall(xml) {
        $("#tab_child_music").empty();
        $("#sel_music_list_name").empty();
        var num = $(xml).find("cnt").text() * 1;
        Cnt = num;
        $("#sel_music_list").empty();
        for (var i = 0; i < num; i++) {
            //Struct.presetPointList[i] = $(xml).find("map" + i).text();
            $("#sel_music_list_name").append('<option option add="1" value="' + $(xml).find("list" + i).text() + '">' + $(xml).find("list" + i).text() + '</option>');
            $("#sel_music_list").append('<option option add="1" value="' + $(xml).find("list" + i).text() + '">' + $(xml).find("list" + i).text() + '</option>');
        }
        bMaskHide = false;
        RfParamCall(NameCall, "", "getMusicsNameOfList&name=default" + "&startNo=" + 0 + "&musicNum=" + 50);
    }

    /*UI.FyHeadEvent("musicListHead", function (p, b) {
    page = p; isNan = b;
    $("#tab_child_music_list").empty();
    RfParamCall(MusicNameOfListCall, "", "getMusicsNameOfList&startNo=" + page * musicCnt + "&name=" + $("#sel_music_list_name").find("option:selected").text());
    }, function (p, b) {
    page = p; isNan = b;
    $("#tab_child_music_list").empty();
    RfParamCall(MusicNameOfListCall, "", "getMusicsNameOfList&startNo=" + page * musicCnt + "&name=" + $("#sel_music_list_name").find("option:selected").text());
    }, function () { return (tPage) });


    UI.FyHeadEvent("child_music_header", function (p, b) {
    page = p; isNan = b;
    $("#tab_child_music").empty();
    RfParamCall(MusicNameCall, "", "getMusicsNameOfList&startNo=" + page * musicCnt + "&name=default");
    }, function (p, b) {
    page = p; isNan = b;
    $("#tab_child_music").empty();
    RfParamCall(MusicNameCall, "", "getMusicsNameOfList&startNo=" + page * musicCnt + "&name=default");
    }, function () { return (tPage) });*/

    function MusicNameCall(xml) {
        if ($(xml).find("getResult").text() * 1 == 0) {

            var total = $(xml).find("cnt").text() * 1;
            tPage = ((total / musicCnt) | 0) + ((total % musicCnt == 0) ? 0 : 1) - 1;
            if (tPage >= 0)
                UI.FyHead("child_music_header", ">div:first", ">div:last", tPage, page, isNan);
            if (total > 0) {
                $("#tab_child_music").empty();
            }
            if (total > 10) {
                //$("#child_music_header").show();
            }
            else {
                //$("#child_music_header").hide();
            }
            var numname = $(xml).find("cnt").text() * 1;
            for (var i = 0; i < numname; i++) {
                if ($(xml).find("music" + i).text() != "") {
                    var cpoint = $(xml).find("music" + i).text();
                    var str = '<tr add="1"><th style="text-align:left;">' + cpoint + '</th></tr>';
                    $("#tab_child_music").append(str);
                }
                else { }
            }
        }
        else {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_EFAILD"));
        }
    }


    function MusicNameOfListCall(xml) {
        if ($(xml).find("getResult").text() * 1 == 0) {

            var total = $(xml).find("cnt").text() * 1;
            // tPage = ((total / musicCnt) | 0) + ((total % musicCnt == 0) ? 0 : 1) - 1;
            //if (tPage >= 0)
            // UI.FyHead("musicListHead", ">div:first", ">div:last", tPage, page, isNan);
            if (total > 0 && isTrue) {
                $("#tab_child_music_list").empty();
            }
            /*if (total > 10) {
            $("#musicListHead").show();
            }
            else {
            $("#musicListHead").hide();
            }*/
            var numname = $(xml).find("cnt").text() * 1;
            for (var i = 0; i < numname; i++) {
                if ($(xml).find("music" + i).text() != "") {
                    var cpoint = $(xml).find("music" + i).text();
                    var str = '<tr add="1"><th style="text-align:left;">' + cpoint + '</th></tr>';
                    $("#tab_child_music_list").append(str);
                }
                else { }
            }
            cnts = $(xml).find("cnt").text() * 1;
            hadGet = $(xml).find("hadGet").text() * 1;
            toalgets += hadGet;
            endGet = cnts - toalgets;

            if (hadGet == cnts || toalgets == cnts || toalgets > 50 || endGet <= 0) {
                bMaskHide = true;
                $("#childmusicRf").attr("disabled", "");
                return;
            }
            if (isTrue) {
                isTrue = true;
            }
            if (hadGet < cnts) {
                isTrue = false;
                bMaskHide = false;
                $("#childmusicRf").attr("disabled", "disabled");
                RfParamCall(MusicNameOfListCall, "", "getMusicsNameOfList&name=" + $("#sel_music_list_name").find("option:selected").text() + "&startNo=" + toalgets + "&musicNum=" + endGet);
            }


        }
        else {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_EFAILD"));
        }
    }

    function DelListCall(xml) {
        if ($(xml).find("delResult").text() * 1 == 0) {
            ListNameCall(xml);
        }
        else if ($(xml).find("delResult").text() * 1 == 1)
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_LIST_NOT_EXIST_ERR"));
        else
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_EFAILD"));
    }

    function addListCall(xml) {
        if ($(xml).find("setResult").text() * 1 == 0 && addlist) {
            ListNameCall(xml);
            $("#div_music_list_name").css("display", "");
            $("#div_music_list_add").css("display", "none");
            $("#iput_music_list_name").val("");

            $("#btn_music_add_list").attr("disabled", "disabled");
            $("#btn_music_del_list").attr("disabled", "disabled");
            $("#btn_music_move_up").attr("disabled", "disabled");
            $("#btn_music_move_down").attr("disabled", "disabled");
        }
        else if ($(xml).find("setResult").text() * 1 == 1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_LIST_EXIST_ERR"));
        }
        else if ($(xml).find("setResult").text() * 1 == 2) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_LIST_NO_MAX_ERR"));
        }
        else if ($(xml).find("setResult").text() * 1 == 3) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_NO_EXIST_ERR"));
        }
        else {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_EFAILD"));
        }
    }
    function addListCall3(xml) {
        var music = new Array(49);
        for (var i = 0; i <= 49; i++) {
            music[i] = "";
        }
        $("#tab_child_music_list th").each(function (i) {
            music[i] = $(this).text();
        })
        var mapname = $("#iput_music_list_name").val();
        addlist = true;
        RfParamCall(addListCall, "", "addMusicList&name=" + mapname + "&startNo=" + 40 + "&music0=" + music[40] + "&music1=" + music[41] + "&music2=" + music[42] + "&music3=" + music[43] + "&music4=" + music[44] + "&music5=" + music[45] + "&music6=" + music[46] + "&music7=" + music[47] + "&music8=" + music[48] + "&music9=" + music[49]);

    }

    function addListCall2(xml) {
        var music = new Array(49);
        for (var i = 0; i <= 49; i++) {
            music[i] = "";
        }
        $("#tab_child_music_list th").each(function (i) {
            music[i] = $(this).text();
        })
        var mapname = $("#iput_music_list_name").val();
        if ($("#tab_child_music_list th").length > 30 && $("#tab_child_music_list th").length <= 40) {
            addlist = true;
            RfParamCall(addListCall, "", "addMusicList&name=" + mapname + "&startNo=" + 30 + "&music0=" + music[30] + "&music1=" + music[31] + "&music2=" + music[32] + "&music3=" + music[33] + "&music4=" + music[34] + "&music5=" + music[35] + "&music6=" + music[36] + "&music7=" + music[37] + "&music8=" + music[38] + "&music9=" + music[39]);
        }
        if ($("#tab_child_music_list th").length > 40 && $("#tab_child_music_list th").length <= 50) {
            addlist = true;
            RfParamCall(addListCall3, "", "addMusicList&name=" + mapname + "&startNo=" + 30 + "&music0=" + music[30] + "&music1=" + music[31] + "&music2=" + music[32] + "&music3=" + music[33] + "&music4=" + music[34] + "&music5=" + music[35] + "&music6=" + music[36] + "&music7=" + music[37] + "&music8=" + music[38] + "&music9=" + music[39]);
        }
    }
    function addListCall1(xml) {
        var music = new Array(49);
        for (var i = 0; i <= 49; i++) {
            music[i] = "";
        }
        $("#tab_child_music_list th").each(function (i) {
            music[i] = $(this).text();
        })
        var mapname = $("#iput_music_list_name").val();
        addlist = false;
        if ($("#tab_child_music_list th").length > 20 && $("#tab_child_music_list th").length <= 30) {
            addlist = true;
            RfParamCall(addListCall, "", "addMusicList&name=" + mapname + "&startNo=" + 20 + "&music0=" + music[20] + "&music1=" + music[21] + "&music2=" + music[22] + "&music3=" + music[23] + "&music4=" + music[24] + "&music5=" + music[25] + "&music6=" + music[26] + "&music7=" + music[27] + "&music8=" + music[28] + "&music9=" + music[29]);
        }
        else {
            RfParamCall(addListCall2, "", "addMusicList&name=" + mapname + "&startNo=" + 20 + "&music0=" + music[20] + "&music1=" + music[21] + "&music2=" + music[22] + "&music3=" + music[23] + "&music4=" + music[24] + "&music5=" + music[25] + "&music6=" + music[26] + "&music7=" + music[27] + "&music8=" + music[28] + "&music9=" + music[29]);
        }
    }

    function SaveListCall(xml) {
        var music = new Array(49);
        for (var i = 0; i <= 49; i++) {
            music[i] = "";
        }
        $("#tab_child_music_list th").each(function (i) {
            music[i] = $(this).text();
        })
        addlist = false;
        var mapname = $("#iput_music_list_name").val();
        if ($("#tab_child_music_list th").length > 10 && $("#tab_child_music_list th").length <= 20 && !addlist) {
            addlist = true;
            RfParamCall(addListCall, "", "addMusicList&name=" + mapname + "&startNo=" + 10 + "&music0=" + music[10] + "&music1=" + music[11] + "&music2=" + music[12] + "&music3=" + music[13] + "&music4=" + music[14] + "&music5=" + music[15] + "&music6=" + music[16] + "&music7=" + music[17] + "&music8=" + music[18] + "&music9=" + music[19]);
        }
        if ($("#tab_child_music_list th").length > 20 && $("#tab_child_music_list th").length <= 30) {
            addlist = true;
            RfParamCall(addListCall1, "", "addMusicList&name=" + mapname + "&startNo=" + 10 + "&music0=" + music[10] + "&music1=" + music[11] + "&music2=" + music[12] + "&music3=" + music[13] + "&music4=" + music[14] + "&music5=" + music[15] + "&music6=" + music[16] + "&music7=" + music[17] + "&music8=" + music[18] + "&music9=" + music[19]);
        }
        if ($("#tab_child_music_list th").length > 30 && $("#tab_child_music_list th").length <= 40) {
            addlist = true;
            RfParamCall(addListCall1, "", "addMusicList&name=" + mapname + "&startNo=" + 10 + "&music0=" + music[10] + "&music1=" + music[11] + "&music2=" + music[12] + "&music3=" + music[13] + "&music4=" + music[14] + "&music5=" + music[15] + "&music6=" + music[16] + "&music7=" + music[17] + "&music8=" + music[18] + "&music9=" + music[19]);
        }
        if ($("#tab_child_music_list th").length > 40 && $("#tab_child_music_list th").length <= 50) {
            addlist = true;
            RfParamCall(addListCall1, "", "addMusicList&name=" + mapname + "&startNo=" + 10 + "&music0=" + music[10] + "&music1=" + music[11] + "&music2=" + music[12] + "&music3=" + music[13] + "&music4=" + music[14] + "&music5=" + music[15] + "&music6=" + music[16] + "&music7=" + music[17] + "&music8=" + music[18] + "&music9=" + music[19]);
        }
        if ($(xml).find("setResult").text() * 1 == 0 && !addlist) {
            ListNameCall(xml);
            $("#div_music_list_name").css("display", "");
            $("#div_music_list_add").css("display", "none");
            $("#iput_music_list_name").val("");

            $("#btn_music_add_list").attr("disabled", "disabled");
            $("#btn_music_del_list").attr("disabled", "disabled");
            $("#btn_music_move_up").attr("disabled", "disabled");
            $("#btn_music_move_down").attr("disabled", "disabled");
        }
        else if ($(xml).find("setResult").text() * 1 == 1) {
            $("#childmusicRf").attr("disabled", "");
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_LIST_EXIST_ERR"));
        }
        else if ($(xml).find("setResult").text() * 1 == 2) {
            $("#childmusicRf").attr("disabled", "");
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_LIST_NO_MAX_ERR"));
        }
        else if ($(xml).find("setResult").text() * 1 == 3) {
            $("#childmusicRf").attr("disabled", "");
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_NO_EXIST_ERR"));
        }
        else {
            //ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_EFAILD"));
        }

    }

    $("#btn_music_addN").click(function () {
        $("#tab_child_music_list").empty();
        $("#musicListHead").css("display", "none");
        $("#div_music_list_name").css("display", "none");
        $("#div_music_list_add").css("display", "");
        $("#btn_music_list_OK").attr("disabled", "disabled");
        $("#iput_music_list_name").focus();

        $("#btn_music_add_list").attr("disabled", "");
        $("#btn_music_del_list").attr("disabled", "");
        $("#btn_music_move_up").attr("disabled", "");
        $("#btn_music_move_down").attr("disabled", "");
    })

    function musicsubN(xml) {
        var scruPath = OthToEnu(($("#sel_music_list_name")).find("option:selected").text());
        if ($(xml).find("result").text() * 1 == 0) {
            if ($(xml).find("state").text() * 1 == 1) {
                if (scruPath == $(xml).find("name").text()) {
                	bMaskHide = true;
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PLAYLIST_PLAYING"));
                    $("#childmusicRf").attr("disabled", "");
                } else {
                    $("#tab_child_music_list").empty();
                    bMaskHide = false;
                    RfParamCall(DelListCall, "", "delMusicList&name=" + $("#sel_music_list_name").find("option:selected").text());
                }
            } else {
                $("#tab_child_music_list").empty();
                bMaskHide = false;
                RfParamCall(DelListCall, "", "delMusicList&name=" + $("#sel_music_list_name").find("option:selected").text());
            }
        }
    }

    $("#btn_music_subN").click(function () {
        toalget = 0;
        var scruPath = OthToEnu(($("#sel_music_list_name")).find("option:selected").text());
        if (scruPath == "default") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_CHILD_MUSIC_LIST_DELETE_DEFAULT_ERR"));
            return;
        }
        bMaskHide = false;
        $("#childmusicRf").attr("disabled", "disabled");
        RfParamCall(musicsubN, "", "getMusicPlayState")
    })

    function SaveMusicList(mapname, fun) {
        MasklayerShow();
        var music = new Array(49);
        page = 0;
        for (var i = 0; i <= 49; i++) {
            music[i] = "";
        }
        $("#tab_child_music_list th").each(function (i) {
            music[i] = $(this).text();
        })
        RfParamCall(SaveListCall, "", "addMusicList&name=" + mapname + "&startNo=" + page * 10 + "&music0=" + music[0] + "&music1=" + music[1] + "&music2=" + music[2] + "&music3=" + music[3] + "&music4=" + music[4] + "&music5=" + music[5] + "&music6=" + music[6] + "&music7=" + music[7] + "&music8=" + music[8] + "&music9=" + music[9]);

    }

    $("#btn_music_list_OK").click(function () {
        toalget = 0;
        if (ValidInput($("#iput_music_list_name").val()) == false) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EDITBOX_FORMAT_ERROR"));
            $("#iput_music_list_name").focus();
            return;
        }

        //check length
        if (!IsLimitLength($("#iput_music_list_name").val(), 31)) {
            if (gVar_first.N_language != 2)
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS") + " " + lg.get("IDS_CHAR_MAX_LENGTH") + " 31. " + lg.get("IDS_CHARACTER_NOTICE"));
            else
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_EXCEED_MAXLEN_TIPS") + " " + lg.get("IDS_CHAR_MAX_LENGTH") + " 31. ");

            $("#iput_music_list_name").focus();
            return;
        }

        if ($("#iput_music_list_name").val().indexOf(' ') >= 0) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_LIST_NAME_SPACE_ERR"));
            return;
        }

        if ($("#iput_music_list_name").val() == "") {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_LIST_NAME_EMPTY_ERR"));
            return;
        }
        $("#childmusicRf").attr("disabled", "disabled");
        SaveMusicList($("#iput_music_list_name").val(), function (data) {
            $("#div_music_list_name").css("display", "");
            $("#div_music_list_add").css("display", "none");
            $("#iput_music_list_name").val("");
        });
    })
    $("#btn_music_list_CAN").click(function () {
        setTimeout(function () { $("#sel_music_list_name").change() }, 1);
        $("#div_music_list_name").css("display", "");
        $("#div_music_list_add").css("display", "none");
        $("#iput_music_list_name").val("");

        $("#btn_music_add_list").attr("disabled", "disabled");
        $("#btn_music_del_list").attr("disabled", "disabled");
        $("#btn_music_move_up").attr("disabled", "disabled");
        $("#btn_music_move_down").attr("disabled", "disabled");
    })

    //播放列表
    $("#sel_music_list_name").change(function () {
        $("#tab_child_music_list").empty();
        //fix mantis： 5340
        var sel_list_name;
        if ($("#sel_music_list_name").find("option:selected").text() == "") {
            sel_list_name = "default";
        }
        else {
            sel_list_name = $("#sel_music_list_name").find("option:selected").text();
        }
        toalgets = 0;
        //end fix
        bMaskHide = false;
        RfParamCall(MusicNameOfListCall, "", "getMusicsNameOfList&name=" + sel_list_name + "&startNo=" + 0 + "&musicNum=" + 50);
    })

    UI.Table("tab_child_music");
    UI.Table("tab_child_music_list");
    $("#btn_music_add_list").click(function () {
        if (typeof $(".tab_child_music").attr("id") != "undefined") {
            if ($("#tab_child_music_list tr").size() < 50) {
                var leg = $("#tab_child_music_list tr").size();
                var tab = $(".tab_child_music").html();
                var lag;
                for (var i = 0; i < leg; i++) {
                    lag = $("#tab_child_music_list").find("tr").eq(i).html();
                    if ($(tab).text() == $(lag).text()) {
                        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PTZ_CTRACK_NEAR_SAME"));
                        return;
                    }
                }
                $("#tab_child_music_list").append("<tr>" + $(".tab_child_music").html() + "</tr>");

                if ($("#tab_child_music_list tr").size() >= 1) {
                    $("#btn_music_list_OK").attr("disabled", "");
                }
            }
            else {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FB_MUSIC_LIST_NO_ERR"));
            }
        }
    })

    $("#btn_music_del_list").click(function () {
        if (typeof $(".tab_child_music_list").attr("id") != "undefined") {
            $(".tab_child_music_list").remove();
        }
        if ($("#tab_child_music_list tr").size() < 1) {
            $("#btn_music_list_OK").attr("disabled", "disabled");
        }
    })

    $("#btn_music_move_up").click(function () {
        if (typeof $(".tab_child_music_list").attr("id") != "undefined") {
            if (typeof $(".tab_child_music_list").prev().html() == "string" && $(".tab_child_music_list").prev().html() != "") {
                var text = $(".tab_child_music_list").prev().html();
                $(".tab_child_music_list").prev().html($(".tab_child_music_list").html());
                $(".tab_child_music_list").html(text);
                $(".tab_child_music_list").prev().click();
            }
        }
    })

    $("#btn_music_move_down").click(function () {
        if (typeof $(".tab_child_music_list").attr("id") != "undefined") {
            if (typeof $(".tab_child_music_list").next().html() == "string" && $(".tab_child_music_list").next().html() != "") {
                var text = $(".tab_child_music_list").next().html();
                $(".tab_child_music_list").next().html($(".tab_child_music_list").html());
                $(".tab_child_music_list").html(text);
                $(".tab_child_music_list").next().click();
            }
        }
    })

    function MusicCall(xml) {
        $("#sel_music_path").val($(xml).find("musicPath").text() * 1);
        $("#tab_child_music").empty();
        $("#sel_music_list_name").empty();
        $("#tab_child_music_list").empty();
        bMaskHide = false;
        RfParamCall(ListNameCall, "", "getMusicListsName");

    }

    $("#childmusicRf").click(function () {
        toalget = 0;
        bMaskHide = false;
        $("#div_music_list_add").css("display", "none");
        $("#div_music_list_name").css("display", "");
        $("#iput_music_list_name").val("");
        $("#childmusicRf").attr("disabled", "disabled");
        $("#btn_music_add_list").attr("disabled", "disabled");
        $("#btn_music_del_list").attr("disabled", "disabled");
        $("#btn_music_move_up").attr("disabled", "disabled");
        $("#btn_music_move_down").attr("disabled", "disabled");
        RfParamCall(MusicCall, "", "setMusicDefaultListRefresh");
    });

    $("#sel_music_path").change(function () {
        RfParamCall(function (xml) {
            if ($(xml).find("setPathRssult").text() * 1 == 0) {
                $("#tab_child_music").empty();
                $("#sel_music_list_name").empty();
                $("#tab_child_music_list").empty();
                RfParamCall(NameCall, "", "getMusicsNameOfList&name=default");
                RfParamCall(ListNameCall, "", "getMusicListsName");
            }
        }, "", "setMusicPlayPath&path=" + $("#sel_music_path").val());
    })

    $("#childmusicRf").click();
})