"use strict";

var UI = {
	load : function(){
		this.rankCtrl();
	}
	, rankCtrl : function(){
		//선택자 선언
		var doc = document,
			rank = doc.querySelectorAll('.rank')[0],
			rankSrch = rank.querySelectorAll('.rank-srch')[0],
			rankTopic = rank.querySelectorAll('.rank-topic')[0],
			rankSrchList = rankSrch.querySelectorAll('.rank-lst-srch')[0];
		
		// 클래스명 
		var cnRankItem = 'rank-item',
			cnActive = 'active',
			cnRankShow = 'rank-show';
		
		// 변수 선언
		var idx = 0,
			len = 10,
			h = 20,
			intervalTime = 2000,	
			intervalrankMove;

		// 함수
		var init = function(){
			rankTopic.style.display = 'none'; //topic hide
			drawItem(); //item 템플릿 적용
			rankMove();	//rank moving 
		}
		var drawItem = function(){
			var rankText, textIdx, val, templet, node;
			for(var i=0 ; i<len ; i++) {
				rankText = ['상승', '하강','new'];
				textIdx = Math.floor(Math.random()*rankText.length);
				val = Math.floor((Math.random() * 200) + 1);			
				templet = '<a href="#href" class="rank-a">실시간 검색어 '+ (i+1) + '<span class="rank-icon">'+ rankText[textIdx] +'</span><span class="rank-val">'+ val + '</span></a>';					
				node = document.createElement("li");
				node.className = cnRankItem;
				if(textIdx == 0)
					UTIL.addClass(node, 'up');
				else if(textIdx == 1)
					UTIL.addClass(node, 'dn');
				else 
					UTIL.addClass(node, 'new');
				node.innerHTML = templet;
				rankSrchList.appendChild(node);
				idx = 1;
			}
		}
		var rankMove = function(){
			intervalrankMove = setInterval(function(){
				if(Modernizr.csstransitions) {
					rankSrchList.style.transitionProperty = '';
					rankSrchList.style.webkitTransitionProperty = '';
					rankSrchList.style.MozTransitionProperty = '';
					rankSrchList.style.OTransitionProperty = '';
				} else { // lt ie9
				}
				rankSrchList.style.marginTop = '-' + h*idx + 'px' ;
				idx = (idx == len-1) ? 0 : idx+1;
				/*if(idx == len-1) {
					rankSrch.querySelectorAll('.lastrank')[0].style.display = 'block';
				}*/
			}, intervalTime);
		}
		var rankAll = function(){
			clearInterval(intervalrankMove);
			if(idx == 0) idx = 1;
			UTIL.addClass(rankSrchList.querySelectorAll('.'+cnRankItem)[idx-1], cnActive);
			UTIL.addClass(rankSrch, cnRankShow);
		}
		var rankSimply = function(){
			if(Modernizr.csstransitions) {
				rankSrchList.style.transitionProperty = 'none';
				rankSrchList.style.webkitTransitionProperty = 'none';
				rankSrchList.style.MozTransitionProperty = 'none';
				rankSrchList.style.OTransitionProperty = 'none';
			} else { // lt ie9
			}
			UTIL.removeClass(rankSrchList.querySelectorAll('.'+cnRankItem)[idx-1], cnActive);
			UTIL.removeClass(rankSrch, cnRankShow);
			rankMove();
		}
		
		// Events > Mouseover
		rankSrch.onmouseover = function(){					
			rankAll();
		}
		rankSrch.onmouseout = function(){
			rankSimply();
		}			

		// 실행
		init();

		// Events > Focus
		var rankA = rankSrch.querySelectorAll('.rank-a');
		for(var i=0; i<rankA.length; i++){
			rankA[i].onfocus = function(){
				rankAll();					
			}
			rankA[i].onblur = function(){
				rankSimply();					
			}
		}
	}
}

// 유틸
var UTIL = {
	addClass : function(e, clsName){
		var cn = e.className;
		if(cn.indexOf(clsName) != -1) return;
		if(cn != '') clsName = ' ' + clsName;
		e.className  = cn + clsName;
	}
	, removeClass : function(e, clsName){
		var cn = e.className;
	    var rxp = new RegExp( "\\s?\\b"+clsName+"\\b", "g" );
	    cn = cn.replace( rxp, '' );
	    e.className = cn;
	}
}
 
UI.load();
