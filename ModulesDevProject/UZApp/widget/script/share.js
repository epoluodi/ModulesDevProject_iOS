function QQinstalled(sharetype) {
	qq.installed(function(ret, err) {
		if (ret.status) {
			if (sharetype == 'qqfriends') {
				shareNews_QFriend();
			} else if (sharetype == 'qqzone') {
				shareNews_QZone();
			} else {
				api.toast({
					msg : '分享失败'
				});
			}
		} else {
			api.toast({
				msg : '指定应用未找到'
			});
		}
	});
}

function shareNews_QFriend() {
	qq.shareNews({
		url : 'http://pica.un-bug.com/pica/index.php/home/Index/get_user_info/uid/'+localStorage.getItem("PICA_UID"),
		title : '我的简介',
		description : '点击查看我的介绍',
		imgUrl : 'widget://image/api_1.png',
		type : "QFriend"
	}, function(ret, err) {
		if (ret.status) {
			api.toast({
				msg : '分享成功'
			});
		} else {
			api.toast({
				msg : '分享取消 '
			});
		}
	});
}

function shareNews_QZone() {
	qq.shareNews({
		url : 'http://pica.un-bug.com/pica/index.php/home/Index/get_user_info/uid/'+localStorage.getItem("PICA_UID"),
		title : '我的简介',
		description : '点击查看我的介绍',
		imgUrl : 'http://pica.un-bug.com/pica/public/admin/images/default.jpg',
		type : "QZone"
	}, function(ret, err) {
		if (ret.status) {
			api.toast({
				msg : '分享成功'
			});
		} else {
			alert(JSON.stringify(err))
			api.toast({
				msg : '分享取消 '
			});
		}
	});
}

function isWXInstalled(shareType) {
	wx.isInstalled(function(ret, err) {
		if (ret.installed) {
			sharewx(shareType)
		} else {
			mytoast(JSON.stringify(err))
		}
	});
}

function sharewx(shareType){
	wx.shareWebpage({
	    scene: shareType,
	    title: '我的简介',
	    description : '点击查看我的介绍',
		thumb : 'widget://image/api_1.png',
	    contentUrl: 'http://pica.un-bug.com/pica/index.php/home/Index/get_user_info/uid/'+localStorage.getItem("PICA_UID")
	}, function(ret, err){
	    if(ret.status){
	        mytoast('分享成功');
	    }else{
	        mytoast(err.code);
	    }
	});
}
