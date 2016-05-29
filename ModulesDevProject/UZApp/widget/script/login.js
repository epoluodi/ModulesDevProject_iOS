function QQinstalled() {
	qq.installed(function(ret, err) {
		if (ret.status) {
			QQlogin();
		} else {
			api.toast({
				msg : '本机没有安装指定软件.'
			});
		}
	});
}

function QQlogin() {
	qq.login(function(ret, err) {
		if (ret.status) {
			tlogin(ret.openId,"qq");
//				QQgetUserInfo();
		} else {

			api.toast({
				msg : '登录失败'
			});
		}
	});
}

function QQgetUserInfo() {

	qq.getUserInfo(function(ret, err) {
		if (ret.status) {
			alert(JSON.stringify(ret))
			api.toast({
				msg : '登录成功'
			});
			openwindow({
				_url : "../main/main",
				bounces : false,
				slideBack : false
			})
		} else {
			api.toast({
				msg : '登录失败'
			});

		}
	});
}

function isWxInstalled() {
	wx.isInstalled(function(ret, err) {
		if (ret.installed) {
			Wxauth();
		} else {
			api.toast({
				msg : '本机没有安装指定软件.'
			});
		}
	});
}

function Wxauth() {
	wx.auth(function(ret, err) {
		if (ret.status) {
			WxgetToken(ret.code);
		} else {
			api.toast({
				msg : '登录失败'
			});
		}
	});
}

function WxgetToken(wxcode) {
	wx.getToken({
		code : wxcode
	}, function(ret, err) {
		if (ret.status) {
			tlogin(ret.openId,"weixin")
//			WxgetUserInfo(ret.accessToken, ret.openId);
		} else {
			api.toast({
				msg : '用户授权失败'
			});
		}
	});
}

function WxgetUserInfo(at, oi) {
	wx.getUserInfo({
		accessToken : at,
		openId : oi
	}, function(ret, err) {
		alert(JSON.stringify(ret))
		if (ret.status) {
			api.toast({
				msg : '登录成功'
			});
			openwindow({
				_url : "../main/main",
				bounces : false,
				slideBack : false
			})
			//          {
			//  status: true,      //布尔型；true||false
			//  openid: '',        //字符串类型；普通用户的标识，对当前开发者帐号唯一
			//  nickname: '',      //字符串类型；普通用户昵称
			//  sex: 1,            //数字类型；普通用户性别，1为男性，2为女性
			//  headimgurl: '',    //字符串类型；用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
			//  privilege: [],     //数组类型；用户特权信息，如微信沃卡用户为（chinaunicom）
			//  unionid: ''        //字符串类型；用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的。
			//}
		} else {
			if (err.code == 1) {
				WxrefreshToken();
			} else {
				api.toast({
					msg : '获得用户信息失败'
				});
			}
		}
	});
}

function WxrefreshToken() {
	wx.refreshToken(function(ret, err) {
		if (ret.status) {
			api.toast({
				msg : '登录成功'
			});
			//          {
			//  status: true,      //布尔型；true||false
			//  openid: '',        //字符串类型；普通用户的标识，对当前开发者帐号唯一
			//  nickname: '',      //字符串类型；普通用户昵称
			//  sex: 1,            //数字类型；普通用户性别，1为男性，2为女性
			//  headimgurl: '',    //字符串类型；用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
			//  privilege: [],     //数组类型；用户特权信息，如微信沃卡用户为（chinaunicom）
			//  unionid: ''        //字符串类型；用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的。
			//}
		} else {
			api.toast({
				msg : '未知错误'
			});
		}
	});
}

function tlogin(openid,type){
	mypost({
		_url:thirdLogin,
		_data:{
			openid:openid,
			type:type,
		},
		suc_fun:function(re){
			if(re.status == 2){
				openwindow({
					_url : "../login/checkbindaccount",
					bounces : false,
					para:{openid:openid,type:type}
				})
				return
			}
			if(re.status == 1){
				localStorage.setItem("PICA_TOKEN", re.data.token);
				localStorage.setItem("PICA_UID", re.data.uid);
				api.execScript({
				    name: 'settings',
				    script: "getUserInfo()"
				});
				openwindow({
					_url : "../main/main",
					bounces : false,
					slideBack : false
				})
			}else{
				mytoast(re.msg)
			}
		}
	})
}
