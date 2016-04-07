'use strict';

/* DOM Script */
window.onload = function(){ 
	/*_____ Cross Browser Insert HTML Utility _____*/
	var wrap = document.getElementById('wrap-templet'),
		baseNodeString = wrap.getElementsByClassName('baseString')[0],
		baseNodeElement = wrap.getElementsByClassName('baseElement')[0];
	var position = {
		beforebegin : 'Before Begin', 
		afterbegin : 'After Begin', 
		beforeend : 'Before End',
		afterend : 'After End'
	}
	// Type String
	for(var key in position){
		var templet = '<div>'+ position[key] +'</div>';
		Util.InsertHTML(key, baseNodeString, templet);
	}
	// Type Element 
	for(var key in position){
		var element = document.createElement('div');
		element.textContent = position[key];
		Util.InsertHTML(key, baseNodeElement, element);
	}
}


var Util = {};
/* Cross Browser Insert HTML Utility */
Util.InsertHTML = function(position, target, templet){
	if(typeof templet === 'string'){ // string
		target.insertAdjacentHTML(position, templet);
	} else { // object
		var parentNode = target.parentNode;
		switch(position) {
			case 'beforebegin' :
				parentNode.insertBefore(templet, target);
				break;
			case 'afterend' :
				parentNode.appendChild(templet, target);
				break;
			case 'afterbegin' : 
				target.insertBefore(templet, target.firstChild);
				break;
			case 'beforeend' :
				target.appendChild(templet, target.lastChild);
				break;
		}
	}
}


