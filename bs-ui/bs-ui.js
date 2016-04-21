/*!
bs-ui studing
*/

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
	var doc = document;

	/* navbar toggle */
	var navbarToggle = doc.getElementsByClassName('navbar-toggle')[0];
	navbarToggle.onclick = function(e){
		var bsNavbar = doc.getElementById('bs-navbar');
		if(this.getAttribute('aria-expended') == 'false') {
			this.setAttribute('aria-expended', 'true');
			bsNavbar.setAttribute('aria-expended', 'true');

			this.classList.remove('collapsed');
			bsNavbar.classList.add('in');


		} else {
			this.setAttribute('aria-expended', 'false');
			bsNavbar.setAttribute('aria-expended', 'false');

			this.classList.add('collapsed');
			bsNavbar.classList.remove('in');
		}
	};

	/* Panel | Component | Scroll Control Event Bind */
	// Comonent Click Event 
	/*doc.getElementsByClassName('nav-main')[0].onclick = function(e){
		componentCtrl(e, panelDefault);
	};*/
}

/* Panel | Component | Scroll Control */
/*var componentCtrl = function(e, panel){
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
}*/


