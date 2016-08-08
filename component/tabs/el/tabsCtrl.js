"use strict";

/*_____ UI Script _____*/

var i,
	dataAttr, hasDataAttr, getDataAttr, setDataAttr,
	tabsCtrl,
	util;

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
// hasDataAttr = 'false';
getDataAttr = dataAttr[hasDataAttr].get;
setDataAttr = dataAttr[hasDataAttr].set;

tabsCtrl = {
	setItems : function(el, items, direction, autoPlay){
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
	tabs : function(el, evtType, tagName, target){
		var self = this;
		util.addEvent(el, evtType, function(e){
			var _target = (target) ? e.target[target] : e.target;
			if(_target.tagName != tagName) return;
			if( el.auto ) {
				clearInterval(el.interval);
				self.play(el);
			};
			el.idx = Number( getDataAttr(_target, 'idx') );
			self.setCurrent(el, el.idx);
			// setDataAttr(el, 'current', el.idx);
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
		el.classList.add('current' + idx);
	},
	prevNext : function(el, d, n){
		el.direction = d;
		if( el.auto ) {
			clearInterval(el.interval);
			this.play(el);
		};
		this.getIdxByDirection(el, n);
		setDataAttr(el, 'current', el.idx);
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
		el.dataset.auto = true;
		this.play(el);
	},
	play : function(el){
		var self = this;
		el.interval = setInterval(function(){
			self.getIdxByDirection(el);
			setDataAttr(el, 'current', el.idx);
		}, el.timer);
	},
	pause : function(el){
		clearInterval(el.interval);
		el.auto = false;
		el.dataset.auto = false;
	}
};

util = {
	addEvent : function(element, type, handler){
		if(element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else if(element.addEventListener){
			element.addEventListener(type, handler);
		};
	}
}

/*_____ Tabs.html _____*/

var doc = document,
	$news,
	$srchId,
	$season, 
	$menu;

/* news */
$news = doc.getElementById('news');
tabsCtrl.setItems($news, $news.getElementsByTagName('h4'));
tabsCtrl.tabs($news , 'click', 'H4', 'parentElement');

/* srchId */
$srchId = doc.getElementById('srchId');
tabsCtrl.setItems($srchId, $srchId.getElementsByTagName('input'));
tabsCtrl.tabs($srchId , 'change', 'INPUT');

/* season */
$season = doc.getElementById('season');
tabsCtrl.setItems($season, $season.getElementsByTagName('h4'), true, true);
tabsCtrl.tabs($season , 'click', 'H4', 'parentElement');
doc.getElementById('seasonBtnPrev').onclick = function(){
	tabsCtrl.prevNext($season, this.dataset.direction);
};
doc.getElementById('seasonBtnNext').onclick = function(){
	tabsCtrl.prevNext($season, this.dataset.direction);
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
tabsCtrl.setItems(
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

