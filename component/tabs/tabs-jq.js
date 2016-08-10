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
	getIdx,
	autoPlay,
	play,
	pause,
	autoPlayCheck;
setItems = function(items, direction, autoPlay){
	this.items = items;
	this.itemsLen = this.items.length;
	if(direction) {
		this.idx = this.attr('data-current');
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
		autoPlayCheck.call(self);
		self.idx = $(this).parent().attr('data-idx');
		self.attr('data-current', self.idx);
	});
};
prevNext = function(d, n){
	var idx = Number(this.idx);
	this.direction = d;
	autoPlayCheck.call(this);
	idx = getIdx[this.direction](idx, this.itemsLen-1, n);
	this.idx = idx;
	this.attr('data-current', idx);
};
autoPlay = function(timer){
	if(timer) 
		this.timer = timer;
	this.auto = true;
	this.attr('data-auto', true);	
	play.call(this);
};
play = function(){
	var el = this;
	el.interval = setInterval(function(){
		prevNext.call(el, el.direction);
	}, el.timer);
};
pause = function(){
	clearInterval(this.interval);
	this.auto = false;
	this.attr('data-auto', false);
};
autoPlayCheck = function(){
	if( this.auto ) {
		clearInterval(this.interval);
		play.call(this);
	};
};
getIdx = {
	prev : function(idx, len, n){
		if(n) 
			idx = idx - n; 
		else
			idx--;
		if( idx < 0 ) {
			if(n) 
				idx = Math.floor(len/n)*n;
			else
				idx = len;
		};
		return idx;
	},
	next : function(idx, len, n){
		if(n)
			idx = idx + n;
		else 
			idx++;
		if( idx > len ) 
			idx = 0;
		return idx;
	}
};

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
setItems.call($season, $season.find('h4'), true, true);
tabs.call($season, 'click', 'a');
$('#seasonBtnPrev').click(function(){
	prevNext.call($season, 'prev');
});
$('#seasonBtnNext').click(function(){
	prevNext.call($season, 'next');
});
$('#seasonBtnPause').click(function(){
	pause.call($season);
});
$('#seasonBtnPlay').click(function(){
	autoPlay.call($season, 2000);
});
autoPlay.call($season, 2000);

/* menu */
$menu = $('#menu');
setItems.call($menu, $menu.find('li'), true );
$('#menuBtnPrev').click(function(){
	prevNext.call($menu, 'prev', 3);
});
$('#menuBtnNext').click(function(){
	prevNext.call($menu, 'next', 3);
});

