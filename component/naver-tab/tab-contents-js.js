"use strict";
var UI = {
	load : function(){
		this.jsOn();
		this.tabCtrl();
	}	
	, jsOn : function(){
		var html = document.querySelectorAll('html')[0];
		UTIL.removeClass(html, 'no-js');
		UTIL.addClass(html, 'js');
	}
	, tabCtrl : function(){
		//선택자 선언
		var doc = document,
			tabCnts = doc.querySelectorAll('.tab-container')[0],
			tabNavs = doc.querySelectorAll('.tab-nav-a');
		
		// 클래스명 
		var cnActive = 'active',
			cnShow = 'show';
		
		// 변수 선언
		var focusedItem = 'music'; //초기 카테고리

		// 함수
		var init = function(){
			if(focusedItem) {
				focusedItem = doc.querySelectorAll('.tab-nav-' + focusedItem)[0];
				drawItem(focusedItem);
				tabActive(focusedItem);
			}
		}
		var drawItem = function(obj){
			var dummy = [];
			var dataCategory;
			var _tplLi, _tplPlay, _tplBadge;
			var templet = '{tplLi}<a href="{url}" class="item-a"><span class="area-thumb"><img src="{imgUrl}" class="img-thumb"><span class="mask-thumb"></span>{tplBadge}</span>{tplPlay}<p class="title-lst">{title}</p></a><p class="stxt-lst">{text}</p></li>';
			dummy.push('<ul class="lst-thumb">');

			//선택한 탭에 따라 category 분류하여 DATA 받아옴
			if(UTIL.hasClass(obj, 'tab-nav-music')) {
				dataCategory = DATA_TABCONTENTS.MUSIC;
			} else if(UTIL.hasClass(obj, 'tab-nav-tv')){
				dataCategory = DATA_TABCONTENTS.TV;
			}

			for(var i=0; i<dataCategory.length ; i++){
				var data = dataCategory[i];
				var tpl = templet;
				_tplLi = i==0 ? '<li class="item item-promotion">' : '<li class="item">';
				_tplPlay = data.play ? '<p class="icon-play">영상 <span class="blind">컨텐츠</span></p>' : '';
				_tplBadge = data.badge ? '<span class="badge-thumb"><em class="badge-text">'+ data.badge + '</em><span class="badge-bg"></span></span>' : '';
				tpl = tpl.replace('{tplLi}', _tplLi)
							.replace("{url}", data.url)
							.replace("{imgUrl}", data.imgUrl)
							.replace("{tplPlay}", _tplPlay)
							.replace("{tplBadge}", _tplBadge)
							.replace("{title}", data.title)
							.replace("{text}", data.text);
				dummy.push(tpl);					
			}

			dummy.push('</ul>');
			UTIL.getNextSibling(obj).innerHTML = dummy.join('');
		}
		var tabActive = function(e){
			UTIL.addClass(e, cnActive);
			UTIL.addClass(UTIL.getNextSibling(e), cnShow);
		}
		var tabUnActive = function(e){
			UTIL.removeClass(e, cnActive);
			UTIL.removeClass(UTIL.getNextSibling(e), cnShow);
		}
		
		// 이벤트	
		for(var i=0; i<tabNavs.length; i++) {
			tabNavs[i].onclick = function(){

				if(!UTIL.hasClass(this, 'tab-nav-a')) return;

				if(focusedItem) tabUnActive(focusedItem);
				tabActive(this.parentNode);
				focusedItem = this.parentNode;
				
				//클릭한 탭메뉴의 컨텐츠가 없으면 불러온다.
				if(!UTIL.getNextSibling(focusedItem).querySelectorAll('.lst-thumb').length) { 
					drawItem(focusedItem);
				}
			}
		}
		/*tabCnts.onclick = function(e){
			var target = e.srcElement || e.target;
			if(!UTIL.hasClass(target, 'tab-nav-a')) return;
			if(focusedItem) tabUnActive(focusedItem);
			tabActive(target.parentNode);
			focusedItem = target.parentNode;

			//클릭한 탭메뉴의 컨텐츠가 없으면 컨텐츠를 불러온다.
			if(!UTIL.getNextSibling(focusedItem).querySelectorAll('.lst-thumb').length) {
				drawItem(focusedItem);
			}
		}*/
		
		init();
	
	}
}

var UTIL = {
	addClass : function(e, clsName){
		var cn = e.className;
		if(cn.indexOf(clsName) != -1) return;
		if(cn != '') clsName = ' ' + clsName;
		e.className  = cn + clsName;
	}
	, removeClass : function(e, clsName){
		var cn = e.className;
	    var rxp = new RegExp( "\\s?\\b"+clsName+"\\b", "g" );
	    cn = cn.replace( rxp, '' );
	    e.className = cn;
	}
	, hasClass : function(target, clsName) {
	    return new RegExp('(\\s|^)' + clsName + '(\\s|$)').test(target.className);
	}
	, getNextSibling : function(e)  {
		var x = e.nextSibling;
		while(x.nodeType != 1) {
			x = x.nextSibling;
		}
		return x;
	}
}

UI.load();
