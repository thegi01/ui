"use strict";

/*
 * Run init() after the page is loaded
 */
window.onload = init;

/* 
 * Initialization
 */
function init(){
	// Varialbe
	var doc = document,
		panelDefault = doc.getElementsByClassName('panel-default')[0];

	/* Panel | Component | Scroll Control Event Bind */
	// Comonent Click Event 
	doc.getElementsByClassName('nav-main')[0].onclick = function(e){
		componentCtrl(e, panelDefault);
	};
	// Panel Side Show & hide Control 
	panelDefault.getElementsByClassName('btn-friends')[0].onclick = function(e){
		panelSideCtrl(e, panelDefault);
	};
	// Panel Messenger Show 
	doc.getElementsByClassName('btn-messenger')[0].onclick = function(e){
		panelMessengerCtrl(e, panelDefault);
	};
	// panel Btm Show & hide Control 
	doc.getElementsByClassName('nav-write')[0].onclick = panelBtmCtrl;
	// Panel Search Event 
	doc.getElementsByClassName('input-srch')[0].onfocus = function(e){
		panelSrchCtrl(e, panelDefault)
	};
	// Comonet Body Scroll Event 
	var componentBody = doc.getElementsByClassName('component-body');
	for(var i=0 ; i<componentBody.length ; i++){
		componentBody[i].onscroll = function(){
			scrollAnimation(this);
		};
	}
}

/* Panel | Component | Scroll Control */
var componentCtrl = function(e, panel){
	var init = function(){
		if(!e.target.classList.contains('btn-nav-main')) return;
		// Get Target
		var target = e.target.id.toString().split('-');
		target = target[target.length-1];
		// 변수 선언
		var	component = panel.getElementsByClassName('component-body'),
			eleOld = panel.getElementsByClassName('component-newspd')[0],
			eleCur = panel.getElementsByClassName('component-' + target),
			dataHeader = DATA.HEADER[target],
			navNode = document.getElementsByClassName('nav-write')[0];
		// eleOld 
		if(component.length > 1){
			for(var i=0 ; i<component.length ; i++){
				if(component[i].style.display == 'block') eleOld = component[i];
			}
		} 
		if(eleOld == eleCur[0]) return;
		eleOld.style.display = 'none';
		// Draw 
		if(!eleCur.length) draw(target, dataHeader);
		// Data Set
		setData(dataHeader);
		// Scroll Animation Reset
		setScroll(eleCur);
		// Show 
		eleCur[0].style.display = 'block';
		// NavNode Click Event
		navNode.onclick = panelBtmCtrl;
	},
	// Templete
	draw = function(target, data){
		var t = ' <div class="component-body component-{menu}" style="display:none"> <div class="component-area"> {title} </div> </div>';
		t = t.replace('{menu}', target).replace('{title}', data.text);
		panel.getElementsByClassName('panel-default-main')[0].innerHTML += t;
	},
	// Data
	setData = function(data){
		// Boolean Data
		var typeBoolean = {
			title : 'header-title', // 타이틀 노출
			srch : 'header-srch', // 검색 노출
			btnMessenger : 'btn-messenger', // messenger button 노출
			btnfriends : 'btn-friends', // plus button 노출
			navWrite : 'grp-nav-write' // Nav Write 노출
		}
		// Title
		panel.getElementsByClassName(typeBoolean.title)[0].textContent = data.text; 
		// Boolean Set
		for(var prop in typeBoolean) {
			panel.getElementsByClassName(typeBoolean[prop])[0].style.display = data[prop] ? 'block' : 'none';
		}
	},
	// Set Scroll
	setScroll = function(e){
		var panelHead = panel.getElementsByClassName('panel-default-header')[0],
			panelBody = panel.getElementsByClassName('panel-default-main')[0],
			navWrite = panel.getElementsByClassName('grp-nav-write')[0];
		panelHead.style.transform = '';
		panelHead.style.opacity = '';
		panelBody.style.top = '';
		navWrite.style.transform = '';
		e[0].style.top = '';
		e[0].children[0].style.top = '';
	};
	init();
},
panelSideCtrl = function(e, panelDefault){
	var panelSide = document.getElementsByClassName('panel-side')[0],
	init = function(){
		// Get Target
		var target = e.target.classList;
		target = target[e.target.classList.length-1].split('-');
		target = target[target.length-1];
		// 변수 선언 
		var eleOld = panelSide.getElementsByClassName('component-friends')[0],
			eleCur = panelSide.getElementsByClassName('component-' + target)[0],
			navDirection = panelSide.getElementsByClassName('ul-nav-direction'),
			btnHide = panelSide.getElementsByClassName('btn-back')[0];
		// Component Show & Hide
		eleOld.style.display = 'none';
		eleCur.style.display = 'block';
		// Set Data
		setData(DATA.HEADER[target]);
		// Panel Animation
		panelDefault.classList.add('panel-move-left');
		panelSide.classList.remove('hide');
		// Nav Direction
		if(!navDirection.length) drawFriends();
		navDirection[0].onclick = friendsCtrl;
		// 패널 닫기 버튼 클릭 이벤트 
		btnHide.onclick = hide;
	},
	setData = function(data){
		var headerTitle = panelSide.getElementsByClassName('header-title')[0];
		headerTitle.textContent = data.text;
		headerTitle.style.display = data.title ? 'block' : 'none';
		panelSide.getElementsByClassName('header-srch')[0].style.display = data.srch ? 'block' : 'none';
		panelSide.getElementsByClassName('btn-back')[0].style.display = data.btnBack ? 'block' : 'none';
		panelSide.getElementsByClassName('nav-direction')[0].style.display = data.navDirection ? 'block' : 'none';
	},
	hide = function(){
		panelDefault.classList.remove('panel-move-left');
		panelSide.classList.add('hide');
	},
	drawFriends = function(){
		var fragmentObj = document.createDocumentFragment(),
			data = DATA.HEADER.friends.nav,
			ulNode = document.createElement('ul');
		for(var prop in data){
			var liNode = document.createElement('li'),
			 	aNode = document.createElement('a');
			liNode.className = 'item-nav-direction';
			liNode.dataset.id = prop;
			aNode.className = 'link-nav-direction';
			aNode.textContent = data[prop];
			aNode.href = '#href';
			liNode.appendChild(aNode);
			fragmentObj.appendChild(liNode);
		}
		ulNode.className = 'ul-nav-direction';
		ulNode.appendChild(fragmentObj);
		panelSide.getElementsByClassName('nav-direction')[0].appendChild(ulNode);
	},
	friendsCtrl = function(e){
		//console.log(e.target.getAttribute('data-role'));
	};
	init();
},
panelMessengerCtrl = function(e, panelDefault){
	var panelMessenger = document.getElementsByClassName('panel-messenger')[0],
	init = function(){
		// draw
		var container = panelMessenger.getElementsByClassName('panel-container-messenger');
		if(!container.length) draw();
		// 변수 선언
		var btnSet = panelMessenger.getElementsByClassName('btn-set')[0],
			btnHide = panelMessenger.getElementsByClassName('btn-close')[0];
		// show
		panelMessenger.classList.remove('hide');
		panelDefault.classList.add('panel-move-left-90');
		// 패널 닫기 버튼 클릭 이벤트 : panel Messenger close
		btnHide.onclick = hide;
		// 설정 버튼 클릭 이벤트 : modal popup call
		btnSet.onclick = function(e){
			var templet = '<p class="txt-chat-off">채팅 끄기</p>';
			popupModalCtrl(e, templet);
		};
	},
	hide = function(e){
		panelMessenger.classList.add('hide');
		panelDefault.classList.remove('panel-move-left-90');
	},
	draw = function(){
		var t = '<h2 class="blind">메신저 패널</h2>' + 
				'<button class="btn btn-close"><span class="blind">메신저 패널 닫기</span></button>' +
				'<section class="panel-container-messenger"> ' +
				'<header class="panel-header-messenger"> ' +
						'<div class="srch-messenger"> <input type="search" value="" placeholder="검색" title="검색어 입력" class="input-srch input-messenger"> </div>' +
						'<div class="grp-btn-header-messenger"> <button class="btn btn-set"><span class="blind">설정</span> </button> </div>' +
					'</header> ' +
					'<main class="panel-main-messenger"> ' +
						'<header class="header-messenger"> ' +
							'<h3 class="title-messenger">Messenger 시작하기</h3> ' +
							'<p class="txt-guide-messenger">문자 메시지만큼 빠르고 기능은 더욱 다양한 messenger를 이용해보세요. 앱에서 바로 사진과 동영상을 찍을 수도 있습니다.</p>' + 
						'</header> ' +
						'<div class="component-messenger"> ' +
							'<p class="guide-messenger"><img src="" alt="안내 이미지" class="img-guide-messenger"></p> ' +
							'<div class="grp-person-messenger"> <img src="" alt="금대원" class="img-person-messenger"> ' +
								'<p class="txt-person-messenger">대원님과 성수님이 Facebook <br> Messenger를 사용하고 있습니다.</p> ' +
							'</div> ' +
							'<div class="grp-btn-start-messenger"> ' +
								'<button class="btn btn-big btn-blue">설치</button> ' +
								'<button class="btn btn-text btn-text-blue">Messenger에 대해 더 알아보기</button> ' +
							'</div> ' +
						'</div> ' +
					'</main> ' +
				'</section>';
		panelMessenger.innerHTML = t;
	};
	init();
},
panelBtmCtrl = function(e){
	var panelBtm = document.getElementsByClassName('panel-btm')[0],
	init = function(){
		// Get Target
		if(!e.target.classList.contains('btn-nav-write')) return;
		var target = e.target.id.toString().split('-');
		target = target[target.length-1];
		// Draw
		if(!panelBtm.children.length) drawBody(target);
		// 변수 선언
		var dataHeaderer = DATA.WRITE[target],
			eleCur = panelBtm.getElementsByClassName('component-write-'+target),
			eleOld,
			component = panelBtm.getElementsByClassName('component-body'),
			btnHide = panelBtm.getElementsByClassName('btn-cancel')[0];
		// Get Data
		setData(dataHeaderer, btnHide);
		// Find EleOld
		for(var i=0 ; i<component.length ; i++){
			if(!(component[i].style.display == 'none')) eleOld = component[i];
		}
		// Show & Hide
		if(eleOld) eleOld.style.display = 'none';
		if(eleCur.length) eleCur[0].style.display = 'block'; 
		else drawComponent(target, dataHeaderer);
		eleOld = eleCur;
		// Class Remove
		panelBtm.classList.remove('hide');
		// Hide Button Click
		btnHide.onclick = hide;
	},
	setData = function(data, btnHide){
		var headerTitle = panelBtm.getElementsByClassName('header-title')[0];
		headerTitle.textContent = data.text;
		headerTitle.style.display = data.title ? 'block' : 'none';
		btnHide.style.display = data.btnCancel ? 'block' : 'none';
	},
	hide = function(e){
		if(!e.target.parentElement.classList.contains('header-side')) return;
		panelBtm.classList.add('hide');
	},
	drawBody = function(target){
		var t = ['<header class="panel-btm-header"> <h2 class="header-title"></h2> <div class="header-side"> <button class="btn btn-text btn-cancel">취소</button> </div> </header>'];
		t.push('<main class="panel-btm-main"></main>');
		panelBtm.innerHTML = t.join('');
	},
	drawComponent = function(target, data){
		var t = '<section class="component-body component-write-' + target + '">' + data.text + '</section>';
		panelBtm.getElementsByClassName('panel-btm-main')[0].innerHTML += t;
	};
	init();
},
panelSrchCtrl = function(e, panelDefault){
	var panelSrch = document.getElementsByClassName('panel-srch')[0],
		btnBak = [],
	init = function(){
		var headerSide = panelDefault.getElementsByClassName('header-side')[0],
			btns = headerSide.getElementsByClassName('btn'),
			btnHide = headerSide.getElementsByClassName('btn-cancel')[0],
			self = this;;
		for(var i=0 ; i<btns.length ; i++){
			if(!(btns[i].style.display == 'none')) btnBak.push(btns[i]);
			btns[i].style.display = btns[i].classList.contains('btn-cancel') ? 'block' : 'none';
		}
		drawLst();
		panelSrch.style.display = 'block';
		btnHide.onclick = hide;
	},
	hide = function(e){
		if(!document.getElementsByClassName('panel-srch')[0].style.display == 'block') return;
		e.target.style.display = 'none';
		panelSrch.style.display = 'none';
		btnBak.forEach(function(t){
			t.style.display = 'block';
		});
		btnBak = [];
		//this.unDrawLst();
	},
	drawLst = function(){
		if(panelSrch.getElementsByClassName('lst-srch').length) return;
		var data = DATA.LST_SRCH;
		var dummy = ['<h3 class="blind">검색</h3><header class="header-full"> <h4 class="title-header-full">최근 검색</h4> <button class="btn btn-text btn-small btn-edit">수정</button> </header>'];
		dummy.push('<ul class="lst-srch">');
		data.forEach(function(name){
			var t = '<li class="item-srch"><a href="{href}" class="link-srch"><img src="{imgSrc}" alt="" class="img-srch"><span class="text-srch">{title}</span></a></li>';
			t = t.replace('{href}', '#href')
					.replace('{imgSrc}', name.imgSrc)
					.replace('{title}', name.title);
			dummy.push(t);
		});
		dummy.push('</ul>');
		panelSrch.innerHTML += dummy.join('');
	},
	unDrawLst = function(){
		if(panelSrch.getElementsByClassName('lst-srch')[0]) {
			panelSrch.getElementsByClassName('header-full')[0].remove();
			panelSrch.getElementsByClassName('lst-srch')[0].remove();
		}
	};
	init();
},
popupModalCtrl = function(e, templet){
	var popupModal = document.getElementsByClassName('popup-modal')[0],
	init = function(){
		// 변수 선언 
		var modalDialog = popupModal.getElementsByClassName('modal-dialog');
		// Draw
		if(!modalDialog.length) draw();
		// Show Popup
		modalDialog[0].style.top = (e.target.offsetTop + e.target.offsetHeight + 16) + 'px';
		popupModal.classList.add('show');
		// Modal Click -> Hide
		popupModal.onclick = hide;
	},
	hide = function(e){
		if(!e.target.classList.contains('popup-modal')) return;
		popupModal.classList.remove('show');
	},
	draw = function(){
		var t = ['<div class="modal-dialog"> <div class="modal-content"> <header class="modal-header"></header> <main class="modal-body">'];
		t.push(templet);
		t.push('</main> <footer class="modal-footer"></footer> </div> </div>');
		popupModal.innerHTML = t.join('');
	};
	init();
},
scrollAnimation = function(e){
	var panelHead = document.getElementsByClassName('panel-default-header')[0],
		navWrite = document.getElementsByClassName('grp-nav-write')[0],
		panelBody = document.getElementsByClassName('panel-default-main')[0],
		navWriteH = document.getElementsByClassName('grp-nav-write').length ? document.getElementsByClassName('grp-nav-write')[0].clientHeight : null;
	var change = function(){
		var componentBody = e,
			componentArea = e.children[0],
			headerH = panelHead.clientHeight,
			isNavWirte = e.classList.contains('component-newspd') ? true : false,
			maxH = isNavWirte ? navWriteH + headerH : headerH;
		if(e.scrollTop == 0 ){
			panelHead.style.transform = '';
			panelHead.style.opacity = '';
			panelBody.style.top = '';
			componentBody.style.top = '';
			componentArea.style.top = ''; 
			if(isNavWirte) {
				navWrite.style.display = '';
				navWrite.style.transform = '';
			}
		} else if(e.scrollTop <= maxH) {
			var val = isNavWirte ? e.scrollTop - navWriteH : e.scrollTop;
			componentArea.style.top = e.scrollTop + 'px'; 
			if(isNavWirte) {
				if(e.scrollTop <= navWriteH){
					panelHead.style.transform = '';
					panelHead.style.opacity = '';
					navWrite.style.display = '';
					navWrite.style.transform = 'translateY(' + -e.scrollTop + 'px)';
					componentBody.style.top = (navWriteH-e.scrollTop) + 'px'; 
				} else { //e.scrollTop <= maxH
					panelHead.style.transform = 'translateY(' + -val + 'px)';
					panelHead.style.opacity = 1 - val/headerH;
					panelBody.style.top = headerH + -val + 'px';
					navWrite.style.display = 'none';
					navWrite.style.transform = 'translateY(' + -maxH + 'px)';
				}
			} else {
				panelHead.style.transform = 'translateY(' + -val + 'px)';
				panelHead.style.opacity = 1 - val/headerH;
				panelBody.style.top = headerH + -val + 'px';
			}
		} else if( e.scrollTop > maxH ){
			panelHead.style.transform = -headerH + 'px';
			panelHead.style.opacity = 0;
			panelBody.style.top = 0; 	
			componentArea.style.top = maxH + 'px'; 
			if(isNavWirte){
				navWrite.style.display = 'none';
				navWrite.style.transform = -maxH + 'px';
				componentBody.style.top = 0; 
			} 
		}
	}
	change();
};

// http://www.javascripttoolbox.com/lib/popup/example.php


