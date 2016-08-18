"use strict";

/*
 * Run init() after the page is loaded
 */
window.onload = init;

/* 
 * Initialization
 */
function init(){
	var doc = document,
		panelDefaut = doc.getElementsByClassName('panel-default')[0];
	// Comonent Click Event 
	doc.getElementsByClassName('nav-main')[0].onclick = function(e){
		componentCtrl(e, panelDefaut);
	};
	/*doc.getElementsByClassName('nav-main')[0].addEventListener('click', function(e){
		UI.componentCtrl.change(e);
	}, false);*/
	// Panel Side Show & hide Control 
	panelDefaut.getElementsByClassName('btn-friends')[0].addEventListener('click', function(e){
		UI.panelSideCtrl.show(e)
	}, false);
	// Panel Messenger Show 
	doc.getElementsByClassName('btn-messenger')[0].addEventListener('click', function(e){
		UI.panelMessengerCtrl.show(e)
	}, false);
	// panel Btm Show & hide Control 
	doc.getElementsByClassName('nav-write')[0].addEventListener('click', function(e){
		UI.panelBtmCtrl.show(e)
	}, false);
	// Panel Search Event 
	doc.getElementsByClassName('input-srch')[0].addEventListener('focus', function(e){
		UI.panelSrchCtrl.show(e)
	}, false);
	// Comonet Body Scroll Event 
	var componentBody = doc.getElementsByClassName('component-body');
	for(var i=0; i<componentBody.length ; i++){
		componentBody[i].addEventListener('scroll', function(){
			UI.scrollAnimation.change(this);
		}, false);
	}
}

var componentCtrl = function(e, panel){
	var init = function(e, panel){
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
		navNode.onclick = function(e){
			UI.panelBtmCtrl.show(e);
		};
	}
	// Templete
	var draw = function(target, data){
		var t = ' <div class="component-body component-{menu}" style="display:none"> <div class="component-area"> {title} </div> </div>';
		t = t.replace('{menu}', target).replace('{title}', data.text);
		panel.getElementsByClassName('panel-default-main')[0].innerHTML += t;
	}
	// Data
	var setData = function(data){
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
	}
	// Set Scroll
	var setScroll = function(e){
		var panelHead = panel.getElementsByClassName('panel-default-header')[0],
			panelBody = panel.getElementsByClassName('panel-default-main')[0],
			navWrite = panel.getElementsByClassName('grp-nav-write')[0];
		panelHead.style.transform = '';
		panelHead.style.opacity = '';
		panelBody.style.top = '';
		navWrite.style.transform = '';
		e[0].style.top = '';
		e[0].children[0].style.top = '';
	}
	init(e, panel);
}

/* 
UI Script 
*/
var UI = {
	/* Panel Default > Component Body */
	componentCtrl : {
		panel : document.getElementsByClassName('panel-default')[0],
		eleOld : undefined,
		//targetOld : undefined,
		change : function(e){
			if(!e.target.classList.contains('btn-nav-main')) return;
			// Get Target
			var target = e.target.id.toString().split('-');
			target = target[target.length-1];
			// 변수 선언
			var	componentStart = this.panel.getElementsByClassName('component-newspd'),
				eleCur = this.panel.getElementsByClassName('component-' + target),
				dataHeader = DATA.HEADER[target],
				navNode = document.getElementsByClassName('nav-write')[0];
			// eleOld
			if(this.eleOld == undefined) this.eleOld = componentStart;
			if(this.eleOld == eleCur) return;
			// Draw 
			if(!eleCur.length) this.draw(target, dataHeader);
			// Data Set
			this.setData(dataHeader);
			// Scroll Animation Reset
			this.setScroll(eleCur);
			// Show & Hide
			this.eleOld[0].style.display = 'none';
			eleCur[0].style.display = 'block';
			this.eleOld = eleCur;
			// NavNode Click Event
			navNode.addEventListener('click', function(e){
				UI.panelBtmCtrl.show(e);
			}, false);
		},
		draw : function(target, data){
			var t = ' <div class="component-body component-{menu}" style="display:none"> <div class="component-area"> {title} </div> </div>';
			t = t.replace('{menu}', target).replace('{title}', data.text);
			this.panel.getElementsByClassName('panel-default-main')[0].innerHTML += t;
		},
		setData : function(data){
			// Boolean Data
			var typeBoolean = {
				title : 'header-title', // 타이틀 노출
				srch : 'header-srch', // 검색 노출
				btnMessenger : 'btn-messenger', // messenger button 노출
				btnfriends : 'btn-friends', // plus button 노출
				navWrite : 'grp-nav-write' // Nav Write 노출
			}
			// Title
			this.panel.getElementsByClassName(typeBoolean.title)[0].textContent = data.text; 
			// Boolean Set
			for(var prop in typeBoolean) {
				this.panel.getElementsByClassName(typeBoolean[prop])[0].style.display = data[prop] ? 'block' : 'none';
			}
		},
		setScroll : function(e){
			var panelHead = this.panel.getElementsByClassName('panel-default-header')[0],
				panelBody = this.panel.getElementsByClassName('panel-default-main')[0],
				navWrite = this.panel.getElementsByClassName('grp-nav-write')[0];
			panelHead.style.transform = '';
			panelHead.style.opacity = '';
			panelBody.style.top = '';
			navWrite.style.transform = '';
			e[0].style.top = '';
			e[0].children[0].style.top = '';
		}
	}, 
	/* Panel Side */
	panelSideCtrl : {
		panelDefaut : document.getElementsByClassName('panel-default')[0],
		panelSide : document.getElementsByClassName('panel-side')[0],
		eleOld : undefined,
		show : function(e){
			// Get Target
			var target = e.target.classList;
			target = target[e.target.classList.length-1].split('-');
			target = target[target.length-1];
			// 변수 선언 
			var panelStart = this.panelSide.getElementsByClassName('component-friends')[0],
				eleCur = this.panelSide.getElementsByClassName('component-' + target)[0],
				navDirection = this.panelSide.getElementsByClassName('ul-nav-direction'),
				btnHide = this.panelSide.getElementsByClassName('btn-back')[0],
				self = this;
			// Component Show & Hide
			if(this.eleOld == undefined) this.eleOld = panelStart;
			this.eleOld.style.display = 'none';
			eleCur.style.display = 'block';
			this.eleOld = eleCur;
			// Set Data
			this.setData(DATA.HEADER[target]);
			// Panel Animation
			this.panelDefaut.classList.add('panel-move-left');
			this.panelSide.classList.remove('hide');
			// Nav Direction
			if(!navDirection.length) this.drawFriends();
			navDirection[0].addEventListener('click', function(e){
				self.friendsCtrl(e);
			}, false);
			// 패널 닫기 버튼 클릭 이벤트 
			btnHide.addEventListener('click', function(e){
				self.hide(e);
			}, false);
		},
		setData : function(data){
			var headerTitle = this.panelSide.getElementsByClassName('header-title')[0];
			headerTitle.textContent = data.text;
			headerTitle.style.display = data.title ? 'block' : 'none';
			this.panelSide.getElementsByClassName('header-srch')[0].style.display = data.srch ? 'block' : 'none';
			this.panelSide.getElementsByClassName('btn-back')[0].style.display = data.btnBack ? 'block' : 'none';
			this.panelSide.getElementsByClassName('nav-direction')[0].style.display = data.navDirection ? 'block' : 'none';
		},
		hide : function(e){
			this.panelDefaut.classList.remove('panel-move-left');
			this.panelSide.classList.add('hide');
		},
		drawFriends : function(){
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
			this.panelSide.getElementsByClassName('nav-direction')[0].appendChild(ulNode);
		},
		friendsCtrl : function(e){
			//console.log(e.target.getAttribute('data-role'));
		}
	},
	/* panel Messenger */
	panelMessengerCtrl : {
		panelMessenger : document.getElementsByClassName('panel-messenger')[0],
		panelDefaut : document.getElementsByClassName('panel-default')[0],
		show : function(e){
			// draw
			var container = this.panelMessenger.getElementsByClassName('panel-container-messenger');
			if(!container.length) this.draw();
			// 변수 선언
			var btnSet = this.panelMessenger.getElementsByClassName('btn-set')[0],
				btnHide = this.panelMessenger.getElementsByClassName('btn-close')[0],
				self = this;
			// show
			this.panelMessenger.classList.remove('hide');
			this.panelDefaut.classList.add('panel-move-left-90');
			// 설정 버튼 클릭 이벤트 : modal popup call
			btnSet.addEventListener('click', function(e){
				var templet = '<p class="txt-chat-off">채팅 끄기</p>';
				UI.popupModalCtrl.show(e, templet);
			}, false);
			// 패널 닫기 버튼 클릭 이벤트 : panel Messenger close
			btnHide.addEventListener('click', function(e){
				self.hide(e);
			}, false);
		},
		hide : function(e){
			this.panelMessenger.classList.add('hide');
			this.panelDefaut.classList.remove('panel-move-left-90');
		}, 
		draw : function(){
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
			this.panelMessenger.innerHTML = t;
		}
	},
	/* Panel Bottom */
	panelBtmCtrl : {
		panelBtm : document.getElementsByClassName('panel-btm')[0],
		eleOld : undefined,
		show : function(e){
			// Get Target
			if(!e.target.classList.contains('btn-nav-write')) return;
			var target = e.target.id.toString().split('-');
			target = target[target.length-1];
			// Draw
			if(!this.panelBtm.children.length) this.drawBody(target);
			// 변수 선언
			var dataHeaderer = DATA.WRITE[target],
				eleCur = this.panelBtm.getElementsByClassName('component-write-'+target),
				btnHide = this.panelBtm.getElementsByClassName('btn-cancel')[0],
				self = this;
			// Get Data
			this.setData(dataHeaderer, btnHide);
			// Show & Hide
			if(this.eleOld) this.eleOld[0].style.display = 'none';
			if(eleCur.length) eleCur[0].style.display = 'block'; 
			else this.drawComponent(target, dataHeaderer);
			this.eleOld = eleCur;
			// Class Remove
			this.panelBtm.classList.remove('hide');
			// Hide Button Click
			btnHide.addEventListener('click', function(e){
				self.hide(e);
			}, false);
		},
		setData : function(data, btnHide){
			var headerTitle = this.panelBtm.getElementsByClassName('header-title')[0];
			headerTitle.textContent = data.text;
			headerTitle.style.display = data.title ? 'block' : 'none';
			btnHide.style.display = data.btnCancel ? 'block' : 'none';
		},
		hide : function(e){
			if(!e.target.parentElement.classList.contains('header-side')) return;
			this.panelBtm.classList.add('hide');
		},
		drawBody : function(target){
			var t = ['<header class="panel-btm-header"> <h2 class="header-title"></h2> <div class="header-side"> <button class="btn btn-text btn-cancel">취소</button> </div> </header>'];
			t.push('<main class="panel-btm-main"></main>');
			this.panelBtm.innerHTML = t.join('');
		},
		drawComponent : function(target, data){
			var t = '<section class="component-body component-write-' + target + '">' + data.text + '</section>';
			this.panelBtm.getElementsByClassName('panel-btm-main')[0].innerHTML += t;
		}
	},
	/* Panel Search */
	panelSrchCtrl : {
		panelDefault : document.getElementsByClassName('panel-default')[0],
		panelSrch : document.getElementsByClassName('panel-srch')[0],
		btnBak : [],
		show : function(e){
			var headerSide = this.panelDefault.getElementsByClassName('header-side')[0],
				btns = headerSide.getElementsByClassName('btn'),
				btnHide = headerSide.getElementsByClassName('btn-cancel')[0],
				self = this;;
			for(var i=0 ; i<btns.length ; i++){
				if(!(btns[i].style.display == 'none')) this.btnBak.push(btns[i]);
				btns[i].style.display = btns[i].classList.contains('btn-cancel') ? 'block' : 'none';
			}
			this.drawLst();
			this.panelSrch.style.display = 'block';
			btnHide.addEventListener('click', function(e){
				self.hide(e);
			}, false);
		},
		hide : function(e){
			if(!document.getElementsByClassName('panel-srch')[0].style.display == 'block') return;
			e.target.style.display = 'none';
			this.panelSrch.style.display = 'none';
			this.btnBak.forEach(function(t){
				t.style.display = 'block';
			});
			this.btnBak = [];
			//this.unDrawLst();
		}, 
		drawLst : function(){
			if(this.panelSrch.getElementsByClassName('lst-srch').length) return;
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
			this.panelSrch.innerHTML += dummy.join('');
		}, 
		unDrawLst : function(){
			if(this.panelSrch.getElementsByClassName('lst-srch')[0]) {
				this.panelSrch.getElementsByClassName('header-full')[0].remove();
				this.panelSrch.getElementsByClassName('lst-srch')[0].remove();
			}
		}
	},
	/* Popup Modal */
	popupModalCtrl : {
		popupModal : document.getElementsByClassName('popup-modal')[0],
		show : function(e, templet){
			// 변수 선언 
			var self = this,
				modalDialog = this.popupModal.getElementsByClassName('modal-dialog');
			// Draw
			if(!modalDialog.length) this.draw(templet);
			// Show Popup
			modalDialog[0].style.top = (e.target.offsetTop + e.target.offsetHeight + 16) + 'px';
			this.popupModal.classList.add('show');
			// Modal Click -> Hide
			this.popupModal.addEventListener('click', function(e){
				self.hide(e);
			}, false);
		}, 
		hide : function(e){
			if(!e.target.classList.contains('popup-modal')) return;
			this.popupModal.classList.remove('show');
		},
		draw : function(templet){
			var t = ['<div class="modal-dialog"> <div class="modal-content"> <header class="modal-header"></header> <main class="modal-body">'];
			t.push(templet);
			t.push('</main> <footer class="modal-footer"></footer> </div> </div>');
			this.popupModal.innerHTML = t.join('');
		}
	},
	/* Comonet Body Scroll Down/Up Animation */
	scrollAnimation : {
		panelHead : document.getElementsByClassName('panel-default-header')[0],
		navWrite : document.getElementsByClassName('grp-nav-write')[0],
		panelBody : document.getElementsByClassName('panel-default-main')[0],
		navWriteH : document.getElementsByClassName('grp-nav-write').length ? document.getElementsByClassName('grp-nav-write')[0].clientHeight : null,
		change : function(e){
			var componentBody = e,
				componentArea = e.children[0],
				headerH = this.panelHead.clientHeight,
				isNavWirte = e.classList.contains('component-newspd') ? true : false,
				maxH = isNavWirte ? this.navWriteH + headerH : headerH;
			if(e.scrollTop == 0 ){
				this.panelHead.style.transform = '';
				this.panelHead.style.opacity = '';
				this.panelBody.style.top = '';
				componentBody.style.top = '';
				componentArea.style.top = ''; 
				if(isNavWirte) {
					this.navWrite.style.display = '';
					this.navWrite.style.transform = '';
				}
			} else if(e.scrollTop <= maxH) {
				var val = isNavWirte ? e.scrollTop - this.navWriteH : e.scrollTop;
				componentArea.style.top = e.scrollTop + 'px'; 
				if(isNavWirte) {
					if(e.scrollTop <= this.navWriteH){
						this.panelHead.style.transform = '';
						this.panelHead.style.opacity = '';
						this.navWrite.style.display = '';
						this.navWrite.style.transform = 'translateY(' + -e.scrollTop + 'px)';
						componentBody.style.top = (this.navWriteH-e.scrollTop) + 'px'; 
					} else { //e.scrollTop <= maxH
						this.panelHead.style.transform = 'translateY(' + -val + 'px)';
						this.panelHead.style.opacity = 1 - val/headerH;
						this.panelBody.style.top = headerH + -val + 'px';
						this.navWrite.style.display = 'none';
						this.navWrite.style.transform = 'translateY(' + -maxH + 'px)';
					}
				} else {
					this.panelHead.style.transform = 'translateY(' + -val + 'px)';
					this.panelHead.style.opacity = 1 - val/headerH;
					this.panelBody.style.top = headerH + -val + 'px';
				}
			} else if( e.scrollTop > maxH ){
				this.panelHead.style.transform = -headerH + 'px';
				this.panelHead.style.opacity = 0;
				this.panelBody.style.top = 0; 	
				componentArea.style.top = maxH + 'px'; 
				if(isNavWirte){
					this.navWrite.style.display = 'none';
					this.navWrite.style.transform = -maxH + 'px';
					componentBody.style.top = 0; 
				} 
			}
		}
	}
}








//http://www.javascripttoolbox.com/lib/popup/example.php


