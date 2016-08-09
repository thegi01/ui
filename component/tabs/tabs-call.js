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
	getIdxByDirection,
	autoPlay,
	play,
	pause;
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
tabs = function(evtType, target){
	addEvent(this, evtType, function(e){
		var t = getTarget(e);
		if(t.tagName == 'A') 						// e.preventDefault();
			prevent(); 
		if( target ) 								// get idx target 설정
			t = t[target]; 
		if(getDataAttr.call(t, 'role') != 'tabsItem')  	// 이벤트 타겟 검증
			return;
		if( this.auto ) {  							// auto play
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
	this.direction = d;
	if( this.auto ) {
		clearInterval(this.interval);
		play.call(this);
	};
	getIdxByDirection.call(this, n);
	setCurrent.call(this, this.idx);
};
getIdxByDirection = function(n){
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
};
autoPlay = function(timer){
	if(timer) 
		this.timer = timer;
	this.auto = true;		
	setDataAttr.call(this, 'auto', true);
	play.call(this);
};
play = function(){
	var el = this;
	el.interval = setInterval(function(){
		getIdxByDirection.call(el);
		setCurrent.call(el, el.idx);
	}, el.timer);
};
pause = function(){
	clearInterval(this.interval);
	this.auto = false;
	setDataAttr.call(this, 'auto', false);
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
tabs.call($news , 'click', 'parentElement');

/* srchId */
$srchId = doc.getElementById('srchId');
setItems.call($srchId, $srchId.getElementsByTagName('input'));
tabs.call($srchId , 'change');  

/* season */
$season = doc.getElementById('season');
setItems.call($season, $season.getElementsByTagName('h4'), true, true);
tabs.call($season , 'click', 'parentElement');
doc.getElementById('seasonBtnPrev').onclick = function(){
	prevNext.call($season, getDataAttr.call(this, 'direction'));
};
doc.getElementById('seasonBtnNext').onclick = function(){
	prevNext.call($season, getDataAttr.call(this, 'direction'));
};
doc.getElementById('seasonBtnPause').onclick = function(){
	pause.call($season);
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	autoPlay.call($season, 3000);
};
autoPlay.call($season, 3000);

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

