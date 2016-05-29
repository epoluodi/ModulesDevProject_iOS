apiready = function() {
	var canTap = true;
	var hammertime = new Hammer(document.getElementById("sliderContainer"));
	//添加事件
	hammertime.on("panstart", function(e) {
		//控制台输出
		canTap = false;
	});
	hammertime.on("panend", function(e) {
		setTimeout(function(){
			canTap = true;
		},500)
	})
	var bannerWidth = api.winWidth;
	document.getElementById("main").style.paddingTop = (bannerWidth / 1.6) +10+ "px";
	var imgIdArr = [];
	var canclick = false;
	myget({
		_url: banner,
		suc_fun: function(re) {
			if (re.status == 1) {
				var imgpath = []
				for (var i in re.data) {
					imgpath.push(imgPath + re.data[i].cover);
					imgIdArr.push(re.data[i].id);
				}
				var UIScrollPicture = api.require('UIScrollPicture');
				//				UIScrollPicture.addEventListener({
				//				    name: 'tap'
				//				}, function( ret, err ){
				//				    if( ret ){
				//						openwindow({
				//							_url:"widget://html/courses/coursesDetail",
				//							bounces:false,
				//							slidBackEnabled:true,
				//							para:{courseId:imgIdArr[ret.index]}
				//						})
				////				          alert( JSON.stringify( ret ) );
				//				    }else{
				//				          mytoast( JSON.stringify( err ) );
				//				    }
				//				});
				UIScrollPicture.open({
					rect: {
						x: 0,
						y: 0,
						w: bannerWidth,
						h: bannerWidth / 1.6
					},
					data: {
						paths: imgpath,
						//			captions: ['这是第一个banner', '这是第二个banner', '这是个第三个banner']
					},
					styles: {
						caption: {
							height: 35,
							color: '#E0FFFF',
							size: 13,
							bgColor: '#696969',
							position: 'bottom'
						},
						indicator: {
							align: 'center',
							color: '#FFFFFF',
							activeColor: '#DA70D6'
						}
					},
					placeholderImg: 'widget://image/default.jpg',
					contentMode: 'scaleToFill',
					interval: 3,
					fixedOn: api.frameName,
					loop: true,
					fixed: false
				}, function(ret, err) {
					if (ret) {
						if (ret.eventType == "click") {
							openwindow({
								_url: "widget://html/courses/coursesDetail",
								bounces: false,
								slidBackEnabled: true,
								para: {
									courseId: imgIdArr[ret.index]
								}
							})
						}
						console.log(JSON.stringify(ret));
					} else {
						console.log(JSON.stringify(err));
					}
				});
			} else {
				mytoast(re.msg)
			}
		}
	})

	//	api.setRefreshHeaderInfo({
	//		visible: true,
	//		loadingImg: 'widget://image/loading_more.gif',
	//		bgColor: '#fff',
	//		textColor: '#979797',
	//		textDown: '下拉刷新...',
	//		textUp: '松开刷新...',
	//		showTime: true
	//	}, function(ret, err) {
	//		// 这里写重新渲染页面的方法
	//		setTimeout(function() {
	//			api.refreshHeaderLoadDone();
	//		}, 2000)
	//	});
	//	api.addEventListener({
	//		name: 'scrolltobottom',
	//		extra: {
	//			threshold: 50 //设置距离底部多少距离时触发，默认值为0，数字类型
	//		}
	//	}, function(ret, err) {
	//		api.toast({
	//			msg: '已加载更多数据',
	//			duration: 2000,
	//			location: 'bottom'
	//		});
	//		// 加载下一页的数据，然后向现有页面追加数据。
	//	});

	myget({
		_url: homeList,
		suc_fun: function(re) {
			if (re.status == 1) {
				document.getElementById("sliderContainer").innerHTML = baidu.template("indexBottomTemp", re);
				var sliderItem = $api.domAll(".sliderItem");
				var sliderItemContainer = $api.domAll(".sliderItemContainer");
				var sliderItemContainerArr = []
				nelson.each(sliderItem, function(i, item) {
					var itemLiLength = item.children.length;
					var lilength = itemLiLength * 160 - 10;
					item.style.width = lilength + "px";
				})
				nelson.each(sliderItemContainer, function(i, item) {
					var ho = new Hammer(item);
					var oLeft = 0;
					var cDom = item.firstElementChild;
					var cDomWidth = cDom.offsetWidth;
					var maxRight = item.offsetWidth - cDomWidth;
					maxRight = maxRight >= 0?0:maxRight;
					var maxRightX = 0
					ho.on("panstart", function(e) {
						maxRightX = 0;
						oLeft = cDom.offsetLeft;
					})
					ho.on("panmove", function(e) {
						if(oLeft + e.deltaX > 0){
							cDom.style.left = (oLeft + e.deltaX) / 2 + "px";
							return;
						}
						if(oLeft + e.deltaX < maxRight){
							if(maxRightX == 0){maxRightX = e.deltaX};
							cDom.style.left = maxRight + ((e.deltaX - maxRightX) / 2) + "px";
							return;
						}
						console.log(oLeft + e.deltaX)
						cDom.style.left = oLeft + e.deltaX + "px";
					})
					ho.on("panend", function(e) {
						if(oLeft + e.deltaX > 0){
							cDom.style.left = "0px";
						}
						if(oLeft + e.deltaX < maxRight){
							cDom.style.left = maxRight + "px";
						}
					})
				})
				$("#sliderContainer").on("tap", ".coursesItem", function() {					
					if(!canTap){return}
					openwindow({
						_url: "widget://html/courses/coursesDetail",
						bounces: false,
						slidBackEnabled: true,
						para: {
							courseId: this.getAttribute("data-cid")
						}
					})
				})
				$('#liveContainer').on("tap","li",function(){
				   if(!canTap){return}
					openwindow({
						_url: "widget://online/online",
						bounces: false,
						slidBackEnabled: true
					})
				});
				$("#sliderContainer").on("tap", ".catUl", function() {
					if(!canTap){return}
					var cid = this.getAttribute("data-cid");
					var cname = this.parentNode.firstElementChild.innerText;
					openwindow({
						_url: "widget://html/courses/coursesList",
						bounces: false,
						slidBackEnabled: true,
						para: {
							cid: cid,
							cname: cname
						}
					})
				})
			} else {
				mytoast(re.msg)
			}
		}
	})
}