"use strict";

/*_____ UI Script _____*/

var i,
	tabs,
	tabsPrevNext;
	

/* tabs */
tabs = function(items, evtType){
	this.items = items;
	this.itemsLen = this.items.length;
	this.idx = 0;
	var self = this;
	for(i=0 ; i<this.itemsLen ; i++){
		this.items[i][evtType] = function(){
			self.idx =  Number(this.dataset.idx);
			self.dataset.current = self.idx;
		};
	};
};

tabsPrevNext = function(d){
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
	this.dataset.current = tabIdx;
	this.idx = tabIdx;
};




/*_____ Tabs.html _____*/

var doc = document,
	$news,
	$srchId,
	$season, 

/* Tabs > news */
$news = doc.getElementById('news');
tabs.call(
	$news, 
	$news.getElementsByTagName('h4'),
	'onclick'
);

/* Tabs > srchId */
$srchId = doc.getElementById('srchId');
tabs.call(
	$srchId,
	$srchId.getElementsByTagName('input'),
	'onchange'
);

/* Tabs > season */
$season = doc.getElementById('season');
tabs.call(
	$season,
	$season.getElementsByTagName('h4'),
	'onclick'
);
doc.getElementById('seasonBtnPrev').onclick = function(){
	tabsPrevNext.call($season, this.dataset.direction);
};
doc.getElementById('seasonBtnNext').onclick = function(){
	tabsPrevNext.call($season,  this.dataset.direction);
};


