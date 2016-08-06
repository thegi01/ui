"use strict";

/*_____ UI Script _____*/

var idxCtrl,
	i;

/* idxCtrl */
idxCtrl = function(el, items){
	this.el = el;
	this.items = items;
	this.itemsLen = this.items.length;
	this.idx;
	this.direction = 'next';
	this.auto = false;
	this.interval;
	this.timer = 3000;
	this.getIdx();
};
idxCtrl.prototype.getIdx = function(){
	this.idx = Number(this.el.dataset.current);
};
idxCtrl.prototype.itemEvt = function(evtType){
	var self = this;
	for( i = 0 ; i < this.itemsLen ; i++ ){
		this.items[i][evtType] = function(){
			self.idx =  Number(this.dataset.idx);
			self.elApply();
			self.autoChk();
		};
	};
};
idxCtrl.prototype.elApply = function(){
	this.el.dataset.current = this.idx;
};
idxCtrl.prototype.prevNext = function(d, n){
	this.direction = d;
	this.autoChk();
	this.prevNextIdx(n);
	this.elApply();
};
idxCtrl.prototype.autoChk = function(){
	if( this.auto == true ) {
		this.clearTime();
		this.play();
	};
};
idxCtrl.prototype.prevNextIdx = function(n){
	var d = this.direction,
		idx = this.idx,
		val = this.itemsLen - 1;
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
idxCtrl.prototype.autoPlay = function(timer){
	if(timer) 
		this.timer = timer;
	this.auto = true;
	this.el.dataset.auto = true;
	this.play();
};
idxCtrl.prototype.play = function(){
	var self = this;
	this.interval = setInterval(function(){
		self.prevNextIdx();
		self.elApply();
	}, this.timer);
};
idxCtrl.prototype.pause = function(){
	this.clearTime();
	this.auto = false;
	this.el.dataset.auto = false;
};
idxCtrl.prototype.clearTime = function(){
	clearInterval(this.interval);
};


/*idxCtrl.prototype.prev = function(){
	this.idx--;
	if(this.idx < 0) 
		this.idx = this.itemsLen-1;
};
idxCtrl.prototype.next = function(){
	this.idx++;
	if(this.idx > this.itemsLen-1) 
		this.idx = 0;
};*/



/*_____ idxCtrl.html _____*/

var doc = document,
	$news,
	$srchId,
	$season,
	$menu,
	$travel;

/* idxCtrl > news */
$news = doc.getElementById('news');
$news.idxCtrl = new idxCtrl(
	$news, 
	$news.getElementsByTagName('h4')
);
$news.idxCtrl.itemEvt('onclick')

/* idxCtrl > srchId */
$srchId = doc.getElementById('srchId');
$srchId.idxCtrl = new idxCtrl(
	$srchId, 
	$srchId.getElementsByTagName('input')
);
$srchId.idxCtrl.itemEvt('onchange');

/* idxCtrl > season */
$season = doc.getElementById('season');
$season.idxCtrl = new idxCtrl(
	$season, 
	$season.getElementsByTagName('h4')
);
$season.idxCtrl.itemEvt('onclick');
doc.getElementById('seasonBtnPrev').onclick = function(){
	$season.idxCtrl.prevNext('prev');
};
doc.getElementById('seasonBtnNext').onclick = function(){
	$season.idxCtrl.prevNext('next');
};
doc.getElementById('seasonBtnPause').onclick = function(){
	$season.idxCtrl.pause();
};
doc.getElementById('seasonBtnPlay').onclick = function(){
	$season.idxCtrl.autoPlay(1000);
};
//$season.idxCtrl.autoPlay(1000);

/* menu */
$menu = doc.getElementById('menu');
$menu.idxCtrl = new idxCtrl(
	$menu, 
	$menu.getElementsByTagName('li')
);
doc.getElementById('menuBtnPrev').onclick = function(){
	$menu.idxCtrl.prevNext('prev', 3);
};
doc.getElementById('menuBtnNext').onclick = function(){
	$menu.idxCtrl.prevNext('next', 3);
};

/* slider */
/*$travel = doc.getElementById('travel');
$travel.idxCtrl = new idxCtrl(
	$travel, 
	doc.getElementById('travelPaging').getElementsByTagName('li')
);
$travel.idxCtrl.itemEvt('onclick');*/
/*doc.getElementById('tarvelBtnPrev').onclick = function(){
	doc.getElementById('travel-cnts').style.transform = 'translate3d(300px, 0px, 0px)';
	doc.getElementById('travel-cnts').style.transitionDuration = '500ms';
};
doc.getElementById('tarvelBtnNext').onclick = function(){
	doc.getElementById('travel-cnts').style.transform = 'translate3d(0, 0px, 0px)';
	doc.getElementById('travel-cnts').style.transitionDuration = '500ms';
};
*/


















