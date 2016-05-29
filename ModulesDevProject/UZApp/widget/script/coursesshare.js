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
		url : shareCourseUrl + cid,
		title : cname,
		description : '点击查看课程',
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
		url :  shareCourseUrl + cid,
		title : cname,
		description : '点击查看课程',
		imgUrl : 'http://pica.un-bug.com/pica/public/admin/images/default.jpg',
		type : "QZone"
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
	    title:cname,
	    description : '点击查看课程',
		thumb : 'widget://image/api_1.png',
	    contentUrl: shareCourseUrl + cid
	}, function(ret, err){
	    if(ret.status){
	        mytoast('分享成功');
	    }else{
	        mytoast(err.code);
	    }
	});
}
