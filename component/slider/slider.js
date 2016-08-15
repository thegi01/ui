"use strict";

/*_____ UI Script _____*/

/*
 * 하위 호환성 체크
 * BC : backward compatibility 
 */

/* BC > dataAttr */
var dataAttr, hasdataAttr, getdataAttr, setdataAttr;
dataAttr = {
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
hasdataAttr = 'dataset' in document.body;
getdataAttr = dataAttr[hasdataAttr].get;
setdataAttr = dataAttr[hasdataAttr].set;

/* BC > Target, Event....*/
var getETarget, getAddEvent, getPrevent, getAddEvent, getEventType;
getETarget = {
	true : function(){
		return this.target;
	},
	false : function(){				// OldIE
		return this.srcElement;
	}
};
getPrevent = {
	true : function(){
		this.preventDefault();
	},
	false : function(){				// OldIE
		this.returnValue = false;
	}
};
getAddEvent = {
	true : 'addEventListener',
	false : 'attachEvent' 			// OldIE
};
getEventType = {
	true : {
		'click' : 'click',
		'change' : 'change'
	},
	false : {						// OldIE
		'click' : 'onclick',
		'change' : 'onclick'
	}
};

var  hasAddEvent;
hasAddEvent =  (Element.prototype.addEventListener) ? true : false;

var eTarget, prevent, addEvent, eventType; 
addEvent = getAddEvent[ hasAddEvent ];
eventType = getEventType[ hasAddEvent ];
document.body.onload = function(e){
	eTarget = getETarget[ typeof e.target != 'undefined' ];
	prevent = getPrevent [ typeof e.preventDefault != 'undefined'];
};


/*
 * appendStyle
 * @param css : String, css text 
 */
var appendStyle = function(css){
	var head = document.head || getEleByTagName(document, 'head')[0],
		style;
	if(head.getElementsByTagName('style').length){
		style = head.getElementsByTagName('style')[0];
	} else {
		style = document.createElement('style');
		style.type = 'text/css';
	}
	style.appendChild(document.createTextNode(css));
	head.appendChild(style);
};


/*
 * Components
 */

/* Tabs Control */
var setItems, 
	setSlider,
	tabs,
	setCurrent,
	setCurrentSlider,
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
		this.idx = getdataAttr.call(this, 'current');
		this.direction = 'next';
	};
	if(autoPlay) {
		this.autoPlay = 'false';
		this.timer = 3000;
	};
};
setSlider = function(vr, responsive){
	var css ;
	this.vr = vr;
	this.itemWidth = this.offsetWidth;
	if(responsive){
		css = '#' + this.id + ' .' + $compo3.vr.firstElementChild.className + ' {width:' + this.itemWidth + 'px' + '}';
		appendStyle(css);
	};
	this.vr.style.width = this.itemWidth * this.itemsLen + 'px';
};
tabs = function(el, evtType, role){
	this[ addEvent ]( eventType[evtType], function(e){
		var t = eTarget.call(e);
		if( t.tagName == 'A' ) 									// e.preventDefault();
			prevent.call(e);
		t = t.parentElement;
		if(getdataAttr.call(t, 'role') != role)  				// 이벤트 타겟 검증
			return;
		autoPlayCheck.call(el);									// auto play check
		el.idx = Number( getdataAttr.call(t, 'idx') );
		setCurrent.call(el, el.idx);
	});
};
setCurrent = function(idx){
	setdataAttr.call(this, 'current', idx);
	if(isLteIE8)												// In IE8, css doesn't apply 
		this.className = this.className;
	if(this.vr) 
		setCurrentSlider[isOldIE].call(this, this.idx * this.itemWidth);
};
setCurrentSlider = {
	true : function(xVal){										// OldIE
		this.vr.style.left = -xVal + 'px';
	}, 
	false : function(xVal){
		this.vr.style.webkitTransform = 'translate3d(' + -xVal +'px, 0px, 0px)';
		this.vr.style.mozTransform = 'translate3d(' + -xVal +'px, 0px, 0px)';
		this.vr.style.oTransform = 'translate3d(' + -xVal +'px, 0px, 0px)';
		this.vr.style.transform = 'translate3d(' + -xVal +'px, 0px, 0px)';
	}
};
prevNext = function(d, n){
	var idx = Number(this.idx);
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
	this.autoPlay = false;
	setdataAttr.call(this, 'autoPlay', false);
};
autoPlay = function(timer){
	if(timer) 
		this.timer = timer;
	this.auto = true;		
	setdataAttr.call(this, 'autoPlay', true);
	play.call(this);
};
autoPlayCheck = function(){
	if( this.autoPlay ) {
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
	$compo2,
	$compo3;

/* news */
$news = doc.getElementById('news');
setItems.call($news, $news.getElementsByTagName('h4'));
tabs.call($news, 
	$news,			// el
	'click', 		// evtType
	'tabs-item'		// role
);

/* compo2 */
$compo2 = doc.getElementById('compo2');
setItems.call($compo2,
	doc.getElementById('compo2__tabsLst').getElementsByTagName('li'),	// items
	true,				// direction
	true				// auto play
);
tabs.call($compo2, 
	$compo2,			// el
	'click', 			// evtType
	'tabs-item'			// role
);
doc.getElementById('compo2__tabsBtnPrev').onclick = function(){
	prevNext.call($compo2, 'prev');
};
doc.getElementById('compo2__tabsBtnNext').onclick = function(){
	prevNext.call($compo2, 'next');
};
doc.getElementById('compo2__tabsBtnPause').onclick = function(){
	pause.call($compo2);
};
doc.getElementById('compo2__tabsBtnPlay').onclick = function(){
	autoPlay.call($compo2, 2000);
};
// autoPlay.call($compo2, 2000);

/* compo3 */
$compo3 = doc.getElementById('compo3');
setItems.call($compo3, 
	$compo3.getElementsByTagName('li'),			// Items
	true,										// direction
	true										// auto play
);
setSlider.call($compo3,
	doc.getElementById('compo3__sliderVr'),		// sliderVr
	true										// responsive
);
tabs.call(doc.getElementById('compo3__sliderPager'), 
	$compo3, 									// el
	'click',									// evtType
	'slider-pager-item'							// role
);
doc.getElementById('compo3__sliderBtnPrev').onclick = function(){
	prevNext.call($compo3, 'prev');
};
doc.getElementById('compo3__sliderBtnNext').onclick = function(){
	prevNext.call($compo3, 'next');
};
doc.getElementById('compo3__sliderBtnPause').onclick = function(){
	pause.call($compo3);
};
doc.getElementById('compo3__sliderBtnPlay').onclick = function(){
	autoPlay.call($compo3, 2000);
};
// autoPlay.call($compo3, 2000);

