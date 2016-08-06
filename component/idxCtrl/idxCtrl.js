"use strict";

/*_____ UI Script _____*/

var i,
	changeCurrent,
	setItems,
	getCurrentIdx,
	setCurrentIdx,
	prevNext,
	getIdxByDirection,
	// autoPlayChk,
	autoPlay,
	play,
	pause,
	clearTime;

setItems = function(items, direction, autoPlay){
	this.items = items;
	this.itemsLen = this.items.length;
	if(direction) {
		getCurrentIdx.call(this);
		this.direction = 'next';
	};
	if(autoPlay) {
		this.auto = 'false';
		this.timer = 3000;
	};
};
getCurrentIdx = function(){
	this.idx = this.dataset.current;
};
setCurrentIdx = function(){
	this.dataset.current = this.idx;
};
changeCurrent = function(items, evtType, direction, autoPlay){
	setItems.call(this, items, direction, autoPlay);
	var self = this;
	for( i=0 ; i < this.itemsLen ; i++ ){
		this.items[i][evtType] = function(){
			self.idx =  Number( this.dataset.idx );
			setCurrentIdx.call(self);
		};
	};
};
prevNext = function(d, n){
	this.direction = d;
	// autoPlayChk.call(this);
	if( this.auto == true ) {
		clearInterval(this.interval);
		play.call(this);
	};
	getIdxByDirection.call(this, n);
	setCurrentIdx.call(this);
};
getIdxByDirection = function(n){
	var d = this.direction,
		idx = Number(this.idx),
		val = this.itemsLen-1;
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
	this.idx = idx;
};
autoPlay = function(timer){
	if(timer) 
		this.timer = timer;
	this.auto = true;
	this.dataset.auto = true;
	play.call(this);
};
play = function(){
	var self = this;
	this.interval = setInterval(function(){
		getIdxByDirection.call(self);
		setCurrentIdx.call(self);
	}, this.timer);
};
pause = function(){
	clearInterval(this.interval);
	this.auto = false;
	this.dataset.auto = false;
};


/*_____ Tabs.html _____*/

var doc = document,
	$news,
	$srchId,
	$season, 
	$menu;

/* news */
$news = doc.getElementById('news');
changeCurrent.call(
	$news, 
	$news.getElementsByTagName('h4'),
	'onclick'
);

/* srchId */
$srchId = doc.getElementById('srchId');
changeCurrent.call(
	$srchId,
	$srchId.getElementsByTagName('input'),
	'onchange'
);

/* season */
$season = doc.getElementById('season');
changeCurrent.call(
	$season,
	$season.getElementsByTagName('h4'),
	'onclick',
	true, // directon
	true  // auto
);
doc.getElementById('seasonBtnPrev').onclick = function(){
	prevNext.call($season, this.dataset.direction);
};
doc.getElementById('seasonBtnNext').onclick = function(){
	prevNext.call($season, this.dataset.direction);
};
doc.getElementById('seasonBtnPause').onclick = function(){
	pause.call($season);
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	autoPlay.call($season, 3000);
};
autoPlay.call($season, 3000);

/* menu */
$menu = doc.getElementById('menu');
setItems.call(
	$menu, 
	$menu.getElementsByTagName('li'),
	true
);
doc.getElementById('menuBtnPrev').onclick = function(){
	prevNext.call($menu, 'prev', 3);
};
doc.getElementById('menuBtnNext').onclick = function(){
	prevNext.call($menu, 'next', 3);
};

