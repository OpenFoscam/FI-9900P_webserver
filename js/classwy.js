function IsChromeSupportNacl() {
    var browserName = navigator.userAgent.toLowerCase();

    if (/chrome/i.test(browserName))
    {
        var googleVersion = (browserName.split("chrome/")[1]).split(".")[0];
        //make version judge, such as 45.xxx
        if (googleVersion >= 45) 
        {
            return true;
        }else{
            return false;
        }
    }else {
        return false;
    }
}

function DvrInfo(){
    this.obj = null; //控件对象
    this.tmp_MotionArea = "";
	if(IsChromeSupportNacl()){
		this.Test = function(){}
		this.Init = function(n, t){console.log("groupId:"+t*1);return this.obj[0].postMessage({cmd: 'test', argc: 2, ch:n, groupId:t*1});}
		this.SetHttpsFlg = function (flag) {}
		this.Login = function(p_ip, port, webport, user, pass, streamType,n){
			this.obj[0].postMessage({cmd:'IPC_Login', argc:7, ip:p_ip, mport:port*1, wport:webport*1, usr:user, pwd:pass, stream:streamType*1, ch:0});
		}
		this.SendCgiCmd = function (cmd, timeout, rsv) {
			try {
					if (cmd.indexOf("fwUpgrade") != -1)
					{
						if(lanPage=="sys_updata"){
						this.obj[0].postMessage({cmd:'FirmwareUpgrade', argc:2, ch:0, path:$("#txtSysUpdate").val()});
						}
						if(lanPage=="sys_patch"){
							this.obj[0].postMessage({cmd:'FirmwareUpgrade', argc:2, ch:0, path:$("#txtSysPatch").val()});
						}
					}
                    else if (cmd.indexOf("importConfig") != -1)
                    {
						this.obj[0].postMessage({cmd:'ImportConfigFile', argc:2, ch:0, path:$("#txtSysConfig").val()});
                    }
					else
					{	
						this.obj[0].postMessage({cmd:'SendCgiCmd', argc:4, cgi:cmd, timeout:timeout, ch:0, rsv:rsv});
					}
				}
			catch (e) { }
		}

		this.OpenAudio = function(i){
			this.obj[i].postMessage({cmd:'VolumnCtl', argc:2, volume:100, ch:i});
		}

		this.CloseAudio = function(i){
			this.obj[i].postMessage({cmd:'VolumnCtl', argc:2, volume:0, ch:i});
		}
		
		this.TalkCMD = function(i,cmd){
			if (cmd == 0){
				this.obj[i].postMessage({cmd:'OpenTalk', argc:1, ch:i});//open
			}else{
				this.obj[i].postMessage({cmd:'CloseTalk', argc:1, ch:i});//close
			}
		}
		
		this.Record=function(t){
		    window.clearTimeout(hRecord[IFs]);
		    if (t)//open
		    {
		    	this.obj[0].postMessage({cmd:'OpenManRecord', argc:2, type:t, ch:0});
		    }
		    else
		    {
		    	this.obj[0].postMessage({cmd:'CloseManRecord', argc:2, type:t, ch:0});
		    }       
		}
		
		this.LocalAlarmRecord=function(t, channl)
		{
		    if (t)//open
		    {
		        this.obj[0].postMessage({cmd:'OpenAlarmRecord', argc:2, type:t, ch:0});
		    }
		    else
		    {
		    	this.obj[0].postMessage({cmd:'CloseAlarmRecord', argc:2, type:t, ch:0});
		    }       
		}
		
		this.VedioPlay = function(i,ip, cmd,modeType)
    		{
    			/* // modeType 0:预览视频  1：设置侦测区域  */
    		if (typeof modeType == 'undefined' || modeType =="") modeType = 0; 
			if(cmd == 3)
			{
				this.obj[i].postMessage({cmd:'OpenVideo', argc:2,mode:modeType,ch:i});
			}else if(cmd == 4)
			{
				this.obj[i].postMessage({cmd:'CloseVideo', argc:1, ch:i});
			}
		}
		
		this.LeaveMotionSet = function(i){
			$("#mbox").css("display", "none");
			$("#mboxamb").css("display","none");
			this.VedioPlay(0,gVar_first.ip,4);
		}

		this.LeaveAreaSet = function(i){
			$("#box").css("display", "none");
		}

		this.EnterAreaSet = function(i, n, url, usr, pwd, w, h){
			//this.obj[i].EnterAreaSet(n, url, usr, pwd, w, h);
			$("#box").css("display", "");
		}

		this.EnterConfigPage = function(i, n){
			this.obj[0].postMessage({cmd:'EnterConfigPage', argc:2, flag:n, ch:i});
		}
        this.ClearAreas=function()
		{
			$(".rect").remove();
		}
	   this.GetFileSizeByPath=function(path,fun) 
       { 
        GetFileSizeByPathCallBack=fun; 
        this.obj[0].postMessage({cmd:"getFileSize",path:path,argc:2,ch:0});          
      }
		this.EnterMotionSet = function(i, n, url, usr, pwd, w, h){
			 
			this.VedioPlay(0,gVar_first.ip,3,1);
			if(lanPage=="alarm_mv"||lanPage=="alarm_motion")
			{
				 var strs=this.tmp_MotionArea.split("&");
			if(gVar_first.model>5000&&gVar_first.model<6000)
			{
			
			
			for(var i=0;i<3;i++)
			{
			            var option={};
						option.number=i+1;
						option.left=strs[4*i+1].split("=")[1]*1;
						option.top=strs[4*i+2].split("=")[1]*1;
						option.width=strs[4*i+3].split("=")[1]*1;
						option.height=strs[4*i+4].split("=")[1]*1;
						option.panel="#mboxamb";
						TransformCoordinate(option,1);
						if(option.width==0||option.height==0||!option.width)
						continue;
						drawMotionArea(option);
			}
			}
			else
			{
			for (i = 0; i < 10; i++) 
				{ 
						var str=strs[i+1].split("=")[1]*1;
						for(var j=0;j<10;j++)
						{
							if(str[i]*1>>j&1)
							{
								$("#mbox_"+i+"_"+j).attr("check","1");
								$("#mbox_"+i+"_"+j).css("background","rgb(255,0,0)");
							}
						}
						
						
						
					}
				}
			}
		}

		this.Live = function(i){
			this.obj[0].postMessage({cmd:'Live', argc:1, ch:i});
			$("#box").css("display", "none");
			$("#mbox").css("display", "none");
			$("#mboxamb").css("display","none");
		}
		
		this.MsDel = function(){
			//return(this.obj[0].DelRect());
		}
		
		this.SetMotionArea = function(xml){
				var strs = new Array();
				strs = xml.split(",");
				this.tmp_MotionArea = "";
				if(gVar_first.model > 5000 && gVar_first.model < 6000){
					for(i =0;i<3;i++){
						this.tmp_MotionArea += "&x" + (i+1) + "=" + strs[4*i];
						this.tmp_MotionArea += "&y" + (i+1) + "=" + strs[4*i+1];
						this.tmp_MotionArea += "&width" + (i+1) + "=" + strs[4*i+2];
						this.tmp_MotionArea += "&height" + (i+1) + "=" + strs[4*i+3];
					}
				}else{
				for (i = 0; i < 10; i++) 
				{ 
						this.tmp_MotionArea += "&area" + i + "=" + strs[i];
					}
				} 

		    return this.tmp_MotionArea;
		}
		this.GetMotionArea = function(){
			return (this.tmp_MotionArea);
		}
		
		this.SetAVArea = function(xml){
			//alert(xml);
			//return(this.obj[0].Areas = xml)
		}
		
		this.GetAVArea = function(){
			//return(this.obj[0].Areas)
		}
		
		this.FullScreen=function(n){
			if (document.webkitIsFullScreen){
				document.webkitCancelFullScreen();
			}else{
				$("#ipcamdiv"+n).get(0).webkitRequestFullScreen();
			}
		}
		
		this.SnapPicture=function(){
			this.obj[0].postMessage({cmd:'SnapPicture', argc:1, ch:0});
		}
		
		this.GetDevIPandPort = function (t) {
		    this.obj[0].postMessage({ cmd: 'GetDevIPandPort', argc: 2, time:t, ch: 0 });
		}

		this.SelectRecordPath = function(fun){
			SelectRecordPathCallBack = fun;
	    this.obj[0].postMessage({cmd:'SelectRecordPath', argc:1, ch:0});
		}
		this.SetRecordPath = function(path){
	    this.obj[0].postMessage({cmd:'SetRecordPath', argc:2, path:path, ch:0});
		}
		this.GetRecordPath = function(fun){
			GetRecordPathCallBack = fun;
	    this.obj[0].postMessage({cmd:'GetRecordPath', argc:1, ch:0});
		}
		
		this.OpenLocalRecordFolder = function(path){
	    this.obj[0].postMessage({cmd:'OpenRecordPath', argc:2, ch:0, path:path});
		}
		this.UpdateFirmFilePath = function (fun) {
		    UpdateFirmFilePathCallBack = fun;
		    this.obj[0].postMessage({cmd:'SelectFile', argc:1, ch:0});
		}
		this.SDManage = function(ip){
				this.obj[0].postMessage({cmd:'SDManage', argc:2, ip:ip, ch:0});
		}
		this.SetCheckedOut = function(n){
			
		}
		this.GetFileSizeByPath=function(path,fun)
		{
         GetFileSizeByPathCallBack=fun;
		 this.obj[0].postMessage({cmd:"getFileSize",path:path,argc:2,ch:0});			
		}
	}else{
		this.GetFileSizeByPath=function(path,fun){
			fun(String(this.obj[0].GetFileSizeByPath(path)));
			}
		this.SetRecordPath = function(path){
	    this.obj[0].RecordPath = path;
		}
		this.GetRecordPath = function(fun){
	    fun(String(this.obj[0].RecordPath));
		}
		this.OpenLocalRecordFolder = function(path){
	    this.obj[0].OpenLocalRecordFolder(path);
		}
		this.SelectRecordPath = function(fun){
		    fun(String(this.obj[0].ManualRecordPath));
		}
		this.Test = function(){return this.obj[0].test();}
		this.SetHttpsFlg = function (flag) {
			try {
				this.obj[0].SetHttpsFlg(flag);   //1 - https; 0 - http
			} catch (e) { }
		}
		this.Login = function(ip, port, webport, user, pass, streamType,n){
			this.obj[0].Login(ip, port, webport, user, pass, streamType,n);
		}
		this.SendCgiCmd = function (cmd, tmeout, rsv) {
			try {
				if (gVar.sPage == 1) {
					this.obj[IFs].SendCgiToPlugin(cmd, tmeout, rsv);
				} else {
					this.obj[0].SendCgiToPlugin(cmd, tmeout, rsv);
				  }
			} catch (e) { }
		}
		
		this.OpenAudio = function(i){
			this.obj[i].OpenAudio();
		}
	
		this.CloseAudio = function(i){
			this.obj[i].CloseAudio();
		}
		
		this.TalkCMD = function(i,cmd){
			if (cmd == 0){
				return(this.obj[i].OpenTalk())
			}else{
				return(this.obj[i].CloseTalk())
			}
		}
		
		this.Record=function(t){
	        window.clearTimeout(hRecord[IFs]);
			this.obj[IFs].Record(t,"");
	        
		}
		this.LocalAlarmRecord=function(t, channl)
		{
		    this.obj[channl].Record(t, "alarm");
		}
	
		this.VedioPlay = function(i,ip, cmd){
			if(cmd == 3){
				this.obj[i].Open("rtsp://"+ip+"/videoMain");
			}else if(cmd == 4){
				this.obj[i].Close();
			}
		}
		
		this.LeaveMotionSet = function(i){
			this.obj[i].LeaveMotionSet();
		}

		this.LeaveAreaSet = function(i){
			this.obj[i].LeaveAreaSet();
		}

		this.EnterAreaSet = function(i, n, url, usr, pwd, w, h){
			this.obj[i].EnterAreaSet(n, url, usr, pwd, w, h);
		}

		this.EnterConfigPage = function(i, n){
			this.obj[i].EnterConfigPage(n);
		}

		this.EnterMotionSet = function(i, n, url, usr, pwd, w, h){
			this.obj[i].EnterMotionSet(n, url, usr, pwd, w, h);
		}

		this.Live = function(i){
			this.obj[i].Live();
		}
		
		this.MsDel = function(){
			return(this.obj[0].DelRect());
		}
			
		this.SetMotionArea = function(xml){
			return(this.obj[0].MotionAreas = xml)
		}
		
		this.GetMotionArea = function(){
			return(this.obj[0].MotionAreas)
		}
		
		
		this.SetAVArea = function(xml){
			return(this.obj[0].Areas = xml)
		}
		
		this.GetAVArea = function(){
			return(this.obj[0].Areas)
		}
		
		this.FullScreen=function(){
			this.obj[IFs].FullScreen();
		}
		
		this.UpdateFirmFilePath = function (fun) {
		    try {
		        fun(String(this.obj[0].GetUpdataFilePath));
		    } catch (e) { }
		}
		this.GetDevIPandPort = function (t) {
		   
		        this.obj[0].GetDevIPandPort(t);
		}
		
		this.SDManage = function(ip)
		{
				this.obj[0].SDManage(ip);
		}
		this.UpdatePluginWindow = function(i){
			this.obj[i].UpdatePluginWindow();
		}
		this.CloseIETab = function(i){
			this.obj[i].CloseIETab();
		}
	}
		
	this.isHttpsconn = function (httpscon) {
	    try {
	        this.obj[0].isHttpsconn(httpscon);
	    }
	    catch (e) {
	    }
	}
	
	this.SetLauguage=function(n){
		for(var i=0; i<9; i++)
		this.obj[i].SetLauguage(n);
	}
	
	this.RfLive=function(){
		this.obj[IFs].GetLiveCfg();
	}
	
	this.PbVedioPlay = function(ip, dir, file, cmd){
		if(cmd == 3){
			if(typeof file=='undefined') return false;
			this.obj[0].PlaybackOpen(dir+",rtsp://"+ip+"/"+file);
		}else if(cmd == 4){
			this.obj[0].PlaybackClose();
		}else if(cmd == 5){
			this.obj[0].PlaybackPause();
		}else if(cmd == 6){
			this.obj[0].PlaybackResume();
		}
		return true;
	}
	
	this.PBClose = function(){
		this.obj[0].PlaybackClose();
	}
	
	this.PbSeek = function(time){
		this.obj[0].PlaybackSeek(time*1);
	}
	
	this.PbPause = function(){
		this.obj[0].PlaybackPause();
	}
	
	this.PbResume = function(){
		this.obj[0].PlaybackResume();
	}
	
	this.SetCheckedOut = function(n){
		return(this.obj[0].SetCheckedOut(n));
	}

	this.ChangeWndSize = function (t, n,amba) {
	    if (t == -1) {
	        this.LeaveMotionSet(0);
	        return (this.LeaveAreaSet(0));
	    } else if (t == 2) {
	        return (this.EnterAreaSet(0, n, "rtsp://" + gVar.ip + "/videoMain", gVar.user, gVar.passwd, 800, 500));
	    } else if (t == 0) {
	        for (var i = 1; i < 9; i++) {
	            try {
	                this.EnterConfigPage(i, 0);
	            } catch (e) { }
	        }
	        return (this.Live(0))
	    } else if (t == 1) {
	        for (var i = 1; i < 9; i++) {
	            try {
	                this.EnterConfigPage(i, 2);
	            } catch (e) { }
	        }
	        return (this.obj[0].Playback())
	    } else if (t == 3) {
	        if (amba == 1) {
	            return (this.EnterMotionSet(0, n, "rtsp://" + gVar.ip + "/videoMain", gVar.user, gVar.passwd, 700, 480));
	        }
	        else {
	            return (this.EnterMotionSet(0, n, "rtsp://" + gVar.ip + "/videoMain", gVar.user, gVar.passwd, 800, 500));
	        }
	    }
	    else if (t == 4) {
	        for (var i = 0; i < 9; i++) {
	            try {
	                this.EnterConfigPage(i, 1);
	            } catch (e) { }
	        }
	    }
	    
	    
	};
	
	

	this.GetCGIResult = function (i, cmd, isHttps) {
	    var cgiRet = "";
	    try {
	        cgiRet = this.obj[i].GetCGIResult(cmd, isHttps);
	    }
	    catch (e) {
	    }

	    return cgiRet;
	}

	this.ClearAreas = function () {
	    try {
	        if (!isSafari) {
	            this.obj[0].ClearAreas();
            }
	    } catch (e) { }
	}
}