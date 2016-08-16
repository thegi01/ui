"use strict";

/*_____ UI Script _____*/

/*
 * 하위 호환성 체크
 * BC : backward compatibility 
 */

/* BC > dataAttr */
var dataAttr, hasDataAttr, getDataAttr, setDataAttr;
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
hasDataAttr = 'dataset' in document.body;
getDataAttr = dataAttr[hasDataAttr].get;
setDataAttr = dataAttr[hasDataAttr].set;

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

/*
 * Components
 */

/* Data Current Control */
var currentIdx = {
	set : function( cpnt, idx ){
		cpnt.current = idx;
		window.setDataAttr(cpnt, 'current', idx);
		if(isLteIE8)												// In IE8, css doesn't apply 
			this.className = this.className;
		if( cpnt.panel ) 	// items이 유동적일 경우
			window.panelSlide.panelAnimate[isOldIE](cpnt, idx * cpnt.itemWidth);
		if( cpnt.pagerCur )
			window.tabs.pagerApply( cpnt );
	},
	get : function( cpnt ){
		return Number( window.getDataAttr( cpnt, 'current' ) );
	},
	next : function( cpnt ){
		var idx = this.get( cpnt );
		cpnt.direction = 'next';
		if(cpnt.nth)
			idx = idx + cpnt.nth;
		else 
			idx++;
		if( idx === cpnt.itemsLen  ) 
			idx = 0;
		this.set( cpnt, idx );
		if( cpnt.pagerCur )
			window.tabs.pagerApply( cpnt );
	},
	prev : function( cpnt ){
		var idx = this.get( cpnt );
		cpnt.direction = 'prev';
		if(cpnt.nth) 
			idx = idx - cpnt.nth; 
		else
			idx--;
		if( idx < 0 ) {
			if(cpnt.nth) 
				idx = Math.floor((cpnt.itemsLen - 1)/cpnt.nth)*cpnt.nth;
			else
				idx = cpnt.itemsLen - 1;
		};
		this.set( cpnt, idx );
		if( cpnt.pagerCur )
			window.tabs.pagerApply( cpnt );
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
		window.setDataAttr( cpnt, 'autoPlay', false);
	},
	autoPlay : function( cpnt, timer ){
		cpnt.timer = timer ? timer : 3000;
		cpnt.autoPlay = true;		
		window.setDataAttr( cpnt, 'autoPlay', true);
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
	set : function( cpnt, items, nth ){
		cpnt.items = items;
		cpnt.itemsLen = cpnt.items.length;
		cpnt.nth = nth;
	},
	evtListener : function( cpnt, el, evtType, role ){
		el[ addEvent ]( eventType[evtType], function(e){
			var t = window.eTarget(e);
			if( t.tagName == 'A' ) 										// e.preventDefault();
				window.prevent(e);
			t = t.parentElement;
			if(window.getDataAttr(t, 'role') != role)  					// 이벤트 타겟 검증
				return;
			window.currentCtrl.autoPlayCheck(cpnt);						// auto play check
			var idx = Number( window.getDataAttr(t, 'idx') );
			window.currentIdx.set( cpnt, idx );
		});
	},
	pagerSet : function( cpnt, pagerCur, pagerTotal){
		pagerTotal.textContent = cpnt.itemsLen;
		cpnt.pagerCur = pagerCur;
		this.pagerApply( cpnt );
	},
	pagerApply : function( cpnt ){
		cpnt.pagerCur.textContent = window.currentIdx.get( cpnt ) + 1;
	}
};
// items이 유동적일 경우
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



/*_____ Tabs.html _____*/
var doc = document;

/* news */
var $news = doc.getElementById('news');
window.tabs.set($news, $news.getElementsByTagName('h4'));
window.tabs.evtListener(
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
window.tabs.evtListener(
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
window.tabs.evtListener(
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
window.tabs.evtListener(
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

/* compo5 */
var $compo5 = doc.getElementById('compo5'),
	$compo5_pagerCur = doc.getElementById('compo5__sliderPagerCurrent');
window.tabs.set(
	$compo5, 									// cpnt
	doc.getElementById('compo5__sliderPanels').children		// Items
);
window.panelSlide.set(
	$compo5,									// cpnt
	doc.getElementById('compo5__sliderPanels')	// sliderPanles
);
/*window.tabs.evtListener(
	$compo5, 									// cpnt
	doc.getElementById('compo5__sliderPager'), 	// el
	'click',									// evtType
	'slider-pager-item'							// role
);*/
doc.getElementById('compo5__sliderBtnPrev').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo5);
	window.currentIdx.prev($compo5);
};
doc.getElementById('compo5__sliderBtnNext').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo5);
	window.currentIdx.next($compo5);
};
doc.getElementById('compo5__sliderBtnPause').onclick = function(){
	window.currentCtrl.pause($compo5);
};
doc.getElementById('compo5__sliderBtnPlay').onclick = function(){
	window.currentCtrl.autoPlay($compo5, 2000);
};
// autoPlay($compo5, 2000);
window.tabs.pagerSet(
	$compo5, 
	doc.getElementById('compo5__sliderPagerCurrent'), 
	doc.getElementById('compo5__sliderPagerTotal')
);

/* compo6 */
var $compo6 = doc.getElementById('compo6');
window.tabs.set(
	$compo6,		// cpnt
	doc.getElementById('compo6__sliderPanel').getElementsByTagName('div'),	// items
	2  				// nth 
);
window.tabs.evtListener(
	$compo6,			// cpnt
	$compo6, 			// el
	'click', 			// evtType
	'slider-item'			// role
);
doc.getElementById('compo6__sliderBtnPrev').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo6);
	window.currentIdx.prev($compo6);
};
doc.getElementById('compo6__sliderBtnNext').onclick = function(){
	window.currentCtrl.autoPlayCheck($compo6);
	window.currentIdx.next($compo6);
};
doc.getElementById('compo6__sliderBtnPause').onclick = function(){
	window.currentCtrl.pause($compo6);
};
doc.getElementById('compo6__sliderBtnPlay').onclick = function(){
	window.currentCtrl.autoPlay($compo6, 3000);
};
// autoPlay($compo2, 2000);

