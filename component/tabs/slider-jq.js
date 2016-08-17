"use strict";

/*_____ UI Script _____*/

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
		cpnt.attr('data-current', idx);
		// if( isOldIE )												// In IE8, css doesn't apply 
			// cpnt.className = cpnt.className;
		if( cpnt.panel ) 	// items이 유동적일 경우
			window.panelSlide.panelAnimate[isOldIE](cpnt, idx * cpnt.itemWidth);
		if( cpnt.pagerCur )
			window.tabs.pagerApply( cpnt );
	},
	get : function( cpnt ){
		return Number( cpnt.attr('data-current') );
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
		cpnt.play = false;
		cpnt.attr('data-play', false);
	},
	autoPlay : function( cpnt, timer ){
		cpnt.timer = timer ? timer : 3000;
		cpnt.play = true;		
		cpnt.attr('data-play', true);
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
		cpnt.items[evtType](function(){
			window.currentCtrl.autoPlayCheck( cpnt );			// auto play check
			var idx = Number( $(this).attr('data-idx') );
			window.currentIdx.set( cpnt, idx );
		});
	},
	pagerSet : function( cpnt, pagerCur, pagerTotal){
		pagerTotal.text( cpnt.itemsLen );
		cpnt.pagerCur = pagerCur;
		this.pagerApply( cpnt );
	},
	pagerApply : function( cpnt ){
		cpnt.pagerCur.text( window.currentIdx.get( cpnt ) + 1 );
	}
};
// items이 유동적일 경우
var panelSlide = {
	set : function( cpnt, panel ){
		cpnt.panel = panel;
		cpnt.itemWidth = cpnt.outerWidth();
		var css = '#' + cpnt[0].id + ' .' + cpnt.panel.children()[0].className + ' {width:' + cpnt.itemWidth + 'px' + '}';
		window.appendStyle(css);
		cpnt.panel.css( 'width', cpnt.itemWidth * cpnt.itemsLen + 'px' );
	},
	panelAnimate : {  
		'true' : function( cpnt, xVal ){					// OldIE
			cpnt.panel[0].style.left = -xVal + 'px';
		}, 
		'false' : function( cpnt, xVal ){					// css3
			cpnt.panel[0].style.webkitTransform = 'translate3d(' + -xVal +'px, 0px, 0px)';
			cpnt.panel[0].style.mozTransform = 'translate3d(' + -xVal +'px, 0px, 0px)';
			cpnt.panel[0].style.oTransform = 'translate3d(' + -xVal +'px, 0px, 0px)';
			cpnt.panel[0].style.transform = 'translate3d(' + -xVal +'px, 0px, 0px)';
		}
	}
};



/*_____ Tabs.html _____*/

/* news */
var $news = $('#news');
window.tabs.set($news, $news.find('h4'));
window.tabs.evtListener(
	$news,			// cpnt
	'click' 		// evtType
);

/* compo2 */
var $compo2 = $('#compo2');
window.tabs.set(
	$compo2,		// cpnt
	$('#compo2__tabsLst').find('li')	// items
);
window.tabs.evtListener(
	$compo2,			// cpnt
	'click' 			// evtType
);
$('#compo2__tabsBtnPrev').click(function(){
	window.currentCtrl.autoPlayCheck($compo2);
	window.currentIdx.prev($compo2);
});
$('#compo2__tabsBtnNext').click(function(){
	window.currentCtrl.autoPlayCheck($compo2);
	window.currentIdx.next($compo2);
});
$('#compo2__tabsBtnPause').click(function(){
	window.currentCtrl.pause($compo2);
});
$('#compo2__tabsBtnPlay').click(function(){
	window.currentCtrl.autoPlay($compo2, 3000);
});
// autoPlay($compo2, 2000);

/* compo3 */
var $compo3 = $('#compo3');
window.tabs.set(
	$compo3, 									// cpnt
	$compo3.find('li')							// Items
);
window.tabs.evtListener(
	$compo3, 									// cpnt
	'click'										// evtType
);
$('#compo3__sliderBtnPrev').click(function(){
	window.currentCtrl.autoPlayCheck($compo3);
	window.currentIdx.prev($compo3);
});
$('#compo3__sliderBtnNext').click(function(){
	window.currentCtrl.autoPlayCheck($compo3);
	window.currentIdx.next($compo3);
});
$('#compo3__sliderBtnPause').click(function(){
	window.currentCtrl.pause($compo3);
});
$('#compo3__sliderBtnPlay').click(function(){
	window.currentCtrl.autoPlay($compo3, 2000);
});
// autoPlay($compo3, 2000);

/* compo4 */
var $compo4 = $('#compo4');
window.tabs.set(
	$compo4, 									// cpnt
	$compo4.find('li')							// Items
);
window.tabs.evtListener(
	$compo4, 									// cpnt
	'click'										// evtType
);
$('#compo4__sliderBtnPrev').click(function(){
	window.currentCtrl.autoPlayCheck($compo4);
	window.currentIdx.prev($compo4);
});
$('#compo4__sliderBtnNext').click(function(){
	window.currentCtrl.autoPlayCheck($compo4);
	window.currentIdx.next($compo4);
});
$('#compo4__sliderBtnPause').click(function(){
	window.currentCtrl.pause($compo4);
});
$('#compo4__sliderBtnPlay').click(function(){
	window.currentCtrl.autoPlay($compo4, 2000);
});
// autoPlay($compo4, 2000);

/* compo5 */
var $compo5 = $('#compo5'),
	$compo5_pagerCur = $('#compo5__sliderPagerCurrent');
window.tabs.set(
	$compo5, 									// cpnt
	$('#compo5__sliderPanels').children()		// Items
);
window.panelSlide.set(
	$compo5,									// cpnt
	$('#compo5__sliderPanels')					// sliderPanles
);
$('#compo5__sliderBtnPrev').click(function(){
	window.currentCtrl.autoPlayCheck($compo5);
	window.currentIdx.prev($compo5);
});
$('#compo5__sliderBtnNext').click(function(){
	window.currentCtrl.autoPlayCheck($compo5);
	window.currentIdx.next($compo5);
});
$('#compo5__sliderBtnPause').click(function(){
	window.currentCtrl.pause($compo5);
});
$('#compo5__sliderBtnPlay').click(function(){
	window.currentCtrl.autoPlay($compo5, 2000);
});
// autoPlay($compo5, 2000);
window.tabs.pagerSet(
	$compo5, 
	$('#compo5__sliderPagerCurrent'), 
	$('#compo5__sliderPagerTotal')
);

/* compo6 */
var $compo6 = $('#compo6');
window.tabs.set(
	$compo6,		// cpnt
	$('#compo6__sliderPanel').find('div'),	// items
	2  				// nth 
);
window.tabs.evtListener(
	$compo6,			// cpnt
	'click' 			// evtType
);
$('#compo6__sliderBtnPrev').click(function(){
	window.currentCtrl.autoPlayCheck($compo6);
	window.currentIdx.prev($compo6);
});
$('#compo6__sliderBtnNext').click(function(){
	window.currentCtrl.autoPlayCheck($compo6);
	window.currentIdx.next($compo6);
});
$('#compo6__sliderBtnPause').click(function(){
	window.currentCtrl.pause($compo6);
});
$('#compo6__sliderBtnPlay').click(function(){
	window.currentCtrl.autoPlay($compo6, 3000);
});
// autoPlay($compo2, 2000);

