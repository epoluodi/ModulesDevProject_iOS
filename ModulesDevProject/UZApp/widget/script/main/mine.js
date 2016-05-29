var getCompleted = ""
var getJoined = ""
var getMyCloList = ""
function refresh(){
	getMyCloList();
	getJoined();
	getCompleted()
}
apiready = function(){
	var currentTab = "clo"
	var myCloData = {
		postUrl:myClo,
		tp:"",
		p:1,
		uid:localStorage.getItem("PICA_UID"),
		token:localStorage.getItem("PICA_TOKEN"),
		order:"welcome",
	}
	var joinedData = {
		postUrl:joined,
		tp:"",
		p:1,
		uid:localStorage.getItem("PICA_UID"),
		token:localStorage.getItem("PICA_TOKEN"),
		order:"newest",
	}
	
	var completeddData = {
		postUrl:completed,
		tp:"",
		p:1,
		uid:localStorage.getItem("PICA_UID"),
		token:localStorage.getItem("PICA_TOKEN"),
	}
//	$api.addEvt(document.getElementById("welOrder"), 'click', function(){
//	})
//	$api.addEvt(document.getElementById("newOrder"), 'click', function(){
//	})
	$("#topMenu").on("tap","li",function(e){
		var tapIndex = $(this).index();
		$(this).addClass("menuActive");
		$(this).siblings().removeClass("menuActive");
		$(".cardContent").eq(tapIndex).addClass("cardContentActive");
		$(".cardContent").eq(tapIndex).siblings().removeClass("cardContentActive");
		currentTab = $(this).attr('id');
		getMyCloList();
	})
	
	$("#cloMenu").on("tap","li",function(e){
		var tapIndex = $(this).index();
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		if($(this).attr('id') == "welOrder"){
			myCloData.order = "welcome"
		}else{
			myCloData.order = "newest"
		}
		getMyCloList()
	})
	$("#joiMenu").on("tap","li",function(e){
		var tapIndex = $(this).index();
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		if($(this).attr('id') == "progress"){
			joinedData.order = "progress"
		}else{
			joinedData.order = "newest"
		}
		getMyCloList()
	})
	api.setRefreshHeaderInfo({
		visible: true,
		loadingImg: 'widget://image/loading_more.gif',
		bgColor: '#fff',
		textColor: '#979797',
		textDown: '下拉刷新...',
		textUp: '松开刷新...',
		showTime: true
	}, function(ret, err) {
		if(currentTab == "clo"){
			myCloData.p = 1
		}
		if(currentTab == "joi"){
			joinedData.p = 1
		}
		if(currentTab == "com"){
			completeddData.p = 1
		}
		getMyCloList("down");
	});
	
	api.addEventListener({
		name: 'scrolltobottom',
		extra: {
			threshold: 50 //设置距离底部多少距离时触发，默认值为0，数字类型
		}
	}, function(ret, err) {
		if(currentTab == "clo"){
			dragUpPage(myCloData)
		}
		if(currentTab == "joi"){
			dragUpPage(joinedData)
		}
		if(currentTab == "com"){
			dragUpPage(completeddData)
		}
	});

	function dragUpPage(obj){
		if(obj.p >= obj.tp){
			api.toast({
				msg: '没有更多数据了',
				duration: 2000,
				location: 'bottom'
			});
		}else{
			getMyCloList("up");
		}
	}

	getMyCloList = function(method){
		var postData = {};
		if(currentTab == "clo"){
			postData = myCloData
		}
		if(currentTab == "joi"){
			postData = joinedData
		}
		if(currentTab == "com"){
			postData = completeddData
		}
		postData.uid = localStorage.getItem("PICA_UID"),
		postData.token = localStorage.getItem("PICA_TOKEN"),
		myget({
			_url:postData.postUrl,
			_data:postData,
			suc_fun:function(re){
				re.currentTab = currentTab;
				if(re.status == 1){
					document.getElementById("nodata").style.display = "none"
					if(currentTab == "clo"){
//						document.getElementById("cloNum").innerText = "("+re.data.length+")"
						myCloData.tp = Math.ceil(re.data.pagecount/9);
					}
					if(currentTab == "joi"){
//						document.getElementById("joiNum").innerText = "("+re.data.length+")"
						joinedData.tp = Math.ceil(re.data.pagecount/9);
					}
					if(currentTab == "com"){
//						document.getElementById("comNum").innerText = "("+re.data.length+")"
						completeddData.tp = Math.ceil(re.data.pagecount/9);
					}
					if(method == "up"){
						if(currentTab == "clo"){
							document.getElementById("myCloList").innerHTML += baidu.template("listTemp",re);
							myCloData.p += 1
						}
						if(currentTab == "joi"){
							joinedData.p += 1
							document.getElementById("joinedList").innerHTML += baidu.template("listTemp",re);
						}
						if(currentTab == "com"){
							completeddData.p += 1
							document.getElementById("completedList").innerHTML += baidu.template("listTemp",re);
						}
						mytoast("成功加载数据")
					}else{
						if(currentTab == "clo"){
							document.getElementById("myCloList").innerHTML = baidu.template("listTemp",re);
						}
						if(currentTab == "joi"){
							document.getElementById("joinedList").innerHTML = baidu.template("listTemp",re);
						}
						if(currentTab == "com"){
							document.getElementById("completedList").innerHTML = baidu.template("listTemp",re);
						}
						api.refreshHeaderLoadDone();
					}
				}else{
					if(currentTab == "clo"){
						document.getElementById("myCloList").innerHTML = "";
					}
					if(currentTab == "joi"){
						document.getElementById("joinedList").innerHTML = "";
					}
					if(currentTab == "com"){
						document.getElementById("completedList").innerHTML = "";
					}
					document.getElementById("nodata").style.display = "block"
//					mytoast(re.msg)
				}
				if(method != 'up'){api.refreshHeaderLoadDone();}
			}
		})
	}
	
	getJoined = function(){
		joinedData.uid = localStorage.getItem("PICA_UID"),
		joinedData.token = localStorage.getItem("PICA_TOKEN"),
		myget({
			_url:joined,
			_data:joinedData,
			suc_fun:function(re){
				if(re.status == 1){
					document.getElementById("joinedList").innerHTML = baidu.template("listTemp",re)
				}else{
					document.getElementById("completedList").innerHTML = ""
					document.getElementById("nodata").style.display = "block"
//					mytoast(re.msg)
				}
			}
		})
	}
	
	getCompleted = function(){
		completeddData.uid = localStorage.getItem("PICA_UID"),
		completeddData.token = localStorage.getItem("PICA_TOKEN"),
		myget({
			_url:completed,
			_data:completeddData,
			suc_fun:function(re){
				if(re.status == 1){
					re.currentTab = currentTab;
					document.getElementById("completedList").innerHTML = baidu.template("listTemp",re)
					console.log(JSON.stringify(re))
				}else{
					document.getElementById("completedList").innerHTML = ""
					document.getElementById("nodata").style.display = "block"
//					mytoast(re.msg)
				}
			}
		})
	}
	getMyCloList();
	getJoined();
	getCompleted()
	$(".cardContent").on("tap",".courseListItem",function(e){
		if(e.target.className.indexOf("icon") >= 0){
			return;
		}
		openwindow({
			_url:"widget://html/courses/coursesDetail",
			bounces:false,
			slidBackEnabled:true,
			para:{courseId:this.getAttribute("data-cid")}
		})
	})
	$(".cardContent").on("tap",".cer",function(e){
		e.stopPropagation()
		openwindow({
			_url:"widget://html/courses/certificate",
			bounces:false,
			slidBackEnabled:true,
			para:{courseId:this.getAttribute("data-cid")}
		})
	})
}
