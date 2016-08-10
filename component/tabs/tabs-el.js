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
		get : function(el, attr){
			return el.dataset[attr];
		},
		set : function(el, attr, val){
			el.dataset[attr] = val;
		}
	},
	'false' : {
		get : function(el, attr){
			return el.getAttribute('data-'+ attr);
		},
		set : function(el, attr, val){
			el.setAttribute('data-' + attr, val);			
		}
	}
};
hasDataAttr = 'dataset' in document.body;
getDataAttr = dataAttr[hasDataAttr].get;
setDataAttr = dataAttr[hasDataAttr].set;

/* Tabs Control */
var setItems,
	tabs,
	setCurrent,
	prevNext,
	autoPlay,
	play,
	pause,
	autoPlayCheck,
	getIdx;
setItems = function(el, items, direction, autoPlay){
	el.items = items;
	el.itemsLen = el.items.length;
	if(direction) {
		el.idx = getDataAttr(el, 'current');
		el.direction = 'next';
	};
	if(autoPlay) {
		el.auto = 'false';
		el.timer = 3000;
	};
};
tabs = function(el, evtType){
	addEvent(el, evtType, function(e){
		var t = getTarget(e).parentElement;
		if(getDataAttr(t, 'role') != 'tabs-item')  	// 이벤트 타겟 검증
			return;
		if(t.tagName == 'A') 								// e.preventDefault();
			prevent(); 
		autoPlayCheck(el);							// auto play check
		el.idx = Number( getDataAttr(t, 'idx') );
		setCurrent(el, el.idx);
	});
};
setCurrent = function(el, idx){
	setDataAttr(el, 'current', idx);
	if(isIE8)	// In IE8, css doesn't apply 
		el.className = el.className;
};
prevNext = function(el, d, n){
	var idx = Number(el.idx)
	el.direction = d;
	autoPlayCheck(el);
	idx = getIdx[el.direction](idx, el.itemsLen-1, n);
	el.idx = idx;
	setCurrent(el, el.idx);
};
play = function(el){
	el.interval = setInterval(function(){
		prevNext(el, el.direction);
	}, el.timer);
};
pause = function(el){
	clearInterval(el.interval);
	el.auto = false;
	setDataAttr(el, 'auto', false);
};
autoPlay = function(el, timer){
	if(timer) 
		el.timer = timer;
	el.auto = true;		
	setDataAttr(el, 'auto', true);
	play(el);
};
autoPlayCheck = function(el){
	if( el.auto ) {
		clearInterval(el.interval);
		play(el);
	};
};
getIdx = {
	prev : function(idx, len, n){
		if(n) 
			idx = idx - n; 
		else
			idx--;
		if( idx < 0 ) {
			if(n) 
				idx = Math.floor(len/n)*n;
			else
				idx = len;
		};
		return idx;
	},
	next : function(idx, len, n){
		if(n)
			idx = idx + n;
		else 
			idx++;
		if( idx > len ) 
			idx = 0;
		return idx;
	}
};

/* Lower Brower Supply */
var getTarget,
	addEvent,
	prevent;
getTarget = function(e){
	return e.target || e.srcElement;
};
addEvent = function(e, type, handler){
	if(isIE8 && type == 'change')
		type = 'click';
	if(e.attachEvent)
		e.attachEvent("on" + type, handler);
	else /*if(e.addEventListener)*/
		e.addEventListener(type, handler);
};
prevent = function(){
	if(event.preventDefault)
		event.preventDefault();
	else
		event.returnValue = false;
};


/*_____ Tabs.html _____*/
var doc = document,
	$news,
	$srchId,
	$season, 
	$menu;

/* news */
$news = doc.getElementById('news');
setItems($news, $news.getElementsByTagName('h4'));
tabs($news, 'click');

/* srchId */
$srchId = doc.getElementById('srchId');
setItems($srchId, $srchId.getElementsByTagName('h4'));
tabs($srchId, 'change');  

/* season */
$season = doc.getElementById('season');
setItems($season, $season.getElementsByTagName('h4'), true, true);
tabs($season , 'click');
doc.getElementById('seasonBtnPrev').onclick = function(){
	prevNext($season, 'prev');
};
doc.getElementById('seasonBtnNext').onclick = function(){
	prevNext($season, 'next');
};
doc.getElementById('seasonBtnPause').onclick = function(){
	pause($season);
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	autoPlay($season, 2000);
};
autoPlay($season, 2000);

/* menu */
$menu = doc.getElementById('menu');
setItems(
	$menu, 
	$menu.getElementsByTagName('li'),
	true
);
doc.getElementById('menuBtnPrev').onclick = function(){
	prevNext($menu, 'prev', 3);
};
doc.getElementById('menuBtnNext').onclick = function(){
	prevNext($menu, 'next', 3);
};

