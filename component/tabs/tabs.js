"use strict";

/*_____ UI Script _____*/

var isIE,
	isIE8 = false;
isIE = function(){
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};
if ( isIE() == 8 ) { isIE8 = true; }


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

var tabsCtrl = {
	init : function(el, items, direction, autoPlay){
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
	},
	tabs : function(el, evtType, target){
		var self = this;
		isLower.addEvent(el, evtType, function(e){
			var t = isLower.getTarget(e);
			if(t.tagName == 'A') 						// e.preventDefault();
				isLower.prevent(); 
			if( target ) 								// get idx target 설정
				t = t[target]; 
			if(getDataAttr(t, 'role') != 'tabsItem')  	// 이벤트 타겟 검증
				return;
			if( el.auto ) {  							// auto play
				clearInterval(el.interval);
				self.play(el);
			};
			el.idx = Number( getDataAttr(t, 'idx') );
			self.setCurrent(el, el.idx);
		});
		/*el.addEventListener(evtType, function(e){
			var _target = (target) ? e.target[target] : e.target;
			if(_target.tagName != tagName) return;
			el.idx = Number( getDataAttr(_target, 'idx') );
			setDataAttr(el, 'current', el.idx);
		}, false);*/
		/*var self = this;
		for( i=0 ; i < el.itemsLen ; i++ ){
			el.items[i][evtType] = function(){
				el.idx =  Number( this.dataset.idx );
				setDataAttr(el, 'current', el.idx);
			};
		};*/
	},
	setCurrent : function(el, idx){
		setDataAttr(el, 'current', idx);
		if(isIE8)	// In IE8, css doesn't apply 
			el.className = el.className;
	},


	prevNext : function(el, d, n){
		el.direction = d;
		if( el.auto ) {
			clearInterval(el.interval);
			this.play(el);
		};
		this.getIdxByDirection(el, n);
		this.setCurrent(el, el.idx);
	},
	getIdxByDirection : function(el, n){
		var d = el.direction,
			idx = Number(el.idx),
			val = el.itemsLen-1;
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
		el.idx = idx;
	},
	autoPlay : function(el, timer){
		if(timer) 
			el.timer = timer;
		el.auto = true;		
		setDataAttr(el, 'auto', true);
		this.play(el);
	},
	play : function(el){
		var self = this;
		el.interval = setInterval(function(){
			self.getIdxByDirection(el);
			self.setCurrent(el, el.idx);
		}, el.timer);
	},
	pause : function(el){
		clearInterval(el.interval);
		el.auto = false;
		setDataAttr(el, 'auto', false);
	}
};

var isLower = {
	getTarget : function(e){
		return e.target || e.srcElement;
	},
	addEvent : function(e, type, handler){
		if(isIE8 && type == 'change')
			type = 'click';
		if(e.attachEvent)
			e.attachEvent("on" + type, handler);
		else /*if(e.addEventListener)*/
			e.addEventListener(type, handler);
	},
	prevent : function(){
		if(event.preventDefault)
			event.preventDefault();
		else
			event.returnValue = false;
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
tabsCtrl.init($news, $news.getElementsByTagName('h4'));
tabsCtrl.tabs($news , 'click', 'parentElement');

/* srchId */
$srchId = doc.getElementById('srchId');
tabsCtrl.init($srchId, $srchId.getElementsByTagName('input'));
tabsCtrl.tabs($srchId , 'change');  

/* season */
$season = doc.getElementById('season');
tabsCtrl.init($season, $season.getElementsByTagName('h4'), true, true);
tabsCtrl.tabs($season , 'click', 'parentElement');
doc.getElementById('seasonBtnPrev').onclick = function(){
	tabsCtrl.prevNext($season, getDataAttr(this, 'direction'));
};
doc.getElementById('seasonBtnNext').onclick = function(){
	tabsCtrl.prevNext($season, getDataAttr(this, 'direction'));
};
doc.getElementById('seasonBtnPause').onclick = function(){
	tabsCtrl.pause($season);
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	tabsCtrl.autoPlay($season, 3000);
};
tabsCtrl.autoPlay($season, 3000);

/* menu */
$menu = doc.getElementById('menu');
tabsCtrl.init(
	$menu, 
	$menu.getElementsByTagName('li'),
	true
);
doc.getElementById('menuBtnPrev').onclick = function(){
	tabsCtrl.prevNext($menu, 'prev', 3);
};
doc.getElementById('menuBtnNext').onclick = function(){
	tabsCtrl.prevNext($menu, 'next', 3);
};





/*var sBrowser, sUsrAg = navigator.userAgent;
if(sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome";
} else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
} else if (sUsrAg.indexOf("Opera") > -1) {
    sBrowser = "Opera";
} else if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
} else if (sUsrAg.indexOf("MSIE") > -1) {
    sBrowser = "Microsoft Internet Explorer";
}
console.log("You are using: " + sBrowser);
function getBrowserId () {
    var
        aKeys = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"],
        sUsrAg = navigator.userAgent, nIdx = aKeys.length - 1;
    for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);
    return nIdx
}
console.log(getBrowserId());*/