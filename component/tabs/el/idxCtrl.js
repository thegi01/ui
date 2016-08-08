"use strict";

/*_____ UI Script _____*/

var i,
	changeCurrent,
	setItems,
	getCurrentIdx,
	setCurrentIdx,
	prevNext,
	getIdxByDirection,
	autoPlay,
	play,
	pause,
	clearTime;

setItems = function(el, items, direction, autoPlay){
	el.items = items;
	el.itemsLen = el.items.length;
	if(direction) {
		getCurrentIdx(el);
		el.direction = 'next';
	};
	if(autoPlay) {
		el.auto = 'false';
		el.timer = 3000;
	};
};
getCurrentIdx = function(el){
	el.idx = el.dataset.current;
};
setCurrentIdx = function(el){
	el.dataset.current = el.idx;
};
changeCurrent = function(el, items, evtType, direction, autoPlay){
	setItems(el, items, direction, autoPlay);
	for( i=0 ; i < el.itemsLen ; i++ ){
		el.items[i][evtType] = function(){
			el.idx =  Number( this.dataset.idx );
			setCurrentIdx(el);
		};
	};
};
prevNext = function(el, d, n){
	el.direction = d;
	if( el.auto == true ) {
		clearInterval(el.interval);
		play(el);
	};
	getIdxByDirection(el, n);
	setCurrentIdx(el);
};
getIdxByDirection = function(el, n){
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
	} else if( d == "next" ){
		if(n)
			idx = idx + n;
		else 
			idx++;
		if( idx > val ) 
			idx = 0;
	};
	el.idx = idx;
};
autoPlay = function(el, timer){
	if(timer) 
		el.timer = timer;
	el.auto = true;
	el.dataset.auto = true;
	play(el);
};
play = function(el){
	el.interval = setInterval(function(){
		getIdxByDirection(el);
		setCurrentIdx(el);
	}, el.timer);
};
pause = function(el){
	clearInterval(el.interval);
	el.auto = false;
	el.dataset.auto = false;
};


/*_____ Tabs.html _____*/

var doc = document,
	$news,
	$srchId,
	$season, 
	$menu;

/* news */
$news = doc.getElementById('news');
changeCurrent(
	$news, 
	$news.getElementsByTagName('h4'),
	'onclick'
);

/* srchId */
$srchId = doc.getElementById('srchId');
changeCurrent(
	$srchId,
	$srchId.getElementsByTagName('input'),
	'onchange'
);

/* season */
$season = doc.getElementById('season');
var t1 = performance.now();
changeCurrent(
	$season,
	$season.getElementsByTagName('h4'),
	'onclick',
	true, // directon
	true  // auto
);
var t2 = performance.now();
console.log (t2-t1);

doc.getElementById('seasonBtnPrev').onclick = function(){
	prevNext($season, this.dataset.direction);
};
doc.getElementById('seasonBtnNext').onclick = function(){
	prevNext($season, this.dataset.direction);
};
doc.getElementById('seasonBtnPause').onclick = function(){
	pause($season);
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	autoPlay($season, 3000);
};
autoPlay($season, 3000);

/* menu */
$menu = doc.getElementById('menu');
setItems(
	$menu, 
	$menu.getElementsByTagName('li'),
	true
);
doc.getElementById('menuBtnPrev').onclick = function(){
	prevNext($menu, 'prev', 3);
};
doc.getElementById('menuBtnNext').onclick = function(){
	prevNext($menu, 'next', 3);
};

