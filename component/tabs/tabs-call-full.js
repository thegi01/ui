"use strict";

/*_____ UI Script _____*/

/* ieIE */
var isIE,
	isIE8 = false;
isIE = function(){
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};
if ( isIE() == 8 ) { isIE8 = true; }

/* Dataset */
var dataAttr, hasDataAttr, getDataAttr, setDataAttr;
dataAttr = {
	'true' : {
		get : function(attr){
			return this.dataset[attr];
		},
		set : function(attr, val){
			this.dataset[attr] = val;
		}
	},
	'false' : {
		get : function(attr){
			return this.getAttribute('data-'+ attr);
		},
		set : function(attr, val){
			this.setAttribute('data-' + attr, val);			
		}
	}
};
hasDataAttr = 'dataset' in document.body;
getDataAttr = dataAttr[hasDataAttr].get;
setDataAttr = dataAttr[hasDataAttr].set;

/* Tabs Control */
var tabsCtrl = {
	init : function(items, direction, autoPlay){
		this.items = items;
		this.itemsLen = this.items.length;
		if(direction) {
			this.idx = getDataAttr.call(this, 'current');
			this.direction = 'next';
		};
		if(autoPlay) {
			this.auto = 'false';
			this.timer = 3000;
		};
	},
	tabs : function(evtType, target){
		// var self = this;
		isLower.addEvent(this, evtType, function(e){
			var t = isLower.getTarget(e);
			if(t.tagName == 'A') 						// e.preventDefault();
				isLower.prevent(); 
			if( target ) 								// get idx target 설정
				t = t[target]; 
			if(getDataAttr.call(t, 'role') != 'tabsItem')  	// 이벤트 타겟 검증
				return;
			if( this.auto ) {  							// auto play
				clearInterval(this.interval);
				tabsCtrl.play.call(this);
			};
			this.idx = Number( getDataAttr.call(t, 'idx') );
			tabsCtrl.setCurrent.call(this, this.idx);
		});
	},
	setCurrent : function(idx){
		setDataAttr.call(this, 'current', idx);
		if(isIE8)	// In IE8, css doesn't apply 
			this.className = this.className;
	},


	prevNext : function(d, n){
		this.direction = d;
		if( this.auto ) {
			clearInterval(this.interval);
			tabsCtrl.play.call(this);
		};
		tabsCtrl.getIdxByDirection.call(this, n);
		tabsCtrl.setCurrent.call(this, this.idx);
	},
	getIdxByDirection : function(n){
		var d = this.direction,
			idx = Number(this.idx),
			val = this.itemsLen-1;
		if( d == "prev" ){
			if(n) 
				idx = idx - n; 
			else
				idx--;
			if( idx < 0 ) {
				if(n) 
					idx = Math.floor(val/n)*n;
				else
					idx = val;
			};
		} else {
			if(n)
				idx = idx + n;
			else 
				idx++;
			if( idx > val ) 
				idx = 0;
		};
		this.idx = idx;
	},
	autoPlay : function(timer){
		if(timer) 
			this.timer = timer;
		this.auto = true;		
		setDataAttr.call(this, 'auto', true);
		tabsCtrl.play.call(this);
	},
	play : function(){
		var el = this;
		el.interval = setInterval(function(){
			tabsCtrl.getIdxByDirection.call(el);
			tabsCtrl.setCurrent.call(el, el.idx);
		}, el.timer);
	},
	pause : function(){
		clearInterval(this.interval);
		this.auto = false;
		setDataAttr.call(this, 'auto', false);
	}
};

/* Lower Brower Supply */
var isLower = {
	getTarget : function(e){
		return e.target || e.srcElement;
	},
	addEvent : function(e, type, handler){
		if(isIE8 && type == 'change')
			type = 'click';
		if(e.attachEvent)
			e.attachEvent("on" + type, handler);
		else /*if(e.addEventListener)*/
			e.addEventListener(type, handler);
	},
	prevent : function(){
		if(event.preventDefault)
			event.preventDefault();
		else
			event.returnValue = false;
	}
};


/*_____ Tabs.html _____*/

var doc = document,
	$news,
	$srchId,
	$season, 
	$menu;

/* news */
$news = doc.getElementById('news');
tabsCtrl.init.call($news, $news.getElementsByTagName('h4'));
tabsCtrl.tabs.call($news , 'click', 'parentElement');

/* srchId */
$srchId = doc.getElementById('srchId');
tabsCtrl.init.call($srchId, $srchId.getElementsByTagName('input'));
tabsCtrl.tabs.call($srchId , 'change');  

/* season */
$season = doc.getElementById('season');
tabsCtrl.init.call($season, $season.getElementsByTagName('h4'), true, true);
tabsCtrl.tabs.call($season , 'click', 'parentElement');
doc.getElementById('seasonBtnPrev').onclick = function(){
	tabsCtrl.prevNext.call($season, getDataAttr.call(this, 'direction'));
};
doc.getElementById('seasonBtnNext').onclick = function(){
	tabsCtrl.prevNext.call($season, getDataAttr.call(this, 'direction'));
};
doc.getElementById('seasonBtnPause').onclick = function(){
	tabsCtrl.pause.call($season);
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	tabsCtrl.autoPlay.call($season, 3000);
};
tabsCtrl.autoPlay.call($season, 3000);

/* menu */
$menu = doc.getElementById('menu');
tabsCtrl.init.call(
	$menu, 
	$menu.getElementsByTagName('li'),
	true
);
doc.getElementById('menuBtnPrev').onclick = function(){
	tabsCtrl.prevNext.call($menu, 'prev', 3);
};
doc.getElementById('menuBtnNext').onclick = function(){
	tabsCtrl.prevNext.call($menu, 'next', 3);
};

