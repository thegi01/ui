"use strict";

/*_____ UI Script _____*/

var i,
	tabs,
	prevNext,
	getIdxByDirection,
	autoPlay,
	play,
	pause,
	clearTime;

var dataset = {
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
			return el.getAttribute('dataset'+ attr);
		},
		set : function(el, attr, val){
			el.setAttribute('data-' + attr, val);
		}
	}
};
var hasDataset = 'dataset' in document.body;

var dataCtrl = {
	setItems : function(el, items, direction, autoPlay){
		el.items = items;
		el.itemsLen = el.items.length;
		if(direction) {
			el.idx = dataset[hasDataset].get(el, 'current');
			el.direction = 'next';
		};
		if(autoPlay) {
			el.auto = 'false';
			el.timer = 3000;
		};
	},
	tabs : function(el, items, evtType, direction, autoPlay){
		this.setItems(el, items, direction, autoPlay);
		el.addEventListener('click', function(e){
			console.log(e.target);
		}, false);
		/*var self = this;
		for( i=0 ; i < el.itemsLen ; i++ ){
			el.items[i][evtType] = function(){
				el.idx =  Number( this.dataset.idx );
				dataset[hasDataset].set(el, 'current', el.idx);
			};
		};*/
	},
	prevNext : function(el, d, n){
		el.direction = d;
		if( el.auto ) {
			clearInterval(el.interval);
			this.play(el);
		};
		this.getIdxByDirection(el, n);
		dataset[hasDataset].set(el, 'current', el.idx);
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
			dataset[hasDataset].set(el, 'current', el.idx);
		}, el.timer);
	},
	pause : function(el){
		clearInterval(el.interval);
		el.auto = false;
		el.dataset.auto = false;
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
dataCtrl.tabs(
	$news, 
	$news.getElementsByTagName('h4'),
	'onclick'
);

/* srchId */
$srchId = doc.getElementById('srchId');
dataCtrl.tabs(
	$srchId,
	$srchId.getElementsByTagName('input'),
	'onchange'
);

/* season */
$season = doc.getElementById('season');
dataCtrl.tabs(
	$season,
	$season.getElementsByTagName('h4'),
	'onclick',
	true, // directon
	true  // auto
);
doc.getElementById('seasonBtnPrev').onclick = function(){
	dataCtrl.prevNext($season, this.dataset.direction);
};
doc.getElementById('seasonBtnNext').onclick = function(){
	dataCtrl.prevNext($season, this.dataset.direction);
};
doc.getElementById('seasonBtnPause').onclick = function(){
	dataCtrl.pause($season);
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	dataCtrl.autoPlay($season, 3000);
};
dataCtrl.autoPlay($season, 3000);

/* menu */
$menu = doc.getElementById('menu');
dataCtrl.setItems(
	$menu, 
	$menu.getElementsByTagName('li'),
	true
);
doc.getElementById('menuBtnPrev').onclick = function(){
	dataCtrl.prevNext($menu, 'prev', 3);
};
doc.getElementById('menuBtnNext').onclick = function(){
	dataCtrl.prevNext($menu, 'next', 3);
};

