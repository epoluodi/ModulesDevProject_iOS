apiready = function(){
	api.setRefreshHeaderInfo({
		visible: true,
		loadingImg: 'widget://image/loading_more.gif',
		bgColor: '#fff',
		textColor: '#979797',
		textDown: '下拉刷新...',
		textUp: '松开刷新...',
		showTime: true
	}, function(ret, err) {
		// 这里写重新渲染页面的方法
		setTimeout(function() {
			api.refreshHeaderLoadDone();
		}, 2000)
	});
	api.addEventListener({
		name: 'scrolltobottom',
		extra: {
			threshold: 50 //设置距离底部多少距离时触发，默认值为0，数字类型
		}
	}, function(ret, err) {
		api.toast({
			msg: '已加载更多数据',
			duration: 2000,
			location: 'bottom'
		});
		// 加载下一页的数据，然后向现有页面追加数据。
	});
}
