var user = {}

user.isLogin = function(){
	var uid = localStorage.getItem("PICA_UID")
	var token = localStorage.getItem("PICA_TOKEN")
	if(uid&&token){
		return true
	}else{
		return false;
	}
}

user.logout = function(method){
	api.clearCache(function(ret, err) {
		if (ret) {
			localStorage.setItem("PICA_UID","")
			localStorage.setItem("PICA_TOKEN","")
			openwindow({
				_url: "widget://html/login/login",
				bounces: false,
				para:{method:method}
			})
		} else {
			mytoast("注销失败")
		}
	});
}
