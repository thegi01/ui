"use strict";

/*_____ UI Script _____*/

/* ieIE */
/*var isIE,
	isIE8 = false;
isIE = function(){
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};
if ( isIE() == 8 ) { isIE8 = true; }*/


/* Tabs Control */
var setItems,
	tabs,
	setCurrent,
	prevNext,
	getIdxByDirection,
	autoPlay,
	play,
	pause;
setItems = function(items, direction, autoPlay){
	this.items = items;
	this.itemsLen = this.items.length;
	if(direction) {
		this.direction = 'next';
	};
	if(autoPlay) {
		this.auto = 'false';
		this.timer = 3000;
	};
};
tabs = function(evtType, target){
	var self = this;
	this.items.find(target).click(function(){
		var idx = $(this).parent().attr('data-idx');
		self.attr('data-current', idx);
	});
};
prevNext = function(d){
	var idx = this.attr('data-current');
	if( d == 'prev') {
		idx--;
		if( idx < 0 ) 
			idx = $season.itemsLen - 1;
	} else {
		idx++;
		if( idx == $season.itemsLen) 
			idx = 0;
	}
	this.attr('data-current', idx);
};/*
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
	} else {
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
	setDataAttr.call(this, 'auto', true);
	play.call(this);
};
play = function(){
	var el = this;
	el.interval = setInterval(function(){
		getIdxByDirection.call(el);
		setCurrent.call(el, el.idx);
	}, el.timer);
};
pause = function(){
	clearInterval(this.interval);
	this.auto = false;
	setDataAttr.call(this, 'auto', false);
};*/

/*_____ Tabs.html _____*/
var doc = document,
	$news,
	$srchId,
	$season, 
	$menu;

/* news */
$news = $('#news');
setItems.call($news, $news.find('h4'));
tabs.call($news, 'click', 'a');

/* srchId */
$srchId = $('#srchId');
setItems.call($srchId, $srchId.find('h4'));
tabs.call($srchId, 'change', 'input');

/* season */
$season = $('#season');
setItems.call($season, $season.find('h4'), true);
tabs.call($season, 'click', 'a');
$('#seasonBtnPrev').click(function(){
	prevNext.call($season, 'prev')
});
$('#seasonBtnNext').click(function(){
	prevNext.call($season, 'next')
});
/*$season.interval = setInterval(function(){
	prevNext.call($season, 'next')
}, 3000);
*/
/*
doc.getElementById('seasonBtnPause').onclick = function(){
	pause.call($season);
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	autoPlay.call($season, 3000);
};
autoPlay.call($season, 3000);*/

/* menu */
/*$menu = doc.getElementById('menu');
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
*/
