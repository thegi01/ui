"use strict";
(function(){
	var UI = {
		load : function(){
			this.rankCtrl();
		}
		, rankCtrl : function(){
			//선택자 선언
			var rank = $('.rank'),
				rankSrch = rank.find('.rank-srch'),
				rankTopic = rank.find('.rank-topic'),
				rankSrchList = rankSrch.find('.rank-lst-srch');
			
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
				rankTopic.css('display', 'none'); //topic hide
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
						node.className += ' up';
					else if(textIdx == 1)
						node.className += ' dn';
					else
						node.className += ' new';
					node.innerHTML = templet;
					rankSrchList.append(node);
					idx = 1;
				}
			}
			var rankMove = function(){
				intervalrankMove = setInterval(function(){
					if(Modernizr.csstransitions) {
						rankSrchList.css({
							'transition-property' : '',
							'-webkit-transition-property' : ''
						});
					} else { // lt ie9
					}
					rankSrchList.css('margin-top', '-' + h*idx + 'px');
					idx = (idx == len-1) ? 0 : idx+1;					
				}, intervalTime);
			}
			var rankAll = function(){
				clearInterval(intervalrankMove);
				if(idx == 0) idx = 1;
				rankSrchList.find('.'+cnRankItem).eq(idx-1).addClass(cnActive);
				rankSrch.addClass(cnRankShow);
			}
			var rankSimply = function(){
				if(Modernizr.csstransitions) {
					rankSrchList.css({
						'transition-property' : 'none',
						'-webkit-transition-property' : 'none'
					});
				} else { // lt ie9
				}
				rankSrchList.find('.'+cnRankItem).eq(idx-1).removeClass(cnActive);
				rankSrch.removeClass(cnRankShow);
				rankMove();
			}
			
			// 이벤트
			rankSrch.bind('mouseenter focusin', function(){
				rankAll();
			});
			rankSrch.bind('mouseleave focusout', function(){
				rankSimply();
			});

			// 실행
			init();
		}
	}

	UI.load();

})();
