'use strict';

/* http://selfcontained.us/2009/09/16/getting-keycode-values-in-javascript/ */

/* DOM Script */
window.onload = function(){ 

	/* Keyboard Event */

	/* Get Keyboard Event Value */
	var eventNode = document.getElementById('wrap-keyboardEvent'),
		inputNode = eventNode.getElementsByClassName('input')[0],
		outputTbl = eventNode.getElementsByClassName('tbl-output')[0];
	
	inputNode.addEventListener('keypress', function(e){
		eventNode.getElementsByClassName('output-key')[0].innerHTML = Util.Keyboard.getKeyCode(e);
	}, false);
	
	/*inputNode.addEventListener('keydown', function(e){
		getKeyboradVal(e, 'down');
	}, false);
	inputNode.addEventListener('keypress', function(e){
		getKeyboradVal(e, 'press');
	}, false);
	inputNode.addEventListener('keyup', function(e){
		getKeyboradVal(e, 'up');
	}, false);
	var getKeyboradVal = function(e, p) {
		var ev = {
			'keycode' : e.keyCode,
			'which' : e.which,
			'charcode' : e.charCode
		};
		var shiftPressed = 0 , altPressed = 0, ctrlPressed = 0, metaPressed = 0;

		eventNode.getElementsByClassName('output-key')[0].innerHTML = 'key : ' + e.keyIdentifier;
		for(var prop in ev) {
			outputTbl.getElementsByClassName(prop)[0].getElementsByClassName(p)[0].innerHTML = ev[prop]
		};
		shiftPressed = e.shiftKey;
		altPressed = e.altKey;
		ctrlPressed = e.ctrlKey;
		metaPressed = e.metaKey;

		console.log(shiftPressed, altPressed, ctrlPressed);
	}*/
	
}



/* Cross Browser Event Utility */
var Util = {};
/* Cross Browser Event Utility */
Util.Keyboard = {
	getKeyCode : function(e){
		var keycode = null;
		return keycode = window.event ? window.event.keyCode : e.which;
	},
	getKeyCodeValue : function(keyCode, shiftKey){
		shiftKey = shiftKey || false;
		var value = null;
		if(shiftKey === true){
			value = this.modifiedByShift[keyCode];
		} else{
			value = this.keyCodeMap[keyCode];
		}
		return value;
	},
	getValueByEvent : function(e){
		return this.getKeyCodeValue(this.getKeyCode(e), e.shiftKey);
	},
	keyCodeMap : {
        8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pausebreak", 20:"capslock", 27:"escape", 32:" ", 33:"pageup",
        34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 43:"+", 44:"printscreen", 45:"insert", 46:"delete",
        48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
        61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
        77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
        96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9",
        106: "*", 107:"+", 109:"-", 110:".", 111: "/",
        112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12",
        144:"numlock", 145:"scrolllock", 186:";", 187:"=", 188:",", 189:"-", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
    },
    modifiedByShift : {
        192:"~", 48:")", 49:"!", 50:"@", 51:"#", 52:"$", 53:"%", 54:"^", 55:"&", 56:"*", 57:"(", 109:"_", 61:"+",
        219:"{", 221:"}", 220:"|", 59:":", 222:"\"", 188:"<", 189:">", 191:"?",
        96:"insert", 97:"end", 98:"down", 99:"pagedown", 100:"left", 102:"right", 103:"home", 104:"up", 105:"pageup"
    }

}

