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
var setItems,
	tabs,
	setCurrent,
	prevNext,
	autoPlay,
	play,
	pause,
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
	addEvent(this, evtType, function(e){
		var t = getTarget(e).parentElement;
		if(getDataAttr.call(t, 'role') != 'tabs-item')  	// 이벤트 타겟 검증
			return;
		if(t.tagName == 'A') 								// e.preventDefault();
			prevent(); 
		if( this.auto ) {  									// auto play
			clearInterval(this.interval);
			play.call(this);
		};
		this.idx = Number( getDataAttr.call(t, 'idx') );
		setCurrent.call(this, this.idx);
	});
};
setCurrent = function(idx){
	setDataAttr.call(this, 'current', idx);
	if(isIE8)	// In IE8, css doesn't apply 
		this.className = this.className;
};
prevNext = function(d, n){
	var idx = Number(this.idx),
		val = this.itemsLen-1;
	this.direction = d;
	if( this.auto ) {
		clearInterval(this.interval);
		play.call(this);
	};
	idx = getIdx[this.direction](idx, val, n);
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
getIdx = {
	prev : function(idx, val, n){
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
		return idx;
	},
	next : function(idx, val, n){
		if(n)
			idx = idx + n;
		else 
			idx++;
		if( idx > val ) 
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

