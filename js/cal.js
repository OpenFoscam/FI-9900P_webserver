(function ($) {
	var timeCount=0
    var today = new Date();
    var months = "1,2,3,4,5,6,7,8,9,10,11,12".split(',');
    var monthlengths = '31,28,31,30,31,30,31,31,30,31,30,31'.split(',');
    var dateRegEx = /^\d{1,2}\/\d{1,2}\/\d{2}|\d{4}$/;
    var yearRegEx = /^\d{4,4}$/;
	var week = ["IDS_BS_SUNDAY","IDS_BS_MONDAY", "IDS_BS_TUESDAY" ,"IDS_BS_WEDNESDAY","IDS_BS_THURSDAY","IDS_BS_FRIDAY","IDS_BS_SATURDAY"];
    var weeks= ["IDS_WEEK_SUNDAYS","IDS_WEEK_MONDAYS", "IDS_WEEK_TUESDAYS" ,"IDS_WEEK_WEDNESDAYS","IDS_WEEK_THURSDAYS","IDS_WEEK_FRIDAYS","IDS_WEEK_SATURDAYS"];
    this.a = 0;
    this.b = 0;
    _self = this;
   
    $.fn.simpleDatepicker = function (options) {
        var opts = jQuery.extend({}, jQuery.fn.simpleDatepicker.defaults, options);
        setupYearRange();
        function setupYearRange() {
            opts.startyear = 1970;
            opts.endyear = 2022;
        }

        function newDatepickerHTML() {
            var years = [];
            for (var i = 0; i <= opts.endyear - opts.startyear; i++) years[i] = opts.startyear + i;


            var table = jQuery('<table class="datepicker" cellpadding="0" cellspacing="0"></table>');
            table.append('<thead></thead>');
            table.append('<tfoot></tfoot>');
            table.append('<tbody class="tbody"></tbody>');


            var selectMonth = "";
            selectMonth = '<div class="selectMonth"><select class="selmonth" name="month">';
            for (var i in months) selectMonth += ('<option value="' + i + '">' + months[i] + '</option>');
            selectMonth += '</select></div>';

            var yearselect = "";
            yearselect = '<div class="yearselect"><select class="selyear" name="year">';
            for (var i in years) yearselect += ('<option>' + years[i] + '</option>');
            yearselect += '</select></div>';
            jQuery("thead", table).append('<tr class="controls"><th><div class="prevMonth"></div></th><th></th><th></th><th></th><th></th><th colspan="7" style="text-align:left; height: 30px;">' + yearselect + '<div style="float:left;text-align:left;">&nbsp;.&nbsp;</div>' + selectMonth + '<th><div class="nextMonth"></div></th></th></tr>');
            jQuery("thead", table).append('<tr class="days"><th></th><th></th><th></th><th></th><th></th><th></th><th>' + lg.get(weeks[0]) + '</th><th>' + lg.get(weeks[1]) + '</th><th>' + lg.get(weeks[2]) + '</th><th>' + lg.get(weeks[3]) + '</th><th>' + lg.get(weeks[4]) + '</th><th>' + lg.get(weeks[5]) + '</th><th>' + lg.get(weeks[6]) + '</th></tr>');
            jQuery("tbody", table).append('<tr><th class="CALMAXDAY" colspan="6" rowspan="7"></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
            for (var i = 1; i < 6; i++) jQuery("tbody", table).append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
            jQuery(".CALMAXDAY", table).append('<div class="ToData"></div><div class="ToDayS"></div><div style="position:absolute;top:135px;left:8px;"><span class="ToDay"></span></div>');

            //for (var i = 0; i < 3; i++) jQuery("tbody",table).append('<tr><td></td><td></td></tr>');
            return table;
        }

        function CreateTip() {
            var div = jQuery('<div id="CalTip" style="width:123px;height:109px;position:absolute;display:none; z-index:10000"><p style="color:#F00;font-size:12px;margin:30px 20px;"></p></div>');
            return div;
        }

        function loadMonth(e, el, datepicker, chosendate, tip) {

            var mo = jQuery("select[name=month]", datepicker).get(0).selectedIndex;
            var yr = jQuery("select[name=year]", datepicker).get(0).selectedIndex;
            var yrs = jQuery("select[name=year] option", datepicker).get().length;
            if (_self.a != mo || _self.b != yr) {
                _self.a = mo;
                _self.b = yr;
            }

            if (e && jQuery(e.target).hasClass('prevMonth')) {
                if (0 == mo && yr) {
                    yr -= 1; mo = 11;
                    jQuery("select[name=month]", datepicker).get(0).selectedIndex = 11;
                    jQuery("select[name=year]", datepicker).get(0).selectedIndex = yr;
                } else {
                    mo -= 1;
                    jQuery("select[name=month]", datepicker).get(0).selectedIndex = mo;
                }
            } else if (e && jQuery(e.target).hasClass('nextMonth')) {
                if (11 == mo && yr + 1 < yrs) {
                    yr += 1; mo = 0;
                    jQuery("select[name=month]", datepicker).get(0).selectedIndex = 0;
                    jQuery("select[name=year]", datepicker).get(0).selectedIndex = yr;
                } else {
                    mo += 1;
                    jQuery("select[name=month]", datepicker).get(0).selectedIndex = mo;
                }
            }

            if (0 == mo && !yr) jQuery("div.prevMonth", datepicker).hide();
            else jQuery("div.prevMonth", datepicker).show();
            if (yr + 1 == yrs && 11 == mo) jQuery("div.nextMonth", datepicker).hide();
            else jQuery("div.nextMonth", datepicker).show();

            var cells = jQuery("tbody td", datepicker).unbind().empty().removeClass('date');

            var m = jQuery("select[name=month]", datepicker).val();
            var y = jQuery("select[name=year]", datepicker).val();
            var d = new Date(y, m, 1);
            var startindex = d.getDay();
            var numdays = monthlengths[m];

            if (1 == m && ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)) numdays = 29;

            if (opts.startdate.constructor == Date) {
                var startMonth = opts.startdate.getMonth();
                var startDate = opts.startdate.getDate();
            }
            if (opts.enddate.constructor == Date) {
                var endMonth = opts.enddate.getMonth();
                var endDate = opts.enddate.getDate();
            }

            $(".chosen").removeClass('chosen');
            $(".chosen2").removeClass('chosen2');
            $(".chosen3").removeClass('chosen3');
            for (var i = 0; i < numdays; i++) {

                var cell = jQuery(cells.get(i + startindex)).removeClass('chosen');

                if (
					(yr || ((!startDate && !startMonth) || ((i + 1 >= startDate && mo == startMonth) || mo > startMonth))) &&
					(yr + 1 < yrs || ((!endDate && !endMonth) || ((i + 1 <= endDate && mo == endMonth) || mo < endMonth)))) {

                    cell
						.text(i + 1)
						.addClass('date')
						.hover(
							function () {
							    jQuery(this).addClass('over');
							    if ($.isFunction(opts.CallBack)) {
							        var dateObj = new Date(jQuery("select[name=year]", datepicker).val(),
										jQuery("select[name=month]", datepicker).val(), jQuery(this).text());
							        opts.CallBack(tip, jQuery.fn.simpleDatepicker.formatOutput(dateObj, opts.UseZS),
										$(this).offset().top + 25, $(this).offset().left - 85);
							    }
							},
							function () { jQuery(this).removeClass('over'); jQuery(tip).hide(); })
						.click(function () {
						    var chosenDateObj = new Date(jQuery("select[name=year]", datepicker).val(), jQuery("select[name=month]", datepicker).val(), jQuery(this).text());
						    $(".chosen3").addClass('chosen2').removeClass("chosen3");
						    $(".chosen").removeClass('chosen');
						    if ($(this).attr("class").indexOf("chosen2") != -1) {
						        $(this).addClass('chosen3');
						    } else {
						        $(this).addClass('chosen');
						    }
						    closeIt(el, datepicker, chosenDateObj);
						});

                    if (i + 1 == opts.chosendate.getDate() && m == opts.chosendate.getMonth() && y == opts.chosendate.getFullYear()) {
                        $(".chosen").removeClass('chosen');
                        cell.addClass('chosen');
                    } else if (i == 0 && (m != opts.chosendate.getMonth() || y != opts.chosendate.getFullYear())) {
                        $(".chosen").removeClass('chosen');
                        if(gVar.sPage == 2){  //Playback
                            cell.click();
                        }
                    }
                }

                if (!opts.type) {
                    if ($("#CalDayID")[0]) {
                        if ($("#CalDayID").attr("name").indexOf(y + "-" + (Number(m) + 1) + "-" + (i + 1) + ",") != -1) {
                            if (cell.attr("class").indexOf("chosen") != -1) {
                                cell.addClass('chosen3');
                            } else {
                                cell.addClass('chosen2');
                            }
                        } else {
                            cell.removeClass('chosen2');
                            cell.removeClass('chosen3');
                        }
                    }
                }
            }

            el.focus();
        }

        function closeIt(el, datepicker, dateObj) {
            if (opts.type == 0) {
                if (dateObj && dateObj.constructor == Date) {
                    opts.chosendate = dateObj;
                    $("#calday").val(jQuery.fn.simpleDatepicker.formatOutput(dateObj, opts.UseZS));
                }
            } else {
                if (dateObj && dateObj.constructor == Date) {
                    el.val(jQuery.fn.simpleDatepicker.formatOutput(dateObj, opts.UseZS));
                    el.attr("DateTime", dateObj)
                }
                datepicker.remove();
                $("#" + opts.nIframe).css({ position: 'absolute', width: 0, height: 0 });
                datepicker = null;
                jQuery.data(el.get(0), "simpleDatepicker", { hasDatepicker: false });
                el.attr("idname", "");
            }

        }
       function setCalTime()
	   {
		    $(".ToDay").html(jQuery.fn.simpleDatepicker.formatOutput(new Date(), opts.UseZS));
            $(".ToData").html((new Date()).getDate());
            $(".ToDayS").html(lg.get(week[(new Date()).getDay() * 1]));
	   }
        return this.each(function () {
            if (jQuery(this).is('input') && 'text' == jQuery(this).attr('type')) {
                var datepicker, tip;
                jQuery.data(jQuery(this).get(0), "simpleDatepicker", { hasDatepicker: false }); 				
                jQuery(this).click(function (ev) {
                    var $this = jQuery(ev.target);
                    if (false == jQuery.data($this.get(0), "simpleDatepicker").hasDatepicker) {
                        jQuery.data($this.get(0), "simpleDatepicker", { hasDatepicker: true });
                        var selectDate = new Date($("#bsTSTime").attr("DateTime"));
                        var initialDate = $this.val();
                        if (initialDate && dateRegEx.test(initialDate)) {
                            //var chosendate = new Date(initialDate);
                            var chosendate = today;
                        } else if (opts.chosendate.constructor == Date) {
                            var chosendate = opts.chosendate;
                        } else if (opts.chosendate) {
                            var chosendate = new Date(opts.chosendate);
                        } else {
                            var chosendate = today;
                        }
                        datepicker = newDatepickerHTML();
                        jQuery("#" + opts.name).html(datepicker);
                        tip = CreateTip();
                        jQuery("body").append(tip);
                        opts.tip = tip;

                        var elPos = [0, 0];
                        var x = (parseInt(opts.x) ? parseInt(opts.x) : 0) + elPos[0];
                        var y = (parseInt(opts.y) ? parseInt(opts.y) : 0) + elPos[1];
                        jQuery(datepicker).css({ position: 'absolute', left: x, top: y });

                        if ($.browser.msie && $.browser.version.indexOf("6") != -1) {
                            $("#" + opts.nIframe).css({ position: 'absolute', left: jQuery(datepicker).css("left"), top: jQuery(datepicker).css("top"), width: jQuery(datepicker).css("width"), height: jQuery(datepicker).css("height") });
                        }

                        jQuery("div", datepicker).css("cursor", "default");
                        jQuery("select", datepicker).bind('change', function () { $(this).blur(); loadMonth(null, $this, datepicker, chosendate, tip); });
                        jQuery("div.prevMonth", datepicker).click(function (e) { loadMonth(e, $this, datepicker, chosendate, tip); });
                        jQuery("div.nextMonth", datepicker).click(function (e) { loadMonth(e, $this, datepicker, chosendate, tip); });
                        if (opts.type == 0) {
                            jQuery("span.today,.ToData,.ToDayS,.ToDay", datepicker).click(function () {
                                $(".chosen").removeClass('chosen');
                                $(this).addClass('chosen');
                                opts.chosendate = today;
                                jQuery("select[name=month]", datepicker).get(0).selectedIndex = chosendate.getMonth();
                                jQuery("select[name=year]", datepicker).get(0).selectedIndex = Math.max(0, chosendate.getFullYear() - opts.startyear);
                                loadMonth(null, $this, datepicker, chosendate, tip);
                                closeIt($this, datepicker, new Date());
                            });
                            jQuery(document).click(function () { jQuery(opts.tip).hide(); });
                            jQuery("select[name=month]", datepicker).get(0).selectedIndex = chosendate.getMonth();
                            jQuery("select[name=year]", datepicker).get(0).selectedIndex = Math.max(0, chosendate.getFullYear() - opts.startyear);
                            loadMonth(null, $this, datepicker, chosendate, tip);
                            if($(".selectedb").attr("id") == "bs_time"){
                                opts.chosendate = selectDate;
                                jQuery("select[name=month]", datepicker).get(0).selectedIndex = selectDate.getMonth();
                                jQuery("select[name=year]", datepicker).get(0).selectedIndex = Math.max(0, selectDate.getFullYear() - opts.startyear);
                                loadMonth(null, $this, datepicker, selectDate, tip);
                            }
                        } else {

                            $this.blur(function () {
                                if ($this.attr("idname") != "mouseover") {
                                    datepicker.fadeTo("slow", 0, function () {
                                        closeIt($this, datepicker);
                                    });
                                    $this.attr("idname", "");
                                    datepicker.fadeTo(100, 1);
                                }
                            });
                            datepicker.mouseover(function () { $this.attr("idname", "mouseover"); });
                            datepicker.mouseout(function () { $this.attr("idname", ""); });
                            jQuery("span.ToDay,div.ToData,div.ToDayS", datepicker).click(function () { closeIt($this, datepicker, new Date()); });
                            jQuery("select[name=month]", datepicker).get(0).selectedIndex = chosendate.getMonth();
                            jQuery("select[name=year]", datepicker).get(0).selectedIndex = Math.max(0, chosendate.getFullYear() - opts.startyear);
                            loadMonth(null, $this, datepicker, chosendate, tip);
                            if($(".selectedb").attr("id") == "bs_time"){
                                opts.chosendate = selectDate;
                                jQuery("select[name=month]", datepicker).get(0).selectedIndex = selectDate.getMonth();
                                jQuery("select[name=year]", datepicker).get(0).selectedIndex = Math.max(0, selectDate.getFullYear() - opts.startyear);
                                loadMonth(null, $this, datepicker, selectDate, tip);
                            }
                        }
                       
					   setCalTime();
					   clearInterval(timeCount);
                       timeCount=setInterval(function(){
              		    setCalTime();
						 },1000);
                    }

                });
            }

        });
    };

    jQuery.fn.simpleDatepicker.formatOutput = function (dateObj, type) {
        if (typeof type != 'undefined' && type) {
            if (jQuery.fn.simpleDatepicker.TimeType == 2) {
                return ((dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear());
            } else if (jQuery.fn.simpleDatepicker.TimeType == 0) {
                return (dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate());
            } else if (jQuery.fn.simpleDatepicker.TimeType == 1) {
                return (dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear());
            }
        }
        return (dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate());
    };

    jQuery.fn.simpleDatepicker.ShowInputTip = function (Tip, Tiptext, top, left) {
        jQuery(Tip).find("p").html(Tiptext);
        jQuery(Tip).slideDown("quit").css("left", left).css("top", top);
    };

    jQuery.fn.simpleDatepicker.TimeType = 0;

    jQuery.fn.simpleDatepicker.defaults = {
        chosendate: today,
        startdate: today.getFullYear(),
        enddate: today.getFullYear(),
        name: "calendar",
        nIframe: "nIframe",
        type: 0,
        x: 0,
        y: 0,
        tip: null,
        CallBack: null,
        Laguage: "CHS",
        UseZS: false
    };
})(jQuery);

