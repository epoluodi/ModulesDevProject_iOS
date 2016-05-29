/*
 * Javascript Document
 * Creat by Nelson 2016/02/18
 * 
 * Website:http://www.nelson_obj.com
 * 
 * QQ:616859570
 * Email:lirongkun@mytopbrand.com,616859570@qq.com
 * */
var nelson = {
	each:function(dom,fun){
		for(var i in dom){
			if((typeof dom[i]).toLowerCase() != "object"){
				break;
			}
			fun(i,dom[i]);
		}
	}
}
/*Find child by classname or id*/
HTMLElement.prototype.findChild = function(str){
	var flag = str.substring(0,1);
	var real_str = str.substring(1,str.length);
	this.dom = this;
	this.childArr = [];
	this.cd = this.children;
	this.child = "";
	switch(flag){
		case "#":
			for(var i in this.cd){
				if(this.cd[i].id = real_str){
					this.child = this.cd[i];
					break;
				}
			}
		break;
		case ".":
			for(var i in this.cd){
				if(this.cd[i].classList){
					if(this.cd[i].classList.contains(real_str)){
						this.childArr.push(this.cd[i])
					}
				}
			}
		break;
			
	}
	if(this.child){
		return this.child;
	}
	if(this.childArr){
		return this.childArr;
	}
	return null;
}
/*Check string is null*/
String.prototype.isNull = function(){
	if(this.length <= 0||this == ""||this == null||this == "undefined"||this == "null"){
		return true;
	};
	return false;
}
/*Check string is a phoneNum*/
String.prototype.isPhoneNum = function(){
	var pattern = /^1[34578]\d{9}$/;
	if(pattern.test(this)){
		return true;
	};
	return false;
}
/*Check string is a emaiil*/
String.prototype.isEmail = function(){
	var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(pattern.test(this)){
		return true;
	};
	return false;
}
/*Check number is null*/
Number.prototype.isNull = function(){
	if(this == ""||this == null||this == "undefined"||this == "null"){
		return true;
	};
	return false;
}
/*Append some elements to a other elements*/
HTMLElement.prototype.appendHTML = function(html) {
    var divTemp = document.createElement("div"), nodes = null, fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i=0, length=nodes.length; i<length; i+=1) {
       fragment.appendChild(nodes[i].cloneNode(true));
    }
    this.appendChild(fragment);
    nodes = null;
    fragment = null;
};
/*Check password*/
String.prototype.checkPassword = function(){
	var pattern = /^[a-zA-Z0-9]{6,16}$/;
	if(pattern.test(this)){
		return true;
	}
	return false
}
/*imageError*/
function imgErrorFun(imgDom){
	imgDom.src = "../../img/index/hs.jpg";
}
