"use strict";

/*_____ UI Script _____*/

var Tabs,
	i;

/* Tabs */
Tabs = function(el, items, evtType){
	this.el = el;
	this.items = items;
	this.itemsLen = this.items.length;
	this.idx = 0;

	this.evtAct(evtType); // get item idx and set el current at evtType
};
Tabs.prototype.evtAct = function(evtType){
	var self = this;
	for(i=0 ; i<this.itemsLen ; i++){
		this.items[i][evtType] = function(){
			self.idx =  Number(this.dataset.idx);
			self.el.dataset.current = self.idx;
		};
	};
};
Tabs.prototype.prevNext = function(d){
	var tabIdx = this.idx,
		val = this.itemsLen-1;
	if(d=="prev"){
		tabIdx--;
		if(tabIdx < 0) 
			tabIdx = val;
	} else if(d=="next"){
		tabIdx++;
		if(tabIdx > val) 
			tabIdx = 0;
	}
	this.el.dataset.current = tabIdx;
	this.idx = tabIdx;
};




/*_____ Tabs.html _____*/

var doc = document,
	$news, tabsNews,
	$srchId, tabsSrchId,
	$season, tabsSeason;

/* Tabs > news */
$news = doc.getElementById('news');
tabsNews = new Tabs(
	$news, 
	$news.getElementsByTagName('h4'),
	'onclick'
);

/* Tabs > srchId */
$srchId = doc.getElementById('srchId');
tabsSrchId = new Tabs(
	$srchId,
	$srchId.getElementsByTagName('input'),
	'onchange'
);

/* Tabs > season */
$season = doc.getElementById('season');
tabsSeason = new Tabs(
	$season,
	$season.getElementsByTagName('h4'),
	'onclick'
);
doc.getElementById('seasonBtnPrev').onclick = function(){
	tabsSeason.prevNext('prev');
};
doc.getElementById('seasonBtnNext').onclick = function(){
	tabsSeason.prevNext('next');
};


