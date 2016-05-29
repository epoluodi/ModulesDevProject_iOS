var SEND_VCODE_TIMER = 60;
function initBack() {
	var backBtn = document.querySelector(".navBarBack");
	if (backBtn) {
		$api.addEvt(backBtn, "click", function() {
			api.closeWin({});
		})
	}
}

function statusBarHeight(){
	if(api.systemType == "ios"){
		return 20;
	}
	return 0;
}

function openwindow(windowobj) {
	var name = windowobj._url.substring(windowobj._url.lastIndexOf("/") + 1, windowobj._url.length);
	api.openWin({
		name : name,
		url : windowobj._url + ".html",
		pageParam : windowobj.para ? windowobj.para : {},
		animation : {
			type : "movein", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300
		},
		reload : true,
		customRefreshHeader : windowobj.refreshStr ? windowobj.refreshStr : "",
		bounces : windowobj.bounces == false ? windowobj.bounces : true,
		slidBackEnabled : windowobj.slideBack == false ? windowobj.slideBack : true,
		delay : 0,
	});
}

function openFrame(windowobj) {
	var name = windowobj._url.substring(windowobj._url.lastIndexOf("/") + 1, windowobj._url.length);
	api.openFrame({
		name : name,
		url : windowobj._url + ".html",
		rect : {
			x : windowobj._x ? windowobj._x : 0, //左上角x坐标
			y : windowobj._y ? windowobj._y : 45, //左上角y坐标
			w : "auto", //宽度，若传'auto'，页面从x位置开始自动充满父页面宽度
			h : "auto", //高度，若传'auto'，页面从y位置开始自动充满父页面高度
			marginLeft : 0, //相对父window左外边距的距离
			marginTop : 0, //相对父window上外边距的距离
			marginBottom : 0, //相对父window下外边距的距离
			marginRight : 0 //相对父window右外边距的距离
		},
		pageParam : windowobj.para ? windowobj.para : {},
		bounces : windowobj.bounces == false ? windowobj.bounces : true,
		bgColor : 'rgba(0,0,0,0)',
		vScrollBarEnabled : true,
		hScrollBarEnabled : true
	});
}

function initVcodeBtn(dom) {
	var timer = SEND_VCODE_TIMER;
	$api.addCls(document.getElementById("getVcodeBtn"), "disab");
	var vcodeInterval = setInterval(function() {
		if (timer > 0) {
			dom.innerText = timer + "s后重新获取";
			timer--;
			dom.setAttribute("dis", true);
		} else {
			dom.innerText = "重新获取";
			$api.removeCls(document.getElementById("getVcodeBtn"), "disab");
			dom.setAttribute("dis", false);
			timer = SEND_VCODE_TIMER;
			clearInterval(vcodeInterval)
		}
	}, 1000)
}

function mytoast(msg) {
	api.toast({
		msg : msg,
		duration : 2000,
		location : 'bottom'
	});
}

function exitApp() {
	api.addEventListener({
		name : 'keyback'
	}, function(ret, err) {
		api.toast({
			msg : '再按一次返回键退出云鹊知',
			duration : 2000,
			location : 'bottom'
		});

		api.addEventListener({
			name : 'keyback'
		}, function(ret, err) {
			api.closeWidget({
				id : 'A6916611205367', //这里改成自己的应用ID
				retData : {
					name : 'closeWidget'
				},
				silent : true
			});
		});

		setTimeout(function() {
			exitApp();
		}, 2000)
	});
}

function myget(obj) {
	console.log("before:" + localStorage.getItem("PICA_TOKEN") +"="+localStorage.getItem("PICA_UID"))
//	api.showProgress({
//		style : 'default',
//		animationType : 'fade',
//		title : '努力加载中...',
//		modal : true
//	});
	api.ajax({
		url : obj._url,
		method : 'get',
		data : {
			values : obj._data,
		},
		charset:"utf-8",
		timeout : 5,
	}, function(ret, err) {
		console.log("suc:" + localStorage.getItem("PICA_TOKEN") +"="+localStorage.getItem("PICA_UID")+"="+ret.status)
//		api.hideProgress();
		if (ret.status == -1) {
			api.refreshHeaderLoadDone();
			user.logout();
			return
		}
		if (ret) {
			obj.suc_fun(ret);
		} else {
			console.log(JSON.stringify(err));
			if (obj.er_fun) {
				obj.er_fun();
			}
		}
	});
}

function mypost(obj) {
	api.showProgress({
		style : 'default',
		animationType : 'fade',
		title : '努力加载中...',
		modal : true
	});
	api.ajax({
		url : obj._url,
		method : 'post',
		data : {
			values : obj._data,
		},
		charset:"utf-8",
		dataType:"json",
		timeout : 5,
	}, function(ret, err) {
		console.log(localStorage.getItem("PICA_TOKEN") +"="+localStorage.getItem("PICA_UID"))
		if (ret.status == -1) {
			api.refreshHeaderLoadDone();
			user.logout();
			return;
		}
		api.hideProgress();
		if (ret) {
			obj.suc_fun(ret);
		} else {
			console.log(JSON.stringify(err));
			if (obj.er_fun) {
				obj.er_fun();
			}
		}
	});
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
	return currentdate;
}
