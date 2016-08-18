"use strict";

/*_____ UI Script _____*/

/* dataAttr */
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

var appendStyle = function(css){
    var head = document.head || document.getElementsByTagName('head')[0],
    	style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet)
	 	style.styleSheet.cssText = css;
	else 
		style.appendChild(document.createTextNode(css));
	head.appendChild(style);
};



/*
 * Components
 */
var currentIdx = {
	set : function( cpnt, idx ){
		cpnt.current = idx;
		window.setDataAttr(cpnt, 'current', idx);
		// if( isOldIE )												// In IE8, css doesn't apply 
			cpnt.className = cpnt.className;
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
		var self = this;
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
		cpnt.play = false;
		window.setDataAttr( cpnt, 'play', false);
	},
	autoPlay : function( cpnt, timer ){
		if(!cpnt.timer)
			cpnt.timer = timer ? timer : 3000;
		cpnt.play = true;		
		window.setDataAttr( cpnt, 'play', true);
		this.play( cpnt );
	},
	autoPlayCheck : function( cpnt ){
		if( cpnt.play ) {
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
	evtListener : function( cpnt, evtType ){
		var _listenr = function(){
			window.currentCtrl.autoPlayCheck( cpnt );						// auto play check
			var idx = Number( window.getDataAttr(this, 'idx') );
			window.currentIdx.set( cpnt, idx );
		};
		for ( var i = 0; i < cpnt.itemsLen ; i++ ) {
			cpnt.items[i][ evtType ] = _listenr;
		};
	},
	pagerSet : function( cpnt, pagerCur, pagerTotal){
		pagerTotal.innerText = cpnt.itemsLen;
		cpnt.pagerCur = pagerCur;
		this.pagerApply( cpnt );
	},
	pagerApply : function( cpnt ){
		cpnt.pagerCur.innerText = window.currentIdx.get( cpnt ) + 1;
	}
};
// items이 유동적일 경우
var panelSlide = {
	set : function( cpnt, panel ){
		cpnt.panel = panel;
		cpnt.itemWidth = cpnt.offsetWidth;
		var css = '#' + cpnt.id + ' .' + cpnt.panel.children[0].className + ' {width:' + cpnt.itemWidth + 'px' + '}';
		window.appendStyle(css);
		cpnt.panel.style.width = cpnt.itemWidth * cpnt.itemsLen + 'px';
	},
	panelAnimate : {  
		'true' : function( cpnt, xVal ){					// OldIE
			cpnt.panel.style.left = -xVal + 'px';
		}, 
		'false' : function( cpnt, xVal ){					// css3
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
	'onclick' 		// evtType
);

/* compo2 */
var $compo2 = doc.getElementById('compo2');
window.tabs.set(
	$compo2,		// cpnt
	doc.getElementById('compo2__tabsLst').getElementsByTagName('li')	// items
);
window.tabs.evtListener(
	$compo2,			// cpnt
	'onclick' 			// evtType
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
window.currentCtrl.autoPlay($compo2, 1000);
if($compo2.play) {
	doc.getElementById('compo2__tabsPanel').onmouseover = function(){
		window.currentCtrl.pause( $compo2 );
		window.setDataAttr( $compo2, 'play', 'pause');
	};
	doc.getElementById('compo2__tabsPanel').onmouseout = function(){		
		window.currentCtrl.autoPlay( $compo2 );
	};
};

/* compo3 */
var $compo3 = doc.getElementById('compo3');
window.tabs.set(
	$compo3, 									// cpnt
	$compo3.getElementsByTagName('li')			// Items
);
window.tabs.evtListener(
	$compo3, 									// cpnt
	'onclick'								// evtType
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
// window.currentCtrl.autoPlay($compo3, 2000);

/* compo4 */
var $compo4 = doc.getElementById('compo4');
window.tabs.set(
	$compo4, 									// cpnt
	$compo4.getElementsByTagName('li')			// Items
);
window.tabs.evtListener(
	$compo4, 									// cpnt
	'onclick'									// evtType
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
// window.currentCtrl.autoPlay($compo4, 2000);

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
// awindow.currentCtrl.utoPlay($compo5, 2000);
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
	'onclick' 			// evtType
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
// window.currentCtrl.autoPlay($compo2, 2000);

