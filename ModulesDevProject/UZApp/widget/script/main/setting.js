var getUserInfo = "";
apiready = function() {
	var userInfoData = ""
	getUserInfo = function() {
		myget({
			_url : getUInfo,
			_data : {
				uid : localStorage.getItem("PICA_UID"),
				token : localStorage.getItem("PICA_TOKEN"),
			},
			suc_fun : function(re) {
				if (re.status == 1) {
					userInfoData = re.data;
					document.getElementById("name").innerText = re.data.username
					document.getElementById("position").innerText = re.data.level_name
					document.getElementById("hosName").innerText = re.data.hos_name
					if (re.data.portrait) {
						document.getElementById("portrait").style.background = "url(" + imgPath + re.data.portrait + ")"
					} else {
						document.getElementById("portrait").style.background = "url(../../image/main/logo.png)"
					}
					document.getElementById("portrait").style.backgroundPosition = "center";
					document.getElementById("portrait").style.backgroundSize = "cover"
					console.log(JSON.stringify(re));
				} else {
					mytoast(re.msg)
				}
			}
		})
	}
	var isAndroid = api.systemType == "android" ? true : false;
	var FNImageClip = api.require('FNImageClip');
	var _buttons = ["拍照", "从相册选取"];

	function getPicture(method) {
		api.getPicture({
			sourceType : method,
			encodingType : 'jpg',
			mediaValue : 'pic',
			destinationType : 'base64',
			allowEdit : true,
			quality : 100,
			targetWidth : 300,
			targetHeight : 300,
			saveToPhotoAlbum : false
		}, function(ret, err) {
			if (ret) {
				var base = ret.base64Data;
				base = base.replace("data:image/jpeg;base64,", "");
				base = base.replace("data:image/png;base64,", "");
				base = base.replace("data:image/jpg;base64,", "");
				//三星手机剪裁后的图片格式为png
				mypost({
					_url : uploadIcon,
					_data : {
						uid : localStorage.getItem("PICA_UID"),
						token : localStorage.getItem("PICA_TOKEN"),
						base64_str : base
					},
					suc_fun : function(re) {
						if (re.status == 1) {
							getUserInfo()
							//							api.execScript({
							//							    name: 'setting',
							//							    script: "reloadSetting()"
							//							});
							mytoast("上传成功")
						} else {
							mytoast(re.msg)
						}
					}
				})
			} else {
				mytoast(JSON.stringify(err));
			}
		});
	}

	getUserInfo()
	//		$("#goLogin").tap(function() {
	//			$(this).hide();
	//			$("#userInfo").show();
	//			$("#topTag").show();
	//		})
	$("#portrait").tap(function() {
		openwindow({
			_url : "../user/userInfo",
			bounces : false,
			para : {
				userInfoData : userInfoData
			}
		})
	})
	$("#goUserInfo").tap(function() {
		openwindow({
			_url : "../user/userInfo",
			bounces : false,
			para : {
				userInfoData : userInfoData
			}
		})
	})
	$("#modufyPwd").tap(function() {
		openwindow({
			_url : "../login/modifyPwd",
			bounces : false
		})
	})
	$("#services").tap(function() {
		api.call({
			type : 'tel_prompt',
			number : '400-092-8791'
		});
	})
	$("#feedback").tap(function() {
		openwindow({
			_url : "../user/feedback",
			bounces : false
		})
	})
	$("#aboutUs").tap(function() {
		openwindow({
			_url : "../user/aboutUs",
			bounces : false
		})
	})
	$("#statement").tap(function() {
		openwindow({
			_url : "../user/statement",
			bounces : false
		})
	})
	$("#logout").tap(function() {
		user.logout("modifypwd");
	});

	$("#onservices").tap(function() {

//		openwindow({
//			_url: "../../online/online",
//			bounces: false,
//			slideBack:false,
//			para: {
//				userInfoData: userInfoData
//			}
//		})
//		return;

		var mq = api.require('meiQia');
		var titleBarColor = {
			color : "#169b75"
		};
		mq.setTitleBarColor(titleBarColor);
		//设置用户信息
		var infoParam = {
			email : localStorage.getItem("PICA_UID"),
			comment : localStorage.getItem("PICA_TOKEN"),
			avatar : "https://app.meiqia.com/images/logo.png",
			tags : ["用户", "疑问"]
		};
		mq.setClientInfo(infoParam);
		mq.show();
	});

	myget({
		_url : checkUpdate,
		suc_fun : function(re) {
			if (re.status == 1) {
				if (re.data.showUpdate == 1) {
					document.getElementById("checkUpdate").style.display = "block"
				}
			} else {
				mytoast(re.msg)
			}
		}
	})
	var mam = api.require('mam');
	$("#checkUpdate").tap(function() {
		myget({
			_url:checkUd,
			suc_fun:function(re){
				if(re.status == 1){
					var sv = re.data.version.replace(/\./g,"");
					sv = parseInt(sv);
					var nv = api.appVersion.replace(/\./g,"");
					nv = parseInt(nv)
					if(nv >= sv){
						mytoast("已经是最新版本")
					}else{
						api.openApp({
							androidPkg : 'android.intent.action.VIEW',
							mimeType : 'text/html',
							uri : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.bug.pica.v1',
							iosUrl : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.bug.pica.v1'
						}, function(ret, err) {
							var msg = JSON.stringify(ret);
							api.alert({
								title: 'openApp',
								msg: msg,
								buttons: ['确定']
							});
						});
					}
				}else{
					mytoast(re.msg)
				}
			}
		})
//		mam.checkUpdate(function(ret, err) {
//			if (ret) {
//				if (ret.result.update) {
//					api.openApp({
//						androidPkg : 'android.intent.action.VIEW',
//						mimeType : 'text/html',
//						uri : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.bug.pica.v1',
//						iosUrl : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.bug.pica.v1'
//					}, function(ret, err) {
//						var msg = JSON.stringify(ret);
//						//						api.alert({
//						//							title: 'openApp',
//						//							msg: msg,
//						//							buttons: ['确定']
//						//						});
//					});
//				};
//			} else {
//				mytoast(JSON.stringify(err));
//			}
//		});
	})
}