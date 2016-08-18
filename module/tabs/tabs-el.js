"use strict";

/*_____ UI Script _____*/

/* ieIE */
var isIE,
	isOldIE = false;
isIE = function(){
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};
if ( isIE() == 7 || isIE() == 8 ) { isOldIE = true; }

/* Lower Brower Supply */
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

var _eTarget, eTarget,
	_addEvent, addEvent,
	_prevent, prevent,
	_eventLisener, eventLisener,
	_eventType, eventType;
_eTarget = {
	false : function(e){
		return e.target;
	},
	true : function(e){				// OldIE
		return e.srcElement;
	}
};
_prevent = {
	false : function(e){
		e.preventDefault();
	},
	true : function(e){				// OldIE
		e.returnValue = false;
	}
};
_eventLisener = {
	false : 'addEventListener',
	true : 'attachEvent' 			// OldIE
};
_eventType = {
	false : {
		'click' : 'click',
		'change' : 'change'
	},
	true : {						// OldIE
		'click' : 'onclick',
		'change' : 'onclick'
	}
};
eTarget = _eTarget[isOldIE];
prevent = _prevent[isOldIE];
eventLisener = _eventLisener[isOldIE];
eventType = _eventType[isOldIE];


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
	el[ eventLisener ]( eventType[evtType], function(e){
		var t = eTarget(e);
		if( t.tagName == 'A' ) 							// e.preventDefault();
			prevent(e);
		t = t.parentElement;
		if(getDataAttr(t, 'role') != 'tabs-item')  		// 이벤트 타겟 검증
			return;
		autoPlayCheck(el);								// auto play check
		el.idx = Number( getDataAttr(t, 'idx') );
		setCurrent(el, el.idx);
	});
};
setCurrent = function(el, idx){
	setDataAttr(el, 'current', idx);
	if(isOldIE)	// In IE8, css doesn't apply 
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
