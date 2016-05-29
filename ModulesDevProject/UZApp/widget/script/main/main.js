apiready = function() {
	if(api.systemType == "ios"){
		$api.fixStatusBar($api.dom('header'));
	}
	
	$('#searchInput').on('click',function(){
	   $('#searchInput').addClass('input-selected');
	   $('#searchBtn').addClass('query-selected');
	});
	
	funIniGroup();
	exitApp()
}
$("#modufyPwd").tap(function() {
	openwindow({
		_url : "../login/modifyPwd",
		bounces : false
	})
})
function funIniGroup() {
	var framesNames = ["courses","mine","settings"]
	var eHeaderLis = $api.domAll('header li'),
		frames = [];
	var bgc = "";
	for (var i = 0, len = eHeaderLis.length; i < len; i++) {
		bouncesType = true;
		if(i == 2||i == 0){
			bouncesType = false;
		}
		frames.push({
			name: framesNames[i],
			url: framesNames[i] + '.html',
			bgColor: 'rgba(255,255,255,1)',
			bounces: bouncesType
		})
	}
	api.openFrameGroup({
		name: 'group',
		scrollEnabled: false,
		rect: {
			x: 0,
			y: $api.dom('header').offsetHeight + statusBarHeight(),
			w: api.winWidth,
			h: $api.dom('#main').offsetHeight - statusBarHeight()
		},
		index: 0,
		frames: frames
	}, function(ret, err) {

	});
//api.openFrame({
//          name: 'courses',
//          url: 'courses.html',
//          bounces: true,
//          rect: {
//              x: 0,
//              y: $api.dom('header').offsetHeight,
//              w: api.winWidth,
//              h: $api.dom('#main').offsetHeight
//          }
//      });
}

// 随意切换按钮
function randomSwitchBtn(tag) {
	if (tag == $api.dom('#footer li.active')) return;
	var eHeaderLis = $('header li'),
	index = $(tag).index();
	$(tag).addClass("active");
	$(tag).siblings().removeClass("active");
	eHeaderLis.eq(index).addClass("active")
	eHeaderLis.eq(index).siblings().removeClass("active")
	api.setFrameGroupIndex({
		name: 'group',
		index: index
	});
}
//$(".headerUl").on("tap",".searchBtn",function(){
//	openwindow({
//		_url:"search",
//		bounces:false,
//	})
//})
$("#searchBtn").tap(function(){
	if(!document.getElementById("searchInput").value){mytoast("请输入搜索内容");return}
	openwindow({
		_url : "searchResult",
		bounces:false,
		para:{txt:document.getElementById("searchInput").value}
	})
})
document.getElementById("searchInput").onkeyup = function(e){
	if(!document.getElementById("searchInput").value){mytoast("请输入搜索内容");return}
	if(e.keyCode == 13){
	    var inputTxt = document.getElementById("searchInput").value;
	    document.getElementById("searchInput").value ='';
		openwindow({
			_url : "searchResult",
			bounces:false,
			para:{txt:inputTxt}
		})
	}
}

//document.getElementById("searchInput").onclick = function(e){
////	if(!document.getElementById("searchInput").value){mytoast("请输入搜索内容");return}
////	if(e.keyCode == 13){
////		
////	}
//openwindow({
//			_url : "searchResult",
//			bounces:false,
//			para:{txt:document.getElementById("searchInput").value}
//		})
//}


