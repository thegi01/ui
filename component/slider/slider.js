"use strict";

/*_____ UI Script _____*/

/* Lower Brower Supply */

/* Dataset */
var dataSet, hasDataSet, getData, setData;
dataSet = {
	'true' : {
		get : function(name){
			return this.dataset[name];
		},
		set : function(name, val){
			this.dataset[name] = val;
		}
	},
	'false' : {
		get : function(name){
			return this.getAttribute('data-'+ name);
		},
		set : function(name, val){
			this.setAttribute('data-' + name, val);			
		}
	}
};
hasDataSet = 'dataset' in document.body;
getData = dataSet[hasDataSet].get;
setData = dataSet[hasDataSet].set;

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
var setItems, setItemsSlider,
	sliderPager,
	tabs,
	setCurrent,
	setCurrentSlier,
	prevNext,
	prevNextSlider,
	autoPlay,
	play,
	pause,
	autoPlayCheck,
	getIdx;
setItems = function(items, direction, autoPlay){
	this.items = items;
	this.itemsLen = this.items.length;
	if(direction) {
		this.idx = getData.call(this, 'current');
		this.direction = 'next';
	};
	if(autoPlay) {
		this.auto = 'false';
		this.timer = 3000;
	};
};
setItemsSlider = function(vr, items, direction, autoPlay){
	setItems.call(this, items, direction, autoPlay);
	this.vr = vr;
};
tabs = function(evtType){
	this[ eventLisener ]( eventType[evtType], function(e){
		var t = eTarget.call(e);
		if( t.tagName == 'A' ) 									// e.preventDefault();
			prevent.call(e);
		t = t.parentElement;
		if(getData.call(t, 'role') != 'tabs-item')  			// 이벤트 타겟 검증
			return;
		autoPlayCheck.call(this);								// auto play check
		this.idx = Number( getData.call(t, 'idx') );
		setCurrent.call(this, this.idx);
	});
};
sliderPager = function(el, evtType){
	// this : slidrPager
	el.itemWidth = el.vr.offsetWidth/el.itemsLen;
	this[ eventLisener ]( eventType[evtType], function(e){
		var t = eTarget.call(e);
		if( t.tagName == 'A' )
			prevent.call(e);						// e.preventDefault();
		t = t.parentElement;
		el.idx = Number( getData.call(t, 'idx') );
		setCurrent.call(el, el.idx);
		setCurrentSlier.call(el);
	});
};
setCurrent = function(idx){
	setData.call(this, 'current', idx);
	if(isOldIE)	// In IE8, css doesn't apply 
		this.className = this.className;
};
setCurrentSlier = function(){
	var xVal = this.idx * this.itemWidth;
	this.vr.style.webkitTransform = 'translate3d(' + (-xVal) +'px, 0px, 0px)';
};
prevNext = function(d, n){
	var idx = Number(this.idx);
	this.direction = d;
	autoPlayCheck.call(this);
	idx = getIdx[this.direction](idx, this.itemsLen-1, n);
	this.idx = idx;
	setCurrent.call(this, this.idx);
};
prevNextSlider = function(d, n){
	prevNext.call(this, d, n);
	setCurrentSlier.call(this);
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
	setData.call(this, 'auto', false);
};
autoPlay = function(timer){
	if(timer) 
		this.timer = timer;
	this.auto = true;		
	setData.call(this, 'auto', true);
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
	$compo1,
	$compo1__sliderVr,
	$compo1__sliderPager;

/* compo1 */
$compo1 = doc.getElementById('compo1');
setItemsSlider.call(
	$compo1, 
	doc.getElementById('compo1__sliderVr'),		// sliderVr
	$compo1.getElementsByTagName('li'),			// Items
	true,										// direction
	true										// auto play
);
sliderPager.call(doc.getElementById('compo1__sliderPager'), $compo1, 'click');

doc.getElementById('compo1__sliderBtnPrev').onclick = function(){
	prevNextSlider.call($compo1, 'prev');
};
doc.getElementById('compo1__sliderBtnNext').onclick = function(){
	prevNextSlider.call($compo1, 'next');
};

/*
doc.getElementById('compo1BtnPause').onclick = function(){
	pause.call($compo1);
};
doc.getElementById('compo1BtnPlay').onclick = function(){
	autoPlay.call($compo1, 2000);
};
autoPlay.call($compo1, 2000);*/

