var imgPath = "http://pica.un-bug.com/pica/"
var imgPath1 = "http://pica.un-bug.com"
var server = "http://pica.un-bug.com/pica/index.php/home"
var modelIndex = "/index/"
var modelUser = "/user/"
var modelPub = "/public/"
var modelCourse = "/course/"
//注册
var reg = server + modelUser + "register"
//登录
var login = server + modelUser + "login"
//获取是否完全注册
var isFullReg = server + modelPub + "inspection"
//获取省
var getProvince = server + modelIndex + "province"
//获取医院
var getHospital = server + modelIndex + "hospital/province/"
//获取科室
var getDepartment = server + modelIndex + "department/hospital/"
//获取科室2
var getDepartment2 = server + modelIndex + "son_department/id/"
//完善信息
var updateUInfo = server + modelPub + "complete/"
//获取职位
var getPosition = server + modelIndex + "level/"
//首页banner
var banner = server + modelIndex + "shuffling"
//获取首页课程列表
var homeList = server + modelIndex + "course";
//获取课程详情
var getCourseDetail = server + modelCourse + "detail"
//收藏课程
var cloCourse = server + modelPub + "add_collection"
//取消收藏吧
var del_clo = server + modelPub + "del_collection"
//我的收藏
var myClo = server + modelPub + "my_collection";
//获取用户信息
var getUInfo = server + modelPub + "user_info"
//参加课程
var joinCourse = server + modelPub + "my_join"
//获取我参加的课程
var joined = server + modelPub + "my_joins"
//点赞
var zan = server + modelPub + "approve"
//上传头像
var uploadIcon = server + "/upload/upload_user_avatar"
//获取已完成
var completed = server + modelPub + "my_complete"
//意见反馈
var fadeback = server + "/feedback/index"
//修改个人信息
var editUInfo = server + modelPub + "user_edit";
//发送验证码
var sendCode = server + modelIndex + "send_code";
//验证验证码
var checkVCode = server + modelIndex + "validation_code";
//修改密码忘记密码
var repwd = server + modelUser + "repwd";
//章节列表
var getCapList = server + modelCourse + "chapter_list";
//搜索结果
var search = server + modelCourse + "course_list";
//获取章节课程
var getCapCourses = server + modelPub + "access_course";
//请求课程进度
var getCourseProssess = server + modelPub + 'chapter_prog';
var thirdLogin = server + "/ThirdLogin/third_login";
var bindaccount = server + "/ThirdLogin/login_band";
var bindnewaccount = server + "/thirdLogin/reg_login"
//热门搜索
var horSearch = server + modelIndex + 'search_key';


/*分享商品地址*/
var shareCourseUrl = server + modelIndex + "coursesDetailSub/id/"
var checkPhone = server + modelUser + "check_phone"
/*检查更新*/
var checkUpdate = server + modelIndex + "showUpdate"

//添加工作经历
var addExpUrl = server + modelPub + "add_experience";
//查询工作经历
var getExp = server + modelPub + "work_experience"
//删除经历
var delExp = server + modelPub + "del_experience"
//*编辑从业经历
var editExp = server + modelPub + "edit_experience"
//检查版本
var checkUd = server + modelIndex + "version"
