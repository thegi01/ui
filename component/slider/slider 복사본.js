"use strict";

/*_____ UI Script _____*/

/*
 * Components
 */

if(isOldIE) document.body.className = document.body.className + ' oldIE';

/* Data Current Control */
var currentIdx = {
	set : function( cpnt, idx ){
		cpnt.current = idx;
		window.setdataAttr(cpnt, 'current', idx);
		if(isLteIE8)												// In IE8, css doesn't apply 
			this.className = this.className;
		if(cpnt.panel) 
			window.panelSlide.panelAnimate[isOldIE](cpnt, idx * cpnt.itemWidth);
	},
	get : function( cpnt ){
		return window.getdataAttr( cpnt, 'current' )
	},
	next : function( cpnt, n ){
		var idx = this.get( cpnt );
		cpnt.direction = 'next';
		idx++;
		if( idx === cpnt.itemsLen ) 
			idx = 0;
		this.set( cpnt, idx );
	},
	prev : function( cpnt ){
		var idx = this.get( cpnt );
		cpnt.direction = 'prev';
		idx--;
		if( idx < 0 ) 
			idx = cpnt.itemsLen - 1;
		this.set( cpnt, idx );
	}
};
var currentCtrl = {
	play : function( cpnt ){
		if(!cpnt.direction){
			cpnt.idx = window.currentIdx.get( cpnt );
			cpnt.direction = 'next';
		};
		cpnt.interval = setInterval(function(){
			window.currentIdx[cpnt.direction](cpnt);
		}, cpnt.timer);
	},
	pause : function( cpnt ){
		window.clearInterval( cpnt.interval );
		cpnt.autoPlay = false;
		window.setdataAttr( cpnt, 'autoPlay', false);
	},
	autoPlay : function( cpnt, timer ){
		cpnt.timer = timer ? timer : 3000;
		cpnt.autoPlay = true;		
		window.setdataAttr( cpnt, 'autoPlay', true);
		this.play( cpnt );
	},
	autoPlayCheck : function( cpnt ){
		if( cpnt.autoPlay ) {
			window.clearInterval(cpnt.interval);
			this.play( cpnt ) ;
		};
	}
};
var tabs = {
	set : function( cpnt, items ){
		cpnt.items = items;
		cpnt.itemsLen = cpnt.items.length;
	},
	evtFn : function( cpnt, el, evtType, role ){
		el[ addEvent ]( eventType[evtType], function(e){
			var t = window.eTarget(e);
			if( t.tagName == 'A' ) 										// e.preventDefault();
				window.prevent(e);
			t = t.parentElement;
			if(window.getdataAttr(t, 'role') != role)  					// 이벤트 타겟 검증
				return;
			window.currentCtrl.autoPlayCheck(cpnt);						// auto play check
			var idx = Number( window.getdataAttr(t, 'idx') );
			window.currentIdx.set( cpnt, idx );
		});
	}
};
var panelSlide = {
	set : function( cpnt, panel ){
		cpnt.panel = panel;
		cpnt.itemWidth = cpnt.offsetWidth;
		var css = '#' + cpnt.id + ' .' + cpnt.panel.firstElementChild.className + ' {width:' + cpnt.itemWidth + 'px' + '}';
		window.appendStyle(css);
		cpnt.panel.style.width = cpnt.itemWidth * cpnt.itemsLen + 'px';
	},
	panelAnimate : {
		true : function( cpnt, xVal ){					// OldIE
			cpnt.panel.style.left = -xVal + 'px';
		}, 
		false : function( cpnt, xVal ){					// css3
			cpnt.panel.style.webkitTransform = 'translate3d(' + -xVal +'px, 0px, 0px)';
			cpnt.panel.style.mozTransform = 'translate3d(' + -xVal +'px, 0px, 0px)';
			cpnt.panel.style.oTransform = 'translate3d(' + -xVal +'px, 0px, 0px)';
			cpnt.panel.style.transform = 'translate3d(' + -xVal +'px, 0px, 0px)';
		}
	}
};

/*
 * 하위 호환성 체크
 * BC : backward compatibility 
 */

/* BC > dataAttr */
var dataAttr, hasdataAttr, getdataAttr, setdataAttr;
dataAttr = {
	'true' : {
		get : function( el, name ){
			return el.dataset[ name ];
		},
		set : function( el, name, val ){
			el.dataset[ name ] = val;
		}
	},
	'false' : {
		get : function( el, name ){
			return el.getAttribute('data-'+ name);
		},
		set : function( el, name, val ){
			el.setAttribute('data-' + name, val);			
		}
	}
};
hasdataAttr = 'dataset' in document.body;
getdataAttr = dataAttr[hasdataAttr].get;
setdataAttr = dataAttr[hasdataAttr].set;

/* BC > Target, Event....*/
var getETarget, getAddEvent, getPrevent, getAddEvent, getEventType;
getETarget = {
	true : function(e){
		return e.target;
	},
	false : function(){					// OldIE
		return e.srcElement;
	}
};
getPrevent = {
	true : function(e){
		e.preventDefault();
	},
	false : function(e){				// OldIE
		e.returnValue = false;
	}
};
getAddEvent = {
	true : 'addEventListener',
	false : 'attachEvent' 				// OldIE
};
getEventType = {
	true : {
		'click' : 'click',
		'change' : 'change'
	},
	false : {							// OldIE
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


/*_____ Tabs.html _____*/
var doc = document;

/* news */
var $news = doc.getElementById('news');
window.tabs.set($news, $news.getElementsByTagName('h4'));
window.tabs.evtFn(
	$news,			// cpnt
	$news, 			// el
	'click', 		// evtType
	'tabs-item'		// role
);

/* compo2 */
var $compo2 = doc.getElementById('compo2');
window.tabs.set(
	$compo2,		// cpnt
	doc.getElementById('compo2__tabsLst').getElementsByTagName('li')	// items
);
window.tabs.evtFn(
	$compo2,			// cpnt
	$compo2, 			// el
	'click', 			// evtType
	'tabs-item'			// role
);
doc.getElementById('compo2__tabsBtnPrev').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo2);
	window.currentIdx.prev($compo2);
};
doc.getElementById('compo2__tabsBtnNext').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo2);
	window.currentIdx.next($compo2);
};
doc.getElementById('compo2__tabsBtnPause').onclick = function(){
	window.currentCtrl.pause($compo2);
};
doc.getElementById('compo2__tabsBtnPlay').onclick = function(){
	window.currentCtrl.autoPlay($compo2, 3000);
};
// autoPlay($compo2, 2000);

/* compo3 */
var $compo3 = doc.getElementById('compo3');
window.tabs.set(
	$compo3, 									// cpnt
	$compo3.getElementsByTagName('li')			// Items
);
window.tabs.evtFn(
	$compo3, 									// cpnt
	doc.getElementById('compo3__sliderPager'), 	// el
	'click',									// evtType
	'slider-pager-item'							// role
);
doc.getElementById('compo3__sliderBtnPrev').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo3);
	window.currentIdx.prev($compo3);
};
doc.getElementById('compo3__sliderBtnNext').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo3);
	window.currentIdx.next($compo3);
};
doc.getElementById('compo3__sliderBtnPause').onclick = function(){
	window.currentCtrl.pause($compo3);
};
doc.getElementById('compo3__sliderBtnPlay').onclick = function(){
	window.currentCtrl.autoPlay($compo3, 2000);
};
// autoPlay($compo3, 2000);

/* compo4 */
var $compo4 = doc.getElementById('compo4');
window.tabs.set(
	$compo4, 									// cpnt
	$compo4.getElementsByTagName('li')			// Items
);
window.panelSlide.set(
	$compo4,									// cpnt
	doc.getElementById('compo4__sliderPanels')	// sliderPanles
);
window.tabs.evtFn(
	$compo4, 									// cpnt
	doc.getElementById('compo4__sliderPager'), 	// el
	'click',									// evtType
	'slider-pager-item'							// role
);
doc.getElementById('compo4__sliderBtnPrev').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo4);
	window.currentIdx.prev($compo4);
};
doc.getElementById('compo4__sliderBtnNext').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo4);
	window.currentIdx.next($compo4);
};
doc.getElementById('compo4__sliderBtnPause').onclick = function(){
	window.currentCtrl.pause($compo4);
};
doc.getElementById('compo4__sliderBtnPlay').onclick = function(){
	window.currentCtrl.autoPlay($compo4, 2000);
};
// autoPlay($compo4, 2000);


