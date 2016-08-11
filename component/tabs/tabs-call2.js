"use strict";

/*_____ UI Script _____*/

/* Lower Brower Supply */

/* ieIE */
var isIE,
	isOldIE = false;
isIE = function(){
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};
if ( isIE() == 7 || isIE() == 8 ) { isOldIE = true; }

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

var _eTarget, eTarget,
	_addEvent, addEvent,
	_prevent, prevent,
	_eventLisener, eventLisener,
	_eventType, eventType;
_eTarget = {
	false : function(){
		return this.target;
	},
	true : function(){				// OldIE
		return this.srcElement;
	}
};
_prevent = {
	false : function(){
		this.preventDefault();
	},
	true : function(){				// OldIE
		this.returnValue = false;
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
setItems = function(items, direction, autoPlay){
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
};
tabs = function(evtType){
	this[ eventLisener ]( eventType[evtType], function(e){
		var t = eTarget.call(e);
		if( t.tagName == 'A' ) 							// e.preventDefault();
			prevent.call(e);
		t = t.parentElement;
		if(getDataAttr.call(t, 'role') != 'tabs-item')  		// 이벤트 타겟 검증
			return;
		autoPlayCheck.call(this);								// auto play check
		this.idx = Number( getDataAttr.call(t, 'idx') );
		setCurrent.call(this, this.idx);
	});
};
setCurrent = function(idx){
	setDataAttr.call(this, 'current', idx);
	if(isOldIE)	// In IE8, css doesn't apply 
		this.className = this.className;
};
prevNext = function(d, n){
	var idx = Number(this.idx)
	this.direction = d;
	autoPlayCheck.call(this);
	idx = getIdx[this.direction](idx, this.itemsLen-1, n);
	this.idx = idx;
	setCurrent.call(this, this.idx);
};
play = function(){
	var el = this;
	el.interval = setInterval(function(){
		prevNext.call(el, el.direction);
	}, el.timer);
};
pause = function(){
	clearInterval(this.interval);
	this.auto = false;
	setDataAttr.call(this, 'auto', false);
};
autoPlay = function(timer){
	if(timer) 
		this.timer = timer;
	this.auto = true;		
	setDataAttr.call(this, 'auto', true);
	play.call(this);
};
autoPlayCheck = function(){
	if( this.auto ) {
		clearInterval(this.interval);
		play.call(this);
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
setItems.call($news, $news.getElementsByTagName('h4'));
tabs.call($news, 'click');

/* srchId */
$srchId = doc.getElementById('srchId');
setItems.call($srchId, $srchId.getElementsByTagName('h4'));
tabs.call($srchId, 'change');  

/* season */
$season = doc.getElementById('season');
setItems.call($season, $season.getElementsByTagName('h4'), true, true);
tabs.call($season , 'click');
doc.getElementById('seasonBtnPrev').onclick = function(){
	prevNext.call($season, 'prev');
};
doc.getElementById('seasonBtnNext').onclick = function(){
	prevNext.call($season, 'next');
};
doc.getElementById('seasonBtnPause').onclick = function(){
	pause.call($season);
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	autoPlay.call($season, 2000);
};
autoPlay.call($season, 2000);

/* menu */
$menu = doc.getElementById('menu');
setItems.call(
	$menu, 
	$menu.getElementsByTagName('li'),
	true
);
doc.getElementById('menuBtnPrev').onclick = function(){
	prevNext.call($menu, 'prev', 3);
};
doc.getElementById('menuBtnNext').onclick = function(){
	prevNext.call($menu, 'next', 3);
};

