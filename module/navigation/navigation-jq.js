"use strict";

/*
 * Run init() after the page is loaded
 */
window.onload = init;

/* 
 * Initialization
 */
function init(){
	
}

(function($){	

	var UI = {
		jsOn : function(){
			$('html').removeClass('no-js').addClass('js');
		}
		, tabCtrl : function(){
			//선택자 선언
			var tabNavs = $('.tab-nav-a');
			
			// 클래스명 
			var cnActive = 'active',
				cnShow = 'show';
			
			// 변수 선언
			var focusedItem = 'music'; //초기 카테고리

			// 함수
			var init = function(){				
				focusedItem = $('.tab-nav-' + focusedItem);
				drawItem(focusedItem);
				tabActive(focusedItem);				
			}
			var drawItem = function(obj){
				var dummy = [];
				var dataCategory;
				var _tplLi, _tplPlay, _tplBadge;
				var templet = '{tplLi}<a href="{url}" class="item-a"><span class="area-thumb"><img src="{imgUrl}" class="img-thumb"><span class="mask-thumb"></span>{tplBadge}</span>{tplPlay}<p class="title-lst">{title}</p></a><p class="stxt-lst">{text}</p></li>';
				dummy.push('<ul class="lst-thumb">');

				//선택한 탭에 따라 category 분류하여 DATA 받아옴
				if(obj.hasClass('tab-nav-music')) {
					dataCategory = DATA_TABCONTENTS.MUSIC;
				} else if(obj.hasClass('tab-nav-tv')){
					dataCategory = DATA_TABCONTENTS.TV;
				}

				for(var i=0; i<dataCategory.length ; i++){
					var data = dataCategory[i];
					var tpl = templet;
					_tplLi = i==0 ? '<li class="item item-promotion">' : '<li class="item">';
					_tplPlay = data.play ? '<p class="icon-play">영상 <span class="blind">컨텐츠</span></p>' : '';
					_tplBadge = data.badge ? '<span class="badge-thumb"><em class="badge-text">'+ data.badge + '</em><span class="badge-bg"></span></span>' : '';
					tpl = tpl.replace('{tplLi}', _tplLi)
								.replace("{url}", data.url)
								.replace("{imgUrl}", data.imgUrl)
								.replace("{tplPlay}", _tplPlay)
								.replace("{tplBadge}", _tplBadge)
								.replace("{title}", data.title)
								.replace("{text}", data.text);
					dummy.push(tpl);					
				}

				dummy.push('</ul>');
				obj.next().html(dummy.join(''));
			}
			var tabActive = function(e){
				e.addClass(cnActive);
				e.next().addClass(cnShow);
			}
			var tabUnActive = function(e){
				e.removeClass(cnActive);
				e.next().removeClass(cnShow);
			}
			
			// 이벤트				
			tabNavs.each(function(){
				$(this).click(function(){
					var target = $(this);
					if(!target.hasClass('tab-nav-a')) return;

					if(focusedItem) tabUnActive(focusedItem);
					tabActive(target.parent());
					focusedItem = target.parent();
					
					//클릭한 탭메뉴의 컨텐츠가 없으면 불러온다.
					if(!focusedItem.next().find('.lst-thumb').length) { 
						drawItem(focusedItem);
					}
				})
			});				

			init();
		
		}
	}	

	
})(jQuery);
